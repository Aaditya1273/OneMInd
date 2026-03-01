'use client';

import { motion } from 'framer-motion';
import { Wallet, ArrowUpRight, TrendingUp, Landmark, ShieldCheck } from 'lucide-react';

export function VaultAssets() {
    return (
        <div className="flex flex-col gap-6 h-full">
            {/* Sovereign Vault Card */}
            <div className="glass-card p-6 bg-gradient-to-br from-white/5 to-white/[0.02]">
                <div className="flex justify-between items-start mb-6">
                    <h3 className="text-xs font-mono text-gray-500 uppercase tracking-[0.2em] flex items-center gap-2">
                        <Landmark className="w-4 h-4 text-purple-400" />
                        SOVEREIGN VAULT
                    </h3>
                    <span className="text-[10px] text-green-400 bg-green-400/10 px-2 py-0.5 rounded flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        SECURED
                    </span>
                </div>

                <div className="mb-8">
                    <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Total Sovereign Balance</div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold tracking-tighter text-glow truncate">1,482.00</span>
                        <span className="text-cyan-400 font-mono text-sm">OCT</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-green-500" />
                        +12.5% from last cycle
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                    <button className="w-full py-3 px-4 bg-white text-black font-bold text-xs rounded-xl hover:bg-cyan-400 transition-all flex items-center justify-center gap-2">
                        WITHDRAW TO MAIN WALLET
                        <ArrowUpRight className="w-4 h-4" />
                    </button>
                    <button className="w-full py-3 px-4 border border-white/10 text-white font-bold text-xs rounded-xl hover:bg-white/5 transition-all">
                        VIEW ON EXPLORER
                    </button>
                </div>
            </div>

            {/* Asset Allocation */}
            <div className="glass-card p-6 flex flex-col gap-4 flex-1">
                <h3 className="text-xs font-mono text-gray-500 uppercase tracking-[0.2em]">Portfolio Growth</h3>
                <div className="flex-1 flex flex-col justify-center items-center gap-4 py-8">
                    <div className="relative w-32 h-32">
                        <svg className="w-full h-full -rotate-90">
                            <circle cx="64" cy="64" r="56" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                            <motion.circle
                                initial={{ strokeDasharray: "0 351" }}
                                animate={{ strokeDasharray: "250 351" }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                cx="64" cy="64" r="56" fill="transparent" stroke="var(--color-primary)" strokeWidth="8" strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-2xl font-bold">72%</span>
                            <span className="text-[8px] text-gray-500 lowercase tracking-widest leading-none">Yield efficiency</span>
                        </div>
                    </div>

                    <div className="w-full space-y-3 mt-4">
                        <AssetRow name="OCT (Native)" amount="1,482" percent={70} color="bg-cyan-400" />
                        <AssetRow name="MindToken" amount="420" percent={20} color="bg-purple-400" />
                        <AssetRow name="Staked One" amount="12" percent={10} color="bg-pink-400" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function AssetRow({ name, amount, percent, color }: { name: string, amount: string, percent: number, color: string }) {
    return (
        <div className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
                <div className={`w-1.5 h-1.5 rounded-full ${color} group-hover:scale-150 transition-transform`} />
                <span className="text-xs text-gray-400 group-hover:text-white transition-colors">{name}</span>
            </div>
            <div className="text-xs font-mono text-gray-500">
                <span className="text-white">{amount}</span> ({percent}%)
            </div>
        </div>
    );
}
