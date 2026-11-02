# Aether Tactics: Dominion — v4.7.0 Private Duel Reliability

## What actually changed
This is a first multiplayer reliability release candidate, **not** proof of successful real long-distance iPhone-to-iPhone WebRTC. The existing free room-code based private duel remains experimental and host-authoritative.

1. Guest orders now send `{seq, rev, cmd}` (bounded JSON envelope). The `seq` is strictly increasing per connection; the host rejects replays and other senders. The `rev` is the exact host snapshot revision on which the guest based its order.
2. Host applies a guest move only when the match is playing, it is the guest's turn, and the provided `rev` matches its own current authoritative revision. **Every received valid-shape order gets a host-state response even if rejected.** This prevents a waiting guest from remaining stuck after an illegal or obsolete order.
3. Guest orders lock until that authoritative state acknowledgment arrives. Duplicate taps, disconnected peer commands and multiple unacknowledged orders are blocked. The host resolves all combat consequences; no card powers, collection levels or damage rules were modified.
4. A duel handshake locks the guest's 24-card deck once accepted. A reconnect never reshuffles or replaces a live opponent deck, including first-round reconnects that previously looked like unstarted games.
5. Both host and guest pause on peer disconnect. The host restores the original snapshot to the rejoining peer; a terminal victory remains terminal. Delayed callbacks from older rooms are discarded through a session epoch.
6. An illustrated, touch-safe connection ribbon distinguishes unavailable links, unacknowledged orders and an active private link. The existing Duel Chamber explains the host-authoritative experimental limits.
7. Net messages are checked for sender identity, revision, sequence, payload shape and size. The existing pinned Trystero 0.26.0 action API and public signaling model are preserved. These protections are useful protocol hygiene, **not** production anti-cheat or authenticated accounts.

## Preserve existing game
- The 60 illustrated cards, 24-card decks, story, 3 Rift paths, Flux omens, masteries, and progression are unchanged.
- `aether-dominion-profile-v21`, `aether-dominion-v04`, `aether-dominion-deck-v20`, `aether-dominion-loadouts-v452` remain identical.
- Both production HTML entrypoints and offline PWA cache are versioned `v470`. `v45-engine.js` and its isolated `v45-qa-engine.js` remain byte-identical.

## Independent CI verified on November 2, 2026

Four green GitHub Actions runs provide automated evidence:
- [Two-peer sequence/revision/abuse tests, old 60-card game regressions and strict v4.7 guard](https://github.com/hdog960/aether-tactics-dominion/actions/runs/41534961153) — passed.
- [Real mobile-sized 390px host and 320px guest Chromium UI and reconnect smoke tests](https://github.com/hdog960/aether-tactics-dominion/actions/runs/41534961145) — passed.
- [Earlier Gauntlet/Chronicle release guard and full mechanics suite](https://github.com/hdog960/aether-tactics-dominion/actions/runs/41534961135) — passed.
- [Earlier Chronicle 390px/320px browser regression](https://github.com/hdog960/aether-tactics-dominion/actions/runs/41534961228) — passed.

This is automated testing with mock peers and Chromium. **No actual two-phone different-network duel is claimed or verified.**

## Verification plan and what we cannot claim
- `tools/v470_network_qa.mjs` simulates two independent peers, fake relay delivery, a third unwanted sender, duplicate/out-of-order packets, bad revisions, oversized snapshots, disconnects and reconnects.
- `tools/v470_browser_qa.mjs` uses actual 390px/320px Chromium to exercise host deck handshake, valid guest moves, stale rejection, reconnect preservation, guest awaiting-host UI, same-revision rejection/ACK and disconnection locks.
- `tools/v464_rules_qa.mjs` covers the current 60-card PvE, Rift Flux, Forge contracts, seven bosses, thirty story plans and 180 simulated battles.
- `tools/v470_release_guard.mjs` verifies save compatibility, asset cache, versioned entrypoints and no loss of the agreed creator stop.

**Still outstanding:** Independent real-device iPhone Safari checks; remote iPhone-to-iPhone duel on different networks (ideally one Wi-Fi, one cellular), multi-turn repeated reconnects; WebRTC NAT/TURN failure matrix; human balance. Trystero's public relays are not a managed uptime SLA. If direct peer connections routinely fail on restricted cellular networks, a TURN service/hosted signaling plan requires separate creator approval and infrastructure. These should be evaluated before completing v4.7.

## Boundary
v4.7.0 is **a partial v4.7 milestone**, not the final v4.7 reliability acceptance. Do not mark multiplayer finished or move to v5.0 without verified real two-device testing and creator review. **STOP after v4.7** as previously agreed.
