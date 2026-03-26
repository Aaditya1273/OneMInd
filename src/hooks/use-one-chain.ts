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
        const interval = setInterval(fetchAgents, 60000); // 1m refresh
        return () => clearInterval(interval);
    }, []);

    return { agents, loading };
}

export function useMyAgents(address?: string) {
    const { agents, loading } = useRegistryAgents();
    const [myAgents, setMyAgents] = useState<any[]>([]);

    useEffect(() => {
        if (!address) {
            setMyAgents([]);
            return;
        }
        const filtered = agents.filter(a => a.owner === address);
        setMyAgents(filtered);
    }, [agents, address]);

    return { myAgents, loading };
}

export function useRegistryStats() {
    const { agents, loading } = useRegistryAgents();

    const stats = {
        totalAgents: agents.length,
        totalOps: (agents.length * 1.5).toFixed(1) + "M", // Heuristic for demo
        efficiency: "99.4%",
        networkHash: agents.length > 0 ? agents[0].id.substring(0, 8) : "0x00...00"
    };

    return { stats, loading };
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
