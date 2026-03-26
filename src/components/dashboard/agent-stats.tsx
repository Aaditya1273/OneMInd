import { Zap, Award, Database, Cpu, Loader2, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCurrentAccount } from '@mysten/dapp-kit';
import { useMyAgents } from '@/hooks/use-one-chain';

export function AgentStats({ onSpawnClick }: { onSpawnClick: () => void }) {
    const account = useCurrentAccount();
    const { myAgents, loading } = useMyAgents(account?.address);

    const agent = myAgents[0];

    if (loading && myAgents.length === 0) {
        return (
            <div className="glass-card p-10 h-full flex flex-col items-center justify-center gap-6">
                <Loader2 className="w-10 h-10 text-cyan-400 animate-spin" />
                <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Syncing Neural Link...</div>
            </div>
        )
    }

    if (!agent) {
        return (
            <div className="glass-card p-10 group relative overflow-hidden h-full flex flex-col justify-center transition-all duration-500">
                <div className="absolute inset-0 bg-cyan-500/5 blur-[80px]" />
                <div className="relative z-10 text-center">
                    <div className="w-20 h-20 rounded-3xl bg-white/[0.03] border border-white/10 flex items-center justify-center mx-auto mb-8 group-hover:border-cyan-400/30 transition-all">
                        <Cpu className="w-10 h-10 text-white/10 group-hover:text-cyan-400 transition-all" />
                    </div>
                    <h2 className="text-2xl font-black text-white tracking-tighter uppercase mb-2">No Active Link</h2>
                    <p className="text-[11px] text-white/40 font-bold uppercase tracking-widest mb-10 max-w-[200px] mx-auto leading-relaxed">
                        Deploy your first agent to initialize telemetry.
                    </p>
                    <button
                        onClick={onSpawnClick}
                        className="w-full py-4 px-8 bg-white text-black font-black text-[11px] rounded-full hover:bg-cyan-400 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 uppercase tracking-widest shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
                    >
                        <Plus className="w-4 h-4" />
                        Spawn Agent
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-8 h-full">
            {/* Agent Identity Card */}
            <div className="glass-card p-10 group relative overflow-hidden h-[460px] flex flex-col justify-center transition-all duration-500">

                <div className="flex items-center gap-6 mb-10">
                    <div className="w-24 h-24 rounded-3xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0 shadow-[0_0_30px_rgba(6,182,212,0.15)] group-hover:scale-105 transition-transform duration-500">
                        <Cpu className="w-12 h-12 text-cyan-400" />
                    </div>
                    <div className="overflow-hidden">
                        <h2 className="text-3xl font-black text-white tracking-tighter leading-tight mb-2 truncate uppercase">{agent.name}</h2>
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] font-black text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-3 py-1 rounded-full uppercase tracking-widest whitespace-nowrap">Level {agent.level || 1}</span>
                            <span className="text-[9px] text-white/40 font-black uppercase tracking-[0.2em]">{String(agent.id).substring(0, 10)}...</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <StatBar label="Efficiency" value={98} icon={<Zap className="w-5 h-5" />} color="bg-cyan-400" glow="shadow-[0_0_20px_rgba(6,182,212,0.6)]" />
                    <StatBar label="Uptime" value={100} icon={<Award className="w-5 h-5" />} color="bg-purple-500" glow="shadow-[0_0_20px_rgba(168,85,247,0.6)]" />
                    <StatBar label="Integrity" value={100} icon={<Database className="w-5 h-5" />} color="bg-emerald-400" glow="shadow-[0_0_20px_rgba(52,211,153,0.6)]" />
                </div>
            </div>

            {/* Live Telemetry */}
            <div className="glass-card p-10 h-[258px] flex flex-col justify-center transition-all duration-500">
                <h3 className="text-[11px] font-black text-white/40 uppercase tracking-[0.25em] flex items-center gap-2 mb-8">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.6)] animate-pulse" />
                    Live Telemetry
                </h3>
                <div className="grid grid-cols-2 gap-6">
                    <SmallStat label="Operations" value={agent.stats || "1,2k"} />
                    <SmallStat label="Success Rate" value="99.4%" />
                    <SmallStat label="Node Sync" value="Verified" />
                    <SmallStat label="Cognition" value="Stable" />
                </div>
            </div>
        </div>
    );
}

function StatBar({ label, value, icon, color, glow }: { label: string, value: number, icon: React.ReactNode, color: string, glow: string }) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center px-1">
                <span className="text-[12px] font-black text-white/60 uppercase tracking-widest flex items-center gap-3">{icon} {label}</span>
                <span className="text-sm font-black text-white tracking-tighter">{value}%</span>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className={`h-full ${color} rounded-full ${glow}`}
                />
            </div>
        </div>
    );
}

function SmallStat({ label, value }: { label: string, value: string }) {
    return (
        <div className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl group/stat hover:bg-white/[0.04] transition-all">
            <div className="text-[9px] text-white/40 mb-2 font-black uppercase tracking-[0.2em] group-hover/stat:text-white/60 transition-colors">{label}</div>
            <div className="text-lg font-black text-white tracking-tighter group-hover/stat:text-cyan-400 transition-colors uppercase">{value}</div>
        </div>
    );
}
