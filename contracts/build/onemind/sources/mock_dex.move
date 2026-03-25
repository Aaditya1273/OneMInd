module onemind::mock_dex {
    use one::event;

    /// Simple DEX placeholder for autonomous agents.
    public struct Order has key, store {
        id: UID,
        owner: address,
        amount_a: u64,
        amount_b: u64,
    }

    /// Event emitted when a new order is placed.
    public struct OrderPlaced has copy, drop {
        owner: address,
        amount_a: u64,
        amount_b: u64,
    }

    /// Event emitted when an order is cancelled.
    public struct OrderCancelled has copy, drop {
        owner: address,
    }

    /// Place a new order on the mock DEX.
    #[allow(lint(self_transfer))]
    public fun place_order(amount_a: u64, amount_b: u64, ctx: &mut TxContext) {
        let owner = ctx.sender();
        let order = Order { 
            id: object::new(ctx),
            owner, 
            amount_a, 
            amount_b 
        };
        one::transfer::public_transfer(order, owner);
        event::emit(OrderPlaced { owner, amount_a, amount_b });
    }

    /// Consume an order (effectively cancelling/deleting it for this mock).
    public fun cancel_order(order: Order, ctx: &mut TxContext) {
        let Order { id, owner, amount_a: _, amount_b: _ } = order;
        assert!(owner == ctx.sender(), 0); // ENotOwner
        object::delete(id);
        event::emit(OrderCancelled { owner });
    }
}
