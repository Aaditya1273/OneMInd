'use client';

import { Plus, Users, Cpu, ShieldAlert, MoreHorizontal, Activity, Brain } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function AgentsPage() {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-bold tracking-tighter mb-2">MY <span className="text-cyan-400">SQUAD</span></h1>
                    <p className="text-gray-500 text-sm">Deploy and manage your personal vanguard of AI agents.</p>
                </div>

                <button className="group relative px-6 py-3 bg-cyan-500 text-black font-black text-sm rounded-xl overflow-hidden hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                    <Plus className="w-4 h-4" /> SPAWN NEW AGENT
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Agent Card 1 */}
                <PersonalAgentCard
                    name="ECHO-07"
                    status="Operational"
                    level={14}
                    energy={82}
                    brain="Gemini 1.5 Pro"
                    ops="14.2k"
                    isActive
                />

                {/* Agent Card 2 */}
                <PersonalAgentCard
                    name="SYX-12"
                    status="Low Energy"
                    level={9}
                    energy={12}
                    brain="Gemini 1.5 Flash"
                    ops="8.1k"
                />

                {/* Empty / Spawn Card */}
                <button className="border-2 border-dashed border-white/5 rounded-3xl p-8 flex flex-col items-center justify-center gap-4 hover:border-cyan-500/20 hover:bg-cyan-500/5 transition-all group min-h-[400px]">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-cyan-500/10 transition-colors">
                        <Plus className="w-8 h-8 text-gray-500 group-hover:text-cyan-400 transition-colors" />
                    </div>
                    <div className="text-center">
                        <div className="text-lg font-bold text-gray-400 group-hover:text-white transition-colors">Unit Slot Empty</div>
                        <div className="text-xs text-gray-600">Sync with Registry to expand squad</div>
                    </div>
                </button>
            </div>
        </div>
    );
}

function PersonalAgentCard({ name, status, level, energy, brain, ops, isActive = false }: any) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className={cn(
                "glass-card p-1 pb-4 relative overflow-hidden group",
                isActive && "border-cyan-500/40 bg-cyan-500/[0.02]"
            )}
        >
            {isActive && (
                <div className="absolute top-0 right-0 p-4">
                    <div className="bg-cyan-500 text-black text-[8px] font-black uppercase px-2 py-0.5 rounded shadow-[0_0_15px_rgba(0,242,255,0.4)]">MAIN UNIT</div>
                </div>
            )}

            <div className="p-8">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 flex items-center justify-center relative shadow-inner">
                        <Cpu className={cn("w-8 h-8", isActive ? "text-cyan-400" : "text-gray-600")} />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-lg bg-black border border-white/10 flex items-center justify-center text-[10px] font-bold">{level}</div>
                    </div>
                    <div>
                        <h3 className="text-2xl font-black italic tracking-tighter group-hover:text-cyan-400 transition-colors">{name}</h3>
                        <div className="flex items-center gap-2">
                            <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", status === 'Operational' ? 'bg-green-500' : 'bg-amber-500')} />
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest">{status}</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-white/5 p-3 rounded-xl">
                        <div className="text-[9px] text-gray-500 uppercase mb-1">Total Throughput</div>
                        <div className="text-sm font-mono text-white">{ops} <span className="text-[10px] opacity-40">Ops</span></div>
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl">
                        <div className="text-[9px] text-gray-500 uppercase mb-1">Neural Core</div>
                        <div className="text-sm font-mono text-white truncate">{brain.split(' ').pop()}</div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-gray-500">
                            <span>Energy Reserves</span>
                            <span className={cn("font-mono", energy < 20 ? "text-amber-500" : "text-white")}>{energy}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${energy}%` }}
                                className={cn("h-full", energy < 20 ? "bg-amber-500" : "bg-cyan-400")}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-8 pt-4 border-t border-white/5 flex gap-2">
                <button className="flex-1 py-3 px-4 border border-white/5 hover:bg-cyan-500 hover:text-black transition-all rounded-xl text-[10px] font-black uppercase">SYNC CONTROL</button>
                <button className="p-3 border border-white/5 hover:bg-white/5 transition-all rounded-xl">
                    <MoreHorizontal className="w-4 h-4 text-gray-500" />
                </button>
            </div>
        </motion.div>
    );
}
