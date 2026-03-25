module onemind::main {
    use std::string::String;
    use onemind::agent;
    use onemind::vault;
    use onemind::access_control;
    use onemind::registry::{Self, GlobalRegistry};

    // --- Public Functions ---

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
}
