module onemind::registry {
    use one::table::{Self, Table};
    use one::event;

    // --- Structs ---

    public struct GlobalRegistry has key {
        id: UID,
        total_agents: u64,
        agents: Table<ID, address>,
    }

    // --- Events ---

    public struct RegistryInitializedEvent has copy, drop {
        registry_id: ID,
    }

    // --- Public Functions ---

    fun init(ctx: &mut TxContext) {
        let id = object::new(ctx);
        let registry_id = object::uid_to_inner(&id);
        
        let registry = GlobalRegistry {
            id,
            total_agents: 0,
            agents: table::new(ctx),
        };
        
        one::transfer::share_object(registry);
        event::emit(RegistryInitializedEvent { registry_id });
    }

    public fun register(registry: &mut GlobalRegistry, agent_id: ID, owner: address) {
        registry.total_agents = registry.total_agents + 1;
        table::add(&mut registry.agents, agent_id, owner);
    }

    public fun unregister(registry: &mut GlobalRegistry, agent_id: ID) {
        registry.total_agents = registry.total_agents - 1;
        table::remove(&mut registry.agents, agent_id);
    }

    // --- Accessors ---

    public fun total_agents(registry: &GlobalRegistry): u64 { registry.total_agents }
    public fun is_registered(registry: &GlobalRegistry, agent_id: ID): bool { table::contains(&registry.agents, agent_id) }
}
