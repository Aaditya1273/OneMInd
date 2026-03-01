'use client';

import { ConnectButton as SuiConnectButton, useCurrentAccount } from '@mysten/dapp-kit';
import { motion } from 'framer-motion';
import { Wallet } from 'lucide-react';

export function CustomConnectButton() {
    const account = useCurrentAccount();

    return (
        <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <SuiConnectButton
                className="relative px-6 py-3 bg-black rounded-lg leading-none flex items-center divide-x divide-gray-600"
            />
            {!account && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0 }}
                    className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] text-cyan-500/50 uppercase tracking-[0.2em]"
                >
                    Secure Neural Link Required
                </motion.div>
            )}
        </div>
    );
}
