'use client';

import { Search, Filter, Shield, Zap, TrendingUp, ChevronRight, Globe, Layers, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRegistryAgents, useRegistryStats } from '@/hooks/use-one-chain';

const STATUS_STYLES: Record<string, string> = {
    Active: 'text-[#3fb950] bg-[#3fb9501a] border border-[#3fb95033]',
    Mining: 'text-[#58a6ff] bg-[#1f6feb1a] border border-[#1f6feb33]',
    Syncing: 'text-[#f0883e] bg-[#f0883e1a] border border-[#f0883e33]',
};

export default function RegistryPage() {
    const { agents, loading: agentsLoading } = useRegistryAgents();
    const { stats, loading: statsLoading } = useRegistryStats();

    if (agentsLoading && agents.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[600px] gap-6">
                <Loader2 className="w-12 h-12 text-cyan-400 animate-spin" />
                <div className="text-sm font-black text-white/40 uppercase tracking-[0.2em]">Synchronizing Registry...</div>
            </div>
        )
    }
    return (
        <div className="flex flex-col gap-10">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 pb-4 border-b border-white/5">
                <div>
                    <h1 className="text-5xl font-black tracking-tighter text-white mb-2">Neural Registry</h1>
                    <p className="text-base text-white/60 font-medium tracking-tight">Real-time explorer of all autonomous agents on OneChain.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-cyan-400 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search agent ID..."
                            className="bg-white/[0.02] border border-white/5 rounded-full pl-11 pr-6 py-3 text-sm text-white placeholder:text-white/30 w-80 focus:border-cyan-400/30 focus:outline-none transition-all shadow-inner focus:bg-white/[0.04]"
                        />
                    </div>
                    <button className="p-3 bg-white/[0.02] border border-white/5 rounded-full hover:bg-white/[0.04] transition-all text-white/40 hover:text-white group active:scale-95">
                        <Filter className="w-4 h-4 group-hover:rotate-180 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <StatCard label="Global Agents" value={stats.totalAgents.toString()} icon={<Globe className="w-4 h-4" />} accent />
                <StatCard label="Total Ops" value={stats.totalOps} icon={<Zap className="w-4 h-4" />} />
                <StatCard label="Efficiency" value={stats.efficiency} icon={<TrendingUp className="w-4 h-4" />} />
                <StatCard label="Network Hash" value={stats.networkHash} icon={<Layers className="w-4 h-4" />} />
            </div>

            {/* Registry Table */}
            <div className="glass-card overflow-hidden">
                <div className="px-8 py-5 border-b border-white/5 bg-white/[0.02]">
                    <h2 className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">All Registered Agents</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                        <thead className="border-b border-white/5">
                            <tr className="text-[9px] text-white/40 font-black uppercase tracking-[0.2em]">
                                <th className="px-8 py-4 font-black">Agent Identity</th>
                                <th className="px-8 py-4 font-black">Owner</th>
                                <th className="px-8 py-4 font-black">Class</th>
                                <th className="px-8 py-4 font-black text-center">Level</th>
                                <th className="px-8 py-4 font-black">Throughput</th>
                                <th className="px-8 py-4 font-black">Status</th>
                                <th className="px-8 py-4 font-black text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {Array.isArray(agents) && agents.length > 0 ? (
                                agents.map((agent: any) => (
                                    <tr key={agent.id} className="hover:bg-cyan-400/[0.02] transition-colors group cursor-pointer">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 group-hover:border-cyan-400/30 flex items-center justify-center transition-all flex-shrink-0 shadow-inner">
                                                    <Shield className="w-5 h-5 text-cyan-400/40 group-hover:text-cyan-400 group-hover:scale-110 transition-all" />
                                                </div>
                                                <div>
                                                    <div className="font-black text-base text-white tracking-tighter uppercase group-hover:text-cyan-400 transition-colors">{agent.name}</div>
                                                    <div className="text-[10px] text-white/30 font-black uppercase tracking-widest">{agent.id.substring(0, 10)}...</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-white/40 font-black text-[10px] uppercase tracking-widest group-hover:text-white/60 transition-colors">{agent.owner.substring(0, 6)}...{agent.owner.substring(agent.owner.length - 4)}</td>
                                        <td className="px-8 py-5">
                                            <span className="px-3 py-1 rounded-full bg-white/[0.03] text-white/60 text-[9px] font-black border border-white/10 uppercase tracking-widest group-hover:border-white/20 transition-colors">Vanguard</span>
                                        </td>
                                        <td className="px-8 py-5 text-center text-white font-black text-base tracking-tighter group-hover:text-cyan-400 transition-colors">{agent.level || 1}</td>
                                        <td className="px-8 py-5 text-white/60 font-black text-[10px] uppercase tracking-widest group-hover:text-white transition-colors">{agent.stats || "1.2k Ops"}</td>
                                        <td className="px-8 py-5">
                                            <span className={cn('text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest border transition-all', STATUS_STYLES["Active"])}>
                                                Active
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <button className="p-2 text-white/30 hover:text-cyan-400 hover:bg-cyan-400/10 rounded-full transition-all active:scale-95">
                                                <ChevronRight className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-12 h-12 rounded-full border-2 border-dashed border-white/10 animate-spin" />
                                            <div className="text-xs font-black text-white/20 uppercase tracking-[0.2em]">Scanning OneChain Registry...</div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function StatCard({ label, value, icon, accent }: { label: string, value: string, icon: any, accent?: boolean }) {
    return (
        <div className={cn(
            'glass-card p-6 group relative overflow-hidden',
            accent ? 'ring-1 ring-cyan-400/30' : ''
        )}>
            <div className={cn('flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] mb-4', accent ? 'text-cyan-400' : 'text-white/40')}>
                {icon} {label}
            </div>
            <div className={cn('text-4xl font-black tracking-tighter uppercase', accent ? 'text-white' : 'text-white/80 group-hover:text-white transition-colors')}>{value}</div>
            <div className="absolute -bottom-2 -right-2 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                {icon && <div className="scale-[3] transform">{icon}</div>}
            </div>
        </div>
    );
}
