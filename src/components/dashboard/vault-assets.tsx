'use client';

import { ArrowUpRight, TrendingUp, Landmark, ShieldCheck, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useCurrentAccount } from '@mysten/dapp-kit';
import { useOneBalance } from '@/hooks/use-one-chain';
import { useToast } from '@/components/ui/toast-context';

export function VaultAssets() {
    const account = useCurrentAccount();
    const { balance, loading } = useOneBalance(account?.address);
    const { showToast } = useToast();

    const displayBalance = account ? (Number(balance) / 1e9).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "1,482.00";

    return (
        <div className="flex flex-col gap-8 h-full">
            {/* Sovereign Vault Card */}
            <div className="glass-card p-10 group relative overflow-hidden h-[460px] flex flex-col justify-center transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <div className="absolute top-0 right-0 p-10 opacity-5 transition-opacity group-hover:opacity-10">
                    <Landmark className="w-28 h-28 text-purple-400" />
                </div>

                <div className="flex justify-between items-start mb-10">
                    <h3 className="text-[11px] font-black text-white/20 flex items-center gap-2 uppercase tracking-[0.25em]">
                        <Landmark className="w-4 h-4 text-cyan-400" />
                        Sovereign OneVault
                    </h3>
                    <span className="text-[10px] text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-3 py-1.5 rounded-full font-black flex items-center gap-1.5 uppercase tracking-widest shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                        <ShieldCheck className="w-4 h-4" />
                        OneChain Sync
                    </span>
                </div>

                <div className="mb-10">
                    <div className="text-[11px] text-white/40 mb-3 font-black uppercase tracking-[0.25em]">Liquid Assets</div>
                    <div className="flex items-baseline gap-4 flex-wrap">
                        <span className="text-5xl font-black tracking-tighter text-white uppercase">{displayBalance}</span>
                        <span className="text-base text-cyan-400 font-black tracking-widest uppercase">ONE</span>
                    </div>
                    <div className="text-[12px] text-white/60 mt-4 flex items-center gap-2 font-medium tracking-tight">
                        <TrendingUp className="w-5 h-5 text-emerald-400" />
                        <span className="text-emerald-400 font-black">+12.5%</span> <span className="text-white/60 font-black lowercase tracking-widest">since last cycle</span>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between px-2 mb-2">
                        <div className="flex flex-col">
                            <span className="text-[9px] text-white/20 font-black uppercase tracking-widest">OneDEX Spread</span>
                            <span className="text-[11px] text-emerald-400 font-black tracking-tighter">+0.82% Arb</span>
                        </div>
                        <div className="flex flex-col text-right">
                            <span className="text-[9px] text-white/20 font-black uppercase tracking-widest">OnePlay Win Rate</span>
                            <span className="text-[11px] text-purple-400 font-black tracking-tighter">74.2%</span>
                        </div>
                    </div>
                    <button
                        onClick={() => showToast('Analyzing OneDEX Arbitrage... Optimizing Yield.', 'loading')}
                        className="w-full py-4 px-8 bg-white text-black font-black text-[13px] rounded-full hover:bg-cyan-400 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 uppercase tracking-widest shadow-[0_20px_40px_rgba(255,255,255,0.15)]"
                    >
                        Optimize Yield
                        <ArrowUpRight className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => showToast('Opening OneChain Ecosystem Explorer...', 'info')}
                        className="w-full py-4 px-8 border border-white/5 text-white/40 font-black text-[13px] rounded-full hover:bg-white/5 hover:text-white transition-all uppercase tracking-widest"
                    >
                        Ecosystem Explorer
                    </button>
                </div>
            </div>

            {/* Asset Allocation */}
            <div className="glass-card p-10 h-[258px] flex flex-col justify-center transition-all duration-500 overflow-hidden">
                {/* Donut Ring & Legend */}
                <div className="flex items-center justify-between gap-8 py-2">
                    <div className="relative w-32 h-32 flex-shrink-0">
                        <svg className="w-full h-full -rotate-90 filter drop-shadow-[0_0_20px_rgba(6,182,212,0.25)]" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="42" fill="transparent" stroke="rgba(255,255,255,0.03)" strokeWidth="10" />
                            <motion.circle
                                initial={{ strokeDasharray: "0 264" }}
                                animate={{ strokeDasharray: "184 264" }}
                                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                                cx="50" cy="50" r="42" fill="transparent" stroke="#22d3ee" strokeWidth="10"
                                strokeLinecap="round"
                            />
                            <motion.circle
                                initial={{ strokeDasharray: "0 264", strokeDashoffset: 0 }}
                                animate={{ strokeDasharray: "52 264", strokeDashoffset: -184 }}
                                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                                cx="50" cy="50" r="42" fill="transparent" stroke="#a855f7" strokeWidth="10"
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-2xl font-black text-white tracking-tighter">{account ? "100%" : "72%"}</span>
                        </div>
                    </div>

                    <div className="flex-1 space-y-3">
                        <AssetRow name="ONE" amount={account ? displayBalance : "1,482"} percent={account ? 100 : 70} color="bg-cyan-400" />
                        <AssetRow name="Mind" amount="420" percent={20} color="bg-purple-500" />
                        <AssetRow name="Staked" amount="12" percent={10} color="bg-emerald-400" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function AssetRow({ name, amount, percent, color }: { name: string, amount: string, percent: number, color: string }) {
    return (
        <div className="flex items-center justify-between group/row">
            <div className="flex items-center gap-3">
                <div className={cn('w-2 h-2 rounded-full', color)} />
                <span className="text-[11px] font-black text-white/60 uppercase tracking-widest group-hover/row:text-white transition-colors">{name}</span>
            </div>
            <div className="flex items-center gap-4">
                <span className="text-sm font-black text-white tracking-tighter">{amount}</span>
                <span className="text-[10px] text-white/40 font-black w-8 text-right uppercase tracking-widest">{percent}%</span>
            </div>
        </div>
    );
}
