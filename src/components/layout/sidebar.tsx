'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
    LayoutDashboard, Search, Users, Landmark, ShieldCheck,
    BookOpen, Settings, ChevronLeft, BrainCircuit, Activity, Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useCurrentAccount } from '@mysten/dapp-kit';
import { useMyAgents } from '@/hooks/use-one-chain';

const MENU_ITEMS = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard, desc: 'Command Center' },
    { name: 'Registry', href: '/dashboard/registry', icon: Search, desc: 'Global Agents' },
    { name: 'My Squad', href: '/dashboard/agents', icon: Users, desc: 'Manage Units' },
    { name: 'Vault', href: '/dashboard/vault', icon: Landmark, desc: 'Sovereign Assets' },
    { name: 'Council', href: '/dashboard/governance', icon: ShieldCheck, desc: 'Governance' },
];

const SECONDARY_ITEMS = [
    { name: 'Docs', href: '#', icon: BookOpen },
    { name: 'Settings', href: '#', icon: Settings },
];

export function Sidebar({ onSettingsClick }: { onSettingsClick: () => void }) {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const account = useCurrentAccount();
    const { myAgents, loading } = useMyAgents(account?.address);

    const activeAgent = myAgents[0];

    return (
        <aside
            style={{ width: isCollapsed ? 80 : 280, transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
            className="h-screen sticky top-0 glass-frosted border-r border-white/5 flex flex-col flex-shrink-0 overflow-hidden z-[100] shadow-2xl"
        >
            {/* Logo */}
            <div className="flex items-center gap-4 px-6 pt-8 pb-6 border-b border-white/5 flex-shrink-0 h-[100px]">
                <div className="w-10 h-10 rounded-xl bg-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.3)] flex-shrink-0 flex items-center justify-center font-black text-black text-[14px] tracking-tighter">
                    OM
                </div>
                <AnimatePresence>
                    {!isCollapsed && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                        >
                            <div className="text-xl font-black text-white whitespace-nowrap tracking-tighter leading-none">
                                ONE<span className="text-cyan-400">MIND</span>
                            </div>
                            <div className="text-[10px] text-white/40 font-black uppercase tracking-[0.2em] mt-1">Autonomous AI</div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Navigation */}
            <nav className="flex-1 flex flex-col gap-1 p-4 pt-6 overflow-y-auto no-scrollbar">
                {!isCollapsed && (
                    <div className="text-[11px] text-white/20 uppercase tracking-[0.25em] font-black px-3 mb-4">
                        Navigation
                    </div>
                )}
                {MENU_ITEMS.map((item) => {
                    const isActive = item.href === '/dashboard'
                        ? pathname === item.href
                        : pathname.startsWith(item.href);

                    return (
                        <Link key={item.name} href={item.href}>
                            <div className={cn(
                                'relative flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-300 cursor-pointer group',
                                isActive ? 'text-white' : 'text-white/40 hover:text-white hover:bg-white/[0.005]'
                            )}>
                                {isActive && (
                                    <>
                                        <motion.div
                                            layoutId="active-nav-bg"
                                            transition={{ type: 'spring', damping: 30, stiffness: 150 }}
                                            className="absolute inset-0 bg-white/5 border border-white/5 rounded-xl shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]"
                                        />
                                        <motion.div
                                            layoutId="active-nav-indicator"
                                            transition={{ type: 'spring', damping: 30, stiffness: 150 }}
                                            className="absolute left-[-4px] top-1/4 bottom-1/4 w-1 bg-cyan-400 rounded-r-full shadow-[0_0_15px_rgba(6,182,212,0.5)] z-10"
                                        />
                                    </>
                                )}
                                <div className={cn(
                                    'w-5 h-5 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110',
                                    isActive ? 'text-cyan-400' : 'text-inherit'
                                )}>
                                    <item.icon className="w-5 h-5 stroke-[2.5]" />
                                </div>
                                <AnimatePresence>
                                    {!isCollapsed && (
                                        <motion.div
                                            initial={{ opacity: 0, x: -5 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -5 }}
                                            className="flex flex-col min-w-0"
                                        >
                                            <span className={cn('text-[15px] font-black tracking-tighter whitespace-nowrap leading-tight', isActive ? 'text-white' : 'text-inherit')}>
                                                {item.name}
                                            </span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </Link>
                    );
                })}
            </nav>

            {/* Status Pill */}
            <AnimatePresence>
                {!isCollapsed && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="mx-4 mb-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className="relative">
                                <div className={cn('w-2 h-2 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]', activeAgent ? 'bg-cyan-400' : 'bg-white/20')} />
                                {activeAgent && <div className="absolute inset-0 w-2 h-2 rounded-full bg-cyan-400 animate-ping opacity-40" />}
                            </div>
                            <span className="text-[11px] font-black text-white tracking-tight uppercase">
                                {loading ? 'Seeking Link...' : activeAgent ? 'Neural Link Active' : 'Vault Offline'}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-white/30">
                            {loading ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                                <Activity className="w-3 h-3 flex-shrink-0" />
                            )}
                            <span className="text-[10px] font-mono tracking-wider truncate uppercase">
                                {loading ? 'Calibrating...' : activeAgent ? `${activeAgent.name.substring(0, 10)} · ${activeAgent.stats || 'Oper.'}` : 'No Vanguard Detected'}
                            </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Footer */}
            <div className="border-t border-white/5 p-4 flex flex-col gap-1">
                {SECONDARY_ITEMS.map(item => {
                    const isSettings = item.name === 'Settings';
                    return (
                        <button
                            key={item.name}
                            onClick={() => isSettings && onSettingsClick()}
                            className="flex items-center gap-4 px-3 py-3 rounded-xl text-white/30 hover:text-white hover:bg-white/[0.02] transition-all w-full text-left group"
                        >
                            <item.icon className="w-5 h-5 flex-shrink-0 stroke-[2.5]" />
                            {!isCollapsed && <span className="text-[14px] font-black tracking-tighter">{item.name}</span>}
                        </button>
                    );
                })}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="flex items-center gap-3 px-2 py-2 rounded-md text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#161b22] transition-all"
                >
                    <ChevronLeft className={cn('w-4 h-4 transition-transform duration-300 flex-shrink-0', isCollapsed && 'rotate-180')} />
                    {!isCollapsed && <span className="text-sm font-medium">Collapse</span>}
                </button>
            </div>
        </aside>
    );
}
