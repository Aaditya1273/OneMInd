'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Settings, Shield, Bell, Cpu, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const TABS = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Alerts', icon: Bell },
    { id: 'neural', label: 'Neural Link', icon: Cpu },
    { id: 'appearance', label: 'Appearance', icon: Palette },
];

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
    const [activeTab, setActiveTab] = useState('general');

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 z-[200] backdrop-blur-sm"
                    />

                    {/* Modal Window */}
                    <div className="fixed inset-0 z-[200] pointer-events-none flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="bg-[#0d1117] border border-[#30363d] shadow-2xl rounded-2xl w-full max-w-3xl h-[600px] flex overflow-hidden pointer-events-auto flex-col md:flex-row"
                        >
                            {/* Sidebar Tab Menu */}
                            <div className="w-full md:w-56 bg-[#161b22] border-r border-[#30363d] flex flex-col flex-shrink-0">
                                <div className="p-4 border-b border-[#30363d] flex items-center justify-between">
                                    <h2 className="text-sm font-bold text-[#e6edf3]">Preferences</h2>
                                    <button onClick={onClose} className="md:hidden text-[#8b949e] hover:text-[#e6edf3]">
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="p-2 space-y-1 overflow-y-auto">
                                    {TABS.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={cn(
                                                'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                                                activeTab === tab.id
                                                    ? 'bg-[#1f6feb] text-white'
                                                    : 'text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#21262d]'
                                            )}
                                        >
                                            <tab.icon className="w-4 h-4 shadow-sm" />
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="flex-1 flex flex-col min-w-0">
                                <div className="h-14 border-b border-[#30363d] flex items-center justify-between px-6 flex-shrink-0 bg-[#0d1117]">
                                    <h3 className="text-sm font-semibold text-[#e6edf3] capitalize">
                                        {activeTab} Settings
                                    </h3>
                                    <button onClick={onClose} className="hidden md:flex text-[#8b949e] hover:text-[#e6edf3] bg-[#21262d] hover:bg-[#30363d] p-1.5 rounded-md transition-colors">
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="flex-1 overflow-y-auto p-6 bg-[#0d1117]">
                                    {/* Mock Content based on tab */}
                                    {activeTab === 'general' && (
                                        <div className="space-y-6 max-w-lg">
                                            <div className="space-y-2">
                                                <label className="text-xs font-semibold text-[#8b949e] uppercase tracking-wider">Display Name</label>
                                                <input
                                                    type="text"
                                                    defaultValue="Secure_Node_01"
                                                    className="w-full bg-[#161b22] border border-[#30363d] rounded-lg px-4 py-2.5 text-sm text-[#e6edf3] focus:border-[#58a6ff] focus:outline-none transition-colors"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-semibold text-[#8b949e] uppercase tracking-wider">Timezone</label>
                                                <select className="w-full bg-[#161b22] border border-[#30363d] rounded-lg px-4 py-2.5 text-sm text-[#e6edf3] focus:border-[#58a6ff] focus:outline-none transition-colors appearance-none">
                                                    <option>UTC (Coordinated Universal Time)</option>
                                                    <option>EST (Eastern Standard Time)</option>
                                                    <option>PST (Pacific Standard Time)</option>
                                                </select>
                                            </div>
                                            <div className="pt-4 border-t border-[#30363d] flex justify-end">
                                                <button className="px-5 py-2.5 bg-[#238636] hover:bg-[#2ea043] text-white font-semibold text-sm rounded-lg transition-colors">
                                                    Save Changes
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'security' && (
                                        <div className="space-y-6">
                                            <div className="bg-[#161b22] border border-[#30363d] p-4 rounded-xl flex items-center justify-between">
                                                <div>
                                                    <h4 className="text-sm font-semibold text-[#e6edf3]">Two-Factor Authentication</h4>
                                                    <p className="text-xs text-[#8b949e] mt-0.5">Protect your neural link from unauthorized access.</p>
                                                </div>
                                                <button className="px-4 py-2 bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] text-xs font-semibold rounded-lg transition-colors border border-[#30363d]">
                                                    Enable 2FA
                                                </button>
                                            </div>
                                            <div className="bg-[#161b22] border border-[#30363d] p-4 rounded-xl flex items-center justify-between">
                                                <div>
                                                    <h4 className="text-sm font-semibold text-[#e6edf3]">Auto-Lock Idle Terminal</h4>
                                                    <p className="text-xs text-[#8b949e] mt-0.5">Requires wallet signature after 15 minutes of inactivity.</p>
                                                </div>
                                                <div className="w-10 h-5 bg-[#238636] rounded-full relative cursor-pointer">
                                                    <div className="w-4 h-4 bg-white rounded-full absolute top-[2px] right-[2px] shadow-sm"></div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab !== 'general' && activeTab !== 'security' && (
                                        <div className="flex flex-col items-center justify-center h-full text-center max-w-sm mx-auto">
                                            <div className="w-12 h-12 bg-[#21262d] rounded-xl flex items-center justify-center mb-4 ring-1 ring-[#30363d]">
                                                <Settings className="w-6 h-6 text-[#8b949e]" />
                                            </div>
                                            <h4 className="text-base font-semibold text-[#e6edf3] mb-2">Module Under Construction</h4>
                                            <p className="text-sm text-[#8b949e]">The {activeTab} preference module is currently being finalized for the next protocol update.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
