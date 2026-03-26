'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Zap, Cpu, Activity, Globe, Link2, Loader2, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useToast } from '@/components/ui/toast-context';
import { useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { OneChainService } from '@/lib/one-chain-service';

// ----------------------------------------------------
// Agent Details Modal
// ----------------------------------------------------
export function AgentDetailsModal({ isOpen, onClose, agent }: { isOpen: boolean, onClose: () => void, agent: any }) {
    if (!agent) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 z-[200] backdrop-blur-xl"
                    />
                    <div className="fixed inset-0 z-[200] pointer-events-none flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="w-full max-w-2xl bg-[#0a0a0a]/90 border border-white/10 rounded-[2rem] overflow-hidden pointer-events-auto shadow-[0_0_100px_rgba(6,182,212,0.1)] relative"
                        >
                            {/* Decorative Background */}
                            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-cyan-400/10 to-transparent pointer-events-none" />

                            <div className="p-10 relative z-10">
                                <div className="flex justify-between items-start mb-10">
                                    <div className="flex items-center gap-6">
                                        <div className="w-20 h-20 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center relative group">
                                            <div className="absolute inset-0 bg-cyan-400/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <Shield className="w-10 h-10 text-cyan-400 relative z-10" />
                                        </div>
                                        <div>
                                            <h2 className="text-4xl font-black text-white tracking-tighter uppercase mb-2">{agent.name}</h2>
                                            <div className="flex items-center gap-3">
                                                <span className="text-[10px] font-black text-cyan-400 px-3 py-1 bg-cyan-400/10 rounded-full border border-cyan-400/20 tracking-widest uppercase">
                                                    Vanguard-7 Class
                                                </span>
                                                <span className="text-[10px] font-black text-white/30 tracking-widest uppercase">
                                                    ID: {agent.id.substring(0, 12)}...
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors group">
                                        <X className="w-6 h-6 text-white/40 group-hover:text-white" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 gap-6 mb-10">
                                    <DetailCard icon={<Zap className="w-4 h-4 text-yellow-400" />} label="Throughput" value="1.5k OPS/sec" />
                                    <DetailCard icon={<Activity className="w-4 h-4 text-emerald-400" />} label="Uptime" value="99.98%" />
                                    <DetailCard icon={<Cpu className="w-4 h-4 text-cyan-400" />} label="Core Level" value={`Level ${agent.level || 1}`} />
                                    <DetailCard icon={<Globe className="w-4 h-4 text-indigo-400" />} label="Network Weight" value="4.2M ONE" />
                                </div>

                                <div className="space-y-4 mb-10">
                                    <div className="flex justify-between items-end">
                                        <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Neural Intelligence Growth</label>
                                        <span className="text-xs font-black text-cyan-400 uppercase tracking-widest">78% to next level</span>
                                    </div>
                                    <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5 p-[1px]">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: '78%' }}
                                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                                        />
                                    </div>
                                </div>

                                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 mb-10">
                                    <div className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] mb-4">On-Chain Metadata</div>
                                    <div className="grid grid-cols-1 gap-4">
                                        <MetadataItem label="Owner Protocol" value={agent.owner} />
                                        <MetadataItem label="Brain Hash" value="0x1f569a3...93d2abc" />
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        onClick={onClose}
                                        className="flex-1 py-4 bg-white/5 hover:bg-white/10 text-white font-black rounded-2xl transition-all border border-white/5 uppercase tracking-widest text-xs"
                                    >
                                        Close Terminal
                                    </button>
                                    <button
                                        className="flex-[2] py-4 bg-cyan-400 hover:bg-cyan-300 text-black font-black rounded-2xl transition-all shadow-[0_20px_40px_rgba(6,182,212,0.2)] uppercase tracking-widest text-xs flex items-center justify-center gap-2 group"
                                    >
                                        Establish Neural Link <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}

function DetailCard({ icon, label, value }: { icon: any, label: string, value: string }) {
    return (
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 group hover:border-white/10 transition-all">
            <div className="flex items-center gap-2 text-[9px] font-black text-white/30 uppercase tracking-[0.2em] mb-2">
                {icon} {label}
            </div>
            <div className="text-xl font-black text-white uppercase tracking-tighter">{value}</div>
        </div>
    );
}

function MetadataItem({ label, value }: { label: string, value: string }) {
    return (
        <div className="flex justify-between items-center text-[10px] font-medium tracking-tight overflow-hidden">
            <span className="text-white/40 uppercase whitespace-nowrap mr-4">{label}</span>
            <span className="text-white/60 font-mono text-xs truncate">{value}</span>
        </div>
    );
}

// ----------------------------------------------------
// Neural Link Modal (Connect Popup)
// ----------------------------------------------------
export function NeuralLinkModal({ isOpen, onClose, agent }: { isOpen: boolean, onClose: () => void, agent: any }) {
    const { showToast } = useToast();
    const { mutate: signAndExecute } = useSignAndExecuteTransaction();
    const [isLinking, setIsLinking] = useState(false);

    const handleLink = async () => {
        setIsLinking(true);
        showToast('Initiating Neural Handshake...', 'loading');

        try {
            const tx = new Transaction();
            // Simulate a "Link" call to the registry/main module
            tx.moveCall({
                target: `${OneChainService.PACKAGE_ID}::main::link_agent`,
                arguments: [
                    tx.pure.address(agent.id),
                    tx.object('0x6'), // Clock object for timestamping
                ],
            });

            signAndExecute(
                { transaction: tx },
                {
                    onSuccess: (result) => {
                        showToast('Neural Link Established!', 'success', result.digest);
                        setIsLinking(false);
                        onClose();
                    },
                    onError: (err) => {
                        showToast('Link Failed: ' + err.message, 'error');
                        setIsLinking(false);
                    }
                }
            );
        } catch (error) {
            setIsLinking(false);
            showToast('Connection interrupted.', 'error');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 z-[210] backdrop-blur-md"
                    />
                    <div className="fixed inset-0 z-[210] pointer-events-none flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 40 }}
                            className="w-full max-w-sm bg-[#0d1117] border border-[#30363d] rounded-2xl overflow-hidden pointer-events-auto shadow-2xl"
                        >
                            <div className="p-8 text-center">
                                <div className="w-16 h-16 rounded-full bg-cyan-400/10 flex items-center justify-center mx-auto mb-6">
                                    <Link2 className="w-8 h-8 text-cyan-400" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Establish Neural Link?</h3>
                                <p className="text-sm text-[#8b949e] mb-8 leading-relaxed">
                                    Synchronizing with <strong>{agent?.name}</strong> will allow you to monitor its activity and gain governance weight proportional to its level.
                                </p>

                                <div className="flex gap-3">
                                    <button
                                        onClick={onClose}
                                        className="flex-1 py-3 px-4 border border-[#30363d] text-[#c9d1d9] font-bold text-sm rounded-xl hover:bg-[#21262d] transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        disabled={isLinking}
                                        onClick={handleLink}
                                        className="flex-[2] py-3 px-4 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 text-black font-extrabold text-sm rounded-xl transition-all flex items-center justify-center gap-2"
                                    >
                                        {isLinking ? <Loader2 className="w-4 h-4 animate-spin" /> : <Link2 className="w-4 h-4" />}
                                        {isLinking ? 'Handshaking...' : 'Confirm Link'}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
