# Aether Tactics: Dominion v4.5.5 — Four Painted Tactical Spells

**Release target: 48 cards total (44 → 48)**, with four new original painted spells and four distinct battlefield effects, built and tested through GitHub.

## New original cards

| ID | Name | Cost | Genuine match effect |
|---|---|---:|---|
| U | **Mirror Breach** | 2 | Choose a shielded enemy creature within 3 tiles of your army; strip up to **2** shield, then deal **1** ordinary spell damage (respects remaining shield and damage mitigation). No Core targeting. |
| V | **Gale Step** | 2 | Choose an **empty legal adjacent destination** with **exactly one** eligible unrooted friendly creature next to it. Move that creature precisely one tile, without refreshing movement or attack; landing on hostile snares triggers them. Ambiguous multi-unit destinations, rocks, occupied tiles, Cores and rooted movement are invalid. |
| W | **Ember Covenant** | 3 | Voluntarily sacrifice a friendly non-champion creature with surviving teammates in 2-tile range; grant **2** shield and one-use Rally to up to **two** nearest allied creatures. Voluntary sacrifice uses the normal sacrificial triggers but does not count as defeat or activate Gravebloom death effects. |
| X | **Crescent Refrain** | 3 | Choose an already burning or rooted enemy creature within 3 tiles of your army; deal **2** ordinary spell damage. If another enemy creature is within 2 tiles, chain **1** more spell damage to the nearest. Never targets the opposing Core or creates a status effect itself. |

No existing card names, statistics, deck length, reward tables, profile progression, campaign milestones, battle saves or multiplayer messages were replaced.

## Original painterly card art and battlefield effects

Four artistically distinct original fantasy scenes were generated and archived as `art/sources/v455-original-spells.png`; a reproducible builder in `tools/v455_build_spell_art.py` crops them into `art/cards-spells-v455.webp` (exact **512×96**, four 128×96 cards U/V/W/X). `art/v455-spell-manifest.json` describes the art identity and version.

The independent `v455-spell-art.js` adapter enforces exact atlas dimensions, distinct pixel signatures and meaningful nonflat color. Missing artwork never falls back to a reused older illustration or geometric icon. The actual `v45-scene.js` battlefield VFX now includes different shattering mirror, travelling wind, sacrificial ember and lunar-chaining effects; the isolated QA scene is synchronized.

## Regression and usability

- [Actual-game GitHub rules regression](https://github.com/hdog960/aether-tactics-dominion/actions/runs/41365287976) — **15/15** new spell checks (including a uniquely addressed Gale passenger), **12/12** prior spell rules, **13/13** first-batch and **14/14** second-batch creature rules, **8/8** saved deck-vault cases, **7/7** boss cases, **30/30** mission-plan choices, and **120** objective-driven battles with no invalid states.
- [390px isolated real-Chromium browser validation](https://github.com/hdog960/aether-tactics-dominion/actions/runs/41365293534) — four complete, unique painted card crops; 15/15 laws and prior checks; 60 mixed-deck actual-engine battles without errors; no JavaScript exceptions; old public entrypoint still correctly exposed 44 cards while new spells remained gated.
- **48-card production release candidate**: validated in staging by the `v455-browser-qa.yml` GitHub Actions workflow, confirming the normal `index.html` collection (not only QA) has exactly **48** named cards, all four new paintings are loaded, selected deck still contains **24** cards and the three persistent custom deck slots remain available.
- In one 60-battle mixed strategic QA sample, the test bot used **Ember Covenant 30**, **Gale Step 17**, **Mirror Breach 23** and **Crescent Refrain 5** times; the conditional last card requires a real burn or root. It won **25** of the 60 games; that sample cannot establish a human win rate or eliminate all balance issues.
- The 4.5.5 real-world physical iPhone Safari touch/thermal/memory behavior and distant two-device WebRTC remain unverified by desktop Chromium with a 390px mobile viewport.

## Safe public rollout

The original release gate `DOMINION_V455_ART_RELEASE` was false in the standard game until the artwork and QA passed; it is explicitly enabled in `index.html` and `v30.html` for the release candidate. The service worker `aether-dominion-v455-four-painted-spells-20261101` includes the original newly validated atlas and JS sources. Existing profile, card rank, local player match and named deck slot keys remain unchanged:
- `aether-dominion-profile-v21`
- `aether-dominion-deck-v20`
- `aether-dominion-loadouts-v452`
- `aether-dominion-v04`

## Development direction

Proceed toward **60 collectible cards** with v4.5.6–4.5.8, then complete v4.6 progression/replayability and v4.7 multiplayer reliability. The creator explicitly requires development to **STOP after v4.7** for the next roadmap decision. No v5.0 work without that input.
