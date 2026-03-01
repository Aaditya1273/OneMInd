'use client';

import { Sidebar } from '@/components/layout/sidebar';
import { useCurrentAccount } from '@mysten/dapp-kit';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const account = useCurrentAccount();

    useEffect(() => {
        if (!account) {
            redirect('/');
        }
    }, [account]);

    if (!account) return null;

    return (
        <div className="flex min-h-screen bg-background selection:bg-cyan-500/30">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                {/* Top Header Strip */}
                <header className="h-16 border-b border-glass-border flex items-center justify-between px-8 bg-black/40 backdrop-blur-md sticky top-0 z-50 flex-shrink-0">
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] text-gray-500 uppercase tracking-[0.3em]">Neural Interface Access Point</span>
                        <div className="w-px h-4 bg-white/10" />
                        <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest bg-cyan-500/5 px-2 py-0.5 rounded">Secure_Node_01</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Neural ID</span>
                            <span className="text-xs font-mono text-white opacity-60">{account.address.slice(0, 10)}...{account.address.slice(-6)}</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 p-[1px] shadow-[0_0_15px_rgba(0,242,255,0.2)]">
                            <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                                <div className="w-6 h-6 rounded-full bg-cyan-400/80 animate-pulse-slow blur-[2px]" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dynamic Page Content */}
                <main className="flex-1 overflow-y-auto overflow-x-hidden p-8 pb-20 custom-scrollbar relative">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none -z-10" />

                    <AnimatePresence mode="wait">
                        <motion.div
                            layout
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="max-w-7xl mx-auto w-full"
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
}
