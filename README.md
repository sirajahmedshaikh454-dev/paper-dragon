# Paper Dragon

> Fold a strip of paper in half, again and again. Open every crease to exactly 90°.

Paper Dragon is an interactive math toy. Fold a virtual paper strip in half up to 16 times, then drag a single slider to open every crease at once. At **180°** the strip is folded flat; at **0°** it's a straight ribbon. At exactly **90°** it becomes the **Dragon Curve** (also called the Heighway dragon), a fractal that never crosses itself and never reuses an edge.

It isn't a drawing trick: the shape comes straight from the real crease pattern that physical paper makes when you fold it.

---

## Contents

- [Features](#features)
- [Quick start](#quick-start)
- [Things to try](#things-to-try)
- [Controls](#controls)
- [The math](#the-math)
- [How it works](#how-it-works)
- [Project structure](#project-structure)
- [Testing](#testing)
- [Accessibility](#accessibility)
- [Known limitations](#known-limitations)
- [Roadmap](#roadmap)
- [Skills & methodology](#skills--methodology)
- [License](#license)

---

## Features

- **1 to 16 folds**, from 1 crease up to 65,535 creases (65,536 segments).
- **One slider, three shapes:** folded stack (180°), dragon (90°), flat strip (0°), and every in-between angle.
- **An "Unfold to 90°" animation** with ease-out; it jumps straight there under `prefers-reduced-motion`.
- **Real-paper thickness readout:** at about 0.1 mm per sheet, 16 folds would be **6.6 m** thick. Real paper gives up at around 7 folds.
- **A dragon seal** stamps itself and the subtitle explains the property the moment you hit exactly 90°.
- **Auto-fit:** the drawing fills whatever space is left between the header and the controls, at any window size.
- **Zero dependencies, zero build:** open `index.html` directly from disk.

## Quick start

```bash
git clone https://github.com/sirajahmedshaikh454-dev/paper-dragon.git
cd paper-dragon
npm start        # Windows: opens index.html in your default browser
```

Or just double-click `index.html`. It works straight from `file://` because it uses a classic script instead of ES modules.

## Things to try

1. Press **Unfold to 90°** and watch the folded stack open into a dragon.
2. Drag the slider **slowly** from 180° to 0°. Near 90° the curve snaps into a perfect grid.
3. Press **+** until 16 folds. Notice the dragon keeps the same shape, only finer.
4. Stop at 60° or 120° to see stranger relatives of the dragon.

## Controls

| Input | Action |
|---|---|
| **−** / **+** buttons, `↓` / `↑` | Fewer / more folds (1–16) |
| Slider, `←` / `→` | Opening angle in 0.5° steps (keys: 1°) |
| **Unfold to 90°**, `Space` | Animate to 90° (Space toggles between 90° and 180°) |

## The math

Fold a strip in half n times, always in the same direction, then unfold it. Number the creases from one end, i = 1, 2, 3, … Each crease bends either left or right, following a simple rule:

> Take the **odd part** k of i (divide out every factor of 2). If **k mod 4 = 1**, the crease bends **left**; otherwise it bends **right**.

This is the **regular paperfolding sequence** (OEIS [A014577](https://oeis.org/A014577)). Now walk along the strip and turn by the same angle θ at every crease, with the direction set by the rule:

- **θ = 180°**: every segment folds back on itself, giving the flat stack.
- **θ = 0°**: no turns at all, giving the flat strip.
- **θ = 90°**: the turns trace the **Heighway dragon**, which visits grid edges without ever repeating one.

## How it works

```
creases(n)  ──►  Int8Array of ±1 turns (length 2ⁿ − 1)      # lib.js
strip(turns, θ)  ──►  Float64Array of x,y points             # lib.js
draw()  ──►  bounding box ─► fit between header and panel ─► stroke in 48 colour chunks
```

- `creases` uses the bit trick `i & -i` to strip factors of two in O(1) per crease.
- `strip` accumulates the heading and position in one pass, with no per-point objects (typed arrays only), so 65,536 points redraw in a single frame.
- The ink fades from indigo to vermilion along the strip so you can follow it through the fractal. Drawing in 48 chunks keeps the number of colour changes small.
- The layout reads the real header and panel positions every frame, so the curve never hides behind the controls on a short window or phone.

## Project structure

```
paper-dragon/
├── index.html    # page, styles, rendering and controls (single file)
├── lib.js        # pure math: creases(), strip(); works as a browser script and as CommonJS
├── test.js       # node:test checks
├── package.json  # npm start / npm test
└── README.md
```

## Testing

```bash
npm test
```

- **The crease pattern matches real paper:** 1 fold gives `[L]`, 2 folds give `[L, L, R]`, and 16 folds give 65,535 creases.
- **Geometry:** at 0° the strip ends exactly 2ⁿ units away in a straight line.
- **The defining property of the dragon:** at 90° with 10 folds, *no edge is ever used twice*. This test proves the picture really is the dragon curve.

Browser checks: a small window (503×486) and phone width (375 px, 14 folds), with no horizontal scroll and zero console errors.

## Accessibility

- All controls are real buttons and a native range input, with visible focus rings.
- The slider announces its angle through `aria-valuetext`; the fold count and thickness facts update in live regions.
- The 90° explanation is written into the subtitle as text, not only drawn on the canvas.
- `prefers-reduced-motion` skips the animations.

## Known limitations

- At 16 folds every frame strokes 65,536 points, so dragging the slider may stutter on slow machines.
- Folding at angles other than 180° (other paperfolding families) isn't modelled.
- Tested in Chromium-based browsers only.

## Roadmap

- [ ] A fold-angle parameter to explore the Lévy C curve and other relatives.
- [ ] Export an SVG cutting and folding pattern you can make from real paper.
- [ ] Animate the folding itself in 3D.

## Skills & methodology

**How it was built**

1. **Concept selection.** The user's prompt was cut off, so a theme was chosen that was clearly different from earlier builds (audio, CLI, multi-window): a *toy that secretly teaches something*.
2. **Math first, proven by test.** The crease rule and geometry were written as pure functions and **proven** before any UI: the "no edge reused" test is the dragon curve's defining property.
3. **One commit per step**, each pushed straight away: math → page → easter egg and docs.
4. **Browser verification** at a small desktop window and at phone width. This found that fixed header/panel margins left only 56 px for the drawing on short windows; the fix was to **measure the real layout** instead of guessing.
5. **Lean by design:** one HTML file plus one script, no build step, and it runs from `file://`.

**Tools and skills used:** Claude Code (Opus), the in-app browser with viewport emulation, Canvas 2D, typed arrays, `node:test`, the regular paperfolding sequence (OEIS A014577), and the *ponytail* smallest-complete-change approach.

## License

MIT

---

<details>
<summary>Spoiler: the easter egg</summary>

At any angle, type **tile**. Four copies of the strip appear, each turned a quarter-turn around the same starting point, in four colours. At exactly 90° the four dragons fit together with no gaps and no overlaps, spiralling out to tile the plane. Type it again to go back.

</details>
