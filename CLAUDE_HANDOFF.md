# CLAUDE HANDOFF — Aether Tactics: Dominion

**Handoff date:** November 6, 2026  
**Repository:** https://github.com/hdog960/aether-tactics-dominion  
**Playable GitHub Pages:** https://hdog960.github.io/aether-tactics-dominion/  
**Canonical branch:** `main`  
**Most recent gameplay source milestone:** v4.7.2  
**Latest multiplayer QA milestone:** v4.7.3 (real remote card-play regression gate)  
**State of project:** Main game and all v4.6 progression systems implemented; v4.7 multiplayer improved and extensively automated-tested, but **physical two-iPhone cross-network Safari acceptance is still outstanding**.

## Read this before changing anything

This is a **complete game repository**, not a prototype proposal. Treat existing authored artwork, functional campaign, player progression, screens, and saves as assets to preserve. The user has repeatedly rejected blocky/geometric placeholder art, mismatched sprite styles, or unsolicited aesthetic changes. Do **not** replace the existing fantasy-pixel painting aesthetic, redraw cards as simple polygons, or destroy working design or progress while fixing bugs.

**Creator's locked instruction:** finish v4.7 reliability, then **STOP and request the creator's roadmap decision**. Do not begin v5.0, monetization, matchmaking/rankings, unrelated feature growth, or new card waves without authorization. The creator expects implemented and tested updates, not only plans. Any changes should be committed to the repository, checked, and deployed before being described as done.

## What exists today

### Game and content
- iPhone-first, free, landscape-like 55° angled/isometric tactical fantasy collectible-card battler playable from Safari or as an Add to Home Screen PWA.
- **60 authored cards** (creatures, spells, and transformations/roles with their own effects), individual fantasy artworks, matching character identities in battle, and newer cards with 22-frame pose atlases. Protect the exact artwork pipeline.
- Eight selectable 24-card preset decks, plus **three named custom 24-card Armory loadout slots**; existing upgrade ranks, collection economy, card progression and deck legality.
- Turn-based tactical grid with Aeth economy, summon/move/attack/spell actions, terrain/elevation, LOS/cover, spring control, hazards, sacrifice, buffs, status effects, traps and multiple enemy AI behaviors.
- Four illustrated world regions, **12 sequential story missions**, and **three Crown Trials**. Mission briefing, deck-specific counsel, persistent progression, authored bosses and encounter conditions.
- Bottom navigation/Commander's Hall, World Map, Grimoire/card collection, Forge/upgrade UI, Duel Chamber, unit and card reference, and options. Existing Forge scroll and layout fixes must not regress.

### v4.6 replayability — shipped
- Three-stage **Rift Gauntlet**, with a locked 24-card deck for the run, persistent stage recovery, no repeat-farm first-clear rewards, and actual frost/arcane encounter hazards.
- Three **Rift Paths**: Wayfinder, Stormbound and Ironbound, with route-specific opening Core/repair/enemy-pressure mechanics.
- **Rift Flux** optional rotating omen selection; Classic stays default and older saves keep their old semantics.
- Full 60-card Mastery Codex, Bronze/Silver/Gold progression and six finite career contracts, plus the v4.6.4 bounded **Rift Chronicle** (recent attempts, outcomes, best surviving Core per path and Flux variant).
- One-time rewards must remain **one-time** and competitive duels must not inherit solo player upgrade advantages.

### v4.7 private-duel reliability — implemented, conditional acceptance
- Public room-code WebRTC private duel using `trystero@0.26.0` loaded dynamically from `https://esm.run/trystero@0.26.0`. Host-authoritative combat. One friend/peer per room.
- Guest intent envelopes carry action sequence `seq`, host revision `rev` and command `cmd`; host checks peer, shape, size, turn and revision.
- Snapshot responses include `ackSeq` to distinguish a specific accepted/rejected action from unrelated state updates. Lost ACKs trigger **bounded retries of the exact original sequence**, never a new command that could apply twice.
- Read-only, rate-limited resynchronization requests and the small **SYNC DUEL** control. Safari foreground recovery requests a host snapshot.
- Peer disconnect pauses the game and rejoin restores the original match state; late callbacks from abandoned rooms must not corrupt the current match.
- Host-ready snapshots and **bounded retries of the original guest 24-card deck** resolve first-join handshake races. A duplicate deck cannot reshuffle an already-started duel.
- Latest QA v4.7.3: two independent GitHub-runner computers used **live public Trystero/Nostr signaling and WebRTC**; both selected a Vanguard from their actual hand and summoned it via the **painted canvas**, completed five full rounds with six consistent units, and the guest reloaded/rejoined after round three. Both jobs passed. This is genuine remote-browser evidence, **not proof of actual iPhone Safari/cellular compatibility**.
- Actual production accounts, ranked matchmaking, external save sync, dedicated authoritative server, TURN credentials, and anti-cheat server **do not exist**. Never describe them as implemented.

## Critical source-of-truth files

| Purpose | File(s) |
|---|---|
| Production entry | `index.html` and alternate `v30.html` |
| Combat/gameplay/progression/multiplayer UI | `v45-engine.js` |
| QA copy of game engine | `v45-qa-engine.js` — **keep byte-identical to production** |
| Painted battlefield scene, touch-to-tile mapping | `v45-scene.js`, `v45-qa-scene.js` — **keep byte-identical** |
| Browser-to-peer transport | `v30-net.js` |
| Story/regions | `v30-campaign-data.js` |
| Bottom navigation and World Map | `v30-shell.js`, related CSS |
| Gauntlet, path and Flux presentation | `v46-gauntlet.js`, `v46-gauntlet.css`, `v461-rift-paths.css`, `v462-masteries.css`, `v463-flux.css`, `v464-chronicle.css` |
| Duel connected/pending/disconnected/status UI | `v470-duel.css`, `v471-ack.css` |
| Painted visual assets and character atlases | `art/` and `art/sources/`, plus source art generators/adapters |
| Offline/Homescreen | `sw.js` (versioned cache), `manifest.webmanifest` |
| Main development history | `README.md`, `DOMINION_ROADMAP.md`, all `V*_*.md` and audit documents |
| CI release gates | `.github/workflows/`, `tools/` |

**Do not indiscriminately edit older v3/v4 historical engines**; many are intentionally retained. The current runtime is selected by the production HTML. Inspect versioned HTML assets and service-worker references before modifying files.

## Player data — preserve these exactly

- `aether-dominion-profile-v21` — commander progression, collection, Gauntlet, Mastery, Chronicle
- `aether-dominion-v04` — match snapshot version 4
- `aether-dominion-deck-v20` — canonical currently chosen deck
- `aether-dominion-loadouts-v452` — named Armory deck slots

Do not rename, purge, reinitialize or migrate these keys without a demonstrated backward-compatible test. This archive contains code and public assets, **not the user's private browser saves**. Local PWA data remains on the original iPhone and must not be assumed portable or cloud-synced.

## Mandatory reading order for Claude

1. **This file**, then `README.md` and `DOMINION_ROADMAP.md`.
2. **`V47_REAL_IPHONE_ACCEPTANCE.md`** — the exact remaining acceptance checklist and how to log actual phone/network results.
3. `V473_REMOTE_CARD_PLAY_QA.md`, `V472_PEER_HANDSHAKE_AND_RTC_QA.md`, `V471_LOST_ACK_RECOVERY_QA.md`, `V470_PRIVATE_DUEL_RELIABILITY.md` — current network design and evidence.
4. `V464_CHRONICLE_RELEASE_AND_QA.md`, `V463_RIFT_FLUX_RELEASE_AND_QA.md`, `V462_MASTERY_CODEX_AND_CONTRACTS_QA.md`, `V461_RIFT_PATHS_RELEASE_AND_QA.md`, `V460_GAUNTLET_AND_MASTERY_QA.md` — saved solo systems.
5. Earlier `V45*`, `V4*`, `V3*` and art design documents if the task affects them.
6. Examine actual engine/render/transport source and all corresponding existing regression tests before making a patch.

## Testing before changing or shipping

Development uses a **static HTML/CSS/JavaScript repository** and Node-based `.mjs` QA scripts; many browser QA suites use Playwright/Chromium/WebKit. Examples (the commands shown are present in the tracked source, and may require installing Playwright on a development machine):

```bash
node tools/v464_rules_qa.mjs
node tools/v470_network_qa.mjs
node tools/v471_network_qa.mjs
node tools/v472_release_guard.mjs
node tools/v471_release_guard.mjs
node tools/v470_release_guard.mjs
node tools/v464_release_guard.mjs
cmp v45-engine.js v45-qa-engine.js
cmp v45-scene.js v45-qa-scene.js
```

For browser and actual WebRTC QA, read `.github/workflows/v472-rtc-qa.yml`, `.github/workflows/v472-cross-runner-smoke.yml`, and other active workflow YAML files. Tests in `tools/v472_rtc_browser_qa.mjs`, `tools/v472_handshake_browser_qa.mjs`, and `tools/v472_cross_runner_smoke.mjs` are valuable and should not be weakened to force green CI. Physical iPhone Safari is **not** adequately simulated by Chromium/WebKit on Linux.

Every patch should:
1. Retain all 60 cards, existing art, story, upgrades and accessibility improvements.
2. Update `v45-engine.js` and `v45-qa-engine.js` together; likewise for the scene mirrors when changed.
3. Run targeted new tests plus all older relevant regressions. Avoid changes that reward duplicate actions, permit foreign peer actions, corrupt saves, or start two battles simultaneously.
4. Update any cache-busted references in both HTML entrypoints and service worker for changed assets.
5. Create a tested, reviewable commit or PR and let GitHub Pages deploy from `main`; do not claim deployment before merged.
6. Document precisely what was and was not tested.

## Final acceptance work — the only locked roadmap blocker

The last gate for full v4.7 is a **real, documented iPhone Safari duel between two physical phones on distinct Wi-Fi/cellular networks**. Follow `V47_REAL_IPHONE_ACCEPTANCE.md`: pairing; both decks; five or more alternating rounds; genuine card actions and target choices; duplicate tap behavior; Safari foreground; network switch/reconnect on both sides; actual match completion; consistent outcome; no lost saves. Record observable results; never invent a pass. A restrictive NAT may require managed TURN with **ephemeral credentials** and a new backend; do not add static secrets to GitHub Pages.

**If real-device acceptance is not possible from the available tools, clearly state that it remains pending; never silently declare v4.7 done.**

## Creator preferences and scope boundaries

- Visual reference is the established richly illustrated fantasy/pixel style and isometric board. **Never regress to blocky/geometric placeholder models, missing transparency, mismatched paintings, or broken visuals.**
- Performance and readability are essential on iPhone Safari, including no page scrolling over battle controls, clear taps/telegraphs, reliable Forge scrolling, and durable offline caching.
- Keep gameplay difficult but balanced for actual progression; use realistic deck-rank variation rather than assuming every card has the same upgrade level.
- Always distinguish confirmed code changes, automated QA, live remote-browser tests, and tests requiring physical devices.
- Owner wants to make the next roadmap decision personally. **After full v4.7: STOP.**

## Packaging notes

This transfer should include the **entire tracked repository** (all source, painted `art/` media, assets, HTML/CSS/JS, documents, `tools/`, `.github/workflows/`, manifest/icons and historic scripts), not only one HTML file. A generated `TRANSFER_MANIFEST.json` in the release ZIP lists SHA-256 checksums for each included file and identifies its Git commit. Git history itself (`.git/`) is **not** included inside the source ZIP; the full history stays at the repository URL above.

To start the playable game in a local development environment, serve the repository root via HTTP (rather than opening an HTML file using `file://`), for example:

```bash
python3 -m http.server 8000
# open http://localhost:8000/
```

When Claude takes over, it should first acknowledge the architecture, locked scope and outstanding iPhone test, then continue only when directed by the creator.
