module onemind::agent {
    use std::string::String;
    use one::event;

    const EInvalidName: u64 = 0;

    // --- Structs ---

    /// The Agent NFT representing the AI entity's on-chain identity.
    public struct Agent has key, store {
        id: UID,
        name: String,
        /// Experience points gained through activity.
        xp: u64,
        /// The current level of the agent.
        level: u64,
        /// Sustenance for the AI brain; actions consume energy.
        energy: u64,
        /// IPFS/Arweave hash for persistent AI memory.
        memory_hash: String,
        /// The owner address.
        owner: address,
    }

    // --- Events ---

    public struct AgentCreatedEvent has copy, drop {
        agent_id: ID,
        name: String,
        owner: address,
    }

    public struct AgentLevelUpEvent has copy, drop {
        agent_id: ID,
        new_level: u64,
    }

    // --- Public Functions ---

    /// Mint a new Agent NFT.
    public fun mint(name: String, ctx: &mut TxContext): Agent {
        let id = object::new(ctx);
        let agent_id = object::uid_to_inner(&id);
        let owner = ctx.sender();
        
        event::emit(AgentCreatedEvent {
            agent_id,
            name,
            owner,
        });

        Agent {
            id,
            name,
            xp: 0,
            level: 1,
            energy: 100,
            memory_hash: std::string::utf8(b""),
            owner,
        }
    }

    /// Update the agent's memory hash (brain synchronization).
    public fun update_memory(agent: &mut Agent, new_memory: String, ctx: &mut TxContext) {
        // Validation: Only the owner or an authorized session (handled by access_control) can update
        // (In this modular design, access_control calls this function)
        agent.memory_hash = new_memory;
    }

    /// Gain XP and handle leveling up.
    public fun gain_xp(agent: &mut Agent, amount: u64) {
        agent.xp = agent.xp + amount;
        
        // Simple leveling logic: level = floor(xp / 100) + 1
        let new_level = (agent.xp / 100) + 1;
        if (new_level > agent.level) {
            agent.level = new_level;
            event::emit(AgentLevelUpEvent {
                agent_id: object::id(agent),
                new_level,
            });
        };
    }

    /// Use energy for actions.
    public fun use_energy(agent: &mut Agent, amount: u64) {
        if (agent.energy >= amount) {
            agent.energy = agent.energy - amount;
        } else {
            agent.energy = 0;
        };
    }

    /// Restore energy (resting).
    public fun restore_energy(agent: &mut Agent, amount: u64) {
        agent.energy = agent.energy + amount;
        if (agent.energy > 100) {
            agent.energy = 100;
        };
    }

    // --- Accessors ---

    public fun id(agent: &Agent): ID { object::id(agent) }
    public fun name(agent: &Agent): String { agent.name }
    public fun xp(agent: &Agent): u64 { agent.xp }
    public fun level(agent: &Agent): u64 { agent.level }
    public fun memory_hash(agent: &Agent): String { agent.memory_hash }
    public fun energy(agent: &Agent): u64 { agent.energy }
    public fun owner(agent: &Agent): address { agent.owner }
}
