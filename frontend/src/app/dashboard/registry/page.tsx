'use client';

import { Search, Filter, Shield, Zap, TrendingUp, ChevronRight, Globe, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

const MOCK_AGENTS = [
    { id: 'ECH-07', name: 'Echo Vanguard', owner: '0x42...f3a', level: 14, class: 'Guardian', stats: '8.4k Ops', status: 'Active' },
    { id: 'SYX-12', name: 'Synergy Flux', owner: '0x1c...90b', level: 9, class: 'Trader', stats: '12.1k Ops', status: 'Mining' },
    { id: 'VLT-01', name: 'Vault Keeper', owner: '0xa4...112', level: 22, class: 'Treasury', stats: '44.2k Ops', status: 'Active' },
    { id: 'NRX-44', name: 'Neural Rex', owner: '0x99...ee4', level: 2, class: 'Scout', stats: '412 Ops', status: 'Syncing' },
];

const STATUS_STYLES: Record<string, string> = {
    Active: 'text-[#3fb950] bg-[#3fb9501a] border border-[#3fb95033]',
    Mining: 'text-[#58a6ff] bg-[#1f6feb1a] border border-[#1f6feb33]',
    Syncing: 'text-[#f0883e] bg-[#f0883e1a] border border-[#f0883e33]',
};

export default function RegistryPage() {
    return (
        <div className="flex flex-col gap-6">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[#e6edf3]">Neural Registry</h1>
                    <p className="text-sm text-[#8b949e] mt-1">Real-time explorer of all autonomous agents on OneChain.</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b949e]" />
                        <input
                            type="text"
                            placeholder="Search agent ID or address..."
                            className="bg-[#161b22] border border-[#30363d] rounded-lg pl-9 pr-4 py-2 text-sm text-[#e6edf3] placeholder:text-[#484f58] w-72 focus:border-[#388bfd] focus:outline-none transition-colors"
                        />
                    </div>
                    <button className="p-2 bg-[#161b22] border border-[#30363d] rounded-lg hover:bg-[#21262d] transition-colors text-[#8b949e] hover:text-[#e6edf3]">
                        <Filter className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard label="Global Agents" value="4,291" icon={<Globe className="w-4 h-4" />} accent />
                <StatCard label="Total Ops" value="1.2B" icon={<Zap className="w-4 h-4" />} />
                <StatCard label="Efficiency" value="99.2%" icon={<TrendingUp className="w-4 h-4" />} />
                <StatCard label="Network Hash" value="0x4f...91" icon={<Layers className="w-4 h-4" />} />
            </div>

            {/* Registry Table */}
            <div className="bg-[#161b22] border border-[#21262d] rounded-xl overflow-hidden">
                <div className="px-5 py-3.5 border-b border-[#21262d] bg-[#0d1117]">
                    <h2 className="text-sm font-semibold text-[#e6edf3]">All Registered Agents</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-[#21262d]">
                            <tr className="text-xs text-[#8b949e] font-semibold uppercase tracking-wider">
                                <th className="px-5 py-3 font-medium">Agent Identity</th>
                                <th className="px-5 py-3 font-medium">Owner</th>
                                <th className="px-5 py-3 font-medium">Class</th>
                                <th className="px-5 py-3 font-medium">Level</th>
                                <th className="px-5 py-3 font-medium">Throughput</th>
                                <th className="px-5 py-3 font-medium">Status</th>
                                <th className="px-5 py-3 font-medium text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#21262d]">
                            {MOCK_AGENTS.map((agent) => (
                                <tr key={agent.id} className="hover:bg-[#1c2128] transition-colors group">
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-[#0d1117] border border-[#21262d] group-hover:border-[#388bfd] flex items-center justify-center transition-colors flex-shrink-0">
                                                <Shield className="w-4 h-4 text-[#58a6ff]" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-[#e6edf3] group-hover:text-[#58a6ff] transition-colors">{agent.name}</div>
                                                <div className="text-[11px] text-[#8b949e] font-mono">{agent.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 text-[#8b949e] font-mono text-xs">{agent.owner}</td>
                                    <td className="px-5 py-4">
                                        <span className="px-2 py-0.5 rounded bg-[#21262d] text-[#c9d1d9] text-xs font-medium border border-[#30363d]">{agent.class}</span>
                                    </td>
                                    <td className="px-5 py-4 text-[#58a6ff] font-mono font-semibold">{agent.level}</td>
                                    <td className="px-5 py-4 text-[#c9d1d9] font-mono text-xs">{agent.stats}</td>
                                    <td className="px-5 py-4">
                                        <span className={cn('text-[11px] font-semibold px-2 py-0.5 rounded uppercase tracking-wide', STATUS_STYLES[agent.status] ?? 'text-[#8b949e]')}>
                                            {agent.status}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 text-right">
                                        <button className="p-1.5 text-[#8b949e] hover:text-[#58a6ff] hover:bg-[#1f6feb1a] rounded transition-colors">
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
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
            'border rounded-xl p-4',
            accent ? 'bg-[#1f6feb0d] border-[#1f6feb33]' : 'bg-[#161b22] border-[#21262d]'
        )}>
            <div className={cn('flex items-center gap-1.5 text-xs font-medium mb-2', accent ? 'text-[#58a6ff]' : 'text-[#8b949e]')}>
                {icon} {label}
            </div>
            <div className={cn('text-2xl font-bold tracking-tight', accent ? 'text-[#58a6ff]' : 'text-[#e6edf3]')}>{value}</div>
        </div>
    );
}
