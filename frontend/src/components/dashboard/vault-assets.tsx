'use client';

import { ArrowUpRight, TrendingUp, Landmark, ShieldCheck } from 'lucide-react';

export function VaultAssets() {
    return (
        <div className="flex flex-col gap-4 h-full">
            {/* Sovereign Vault Card */}
            <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-5">
                <div className="flex justify-between items-start mb-5">
                    <h3 className="text-xs font-semibold text-[#8b949e] flex items-center gap-1.5">
                        <Landmark className="w-3.5 h-3.5 text-[#bc8cff]" />
                        SOVEREIGN VAULT
                    </h3>
                    <span className="text-[11px] text-[#3fb950] bg-[#3fb9501a] border border-[#3fb95033] px-2 py-0.5 rounded font-medium flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        SECURED
                    </span>
                </div>

                <div className="mb-5">
                    <div className="text-[11px] text-[#8b949e] mb-1 font-medium">Total Sovereign Balance</div>
                    <div className="flex items-baseline gap-1.5">
                        <span className="text-3xl font-bold tracking-tight text-[#e6edf3]">1,482.00</span>
                        <span className="text-sm text-[#58a6ff] font-mono font-medium">OCT</span>
                    </div>
                    <div className="text-[11px] text-[#8b949e] mt-1.5 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-[#3fb950]" />
                        <span className="text-[#3fb950] font-medium">+12.5%</span> from last cycle
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <button className="w-full py-2.5 px-4 bg-[#238636] hover:bg-[#2ea043] text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5">
                        WITHDRAW TO WALLET
                        <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                    <button className="w-full py-2.5 px-4 border border-[#30363d] text-[#c9d1d9] font-semibold text-xs rounded-lg hover:bg-[#21262d] transition-colors">
                        VIEW ON EXPLORER
                    </button>
                </div>
            </div>

            {/* Asset Allocation */}
            <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-5 flex-1">
                <h3 className="text-xs font-semibold text-[#8b949e] mb-4">Portfolio Allocation</h3>

                {/* Donut Ring (CSS only) */}
                <div className="flex flex-col items-center gap-4 py-2">
                    <div className="relative w-28 h-28">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="40" fill="transparent" stroke="#21262d" strokeWidth="10" />
                            <circle cx="50" cy="50" r="40" fill="transparent" stroke="#58a6ff" strokeWidth="10"
                                strokeDasharray="176 251" strokeLinecap="round" />
                            <circle cx="50" cy="50" r="40" fill="transparent" stroke="#bc8cff" strokeWidth="10"
                                strokeDasharray="50 251" strokeDashoffset="-176" strokeLinecap="round" />
                            <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3fb950" strokeWidth="10"
                                strokeDasharray="25 251" strokeDashoffset="-226" strokeLinecap="round" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-xl font-bold text-[#e6edf3]">72%</span>
                            <span className="text-[10px] text-[#8b949e]">efficiency</span>
                        </div>
                    </div>

                    <div className="w-full space-y-3 mt-1">
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
            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${color}`} />
            <span className="text-xs text-[#c9d1d9] flex-1">{name}</span>
            <div className="text-xs font-mono text-[#8b949e]">
                <span className="text-[#e6edf3] font-medium">{amount}</span> ({percent}%)
            </div>
        </div>
    );
}
