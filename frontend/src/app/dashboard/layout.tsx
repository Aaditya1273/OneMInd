'use client';

import { Sidebar } from '@/components/layout/sidebar';
import { useCurrentAccount } from '@mysten/dapp-kit';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const account = useCurrentAccount();

    useEffect(() => {
        if (!account) {
            redirect('/');
        }
    }, [account]);

    if (!account) return null;

    return (
        <div className="flex min-h-screen bg-[#0d1117]">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                {/* Top Header */}
                <header className="h-16 border-b border-[#21262d] flex items-center justify-between px-6 bg-[#0d1117] sticky top-0 z-50 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <span className="text-xs text-[#8b949e] font-medium">Neural Interface</span>
                        <div className="w-px h-4 bg-[#21262d]" />
                        <span className="text-xs font-mono text-[#58a6ff] bg-[#1f6feb1a] border border-[#1f6feb33] px-2 py-0.5 rounded">
                            Secure_Node_01
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] text-[#8b949e] uppercase tracking-wider font-semibold">Neural ID</span>
                            <span className="text-xs font-mono text-[#e6edf3]">
                                {account.address.slice(0, 10)}...{account.address.slice(-6)}
                            </span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#1f6feb] to-[#388bfd] flex items-center justify-center text-white text-[10px] font-bold">
                            AI
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 pb-16 bg-[#0d1117]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            layout
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
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
