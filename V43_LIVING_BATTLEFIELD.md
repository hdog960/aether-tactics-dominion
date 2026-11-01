# Dominion v4.3 — Living Battlefield (first development pass)

## Implemented
### Battlefield spell and buff effects
- Additional deterministic canvas FX for: Rift Barrage bolt, Planar Meteor impact, Titan aftershock, Frostbind, Ember Sigil, Null Chime silence, Fateful Exchange, Renewal healing, Ward shielding, Purifying Rain cleanse, Quickstep dash, Rallying Cry, Twin Convergence bond, Veil Snare, Echo Retrieval.
- Rendered in `v30-scene.js` as short-lived strokes/trails on top of the existing painted scene and unit sprites. They are VFX, **not replacements for card art**.
- Corrected presentation-only FX event labels for `recall`, `snare`, `cleanse`, and `bond` so the right visual appears. Card abilities, costs, and effects are unchanged.

### Solo AI improvements
- Deterministic evaluation for legal movement: enemy distance, mission spring control, elevation, ability to attack from candidate position, terrain hazards, and vulnerability to incoming fire.
- Improved summon tile choice: favors spring contesting and ranged high-ground positions and discourages hazardous placement.
- Attack priorities include lethal hits, high-damage/ranged threats, enemies holding springs, and a guaranteed winning strike against a rival core. This does not grant extra attacks, free energy, new movement, or hidden unit information.
- AI movement now uses the same `apply()` validation path as the human player's move.

### iPhone rendering efficiency & clarity
- Canvas painting is skipped while the game is hidden, backgrounded, or the player is viewing Play / Map / Cards / Forge / Duel instead of the battle. Render resumes on returning to battle.
- Reduced-motion accessibility media query lowers the battlefield frame cadence.
- New `v43-battle.css` adds battle-only UI contrast and end-turn feedback without changing interactive tile hitboxes.

## Testing and limitations
- Syntax checking required for modified engine, scene and worker files, and complete bundled HTML script orders.
- QA page `qa-v39.html` updated to load v4.3 from the real engine and includes **AI · 12 TURNS** and **SPELL FX** test controls. All QA uses in-memory `localStorage`, so it does not modify personal save files.
- Automated browser smoke test must confirm the production Hall, story battle, unit movement and attack, spell visuals, navigation, map, Forge, and card collection.
- This first pass does **not** implement 60 cards, Gauntlet, new quests, ranked matchmaking, or full skeletal/spritesheet animation. Those are future roadmap phases.
- The AI heuristic adjustments still require multi-battle win-rate and decision quality audits, not just legality checks.
- iPhone WebKit touch/gesture and two-device multiplayer remain separate physical-device verification tasks.

## Live QA results — November 1, 2026
- GitHub Pages deployment for commit `06687d40538a9d0e8179ef8214b7fe7330290e89` completed successfully.
- Live isolated QA page confirmed v4.3, then reported **AI: 12/12 legal turns**, **new summon actions: 16/16 pass**, and **14 signature FX kinds queued** without errors. The actual battlefield rendered and returning to Hall succeeded.
- Browser session and screenshots: https://agent.tinyfish.ai/runs/60355e35-d0bd-43c3-81f2-e98a1270b8f4
- Important caveat: QA confirms movement/attack legality and absence of immediate crashes, **not** long-run balance, full campaign completion, damage math of every spell, performance on a physical iPhone, bespoke character animation, or multiplayer connectivity.
