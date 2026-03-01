'use client';

import { Search, Filter, Shield, Zap, TrendingUp, ChevronRight, Globe, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const MOCK_AGENTS = [
    { id: 'ECH-07', name: 'Echo Vanguard', owner: '0x42...f3a', level: 14, class: 'Guardian', stats: '8.4k Ops', status: 'Active' },
    { id: 'SYX-12', name: 'Synergy Flux', owner: '0x1c...90b', level: 9, class: 'Trader', stats: '12.1k Ops', status: 'Mining' },
    { id: 'VLT-01', name: 'Vault Keeper', owner: '0xa4...112', level: 22, class: 'Treasury', stats: '44.2k Ops', status: 'Active' },
    { id: 'NRX-44', name: 'Neural Rex', owner: '0x99...ee4', level: 2, class: 'Scout', stats: '412 Ops', status: 'Syncing' },
];

export default function RegistryPage() {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <h1 className="text-4xl font-bold tracking-tighter mb-2">NEURAL <span className="text-cyan-400">REGISTRY</span></h1>
                    <p className="text-gray-500 text-sm">Real-time explorer of all autonomous agents on OneChain.</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search Agent ID/Address..."
                            className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm w-[300px] focus:border-cyan-500/50 outline-none transition-all"
                        />
                    </div>
                    <button className="p-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-gray-400">
                        <Filter className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <RegistryStat label="Global Agents" value="4,291" icon={<Globe className="w-4 h-4" />} />
                <StatCard label="Total Ops" value="1.2B" icon={<Zap className="w-4 h-4" />} />
                <StatCard label="Efficiency" value="99.2%" icon={<TrendingUp className="w-4 h-4" />} />
                <StatCard label="Network Hash" value="0x4f...91" icon={<Layers className="w-4 h-4" />} />
            </div>

            <div className="glass-card overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-white/5 text-[10px] uppercase font-mono tracking-widest text-gray-500">
                        <tr>
                            <th className="px-6 py-4">Agent Identity</th>
                            <th className="px-6 py-4">Current Owner</th>
                            <th className="px-6 py-4">Class / Rank</th>
                            <th className="px-6 py-4">Level</th>
                            <th className="px-6 py-4">Throughput</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-mono text-xs">
                        {MOCK_AGENTS.map((agent, i) => (
                            <motion.tr
                                key={agent.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="group hover:bg-white/[0.02] transition-colors"
                            >
                                <td className="px-6 py-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 group-hover:border-cyan-500 transition-colors">
                                            <Shield className="w-4 h-4 text-cyan-400 shadow-[0_0_10px_rgba(0,242,255,0.4)]" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-white group-hover:text-cyan-400 transition-colors uppercase">{agent.name}</div>
                                            <div className="text-[10px] text-gray-500">{agent.id}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-6 text-gray-400 group-hover:text-white transition-colors">{agent.owner}</td>
                                <td className="px-6 py-6">
                                    <span className="px-2 py-1 rounded bg-white/5 text-gray-400 uppercase text-[10px] tracking-widest">{agent.class}</span>
                                </td>
                                <td className="px-6 py-6 text-cyan-400">{agent.level}</td>
                                <td className="px-6 py-6 text-gray-400">{agent.stats}</td>
                                <td className="px-6 py-6">
                                    <div className="flex items-center gap-2">
                                        <div className={cn(
                                            "w-1.5 h-1.5 rounded-full animate-pulse",
                                            agent.status === 'Active' ? 'bg-green-500' : 'bg-amber-500'
                                        )} />
                                        <span className="uppercase text-[10px] text-gray-400">{agent.status}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-6 text-right">
                                    <button className="p-2 hover:text-cyan-400 transition-colors">
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function RegistryStat({ label, value, icon }: { label: string, value: string, icon: any }) {
    return (
        <div className="bg-cyan-500/5 border border-cyan-500/10 p-6 rounded-2xl">
            <div className="flex items-center gap-2 text-cyan-400/50 uppercase text-[10px] tracking-widest mb-2">
                {icon} {label}
            </div>
            <div className="text-3xl font-black text-cyan-400 tracking-tighter text-glow">{value}</div>
        </div>
    );
}

function StatCard({ label, value, icon }: { label: string, value: string, icon: any }) {
    return (
        <div className="glass-card p-6">
            <div className="flex items-center gap-2 text-gray-500 uppercase text-[10px] tracking-widest mb-2">
                {icon} {label}
            </div>
            <div className="text-3xl font-black text-white tracking-tighter">{value}</div>
        </div>
    );
}
