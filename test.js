const test = require('node:test');
const assert = require('node:assert/strict');
const { creases, strip } = require('./lib.js');

test('crease pattern matches real paper: one fold = 1 crease, two folds = L L R', () => {
  assert.deepEqual([...creases(1)], [1]);
  assert.deepEqual([...creases(2)], [1, 1, -1]);
  assert.equal(creases(16).length, 65535);
});

test('flat at 0, and at 90 degrees the dragon never retraces an edge', () => {
  const flat = strip(creases(3), 0);
  assert.ok(Math.abs(flat.at(-2) - 8) < 1e-9 && Math.abs(flat.at(-1)) < 1e-9);
  const p = strip(creases(10), Math.PI / 2), edges = new Set();
  for (let i = 0; i + 3 < p.length; i += 2) {
    const a = `${Math.round(p[i])},${Math.round(p[i + 1])}`, b = `${Math.round(p[i + 2])},${Math.round(p[i + 3])}`;
    const key = a < b ? a + '|' + b : b + '|' + a;
    assert.ok(!edges.has(key), 'edge reused: ' + key);
    edges.add(key);
  }
});
