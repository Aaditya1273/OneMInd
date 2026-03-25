'use client';

import { Plus, Cpu, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AgentsPage() {
    return (
        <div className="flex flex-col gap-6">
            {/* Page Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-[#e6edf3]">My Squad</h1>
                    <p className="text-sm text-[#8b949e] mt-1">Deploy and manage your personal vanguard of AI agents.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-[#238636] hover:bg-[#2ea043] text-white font-semibold text-sm rounded-lg transition-colors">
                    <Plus className="w-4 h-4" />
                    Spawn New Agent
                </button>
            </div>

            {/* Agent Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <AgentCard
                    name="ECHO-07"
                    status="Operational"
                    level={14}
                    energy={82}
                    brain="Gemini 1.5 Pro"
                    ops="14.2k"
                    isMain
                />
                <AgentCard
                    name="SYX-12"
                    status="Low Energy"
                    level={9}
                    energy={12}
                    brain="Gemini 1.5 Flash"
                    ops="8.1k"
                />

                {/* Spawn Slot */}
                <button className="border-2 border-dashed border-[#21262d] hover:border-[#388bfd] rounded-xl p-8 flex flex-col items-center justify-center gap-4 transition-colors group min-h-[320px] bg-[#0d1117]">
                    <div className="w-14 h-14 rounded-full bg-[#161b22] border border-[#21262d] group-hover:border-[#388bfd] flex items-center justify-center transition-colors">
                        <Plus className="w-7 h-7 text-[#8b949e] group-hover:text-[#58a6ff] transition-colors" />
                    </div>
                    <div className="text-center">
                        <div className="text-sm font-semibold text-[#8b949e] group-hover:text-[#e6edf3] transition-colors">Unit Slot Empty</div>
                        <div className="text-xs text-[#484f58] mt-1">Sync with Registry to expand squad</div>
                    </div>
                </button>
            </div>
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
            'bg-[#161b22] border rounded-xl overflow-hidden transition-colors',
            isMain ? 'border-[#1f6feb66]' : 'border-[#21262d] hover:border-[#30363d]'
        )}>
            {/* Card Header */}
            <div className={cn('px-5 py-3 border-b flex items-center justify-between', isMain ? 'border-[#1f6feb33] bg-[#1f6feb0d]' : 'border-[#21262d]')}>
                <div className="flex items-center gap-2">
                    <div className={cn('w-1.5 h-1.5 rounded-full', isHealthy ? 'bg-[#3fb950]' : 'bg-[#f0883e]')} />
                    <span className="text-xs font-medium text-[#8b949e] uppercase tracking-wider">{status}</span>
                </div>
                {isMain && (
                    <span className="text-[10px] font-bold text-[#58a6ff] bg-[#1f6feb1a] border border-[#1f6feb33] px-2 py-0.5 rounded uppercase tracking-wider">
                        Main Unit
                    </span>
                )}
            </div>

            {/* Card Body */}
            <div className="p-5">
                <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-lg bg-[#0d1117] border border-[#21262d] flex items-center justify-center flex-shrink-0 relative">
                        <Cpu className={cn('w-6 h-6', isMain ? 'text-[#58a6ff]' : 'text-[#8b949e]')} />
                        <div className="absolute -bottom-1.5 -right-1.5 w-5 h-5 rounded bg-[#21262d] border border-[#30363d] flex items-center justify-center text-[9px] font-bold text-[#e6edf3]">
                            {level}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-[#e6edf3]">{name}</h3>
                        <div className="text-xs text-[#8b949e] mt-0.5">{brain}</div>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="bg-[#0d1117] border border-[#21262d] p-3 rounded-lg">
                        <div className="text-[10px] text-[#8b949e] mb-1 font-medium">Throughput</div>
                        <div className="text-sm font-mono text-[#e6edf3] font-semibold">{ops} <span className="text-[11px] text-[#8b949e] font-normal">Ops</span></div>
                    </div>
                    <div className="bg-[#0d1117] border border-[#21262d] p-3 rounded-lg">
                        <div className="text-[10px] text-[#8b949e] mb-1 font-medium">Level</div>
                        <div className="text-sm font-mono text-[#e6edf3] font-semibold">{level}</div>
                    </div>
                </div>

                {/* Energy Bar */}
                <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                        <span className="text-xs text-[#8b949e] font-medium">Energy Reserves</span>
                        <span className={cn('text-xs font-mono font-semibold', energy < 20 ? 'text-[#f0883e]' : 'text-[#e6edf3]')}>{energy}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#21262d] rounded-full overflow-hidden">
                        <div
                            className={cn('h-full rounded-full', energy < 20 ? 'bg-[#f0883e]' : 'bg-[#58a6ff]')}
                            style={{ width: `${energy}%`, transition: 'width 0.6s ease' }}
                        />
                    </div>
                </div>
            </div>

            {/* Card Footer */}
            <div className="px-5 pb-5 flex gap-2">
                <button className="flex-1 py-2.5 px-4 bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] font-semibold text-xs rounded-lg transition-colors">
                    Sync Control
                </button>
                <button className="p-2.5 bg-[#21262d] hover:bg-[#30363d] rounded-lg transition-colors">
                    <MoreHorizontal className="w-4 h-4 text-[#8b949e]" />
                </button>
            </div>
        </div>
    );
}
