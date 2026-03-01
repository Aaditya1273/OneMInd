'use client';

import { ArrowUpRight, ArrowDownLeft, TrendingUp, History, ShieldCheck, Landmark, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function VaultPage() {
    return (
        <div className="flex flex-col gap-6">
            {/* Page Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-[#e6edf3]">Sovereign Reserves</h1>
                    <p className="text-sm text-[#8b949e] mt-1">Manage the multi-asset treasury secured by your agent squad.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2.5 border border-[#30363d] text-[#c9d1d9] font-semibold text-sm rounded-lg hover:bg-[#21262d] transition-colors">
                        Deposit OCT
                    </button>
                    <button className="px-4 py-2.5 bg-[#238636] hover:bg-[#2ea043] text-white font-semibold text-sm rounded-lg transition-colors">
                        Withdraw All
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                {/* Main Balance + Transaction Panel */}
                <div className="md:col-span-8 flex flex-col gap-5">

                    {/* Balance Card */}
                    <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-6">
                        <div className="flex items-center gap-2 text-xs font-semibold text-[#8b949e] mb-4">
                            <ShieldCheck className="w-3.5 h-3.5 text-[#3fb950]" />
                            Collective Sovereign Balance
                        </div>
                        <div className="flex items-baseline gap-3 mb-3">
                            <span className="text-5xl font-bold tracking-tight text-[#e6edf3]">12,482.00</span>
                            <span className="text-xl text-[#58a6ff] font-mono font-medium">OCT</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-[#8b949e] mb-6">
                            <span className="text-[#3fb950] font-semibold">+2.4%</span>
                            <span>vs. last epoch</span>
                            <div className="w-px h-3 bg-[#21262d]" />
                            <span className="font-mono text-[#8b949e]">≈ $14,210.42 USD</span>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <BalanceMetric label="Available for AI" value="8,402.00" sub="OCT" />
                            <BalanceMetric label="Locked Staking" value="4,000.00" sub="OCT" color="text-[#bc8cff]" />
                            <BalanceMetric label="Pending Growth" value="80.14" sub="OCT" color="text-[#3fb950]" />
                        </div>
                    </div>

                    {/* Transaction History */}
                    <div className="bg-[#161b22] border border-[#21262d] rounded-xl overflow-hidden">
                        <div className="px-5 py-3.5 border-b border-[#21262d] bg-[#0d1117] flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-[#e6edf3] flex items-center gap-2">
                                <History className="w-4 h-4 text-[#8b949e]" />
                                Settlement Ledger
                            </h3>
                            <button className="text-xs text-[#58a6ff] hover:underline font-medium">View All on Explorer</button>
                        </div>
                        <div className="divide-y divide-[#21262d]">
                            <TxRow type="in" amount="+500.00" asset="OCT" date="2 mins ago" label="Neural Trade: Buy" />
                            <TxRow type="out" amount="-12.10" asset="OCT" date="14 mins ago" label="Gas Deposit: ECHO-07" />
                            <TxRow type="in" amount="+142.92" asset="OCT" date="1 hour ago" label="Vault Yield Distribution" />
                            <TxRow type="in" amount="+1,000.00" asset="OCT" date="4 hours ago" label="Direct User Deposit" />
                        </div>
                    </div>
                </div>

                {/* Side Panel */}
                <div className="md:col-span-4 flex flex-col gap-5">
                    {/* Asset Diversification */}
                    <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-5">
                        <h3 className="text-sm font-semibold text-[#e6edf3] mb-4">Asset Diversification</h3>
                        <div className="space-y-4">
                            <DiversificationItem name="Native OCT" percent={70} color="bg-[#58a6ff]" />
                            <DiversificationItem name="MindNodes (NFT)" percent={20} color="bg-[#bc8cff]" />
                            <DiversificationItem name="In-Game Assets" percent={10} color="bg-[#3fb950]" />
                        </div>
                    </div>

                    {/* AI Yield Projection */}
                    <div className="bg-[#161b22] border border-[#1f6feb33] rounded-xl p-5">
                        <h3 className="text-sm font-semibold text-[#58a6ff] mb-2 flex items-center gap-2">
                            <Zap className="w-4 h-4" />
                            AI Yield Projection
                        </h3>
                        <p className="text-sm text-[#8b949e] leading-relaxed mb-5">
                            Based on squad level & market volatility, projected APR is{' '}
                            <span className="text-[#e6edf3] font-semibold">12.4%</span> this epoch.
                        </p>
                        <button className="w-full py-2.5 bg-[#1f6feb] hover:bg-[#388bfd] text-white font-semibold text-sm rounded-lg transition-colors">
                            Boost with Staking
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function BalanceMetric({ label, value, sub, color = 'text-[#e6edf3]' }: any) {
    return (
        <div className="bg-[#0d1117] border border-[#21262d] p-4 rounded-lg">
            <div className="text-[11px] text-[#8b949e] mb-1 font-medium">{label}</div>
            <div className={cn('text-lg font-bold tracking-tight', color)}>
                {value} <span className="text-xs font-normal text-[#8b949e]">{sub}</span>
            </div>
        </div>
    );
}

function TxRow({ type, amount, asset, date, label }: any) {
    const isIn = type === 'in';
    return (
        <div className="px-5 py-4 flex items-center gap-4 hover:bg-[#1c2128] transition-colors">
            <div className={cn(
                'w-9 h-9 rounded-lg flex items-center justify-center border flex-shrink-0',
                isIn ? 'border-[#3fb95033] bg-[#3fb9501a] text-[#3fb950]' : 'border-[#f0883e33] bg-[#f0883e1a] text-[#f0883e]'
            )}>
                {isIn ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
            </div>
            <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-[#e6edf3] truncate">{label}</div>
                <div className="text-[11px] text-[#8b949e] mt-0.5">{date}</div>
            </div>
            <div className="text-right">
                <div className={cn('text-sm font-bold', isIn ? 'text-[#3fb950]' : 'text-[#e6edf3]')}>
                    {amount} <span className="text-[11px] font-normal text-[#8b949e]">{asset}</span>
                </div>
                <div className="text-[10px] text-[#484f58] uppercase tracking-wider mt-0.5">Settled</div>
            </div>
        </div>
    );
}

function DiversificationItem({ name, percent, color }: any) {
    return (
        <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
                <span className="text-sm text-[#c9d1d9]">{name}</span>
                <span className="text-xs font-semibold text-[#e6edf3]">{percent}%</span>
            </div>
            <div className="h-1.5 w-full bg-[#21262d] rounded-full overflow-hidden">
                <div className={cn('h-full rounded-full', color)} style={{ width: `${percent}%`, transition: 'width 0.6s ease' }} />
            </div>
        </div>
    );
}
