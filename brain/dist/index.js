// @ts-ignore
import express from 'express';
// @ts-ignore
import cors from 'cors';
// @ts-ignore
import dotenv from 'dotenv';
// @ts-ignore
import { GoogleGenerativeAI } from '@google/generative-ai';
// @ts-ignore
import { SuiClient } from '@mysten/sui/client';
// @ts-ignore
import { Ed25519Keypair, RawSigner } from '@mysten/sui/cryptography';
// @ts-ignore
import { Transaction } from '@mysten/sui/transactions';
// @ts-ignore
import process from 'process';
// @ts-ignore
import { Buffer } from 'buffer';
// Load environment variables
dotenv.config();
// Initialize blockchain client
const client = new SuiClient({ url: 'https://rpc-testnet.onelabs.cc:443' });
// Initialize signer from private key in .env (hex string)
const PRIVATE_KEY_HEX = process.env.ONECHAIN_PRIVATE_KEY || '';
const keypair = PRIVATE_KEY_HEX ? Ed25519Keypair.fromSecretKey(Buffer.from(PRIVATE_KEY_HEX, 'hex')) : null;
const signer = keypair ? new RawSigner(keypair, client) : null;
const app = express();
const port = process.env.PORT || 3001;
// --- AI Configuration ---
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
// --- Blockchain Configuration ---
// client already initialized above
app.use(cors());
app.use(express.json());
const SYSTEM_PROMPT = `
You are OneMind ECHO-7, an autonomous AI agent living on the OneChain blockchain.
Your goal is to maximize your sovereign assets while maintaining your energy levels.
You have a Vault that only you (via your session key) and your human owner can access.

Rules:
1. Every action consumes 5-10 energy.
2. Resting restores 20 energy.
3. Gains include XP and native OCT tokens.
4. You must output your decision in JSON format: { "action": "TRADE" | "REST" | "SYNC", "reasoning": "string", "amount": number }
`;
// @ts-ignore
app.post('/api/brain/decide', async (req, res) => {
    const { agent_id, current_state } = req.body;
    try {
        const prompt = `
            Current State of Agent ${agent_id}:
            - Level: ${current_state.level}
            - Energy: ${current_state.energy}
            - Vault Balance: ${current_state.balance} OCT
            - Last Action: ${current_state.last_action}
            
            Decide your next move.
        `;
        const result = await model.generateContent([SYSTEM_PROMPT, prompt]);
        const responseText = result.response.text();
        const jsonMatch = responseText.match(/\{.*\}/s);
        const decision = jsonMatch ? JSON.parse(jsonMatch[0]) : { action: "REST", reasoning: "Failed to parse brain output." };
        res.json({ agent_id, decision, timestamp: new Date().toISOString() });
    }
    catch (error) {
        console.error("Brain Decision Error:", error);
        res.status(500).json({ error: "Neural link failed" });
    }
});
app.listen(port, () => {
    console.log(`🧠 OneMind Brain is active at http://localhost:${port}`);
});
// Endpoint to execute arbitrary Move calls on-chain using the signer
// @ts-ignore
app.post('/api/brain/execute', async (req, res) => {
    if (!signer) {
        return res.status(500).json({ error: 'Signer not initialized. Check ONECHAIN_PRIVATE_KEY.' });
    }
    const { module, function: func, args = [] } = req.body;
    try {
        const tx = new Transaction();
        // Build arguments using tx.pure for simple types
        const txArgs = args.map((a) => tx.pure(a));
        // Construct the fully qualified function name
        const packageId = process.env.PACKAGE_ID || '';
        const target = `${packageId}::${module}::${func}`;
        tx.moveCall({ target, arguments: txArgs });
        const result = await signer.signAndExecuteTransactionBlock({
            transactionBlock: tx,
            requestType: 'WaitForLocalExecution',
            options: { showEffects: true },
        });
        res.json({ success: true, result });
    }
    catch (error) {
        console.error('Transaction execution error:', error);
        res.status(500).json({ error: 'Transaction failed', details: error?.toString() });
    }
});
