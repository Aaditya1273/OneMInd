'use client';

import { createNetworkConfig, SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@mysten/dapp-kit/dist/index.css';

import { ToastProvider } from './ui/toast-context';

const DEFAULT_RPC = 'https://fullnode.testnet.sui.io:443';
const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || DEFAULT_RPC;

const { networkConfig } = createNetworkConfig({
	testnet: { url: RPC_URL, network: 'testnet' as const },
	mainnet: { url: 'https://fullnode.mainnet.sui.io:443', network: 'mainnet' as const },
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>
			<SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
				<WalletProvider autoConnect>
					<ToastProvider>
						{children}
					</ToastProvider>
				</WalletProvider>
			</SuiClientProvider>
		</QueryClientProvider>
	);
}
