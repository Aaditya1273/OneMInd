'use client';

import { motion } from 'framer-motion';
import { Activity, Zap, Award, Database, Cpu } from 'lucide-react';

export function AgentStats() {
    return (
        <div className="flex flex-col gap-6">
            {/* Agent Identity Card */}
            <div className="glass-card p-6 neural-border overflow-hidden">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center border border-cyan-500/30">
                        <Cpu className="w-8 h-8 text-cyan-400" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold tracking-tight">ECHO-7</h2>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded uppercase tracking-widest">Level 1</span>
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest italic">Vanguard Class</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <StatBar label="Energy Sync" value={84} icon={<Zap className="w-3 h-3" />} color="bg-cyan-400" />
                    <StatBar label="Neural XP" value={12} icon={<Award className="w-3 h-3" />} color="bg-purple-400" />
                    <StatBar label="Memory Hash" value={100} icon={<Database className="w-3 h-3" />} color="bg-pink-400" />
                </div>
            </div>

            {/* Activity Status */}
            <div className="glass-card p-6 flex flex-col gap-4">
                <h3 className="text-xs font-mono text-gray-500 uppercase tracking-[0.2em] flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    Live Telemetry
                </h3>

                <div className="grid grid-cols-2 gap-4">
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
            <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-gray-400">
                <span className="flex items-center gap-1.5">{icon} {label}</span>
                <span className="font-mono text-white">{value}%</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full ${color} shadow-[0_0_10px_rgba(0,242,255,0.3)]`}
                />
            </div>
        </div>
    );
}

function SmallStat({ label, value }: { label: string, value: string }) {
    return (
        <div className="bg-white/5 p-3 rounded-xl border border-white/5">
            <div className="text-[10px] text-gray-500 uppercase mb-1">{label}</div>
            <div className="text-sm font-mono text-white">{value}</div>
        </div>
    );
}
