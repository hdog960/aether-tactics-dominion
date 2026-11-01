# Aether Tactics: Dominion — v4.4.7–v4.4.8 Crownfall Preparation and Balance

Date: November 1, 2026

## v4.4.7: Hollow King reinforcement fairness
- **Production:** The Hollow King encounter's scripted hunter waves every third round now *replace* ordinary tier-based reinforcements every fourth round; the two independent systems no longer stack. This only affects missions with an authored `encounter.type === 'wave'`. The King retains 28 HP, 5 starting attack, both signature boss phases, the scripted hunters, the existing 24-round timer, rewards and campaign progression.
- **QA-only:** `qaBalance(samples, missionIds, options)` can set `legacyWaves:true` on the memory-isolated QA page to reproduce the previous overlap under matched seeds. The real game never permits the override.
- **Controlled engine A/B in a mocked DOM (same 8 seeds × 2 preparation plans):** overlapping waves 1/16 test-agent wins, average 19.19 champion HP at end, 1 generic wave per match; signature-only waves 1/16 wins, average 15.38 champion HP at end, 0 generic waves. Both 16/16 matches completed with zero invalid states and zero engine errors.
- **Important:** Removing the redundant wave did **not** improve the heuristic test agent's 1/16 win count on those seeds. It reduces redundant enemy pressure, but does not prove the encounter is human-balanced.

## v4.4.8: Playable campaign deck preparation
- Added a real touch-size **EDIT DECK** button to the illustrated world-map mission briefing, immediately before its mission rewards.
- A read-only engine `deckInfo()` reports the *currently selected* saved deck's actual number of cards, creature cards, spells, mythics, and average upgrade level. The briefing displays current deck size, units, spells and average level.
- The control closes the atlas dialog and opens the **existing real 24-card deck builder**. All seven original strategy presets and existing manual deck editing remain intact; saving in the builder continues to use the existing `aether-dominion-deck-v20` key.
- Editing a deck never rewrites an in-progress match. New loadouts apply when a new match is started. The atlas button is not a simulated shop or a new mock interface.
- New `v448-campaign-prep.css` styles the loadout panel with matching gold-and-ink framing, minimum 46px touch button, mobile-safe wrapping, and a narrow-phone stacked layout. It has no overlay over battlefield tile input.

## Card-rank sensitivity (QA-only)
- New isolated `qaBalance(..., {testRank:1..8})` option changes the *simulated player's* match-local card ranks and adjusts the two starting allies. It does not modify `profile.levels`, purchased copies, collection, actual saved deck or permanent profile. It leaves mission enemy tier and difficulty intact.
- `KING CARD LEVELS · 96 BATTLES` button tests card levels 1, 2, 4 and 5, 12 deterministic seeds per doctrine each (24 games per level).
- Controlled **actual-engine logic in a mocked DOM**, with the balanced deck and signature-only Hollow King waves, returned:

| Simulated level for every card | Test-agent victories | Invalid combat states |
| --- | ---: | ---: |
| 1 | 2/24 | 0 |
| 2 | 9/24 | 0 |
| 3 (additional diagnostic) | 9/24 | 0 |
| 4 | 22/24 | 0 |
| 5 | 24/24 | 0 |

- The outcome is strongly sensitive to card upgrades. It does **not** mean a typical player will have *every* card at the same level or see these victory percentages. Actual players have uneven collections and better tactical decisions than this simple heuristic. These results caution against blanket nerfs and suggest future testing with realistic mixed-level decks.
- Five alternative candidate anti-boss decks were also trialed with this limited bot. None beat the existing Balanced preset in the specific all-level-one Hollow King benchmark; **therefore no unvalidated 'stronger' eighth deck was shipped**.

## Source verification after changes
- JavaScript syntax checks passed: engine, QA script, world atlas and other JS.
- References validated across the production `index.html`, `v30.html`, isolated `qa-v39.html` and `sw.js`, with new versioned engine/atlas/QA scripts and the new CSS.
- A source-driven, fully deterministic actual-engine rules run with a **mocked DOM and in-memory storage** passed **7/7 unique boss-phase checks**, **30/30 expedition-plan checks**, and both 24-game level-1 and level-4 Hollow King comparisons with no invalid battle states. Source-driven logic tests are **not** real iPhone touch/visual browser tests.
- A prior live browser agent loaded an obsolete QA script because of cache/deployment timing; it independently confirmed the older **7/7 boss-phase audit**, but could not run the new A/B button. The A/B and card-rank results above were instead reproduced against the current committed game source in the mocked DOM and should not be labeled live-browser verification.

## Preservation and remaining roadmap
- No player card definitions, legacy artwork, frame atlas, 24-card deck restrictions, matchmaking protocol, permanent save keys, mission rewards, trial unlocks or profile migrations changed.
- Still needed: physical iPhone Safari/Home Screen tap and scroll verification, live-browser final v4.4.8 deck-builder navigation, realistically mixed-card-level balancing, end-to-end human Crown Trial clears, and real-device WebRTC.
- Next: v4.5's **real ~60-card expansion**, released in polished batches only with distinct abilities, compatible engine rules, balanced presets and original matching card/battlefield art. Never use temporary geometric character icons to fill the roster.
