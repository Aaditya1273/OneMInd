'use client';

import { Zap, Award, Database, Cpu } from 'lucide-react';

export function AgentStats() {
    return (
        <div className="flex flex-col gap-4">
            {/* Agent Identity Card */}
            <div className="bg-[#0d1117] border border-[#30363d] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-[#58a6ff]/10 border border-[#58a6ff]/20 flex items-center justify-center flex-shrink-0">
                        <Cpu className="w-6 h-6 text-[#58a6ff]" />
                    </div>
                    <div>
                        <h2 className="text-base font-semibold text-[#e6edf3] font-mono">ECHO-7</h2>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-[#58a6ff] bg-[#58a6ff]/10 border border-[#58a6ff]/20 px-2 py-0.5 rounded font-mono font-medium">Level 1</span>
                            <span className="text-xs text-[#8b949e] font-mono">Vanguard</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <StatBar label="Energy Sync" value={84} icon={<Zap className="w-3.5 h-3.5" />} color="bg-[#58a6ff]" />
                    <StatBar label="Neural XP" value={12} icon={<Award className="w-3.5 h-3.5" />} color="bg-[#bc8cff]" />
                    <StatBar label="Memory Hash" value={100} icon={<Database className="w-3.5 h-3.5" />} color="bg-[#3fb950]" />
                </div>
            </div>

            {/* Live Telemetry */}
            <div className="bg-[#0d1117] border border-[#30363d] rounded-xl p-6">
                <h3 className="text-xs font-semibold text-[#8b949e] uppercase tracking-wider flex items-center gap-2 mb-4 font-mono">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#3fb950]" />
                    Live Telemetry
                </h3>
                <div className="grid grid-cols-2 gap-3">
                    <SmallStat label="Operations" value="1,284" />
                    <SmallStat label="Success Rate" value="99.4%" />
                    <SmallStat label="Uptime" value="142h" />
                    <SmallStat label="Cognition" value="High" />
                </div>
            </div>
        </div>
    );
}

function StatBar({ label, value, icon, color }: { label: string, value: number, icon: React.ReactNode, color: string }) {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
                <span className="text-xs text-[#8b949e] flex items-center gap-1.5 font-mono">{icon} {label}</span>
                <span className="text-xs font-mono text-[#e6edf3] font-semibold">{value}%</span>
            </div>
            <div className="h-2 w-full bg-[#161b22] rounded-full overflow-hidden">
                <div
                    className={`h-full ${color} rounded-full transition-all duration-700 ease-out`}
                    style={{ width: `${value}%` }}
                />
            </div>
        </div>
    );
}

function SmallStat({ label, value }: { label: string, value: string }) {
    return (
        <div className="bg-[#161b22] border border-[#30363d] p-3 rounded-lg">
            <div className="text-[10px] text-[#8b949e] mb-1.5 font-mono uppercase tracking-wider">{label}</div>
            <div className="text-sm font-mono text-[#e6edf3] font-bold">{value}</div>
        </div>
    );
}
