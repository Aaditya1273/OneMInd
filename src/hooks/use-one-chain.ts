'use client';

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
            setAgents(Array.isArray(list) ? list : []);
            setLoading(false);
        };

        fetchAgents();
        const interval = setInterval(fetchAgents, 15000); // 15s refresh for real-time sync
        return () => clearInterval(interval);
    }, []);

    return { agents, loading };
}

export function useMyAgents(address?: string) {
    const [myAgents, setMyAgents] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!address) {
            setMyAgents([]);
            return;
        }

        const fetchMyAgents = async () => {
            setLoading(true);
            const list = await OneChainService.fetchOwnedObjects(address, 'agent::Agent');
            setMyAgents(list);
            setLoading(false);
        };

        fetchMyAgents();
        const interval = setInterval(fetchMyAgents, 15000); // 15s refresh
        return () => clearInterval(interval);
    }, [address]);

    return { myAgents, loading };
}

export function useMyVaults(address?: string) {
    const [vaults, setVaults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!address) return;

        const fetchVaults = async () => {
            setLoading(true);
            const list = await OneChainService.fetchOwnedObjects(address, 'vault::Vault');
            setVaults(list);
            setLoading(false);
        };

        fetchVaults();
        const interval = setInterval(fetchVaults, 30000);
        return () => clearInterval(interval);
    }, [address]);

    return { vaults, loading };
}

export function useRegistryStats() {
    const { agents, loading } = useRegistryAgents();
    const isArray = Array.isArray(agents);

    const stats = {
        totalAgents: isArray ? agents.length : 0,
        totalOps: isArray ? (agents.length * 1.5).toFixed(1) + "M" : "0.0M",
        efficiency: "99.4%",
        networkHash: (isArray && agents.length > 0) ? String(agents[0].id).substring(0, 8) : "0x00...00"
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

export function useProposals() {
    const [proposals, setProposals] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProposals = async () => {
            setLoading(true);
            const list = await OneChainService.fetchProposals();
            setProposals(list);
            setLoading(false);
        };

        fetchProposals();
        const interval = setInterval(fetchProposals, 30000); // 30s refresh
        return () => clearInterval(interval);
    }, []);

    return { proposals, loading };
}
