// Real OneChain SDK imports (Forked from Sui)
import { SuiJsonRpcClient as OneClient } from '@mysten/sui/jsonRpc';
import { Transaction } from '@mysten/sui/transactions';

// Initialize the real OneClient
export const oneClient = new OneClient({
    url: process.env.NEXT_PUBLIC_ONE_CHAIN_RPC || 'https://rpc-testnet.onelabs.cc:443',
    network: 'testnet'
});

export const OneChainService = {
    PACKAGE_ID: process.env.NEXT_PUBLIC_PACKAGE_ID || '0x86e7c9fde70f6867c364d9846257ef2566ea267d66dbc33271410e24dbfeb8af',
    REGISTRY_ID: process.env.NEXT_PUBLIC_REGISTRY_ID || '0xee678d03b49e4fb7f6a8299cbe4888fe228adecba8ce93d217fe47f44519386b',

    async getAgentBalance(address: string) {
        try {
            const coins = await oneClient.getCoins({
                owner: address,
                coinType: '0x2::oct::OCT'
            });
            return coins.data.reduce((acc: bigint, coin: any) => acc + BigInt(coin.balance), BigInt(0));
        } catch (error) {
            console.error('Failed to fetch OneChain balance:', error);
            return BigInt(0);
        }
    },

    async executeAutonomousTrade(agentId: string, amount: number) {
        console.log(`[OneChain] Agent ${agentId} executing OneDEX swap for ${amount} ONE...`);
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
            const registry = await oneClient.getObject({
                id: this.REGISTRY_ID,
                options: { showContent: true }
            });

            // In a real Sui/OneChain contract, agents are stored in a dynamic field or table
            // This is a simplified fetch for the demo object state
            return (registry.data?.content as any)?.fields?.agents || [];
        } catch (error) {
            console.error('Failed to fetch registry agents:', error);
            return [];
        }
    },

    /**
     * Fetch objects owned by the address and filter by type.
     */
    async fetchOwnedObjects(address: string, typeSuffix: string) {
        try {
            const objects = await oneClient.getOwnedObjects({
                owner: address,
                filter: {
                    StructType: `${this.PACKAGE_ID}::${typeSuffix}`
                },
                options: { showContent: true }
            });
            return objects.data.map(obj => obj.data);
        } catch (error) {
            console.error(`Failed to fetch owned objects for ${typeSuffix}:`, error);
            return [];
        }
    },

    /**
     * Query live events from the package.
     */
    async fetchEcosystemEvents() {
        try {
            const events = await oneClient.queryEvents({
                query: { MoveModule: { package: this.PACKAGE_ID, module: 'agent_logic' } },
                limit: 10,
                order: 'descending'
            });
            return events.data;
        } catch (error) {
            console.error('Failed to query ecosystem events:', error);
            return [];
        }
    }
};
