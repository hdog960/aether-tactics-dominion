# Aether Tactics: Dominion — v4.5.2 Armory Loadout Vault

Date: November 1, 2026

## Playable feature
The existing Commander's Armory now has **three personal named deck slots**. Each saves a fully valid **24-card deck**, while retaining all eight original and Astral strategy preset buttons and the normal plus/minus card editor.

- Choose Deck I, II, or III to **preview** that saved deck in the editor; empty slots start from a copy of your currently equipped deck.
- Optionally enter a strategy name (24 visible characters maximum, stripped of markup/control characters).
- Tap **SAVE FOR NEXT MATCH** to store the selected deck and equip its slot. Closing the builder with CANCEL or X discards its uncommitted draft and slot selection.
- The currently running solo match is never rewritten. An equipped deck becomes active on a **new** match. The selected slot is highlighted and marked EQUIPPED; other filled slots display SAVED, untouched slots EMPTY.
- Touch targets are at least 69px high, names wrap at narrow phone widths, keyboard focus is visible, and the new UI sits inside the **existing scrollable Armory** with no new overlay covering the battlefield.

## Save compatibility
- Existing canonical deck key: `aether-dominion-deck-v20`. It remains **the authoritative selected deck** and is still written on every deck save.
- New additive key: `aether-dominion-loadouts-v452`, format `{version:1,active:0..2,slots:[{name,cards}|null,...]}`.
- On initial load the existing selected deck is placed in the active slot, with the other two empty. Invalid stored slot content is dropped, never loaded into a game, and valid other slots are preserved if the canonical deck was modified by an older build.
- Match snapshot `aether-dominion-v04`, profile `aether-dominion-profile-v21`, card collection, ranks, XP and campaign progress are unchanged. No migration or reset of these values.
- For reliability, slot updates write the existing v20 selected-deck key **first**, then the new loadouts key; storage failure does not trigger save deletion. Note that local-only browser storage can still be cleared by browser settings/private mode.

## Test results
Source-driven game engine on a mocked DOM and in-memory localStorage:
- **8/8** new vault checks: initial legacy-deck migration, preview safety, valid slot creation and equip, name sanitization, canonical save sync, preservation of other saved slots, cancel safety, unchanged active battle snapshot.
- **12/12** v4.5 spell legality checks and **7/7** boss-phase checks.
- **30/30** expedition choices.
- **60/60** campaign simulations completed, **38** heuristic bot wins, **0** invalid combat states.
- All JavaScript evaluated without syntax errors; intended HTML and CSS files present.
- Live browser UI and physical iPhone verification are follow-up gates. Source-driven simulations are not proof of human win rates or tactile usability.

## Next: v4.5.3 painted creatures
The remaining target is **60 cards**. v4.5.2 deliberately adds saved strategic flexibility before new creature batches. The next work should create **fully original matching portrait + transparent battlefield cutout + all animation phases** for every new creature prior to exposing it in the 36-card collection. Add creatures in small batches with unique abilities that are testable by the real engine (e.g. elevation counterplay, contested objective protection, spell-triggered movement), not recolored stand-ins or geometric placeholder art. Separate combat-rule testing and mobile portrait/sprite inspections are required before a public promotion.
