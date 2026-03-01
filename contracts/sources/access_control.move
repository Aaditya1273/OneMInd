module onemind::access_control {
    use one::event;

    // --- Errors ---
    const ENotOwner: u64 = 0;
    const EInvalidSession: u64 = 1;
    const EExceedsLimit: u64 = 2;

    // --- Structs ---

    /// Permission object that manages session keys for an agent.
    public struct AccessControl has key, store {
        id: UID,
        agent_id: ID,
        owner: address,
        /// The current authorized session key (off-chain brain address).
        session_key: address,
        /// When the session expires (mocked duration).
        expires_at: u64,
        /// Maximum amount the session key can spend/withdraw.
        active_limit: u64,
        /// How much has already been spent in this session.
        spent_so_far: u64,
    }

    // --- Events ---

    public struct SessionCreatedEvent has copy, drop {
        agent_id: ID,
        session_key: address,
        expires_at: u64,
        limit: u64,
    }

    public struct SessionRevokedEvent has copy, drop {
        agent_id: ID,
        session_key: address,
    }

    // --- Public Functions ---

    /// Creates access control for an agent.
    public fun create(agent_id: ID, ctx: &mut TxContext): AccessControl {
        AccessControl {
            id: object::new(ctx),
            agent_id,
            owner: ctx.sender(),
            session_key: @0x0,
            expires_at: 0,
            active_limit: 0,
            spent_so_far: 0,
        }
    }

    /// Grant a new session key to the AI brain.
    public fun grant_session(
        ac: &mut AccessControl,
        session_key: address,
        duration: u64,
        limit: u64,
        ctx: &mut TxContext
    ) {
        assert!(ctx.sender() == ac.owner, ENotOwner);
        
        ac.session_key = session_key;
        ac.expires_at = duration; 
        ac.active_limit = limit;
        ac.spent_so_far = 0;

        event::emit(SessionCreatedEvent {
            agent_id: ac.agent_id,
            session_key,
            expires_at: duration,
            limit,
        });
    }

    /// Revoke a session key immediately.
    public fun revoke_session(ac: &mut AccessControl, ctx: &mut TxContext) {
        assert!(ctx.sender() == ac.owner, ENotOwner);
        
        let old_key = ac.session_key;
        ac.session_key = @0x0;
        ac.expires_at = 0;

        event::emit(SessionRevokedEvent {
            agent_id: ac.agent_id,
            session_key: old_key,
        });
    }

    /// Validates if a caller is authorized to act on behalf of the agent.
    public fun authorize(ac: &mut AccessControl, amount: u64, ctx: &TxContext) {
        let caller = ctx.sender();
        
        // If owner is calling, always authorized
        if (caller == ac.owner) { return };
        
        // Check if caller is the authorized session key
        assert!(caller == ac.session_key, EInvalidSession);
        
        // Check limits
        assert!(ac.spent_so_far + amount <= ac.active_limit, EExceedsLimit);
        
        // Update consumption
        ac.spent_so_far = ac.spent_so_far + amount;
    }

    // --- Accessors ---

    public fun session_key(ac: &AccessControl): address { ac.session_key }
    public fun owner(ac: &AccessControl): address { ac.owner }
    public fun spent_so_far(ac: &AccessControl): u64 { ac.spent_so_far }
    public fun limit(ac: &AccessControl): u64 { ac.active_limit }
}
