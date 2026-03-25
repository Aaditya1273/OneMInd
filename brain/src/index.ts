// @ts-ignore
import express from 'express';
// @ts-ignore
import cors from 'cors';
// @ts-ignore
import dotenv from 'dotenv';
// @ts-ignore
import { GoogleGenerativeAI } from '@google/generative-ai';
// @ts-ignore
import { SuiClient as OneClient } from '@mysten/sui/client';
// @ts-ignore
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
// @ts-ignore
import { Transaction as OneTransaction } from '@mysten/sui/transactions';
// @ts-ignore
import process from 'process';
// @ts-ignore
import { Buffer } from 'buffer';

// Load environment variables
dotenv.config();

/**
 * ONECHAIN CONFIGURATION
 * Using the OneLabs RPC for Testnet activities.
 */
const oneClient = new OneClient({ url: 'https://rpc-testnet.onelabs.cc:443' });

// Initialize signer from private key in .env (hex string)
const PRIVATE_KEY_HEX = process.env.ONECHAIN_PRIVATE_KEY || '';
const oneKeypair = PRIVATE_KEY_HEX ? Ed25519Keypair.fromSecretKey(Buffer.from(PRIVATE_KEY_HEX, 'hex')) : null;

const app = express();
const port = process.env.PORT || 3001;

// --- AI Configuration ---
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

app.use(cors());
app.use(express.json());

const SYSTEM_PROMPT = `
You are OneMind ECHO-7, an autonomous AI agent living on the OneChain blockchain.
Your goal is to maximize your sovereign assets while maintaining your energy levels.
You have a Vault that only you and your human owner can access.

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
    } catch (error) {
        console.error("OneMind Neural Link Error:", error);
        res.status(500).json({ error: "OneMind Neural link failed" });
    }
});

// Endpoint to execute arbitrary Move calls on OneChain
// @ts-ignore
app.post('/api/brain/execute', async (req, res) => {
    if (!oneKeypair) {
        return res.status(500).json({ error: 'OneChain Keypair not initialized. Check ONECHAIN_PRIVATE_KEY.' });
    }
    const { module, function: func, args = [] } = req.body;
    try {
        const tx = new OneTransaction();
        // Build arguments using tx.pure for simple types
        const txArgs = args.map((a: any) => tx.pure(a));
        // Construct the fully qualified function name
        const packageId = process.env.PACKAGE_ID || '';
        const target = `${packageId}::${module}::${func}`;
        tx.moveCall({ target, arguments: txArgs });

        // Execute the transaction using the client and keypair
        const result = await oneClient.signAndExecuteTransaction({
            signer: oneKeypair,
            transaction: tx,
            options: { showEffects: true },
        });
        res.json({ success: true, result });
    } catch (error) {
        console.error('OneChain Transaction execution error:', error);
        res.status(500).json({ error: 'OneChain Transaction failed', details: error?.toString() });
    }
});

app.listen(port, () => {
    console.log(`🧠 OneMind Brain is active on OneChain (Port: ${port})`);
});
