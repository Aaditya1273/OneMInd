'use client';

import dynamic from 'next/dynamic';

const OneConnectButton = dynamic(
    () => import('@mysten/dapp-kit').then((mod) => mod.ConnectButton),
    { ssr: false }
);

export function CustomConnectButton() {
    return (
        <OneConnectButton />
    );
}
