# OneMind: Autonomous Intelligence Layer

> Sovereign AI Agents that live, trade, and play on OneChain — 24/7.

[![OneChain](https://img.shields.io/badge/OneChain-Move-blue)](https://onechain.com)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![OneHack 3.0](https://img.shields.io/badge/OneHack-3.0-orange)](https://onehack.io)


## The Problem

Web3 gaming and DeFi face three critical issues:

- **Ghost Towns**: Games feel empty with static, repetitive NPCs
- **High Friction**: Wallet management scares away non-crypto users  
- **Passive Assets**: NFTs sit idle in wallets, doing nothing

## The Solution

OneMind creates **Sovereign AI Agents** — autonomous entities with their own wallets that interact with OneChain's ecosystem without human intervention. These aren't chatbots; they're on-chain personalities that play games, trade on DEXs, and evolve through experience.

## How It Works

```
User → Spawns Agent → AI Brain (Off-chain) → Session Keys → On-chain Actions
                ↓
        [Agent NFT + Vault + Access Control]
                ↓
        Autonomous Trading, Gaming, Evolution
```

### The Feedback Loop

1. Agent plays a GameFi title on OneChain
2. Earns rewards (tokens/NFTs)  
3. Trades on OneDEX for better gear
4. Stakes tokens to power its "brain"
5. Repeat — creating perpetual ecosystem activity

## Architecture

OneMind uses a modular smart contract design on OneChain (Move language):

### Core Modules

| Module | Purpose | Key Features |
|--------|---------|--------------|
| **agent.move** | AI Agent NFT | XP/leveling, energy system, memory hash (IPFS) |
| **vault.move** | Sovereign Wallet | Holds OCT tokens & assets, deposit/withdraw |
| **access_control.move** | Session Keys | Spending limits, expiration, revocation |
| **brain_interface.move** | AI Gateway | Execute trades, sync memory, rest |
| **registry.move** | Global Directory | Track all agents, ownership mapping |
| **main.move** | Entry Point | Spawn agents with full stack |

### Key Innovations

**Session Keys**: AI brains get temporary permissions with spending limits — no seed phrase exposure

**Energy System**: Actions consume energy, preventing spam and adding game mechanics

**Memory Sync**: Off-chain AI state (LLM memory) synced to on-chain via IPFS hash

**Dynamic Progression**: Agents gain XP, level up, and emit events for indexers

## Quick Start

### Prerequisites

```bash
# Install Rust & Cargo
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install OneChain CLI
cargo install --locked --git https://github.com/one-chain-labs/onechain.git one
```

### Build & Test

```bash
# Navigate to contracts
cd contracts

# Build the Move package
one move build

# Run tests
one move test

# Deploy to testnet
one client publish --gas-budget 100000000
```

### Spawn Your First Agent

```move
// Call the spawn_agent function
one client call --package <PACKAGE_ID> \
  --module main \
  --function spawn_agent \
  --args <REGISTRY_ID> "AgentAlpha" \
  --gas-budget 10000000
```

## Smart Contract Flow

### 1. Spawn Agent
```move
public entry fun spawn_agent(
    registry: &mut GlobalRegistry,
    name: String,
    ctx: &mut TxContext
)
```
Creates Agent NFT, Vault, and AccessControl in one transaction.

### 2. Grant Session Key
```move
public fun grant_session(
    ac: &mut AccessControl,
    session_key: address,
    duration: u64,
    limit: u64,
    ctx: &mut TxContext
)
```
Give your AI brain temporary permissions with spending caps.

### 3. Execute Actions
```move
public fun execute_withdrawal(
    agent: &mut Agent,
    vault: &mut Vault,
    ac: &mut AccessControl,
    amount: u64,
    recipient: address,
    ctx: &mut TxContext
)
```
AI brain autonomously moves funds within authorized limits.

## Use Cases

### GameFi Population
Deploy agents to play OnePlay games 24/7, creating vibrant ecosystems

### Automated Trading
Agents monitor OneDEX for arbitrage opportunities and execute trades

### Social Presence
AI personalities interact in forums, creating authentic community engagement

### Delegated Gaming
Users "hire" agents to grind games while they sleep — Play-to-Earn 2.0

## Ecosystem Integration

OneMind deeply integrates with OneChain's infrastructure:

- **OneWallet**: Seamless agent wallet creation via OneID
- **OneDEX**: Autonomous trading and liquidity provision
- **OnePlay**: 24/7 game population with intelligent NPCs
- **OnePredict**: AI-driven prediction market participation

## Technical Advantages

**Move Language Safety**: Resource-oriented programming prevents asset loss

**Session Key Pattern**: Industry-leading approach for autonomous operations (2026 standard)

**Event-Driven**: All actions emit events for easy indexing and UI updates

**Modular Design**: Clean separation allows independent upgrades

## Roadmap

- [x] Core smart contracts
- [x] Session key authorization
- [x] Agent progression system
- [ ] Off-chain AI brain (LLM integration)
- [ ] Frontend dashboard
- [ ] OneDEX integration
- [ ] OnePlay game adapters
- [ ] Multi-agent coordination

## Why OneMind Wins

This isn't just a hackathon project — it's OneChain's killer app:

1. **Solves Real Problems**: Turns ghost towns into thriving ecosystems
2. **Deep Integration**: Uses OneWallet, OneDEX, and OnePlay in one loop
3. **Technical Proof**: Demonstrates Move's superiority for AI + blockchain
4. **Ecosystem Growth**: Drives transaction volume and active users
5. **Grant-Worthy**: Foundation for a flagship OneChain unicorn

## Project Structure

```
onemind/
├── contracts/
│   ├── sources/
│   │   ├── main.move              # Entry point
│   │   ├── agent.move             # Agent NFT logic
│   │   ├── vault.move             # Sovereign wallet
│   │   ├── access_control.move    # Session keys
│   │   ├── brain_interface.move   # AI gateway
│   │   └── registry.move          # Global directory
│   ├── tests/
│   │   └── onemind_tests.move     # Test suite
│   └── Move.toml                  # Package config
├── docs.md                        # OneChain developer guide
├── idea.md                        # Hackathon strategy
└── idea-detailed.md               # Technical deep dive
```

## Contributing

We're building the future of autonomous on-chain intelligence. Contributions welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing`)
5. Open a Pull Request

## Security

Session keys have built-in safety mechanisms:
- Spending limits per session
- Expiration timestamps
- Owner revocation anytime
- Energy costs prevent spam

For security concerns, please open an issue or contact the team.

## License

MIT License - see [LICENSE](LICENSE) for details

## Acknowledgments

Built for **OneHack 3.0** on OneChain — proving that Move + AI = the future of Web3.

Special thanks to the OneChain Labs team for creating the infrastructure that makes autonomous agents possible.

---

**Ready to spawn your first autonomous agent?** 

```bash
git clone https://github.com/yourusername/onemind.git
cd onemind/contracts
one move build
```

Let's make Web3 feel alive. 🤖⚡
