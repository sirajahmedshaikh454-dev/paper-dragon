// Paper-folding math. Classic script (works from file://) and CommonJS (for tests).

// Fold a strip in half n times, the same way each time. Crease i (1-based) bends
// left (+1) or right (-1): take the odd part k of i; k % 4 === 1 means left.
function creases(n) {
  const out = new Int8Array((1 << n) - 1);
  for (let i = 1; i <= out.length; i++) {
    const k = i / (i & -i);
    out[i - 1] = k % 4 === 1 ? 1 : -1;
  }
  return out;
}

// Points of the strip when every crease is opened to `angle` radians
// (0 = flat strip, PI/2 = dragon curve, PI = folded flat).
function strip(turns, angle) {
  const pts = new Float64Array((turns.length + 2) * 2);
  let x = 0, y = 0, dir = 0;
  pts[2] = x = 1;
  for (let i = 0; i < turns.length; i++) {
    dir += turns[i] * angle;
    x += Math.cos(dir); y += Math.sin(dir);
    pts[4 + i * 2] = x; pts[5 + i * 2] = y;
  }
  return pts;
}

if (typeof module !== 'undefined') module.exports = { creases, strip };
