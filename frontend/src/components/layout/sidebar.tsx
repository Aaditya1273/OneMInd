'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    Search,
    Users,
    Landmark,
    Settings,
    BookOpen,
    ChevronLeft,
    Zap,
    ShieldCheck,
    BrainCircuit
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const MENU_ITEMS = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Registry', href: '/dashboard/registry', icon: Search },
    { name: 'My Agents', href: '/dashboard/agents', icon: Users },
    { name: 'Vault', href: '/dashboard/vault', icon: Landmark },
    { name: 'Governance', href: '/dashboard/governance', icon: ShieldCheck },
];

const SECONDARY_ITEMS = [
    { name: 'Documentation', href: '#', icon: BookOpen },
    { name: 'Settings', href: '#', icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <motion.div
            animate={{ width: isCollapsed ? 80 : 280 }}
            className="h-screen sticky top-0 border-r border-glass-border bg-black/50 backdrop-blur-xl flex flex-col p-4 transition-all duration-300 z-[100]"
        >
            {/* Logo Section */}
            <div className="flex items-center gap-3 px-2 mb-10 h-10 overflow-hidden">
                <div className="w-8 h-8 rounded bg-cyan-500 flex-shrink-0 flex items-center justify-center font-bold text-black shadow-[0_0_15px_rgba(0,242,255,0.4)]">
                    OM
                </div>
                {!isCollapsed && (
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xl font-bold tracking-tighter whitespace-nowrap"
                    >
                        ONE<span className="text-cyan-400 font-bold">MIND</span>
                    </motion.span>
                )}
            </div>

            {/* Navigation */}
            <div className="flex-1 flex flex-col gap-1">
                {MENU_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link key={item.name} href={item.href}>
                            <div className={cn(
                                "group relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 cursor-pointer overflow-hidden",
                                isActive ? "bg-cyan-500/10 text-cyan-400" : "text-gray-500 hover:text-white hover:bg-white/5"
                            )}>
                                {isActive && (
                                    <motion.div
                                        layoutId="active-pill"
                                        className="absolute inset-y-2 left-0 w-1 bg-cyan-500 rounded-full"
                                    />
                                )}
                                <item.icon className={cn("w-5 h-5 flex-shrink-0", isActive && "text-cyan-400 shadow-[0_0_10px_rgba(0,242,255,0.5)]")} />
                                {!isCollapsed && (
                                    <span className="text-sm font-medium tracking-wide">{item.name}</span>
                                )}
                                {isActive && !isCollapsed && (
                                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(0,242,255,1)]" />
                                )}
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Secondary & Collapse */}
            <div className="mt-auto flex flex-col gap-1 border-t border-glass-border pt-4">
                {SECONDARY_ITEMS.map((item) => (
                    <Link key={item.name} href={item.href}>
                        <div className="flex items-center gap-3 px-3 py-3 rounded-xl text-gray-500 hover:text-white hover:bg-white/5 transition-all">
                            <item.icon className="w-5 h-5 flex-shrink-0" />
                            {!isCollapsed && <span className="text-sm font-medium tracking-wide">{item.name}</span>}
                        </div>
                    </Link>
                ))}

                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl text-gray-500 hover:text-white hover:bg-white/5 transition-all"
                >
                    <ChevronLeft className={cn("w-5 h-5 transition-transform duration-300", isCollapsed && "rotate-180")} />
                    {!isCollapsed && <span className="text-sm font-medium tracking-wide">Collapse</span>}
                </button>
            </div>

            {/* Bottom Status (Only when expanded) */}
            {!isCollapsed && (
                <div className="mt-6 p-4 glass-card bg-cyan-500/5 border-cyan-500/10">
                    <div className="flex items-center gap-2 mb-2">
                        <BrainCircuit className="w-4 h-4 text-cyan-400" />
                        <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">Neural Link</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest">Vanguard Protocol Stable</span>
                    </div>
                </div>
            )}
        </motion.div>
    );
}
