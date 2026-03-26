'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SettingsModal } from '@/components/dashboard/settings-modal';

import { Sidebar } from '@/components/layout/sidebar';
import { useCurrentAccount, ConnectButton } from '@mysten/dapp-kit';
import { redirect, usePathname } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const account = useCurrentAccount();
    const pathname = usePathname();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted && !account) {
            redirect('/');
        }
    }, [account, mounted]);

    if (!mounted || !account) return (
        <div className="min-h-screen bg-[#020203] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-2xl border-2 border-cyan-400/20 border-t-cyan-400 animate-spin" />
                <span className="text-[10px] text-white/40 font-black uppercase tracking-[0.2em] animate-pulse">Initializing Neural Link...</span>
            </div>
        </div>
    );

    return (
        <div className="flex min-h-screen bg-[#020203] relative overflow-hidden text-white selection:bg-cyan-500/30">
            {/* Mesh Gradient Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />
                <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-blue-500/5 blur-[100px] rounded-full" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none mix-blend-overlay" />
            </div>

            <Sidebar onSettingsClick={() => setIsSettingsOpen(true)} />
            <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative z-10">
                {/* Top Header */}
                <header className="h-16 glass-frosted flex items-center justify-between px-8 sticky top-0 z-50 flex-shrink-0 border-b border-white/5">
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] text-white/40 font-black tracking-[0.2em] uppercase">Neural Interface</span>
                        <div className="w-px h-3 bg-white/10" />
                        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-2.5 py-1 rounded-full">
                            SECURE_NODE_01
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <ConnectButton className="!bg-white/5 hover:!bg-white/10 !border !border-white/10 !text-white !transition-all !rounded-full !px-6 !text-xs !font-bold !h-9" />
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto overflow-x-hidden p-8 pb-20 no-scrollbar">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={pathname}
                            initial={{ opacity: 0, y: 20, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 1.02 }}
                            transition={{
                                type: 'spring',
                                damping: 30,
                                stiffness: 200,
                                mass: 0.8
                            }}
                            className="max-w-[1600px] mx-auto w-full px-4"
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
}
