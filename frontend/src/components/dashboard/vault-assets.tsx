'use client';

import { ArrowUpRight, TrendingUp, Landmark, ShieldCheck } from 'lucide-react';

export function VaultAssets() {
    return (
        <div className="flex flex-col gap-4 h-full">
            {/* Sovereign Vault Card */}
            <div className="bg-[#0d1117] border border-[#30363d] rounded-xl p-6">
                <div className="flex justify-between items-start mb-6">
                    <h3 className="text-xs font-semibold text-[#8b949e] flex items-center gap-1.5 uppercase tracking-wider font-mono">
                        <Landmark className="w-3.5 h-3.5 text-[#bc8cff]" />
                        Sovereign Vault
                    </h3>
                    <span className="text-[10px] text-[#3fb950] bg-[#3fb950]/10 border border-[#3fb950]/20 px-2 py-1 rounded font-mono font-semibold flex items-center gap-1 uppercase tracking-wider">
                        <ShieldCheck className="w-3 h-3" />
                        Secured
                    </span>
                </div>

                <div className="mb-6">
                    <div className="text-[10px] text-[#8b949e] mb-2 font-mono uppercase tracking-wider">Total Sovereign Balance</div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold tracking-tight text-[#e6edf3] font-mono">1,482.00</span>
                        <span className="text-sm text-[#58a6ff] font-mono font-semibold">OCT</span>
                    </div>
                    <div className="text-[11px] text-[#8b949e] mt-2 flex items-center gap-1 font-mono">
                        <TrendingUp className="w-3 h-3 text-[#3fb950]" />
                        <span className="text-[#3fb950] font-semibold">+12.5%</span> from last cycle
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <button className="w-full py-3 px-4 bg-[#238636] hover:bg-[#2ea043] text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 font-mono uppercase tracking-wider">
                        Withdraw to Wallet
                        <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                    <button className="w-full py-3 px-4 border border-[#30363d] text-[#e6edf3] font-bold text-xs rounded-lg hover:bg-[#161b22] transition-colors font-mono uppercase tracking-wider">
                        View on Explorer
                    </button>
                </div>
            </div>

            {/* Asset Allocation */}
            <div className="bg-[#0d1117] border border-[#30363d] rounded-xl p-6 flex-1">
                <h3 className="text-xs font-semibold text-[#8b949e] mb-6 uppercase tracking-wider font-mono">Portfolio Allocation</h3>

                {/* Donut Ring */}
                <div className="flex flex-col items-center gap-6 py-2">
                    <div className="relative w-32 h-32">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="40" fill="transparent" stroke="#161b22" strokeWidth="12" />
                            <circle cx="50" cy="50" r="40" fill="transparent" stroke="#58a6ff" strokeWidth="12"
                                strokeDasharray="176 251" strokeLinecap="round" />
                            <circle cx="50" cy="50" r="40" fill="transparent" stroke="#bc8cff" strokeWidth="12"
                                strokeDasharray="50 251" strokeDashoffset="-176" strokeLinecap="round" />
                            <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3fb950" strokeWidth="12"
                                strokeDasharray="25 251" strokeDashoffset="-226" strokeLinecap="round" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-2xl font-bold text-[#e6edf3] font-mono">72%</span>
                            <span className="text-[10px] text-[#8b949e] font-mono uppercase tracking-wider">efficiency</span>
                        </div>
                    </div>

                    <div className="w-full space-y-3">
                        <AssetRow name="OCT (Native)" amount="1,482" percent={70} color="bg-[#58a6ff]" />
                        <AssetRow name="MindToken" amount="420" percent={20} color="bg-[#bc8cff]" />
                        <AssetRow name="Staked One" amount="12" percent={10} color="bg-[#3fb950]" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function AssetRow({ name, amount, percent, color }: { name: string, amount: string, percent: number, color: string }) {
    return (
        <div className="flex items-center gap-3">
            <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${color}`} />
            <span className="text-xs text-[#e6edf3] flex-1 font-mono">{name}</span>
            <div className="text-xs font-mono text-[#8b949e]">
                <span className="text-[#e6edf3] font-semibold">{amount}</span> <span className="text-[#8b949e]">({percent}%)</span>
            </div>
        </div>
    );
}
