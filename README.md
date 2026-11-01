# Aether Tactics: Dominion

**Current release: v3.7 — Painted Card & Battlefield Integration**

**Play:** https://hdog960.github.io/aether-tactics-dominion/

A free, iPhone-first illustrated tactical fantasy card battler. Choose what to play from the Commander's Hall, explore a 12-mission campaign across four unique regions, build one of seven different 24-card deck strategies from 32 original cards, upgrade your commander and collection, or test experimental private duels.

## Start here
- **Play**: Commander's Hall — select Quick Battle, Story Campaign or Private Duel; continue a previously saved solo battle.
- **Map**: Riftfront Conquest — four illustrated regions with 12 sequential missions and 3 endgame Crown Trials.
- **Cards**: the Grimoire — browse the 32-card collection or build a custom deck.
- **Forge**: level, gold, XP, card upgrades and six earnable milestone medallions.
- **Duel**: experimental peer-to-peer private match invitations.

The battlefield uses an angled 55-degree isometric perspective, Aeth springs, tactical movement, high ground, cover, summoning, spells, ritual sacrifices, and innate unit abilities.

## iPhone
Open in Safari; Share → Add to Home Screen. Updates to `main` publish through GitHub Pages. When a new release is published, reconnect while online to let the service worker replace the cached game assets.

## Saves
Commander progression, card upgrades, and campaign completion are stored in the device's local browser storage. Saved solo match snapshots retain the existing v4 format. Private tabs, clearing website data, or changing devices can lose progress. There is no cloud account synchronization yet.

## Multiplayer caveat
The Duel Chamber uses experimental peer-to-peer WebRTC and public signaling relays. Real-device, cross-network testing remains necessary. There is no production ranked matchmaking, anti-cheat server, authoritative player account system, or leaderboards.

## Technical structure
- `index.html` production entrypoint and `v30.html` alternate entry
- `v30-engine.js` rules, AI, progression, campaign execution, profile, and persistence
- `v30-campaign-data.js` campaign and region definitions
- `v30-shell.js` bottom-tab navigation and campaign selector
- `v30-scene.js` game canvas, `v30-net.js` private duel networking
- `v32-celestial.css` illustrated v3.2 theme and layout
- `v34-art.js` earlier original art generator (now superseded for 7 cards by the premium v3.5 painted atlas)
- `v35-battle-art.js` premium card-art portraits plus matching transparent painted battlefield units and character-aware render routing
- `v33-art-fixes.css` and `v34-art.css` consistent card-grid proportions, readable names and rarity details
- `v32-details.js` presentation-only decoration and accurate trophy display
- `art/ui-*.svg` seven original self-hosted fantasy scene illustrations
- `sw.js` offline asset cache, `manifest.webmanifest` Home Screen support
- `V32_VISUAL_OVERHAUL.md` initial visual overhaul
- `V33_ART_CONSISTENCY.md` earlier art-pipeline attempt (superseded)
- `V34_ORIGINAL_ART_REBUILD.md` prior art reconstruction
- `V35_BATTLEFIELD_ART_UNITY.md` painted card-to-battlefield integration, spell effects, and limitations
- `V30_RELEASE_AND_TESTING.md` base campaign tests and `BALANCE_AUDIT_v22.md` earlier balance review

The personal domain `huntermakesgame.com` is not altered by this repository.

## v3.4 original art note
All 25 formerly geometric or recolored cards now have independently designed SVG illustration scenes, rasterized locally for a small-pixel look. The original seven richly illustrated atlas cards remain untouched. This is a new hand-drawn-in-code artwork pass, not 25 externally commissioned painted portraits; actual iPhone quality verification remains necessary.

## v3.5 battlefield visuals
Aether Titan, Abyssal Leviathan, Ember Adept and Thorn Warden now have painted transparent unit cutouts derived from their high-detail card paintings; Aeth Renewal uses the matching cleric as its heal effect. Six classic painted monsters are kept, while eight other new summons use themed painted stand-ins pending bespoke pose art. Meteor, ice, fire, shield, silence and heal effects have dedicated battlefield signatures. The tactical combat engine, XP, collection and saves remain unchanged. Real iPhone QA is still required.

## v3.6 painted roster and translation pass
- Introduces eight independent transparent pixel-fantasy sprite cutouts for Tidecaller, Storm Lancer, Wisp Familiar, Echo Scribe, Crypt Keeper, Rune Conductor, Dusk Reclaimer, and Oath Sentinel. These are painterly game sprites extracted from an illustrated 18-character sprite study, not eight independently hand-animated animations.
- All eight use their identical character cutout as the subject in the card library, over illustrated region backgrounds. This removes mismatched blocky card illustrations and hue-shifted unit stand-ins for those eight.
- The scene draws six existing classic painted monsters, four previously painted new creatures, and eight additional character sprites. The renderer no longer uses the eight recolored classic characters.
- Enemy affiliation is shown by red HP bars and ground auras without recoloring a character's actual artwork.
- Unit poses remain composited idle, movement, hit, attack and defeat transitions, not hand-drawn frame-by-frame animation sets. Sixteen-to-thirty-two-frame pose atlas work remains a future goal.
- No combat rules, save keys, player collections or campaign progression changed. iPhone hardware QA is still required.
- See `V36_PAINTED_ROSTER.md` for source mapping, limitations and tests.

## v3.7 art integrity update
Eight previously borrowed/recolored unit sprites (`p,k,d,o,y,z,A,B`) now render from eight individually illustrated character cutouts sourced from their exact card paintings. Ten previously geometric spell cards (`q,e,i,n,x,C,D,E,F,G`) have painted spell scenes in a separate self-hosted atlas. Seven classic original illustrations and seven prior premium illustrations are retained. `v37-art-unity.js` replaces v36's borrowed-card pipeline; `v30-scene.js` renders the correct eight-character atlas.

Artwork is precached for iPhone. Existing save schemas, campaign, match logic, AI and multiplayer code are unmodified. On-device visual regression testing and manually drawn per-frame animation remain outstanding.
