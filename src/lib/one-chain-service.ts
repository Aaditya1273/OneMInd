/**
 * OneChain Service - High Fidelity Mock for 'Aha! Demo'
 * 
 * Note: We use a robust mock for the OneClient to ensure 
 * complete stability for the hackathon presentation while 
 * maintaining the specific 'OneClient' branding requested.
 */

// We keep the Transaction import for future real integration
import { Transaction } from '@mysten/sui/transactions';

export class OneClient {
    private endpoint: string;

    constructor(endpoint: string = 'https://rpc-testnet.onelabs.cc:443') {
        this.endpoint = endpoint;
        console.log(`[OneClient] Initialized on: ${this.endpoint}`);
    }

    // Mocking the getCoins functionality for the demo
    async getCoins({ owner, coinType }: { owner: string; coinType: string }) {
        console.log(`[OneClient] Fetching ${coinType} for ${owner}`);
        // Return realistic mock data to satisfy the UI
        return {
            data: [
                { balance: '1482000000', coinType: '0x2::one_chain::OCT' },
                { balance: '420000000', coinType: '0x3::one_dex::MIND' }
            ]
        };
    }
}

export const oneClient = new OneClient();

export const OneChainService = {
    PACKAGE_ID: '0x8d6b9d62d29e4198305c6c649987fb08170c06020584288d75fa74391a876798',

    async getAgentBalance(address: string) {
        try {
            const coins = await oneClient.getCoins({
                owner: address,
                coinType: '0x2::one_chain::OCT'
            });
            return coins.data.reduce((acc, coin) => acc + BigInt(coin.balance), BigInt(0));
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
        return { success: true, txHash: '0x' + Math.random().toString(16).slice(2) };
    }
};
