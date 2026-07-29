module onemind::agent_logic {
    use sui::event;
    use sui::clock::Clock;
    use onemind::mock_dex;

    /// Represents the current execution state of an agent.
    public struct AgentState has key, store {
        id: UID,
        owner: address,
        current_step: u8, // 0: Idle, 1: Analyzing, 2: Swapped, 3: Playing
        last_action_timestamp: u64,
    }

    // --- Events ---

    public struct MarketAnalysisStarted has copy, drop {
        agent: address,
        timestamp: u64,
    }

    public struct DiscrepancyDetected has copy, drop {
        agent: address,
        pair: vector<u8>,
        diff: u64,
    }

    public struct GameParticipation has copy, drop {
        agent: address,
        game_id: vector<u8>,
        bet_amount: u64,
    }

    // --- Public Functions ---

    /// Initialize agent execution state.
    #[allow(lint(self_transfer))]
    public fun init_agent(ctx: &mut TxContext) {
        let state = AgentState {
            id: object::new(ctx),
            owner: ctx.sender(),
            current_step: 0,
            last_action_timestamp: 0,
        };
        sui::transfer::public_transfer(state, ctx.sender());
    }

    /// Step 1: Analyze market conditions.
    public fun analyze_market(state: &mut AgentState, clock: &Clock) {
        state.current_step = 1;
        state.last_action_timestamp = clock.timestamp_ms();

        event::emit(MarketAnalysisStarted {
            agent: state.owner,
            timestamp: state.last_action_timestamp,
        });

        // Mock detection of a 5% price gap
        event::emit(DiscrepancyDetected {
            agent: state.owner,
            pair: b"SUI/MIND",
            diff: 500, // 5.00%
        });
    }

    /// Step 2: Execute trade via mock DEX.
    public fun execute_dex_swap(state: &mut AgentState, amount: u64, ctx: &mut TxContext) {
        assert!(state.current_step == 1, 0);

        mock_dex::place_order(amount, amount * 110 / 100, ctx);

        state.current_step = 2;
    }

    /// Step 3: Enter a game with profits.
    public fun enter_game(state: &mut AgentState, bet: u64) {
        assert!(state.current_step == 2, 0);

        event::emit(GameParticipation {
            agent: state.owner,
            game_id: b"HASH-GAME-V1",
            bet_amount: bet,
        });

        state.current_step = 3;
    }

    /// Reset agent to Idle.
    public fun reset_agent(state: &mut AgentState) {
        state.current_step = 0;
    }
}
