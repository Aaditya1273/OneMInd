'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowDownLeft, ArrowUpRight, Loader2, Coins, ShieldCheck, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/toast-context';
import { useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { OneChainService } from '@/lib/one-chain-service';

interface VaultModalProps {
    isOpen: boolean;
    onClose: () => void;
    vault: any;
}

export function DepositModal({ isOpen, onClose, vault }: VaultModalProps) {
    const [amount, setAmount] = useState('');
    const [isExecuting, setIsExecuting] = useState(false);
    const { mutate: signAndExecute } = useSignAndExecuteTransaction();
    const { showToast } = useToast();

    if (!vault) return null;

    const handleDeposit = async () => {
        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
            showToast('Enter a valid amount', 'error');
            return;
        }

        setIsExecuting(true);
        showToast(`Initiating Deposit Protocol: ${amount} OCT...`, 'loading');

        try {
            const tx = new Transaction();
            const amountRaw = BigInt(Math.floor(Number(amount) * 1e9));

            // Split the gas coin to get the deposit amount
            const [coin] = tx.splitCoins(tx.gas, [amountRaw]);

            tx.moveCall({
                target: `${OneChainService.PACKAGE_ID}::main::deposit_to_vault`,
                arguments: [
                    tx.object(vault.id),
                    coin,
                ],
            });

            signAndExecute(
                { transaction: tx },
                {
                    onSuccess: (result) => {
                        showToast(`Successfully deposited ${amount} OCT`, 'success', result.digest);
                        setIsExecuting(false);
                        onClose();
                        setAmount('');
                    },
                    onError: (err) => {
                        showToast('Deposit Failed: ' + err.message, 'error');
                        setIsExecuting(false);
                    }
                }
            );
        } catch (error: any) {
            showToast('Protocol Error: ' + error.message, 'error');
            setIsExecuting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[250] flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="w-full max-w-md bg-[#050505]/95 border border-white/10 rounded-[2rem] overflow-hidden relative z-10 shadow-2xl backdrop-blur-md"
                    >
                        <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center">
                                    <ArrowDownLeft className="w-6 h-6 text-emerald-400" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-white tracking-tighter uppercase">Vault Deposit</h2>
                                    <p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Protocol: Liquid Synthesis</p>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-white/20 hover:text-white transition-all">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-8 space-y-8">
                            <div className="space-y-3">
                                <label className="text-[10px] text-white/40 font-black uppercase tracking-[0.2em] px-1">Amount to Lock (OCT)</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="0.00"
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-2xl font-black text-white placeholder:text-white/10 focus:outline-none focus:border-emerald-400/50 transition-all"
                                    />
                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                        <Coins className="w-5 h-5 text-white/20" />
                                        <span className="text-xs font-black text-white/40 uppercase tracking-widest">OCT</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-emerald-400/5 border border-emerald-400/10 rounded-2xl p-4 flex gap-4">
                                <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                                <div className="text-[10px] text-emerald-400/60 font-medium uppercase tracking-wider leading-relaxed">
                                    Assets will be secured in Agent Vault <span className="text-white font-black">{String(vault.id).substring(0, 8)}...</span> and governed by your neural link.
                                </div>
                            </div>

                            <button
                                onClick={handleDeposit}
                                disabled={isExecuting}
                                className="w-full py-5 bg-white text-black font-black text-sm rounded-2xl hover:bg-emerald-400 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl uppercase tracking-[0.2em] disabled:opacity-50 flex items-center justify-center gap-3"
                            >
                                {isExecuting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Executing...
                                    </>
                                ) : (
                                    <>
                                        <Zap className="w-5 h-5" />
                                        Finalize Deposit
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

export function WithdrawModal({ isOpen, onClose, vault }: VaultModalProps) {
    const [amount, setAmount] = useState('');
    const [isExecuting, setIsExecuting] = useState(false);
    const { mutate: signAndExecute } = useSignAndExecuteTransaction();
    const { showToast } = useToast();

    if (!vault) return null;

    const vaultBalance = Number(vault.balance || 0) / 1e9;

    const handleWithdraw = async () => {
        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
            showToast('Enter a valid amount', 'error');
            return;
        }

        if (Number(amount) > vaultBalance) {
            showToast('Insufficient vault liquidity', 'error');
            return;
        }

        setIsExecuting(true);
        showToast(`Initiating Withdrawal: ${amount} OCT...`, 'loading');

        try {
            const tx = new Transaction();
            const amountRaw = BigInt(Math.floor(Number(amount) * 1e9));

            tx.moveCall({
                target: `${OneChainService.PACKAGE_ID}::main::withdraw_from_vault`,
                arguments: [
                    tx.object(vault.id),
                    tx.pure.u64(amountRaw),
                ],
            });

            signAndExecute(
                { transaction: tx },
                {
                    onSuccess: (result) => {
                        showToast(`Successfully withdrawn ${amount} OCT`, 'success', result.digest);
                        setIsExecuting(false);
                        onClose();
                        setAmount('');
                    },
                    onError: (err) => {
                        showToast('Withdrawal Failed: ' + err.message, 'error');
                        setIsExecuting(false);
                    }
                }
            );
        } catch (error: any) {
            showToast('Protocol Error: ' + error.message, 'error');
            setIsExecuting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[250] flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="w-full max-w-md bg-[#050505]/95 border border-white/10 rounded-[2rem] overflow-hidden relative z-10 shadow-2xl backdrop-blur-md"
                    >
                        <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-rose-400/10 border border-rose-400/20 flex items-center justify-center">
                                    <ArrowUpRight className="w-6 h-6 text-rose-400" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-white tracking-tighter uppercase">Vault Withdrawal</h2>
                                    <p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Protocol: Liquidity Extraction</p>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-white/20 hover:text-white transition-all">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-8 space-y-8">
                            <div className="flex justify-between items-center px-4 py-3 bg-white/[0.03] border border-white/10 rounded-2xl">
                                <span className="text-[10px] text-white/40 font-black uppercase tracking-widest">Vault Balance</span>
                                <span className="text-sm font-black text-white uppercase tracking-widest">{vaultBalance.toFixed(2)} OCT</span>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] text-white/40 font-black uppercase tracking-[0.2em] px-1">Withdrawal Amount</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="0.00"
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-2xl font-black text-white placeholder:text-white/10 focus:outline-none focus:border-rose-400/50 transition-all rotate-0"
                                    />
                                    <button
                                        onClick={() => setAmount(vaultBalance.toString())}
                                        className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-rose-400 uppercase tracking-widest hover:text-white transition-colors"
                                    >
                                        MAX
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={handleWithdraw}
                                disabled={isExecuting}
                                className="w-full py-5 bg-white text-black font-black text-sm rounded-2xl hover:bg-rose-400 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl uppercase tracking-[0.2em] disabled:opacity-50 flex items-center justify-center gap-3"
                            >
                                {isExecuting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Extracting...
                                    </>
                                ) : (
                                    <>
                                        <Zap className="w-5 h-5" />
                                        Confirm Extraction
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
