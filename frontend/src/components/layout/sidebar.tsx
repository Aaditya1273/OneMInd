'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard, Search, Users, Landmark, ShieldCheck,
    BookOpen, Settings, ChevronLeft, BrainCircuit, Zap, Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

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

export function Sidebar() {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <motion.aside
            animate={{ width: isCollapsed ? 72 : 260 }}
            transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
            className="h-screen sticky top-0 border-r border-white/5 bg-black/60 backdrop-blur-2xl flex flex-col flex-shrink-0 overflow-hidden z-[100]"
        >
            {/* Logo */}
            <div className="flex items-center gap-3 px-4 pt-6 pb-5 border-b border-white/5 flex-shrink-0 h-[72px]">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex-shrink-0 flex items-center justify-center font-black text-black text-sm shadow-[0_0_20px_rgba(0,242,255,0.35)]">
                    OM
                </div>
                <AnimatePresence>
                    {!isCollapsed && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                        >
                            <div className="text-base font-black tracking-tighter text-white whitespace-nowrap">
                                ONE<span className="text-cyan-400">MIND</span>
                            </div>
                            <div className="text-[9px] text-gray-600 uppercase tracking-[0.2em] font-mono">Autonomous AI</div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Navigation */}
            <nav className="flex-1 flex flex-col gap-1 p-3 pt-4 overflow-y-auto custom-scrollbar">
                <div className="text-[9px] text-gray-700 uppercase tracking-[0.25em] font-bold px-2 mb-3">
                    {!isCollapsed && 'Navigation'}
                </div>
                {MENU_ITEMS.map((item) => {
                    const isActive = item.href === '/dashboard'
                        ? pathname === item.href
                        : pathname.startsWith(item.href);

                    return (
                        <Link key={item.name} href={item.href}>
                            <div className={cn(
                                "relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 cursor-pointer group",
                                isActive
                                    ? "bg-cyan-500/10 border border-cyan-500/20"
                                    : "border border-transparent text-gray-500 hover:text-white hover:bg-white/5 hover:border-white/5"
                            )}>
                                {isActive && (
                                    <motion.div
                                        layoutId="sidebar-active-bg"
                                        className="absolute inset-0 rounded-xl bg-cyan-500/10"
                                    />
                                )}
                                <div className={cn(
                                    "relative z-10 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all",
                                    isActive ? "bg-cyan-500/20 text-cyan-400" : "bg-white/5 text-gray-500 group-hover:text-white group-hover:bg-white/10"
                                )}>
                                    <item.icon className="w-4 h-4" />
                                </div>
                                <AnimatePresence>
                                    {!isCollapsed && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="relative z-10 flex flex-col min-w-0"
                                        >
                                            <span className={cn("text-sm font-semibold whitespace-nowrap leading-tight", isActive ? "text-cyan-400" : "text-inherit")}>{item.name}</span>
                                            <span className="text-[9px] text-gray-600 whitespace-nowrap">{item.desc}</span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                {isActive && !isCollapsed && (
                                    <div className="ml-auto relative z-10 w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(0,242,255,0.9)] flex-shrink-0" />
                                )}
                            </div>
                        </Link>
                    );
                })}
            </nav>

            {/* Neural Feed Status */}
            <AnimatePresence>
                {!isCollapsed && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mx-3 mb-3 p-4 rounded-2xl bg-cyan-500/[0.06] border border-cyan-500/15 overflow-hidden"
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <BrainCircuit className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                            <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.2em]">Neural Link</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                            <span className="text-[10px] text-gray-400 truncate">Vanguard Protocol Stable</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Activity className="w-3 h-3 text-gray-600 flex-shrink-0" />
                            <span className="text-[10px] text-gray-600 font-mono truncate">ECHO-07 · 14.2k Ops</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Footer */}
            <div className="border-t border-white/5 p-3 flex flex-col gap-1">
                {SECONDARY_ITEMS.map(item => (
                    <Link key={item.name} href={item.href}>
                        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:text-white hover:bg-white/5 transition-all">
                            <item.icon className="w-4 h-4 flex-shrink-0" />
                            {!isCollapsed && <span className="text-xs font-medium">{item.name}</span>}
                        </div>
                    </Link>
                ))}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:text-white hover:bg-white/5 transition-all"
                >
                    <ChevronLeft className={cn("w-4 h-4 transition-transform duration-300 flex-shrink-0", isCollapsed && "rotate-180")} />
                    {!isCollapsed && <span className="text-xs font-medium">Collapse</span>}
                </button>
            </div>
        </motion.aside>
    );
}
