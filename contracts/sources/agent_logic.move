module onemind::agent_logic {
    use one::event;
    use one::clock::{Clock};
    use onemind::mock_dex;

    /// Error codes
    const EInadequateFunds: u64 = 1;

    /// Represent the current 'Aha! Demo' state of an agent.
    public struct AgentState has key, store {
        id: UID,
        owner: address,
        current_step: u8, // 0: Idle, 1: Detected Discrepancy, 2: Swapped, 3: Gaming
        last_action_timestamp: u64,
    }

    /// Event emitted when the agent starts analyzing the market.
    public struct MarketAnalysisStarted has copy, drop {
        agent: address,
        timestamp: u64,
    }

    /// Event emitted when a price discrepancy is detected.
    public struct DiscrepancyDetected has copy, drop {
        agent: address,
        pair: vector<u8>,
        diff: u64,
    }

    /// Event emitted when the agent enters OnePlay.
    public struct OnePlayParticipation has copy, drop {
        agent: address,
        game_id: vector<u8>,
        bet_amount: u64,
    }

    /// Initialize the agent state.
    public fun init_agent(ctx: &mut TxContext) {
        let state = AgentState {
            id: object::new(ctx),
            owner: ctx.sender(),
            current_step: 0,
            last_action_timestamp: 0,
        };
        one::transfer::public_transfer(state, ctx.sender());
    }

    /// Step 1: Analyze Market (Triggered by frontend or cron)
    public fun analyze_market(state: &mut AgentState, clock: &Clock) {
        state.current_step = 1;
        state.last_action_timestamp = clock.timestamp_ms();
        event::emit(MarketAnalysisStarted {
            agent: state.owner,
            timestamp: state.last_action_timestamp
        });
        
        // Mock detection of a 5% price gap
        event::emit(DiscrepancyDetected {
            agent: state.owner,
            pair: b"ONE/MIND",
            diff: 500 // 5.00%
        });
    }

    /// Step 2: Execute Trade on OneDEX
    public fun execute_dex_swap(state: &mut AgentState, amount: u64, ctx: &mut TxContext) {
        assert!(state.current_step == 1, 0);
        
        // Call the mock DEX
        mock_dex::place_order(amount, amount * 110 / 100, ctx);
        
        state.current_step = 2;
    }

    /// Step 3: Enter OnePlay with profits
    public fun enter_one_play(state: &mut AgentState, bet: u64) {
        assert!(state.current_step == 2, 0);
        
        event::emit(OnePlayParticipation {
            agent: state.owner,
            game_id: b"HASH-GAME-V1",
            bet_amount: bet
        });
        
        state.current_step = 3;
    }

    /// Reset the agent to Idle.
    public fun reset_agent(state: &mut AgentState) {
        state.current_step = 0;
    }
}
