import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { SuiClient } from '@mysten/sui/client';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// --- AI Configuration ---
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

// --- Blockchain Configuration ---
const client = new SuiClient({ url: 'https://rpc-testnet.onelabs.cc:443' });

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

        // Clean and parse JSON from Gemini (sometimes it wraps in markdown)
        const jsonMatch = responseText.match(/\{.*\}/s);
        const decision = jsonMatch ? JSON.parse(jsonMatch[0]) : { action: "REST", reasoning: "Failed to parse brain output." };

        res.json({
            agent_id,
            decision,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Brain Decision Error:", error);
        res.status(500).json({ error: "Neural link failed" });
    }
});

app.listen(port, () => {
    console.log(`🧠 OneMind Brain is active at http://localhost:${port}`);
});
