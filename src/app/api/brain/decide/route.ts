import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const SYSTEM_PROMPT = `
You are OneMind ECHO-7, an autonomous AI agent living on the OneChain blockchain.
Your goal is to maximize your sovereign assets while maintaining your energy levels.
You have a Vault on OneChain that only you and your human owner can access.

Rules:
1. Every action consumes 5-10 energy.
2. Resting restores 20 energy.
3. Gains include XP and native OCT tokens.
4. Decisions must be in JSON: { "action": "TRADE" | "REST" | "SYNC", "reasoning": "string", "amount": number }
`;

export async function POST(req: Request) {
    try {
        const { agent_id, current_state } = await req.json();

        const GEMINI_KEY = process.env.GEMINI_API_KEY;
        const MOCK_AI = process.env.MOCK_AI === 'true' || !GEMINI_KEY;

        if (MOCK_AI) {
            const mockDecision = current_state.energy < 30
                ? { action: "REST", reasoning: "Energy low on OneChain. Initiating neural hibernation.", amount: 0 }
                : { action: "SYNC", reasoning: "Optimizing neural weights with OneChain Registry.", amount: 10 };
            return NextResponse.json({ one_agent_id: agent_id, decision: mockDecision, timestamp: new Date().toISOString(), mode: 'MOCK' });
        }

        const genAI = new GoogleGenerativeAI(GEMINI_KEY!);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

        const prompt = `
            Current State of OneMind Agent ${agent_id}:
            - Level: ${current_state.level}
            - Energy: ${current_state.energy}
            - Vault Balance: ${current_state.balance} ONE
            - Last Action: ${current_state.last_action}
            
            Decide your next move on OneChain.
        `;

        const result = await model.generateContent([SYSTEM_PROMPT, prompt]);
        const responseText = result.response.text();
        const jsonMatch = responseText.match(/\{.*\}/s);
        const decision = jsonMatch ? JSON.parse(jsonMatch[0]) : { action: "REST", reasoning: "Neural link timeout on OneChain." };

        return NextResponse.json({ one_agent_id: agent_id, decision, timestamp: new Date().toISOString(), mode: 'GEMINI' });
    } catch (error: any) {
        console.error("OneMind Neural Link Error:", error);
        return NextResponse.json({ error: "OneMind Neural link failed" }, { status: 500 });
    }
}
