'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, Loader2, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToastProps {
    message: string;
    type: 'success' | 'error' | 'info' | 'loading';
    onClose: () => void;
}

const ICONS = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400" />,
    info: <Info className="w-5 h-5 text-cyan-400" />,
    loading: <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />,
};

export function Toast({ message, type, onClose }: ToastProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            className={cn(
                "min-w-80 p-4 rounded-2xl glass-frosted border border-white/5 shadow-2xl flex items-center gap-4 pointer-events-auto",
                "before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/5 before:to-transparent before:rounded-2xl"
            )}
        >
            <div className="flex-shrink-0">
                {ICONS[type]}
            </div>
            <div className="flex-1 text-sm font-black text-white/90 tracking-tight uppercase">
                {message}
            </div>
            <button
                onClick={onClose}
                className="p-1 hover:bg-white/5 rounded-full text-white/20 hover:text-white transition-all"
            >
                <X className="w-4 h-4" />
            </button>
        </motion.div>
    );
}
