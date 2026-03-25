'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Settings, Shield, Bell, Cpu, Palette, CreditCard, LogOut, ChevronRight, Activity, Zap, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const TABS = [
    { id: 'general', label: 'General', icon: Settings, desc: 'Profile & Account Node' },
    { id: 'security', label: 'Security', icon: Shield, desc: 'Neural Encryption & 2FA' },
    { id: 'notifications', label: 'Alerts', icon: Bell, desc: 'Critical System Pings' },
    { id: 'neural', label: 'Neural Link', icon: Cpu, desc: 'Sync Speeds & Caching' },
    { id: 'appearance', label: 'Appearance', icon: Palette, desc: 'Interface Visual Layer' },
];

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
    const [activeTab, setActiveTab] = useState('general');

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
                        className="fixed inset-0 bg-black/60 z-[200] backdrop-blur-[12px]"
                    />

                    {/* Modal Window Container */}
                    <div className="fixed inset-0 z-[201] pointer-events-none flex items-center justify-center p-4 md:p-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20, filter: 'blur(20px)' }}
                            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, scale: 0.9, y: 20, filter: 'blur(20px)' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 100 }}
                            className="glass-card w-full max-w-5xl h-[800px] flex overflow-hidden pointer-events-auto relative"
                        >
                            {/* Exit Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 p-2 text-white/30 hover:text-white hover:bg-white/10 rounded-full transition-all z-20 group active:scale-95"
                            >
                                <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                            </button>

                            {/* Sidebar Tab Menu */}
                            <div className="w-full md:w-80 border-r border-white/5 flex flex-col flex-shrink-0 relative overflow-hidden">
                                <div className="p-8 border-b border-white/5 relative z-10">
                                    <h2 className="text-2xl font-black text-white tracking-tighter uppercase mb-1">Preferences</h2>
                                    <p className="text-[10px] text-white/40 font-black uppercase tracking-[0.2em]">Neural Node Config</p>
                                </div>
                                <div className="p-4 space-y-2 overflow-y-auto relative z-10 no-scrollbar">
                                    {TABS.map((tab) => {
                                        const isActive = activeTab === tab.id;
                                        return (
                                            <button
                                                key={tab.id}
                                                onClick={() => setActiveTab(tab.id)}
                                                className={cn(
                                                    'w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 group relative',
                                                    isActive
                                                        ? 'bg-white/5 text-white shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]'
                                                        : 'text-white/40 hover:text-white hover:bg-white/[0.02]'
                                                )}
                                            >
                                                {isActive && (
                                                    <motion.div
                                                        layoutId="settings-nav"
                                                        className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-cyan-400 rounded-r-full shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                                                    />
                                                )}
                                                <tab.icon className={cn('w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110', isActive ? 'text-cyan-400' : 'text-inherit')} />
                                                <div className="text-left min-w-0">
                                                    <div className={cn('text-sm font-black tracking-tighter uppercase', isActive ? 'text-white' : 'text-inherit')}>
                                                        {tab.label}
                                                    </div>
                                                    <div className="text-[9px] font-black uppercase tracking-[0.1em] opacity-40 group-hover:opacity-60 transition-opacity truncate">
                                                        {tab.desc}
                                                    </div>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Sidebar Bottom Section */}
                                <div className="mt-auto p-4 border-t border-white/5 backdrop-blur-md">
                                    <button className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-rose-400/60 hover:text-rose-400 hover:bg-rose-400/5 transition-all group">
                                        <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        <span className="text-sm font-black tracking-tighter uppercase">Terminate Session</span>
                                    </button>
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="flex-1 flex flex-col min-w-0 bg-black/20">
                                <div className="h-24 border-b border-white/5 flex items-center px-10 flex-shrink-0">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeTab}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 10 }}
                                            className="flex flex-col"
                                        >
                                            <h3 className="text-3xl font-black text-white tracking-tighter uppercase">
                                                {TABS.find(t => t.id === activeTab)?.label} Settings
                                            </h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                                                <span className="text-[9px] text-white/40 font-black uppercase tracking-widest">Awaiting Command Input</span>
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                <div className="flex-1 overflow-y-auto p-10 no-scrollbar pb-32">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeTab}
                                            initial={{ opacity: 0, y: 15, scale: 0.98, filter: 'blur(10px)' }}
                                            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                                            exit={{ opacity: 0, y: -15, scale: 0.98, filter: 'blur(10px)' }}
                                            transition={{
                                                type: 'spring',
                                                damping: 30,
                                                stiffness: 100,
                                                mass: 0.8,
                                                restDelta: 0.001
                                            }}
                                            className="space-y-10"
                                        >
                                            {activeTab === 'general' && (
                                                <div className="space-y-8 max-w-2xl">
                                                    <SettingGroup label="Neural Interface">
                                                        <InputField label="Display Agent ID" defaultValue="SECURE_NODE_01" icon={<Activity className="w-4 h-4 text-cyan-400" />} />
                                                        <InputField label="Node Key Hash" defaultValue="0x72...f9e1" icon={<ShieldCheck className="w-4 h-4 text-purple-400" />} readOnly />
                                                    </SettingGroup>

                                                    <SettingGroup label="Time & Local">
                                                        <div className="grid grid-cols-2 gap-6">
                                                            <SelectField label="Epoch Sync" options={['UTC (Coordinated)', 'Local Neural Link', 'Stellar Standard']} />
                                                            <SelectField label="Telemetry Resolution" options={['64-bit Ultra', '32-bit Standard', 'Optimized High']} />
                                                        </div>
                                                    </SettingGroup>

                                                    <div className="pt-4 flex justify-end">
                                                        <button className="px-10 py-4 bg-white text-black font-black text-xs rounded-full hover:bg-cyan-400 hover:scale-105 transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)] uppercase tracking-widest">
                                                            Update Core Matrix
                                                        </button>
                                                    </div>
                                                </div>
                                            )}

                                            {activeTab === 'security' && (
                                                <div className="space-y-6 max-w-2xl">
                                                    <SecurityCard
                                                        icon={<Shield className="w-6 h-6 text-emerald-400" />}
                                                        title="Two-Factor Encryption"
                                                        desc="Multi-signature verification for all autonomous withdrawals."
                                                        action="Enable Vault Guard"
                                                    />
                                                    <SecurityCard
                                                        icon={<Zap className="w-6 h-6 text-cyan-400" />}
                                                        title="Instant KillSwitch"
                                                        desc="Immediately terminate all neural links if compromised."
                                                        action="Armed"
                                                        enabled
                                                    />
                                                    <SecurityCard
                                                        icon={<Activity className="w-6 h-6 text-purple-400" />}
                                                        title="Session Transparency"
                                                        desc="Maintain a public ledger of all configuration changes."
                                                        action="Auditing Live"
                                                        enabled
                                                    />
                                                </div>
                                            )}

                                            {activeTab !== 'general' && activeTab !== 'security' && (
                                                <div className="flex flex-col items-center justify-center py-20 text-center max-w-md mx-auto">
                                                    <div className="w-20 h-20 rounded-3xl bg-white/[0.02] border border-white/5 flex items-center justify-center mb-8 shadow-2xl relative group">
                                                        <div className="absolute inset-0 bg-cyan-400/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                                        <Settings className="w-10 h-10 text-white/20 animate-spin-slow" />
                                                    </div>
                                                    <h4 className="text-2xl font-black text-white tracking-tighter uppercase mb-4">Module Initializing</h4>
                                                    <p className="text-sm text-white/40 leading-relaxed font-medium tracking-tight">
                                                        The <span className="text-cyan-400">{activeTab}</span> preference layer is currently recalibrating for version 2.0 deployment.
                                                    </p>
                                                    <div className="mt-8 flex gap-3">
                                                        <div className="w-3 h-3 rounded-full bg-cyan-500 animate-bounce" />
                                                        <div className="w-3 h-3 rounded-full bg-cyan-500 animate-bounce [animation-delay:0.2s]" />
                                                        <div className="w-3 h-3 rounded-full bg-cyan-500 animate-bounce [animation-delay:0.4s]" />
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}

function SettingGroup({ label, children }: { label: string, children: React.ReactNode }) {
    return (
        <div className="space-y-4">
            <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.25em] ml-1">{label}</h4>
            <div className="space-y-4">{children}</div>
        </div>
    );
}

function InputField({ label, defaultValue, icon, readOnly = false }: { label: string, defaultValue: string, icon?: React.ReactNode, readOnly?: boolean }) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">{label}</label>
            <div className="relative group/input">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 opacity-40 group-focus-within/input:opacity-100 transition-opacity">
                    {icon}
                </div>
                <input
                    type="text"
                    defaultValue={defaultValue}
                    readOnly={readOnly}
                    className={cn(
                        "w-full bg-white/[0.02] border border-white/5 rounded-2xl pl-14 pr-6 py-4 text-sm text-white font-black tracking-tight focus:border-cyan-400/30 focus:outline-none transition-all shadow-inner uppercase",
                        readOnly && "opacity-50 cursor-not-allowed"
                    )}
                />
            </div>
        </div>
    );
}

function SelectField({ label, options }: { label: string, options: string[] }) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">{label}</label>
            <div className="relative">
                <select className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-4 text-sm text-white font-black tracking-tight focus:border-cyan-400/30 focus:outline-none transition-all shadow-inner appearance-none uppercase">
                    {options.map(opt => <option key={opt}>{opt}</option>)}
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                    <ChevronRight className="w-4 h-4 rotate-90" />
                </div>
            </div>
        </div>
    );
}

function SecurityCard({ icon, title, desc, action, enabled = false }: { icon: React.ReactNode, title: string, desc: string, action: string, enabled?: boolean }) {
    return (
        <div className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl flex items-center justify-between group hover:bg-white/[0.04] transition-all relative overflow-hidden">
            <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {icon}
                </div>
                <div>
                    <h4 className="text-lg font-black text-white tracking-tighter uppercase">{title}</h4>
                    <p className="text-xs text-white/40 font-medium tracking-tight mt-0.5">{desc}</p>
                </div>
            </div>
            <button className={cn(
                "px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 border",
                enabled
                    ? "bg-emerald-400/10 text-emerald-400 border-emerald-400/20"
                    : "bg-white/5 text-white/60 border-white/10 hover:border-white/20 hover:text-white"
            )}>
                {action}
            </button>
        </div>
    );
}
