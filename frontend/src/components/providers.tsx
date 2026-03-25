'use client';

import { createNetworkConfig, SuiClientProvider as OneClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@mysten/dapp-kit/dist/index.css';

const { networkConfig } = createNetworkConfig({
	testnet: {
		url: 'https://rpc-testnet.onelabs.cc:443',
		network: 'testnet' as any,
	},
	mainnet: {
		url: 'https://rpc-mainnet.onelabs.cc:443',
		network: 'mainnet' as any,
	},
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>
			<OneClientProvider networks={networkConfig} defaultNetwork="testnet">
				<WalletProvider autoConnect>
					{children}
				</WalletProvider>
			</OneClientProvider>
		</QueryClientProvider>
	);
}
