'use client';

import { createNetworkConfig, SuiClientProvider as OneClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@mysten/dapp-kit/dist/index.css';

import { ToastProvider } from './ui/toast-context';

const DEFAULT_RPC = 'https://rpc-testnet.onelabs.cc';
const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || DEFAULT_RPC;

const { networkConfig } = createNetworkConfig({
	testnet: {
		url: RPC_URL,
		network: 'testnet' as any,
	},
	mainnet: {
		url: 'https://rpc-mainnet.onelabs.cc',
		network: 'mainnet' as any,
	},
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>
			<OneClientProvider networks={networkConfig} defaultNetwork="testnet">
				<WalletProvider autoConnect>
					<ToastProvider>
						{children}
					</ToastProvider>
				</WalletProvider>
			</OneClientProvider>
		</QueryClientProvider>
	);
}
