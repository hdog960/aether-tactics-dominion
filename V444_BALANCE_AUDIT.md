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
