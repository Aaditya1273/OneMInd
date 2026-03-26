// Real OneChain SDK imports (Forked from Sui)
import { SuiJsonRpcClient as OneClient } from '@mysten/sui/jsonRpc';
import { Transaction } from '@mysten/sui/transactions';

const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || 'https://rpc-testnet.onelabs.cc';

// Initialize the real OneClient
export const oneClient = new OneClient({
    url: RPC_URL,
    network: 'testnet'
});

// Diagnostic fallbacks for latest deployment
const DEFAULT_PACKAGE_ID = "0xd972f1030084d224db8a3799e9456c7250ab8a22663b6c4ef533e4bf9b19c043";
const DEFAULT_REGISTRY_ID = "0xca8d0047bf83d145a24f2b82aeb2d918b816cb14b675d1032f6f32ec8ff58a7e";
const DEFAULT_GOV_HUB_ID = "0x60d6179257cce69f721fdcfd1f6eadda0369e9c26c23a36cc047c029d922ba6b";

export const OneChainService = {
    PACKAGE_ID: process.env.NEXT_PUBLIC_PACKAGE_ID || DEFAULT_PACKAGE_ID,
    REGISTRY_ID: process.env.NEXT_PUBLIC_REGISTRY_ID || DEFAULT_REGISTRY_ID,
    GOVERNANCE_HUB_ID: process.env.NEXT_PUBLIC_GOVERNANCE_HUB_ID || DEFAULT_GOV_HUB_ID,

    _checkConfig() {
        if (typeof window !== 'undefined') {
            console.log('[OneChain] Active Config:', {
                rpc: RPC_URL,
                package: this.PACKAGE_ID,
                registry: this.REGISTRY_ID,
                gov: this.GOVERNANCE_HUB_ID
            });
            if (this.PACKAGE_ID === DEFAULT_PACKAGE_ID) {
                console.warn('[OneChain] Using DEFAULT_PACKAGE_ID. Check .env.local if this is unexpected.');
            }
        }
    },

    async getAgentBalance(address: string) {
        if (!address) return BigInt(0);
        try {
            if (!oneClient) throw new Error('OneClient not initialized');
            const coins = await oneClient.getCoins({
                owner: address,
                coinType: '0x2::oct::OCT'
            });
            if (!coins || !Array.isArray(coins.data)) return BigInt(0);
            return coins.data.reduce((acc: bigint, coin: any) => acc + BigInt(coin.balance), BigInt(0));
        } catch (error: any) {
            console.warn(`[OneChain] Balance sync failed for ${address.substring(0, 6)}...: ${error.message}`);
            return BigInt(0);
        }
    },

    async executeAutonomousTrade(agentId: string, amount: number) {
        console.log(`[OneChain] Agent ${agentId} executing OneDEX swap for ${amount} OCT...`);
        // In a real scenario, this would return a signable Transaction
        return { success: true, txHash: '0x' + Math.random().toString(16).slice(2) };
    },

    async enterOnePlay(agentId: string, bet: number) {
        console.log(`[OneChain] Agent ${agentId} entering OnePlay HashGame with ${bet} MIND...`);
        // Real implementation would create a PTB for the game entry
        return { success: true, txHash: '0x' + Math.random().toString(16).slice(2) };
    },

    /**
     * Fetch all agents from the GlobalRegistry.
     */
    async fetchRegistryAgents() {
        try {
            if (!oneClient) throw new Error('OneClient not initialized');
            const events = await oneClient.queryEvents({
                query: { MoveEventType: `${this.PACKAGE_ID}::agent::AgentCreatedEvent` },
                limit: 50,
                order: 'descending'
            });

            return events.data.map(ev => {
                const parsed = ev.parsedJson as any;
                return {
                    id: String(parsed.agent_id?.id || parsed.agent_id || ''),
                    name: parsed.name,
                    owner: parsed.owner,
                    level: 1,
                    xp: 0
                };
            });
        } catch (error: any) {
            // Silence transient RPC errors during registry cold-starts
            if (error.message?.includes('Failed to fetch')) return [];
            console.warn('[OneChain] Failed to fetch registry events:', error.message);
            return [];
        }
    },

    /**
     * Fetch objects owned by the address and filter by type.
     */
    async fetchOwnedObjects(address: string, typeSuffix: string) {
        try {
            if (!oneClient) throw new Error('OneClient not initialized');
            const objects = await oneClient.getOwnedObjects({
                owner: address,
                filter: {
                    StructType: `${this.PACKAGE_ID}::${typeSuffix}`
                },
                options: { showContent: true, showDisplay: true }
            });
            if (!objects || !Array.isArray(objects.data)) return [];

            return objects.data.map(obj => {
                const content = obj.data?.content as any;
                if (!content || !content.fields) return null;
                return {
                    ...content.fields,
                    id: String(obj.data?.objectId || ''),
                    // Ensure nested ID objects from Move are flattened
                    agent_id: content.fields.agent_id ? String(content.fields.agent_id?.id || content.fields.agent_id) : undefined
                };
            }).filter(Boolean);
        } catch (error: any) {
            console.warn(`[OneChain] Owned objects fetch failed for ${typeSuffix}: ${error.message}`);
            return [];
        }
    },

    /**
     * Query live events from the package.
     */
    async fetchEcosystemEvents() {
        this._checkConfig();
        try {
            if (!this.PACKAGE_ID) return [];
            const events = await oneClient.queryEvents({
                query: { MoveModule: { package: this.PACKAGE_ID, module: 'main' } },
                limit: 10,
                order: 'descending'
            });
            return events.data;
        } catch (error: any) {
            // Silent fallback for ecosystem telemetry during RPC latency
            if (!error.message?.includes('Failed to fetch')) {
                console.warn('[OneChain] Pipeline Syncing (Ecosystem):', error.message);
            }
            return [];
        }
    },

    /**
     * Governance: Fetch all proposals via events
     */
    async fetchProposals() {
        try {
            const events = await oneClient.queryEvents({
                query: { MoveModule: { package: this.PACKAGE_ID, module: 'governance' } },
                limit: 20,
                order: 'descending'
            });

            return events.data
                .filter(ev => ev.type.endsWith('::ProposalCreated'))
                .map(ev => {
                    const parsed = ev.parsedJson as any;
                    return {
                        id: parsed.proposal_id,
                        title: parsed.title,
                        status: 'Voting',
                        votes: '0 / 10M',
                        ends: '7 Days',
                        category: 'Archive'
                    };
                });
        } catch (error: any) {
            if (!error.message?.includes('Failed to fetch')) {
                console.warn('[OneChain] Governance Registry Cold-Start:', error.message);
            }
            return [];
        }
    },
};
