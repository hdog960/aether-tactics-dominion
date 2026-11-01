# Dominion v4.4.4 — Campaign Balance and Retry Reliability

## Actual gameplay fix
Restarting or replaying a campaign mission now preserves the player's selected expedition strategy. Previously, both retry controls silently reverted to the first suggested plan. A retry correctly carries the same strategic opening, while the illustrated mission briefing still lets players choose another plan for a fresh attempt.

## New balance benchmark
The separate memory-isolated QA page includes **60 BATTLE BALANCE**. It plays each of the 15 campaign missions under both offered strategies with two matched pseudorandom seeds, for 60 games in total. This uses the actual engine and enemy AI; a basic player bot summons affordable creatures, uses validated movement and attacks, and pursues the relevant assault/hunt/capture/defend objective.

Checks cover unit occupancy and map legality, energy, Core HP, shield limits, phase completion and final outcomes. The result table includes mission-specific wins, rounds to completion, remaining Core health and event counts. Identical seed pairs allow relative comparisons between two doctrines, with the original random function restored afterward.

**Limitations:** The bot cannot cast spells, sacrifice creatures for mythics, adjust its deck or exercise human-level tactical skill. Its results are regression and difficulty indicators, not representative human win rates. No card stats or boss attacks have been changed based solely on the synthetic bot.

## Safety
All automated games run only on qa-v39.html with a memory-only storage shim. The existing player save key/schema (v4), campaign progression, rewards, cards, animations, Forge, world map, and online multiplayer are unchanged. Previous 45 mission-result, 30 story-choice, 15 event and 7 boss phase checks remain available.

## Further work
Review the deployed 60-game report, verify any actual exploits or severe outliers, and add carefully justified balance fixes before v4.5. Physical iPhone touch/performance and complete human playthroughs remain pending.

## Initial deployed benchmark — November 1, 2026
- GitHub Pages deployed the v4.4.4 benchmark commit `7ca534d7ab1c61df65407168f55f9a390c8853d8` successfully.
- Actual browser simulation and screenshots: https://agent.tinyfish.ai/runs/04677e51-07f7-4c97-ac09-e924ff00d34e
- **60/60 simulations completed**, with **18 test-bot victories and zero illegal combat states**. All sessions reached an ending under their campaign round limits; the browser reported no JavaScript errors.
- Some assault and capture scenarios had zero wins for the simple bot (including a starting assault strategy and a late capture strategy); early defense missions tended to be easier for that agent. Two seeds per plan are too few to derive robust human success rates or justify nerfing bosses. The bot cannot cast spells or manage tributes.
- Encounter, boss and progression regression controls remained available. In the browser session 15/15 encounter and 7/7 boss checks passed; the report for the 45-outcome control was not separately confirmed in that run and should not be mistaken for a new 45/45 re-test.

## Visual fairness patch (v4.4.4)
- Added a read-only mission telegraph banner above the actual battlefield: upcoming round-based event name, clear description and specific next hazard grid coordinates for shifting weather.
- When a champion approaches its first or final health threshold, display its next phase effect as an advance warning. These warnings use only visible mission rules and champion HP; hidden hands and multiplayer state are never exposed.
- The alert ignores touch input and does not replace character artwork or occupy tiles.
- QA page includes 22 read-only warning checks (15 event plus seven boss previews), and live weather/boss preview buttons. Source and browser verification required for the follow-up release.

## Final battlefield-warning browser QA — November 1, 2026
- Warning release deployed successfully from commit `26cbfced3038e699e3c5e8cd91c0f61074ef31ff`.
- Live QA and rendered battlefield screenshots: https://agent.tinyfish.ai/runs/76152a7c-e86a-4c06-a1a9-d6d0756ae50d
- **22/22 early-warning checks PASS:** 15 scheduled mission events and seven first-phase boss thresholds. Quick Battle correctly showed no campaign warning.
- Live weather preview showed **NEXT ROUND · WHITEOUT FRONT** and **B4 · C5 · D5** tile coordinates with no clipping; card art and battlefield remained visible.
- Live Mirror Court preview showed **CHAMPION PREPARES · PHASE 1** with the forthcoming reflection effect; no clipping or blocked controls.
- **45/45 campaign objective and reward regression cases passed**, with no reported JavaScript errors. The five bottom navigation tabs remained usable.
- Limitation: second boss-phase thresholds are implemented but not individually checked by this 22-case QA. Physical iPhone performance, touch/scroll and human-level battle balance still need testing.
