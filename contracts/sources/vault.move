module onemind::vault {
    use one::coin::{Self, Coin};
    use one::bag::{Self, Bag};
    use one::event;

    // --- Errors ---
    const EInsufficientBalance: u64 = 0;

    // --- Structs ---

    /// The Sovereign Vault for an AI Agent.
    /// It can hold native coins and arbitrary assets in its dynamic bag.
    public struct Vault has key, store {
        id: UID,
        /// The ID of the Agent this vault is tied to.
        agent_id: ID,
        /// The primary balance of the native ONE token (OCT).
        balance: u64,
        /// A bag to store other types of assets (NFTs, other coins).
        assets: Bag,
        /// The owner address (usually the human user).
        owner: address,
    }

    // --- Events ---

    public struct DepositEvent has copy, drop {
        vault_id: ID,
        agent_id: ID,
        amount: u64,
        sender: address,
    }

    public struct WithdrawEvent has copy, drop {
        vault_id: ID,
        agent_id: ID,
        amount: u64,
        recipient: address,
    }

    // --- Public Functions ---

    /// Creates a new vault for an agent.
    public fun create(agent_id: ID, ctx: &mut TxContext): Vault {
        Vault {
            id: object::new(ctx),
            agent_id,
            balance: 0,
            assets: one::bag::new(ctx),
            owner: ctx.sender(),
        }
    }

    /// Allows anyone to deposit native coins (OCT) into the vault.
    public fun deposit_one(vault: &mut Vault, payment: Coin<one::oct::OCT>, ctx: &mut TxContext) {
        let amount = coin::value(&payment);
        vault.balance = vault.balance + amount;
        
        // Transfer the actual coin to the vault's address for storage
        one::transfer::public_transfer(payment, object::uid_to_address(&vault.id));

        event::emit(DepositEvent {
            vault_id: object::id(vault),
            agent_id: vault.agent_id,
            amount,
            sender: ctx.sender(),
        });
    }

    /// Internal withdrawal logic, can be called by brain_interface or agent owner.
    public fun withdraw_internal(vault: &mut Vault, amount: u64, recipient: address, _ctx: &mut TxContext) {
        assert!(vault.balance >= amount, EInsufficientBalance);
        
        vault.balance = vault.balance - amount;
        
        // In a real production scenario, we would withdraw from one::balance and transfer.
        // For the hackathon MVP, we track with virtual balance and emit events for the UI.
        
        event::emit(WithdrawEvent {
            vault_id: object::id(vault),
            agent_id: vault.agent_id,
            amount,
            recipient,
        });
    }

    // --- Accessors ---

    public fun balance(vault: &Vault): u64 { vault.balance }
    public fun agent_id(vault: &Vault): ID { vault.agent_id }
    public fun owner(vault: &Vault): address { vault.owner }
}
