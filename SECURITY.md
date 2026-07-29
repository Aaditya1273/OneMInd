# Security Policy

## Supported Versions

| Version | Status |
|---|---|
| Testnet Deployment | Active — receiving patches |
| Mainnet | Not yet deployed |

---

## Reporting a Vulnerability

If you discover a security vulnerability in the OneMind Protocol — including the Move smart contracts, the Next.js API routes, or the AI execution loop — **please do not open a public GitHub issue.**

Report vulnerabilities privately via one of the following channels:

- **GitHub Security Advisories:** Use the [Private Vulnerability Reporting](https://github.com/Aaditya1273/OneMInd/security/advisories/new) feature on this repository.
- **Email:** Contact the maintainer directly through the GitHub profile linked to this repository.

Please include:
1. A clear description of the vulnerability and the affected component.
2. Steps to reproduce or a proof-of-concept.
3. The potential impact (e.g., unauthorized fund withdrawal, session key bypass, state manipulation).

We will acknowledge your report within **48 hours** and aim to deliver a patch or mitigation within **7 days** for critical issues.

---

## Security Architecture

### Smart Contract Controls

| Control | Module | Mechanism |
|---|---|---|
| Capability-based access | `access_control.move` | Session keys with explicit spend limits; owner always overrides |
| Spend limit enforcement | `access_control.move` | `spent_so_far + amount <= active_limit` asserted on every authorized call |
| Immediate session revocation | `access_control.move` | `revoke_session()` zeroes the key with no time delay |
| Withdrawal guards | `vault.move` | `assert!(vault.balance >= amount, EInsufficientBalance)` |
| Atomic initialization | `main.move` | PTB mints Agent + Vault + AccessControl atomically — no partial state |
| Typed object ownership | Move VM | Objects are owned by addresses; no ambient mutable access |
| Shared object borrowing | `registry.move`, `governance.move` | Explicit `&mut` borrows; no implicit aliasing |

### Backend / API Controls

| Control | Location | Mechanism |
|---|---|---|
| AI response sanitization | `api/brain/decide/route.ts` | Regex extraction before `JSON.parse` to prevent prompt injection bleed |
| CLI argument quoting | `api/brain/execute/route.ts` | Args wrapped in quotes before shell exec |
| Secret isolation | `.env.local` | `GEMINI_API_KEY` never exposed to the client bundle (`NEXT_PUBLIC_` prefix absent) |
| Mock fallback | `api/brain/decide/route.ts` | Graceful deterministic fallback when API key is missing |

---

## Known Limitations (MVP / Testnet)

- **Virtual vault balance:** `vault.move` tracks balance as a `u64` counter and emits events, but does not yet perform a real `one::balance::withdraw` to move coins on withdrawal. This will be addressed before any mainnet deployment.
- **Session key expiry is not clock-gated:** `expires_at` is stored but not currently checked against `Clock` in `authorize()`. A production version will enforce time-bounded sessions.
- **No double-vote protection:** `governance.move` does not yet track per-voter participation, allowing repeat votes with the same address.

These limitations are documented intentionally and are tracked in the [Roadmap](./README.md#roadmap).

---

## Scope

The following are **in scope** for vulnerability reports:

- `contracts/sources/*.move` — all Move modules
- `src/app/api/**` — Next.js API routes
- `src/lib/one-chain-service.ts` — RPC service layer
- `src/hooks/use-one-chain.ts` — client-side data hooks

The following are **out of scope**:

- Issues in third-party dependencies (report upstream)
- UI/UX bugs with no security impact
- Testnet-only issues with no mainnet attack vector
