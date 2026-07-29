'use client';

import { useState, useEffect } from 'react';
import { SuiService } from '@/lib/sui-service';

export function useOneBalance(address?: string) {
    const [balance, setBalance] = useState<bigint>(BigInt(0));
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!address) return;

        const fetchBalance = async () => {
            setLoading(true);
            const bal = await SuiService.getAgentBalance(address);
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
            const list = await SuiService.fetchRegistryAgents();
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
            const list = await SuiService.fetchOwnedObjects(address, 'agent::Agent');
            setMyAgents(list);
            setLoading(false);
        };

        fetchMyAgents();
        const interval = setInterval(fetchMyAgents, 15000); // 15s refresh
        return () => clearInterval(interval);
    }, [address, SuiService.PACKAGE_ID]);

    return { myAgents, loading };
}

export function useMyVaults(address?: string) {
    const [vaults, setVaults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!address) return;

        const fetchVaults = async () => {
            setLoading(true);
            const list = await SuiService.fetchOwnedObjects(address, 'vault::Vault');
            setVaults(list);
            setLoading(false);
        };

        fetchVaults();
        const interval = setInterval(fetchVaults, 30000);
        return () => clearInterval(interval);
    }, [address, SuiService.PACKAGE_ID]);

    return { vaults, loading };
}

export function useRegistryStats() {
    const { agents, loading } = useRegistryAgents();
    const isArray = Array.isArray(agents);

    const stats = {
        totalAgents: isArray ? agents.length : 0,
        totalOps: isArray ? (agents.length * 0.8).toFixed(1) + "k" : "0.0k",
        efficiency: "100%",
        networkHash: (isArray && agents.length > 0) ? String(agents[0].id).substring(0, 10) : "0x0...0"
    };

    return { stats, loading };
}

export function useEcosystemEvents() {
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            const list = await SuiService.fetchEcosystemEvents();
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
            const list = await SuiService.fetchProposals();
            setProposals(list);
            setLoading(false);
        };

        fetchProposals();
        const interval = setInterval(fetchProposals, 30000); // 30s refresh
        return () => clearInterval(interval);
    }, [SuiService.PACKAGE_ID]);

    return { proposals, loading };
}
