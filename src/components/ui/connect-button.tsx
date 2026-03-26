'use client';

import dynamic from 'next/dynamic';

const OneConnectButton = dynamic(
    () => import('@mysten/dapp-kit').then((mod) => mod.ConnectButton),
    { ssr: false }
);

export function CustomConnectButton() {
    return (
        <div className="group relative p-[1px] rounded-xl overflow-hidden active:scale-95 transition-transform duration-200">
            {/* Rotating Rainbow Border */}
            <div className="absolute inset-[-1000%] bg-[conic-gradient(from_0deg,#ff0000,#ffff00,#00ff00,#00ffff,#0000ff,#ff00ff,#ff0000)] animate-[spin_3s_linear_infinite] group-hover:[animation-play-state:paused]" />

            {/* Glow Layer */}
            <div className="absolute inset-[-1000%] bg-[conic-gradient(from_0deg,#ff0000,#ffff00,#00ff00,#00ffff,#0000ff,#ff00ff,#ff0000)] animate-[spin_3s_linear_infinite] group-hover:[animation-play-state:paused] blur-[15px] opacity-40 shrink-0" />

            {/* Content Container */}
            <div className="relative z-10 rounded-xl bg-[#020203] flex items-center justify-center p-0.5">
                <OneConnectButton />
            </div>
        </div>
    );
}
