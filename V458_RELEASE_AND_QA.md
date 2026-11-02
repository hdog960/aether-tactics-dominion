# Dominion v4.5.8 — Final Four Painted Creatures (60-card milestone)

**Release candidate:** Aether Tactics: Dominion grows from 56 to **60 original cards** without changing the 24-card deck size, three saved Armory deck slots, existing card-copy limits, version-4 in-progress match storage, player level, Forge upgrades or campaign saves.

## New playable creatures

| Key | Painted identity | Aeth | Base HP / ATK / range / move | Actual bounded ability |
| --- | --- | ---: | --- | --- |
| `ag` | **Aether Lanternist** | 3 | 4 / 1 / 2 / 2 | On summon, cleanse burning and root from the most injured afflicted friendly creature within 2 tiles and grant 1 shield if space remains. Never targets enemies, never resurrects. |
| `ah` | **Vesper Kestrel** | 3 | 4 / 2 / 1 / 3 (flying) | After its first successful movement per round within 2 of an eligible enemy nonchampion, weaken that foe's next basic attack by one. No stack, no champion targeting or summon trigger. |
| `ai` | **Hollowroot Collector** | 4 | 6 / 2 / 1 / 2 | Its first basic attack per round against a rooted or burning enemy creature restores 1 Aeth (maximum 10). Never triggers on a Core or unmarked unit. |
| `aj` | **Rimeshard Sentinel** | 4 | 8 / 1 / 1 / 1 (starts with 1 shield) | Upon surviving its first enemy basic attack per round, cleanse its own root and burn and grant 1 shield (5 maximum). Triggers **after damage**, never upon defeat, and never provides another attack. |

These add cleansing, aerial disruption, conditional mana recovery and defense against status pressure, deliberately complementing Gravemire Ring, Cinder Bloom, other burn/root cards and existing deck archetypes. The four mechanics are symmetrical for both teams and resolve within the authoritative combat engine.

## Original artwork and battlefield translation

The source is an original large **2048×2048** 2×2 painted production sheet at `art/sources/v458-original-characters.png`. The four separate figures are mapped in reading order (ag, ah, ai, aj), without using promotional mockups or repeating older characters. Original input SHA-256: `45990d6a10f84ae470bc183af1e38fb05bc8adb71bb8dcde751b6fc6842196fd`.

The source-derived production atlases are `art/cards-creatures-v458.webp` (512×96), `art/units-creatures-v458.png` (384×120, transparent), and `art/battlefield-frames-v458.webp` (2112×480). There are 22 **pose-derived** animation cells per character (88 total), including idle, walk, attack, hurt and defeat. The poses are generated from authentic character paintings, **not** 88 individually painted drawings. The manifest `art/v458-art-manifest.json` records exact source checksum, identities and asset dimensions.

New ability feedback is rendered by the real game canvas: golden lantern purifying rings; violet-blue kestrel wing arcs; emerald hollowroot energy motes; cyan rimeshard crystal warding. The live and QA renderer sources are synchronized.

## Quality and balance evidence

- **16 targeted v4.5.8 combat tests:** actual legal summon effects, allied/enemy ownership, preventing champion targeting, first-move quotas, 1 Aeth recovery with hard cap, defense after successful survival, shielding limits, death safety, and version-4 save persistence.
- **Earlier creature/spell regressions:** v4.5.3–v4.5.7, campaign bosses, 30 narrative mission choice plans and three saved Armory slots.
- **180 simulated matches:** 60 standard deck (38 wins), 60 previous mixed deck (25 wins), 60 mixed deck containing the four new creatures (25 wins), with zero recorded invalid action states. These are fixed simulation mixes, not a calibrated PvP balance study.
- **Real artwork QA:** four distinct original card images, four genuinely transparent full-body field cutouts, a real 2112×480 88-cell atlas, visible canvas animation row observation for all four units, actual board DOM refreshed before screenshot capture to eliminate a prior test race with the legacy QA dashboard's automatic default lineup, full-width screenshots and a separately captured **raw battle canvas**.
- **Mobile UI and deck QA:** Chromium at 390px and 320px checks the complete 60-card collection, 24-card deck editor, correct new two-letter card IDs, and all three prior slots. This is mobile emulation and does not substitute for physical iPhone Safari playtesting.
- **Release guard:** `tools/v458_release_guard.mjs` requires real original SHA matching source, exact image dimensions, synchronized game/QA engines and scene renderers, and all new atlases in the PWA cache before a release flag may be enabled.

GitHub Actions references:
- [Rules, 180 legal battle simulations, art provenance and release safety](https://github.com/hdog960/aether-tactics-dominion/actions/workflows/v458-rules-qa.yml)
- [Original art build and real rendered battlefield visual acceptance](https://github.com/hdog960/aether-tactics-dominion/actions/workflows/v458-build-from-source.yml)

## Save compatibility and testing limitations

No existing storage keys or data formats are changed. An already-started match resumes with its saved 24-card deck; new card unlocks and deck editing affect subsequent battles. Upgrades do not reset. Browser storage should **not** be cleared to force refresh.

Physical iPhone Safari hardware touch/memory testing and cross-network two-device WebRTC tests remain unverified. The art has been visually reviewed in desktop-hosted, phone-sized Chromium; individual motion quality can still benefit from animator-authored polishing and real-device feedback.

## Next milestone and hard stop

**v4.6:** Rift Gauntlet, measured long-term progression and mastery challenges, with anti-exploit safeguards and backward-compatible profile persistence. **v4.7:** real-device, cross-network private-duel reliability before considering public multiplayer systems. **Mandatory STOP after v4.7**, at which point the creator will revise or approve the next roadmap. Do not start v5.0 automatically.
