'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
    LayoutDashboard, Search, Users, Landmark, ShieldCheck,
    BookOpen, Settings, ChevronLeft, BrainCircuit, Activity
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
        <aside
            style={{ width: isCollapsed ? 72 : 240, transition: 'width 0.25s ease' }}
            className="h-screen sticky top-0 border-r border-[#21262d] bg-[#0d1117] flex flex-col flex-shrink-0 overflow-hidden z-[100]"
        >
            {/* Logo */}
            <div className="flex items-center gap-3 px-4 pt-5 pb-4 border-b border-[#21262d] flex-shrink-0 h-[64px]">
                <div className="w-8 h-8 rounded-lg bg-[#1f6feb] flex-shrink-0 flex items-center justify-center font-black text-white text-[11px] tracking-tight">
                    OM
                </div>
                <AnimatePresence>
                    {!isCollapsed && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="overflow-hidden"
                        >
                            <div className="text-sm font-bold text-white whitespace-nowrap">
                                ONE<span className="text-[#58a6ff]">MIND</span>
                            </div>
                            <div className="text-[10px] text-[#8b949e] font-mono">Autonomous AI</div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Navigation */}
            <nav className="flex-1 flex flex-col gap-0.5 p-2 pt-3 overflow-y-auto">
                {!isCollapsed && (
                    <div className="text-[10px] text-[#484f58] uppercase tracking-[0.15em] font-semibold px-2 mb-2">
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
                                'relative flex items-center gap-3 px-2 py-2 rounded-md transition-all duration-150 cursor-pointer group',
                                isActive
                                    ? 'bg-[#1f6feb1a] text-white'
                                    : 'text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#161b22]'
                            )}>
                                {isActive && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#1f6feb] rounded-r-full" />
                                )}
                                <div className={cn(
                                    'w-7 h-7 rounded flex items-center justify-center flex-shrink-0',
                                    isActive ? 'text-[#58a6ff]' : 'text-inherit'
                                )}>
                                    <item.icon className="w-4 h-4" />
                                </div>
                                <AnimatePresence>
                                    {!isCollapsed && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="flex flex-col min-w-0"
                                        >
                                            <span className={cn('text-sm font-medium whitespace-nowrap leading-tight', isActive ? 'text-white' : 'text-inherit')}>
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
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="mx-2 mb-2 p-3 rounded-lg bg-[#161b22] border border-[#21262d]"
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#3fb950] flex-shrink-0" />
                            <span className="text-xs font-medium text-[#3fb950]">Neural Link Active</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[#8b949e]">
                            <Activity className="w-3 h-3 flex-shrink-0" />
                            <span className="text-[11px] font-mono truncate">ECHO-07 · 14.2k Ops</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Footer */}
            <div className="border-t border-[#21262d] p-2 flex flex-col gap-0.5">
                {SECONDARY_ITEMS.map(item => (
                    <Link key={item.name} href={item.href}>
                        <div className="flex items-center gap-3 px-2 py-2 rounded-md text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#161b22] transition-all">
                            <item.icon className="w-4 h-4 flex-shrink-0" />
                            {!isCollapsed && <span className="text-sm font-medium">{item.name}</span>}
                        </div>
                    </Link>
                ))}
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
