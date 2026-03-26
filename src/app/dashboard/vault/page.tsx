'use client';

import { ArrowUpRight, ArrowDownLeft, TrendingUp, History, ShieldCheck, Landmark, Zap, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useCurrentAccount } from '@mysten/dapp-kit';
import { useOneBalance, useEcosystemEvents, useToast } from '@/hooks/use-one-chain';

export default function VaultPage() {
    const account = useCurrentAccount();
    const { balance, loading: balanceLoading } = useOneBalance(account?.address);
    const { events, loading: eventsLoading } = useEcosystemEvents();
    const { showToast } = useToast();

    const formattedBalance = (Number(balance) / 1e9).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const usdValue = (Number(balance) / 1e9 * 1.14).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return (
        <div className="flex flex-col gap-10">
            {/* Page Header */}
            <div className="flex justify-between items-end pb-4 border-b border-white/5">
                <div>
                    <h1 className="text-5xl font-black tracking-tighter text-white mb-2 uppercase">Treasury</h1>
                    <p className="text-base text-white/60 font-medium tracking-tight">Manage the multi-asset treasury secured by your agent squad.</p>
                </div>
                <div className="flex gap-4">
                    <button className="px-8 py-3 border border-white/10 text-white font-black text-sm rounded-full hover:bg-white/10 transition-all uppercase tracking-widest active:scale-95">
                        Deposit Assets
                    </button>
                    <button className="px-8 py-3 bg-white text-black font-black text-sm rounded-full hover:bg-cyan-400 hover:scale-105 transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)] uppercase tracking-widest active:scale-95">
                        Withdraw All
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Main Balance + Transaction Panel */}
                <div className="md:col-span-8 flex flex-col gap-8">

                    {/* Balance Card */}
                    <div className="glass-card p-10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Landmark className="w-32 h-32 text-purple-400" />
                        </div>

                        <div className="flex items-center gap-3 text-[10px] font-black text-white/40 mb-8 uppercase tracking-[0.2em]">
                            <ShieldCheck className="w-4 h-4 text-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                            Collective Sovereign Balance
                        </div>

                        <div className="flex items-baseline gap-4 mb-4">
                            <span className="text-7xl font-black tracking-tighter text-white uppercase">{formattedBalance}</span>
                            <span className="text-xl text-cyan-400 font-black tracking-[0.2em] uppercase">ONE</span>
                        </div>

                        <div className="flex items-center gap-5 text-xs text-white/60 mb-10 font-bold tracking-tight">
                            <span className="text-emerald-400 flex items-center gap-1.5 group-hover:scale-110 transition-transform">
                                <TrendingUp className="w-4 h-4" />
                                +0.0%
                            </span>
                            <span className="opacity-40">/</span>
                            <span>live network sync</span>
                            <div className="w-px h-3 bg-white/10 mx-2" />
                            <span className="font-mono text-white/40 bg-white/[0.03] px-2 py-0.5 rounded border border-white/5 tracking-tighter uppercase">≈ ${usdValue} USD</span>
                        </div>

                        <div className="grid grid-cols-3 gap-6">
                            <BalanceMetric label="Available for AI" value={formattedBalance} sub="ONE" />
                            <BalanceMetric label="Locked Staking" value="0.00" sub="ONE" color="text-purple-400" />
                            <BalanceMetric label="Pending Growth" value="0.00" sub="ONE" color="text-emerald-400" />
                        </div>
                    </div>

                    {/* Transaction History */}
                    <div className="glass-card overflow-hidden">
                        <div className="px-8 py-5 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                            <h3 className="text-[10px] font-black text-white/40 flex items-center gap-3 uppercase tracking-[0.2em]">
                                <History className="w-4 h-4 text-white/20" />
                                Settlement Ledger
                            </h3>
                            <button className="text-[10px] text-cyan-400 hover:text-white transition-colors font-black uppercase tracking-widest border-b border-cyan-400/30 hover:border-white">View Explorer</button>
                        </div>
                        <div className="divide-y divide-white/5">
                            {events.length > 0 ? (
                                events.map((event: any) => (
                                    <TxRow
                                        key={event.id.txDigest}
                                        type="in"
                                        amount={(Number(event.parsedJson?.amount || 0) / 1e9).toFixed(2)}
                                        asset="ONE"
                                        date="Just now"
                                        label={event.type.split('::').pop() || "Network Event"}
                                    />
                                ))
                            ) : (
                                <div className="p-12 text-center">
                                    <div className="text-xs font-black text-white/20 uppercase tracking-[0.2em]">No Transaction History Detected</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Side Panel */}
                <div className="md:col-span-4 flex flex-col gap-8">
                    {/* Asset Diversification */}
                    <div className="glass-card p-8">
                        <h3 className="text-[10px] font-black text-white/40 mb-8 uppercase tracking-[0.2em]">Asset Diversification</h3>
                        <div className="space-y-6">
                            <DiversificationItem name="Native ONE" percent={70} color="bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                            <DiversificationItem name="MindNodes (NFT)" percent={20} color="bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                            <DiversificationItem name="In-Game Assets" percent={10} color="bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                        </div>
                    </div>

                    {/* AI Yield Projection */}
                    <div className="glass-card p-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:scale-110 transition-transform">
                            <Zap className="w-20 h-20 text-cyan-400" />
                        </div>
                        <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-4 flex items-center gap-3">
                            <Zap className="w-4 h-4 text-cyan-400" />
                            Yield Projection
                        </h3>
                        <p className="text-sm text-white/40 leading-relaxed mb-8 font-medium tracking-tight">
                            Based on squad level & market volatility, projected APR is{' '}
                            <span className="text-white font-black text-lg tracking-tighter">12.4%</span> this epoch.
                        </p>
                        <button className="w-full py-3.5 bg-white text-black font-black text-xs rounded-full hover:bg-cyan-400 hover:scale-[1.02] transition-all uppercase tracking-widest shadow-xl active:scale-95">
                            Boost Staking
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function BalanceMetric({ label, value, sub, color = 'text-white' }: { label: string, value: string, sub: string, color?: string }) {
    return (
        <div className="bg-white/[0.02] border border-white/5 p-5 rounded-2xl group/metric hover:bg-white/[0.04] transition-all shadow-inner">
            <div className="text-[9px] text-white/40 mb-2 font-black uppercase tracking-[0.2em] group-hover/metric:text-white/60 transition-colors uppercase">{label}</div>
            <div className={cn('text-xl font-black tracking-tighter uppercase transition-colors', color)}>
                {value} <span className="text-[10px] font-black text-white/40 ml-1">{sub}</span>
            </div>
        </div>
    );
}

function TxRow({ type, amount, asset, date, label }: { type: 'in' | 'out', amount: string, asset: string, date: string, label: string }) {
    const isIn = type === 'in';
    return (
        <div className="px-8 py-5 flex items-center gap-5 hover:bg-white/[0.02] transition-all group cursor-pointer">
            <div className={cn(
                'w-11 h-11 rounded-2xl flex items-center justify-center border-2 transition-all flex-shrink-0 shadow-inner group-hover:scale-110',
                isIn ? 'border-emerald-400/20 bg-emerald-400/5 text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.1)]' : 'border-rose-400/20 bg-rose-400/5 text-rose-400 shadow-[0_0_15px_rgba(251,113,133,0.1)]'
            )}>
                {isIn ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
            </div>
            <div className="flex-1 min-w-0">
                <div className="text-sm font-black text-white tracking-tight uppercase truncate group-hover:text-cyan-400 transition-colors">{label}</div>
                <div className="text-[10px] text-white/30 font-black uppercase tracking-widest mt-1">{date}</div>
            </div>
            <div className="text-right">
                <div className={cn('text-lg font-black tracking-tighter uppercase', isIn ? 'text-emerald-400' : 'text-white')}>
                    {amount} <span className="text-[10px] font-black text-white/40 ml-1.5">{asset}</span>
                </div>
                <div className="text-[9px] text-white/30 font-black uppercase tracking-[0.2em] mt-1 group-hover:text-emerald-400/40 transition-colors">Settled</div>
            </div>
        </div>
    );
}

function DiversificationItem({ name, percent, color }: { name: string, percent: number, color: string }) {
    return (
        <div className="flex flex-col gap-3 group">
            <div className="flex justify-between items-end px-1">
                <span className="text-[11px] font-black text-white/40 uppercase tracking-widest group-hover:text-white transition-colors">{name}</span>
                <span className="text-xs font-black text-white tracking-tighter">{percent}%</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden shadow-inner">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className={cn('h-full rounded-full transition-all', color)}
                />
            </div>
        </div>
    );
}
