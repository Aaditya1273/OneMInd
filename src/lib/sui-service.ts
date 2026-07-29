import { SuiJsonRpcClient } from '@mysten/sui/jsonRpc';
import { Transaction } from '@mysten/sui/transactions';

const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || 'https://fullnode.testnet.sui.io:443';

// Initialize the Sui RPC client
export const suiClient = new SuiJsonRpcClient({ url: RPC_URL, network: 'testnet' });

// Fallback addresses — replace these after deploying to Sui testnet
const DEFAULT_PACKAGE_ID = process.env.NEXT_PUBLIC_PACKAGE_ID || '';
const DEFAULT_REGISTRY_ID = process.env.NEXT_PUBLIC_REGISTRY_ID || '';
const DEFAULT_GOV_HUB_ID  = process.env.NEXT_PUBLIC_GOVERNANCE_HUB_ID || '';

export const SuiService = {
    PACKAGE_ID:      DEFAULT_PACKAGE_ID,
    REGISTRY_ID:     DEFAULT_REGISTRY_ID,
    GOVERNANCE_HUB_ID: DEFAULT_GOV_HUB_ID,

    _checkConfig() {
        if (typeof window !== 'undefined') {
            console.log('[OneMind] Active Config:', {
                rpc: RPC_URL,
                package: this.PACKAGE_ID,
                registry: this.REGISTRY_ID,
                gov: this.GOVERNANCE_HUB_ID,
            });
            if (!this.PACKAGE_ID) {
                console.warn('[OneMind] NEXT_PUBLIC_PACKAGE_ID is not set. Deploy contracts to Sui and update .env.local.');
            }
        }
    },

    async getAgentBalance(address: string) {
        if (!address) return BigInt(0);
        try {
            const coins = await suiClient.getCoins({
                owner: address,
                coinType: '0x2::sui::SUI',
            });
            if (!coins || !Array.isArray(coins.data)) return BigInt(0);
            return coins.data.reduce(
                (acc: bigint, coin: any) => acc + BigInt(coin.balance),
                BigInt(0)
            );
        } catch (error: any) {
            console.warn(`[OneMind] Balance sync failed for ${address.substring(0, 6)}...: ${error.message}`);
            return BigInt(0);
        }
    },

    async executeAutonomousTrade(agentId: string, amount: number) {
        console.log(`[OneMind] Agent ${agentId} executing DEX swap for ${amount} SUI...`);
        // Build and return a signable PTB in a real implementation
        return { success: true, txHash: '0x' + Math.random().toString(16).slice(2) };
    },

    async enterGame(agentId: string, bet: number) {
        console.log(`[OneMind] Agent ${agentId} entering game with ${bet} SUI...`);
        // Build and return a signable PTB in a real implementation
        return { success: true, txHash: '0x' + Math.random().toString(16).slice(2) };
    },

    /**
     * Fetch all agents from the GlobalRegistry via AgentCreatedEvent.
     */
    async fetchRegistryAgents() {
        try {
            if (!this.PACKAGE_ID) return [];
            const events = await suiClient.queryEvents({
                query: { MoveEventType: `${this.PACKAGE_ID}::agent::AgentCreatedEvent` },
                limit: 50,
                order: 'descending',
            });

            return events.data.map(ev => {
                const parsed = ev.parsedJson as any;
                return {
                    id: String(parsed.agent_id?.id || parsed.agent_id || ''),
                    name: parsed.name,
                    owner: parsed.owner,
                    level: 1,
                    xp: 0,
                };
            });
        } catch (error: any) {
            if (error.message?.includes('Failed to fetch')) return [];
            console.warn('[OneMind] Failed to fetch registry events:', error.message);
            return [];
        }
    },

    /**
     * Fetch owned objects of a given Move type suffix (e.g. 'agent::Agent').
     */
    async fetchOwnedObjects(address: string, typeSuffix: string) {
        try {
            if (!this.PACKAGE_ID) return [];
            const objects = await suiClient.getOwnedObjects({
                owner: address,
                filter: {
                    StructType: `${this.PACKAGE_ID}::${typeSuffix}`,
                },
                options: { showContent: true, showDisplay: true },
            });
            if (!objects || !Array.isArray(objects.data)) return [];

            return objects.data.map(obj => {
                const content = obj.data?.content as any;
                if (!content || !content.fields) return null;
                return {
                    ...content.fields,
                    id: String(obj.data?.objectId || ''),
                    agent_id: content.fields.agent_id
                        ? String(content.fields.agent_id?.id || content.fields.agent_id)
                        : undefined,
                };
            }).filter(Boolean);
        } catch (error: any) {
            console.warn(`[OneMind] Owned objects fetch failed for ${typeSuffix}: ${error.message}`);
            return [];
        }
    },

    /**
     * Query live events emitted by the main module.
     */
    async fetchEcosystemEvents() {
        this._checkConfig();
        try {
            if (!this.PACKAGE_ID) return [];
            const events = await suiClient.queryEvents({
                query: { MoveModule: { package: this.PACKAGE_ID, module: 'main' } },
                limit: 10,
                order: 'descending',
            });
            return events.data;
        } catch (error: any) {
            if (!error.message?.includes('Failed to fetch')) {
                console.warn('[OneMind] Ecosystem events sync:', error.message);
            }
            return [];
        }
    },

    /**
     * Governance: fetch all proposals via ProposalCreated events.
     */
    async fetchProposals() {
        try {
            if (!this.PACKAGE_ID) return [];
            const events = await suiClient.queryEvents({
                query: { MoveModule: { package: this.PACKAGE_ID, module: 'governance' } },
                limit: 20,
                order: 'descending',
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
                        category: 'Archive',
                    };
                });
        } catch (error: any) {
            if (!error.message?.includes('Failed to fetch')) {
                console.warn('[OneMind] Governance fetch:', error.message);
            }
            return [];
        }
    },
};
