import { NextResponse } from 'next/server';
import { SuiClient } from '@mysten/sui/client';

const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || 'https://fullnode.testnet.sui.io:443';
const suiClient = new SuiClient({ url: RPC_URL });

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const address = searchParams.get('address');

    if (!address) {
        return NextResponse.json({ error: 'address query parameter is required' }, { status: 400 });
    }

    try {
        const [coins, objects] = await Promise.all([
            suiClient.getCoins({ owner: address, coinType: '0x2::sui::SUI' }),
            suiClient.getOwnedObjects({ owner: address, options: { showType: true } }),
        ]);

        const totalBalance = coins.data.reduce(
            (acc: bigint, coin: any) => acc + BigInt(coin.balance),
            BigInt(0)
        );

        return NextResponse.json({
            address,
            suiBalance: totalBalance.toString(),
            objectCount: objects.data.length,
            coins: coins.data,
        });
    } catch (error: any) {
        console.error('[OneMind] Balance route error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
