import { NextResponse } from 'next/server';
import { execSync } from 'child_process';

const ONE_CLI = '/home/bajrangi/.cargo/bin/one';

function executeOneCommand(args: string[]): any {
    try {
        const command = `${ONE_CLI} ${args.join(' ')} --json`;
        const output = execSync(command, { encoding: 'utf8' });
        return JSON.parse(output);
    } catch (error: any) {
        const stderr = error.stderr?.toString() || error.message;
        throw new Error(`OneChain CLI Execution Failed: ${stderr}`);
    }
}

export async function GET(req: Request, { params }: { params: any }) {
    // Note: Next.js App Router uses searchParams or dynamic routes.
    // Assuming /api/brain/balance?address=0x...
    const { searchParams } = new URL(req.url);
    const address = searchParams.get('address');

    if (!address) {
        return NextResponse.json({ error: 'Address is required' }, { status: 400 });
    }

    try {
        const result = executeOneCommand(['client', 'objects', '--address', address]);
        return NextResponse.json(result);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
