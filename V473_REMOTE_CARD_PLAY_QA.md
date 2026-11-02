# Dominion v4.7.3 — Real Remote Card Play and Reconnect Acceptance

## Purpose
Previous remote WebRTC tests established pairing, host/guest turn exchange, saved deck handshakes, and guest rejoining the original match. This milestone tests **the live illustrated battlefield input** and host-authoritative card command flow, not just END TURN actions.

## Verified cloud-host test — November 2, 2026
[GitHub Actions: independent remote host and guest](https://github.com/hdog960/aether-tactics-dominion/actions/runs/41542493716) passed **both** matrix jobs:
- Two separately hosted GitHub runners, each running a mobile-sized Chromium browser, connect using Dominion's actual Trystero 0.26.0 public Nostr signaling and encrypted WebRTC data transport.
- Each side selects its starting Vanguard card through the real hand UI, then taps an eligible tile on the **visible painted canvas** at its own mirrored screen coordinates. The game dispatches that canvas pointer event through the authoritative tile/command path.
- The host accepts the guest's actual card action and both peers report **six living battlefield units** after the two summons (four original starters plus two Vanguards).
- Five complete alternating rounds end at **round six**, with the six units staying synchronized on both peers after every round.
- The guest reloads its page and rejoins the same room after round three. The original host preserves the match; the guest catches up and both finish at round six.
- Both jobs logged `pass: true`, `cardPlayed: true`, link `linked`, and no browser errors. The guest additionally logged `rejoined: true`.

## Added release gate
The existing `.github/workflows/v472-cross-runner-smoke.yml` now includes v4.7.3 and is a **hard release gate** (not `continue-on-error`). The cross-runner script verifies real card input, that both sides retain six units, five rounds and guest reconnect, and fails a job for invalid state or a lost connection. All prior 60-card, Gauntlet, Forge, save, protocol, 320px/390px, WebKit-family, and local real-RTC tests remain in the repository.

## Important limitations
- Two independent cloud runners are not physical iPhones, and Chromium is not iOS Safari.
- This test proves the ordinary summon pathway and turn exchange, **not every spell, attack or movement mechanic**, and does not guarantee WebRTC connectivity across every carrier/NAT.
- Real-device acceptance remains documented in `V47_REAL_IPHONE_ACCEPTANCE.md`: Safari on two separate iPhones, independently routed Wi-Fi/cellular, real card actions including targeting or attacks, background/resume, network switching, final victory agreement and no saved-data damage.
- A carrier pair requiring TURN needs ephemeral credentials from a backend. Never embed permanent TURN secrets in the static GitHub Pages frontend.

## Creator-approved stop
After real-device acceptance, **stop after v4.7** for the creator's roadmap review. No automatic v5.0 or unrelated content expansion.
