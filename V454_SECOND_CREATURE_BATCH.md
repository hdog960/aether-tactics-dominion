# Dominion v4.5.4 — Second Four-Creature Expansion (GitHub staging)

**Status: WORK IN PROGRESS — NOT PUBLICLY RELEASED.**
Production remains **v4.5.3 / 40 cards** until each of the four new creatures has its own original portrait, corresponding transparent full-body sprite, and proper battlefield animation frames, and is tested in a real browser. The existing three saved decks and permanent progression remain preserved.

## Four authored abilities already implemented

| ID | New card | Cost | Level-1 stats | Actual authoritative ability |
| --- | --- | ---: | --- | --- |
| Q | **Tideglass Oracle** | 3 | HP 4 · ATK 1 · Range 2 · Move 2 | After the first **successful friendly spell** each round, shield one nearby ally other than the Oracle by 1, capped at 5. Does not activate from a refused cast, enemy spell or self-target. |
| R | **Ashen Harrier** | 3 | HP 4 · ATK 2 · Range 1 · Move 3 | After the first **flanking basic strike** on an enemy creature each round, refresh movement only. Flanking requires a different allied creature adjacent to the target. Never gains another attack and cannot trigger against a Core. |
| S | **Gravebloom Warden** | 4 | HP 7 · ATK 2 · Range 1 · Move 1 | On defeat, root the nearest enemy **non-boss** creature within 2 tiles for its forthcoming movement phase. The enemy may still attack; no effect on a Core or champion. |
| T | **Stormvault Artificer** | 3 | HP 4 · ATK 2 · Range 2 · Move 2 | When summoned alive, remove the closest enemy snare within 2 tiles and gain 1 shield. Friendly snares are untouched; a distant snare or death to a placement trap provides no benefit. |

These actions run in `v45-engine.js` via existing `apply`, `onFriendlySpell`, `basicStrike`, `onUnitDeath`, and `onCreatureSummoned` hooks. All triggers are bounded, save-compatible properties or existing state transitions. No future UI promises, fake mechanics, or duplicated ability copies have been added.

## QA and balancing

Successful GitHub Actions: [v4.5.4 staging checks](https://github.com/hdog960/aether-tactics-dominion/actions/runs/41359740639).

- **14/14** specific Q–T combat tests: valid spells, illegal spells, ownership, shield cap, flanking requirements and round limit, death roots, boss immunity, friendly-trap safety, trap-distance safety, placement trap death, and actual legal Artificer summons.
- **13/13** existing M–P tests, **12/12** spell rules, **8/8** saved-deck vault tests, **7/7** boss phases and **30/30** campaign choices.
- **60/60** existing-deck combat simulations completed (**38** heuristic wins, no invalid states).
- **60/60** mixed Q–T deck simulations completed (**25** heuristic wins, no invalid states). The bot summoned Q **37**, R **40**, S **47**, T **34** times — every new creature was meaningfully exercised.
- Mixed-deck win count is below the current deck baseline. This is **not** a human win-rate forecast, and the first four-creature batch must receive more strategic/balance testing before release.
- Normal non-QA engine does **not** enable or insert Q/R/S/T into the current saved deck; existing live 24-card decks and the three-slot vault are unchanged.
- Syntax, isolated QA source consistency, versioned entrypoint script references, and missing-art cache safeguards all passed.

## Artwork and animation release blocker

**No matching original Q–T paintings or sprite sheets exist yet.** No default shapes, recolors or reused M–P/other creature sprites are acceptable.

Required character identities:
- **Q Tideglass Oracle:** serene seafaring astrologer in layered teal glass-bead robes, living tide patterns and authentic nautical instruments, physically grounded anatomy; distinguish from existing Pyromancer and Echo Scribe.
- **R Ashen Harrier:** nimble ember-red jackal-like ground skirmisher wearing battered copper fighting leathers, hooked blade, distinct feet and legs; *not* a reskin of the Zephyr Cartographer or existing Rift Stalker.
- **S Gravebloom Warden:** cracked dark porcelain and black-bark sentinel with luminous plum wildflowers and grown briar armor, articulated legs and recognizable floral silhouette; distinct from Verdant Bastion.
- **T Stormvault Artificer:** cobalt-coat engineer with brass goggles, mechanical disarming tongs, rugged boots, believable hands and a compact arcane coil; distinct from existing Rune Conductor.

Required exact atlases (Q/R/S/T left-to-right, one separate character per cell):
- `art/cards-creatures-v454.webp` — 512×96 (4 illustrated 128×96 card crops).
- `art/units-creatures-v454.png` — 384×120 (4 original alpha-background 96×120 cutouts).
- `art/battlefield-frames-v454.webp` — 2112×480 (4×22 matching animated poses at 96×120 each).

The new `v454-creature-art.js` requires distinct painted crops, non-empty sprites and transparent backgrounds. The renderer uses `v454Rows={Q:0,R:1,S:2,T:3}`; it **never** substitutes existing creatures' frames. The isolated test page has **4 NEW CREATURE ART GATE** and deliberately reports BLOCKED until real work exists. The v4.5.4 staging service worker precaches script changes but **never precaches uncreated atlas URLs**.

`tools/v454_build_art.py` prepares local artist-supplied source art `art/sources/v454-original-characters.png` for this batch, validating output dimensions and pose uniqueness. It fails rather than using a default image if that input is absent. Like the v4.5.3 pipeline, initial motion poses from this helper are mechanically deformed from source art; final visual inspection and more authored frame-by-frame improvements are still needed before labeling the animations polished.

## Release checklist

- Produce and visually inspect all four new character identities, their card portraits, transparent sprites and all animation rows.
- Check the real 44-card collection, four identity-matched units rendered on actual battlefield tile positions, mobile layout and touch.
- Verify each ability's round cap, damaged/dead target behavior, save/resume, and the multiplayer host state for both teams.
- Re-run all QA and examine balance across mixed collections, not just uniform-level bots.
- Only then explicitly set `DOMINION_V454_ART_RELEASE`, version the service worker for the full asset set, and merge staging to the public branch.
- Do not modify live save keys or delete existing collection data.

## Creator's mandatory roadmap boundary

After reaching 60 cards in v4.5, complete v4.6 long-run progression/replayability and v4.7 multiplayer reliability, **then STOP for creator input**. No v5.0 without authorization.
