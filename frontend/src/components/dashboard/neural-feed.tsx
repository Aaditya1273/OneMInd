'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Brain, MessageSquare, ShieldCheck, Share2 } from 'lucide-react';
import { useState, useEffect } from 'react';

const MOCK_LOGS = [
    { type: 'thought', message: 'Analyzing market depth for OCT/USDT pair...', time: '14:20:01' },
    { type: 'action', message: 'Initiating deposit of 500 OCT into agent vault.', time: '14:20:05' },
    { type: 'status', message: 'Neural memory synchronized with IPFS hash: QmX...', time: '14:20:12' },
    { type: 'thought', message: 'Energy levels sufficient for next autonomous cycle.', time: '14:21:00' },
    { type: 'action', message: 'Executing smart swap: 10 OCT -> 0.45 USDT', time: '14:22:45' },
    { type: 'success', message: 'Transaction confirmed. TX: 0x4f2...78a', time: '14:23:02' },
];

export function NeuralFeed() {
    const [logs, setLogs] = useState(MOCK_LOGS);

    // Auto-scroll logic for a "live" feel
    useEffect(() => {
        const interval = setInterval(() => {
            const newLog = {
                type: Math.random() > 0.5 ? 'thought' : 'status',
                message: `Autonomic scan complete: ${Math.floor(Math.random() * 100)} nodes verified.`,
                time: new Date().toLocaleTimeString('en-US', { hour12: false })
            };
            setLogs(prev => [...prev.slice(-10), newLog]);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex-1 glass-card overflow-hidden flex flex-col">
            <div className="h-12 border-b border-glass-border flex items-center px-6 justify-between bg-white/5">
                <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400">
                    <Terminal className="w-4 h-4" />
                    NEURAL FEED
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest">Live Sync</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 font-mono text-sm space-y-4">
                <AnimatePresence initial={false}>
                    {logs.map((log, i) => (
                        <motion.div
                            key={i + log.time}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex gap-4 group"
                        >
                            <span className="text-gray-600 text-[10px] whitespace-nowrap pt-1">[{log.time}]</span>
                            <div className="flex flex-col gap-1">
                                <span className={`uppercase text-[10px] font-bold ${log.type === 'thought' ? 'text-purple-400' :
                                        log.type === 'action' ? 'text-cyan-400' :
                                            log.type === 'success' ? 'text-green-400' : 'text-gray-500'
                                    }`}>
                                    {log.type}
                                </span>
                                <p className="text-gray-300 group-hover:text-white transition-colors">
                                    {log.message}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Input / Command Sim */}
            <div className="p-4 border-t border-glass-border bg-black/40">
                <div className="flex items-center gap-3 bg-white/5 rounded-lg px-4 py-2 border border-white/5 focus-within:border-cyan-500/50 transition-all">
                    <span className="text-cyan-500 font-bold">$</span>
                    <input
                        type="text"
                        placeholder="Intervene in neural process..."
                        className="bg-transparent border-none outline-none text-xs w-full text-gray-400 focus:text-white"
                    />
                </div>
            </div>
        </div>
    );
}
