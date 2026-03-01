'use client';

import { Activity, Zap, Award, Database, Cpu } from 'lucide-react';

export function AgentStats() {
    return (
        <div className="flex flex-col gap-4">
            {/* Agent Identity Card */}
            <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-5">
                <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-lg bg-[#1f6feb1a] border border-[#1f6feb33] flex items-center justify-center flex-shrink-0">
                        <Cpu className="w-6 h-6 text-[#58a6ff]" />
                    </div>
                    <div>
                        <h2 className="text-base font-semibold text-[#e6edf3]">ECHO-7</h2>
                        <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs text-[#58a6ff] bg-[#1f6feb1a] border border-[#1f6feb33] px-2 py-0.5 rounded font-medium">Level 1</span>
                            <span className="text-xs text-[#8b949e]">Vanguard</span>
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
            <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-5">
                <h3 className="text-xs font-semibold text-[#8b949e] uppercase tracking-wider flex items-center gap-2 mb-4">
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
        <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
                <span className="text-xs text-[#8b949e] flex items-center gap-1.5">{icon} {label}</span>
                <span className="text-xs font-mono text-[#e6edf3] font-medium">{value}%</span>
            </div>
            <div className="h-1.5 w-full bg-[#21262d] rounded-full overflow-hidden">
                <div
                    className={`h-full ${color} rounded-full`}
                    style={{ width: `${value}%`, transition: 'width 0.8s ease' }}
                />
            </div>
        </div>
    );
}

function SmallStat({ label, value }: { label: string, value: string }) {
    return (
        <div className="bg-[#0d1117] border border-[#21262d] p-3 rounded-lg">
            <div className="text-[11px] text-[#8b949e] mb-1 font-medium">{label}</div>
            <div className="text-sm font-mono text-[#e6edf3] font-semibold">{value}</div>
        </div>
    );
}
