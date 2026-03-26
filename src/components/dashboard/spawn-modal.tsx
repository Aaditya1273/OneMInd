'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cpu, Zap, Shield, Sparkles, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/toast-context';

interface SpawnAgentModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ARCHITECTURES = [
    { id: 'vanguard', name: 'Vanguard-7', type: 'Combat / Security', efficiency: '98%' },
    { id: 'sentinel', name: 'Sentinel-X', type: 'Defense / Guardian', efficiency: '99%' },
    { id: 'oracle', name: 'Oracle-P', type: 'Intel / Prediction', efficiency: '97%' },
];

export function SpawnAgentModal({ isOpen, onClose }: SpawnAgentModalProps) {
    const [name, setName] = useState('');
    const [selectedArch, setSelectedArch] = useState('vanguard');
    const [isSpawning, setIsSpawning] = useState(false);
    const { showToast } = useToast();

    const handleSpawn = async () => {
        if (!name) {
            showToast('Agent Name is Required', 'error');
            return;
        }

        setIsSpawning(true);
        showToast(`Initializing ${name} on OneChain...`, 'loading');

        // Simulate OneChain Transaction
        await new Promise(r => setTimeout(r, 2000));

        showToast(`${name} Successfully Synthesized!`, 'success');
        setIsSpawning(false);
        onClose();
        setName('');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="w-full max-w-lg bg-[#050505] border border-white/10 rounded-[2.5rem] overflow-hidden relative z-10 shadow-[0_50px_100px_rgba(0,0,0,0.5)]"
                    >
                        {/* Header */}
                        <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">
                                    <Sparkles className="w-6 h-6 text-cyan-400" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-white tracking-tighter uppercase">Spawn Vanguard</h2>
                                    <p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Digital Synthesis Chamber</p>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-white/20 hover:text-white transition-all">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-8 space-y-8">
                            {/* Name Input */}
                            <div className="space-y-3">
                                <label className="text-[10px] text-white/40 font-black uppercase tracking-[0.2em] px-1">Designation Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="e.g. ECHO-08"
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white font-black text-base placeholder:text-white/10 focus:outline-none focus:border-cyan-400/50 transition-all uppercase tracking-widest"
                                />
                            </div>

                            {/* Architecture Selection */}
                            <div className="space-y-3">
                                <label className="text-[10px] text-white/40 font-black uppercase tracking-[0.2em] px-1">Chassis Architecture</label>
                                <div className="grid grid-cols-1 gap-3">
                                    {ARCHITECTURES.map(arch => (
                                        <button
                                            key={arch.id}
                                            onClick={() => setSelectedArch(arch.id)}
                                            className={cn(
                                                "w-full p-4 rounded-2xl border flex items-center justify-between transition-all group",
                                                selectedArch === arch.id
                                                    ? "bg-cyan-400/10 border-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.1)]"
                                                    : "bg-white/[0.02] border-white/5 hover:border-white/20"
                                            )}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={cn(
                                                    "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                                                    selectedArch === arch.id ? "bg-cyan-400 text-black" : "bg-white/5 text-white/20 group-hover:text-white"
                                                )}>
                                                    <Cpu className="w-5 h-5" />
                                                </div>
                                                <div className="text-left">
                                                    <div className={cn("text-xs font-black uppercase tracking-widest", selectedArch === arch.id ? "text-cyan-400" : "text-white")}>{arch.name}</div>
                                                    <div className="text-[9px] text-white/40 font-black uppercase tracking-widest mt-0.5">{arch.type}</div>
                                                </div>
                                            </div>
                                            <div className="text-[10px] font-black text-white/20 uppercase tracking-widest mr-2">{arch.efficiency} Eff.</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <button
                                onClick={handleSpawn}
                                disabled={isSpawning}
                                className="w-full py-5 bg-white text-black font-black text-sm rounded-2xl hover:bg-cyan-400 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)] uppercase tracking-[0.2em] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-3"
                            >
                                {isSpawning ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Synthesizing...
                                    </>
                                ) : (
                                    <>
                                        <Zap className="w-5 h-5" />
                                        Spawn Agent via OneClient
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Footer Info */}
                        <div className="p-6 bg-white/[0.02] border-t border-white/5 flex items-center justify-center gap-6">
                            <div className="flex items-center gap-2">
                                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-[9px] font-black text-white/20 uppercase tracking-widest leading-none">Standard Security Protocol</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
