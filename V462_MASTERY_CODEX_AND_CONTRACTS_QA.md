# Dominion v4.6.2 — Full 60-Card Mastery Codex & Career Contracts

**Scope:** This is the next long-term progression milestone after the public v4.6.1 three-route Rift Gauntlet. It does not add cards or alter multiplayer stats.

## The complete Mastery Codex is now visible

Previously, Forge showed only six previously used cards, concealing mastery on the other 54. The same Forge now has **PROGRESS**, **ALL 60**, and **GOLD** filters, clearly counted at the top, and renders the actual `masteryStatus()` for the entire 60-card collection. Each row shows Bronze/Silver/Gold rank, actual recorded participation count, progress to next tier and how many one-time rewards have been claimed. An unused collection remains accessible under **ALL 60**. The entire collection and six career contracts are readable on 320px mobile layouts.

## Six persistent career contracts

Only completed, legitimate **solo wins** can claim an eligible one-time contract. Progress can exist before release or be earned on a loss, but the gold is only issued on the next qualifying victory. Every one-time claim is persisted as an independent ID in the existing v21 profile.

| Contract | Requirement | One-time gold |
| --- | --- | ---: |
| Broad Foundations | 5 different cards reach Bronze mastery (4 participations) | 50 |
| Specialist Corps | 3 different cards reach Silver mastery (12 participations) | 90 |
| Twin Legends | 2 different cards reach Gold mastery (30 participations) | 150 |
| Versatile Victory | Use 8 distinct cards during a single winning solo match | 75 |
| Rift Explorer | Complete 2 distinct Rift Gauntlet paths | 90 |
| Master of the Rift | Complete all 3 distinct Rift Gauntlet paths | 160 |

The combined account-wide maximum additional contract payout is **615 gold**, earned over numerous solo matches and varied runs. Gold is already an existing upgrade economy; contracts provide **no special PvP stats, attacks, shields, or win bonuses**, and do not change single-card Bronze/Silver/Gold rewards.

## Data compatibility

Added `profile.masteryContracts` and `profile.masteryVersatilityBest` to the existing `aether-dominion-profile-v21` format, without renaming/resetting keys, modifying `aether-dominion-v04` match snapshots, or changing the three `aether-dominion-loadouts-v452` slots and `aether-dominion-deck-v20` current deck. Old mastery counts and previous path clear records qualify toward new contracts. Existing `profile.claimed[matchId]` and new per-contract claimed flags prevent repeating earned bonuses when results are re-rendered or the same save is restored.

## QA evidence

- [Game mechanics and legacy regressions](https://github.com/hdog960/aether-tactics-dominion/actions/workflows/v462-rules-qa.yml): 17 new real-engine tests for eligible wins, loss behavior, repeat claims, 8-unique-card threshold, multiple Rift routes, old v21 profile persistence, unchanged online rules, entire 60-card mastery data; plus all previous v4.5.3–v4.6.1 systems, campaign bosses and choices, and 180 simulated normal battles.
- [Mobile Chromium QA](https://github.com/hdog960/aether-tactics-dominion/actions/workflows/v462-browser-qa.yml): actual Forge at 390px and 320px, 60 rows, progress/Gold filter behavior, all six contract cards, saved history through page reload, no JS exceptions, as well as existing Gauntlet path selection and mechanics.
- The new release guard checks both HTML entrypoints, the exact engine/QA source sync, original 60 cards, immutable storage keys, and offline PWA asset versions.

The browser emulator is not a physical iPhone Safari performance test. Actual two-device WebRTC duels also remain unverified and belong to v4.7.

## Boundary

Continue further v4.6 progression and replayability balancing after this milestone. Then v4.7 multiplayer reliability. **Stop after v4.7** for the creator to review the roadmap; do not begin a new major post-v4.7 feature plan without new direction.
