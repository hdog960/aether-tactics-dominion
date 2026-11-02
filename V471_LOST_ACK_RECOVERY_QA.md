# Dominion v4.7.1 — Lost ACK Recovery and Safe Duel Resync

## Implementation
The host remains authoritative. This release addresses a real protocol hole in v4.7.0: a guest order could reach the host while the acknowledgment was lost. The guest then remained locked with no reliable way to distinguish an unanswered order from one already accepted.

- **Order-specific acknowledgments.** Guest orders have an integer `seq`, `rev` and combat command. The host returns `ackSeq` in snapshots after every accepted or rejected guest action. A same-revision state without the matching ACK **cannot unlock** a guest's pending order.
- **Idempotent retransmission.** A guest waiting on an action retries the **same sequence number, revision and command**, never an additional command. The network wrapper rejects outdated deliveries and calls a duplicate-ACK callback for an exact repeat of the most recently received sequence. The host replies with a snapshot without applying a duplicate action.
- **Timeout recovery.** After five seconds without confirmation, the guest attempts to resend the original action and asks for a host snapshot. This is bounded to three retries (no background retry loop indefinitely).
- **Safe state refresh.** A new, read-only `resync` transport action lets the guest request the host's latest snapshot; requests from other peers and bursts within 700 ms are rejected. The host retains and returns the last action ACK. The **SYNC DUEL** button provides manual recovery while connected.
- **Safari background recovery.** When a suspended Safari document becomes visible, it safely resends the *same* unacknowledged action if any, and requests the latest host state.
- **Visible state.** Existing connected/awaiting/disconnected ribbons remain; the small new control matches the existing Dominion dark-fantasy UI instead of adding generic panels.

## Compatibility and protection
- Player profile: `aether-dominion-profile-v21`; match snapshot: `aether-dominion-v04`; deck `aether-dominion-deck-v20`; loadouts `aether-dominion-loadouts-v452` — unchanged.
- The **60 illustrated cards**, all spells and creature art, campaign, Rift Gauntlet, masteries, Forge upgrades and equalized online stats are unaffected.
- Two production game HTML entrypoints and the offline PWA cache are re-versioned to v471. The production and QA combat engines remain identical.
- No account, matchmaking, leaderboard or server-side anti-cheat claims have been added.

## Automated QA
- `node tools/v471_network_qa.mjs`: two simulated Trystero-compatible peers with lost replies, identical command retransmission, spoofed peers, burst resync limits, bounded snapshots, duplicate ACK callbacks, disconnect and reconnect.
- `node tools/v471_browser_qa.mjs`: real 390px and 320px Chromium interfaces using a controlled fake relay. Confirms that a bare same-revision snapshot doesn't unlock the guest, manual SYNC requests the snapshot, the real timer retries the exact original command, and a matching ACK unlocks it without modifying the match.
- Prior v4.7.0 network/browser tests remain in the required CI gates with updated expected ACK contracts.
- Earlier 60-card battle/progression (180 AI simulations), 7 bosses, 30 story plans, Gauntlet and Forge release gates remain mandatory. `tools/v471_release_guard.mjs` checks new asset versions, UI, save compatibility and idempotent recovery code.

## Limits and milestone boundary
This is an **automated reliability enhancement**, not proof of successful real iPhone-to-iPhone cross-network WebRTC. Those tests must involve two actual devices on independent networks, reconnection, prolonged multi-turn play and realistic NAT constraints. WebRTC may need a TURN relay on restrictive cellular networks. Physical testing is still an acceptance gate for the **full** v4.7 milestone.

After complete v4.7 acceptance, stop for the creator's roadmap review. Do not begin v5.0 without explicit direction.
