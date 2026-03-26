module onemind::main {
    use std::string::String;
    use onemind::agent;
    use onemind::vault;
    use onemind::access_control;
    use onemind::registry::{Self, GlobalRegistry};
    use one::event;
    use one::clock::{Self, Clock};

    // --- Public Functions ---

    #[allow(lint(self_transfer))]
    public fun spawn_agent(
        registry: &mut GlobalRegistry,
        name: String,
        ctx: &mut TxContext
    ) {
        let owner = ctx.sender();
        
        let agent_obj = agent::mint(name, ctx);
        let agent_id = agent::id(&agent_obj);
        
        let vault_obj = vault::create(agent_id, ctx);
        let ac_obj = access_control::create(agent_id, ctx);
        
        registry::register(registry, agent_id, owner);
        
        one::transfer::public_transfer(agent_obj, owner);
        one::transfer::public_transfer(vault_obj, owner);
    one::transfer::public_transfer(ac_obj, owner);
    }

    // --- Neural Connectivity ---

    public struct LinkEstablished has copy, drop {
        linker: address,
        agent_id: ID,
        timestamp: u64,
    }

    public fun link_agent(
        agent_id: ID,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        let linker = ctx.sender();
        event::emit(LinkEstablished {
            linker,
            agent_id,
            timestamp: clock::timestamp_ms(clock),
        });
    }
}
