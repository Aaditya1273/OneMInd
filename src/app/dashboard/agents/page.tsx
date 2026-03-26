'use client';

import React, { useState } from 'react';
import { Plus, Cpu, MoreHorizontal, ArrowUpRight, ArrowDownLeft, TrendingUp, History, ShieldCheck, Landmark, Zap, Loader2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useCurrentAccount } from '@mysten/dapp-kit';
import { useMyAgents } from '@/hooks/use-one-chain';
import { SpawnAgentModal } from '@/components/dashboard/spawn-modal';

export default function AgentsPage() {
    const account = useCurrentAccount();
    const { myAgents, loading } = useMyAgents(account?.address);
    const [isSpawnModalOpen, setIsSpawnModalOpen] = useState(false);

    if (loading && myAgents.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[600px] gap-6">
                <Loader2 className="w-12 h-12 text-cyan-400 animate-spin" />
                <div className="text-sm font-black text-white/40 uppercase tracking-[0.2em]">Recalling Squad from Ledger...</div>
            </div>
        )
    }

    if (!loading && myAgents.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[600px] text-center px-6">
                <div className="relative mb-12">
                    <div className="absolute inset-0 bg-cyan-500/20 blur-[100px] rounded-full animate-pulse" />
                    <div className="w-32 h-32 rounded-[2.5rem] bg-white/[0.03] border border-white/10 flex items-center justify-center relative z-10 shadow-2xl group cursor-pointer hover:border-cyan-400/30 transition-all">
                        <Sparkles className="w-14 h-14 text-white/10 group-hover:text-cyan-400 transition-all group-hover:scale-110" />
                    </div>
                </div>
                <h1 className="text-5xl font-black tracking-tighter text-white mb-4 uppercase">No Vanguard Detected</h1>
                <p className="text-lg text-white/40 font-medium tracking-tight mb-12 max-w-md mx-auto leading-relaxed">
                    Your wallet is connected, but your squad is currently offline. Synchronize with the OneChain Registry to deploy your first autonomous agent.
                </p>
                <button
                    onClick={() => setIsSpawnModalOpen(true)}
                    className="flex items-center gap-4 px-12 py-5 bg-white text-black font-black text-base rounded-full hover:bg-cyan-400 hover:scale-105 transition-all shadow-[0_30px_60px_rgba(255,255,255,0.15)] uppercase tracking-[0.2em]"
                >
                    <Plus className="w-6 h-6" />
                    Make your 1st strategy agent
                </button>
            </div>
        )
    }
    return (
        <div className="flex flex-col gap-10">
            {/* Page Header */}
            <div className="flex justify-between items-end pb-4 border-b border-white/5">
                <div>
                    <h1 className="text-5xl font-black tracking-tighter text-white mb-2">My Squad</h1>
                    <p className="text-base text-white/60 font-medium tracking-tight">Deploy and manage your personal vanguard of AI agents.</p>
                </div>
                <button
                    onClick={() => setIsSpawnModalOpen(true)}
                    className="flex items-center gap-3 px-8 py-3 bg-white text-black font-black text-sm rounded-full hover:bg-cyan-400 hover:scale-105 transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)] uppercase tracking-widest"
                >
                    <Plus className="w-5 h-5" />
                    Spawn Agent
                </button>
            </div>

            {/* Agent Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.isArray(myAgents) && myAgents.length > 0 ? (
                    myAgents.map((agent: any, index: number) => (
                        <AgentCard
                            key={agent.id}
                            name={agent.name}
                            status="Operational"
                            level={agent.level || 1}
                            energy={100 - (index * 5)}
                            brain="Gemini 1.5 Pro"
                            ops={agent.stats || "1.2k"}
                            isMain={index === 0}
                        />
                    ))
                ) : null}

                {/* Spawn Slot */}
                <button
                    onClick={() => setIsSpawnModalOpen(true)}
                    className="border-2 border-dashed border-white/5 hover:border-cyan-400/30 rounded-[2rem] p-10 flex flex-col items-center justify-center gap-6 transition-all group min-h-[380px] bg-white/[0.01] hover:bg-white/[0.03] active:scale-[0.98]"
                >
                    <div className="w-20 h-20 rounded-full bg-white/[0.03] border border-white/5 group-hover:border-cyan-400/30 flex items-center justify-center transition-all shadow-inner">
                        <Plus className="w-10 h-10 text-white/10 group-hover:text-cyan-400 transition-all group-hover:scale-110" />
                    </div>
                    <div className="text-center">
                        <div className="text-sm font-black text-white/40 group-hover:text-white transition-colors uppercase tracking-[0.2em]">Unit Slot Empty</div>
                        <div className="text-xs text-white/30 mt-2 font-medium tracking-tight group-hover:text-white/60 transition-colors uppercase tracking-widest">Sync with Registry to expand squad</div>
                    </div>
                </button>
            </div>

            <SpawnAgentModal
                isOpen={isSpawnModalOpen}
                onClose={() => setIsSpawnModalOpen(false)}
            />
        </div>
    );
}

interface AgentProps {
    name: string;
    status: string;
    level: number;
    energy: number;
    brain: string;
    ops: string;
    isMain?: boolean;
}

function AgentCard({ name, status, level, energy, brain, ops, isMain = false }: AgentProps) {
    const isHealthy = status === 'Operational';

    return (
        <div className={cn(
            'glass-card group transition-all relative overflow-hidden',
            isMain ? 'ring-1 ring-cyan-400/30' : ''
        )}>
            {/* Card Header */}
            <div className="px-8 py-5 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center gap-3">
                    <div className={cn('w-2 h-2 rounded-full shadow-[0_0_10px_currentColor]', isHealthy ? 'text-emerald-400 bg-emerald-400' : 'text-rose-400 bg-rose-400')} />
                    <span className="text-[10px] font-black text-white/60 uppercase tracking-[0.2em]">{status}</span>
                </div>
                {isMain && (
                    <span className="text-[9px] font-black text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-2.5 py-1 rounded-full uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                        Main Unit
                    </span>
                )}
            </div>

            {/* Card Body */}
            <div className="p-8">
                <div className="flex items-center gap-5 mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center flex-shrink-0 relative shadow-inner group-hover:border-cyan-400/30 transition-colors">
                        <Cpu className={cn('w-8 h-8 transition-colors', isMain ? 'text-cyan-400' : 'text-white/20 group-hover:text-cyan-400')} />
                        <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-xl bg-black border border-white/10 flex items-center justify-center text-[11px] font-black text-white shadow-xl">
                            {level}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-white tracking-tighter uppercase group-hover:text-cyan-400 transition-colors">{name}</h3>
                        <div className="text-[10px] text-white/40 font-black uppercase tracking-widest mt-1 tracking-[0.15em]">{brain}</div>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl group/stat hover:bg-white/[0.04] transition-all">
                        <div className="text-[9px] text-white/40 mb-2 font-black uppercase tracking-[0.2em] group-hover/stat:text-white/60 transition-colors">Throughput</div>
                        <div className="text-base font-black text-white tracking-tighter uppercase group-hover/stat:text-cyan-400 transition-colors">
                            {ops} <span className="text-[10px] text-white/40 font-black ml-1">Ops</span>
                        </div>
                    </div>
                    <div className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl group/stat hover:bg-white/[0.04] transition-all">
                        <div className="text-[9px] text-white/40 mb-2 font-black uppercase tracking-[0.2em] group-hover/stat:text-white/60 transition-colors">Integrity</div>
                        <div className="text-base font-black text-white tracking-tighter uppercase group-hover/stat:text-cyan-400 transition-colors">High</div>
                    </div>
                </div>

                {/* Energy Bar */}
                <div className="space-y-3">
                    <div className="flex justify-between items-end px-1">
                        <span className="text-[10px] text-white/40 font-black uppercase tracking-[0.2em]">Energy Reserves</span>
                        <span className={cn('text-xs font-black tracking-tighter', energy < 20 ? 'text-rose-400 animate-pulse' : 'text-white')}>{energy}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden shadow-inner">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${energy}%` }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className={cn('h-full rounded-full transition-all', energy < 20 ? 'bg-rose-400 shadow-[0_0_15px_rgba(251,113,133,0.5)]' : 'bg-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.5)]')}
                        />
                    </div>
                </div>
            </div>

            {/* Card Footer */}
            <div className="px-8 pb-8 flex gap-3">
                <button className="flex-1 py-3 px-6 bg-white/[0.03] border border-white/5 hover:border-cyan-400/30 hover:bg-cyan-400/10 text-white font-black text-[10px] rounded-full transition-all uppercase tracking-widest active:scale-95">
                    Sync Control
                </button>
                <button className="p-3 bg-white/[0.03] border border-white/5 hover:border-rose-400/30 hover:bg-rose-400/10 rounded-full transition-all group/btn active:scale-95">
                    <MoreHorizontal className="w-4 h-4 text-white/40 group-hover/btn:text-rose-400 transition-colors" />
                </button>
            </div>
        </div>
    );
}
