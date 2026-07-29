import { NextResponse } from 'next/server';
import { SuiClient } from '@mysten/sui/client';
import { Transaction } from '@mysten/sui/transactions';

const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || 'https://fullnode.testnet.sui.io:443';
const suiClient = new SuiClient({ url: RPC_URL });

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

        // Build an inspectable transaction for server-side simulation/dry-run.
        // Full execution requires a signer — in production the client signs via dapp-kit.
        const tx = new Transaction();
        tx.moveCall({
            target: `${packageId}::${module}::${func}`,
            arguments: args.map((arg: string) => tx.pure.address(arg)),
        });

        const dryRun = await suiClient.dryRunTransactionBlock({
            transactionBlock: await tx.build({ client: suiClient }),
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
