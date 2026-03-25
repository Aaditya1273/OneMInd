import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Prevent crashes in environments with restricted localStorage
if (typeof window !== 'undefined') {
  try {
    // Test if localStorage is accessible
    const storage = window.localStorage;
    storage.getItem('test');
  } catch (e) {
    console.warn('LocalStorage access denied. Using in-memory fallback.');
    const mockStorage: Record<string, string> = {};
    (window as any).localStorage = {
      getItem: (key: string) => mockStorage[key] || null,
      setItem: (key: string, value: string) => { mockStorage[key] = value; },
      removeItem: (key: string) => { delete mockStorage[key]; },
      clear: () => { for (const key in mockStorage) delete mockStorage[key]; },
      length: 0,
      key: (index: number) => Object.keys(mockStorage)[index] || null,
    };
  }
}

import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OneMind | Autonomous Intelligence Layer",
  description: "The world's first sovereign AI agent dashboard on OneChain.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="scanline" />
          {children}
        </Providers>
      </body>
    </html>
  );
}
