# Dominion v4.4.9 — Deck-aware Expedition Briefings

Date: November 1, 2026

## Live production feature
- Added an ornate **TACTICIAN'S NOTE** section inside the existing illustrated campaign-atlas mission briefing, directly above the actual EDIT DECK action.
- Rather than a generic strategy banner, the note is calculated from the **currently saved** 24-card deck using a new read-only `AetherGame.campaignCounsel(missionId)` engine helper.
- The advisor counts fast or flying units, durable creatures, directly damaging spells, defensive spells and the deck's average card upgrade level. It distinguishes **capture**, **hunt**, **defend** and **assault** objectives.
- For boss encounters, it repeats the authentic authored `bossKit.counter` hint. For environmental missions, it describes the actual authored event. For high-tier encounters with low average card levels, it recommends selective upgrades without promising that upgrades alone guarantee wins.
- It does **not** alter deck contents, player progression, rewards, profile storage, campaign rules, boss stats, AI difficulty, local saves, WebRTC, or character art. Existing EDIT DECK remains the same real builder and all changes apply only at a new match.
- Dedicated `v449-counsel.css` uses mobile-safe responsive wrapping and no overlay over the battlefield. HTML and service-worker references are versioned to `v449`.

## Source and simulated-rule verification
- JS source parses for the updated `v30-engine.js` and `v41-campaign-atlas.js`, matching all HTML/style and service-worker asset references.
- Real authored mission outputs tested for **v2** (The Two Wells), **r2** (Oaths in Shadow), **t1** (The Hollow King), **t2** (Mirror Court), **r3** (Crown Guardian) and **f1** (Icebound Approach); all generated mission-appropriate, data-backed advice for the initial Balanced deck.
- The QA-only normal regression run passed **7/7 boss-phase checks**, **30/30 pre-mission plan checks** and **60/60 executed tactical simulations**, with **0 invalid states** and **38 test-bot victories**. Simulation wins are not human playtest outcomes.
- Physical iPhone Safari layout/touch and a final live screenshot are still outstanding; source-level tests do not verify visual quality.

## v4.5 development is separate
The branch `dev/v45-first-spell-batch` adds **four experimental spells** with authoritative rules, opposing AI handling, mission-testing heuristics, Grimoire descriptions, individual battlefield VFX cues and seven passing legal-action tests. It is deliberately **not** merged into the live release. The spells must not appear publicly until full original painted card art is complete and tested. See `V45_FIRST_SPELL_BATCH.md` on the development branch. Do not use the generated promotional concept art as a screenshot of the actual product.

## Next release quality gate
Create distinctive painted portraits for Starfall Lattice, Ashen Reprisal, Undertow and Dawn Edict; integrate them without generic art fallbacks. Test both sides' actions, save/load and mobile interaction in a real browser, verify frame and art identity, run balance simulations with these four cards included, then deliberately enable the release gate. Preserve all user collection and match save keys.

## Live browser acceptance — deployed v4.4.9
- **PASS** — Isolated public GitHub Pages QA run: https://agent.tinyfish.ai/runs/7393bdf0-9d31-47b0-8a80-a06bd72878d2
- Clicked **MAP**, then the actual illustrated first mission marker `button.atlas-marker[data-atlas-mission='v1']`, and verified that `#atlas-dialog` opened **without starting a battle**.
- TACTICIAN'S NOTE appeared with the three actual saved-deck/mission tips. Deck summary showed **24 CARDS · 16 UNITS · 8 SPELLS · AVG LV 1**.
- EDIT DECK opened the authentic 24/24 Commander's Armory with seven presets, card quantities, CANCEL and SAVE FOR NEXT MATCH. No save mutation was requested or performed.
- The original first browser run https://agent.tinyfish.ai/runs/bd57d7fa-e0d7-4928-bf36-6340b4f9e369 had inadvertently clicked a legacy fallback mission entry because `qa-v39.html` omitted four CSS files used by production. This was a **QA harness mismatch**, not evidence of a live feature failure. The QA page now includes `v41-campaign-atlas.css`, `v42-forge-scroll.css`, `v44-encounters.css`, and `v441-bosses.css`, and uses the correct v4.4.9 page label. The second run clicked the correct illustrated marker and passed.
- Browser test was on isolated QA route; physical iPhone Safari touch and a full campaign playthrough remain unverified.
