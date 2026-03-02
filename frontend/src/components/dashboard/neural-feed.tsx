'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const MOCK_LOGS = [
    { type: 'thought', message: 'Analyzing market depth for OCT/USDT pair...', time: '14:20:01' },
    { type: 'action', message: 'Initiating deposit of 500 OCT into agent vault.', time: '14:20:05' },
    { type: 'status', message: 'Neural memory synchronized with IPFS hash: QmX...', time: '14:20:12' },
    { type: 'thought', message: 'Energy levels sufficient for next autonomous cycle.', time: '14:21:00' },
    { type: 'action', message: 'Executing smart swap: 10 OCT -> 0.45 USDT', time: '14:22:45' },
    { type: 'success', message: 'Transaction confirmed. TX: 0x4f2...78a', time: '14:23:02' },
];

const TYPE_COLORS: Record<string, string> = {
    thought: 'text-[#bc8cff]',
    action: 'text-[#58a6ff]',
    success: 'text-[#3fb950]',
    status: 'text-[#8b949e]',
};

export function NeuralFeed() {
    const [logs, setLogs] = useState(MOCK_LOGS);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when new logs appear
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

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
        <div className="flex-1 bg-[#0d1117] border border-[#30363d] rounded-xl overflow-hidden flex flex-col h-full">
            {/* Header */}
            <div className="h-11 border-b border-[#30363d] flex items-center px-4 justify-between bg-[#0d1117] flex-shrink-0">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#e6edf3] uppercase tracking-wider">
                    <Terminal className="w-3.5 h-3.5 text-[#58a6ff]" />
                    Neural Feed
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#3fb950]" />
                    <span className="text-[10px] text-[#8b949e] font-mono font-semibold uppercase tracking-wider">Live</span>
                </div>
            </div>

            {/* Log Stream - Fixed height with scroll */}
            <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 font-mono text-xs space-y-3 bg-[#0d1117] scrollbar-thin scrollbar-thumb-[#30363d] scrollbar-track-transparent hover:scrollbar-thumb-[#484f58]"
                style={{ maxHeight: 'calc(100% - 44px - 60px)' }}
            >
                <AnimatePresence initial={false}>
                    {logs.map((log, i) => (
                        <motion.div
                            key={i + log.time}
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.15 }}
                            className="flex gap-3"
                        >
                            <span className="text-[#484f58] whitespace-nowrap pt-px font-mono">[{log.time}]</span>
                            <div className="flex flex-col gap-0.5">
                                <span className={`text-[10px] font-bold uppercase tracking-wider font-mono ${TYPE_COLORS[log.type] ?? 'text-[#8b949e]'}`}>
                                    {log.type}
                                </span>
                                <p className="text-[#e6edf3] leading-relaxed font-mono">{log.message}</p>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Command Bar */}
            <div className="p-3 border-t border-[#30363d] bg-[#0d1117] flex-shrink-0">
                <div className="flex items-center gap-2 bg-[#161b22] border border-[#30363d] rounded-lg px-3 py-2.5 focus-within:border-[#58a6ff] transition-colors">
                    <span className="text-[#3fb950] font-bold text-sm font-mono">$</span>
                    <input
                        type="text"
                        placeholder="Intervene in neural process..."
                        className="bg-transparent border-none outline-none text-xs w-full text-[#8b949e] placeholder:text-[#484f58] focus:text-[#e6edf3] font-mono"
                    />
                </div>
            </div>
        </div>
    );
}
