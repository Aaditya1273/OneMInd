module onemind::strategy_manager {
    use one::event;

    /// Resource representing a strategy manager for an agent.
    public struct StrategyManager has key, store {
        id: UID,
        /// Owner address of the manager (authorized to call execution).
        owner: address,
        /// List of strategy data blocks (e.g., serialized parameters).
        strategies: vector<vector<u8>>,
    }

    /// Event emitted when a strategy is successfully executed.
    public struct StrategyExecuted has copy, drop {
        owner: address,
        index: u64,
        data: vector<u8>,
    }

    /// Create and transfer a StrategyManager to the sender.
    #[allow(lint(self_transfer))]
    public fun init_manager(ctx: &mut TxContext) {
        let owner = ctx.sender();
        let manager = StrategyManager {
            id: object::new(ctx),
            owner,
            strategies: vector::empty(),
        };
        one::transfer::public_transfer(manager, owner);
    }

    /// Register a new strategy data block.
    public fun register_strategy(manager: &mut StrategyManager, data: vector<u8>) {
        vector::push_back(&mut manager.strategies, data);
    }

    /// Execute a strategy by its index.
    public fun execute_strategy(manager: &mut StrategyManager, index: u64, _ctx: &mut TxContext) {
        let len = vector::length(&manager.strategies);
        assert!(index < len, 0); // EIndexOutOfBounds
        
        let strategy_data = vector::borrow(&manager.strategies, index);
        
        event::emit(StrategyExecuted {
            owner: manager.owner,
            index,
            data: *strategy_data,
        });
    }
}
