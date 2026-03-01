module onemind::brain_interface {
    use onemind::agent::{Self, Agent};
    use onemind::vault::{Self, Vault};
    use onemind::access_control::{Self, AccessControl};
    use std::string::String;

    // --- Public Functions ---

    /// The primary entry point for the AI Brain to execute a withdrawal.
    public fun execute_withdrawal(
        agent: &mut Agent,
        vault: &mut Vault,
        ac: &mut AccessControl,
        amount: u64,
        recipient: address,
        ctx: &mut TxContext
    ) {
        // 1. Authorize the call via AccessControl
        access_control::authorize(ac, amount, ctx);
        
        // 2. Execute the withdrawal from the vault
        vault::withdraw_internal(vault, amount, recipient, ctx);
        
        // 3. Update agent progression
        agent::use_energy(agent, 5);
        agent::gain_xp(agent, 1);
    }

    /// Update the Agent's mental state on-chain.
    public fun sync_memory(
        agent: &mut Agent,
        ac: &mut AccessControl,
        new_memory_hash: String,
        ctx: &mut TxContext
    ) {
        access_control::authorize(ac, 0, ctx);
        agent::update_memory(agent, new_memory_hash, ctx);
        agent::use_energy(agent, 1);
    }

    /// Allow agent progression via resting.
    public fun rest(
        agent: &mut Agent,
        ac: &mut AccessControl,
        ctx: &mut TxContext
    ) {
        access_control::authorize(ac, 0, ctx);
        agent::restore_energy(agent, 20);
    }
}
