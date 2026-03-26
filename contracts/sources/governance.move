module onemind::governance {
    use std::string::String;
    use one::table::{Self, Table};
    use one::event;
    use one::clock::{Self, Clock};

    // --- Errors ---
    const EPROPOSAL_NOT_FOUND: u64 = 0;
    const EVOTING_CLOSED: u64 = 1;

    // --- Structs ---

    public struct Proposal has store {
        id: u64,
        creator: address,
        title: String,
        description: String,
        votes_for: u64,
        votes_against: u64,
        status: u8, // 0: Voting, 1: Passed, 2: Rejected
        end_time: u64,
    }

    public struct GovernanceHub has key {
        id: UID,
        proposals: Table<u64, Proposal>,
        next_id: u64,
    }

    // --- Events ---

    public struct ProposalCreated has copy, drop {
        proposal_id: u64,
        creator: address,
        title: String,
    }

    public struct VoteCast has copy, drop {
        proposal_id: u64,
        voter: address,
        weight: u64,
        support: bool,
    }

    // --- Public Functions ---

    fun init(ctx: &mut TxContext) {
        let hub = GovernanceHub {
            id: object::new(ctx),
            proposals: table::new(ctx),
            next_id: 1,
        };
        one::transfer::share_object(hub);
    }

    public fun submit_proposal(
        hub: &mut GovernanceHub,
        title: String,
        description: String,
        duration: u64,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        let id = hub.next_id;
        hub.next_id = hub.next_id + 1;

        let end_time = clock::timestamp_ms(clock) + duration;
        let creator = ctx.sender();

        let proposal = Proposal {
            id,
            creator,
            title: title,
            description,
            votes_for: 0,
            votes_against: 0,
            status: 0,
            end_time,
        };

        table::add(&mut hub.proposals, id, proposal);

        event::emit(ProposalCreated {
            proposal_id: id,
            creator,
            title,
        });
    }

    public fun cast_vote(
        hub: &mut GovernanceHub,
        proposal_id: u64,
        weight: u64,
        support: bool,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        assert!(table::contains(&hub.proposals, proposal_id), EPROPOSAL_NOT_FOUND);
        
        let proposal = table::borrow_mut(&mut hub.proposals, proposal_id);
        assert!(clock::timestamp_ms(clock) < proposal.end_time, EVOTING_CLOSED);

        if (support) {
            proposal.votes_for = proposal.votes_for + weight;
        } else {
            proposal.votes_against = proposal.votes_against + weight;
        };

        event::emit(VoteCast {
            proposal_id,
            voter: ctx.sender(),
            weight,
            support,
        });
    }

    // --- Accessors ---
    
    public fun next_proposal_id(hub: &GovernanceHub): u64 { hub.next_id }
}
