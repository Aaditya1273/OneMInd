'use client';

import { AgentStats } from '@/components/dashboard/agent-stats';
import { NeuralFeed } from '@/components/dashboard/neural-feed';
import { VaultAssets } from '@/components/dashboard/vault-assets';

export default function DashboardPage() {
    return (
        <div className="grid grid-cols-12 gap-4 h-screen max-h-screen p-4 bg-[#0d1117]">
            {/* Left Sidebar: Agent Stats */}
            <div className="col-span-12 lg:col-span-3 overflow-y-auto">
                <AgentStats />
            </div>

            {/* Center: Neural Feed */}
            <div className="col-span-12 lg:col-span-5 flex">
                <NeuralFeed />
            </div>

            {/* Right Sidebar: Vault & Assets */}
            <div className="col-span-12 lg:col-span-4 overflow-y-auto">
                <VaultAssets />
            </div>
        </div>
    );
}
