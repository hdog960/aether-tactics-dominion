# Dominion v4.5.6 — Four Original Painted Creatures: Release and QA

**Release:** 48 → 52 collectible cards, retaining the original 24-card deck rules and three saved custom deck slots. This is the first full painted release of Y/Z/aa/ab; source and source-derived assets are archived in GitHub.

## Four original cards — actual gameplay

| Card ID | Creature | Cost | Base HP / ATK / range / move | Authoritative distinct tactical mechanic |
| --- | --- | ---: | --- | --- |
| Y | Gloam Bellkeeper | 3 | 4 / 1 / 2 / 2 | On entering alive, weaken the nearest non-champion enemy within 2 tiles by 1 for its next basic strike; respects stronger existing hexes. |
| Z | Cinderjaw Prowler | 3 | 5 / 2 / 1 / 3 | Once per round, hitting an already-burning unit ignites the nearest other eligible enemy within 2 tiles; cannot spread burn from cores. |
| aa | Oathmoss Devourer | 4 | 7 / 2 / 1 / 1 | Heals up to 2 HP once per round after a voluntary allied sacrifice; ordinary deaths do not trigger healing. |
| ab | Tidebreak Herald | 3 | 5 / 1 / 2 / 3 | First move onto an Aeth spring per round grants 1 shield and 1 Aeth (10 cap), after hostile trap damage. |

Their four battle effects are distinguished in the actual renderer: lilac bell resonance, fiery tracer propagation, organic moss growth and cyan tidal waves. No original creature/spell card stats or campaign rules were deliberately replaced.

## Original art and game asset provenance

- **Source:** `art/sources/v456-original-characters.png` — a genuine original 2048×2048, 2×2 fantasy character painting from the connected art generator, archived under GitHub staging and then in the release.
- **SHA-256 of original painting:** `65463e737897c07d439402da5a2ddf0e350e1de1c96548b9d410fe5b8798b8ba`.
- **Characters:** Y top-left, Z top-right, aa bottom-left, ab bottom-right. All have identity-matched full-body cutouts and recognizably distinct portraits.
- **Card paintings:** `art/cards-creatures-v456.webp`, four 128×96 portraits in one 512×96 strip.
- **Transparent battlefield sprites:** `art/units-creatures-v456.png`, four 96×120 character tiles in a 384×120 strip.
- **Animated battlefield rows:** `art/battlefield-frames-v456.webp`, 22 poses per creature (88 cells), 2112×480. **These frames are algorithmic pose transformations of original painted silhouettes, not independently hand-drawn animation.**
- `art/v456-art-manifest.json` stores original-source SHA-256, dimensions and generated atlas details. `tools/v456_build_art.py` reproduces them.

## Test evidence — completed

- [Authentic artwork build and real 52-card game/art acceptance](https://github.com/hdog960/aether-tactics-dominion/actions/runs/41448168610): original source extracted; 4 distinct nonempty card/sprite images, alpha, exact frame dimensions, real canvas draw of **all four animation rows** and 52 named Grimoire cards; three screenshots captured and reviewed at 390px.
- [Full release candidate's 19 new combat laws, all prior regressions, 120 game simulations, persistent-save checks and fail-closed source integrity](https://github.com/hdog960/aether-tactics-dominion/actions/runs/41448895855): passed (0 invalid battle states in initial 120 simulation batch).
- [Real mobile Chromium 52-card staging candidate](https://github.com/hdog960/aether-tactics-dominion/actions/runs/41448889106): passed. 390px and 320px UI layouts, normal 52-card count, all four detailed card entries, 24-card deck builder and saved two-letter card keys aa/ab, and actual battlefield effect canvas with no page exceptions.
- Separate [15-case save/migration regression](https://github.com/hdog960/aether-tactics-dominion/actions/runs/41384197095): selected legacy deck, named loadout slots, stored new IDs and card levels, version-4 battle snapshot, reload/resume and safe missing-art gate all passed.

Source engine and QA engine, and source renderer and QA renderer, remain identical. The public asset release enables `DOMINION_V456_ART_RELEASE` in `index.html` and `v30.html`, and updates the PWA cache to `aether-dominion-v456-four-painted-creatures-20261102` with all three original derived assets.

## Preservation and limitations

Existing local save keys are unchanged:

- `aether-dominion-v04` (version-4 in-progress solo match)
- `aether-dominion-deck-v20` (currently equipped 24-card deck)
- `aether-dominion-loadouts-v452` (three named saved decks)
- `aether-dominion-profile-v21` (upgrades, inventory, campaign progression)

An equipped new deck affects the next new match, not the resumed battle. Player and campaign progression never reset as part of this release.

**Limitations:** Automated phone-sized Chromium testing is not actual iPhone Safari testing. Touch ergonomics, extended thermal/memory usage on physical iPhone, live cross-network two-device WebRTC, and balanced human match win rates remain unverified. Current battle-frame sprites are faithful original-image-derived motion and may merit further individually authored animation polish.

## Future roadmap and creator boundary

v4.5.7/v4.5.8 will add **eight more cards toward 60**, each requiring their own original visuals and gameplay balancing; then v4.6 progression/replayability and v4.7 multiplayer reliability. **Mandatory STOP after v4.7** for the creator's next roadmap revisions. No v5.0 without new approval.
