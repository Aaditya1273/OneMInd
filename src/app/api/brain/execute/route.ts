import { NextResponse } from 'next/server';
import { SuiJsonRpcClient } from '@mysten/sui/jsonRpc';
import { Transaction } from '@mysten/sui/transactions';

const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || 'https://fullnode.testnet.sui.io:443';
const suiClient = new SuiJsonRpcClient({ url: RPC_URL, network: 'testnet' });

export async function POST(req: Request) {
    try {
        const { module, function: func, args = [] } = await req.json();
        const packageId = process.env.NEXT_PUBLIC_PACKAGE_ID || '';

        if (!packageId) {
            return NextResponse.json(
                { error: 'NEXT_PUBLIC_PACKAGE_ID is not configured.' },
                { status: 500 }
            );
        }

        const tx = new Transaction();
        tx.moveCall({
            target: `${packageId}::${module}::${func}`,
            arguments: args.map((arg: string) => tx.pure.address(arg)),
        });

        const dryRun = await suiClient.dryRunTransactionBlock({
            transactionBlock: await tx.build({ client: suiClient as any }),
        });

        if (dryRun.effects.status.status !== 'success') {
            return NextResponse.json(
                { error: 'Dry-run failed', details: dryRun.effects.status.error },
                { status: 400 }
            );
        }

        return NextResponse.json({ success: true, effects: dryRun.effects });
    } catch (error: any) {
        console.error('[OneMind] Execute route error:', error);
        return NextResponse.json(
            { error: 'Transaction execution failed', details: error.message },
            { status: 500 }
        );
    }
}
