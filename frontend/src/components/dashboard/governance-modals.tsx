'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Vote, Users, FileText, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

// ----------------------------------------------------
// Reusable Modal Backdrop & Container
// ----------------------------------------------------
function ModalWrapper({ isOpen, onClose, children, className = '' }: { isOpen: boolean, onClose: () => void, children: React.ReactNode, className?: string }) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 z-[200] backdrop-blur-sm"
                    />
                    <div className="fixed inset-0 z-[200] pointer-events-none flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className={cn(
                                "bg-[#0d1117] border border-[#30363d] shadow-2xl rounded-2xl flex flex-col overflow-hidden pointer-events-auto",
                                className
                            )}
                        >
                            {children}
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}

// ----------------------------------------------------
// 1. Proposal Details Modal
// ----------------------------------------------------
export function ProposalDetailsModal({ isOpen, onClose, proposal }: { isOpen: boolean, onClose: () => void, proposal: any }) {
    const STATUS_COLORS: Record<string, string> = {
        Voting: 'text-[#58a6ff] bg-[#1f6feb1a] border-[#1f6feb33]',
        Passed: 'text-[#3fb950] bg-[#3fb9501a] border-[#3fb95033]',
        Rejected: 'text-[#f85149] bg-[#f851491a] border-[#f8514933]',
    };

    return (
        <ModalWrapper isOpen={isOpen} onClose={onClose} className="w-full max-w-2xl max-h-[80vh]">
            <div className="h-14 border-b border-[#30363d] flex items-center justify-between px-6 bg-[#161b22] flex-shrink-0">
                <h3 className="text-sm font-semibold text-[#e6edf3]">Proposal Details</h3>
                <button onClick={onClose} className="text-[#8b949e] hover:text-[#e6edf3] p-1.5 rounded-md transition-colors hover:bg-[#21262d]">
                    <X className="w-4 h-4" />
                </button>
            </div>

            {proposal && (
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    <div>
                        <div className="flex items-center gap-2 mb-3 wrap">
                            <span className={cn('text-xs font-semibold px-2.5 py-1 rounded border uppercase tracking-wider', STATUS_COLORS[proposal.status] || 'text-[#8b949e]')}>
                                {proposal.status}
                            </span>
                            <span className="text-xs text-[#8b949e] font-medium px-2 py-1 bg-[#21262d] rounded">
                                #{proposal.category}
                            </span>
                        </div>
                        <h2 className="text-xl font-bold text-[#e6edf3] mb-4">{proposal.title}</h2>

                        <div className="flex flex-wrap items-center gap-6 text-sm text-[#8b949e] bg-[#161b22] p-4 rounded-xl border border-[#30363d]">
                            <div className="flex flex-col gap-1">
                                <span className="text-xs uppercase tracking-wider font-semibold">Votes</span>
                                <span className="text-[#e6edf3] font-medium flex items-center gap-1"><Vote className="w-4 h-4 text-[#58a6ff]" /> {proposal.votes}</span>
                            </div>
                            <div className="flex flex-col gap-1 border-l border-[#30363d] pl-6">
                                <span className="text-xs uppercase tracking-wider font-semibold">Duration</span>
                                <span className="text-[#e6edf3] font-medium">{proposal.ends === 'Ended' ? 'Voting ended' : `Ends in ${proposal.ends}`}</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-[#e6edf3] flex items-center gap-2">
                            <FileText className="w-4 h-4" /> Description
                        </h4>
                        <div className="text-sm text-[#8b949e] leading-relaxed space-y-4">
                            <p>This is the detailed breakdown for <strong>{proposal.title}</strong>. It outlines the technical and economic implications of the proposed changes within the OneMind smart contract ecosystem.</p>
                            <p>If passed, the DAO will allocate necessary resources to implement these updates, ensuring all level requirements and tokenomics adjustments are applied globally.</p>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-[#30363d] flex justify-end gap-3">
                        <button onClick={onClose} className="px-5 py-2.5 border border-[#30363d] text-[#c9d1d9] font-semibold text-sm rounded-lg hover:bg-[#21262d] transition-colors">
                            Close
                        </button>
                        {proposal.status === 'Voting' && (
                            <button className="px-5 py-2.5 bg-[#1f6feb] hover:bg-[#388bfd] text-white font-bold text-sm rounded-lg transition-colors flex items-center gap-2">
                                <Vote className="w-4 h-4" /> Cast Vote
                            </button>
                        )}
                    </div>
                </div>
            )}
        </ModalWrapper>
    );
}

// ----------------------------------------------------
// 2. Submit Proposal Modal (Edit Proposal)
// ----------------------------------------------------
export function SubmitProposalModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    return (
        <ModalWrapper isOpen={isOpen} onClose={onClose} className="w-full max-w-2xl max-h-[90vh]">
            <div className="h-14 border-b border-[#30363d] flex items-center justify-between px-6 bg-[#161b22] flex-shrink-0">
                <h3 className="text-sm font-semibold text-[#e6edf3]">Draft New Proposal</h3>
                <button onClick={onClose} className="text-[#8b949e] hover:text-[#e6edf3] p-1.5 rounded-md transition-colors hover:bg-[#21262d]">
                    <X className="w-4 h-4" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-5">
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#8b949e] uppercase tracking-wider">Proposal Title</label>
                    <input
                        type="text"
                        placeholder="e.g. OIP-14: Implement Advanced Neural Sync"
                        className="w-full bg-[#161b22] border border-[#30363d] rounded-lg px-4 py-2.5 text-sm text-[#e6edf3] focus:border-[#58a6ff] focus:outline-none transition-colors"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#8b949e] uppercase tracking-wider">Category</label>
                    <select className="w-full bg-[#161b22] border border-[#30363d] rounded-lg px-4 py-2.5 text-sm text-[#e6edf3] focus:border-[#58a6ff] focus:outline-none transition-colors appearance-none cursor-pointer">
                        <option>Protocol Expansion</option>
                        <option>Technical Upgrade</option>
                        <option>Tokenomics / Economics</option>
                        <option>Governance rules</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#8b949e] uppercase tracking-wider">Description & Impact</label>
                    <textarea
                        rows={6}
                        placeholder="Describe the proposal, its motivation, and the expected impact on the OneMind ecosystem..."
                        className="w-full bg-[#161b22] border border-[#30363d] rounded-lg px-4 py-3 text-sm text-[#e6edf3] focus:border-[#58a6ff] focus:outline-none transition-colors resize-none"
                    />
                </div>

                <div className="p-4 bg-[#1f6feb1a] border border-[#1f6feb33] rounded-xl">
                    <p className="text-xs text-[#58a6ff] font-medium">
                        Note: Submitting a proposal requires signing a transaction with your wallet. Wait for the wallet popup after clicking submit.
                    </p>
                </div>

                <div className="pt-2 flex justify-end gap-3">
                    <button onClick={onClose} className="px-5 py-2.5 border border-[#30363d] text-[#c9d1d9] font-semibold text-sm rounded-lg hover:bg-[#21262d] transition-colors">
                        Cancel
                    </button>
                    <button onClick={onClose} className="px-5 py-2.5 bg-[#238636] hover:bg-[#2ea043] text-white font-bold text-sm rounded-lg transition-colors flex items-center gap-2">
                        Submit Proposal <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </ModalWrapper>
    );
}

// ----------------------------------------------------
// 3. Delegate Support Modal
// ----------------------------------------------------
export function DelegateSupportModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    return (
        <ModalWrapper isOpen={isOpen} onClose={onClose} className="w-full max-w-md">
            <div className="h-14 border-b border-[#30363d] flex items-center justify-between px-6 bg-[#161b22] flex-shrink-0">
                <h3 className="text-sm font-semibold text-[#e6edf3]">Delegate Voting Power</h3>
                <button onClick={onClose} className="text-[#8b949e] hover:text-[#e6edf3] p-1.5 rounded-md transition-colors hover:bg-[#21262d]">
                    <X className="w-4 h-4" />
                </button>
            </div>

            <div className="p-6 space-y-5">
                <p className="text-sm text-[#8b949e] leading-relaxed">
                    Choose an entity to represent your vONE voting weight in council decisions. You can change your delegate at any time.
                </p>

                <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-[#1f6feb1a] border border-[#1f6feb] rounded-lg cursor-pointer">
                        <div className="w-8 h-8 rounded-full bg-[#1f6feb] flex items-center justify-center">
                            <Users className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                            <div className="text-sm font-bold text-white">OneMind Foundation</div>
                            <div className="text-xs text-[#58a6ff]">Currently Delegated</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-[#161b22] border border-[#30363d] hover:border-[#8b949e] rounded-lg cursor-pointer transition-colors">
                        <div className="w-8 h-8 rounded-full bg-[#21262d] flex items-center justify-center">
                            <span className="text-[#8b949e] font-bold text-xs">SELF</span>
                        </div>
                        <div className="flex-1">
                            <div className="text-sm font-bold text-[#e6edf3]">Self-Delegate</div>
                            <div className="text-xs text-[#8b949e]">Vote manually on proposals</div>
                        </div>
                    </div>
                </div>

                <div className="space-y-2 pt-2">
                    <label className="text-xs font-semibold text-[#8b949e] uppercase tracking-wider">Custom Delegate Address</label>
                    <input
                        type="text"
                        placeholder="0x..."
                        className="w-full bg-[#161b22] border border-[#30363d] rounded-lg px-4 py-2 text-sm text-[#e6edf3] focus:border-[#58a6ff] focus:outline-none transition-colors"
                    />
                </div>

                <div className="pt-4 border-t border-[#30363d] flex justify-end gap-3">
                    <button onClick={onClose} className="px-5 py-2.5 border border-[#30363d] text-[#c9d1d9] font-semibold text-sm rounded-lg hover:bg-[#21262d] transition-colors">
                        Cancel
                    </button>
                    <button onClick={onClose} className="px-5 py-2.5 bg-[#1f6feb] hover:bg-[#388bfd] text-white font-bold text-sm rounded-lg transition-colors">
                        Save Delegate
                    </button>
                </div>
            </div>
        </ModalWrapper>
    );
}
