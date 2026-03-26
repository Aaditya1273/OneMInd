'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cpu, Zap, Shield, Sparkles, Loader2, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/toast-context';
import { useSignAndExecuteTransaction, useCurrentAccount } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { OneChainService } from '@/lib/one-chain-service';

interface SpawnAgentModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ARCHITECTURES = [
    {
        id: 'vanguard',
        name: 'Vanguard-7',
        type: 'Combat / Security',
        efficiency: '98%',
        description: 'Front-line autonomous entity specialized in network security audits and active threat neutralization.'
    },
    {
        id: 'sentinel',
        name: 'Sentinel-X',
        type: 'Defense / Guardian',
        efficiency: '99%',
        description: 'Tactical defense unit designed for vault monitoring, encrypted storage guardianship, and asset preservation.'
    },
    {
        id: 'oracle',
        name: 'Oracle-P',
        type: 'Intel / Prediction',
        efficiency: '97%',
        description: 'Predictive intelligence core focused on market trend analysis, sentiment prediction, and high-frequency data synthesis.'
    },
];

export function SpawnAgentModal({ isOpen, onClose }: SpawnAgentModalProps) {
    const [name, setName] = useState('');
    const [selectedArch, setSelectedArch] = useState('vanguard');
    const [isSpawning, setIsSpawning] = useState(false);
    const { mutate: signAndExecute } = useSignAndExecuteTransaction();
    const account = useCurrentAccount();
    const { showToast } = useToast();

    const handleSpawn = async () => {
        if (!account) {
            showToast('Please connect your wallet first', 'error');
            return;
        }
        if (!name) {
            showToast('Agent Name is Required', 'error');
            return;
        }

        setIsSpawning(true);
        showToast(`Requesting Synthesis for ${name}...`, 'loading');

        try {
            OneChainService._checkConfig();
            console.log('[OneChain] Building Spawn PTB:', {
                target: `${OneChainService.PACKAGE_ID}::main::spawn_agent`,
                registry: OneChainService.REGISTRY_ID,
                name
            });

            const tx = new Transaction();
            tx.moveCall({
                target: `${OneChainService.PACKAGE_ID}::main::spawn_agent`,
                arguments: [
                    tx.object(OneChainService.REGISTRY_ID),
                    tx.pure.string(name),
                ],
            });

            signAndExecute(
                { transaction: tx },
                {
                    onSuccess: (result) => {
                        showToast(`${name} Successfully Synthesized!`, 'success', result.digest);
                        console.log('Spawn success:', result);
                        setIsSpawning(false);
                        onClose();
                        setName('');
                    },
                    onError: (error) => {
                        showToast('Synthesis Failed: ' + error.message, 'error');
                        console.error('Spawn error:', error);
                        setIsSpawning(false);
                    },
                }
            );
        } catch (error: any) {
            showToast('Transaction Error: ' + error.message, 'error');
            setIsSpawning(false);
        }
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
                                        <div key={arch.id} className="relative group">
                                            <button
                                                onClick={() => setSelectedArch(selectedArch === arch.id ? '' : arch.id)}
                                                className={cn(
                                                    "w-full p-4 rounded-2xl border flex items-center justify-between transition-all relative overflow-hidden",
                                                    selectedArch === arch.id
                                                        ? "bg-cyan-400/10 border-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.1)]"
                                                        : "bg-white/[0.02] border-white/5 hover:border-white/20"
                                                )}
                                            >
                                                <div className="flex items-center gap-4 relative z-10">
                                                    <div className={cn(
                                                        "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                                                        selectedArch === arch.id ? "bg-cyan-400 text-black" : "bg-white/5 text-white/20 group-hover:text-white"
                                                    )}>
                                                        <Cpu className="w-5 h-5" />
                                                    </div>
                                                    <div className="text-left">
                                                        <div className={cn("text-xs font-black uppercase tracking-widest flex items-center gap-2", selectedArch === arch.id ? "text-cyan-400" : "text-white")}>
                                                            {arch.name}
                                                        </div>
                                                        <div className="text-[9px] text-white/40 font-black uppercase tracking-widest mt-0.5">{arch.type}</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4 relative z-10">
                                                    <div className="text-[10px] font-black text-white/20 uppercase tracking-widest">{arch.efficiency} Eff.</div>
                                                    <div className="p-1.5 rounded-md hover:bg-white/10 transition-colors pointer-events-auto" title={arch.description}>
                                                        <Info className="w-3.5 h-3.5 text-white/20 group-hover:text-cyan-400/60 transition-colors" />
                                                    </div>
                                                </div>
                                            </button>

                                            {/* Expandable description if selected or hovered info */}
                                            <AnimatePresence>
                                                {selectedArch === arch.id && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="px-6 py-4 text-[10px] text-white/40 font-medium leading-relaxed uppercase tracking-wider border-x border-b border-cyan-400/20 bg-cyan-400/[0.02] rounded-b-2xl -mt-2">
                                                            {arch.description}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
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
