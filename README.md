# Paper Dragon

Fold a strip of paper in half, again and again, up to 16 times. Then drag one slider to open every crease to exactly **90°**. The strip turns into the **Dragon Curve**, a fractal that never crosses itself.

It isn't a drawing trick: the curve comes straight from the real crease pattern of folded paper.

## Run it

```bash
npm start
```

That opens `index.html` in your browser (or just double-click the file). No install and no server. `npm test` checks the math.

## Try this

1. Press **Unfold to 90°** and watch the folded strip open into a dragon.
2. Drag the slider slowly between 180° (folded flat), 90° (dragon) and 0° (flat strip).
3. Press **+** a few times. 16 folds = 65,536 layers, which would be **6.6 m thick** in real paper. Real paper gives up at about 7 folds.

Keys: ↑/↓ change folds · ←/→ nudge the angle · Space unfolds or folds.

## How it works

Fold a strip the same way n times and unfold it. Crease *i* bends left if the odd part of *i* leaves remainder 1 when divided by 4, and right otherwise. `lib.js` turns that rule into turn directions, then walks the strip, turning by the slider angle at every crease. The tests check that at 90° no edge is ever used twice.

---

<details>
<summary>Spoiler: the easter egg</summary>

At any angle, type **tile**. Four copies of the dragon appear, each one turned a quarter-turn around the same starting point, in four colors. At 90° they fit together with no gaps and no overlaps. Type it again to go back.

</details>
