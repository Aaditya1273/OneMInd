import { NextResponse } from 'next/server';
import { execSync } from 'child_process';

const ONE_CLI = '/home/bajrangi/.cargo/bin/one';

function executeOneCommand(args: string[]): any {
    try {
        const command = `${ONE_CLI} ${args.join(' ')} --json`;
        console.log(`Executing OneChain CLI: ${command}`);
        const output = execSync(command, { encoding: 'utf8' });

        if (!output || output.trim() === '') {
            return { success: true, message: 'Command executed successfully with no output' };
        }

        return JSON.parse(output);
    } catch (error: any) {
        const stderr = error.stderr?.toString() || error.message;
        console.error('OneChain CLI Error:', stderr);
        throw new Error(`OneChain CLI Execution Failed: ${stderr}`);
    }
}

export async function POST(req: Request) {
    try {
        const { module, function: func, args = [] } = await req.json();
        const packageId = process.env.NEXT_PUBLIC_PACKAGE_ID || process.env.PACKAGE_ID || '';

        const cliArgs = [
            'client', 'call',
            '--package', packageId,
            '--module', module,
            '--function', func,
            '--gas-budget', '10000000'
        ];

        if (args.length > 0) {
            cliArgs.push('--args');
            args.forEach((arg: any) => cliArgs.push(`"${arg}"`));
        }

        const result = executeOneCommand(cliArgs);
        return NextResponse.json({ success: true, result });
    } catch (error: any) {
        return NextResponse.json({ error: 'OneChain Transaction failed', details: error.message }, { status: 500 });
    }
}
