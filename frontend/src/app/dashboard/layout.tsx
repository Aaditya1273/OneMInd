'use client';

import { Sidebar } from '@/components/layout/sidebar';
import { useCurrentAccount, ConnectButton } from '@mysten/dapp-kit';
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
                        <ConnectButton className="!bg-[#161b22] hover:!bg-[#21262d] !border !border-[#30363d] !text-[#e6edf3] !transition-colors !rounded-lg" />
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
