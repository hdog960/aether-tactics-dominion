# Aether Tactics: Dominion v4.3.2 — Raster Sprite Frame Animation

## Completed production implementation
- Added a real **2,112 × 1,440 transparent WebP animation atlas** at `art/battlefield-frames-v432.webp` (1,323,360 bytes, quality 92).
- 12 original painted creature identities are preserved: Aether Titan (t), Abyssal Leviathan (l), Ember Adept (c), Thorn Warden (j), Tidecaller (p), Storm Lancer (k), Wisp Familiar (d), Echo Scribe (o), Crypt Keeper (y), Rune Conductor (z), Dusk Reclaimer (A), Oath Sentinel (B).
- Each creature has **22 actual different raster sprite images** in fixed 96 × 120 cells: 4 idle, 6 walk, 4 attack, 3 damage, 5 defeat. 264 atlas cells total.
- Poses were reconstructed from the existing transparent painted character assets using pixel-preserving regional displacement, body/foot motion, color-specific impact shading and progressive defeat collapse. These are distinct per-frame bitmaps, but **not independently hand-illustrated keyframe drawings**.
- The engine visual renderer selects frames from the 5 animation sequences based on ongoing authoritative movement, strike FX and damage events. The client now briefly animates a defeated unit after it disappears from the authoritative unit array, without resurrecting it or changing combat logic.
- The original six classic painted sprites (v, r, b, s, f, g) retain their prior transform animations while their corresponding frame sheets remain future work. Their card art is never replaced or recolored.
- Image precached for offline iPhone Home Screen use, versioned to avoid old images/scripts.
- No game-state, campaign, deck, profile, player save, card costs, attack ranges, AI, or multiplayer rules changed.

## Atlas layout
Row keys: `t,l,c,j,p,k,d,o,y,z,A,B`.
Frame offsets: idle 0–3, walk 4–9, attack 10–13, hurt 14–16, defeat 17–21. Cell size 96×120.
Visual-only state changes; underlying positions and HP values remain authoritative.

## QA and limitations
- Source checks include JavaScript syntax, HTML versioned script loaders, offline cache, presence of all 12 keys, 22 frames, five states, defeat cleanup, and unchanged saved-game key.
- Offline artwork generator audited all 264 cells: at least 20 different frames per creature, nonempty alpha-based images, and transparent backgrounds.
- Browser QA isolated page includes **264 FRAME AUDIT** that checks deployed image dimensions and each frame’s alpha/hash, alongside movement/attack and AI stress tests.
- Frames are generated algorithmically from painted artwork to retain identity; future artist-authored frames would create more expressive motion with articulated weapons and limbs.
- Physical iPhone WebKit testing, in-game gesture validation, multiplayer and real device performance remain separate.

## Published live QA — November 1, 2026
- v4.3.2 GitHub Pages build for commit `87ab678234a534c52c235ae72b4be2f6fd4dd357` completed successfully.
- Actual isolated browser test: https://agent.tinyfish.ai/runs/49fe4230-b573-40b8-95ae-fca2d6094a52
- **FRAME ATLAS PASS:** 2,112×1,440 actual deployed image, 264/264 nonempty frame cells, 264 distinct frame fingerprints, 12 animated creature types, 0 missing images.
- **COMBAT PASS:** 16/16 newer-unit movement/attack checks.
- **ANIMATION PASS:** 18/18 role motion checks (includes six legacy units).
- **AI PASS:** 12/12 turn legality checks.
- Visual inspection: 8 newer units visible in the real battlefield, mixed teams, no observed clipping or blank sprites, bottom controls present, no JavaScript errors reported.
- Caveat: Automated QA validates source data and live rendering; it does not verify every animation aesthetically frame-by-frame in native iPhone Safari. Defeat animation triggers, physical touchscreen performance and sixth classic unit frame sheets still require dedicated follow-up.
