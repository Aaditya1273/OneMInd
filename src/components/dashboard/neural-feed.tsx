'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const MOCK_LOGS = [
    { type: 'thought', message: 'Analyzing market depth for ONE/USDT pair...', time: '14:20:01' },
    { type: 'action', message: 'Initiating deposit of 500 ONE into agent vault.', time: '14:20:05' },
    { type: 'status', message: 'Neural memory synchronized with IPFS hash: QmX...', time: '14:20:12' },
    { type: 'thought', message: 'Energy levels sufficient for next autonomous cycle.', time: '14:21:00' },
    { type: 'action', message: 'Executing smart swap: 10 ONE -> 0.45 USDT', time: '14:22:45' },
    { type: 'success', message: 'Transaction confirmed. TX: 0x4f2...78a', time: '14:23:02' },
];

const TYPE_COLORS: Record<string, string> = {
    thought: 'text-purple-400',
    action: 'text-cyan-400',
    success: 'text-emerald-400',
    status: 'text-white/20',
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
            setLogs(prev => [...prev.slice(-12), newLog]);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="glass-card overflow-hidden flex flex-col h-[750px] border-none shadow-2xl relative group transition-all duration-500">
            {/* Header */}
            <div className="h-16 border-b border-white/5 flex items-center px-8 justify-between bg-white/[0.02] flex-shrink-0">
                <div className="flex items-center gap-3 text-[10px] font-black text-white uppercase tracking-[0.2em]">
                    <Terminal className="w-4 h-4 text-cyan-400" />
                    Neural Feed
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                        <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-400 animate-ping opacity-40" />
                    </div>
                    <span className="text-[10px] text-white/40 font-black uppercase tracking-widest">Live</span>
                </div>
            </div>

            {/* Log Stream */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-8 font-mono text-[11px] space-y-5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent hover:scrollbar-thumb-white/20 transition-all selection:bg-cyan-500/30"
            >
                <AnimatePresence initial={false}>
                    {logs.map((log, i) => (
                        <motion.div
                            key={i + log.time}
                            initial={{ opacity: 0, x: -10, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="flex gap-4 group/entry transition-colors hover:bg-white/[0.02] p-1 rounded-lg"
                        >
                            <span className="text-white/40 shrink-0 font-mono tracking-tighter">[{log.time}]</span>
                            <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-3">
                                    <span className={cn('font-black uppercase tracking-[0.2em] text-[9px]', TYPE_COLORS[log.type] ?? 'text-white/40')}>
                                        {log.type}
                                    </span>
                                </div>
                                <p className="text-white/80 leading-relaxed font-medium tracking-tight whitespace-pre-wrap">{log.message}</p>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Command Bar */}
            <div className="p-6 border-t border-white/5 bg-white/[0.02] flex-shrink-0">
                <div className="flex items-center gap-4 bg-black/40 border border-white/5 rounded-2xl px-5 py-4 focus-within:border-cyan-400/30 focus-within:bg-black/60 transition-all shadow-inner group/input">
                    <span className="text-cyan-400 font-black text-sm font-mono group-focus-within:animate-pulse">$</span>
                    <input
                        type="text"
                        placeholder="Intervene in neural process..."
                        className="bg-transparent border-none outline-none text-[13px] w-full text-white/40 placeholder:text-white/10 focus:text-white font-mono font-medium tracking-tight"
                    />
                </div>
            </div>

            {/* Subtle Gradient Overlays for Scroll Fade */}
            <div className="absolute top-16 left-0 right-0 h-12 bg-gradient-to-b from-[#020203] to-transparent pointer-events-none z-10 opacity-50" />
            <div className="absolute bottom-28 left-0 right-0 h-12 bg-gradient-to-t from-[#020203] to-transparent pointer-events-none z-10 opacity-50" />
        </div>
    );
}
