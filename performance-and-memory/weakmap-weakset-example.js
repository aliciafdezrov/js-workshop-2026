// ─── WeakMap & WeakSet demo ───────────────────────────────────────────────────
// Run this file in the browser DevTools console or as a script tag.
// The key difference vs Map/Set: keys must be objects, and the references are
// *weak* — the GC can collect the key object if no other reference holds it,
// and the entry disappears automatically.

// ── 1. WeakMap: private per-object metadata ──────────────────────────────────
// A common use-case: attach hidden data to DOM nodes or class instances
// without preventing them from being garbage-collected.

const _private = new WeakMap();

class Counter {
  constructor(name) {
    // Store private state in the WeakMap keyed by `this`
    _private.set(this, { name, count: 0 });
  }

  increment() {
    const state = _private.get(this);
    state.count += 1;
  }

  toString() {
    const { name, count } = _private.get(this);
    return `${name}: ${count}`;
  }
}

const c1 = new Counter("clicks");
c1.increment();
c1.increment();
console.log("[WeakMap] Counter value:", c1.toString()); // clicks: 2
// The private data lives in _private, not on the object itself.
// Inspecting c1 in DevTools reveals no `count` property.

// ── 2. WeakMap: cache that does not cause memory leaks ────────────────────────
// With a plain Map the DOM node would never be collected because the Map
// holds a strong reference. WeakMap releases the entry automatically.

const cache = new WeakMap();

function expensiveCompute(element) {
  if (cache.has(element)) {
    console.log("[WeakMap] Cache hit for", element.id);
    return cache.get(element);
  }
  const result = { computed: element.id.toUpperCase(), timestamp: Date.now() };
  cache.set(element, result);
  console.log("[WeakMap] Cache miss — computed result for", element.id);
  return result;
}

// Simulate two calls with the same DOM node
const demoNode = document.getElementById("weakmap-demo-box");
if (demoNode) {
  expensiveCompute(demoNode); // miss
  expensiveCompute(demoNode); // hit
}

// ── 3. WeakSet: track "visited" objects without leaking ───────────────────────
// Useful for cycle-detection in serialisation or marking processed items.

const visited = new WeakSet();

function processNode(node) {
  if (visited.has(node)) {
    console.log("[WeakSet] Already processed:", node.id);
    return;
  }
  visited.add(node);
  console.log("[WeakSet] Processing node:", node.id);
}

if (demoNode) {
  processNode(demoNode); // Processing
  processNode(demoNode); // Already processed
}

// ── 4. Difference table (logged to console for reference) ────────────────────
console.table([
  {
    Feature: "Key / value types",
    Map: "any value",
    WeakMap: "object keys only",
    Set: "any value",
    WeakSet: "object values only",
  },
  {
    Feature: "Prevents GC of key",
    Map: "yes (strong ref)",
    WeakMap: "no (weak ref)",
    Set: "yes (strong ref)",
    WeakSet: "no (weak ref)",
  },
  {
    Feature: "Iterable",
    Map: "yes",
    WeakMap: "no",
    Set: "yes",
    WeakSet: "no",
  },
  {
    Feature: ".size property",
    Map: "yes",
    WeakMap: "no",
    Set: "yes",
    WeakSet: "no",
  },
  {
    Feature: "Main use-case",
    Map: "general key→value store",
    WeakMap: "private metadata / cache",
    Set: "unique value collection",
    WeakSet: "object membership tracking",
  },
]);
