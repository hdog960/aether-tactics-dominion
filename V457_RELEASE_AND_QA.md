# Dominion v4.5.7 — The Four Painted Tactical Spells

**Release:** Dominion expands from 52 to 56 cards. The original 24-card deck size, three named saved Armory slots, prior 52 card identities, v4 match saves, commander upgrades and campaign progress remain intact.

## New cards

| ID | Name | Aeth | Real engine behavior | Intended playstyle |
| --- | --- | ---: | --- | --- |
| `ac` | **Gravemire Ring** | 3 | Select a nonchampion enemy within 3 of your army. Root up to two unrooted nonchampion enemies within one tile of it, nearest first. No damage, no Cores. | Formation control; interrupt mobile enemies without raw damage. |
| `ad` | **Prism Relay** | 2 | Transfer exactly 2 existing shields from a friendly creature with at least 2 shields to the least-shielded eligible separate ally within 2 tiles, respecting 5-shield capacity. If recipient already moved and is not rooted, refresh its **movement only**, once per recipient per round. | Redistribute defenses to a spring runner, guardian or threatened frontliner and create bounded mobility tempo. |
| `ae` | **Cinder Bloom** | 3 | Ignite one unburned nonchampion foe within 3 of your army and at most one other nearby unburned eligible foe within 2 of the first, nearest first. No immediate damage; existing burns never stack. | Multi-target fire setup and Cinderjaw Prowler combo; cleanse counterplay. |
| `af` | **Tidal Reprieve** | 3 | Heal up to 2 HP on a chosen wounded ally, then 1 HP each on up to two most injured other allies within 2 tiles. No overheal or action refresh. | Squad sustain, distinctly different from Aeth Renewal's single-target heal and action refresh. |

All effects are resolved by the authoritative actual combat engine, shared by AI, solo matches and online-host adjudication. Targeting fails harmlessly with no Aeth or card spent if it does not satisfy the rule. These spells do not damage opposing Cores or bypass champions. The AI has bounded target selection for all four spells.

## Artwork and battlefield signatures

- Four **original** detailed fantasy scene paintings in a single 2048×2048 2×2 source: `art/sources/v457-original-spells.png`, SHA-256 `ec51b9153db75ed71c584744d3dafdbb40c2ff4f23dc25a5b08ea7fc2aca0637`.
- `tools/v457_build_spell_art.py` slices the four non-overlapping source quadrants into `art/cards-spells-v457.webp`, four distinct 128×96 illustrations in a 512×96 strip. The source SHA and dimensions are recorded in `art/v457-spell-manifest.json`; there are no recycled card scenes or generated vector placeholders.
- `v457-spell-art.js` maps `ac/ad/ae/af` to four unique card portraits. It uses strict dimension, visual variation and duplication checks.
- On the **actual** tactical canvas, Gravemire produces purple gravity rings, Prism Relay produces faceted aquamarine shielding light, Cinder Bloom generates fiery flower petals, and Tidal Reprieve draws pale restorative water crests. Those are gameplay-bound FX rather than static card portraits projected onto battle tiles.

## Verification and stability

- [Real combat and existing-feature CI](https://github.com/hdog960/aether-tactics-dominion/actions/runs/41455710825) — **16/16 new rules** including twice-per-round Relay prevention, target ownership, no-resource-spend failure, no extra attacks, squad healing, burn limits, boss protection and v4 save/reload; all earlier spell, creature, deck-vault, boss and mission-plan regressions passed.
- **180 simulated battles** (60 baseline, 60 existing mixed and 60 new spell mixed decks) completed with zero invalid action errors. The new-spell test deck won 23/60 versus 38/60 baseline; those simulations use specific deck compositions and AI, not calibrated competitive win rates.
- [Complete painted 56-card browser QA](https://github.com/hdog960/aether-tactics-dominion/actions/runs/41455710831) — passed in 390px and 320px mobile-emulated Chromium, including four distinct paintings, all 56 Grimoire entries in the normal release configuration, live canvas spell feedback, saving new two-letter IDs in a real 24-card Armory deck, three slot preservation and no browser JavaScript exceptions.
- [Original painted atlas build and in-browser initial testing](https://github.com/hdog960/aether-tactics-dominion/actions/runs/41454977131) — passed before the movement-tempo balance refinement; the final release run above reverified the updated mechanics and imagery.
- `tools/v457_release_guard.mjs` confirms real source art, source checksum, atlas manifest and dimensions, identical QA/production engines and scenes, proper release-gate flags on both entrypoints, and v457 PWA asset versioning.

The 56-card release adds no new localStorage schema, performs no save reset or migration, and updates the service-worker cache to include the new card atlas, art adapter and game code.

## Remaining physical-device limitations

Real iPhone Safari touch feel, extended performance on a physical phone, and actual cross-network peer-to-peer WebRTC reliability are **not verified** by the automated mobile-sized Chromium tests. Player balance feedback has not yet been gathered. Those limitations should not be represented as resolved.

## Roadmap boundary

v4.5.8 will add the remaining **four painted cards** needed for the agreed 60-card collection. Then v4.6 will expand long-term replayability, masteries and Rift Gauntlet. v4.7 focuses on reliable multiplayer. **STOP after v4.7** for the creator's roadmap review; do not begin v5.0 without explicit input.
