'use client';

import { Zap, Award, Database, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

export function AgentStats() {
    return (
        <div className="flex flex-col gap-8 h-full">
            {/* Agent Identity Card */}
            <div className="glass-card p-10 group relative overflow-hidden h-[460px] flex flex-col justify-center transition-all duration-500">
                <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Cpu className="w-28 h-28" />
                </div>

                <div className="flex items-center gap-6 mb-10">
                    <div className="w-24 h-24 rounded-3xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0 shadow-[0_0_30px_rgba(6,182,212,0.15)] group-hover:scale-105 transition-transform duration-500">
                        <Cpu className="w-12 h-12 text-cyan-400" />
                    </div>
                    <div>
                        <h2 className="text-4xl font-black text-white tracking-tighter leading-tight mb-2">ECHO-7</h2>
                        <div className="flex items-center gap-3">
                            <span className="text-[11px] font-black text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-3 py-1.5 rounded-full uppercase tracking-widest shadow-[0_0_15px_rgba(6,182,212,0.1)]">Level 1</span>
                            <span className="text-[11px] text-white/50 font-black uppercase tracking-[0.25em]">Vanguard</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <StatBar label="Energy Sync" value={84} icon={<Zap className="w-5 h-5" />} color="bg-cyan-400" glow="shadow-[0_0_20px_rgba(6,182,212,0.6)]" />
                    <StatBar label="Neural XP" value={12} icon={<Award className="w-5 h-5" />} color="bg-purple-500" glow="shadow-[0_0_20px_rgba(168,85,247,0.6)]" />
                    <StatBar label="Memory Hash" value={100} icon={<Database className="w-5 h-5" />} color="bg-emerald-400" glow="shadow-[0_0_20px_rgba(52,211,153,0.6)]" />
                </div>
            </div>

            {/* Live Telemetry */}
            <div className="glass-card p-10 h-[258px] flex flex-col justify-center transition-all duration-500">
                <h3 className="text-[11px] font-black text-white/40 uppercase tracking-[0.25em] flex items-center gap-2 mb-8">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.6)] animate-pulse" />
                    Live Telemetry
                </h3>
                <div className="grid grid-cols-2 gap-6">
                    <SmallStat label="Operations" value="1,284" />
                    <SmallStat label="Success Rate" value="99.4%" />
                    <SmallStat label="Uptime" value="142h" />
                    <SmallStat label="Cognition" value="High" />
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
