'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, Loader2, X, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToastProps {
    message: string;
    type: 'success' | 'error' | 'info' | 'loading';
    digest?: string;
    onClose: () => void;
}

const ICONS = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400" />,
    info: <Info className="w-5 h-5 text-cyan-400" />,
    loading: <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />,
};

export function Toast({ message, type, digest, onClose }: ToastProps) {
    const explorerUrl = digest ? `https://testnet.onescan.cc/testnet/transactionBlocksDetail?digest=${digest}` : null;

    return (
        <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            className={cn(
                "min-w-[320px] p-4 rounded-2xl glass-frosted border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-4 pointer-events-auto relative overflow-hidden group",
                "before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/5 before:to-transparent before:rounded-2xl"
            )}
        >
            <div className="flex-shrink-0 relative z-10">
                {ICONS[type]}
            </div>

            <div className="flex-1 flex flex-col gap-1 relative z-10">
                <div className="text-[11px] font-black text-white/90 tracking-tight uppercase leading-tight">
                    {message}
                </div>
                {explorerUrl && (
                    <a
                        href={explorerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[9px] font-black text-cyan-400 hover:text-white transition-colors uppercase tracking-[0.2em] flex items-center gap-1 w-fit group/link"
                    >
                        View on OneScan
                        <ArrowUpRight className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                )}
            </div>

            <button
                onClick={onClose}
                className="p-1 hover:bg-white/5 rounded-full text-white/20 hover:text-white transition-all relative z-10"
            >
                <X className="w-4 h-4" />
            </button>
        </motion.div>
    );
}
