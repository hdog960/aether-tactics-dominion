# Aether Tactics: Dominion v4.4.6 — Objective Playtesting and Mobile Clarity

Date: November 1, 2026

## Shipped production changes
- The live battlefield mission header now spells out the actual victory condition instead of abbreviating only one counter: capture shows the number of controlled springs **and** consecutive hold turns; defense shows survival round and player Core health; hunt shows champion current/max HP; assault shows remaining enemy Core HP.
- The illustrated mission/tactical event label remains visible. A two-line, responsive `v446-objective-hud.css` presentation allows the first two lines of status to display rather than forcing a long mission status into the old single-line ellipsis.
- No player card definitions, enemy champion statistics, terrain rules, mission objectives, victory gates, XP, collection, artwork or profile/save data schemas were changed.

## QA-only improvements
- The save-isolated tactical agent no longer wastes attacks on the enemy Core during non-assault missions, where the authoritative engine prevents Core destruction from satisfying victory.
- For capture, springs have a stronger objective score; a creature can advance toward a spring even when a secondary enemy is attackable. For champion hunts, movement can prioritize reaching the actual boss rather than endlessly attacking unrelated defenders.
- Movement keeps a currently available basic attack whenever possible; a tactical exception is allowed only to seize a spring or advance toward the hunt target.
- `AetherGame.qaBalance(samples, missionIds)` supports a focused scenario list with up to 12 matched seeds per preparation strategy; the original 60-game default remains intact.
- The separate `qa-v39.html` page includes **48 HARD-ENCOUNTER BATTLES**, running 3 difficult encounters × 2 preparation strategies × 8 seeds. Tests use an in-memory storage shim, never the public player's real progression.

## Published browser QA
- Source JS syntax checks passed for the engine and QA script before deployment.
- Live save-isolated browser session: https://agent.tinyfish.ai/runs/0f643a09-2ec9-41a1-acb8-f108a1a2e95d
- Focused test: **48/48 battle sessions completed; 21/48 agent wins; zero invalid combat states; 366 spells and 68 mythic summons**. Errors: none reported.
- By mission and the two offered preparations (8 seeded games each):
  - **Oaths in Shadow (r2, capture)**: 3/8 vs. 8/8, **11/16 combined**.
  - **Crown Guardian (r3, hunt)**: 4/8 vs. 5/8, **9/16 combined**.
  - **Hollow King (t1, hunt)**: 1/8 vs. 0/8, **1/16 combined**.
- Spell/mythic regression: **4/4 PASS** (paid spell damage, mythic tribute, shield cap, area spell centered on a vacant legal tile).
- The five bottom tabs and character art were visible on the deployed isolated QA page. GitHub Pages completed a successful build for the source release prior to this UI style follow-up.

## Interpretation
These are deterministic *bot* samples, not human win rates. The objective-prioritization changes only affect the test agent, so improved results do not establish that any mission became easier for players. The severe Hollow King result is a reason for scenario-specific investigation, **not** proof it is unwinnable. The wide r2 doctrine difference merits additional strategic review, but 8 seeds per plan remain too few to justify stat nerfs.

## Still open
- Validate the final responsive two-line objective header on a real iPhone (physical Safari / Home Screen PWA), including long mission/twist text and service-worker update.
- Re-test the 60-game all-mission benchmark after the improved QA agent.
- Get human-quality playthroughs for Hollow King and Crown Guardian before any champion stat adjustment.
- Validate real two-device multiplayer, GPU/memory performance and touch usability.
- Next roadmap milestone: carefully staged v4.5 expansion toward ~60 cards with distinct archetypes and matching original art. Preserve the existing 32-card library and 24-card deck/save rules.
