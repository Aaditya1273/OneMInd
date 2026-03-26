import { useState } from 'react';
import { AgentStats } from '@/components/dashboard/agent-stats';
import { NeuralFeed } from '@/components/dashboard/neural-feed';
import { VaultAssets } from '@/components/dashboard/vault-assets';
import { SpawnAgentModal } from '@/components/dashboard/spawn-modal';

export default function DashboardPage() {
    const [isSpawnOpen, setIsSpawnOpen] = useState(false);

    return (
        <div className="grid grid-cols-12 gap-8 bg-transparent">
            {/* Left Column: Agent Stats (Symmetric with Right) */}
            <div className="col-span-12 lg:col-span-4 xl:col-span-3 h-[750px]">
                <AgentStats onSpawnClick={() => setIsSpawnOpen(true)} />
            </div>

            {/* Center Column: Neural Feed (Primary Focus) */}
            <div className="col-span-12 lg:col-span-8 xl:col-span-6 h-[750px]">
                <NeuralFeed />
            </div>

            {/* Right Column: Vault & Assets (Symmetric with Left) */}
            <div className="col-span-12 lg:col-span-4 xl:col-span-3 h-[750px]">
                <VaultAssets />
            </div>

            <SpawnAgentModal isOpen={isSpawnOpen} onClose={() => setIsSpawnOpen(false)} />
        </div>
    );
}
