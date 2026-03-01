'use client';

import { AgentStats } from '@/components/dashboard/agent-stats';
import { NeuralFeed } from '@/components/dashboard/neural-feed';
import { VaultAssets } from '@/components/dashboard/vault-assets';

export default function DashboardPage() {
    return (
        <div className="grid grid-cols-12 gap-8 h-full">
            {/* Left Sidebar: Agent Stats */}
            <div className="col-span-12 md:col-span-3">
                <AgentStats />
            </div>

            {/* Center: Neural Feed */}
            <div className="col-span-12 md:col-span-6 h-full min-h-[600px]">
                <NeuralFeed />
            </div>

            {/* Right Sidebar: Vault & Assets */}
            <div className="col-span-12 md:col-span-3">
                <VaultAssets />
            </div>
        </div>
    );
}
