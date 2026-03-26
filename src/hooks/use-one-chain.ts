import { useState, useEffect } from 'react';
import { OneChainService } from '@/lib/one-chain-service';

export function useOneBalance(address?: string) {
    const [balance, setBalance] = useState<bigint>(BigInt(0));
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!address) return;

        const fetchBalance = async () => {
            setLoading(true);
            const bal = await OneChainService.getAgentBalance(address);
            setBalance(bal);
            setLoading(false);
        };

        fetchBalance();
        const interval = setInterval(fetchBalance, 10000); // 10s refresh
        return () => clearInterval(interval);
    }, [address]);

    return { balance, loading };
}

export function useRegistryAgents() {
    const [agents, setAgents] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAgents = async () => {
            setLoading(true);
            const list = await OneChainService.fetchRegistryAgents();
            setAgents(list);
            setLoading(false);
        };

        fetchAgents();
    }, []);

    return { agents, loading };
}

export function useEcosystemEvents() {
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            const list = await OneChainService.fetchEcosystemEvents();
            setEvents(list);
            setLoading(false);
        };

        fetchEvents();
        const interval = setInterval(fetchEvents, 30000); // 30s refresh
        return () => clearInterval(interval);
    }, []);

    return { events, loading };
}
