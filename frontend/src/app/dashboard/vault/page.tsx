'use client';

import { Landmark, ArrowUpRight, ArrowDownLeft, TrendingUp, History, ShieldCheck, Wallet, DollarSign, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function VaultPage() {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-bold tracking-tighter mb-2">SOVEREIGN <span className="text-cyan-400">RESERVES</span></h1>
                    <p className="text-gray-500 text-sm">Manage the multi-asset treasury secured by your Agent Squad.</p>
                </div>

                <div className="flex gap-4">
                    <button className="px-6 py-3 border border-white/10 rounded-xl hover:bg-white/5 transition-all text-xs font-bold uppercase tracking-widest">Deposit OCT</button>
                    <button className="px-6 py-3 bg-white text-black font-black rounded-xl hover:bg-cyan-400 transition-all text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.1)]">Withdraw All</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Main Balance Panel */}
                <div className="md:col-span-8 flex flex-col gap-8">
                    <div className="glass-card p-10 bg-gradient-to-br from-white/5 to-transparent relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Landmark className="w-40 h-40" />
                        </div>

                        <div className="mb-12">
                            <div className="text-xs text-gray-500 uppercase tracking-[0.3em] font-bold mb-4 flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-green-500" />
                                Collective Sovereign Balance
                            </div>
                            <div className="flex items-baseline gap-4">
                                <span className="text-6xl md:text-8xl font-black tracking-tighter text-glow">12,482.00</span>
                                <span className="text-2xl text-cyan-400 font-mono">OCT</span>
                            </div>
                            <div className="text-sm text-gray-500 mt-4 flex items-center gap-2">
                                <span className="text-green-500 font-bold">+2.4%</span> vs. last epoch
                                <div className="w-px h-3 bg-white/10" />
                                <span className="text-white opacity-40 font-mono italic">Est. $14,210.42 USD</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <BalanceMetric label="Available for AI" value="8,402.00" sub="OCT" />
                            <BalanceMetric label="Locked Staking" value="4,000.00" sub="OCT" color="text-purple-400" />
                            <BalanceMetric label="Pending Growth" value="80.14" sub="OCT" color="text-green-400" />
                        </div>
                    </div>

                    {/* Transaction History Mock */}
                    <div className="glass-card overflow-hidden">
                        <div className="p-6 border-b border-white/5 flex items-center justify-between">
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 flex items-center gap-2">
                                <History className="w-4 h-4" /> Settlement Ledger
                            </h3>
                            <button className="text-[10px] text-cyan-400 hover:underline">View All On Explorer</button>
                        </div>
                        <div className="divide-y divide-white/5">
                            <TxRow type="in" amount="+500.00" asset="OCT" date="2 mins ago" label="Neural Trade: Buy" status="Settled" />
                            <TxRow type="out" amount="-12.10" asset="OCT" date="14 mins ago" label="Gas Deposit: ECHO-07" status="Settled" />
                            <TxRow type="in" amount="+142.92" asset="OCT" date="1 hour ago" label="Vault Yield Distribution" status="Settled" />
                            <TxRow type="in" amount="+1,000.00" asset="OCT" date="4 hours ago" label="Direct User Deposit" status="Settled" />
                        </div>
                    </div>
                </div>

                {/* Side Stats */}
                <div className="md:col-span-4 flex flex-col gap-8">
                    <div className="glass-card p-8 flex flex-col gap-6">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">Asset Diversification</h3>
                        <div className="space-y-6">
                            <DiversificationItem name="Native OCT" percent={70} color="bg-cyan-400" />
                            <DiversificationItem name="MindNodes (NFT)" percent={20} color="bg-purple-400" />
                            <DiversificationItem name="In-Game Assets" percent={10} color="bg-pink-400" />
                        </div>
                    </div>

                    <div className="glass-card p-8 bg-cyan-500/5 border-cyan-500/20">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400 mb-4 flex items-center gap-2">
                            <Zap className="w-4 h-4" /> AI Yield Projection
                        </h3>
                        <p className="text-xs text-gray-400 leading-relaxed mb-6">
                            Based on your squad&apos;s current level and market volatility, the projected APR for the next epoch is <span className="text-white font-bold">12.4%</span>.
                        </p>
                        <button className="w-full py-4 bg-cyan-500 text-black font-black text-xs rounded-xl shadow-[0_0_20px_rgba(0,242,255,0.2)]">BOOST WITH STAKING</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function BalanceMetric({ label, value, sub, color = "text-white" }: any) {
    return (
        <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
            <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">{label}</div>
            <div className={cn("text-xl font-bold tracking-tight", color)}>{value} <span className="text-xs font-normal opacity-40">{sub}</span></div>
        </div>
    );
}

function TxRow({ type, amount, asset, date, label, status }: any) {
    return (
        <div className="p-6 flex items-center justify-between group hover:bg-white/[0.01] transition-colors">
            <div className="flex items-center gap-4">
                <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center border",
                    type === 'in' ? "border-green-500/20 bg-green-500/5 text-green-500" : "border-amber-500/20 bg-amber-500/5 text-amber-500"
                )}>
                    {type === 'in' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                </div>
                <div>
                    <div className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">{label}</div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-widest">{date}</div>
                </div>
            </div>
            <div className="text-right">
                <div className={cn("text-sm font-black", type === 'in' ? "text-green-500" : "text-white")}>{amount} <span className="text-[10px] font-normal opacity-40">{asset}</span></div>
                <div className="text-[10px] text-gray-600 uppercase tracking-[0.2em]">{status}</div>
            </div>
        </div>
    );
}

function DiversificationItem({ name, percent, color }: any) {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-between text-[10px] uppercase tracking-widest mb-1">
                <span className="text-gray-400">{name}</span>
                <span className="text-white font-bold">{percent}%</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    className={cn("h-full", color)}
                />
            </div>
        </div>
    );
}
