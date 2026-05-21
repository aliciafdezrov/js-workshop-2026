# Agents.md — taller-js

Workshop repository teaching JavaScript fundamentals to colleagues who have
little JavaScript experience. Each top-level folder is a self-contained
lesson with an `index.html`, a `styles.css`, and one or more `*.js` example
files.

## Lessons (folders)

- `async-and-concurrency/` — event loop, callbacks, promises, async/await.
- `functions-and-prototypes/` — functions, `this`, prototypes, classes.
- `performance-and-memory/` — Critical Rendering Path, V8 memory model,
  Garbage Collection, Reflow vs Repaint, DOM batching, WeakMap/WeakSet.

## Audience and tone

- Readers know **little JavaScript**. Avoid jargon unless you define it on
  the spot.
- Workshop materials are written in **English** (even though the repo's
  `<html lang="es">` is Spanish — the prose is English).
- Prefer short paragraphs, concrete examples, and a friendly explanatory
  tone. Use `<strong>` for the key term and `<em>` for soft emphasis, as the
  existing pages already do.
- Each concept should answer: *what is it*, *why does it matter*, and *how
  do I use it in practice*.

## Conventions

- HTML lessons follow a two-column layout: an event-log aside on the left
  and a list of `<section class="card">` blocks on the right.
- Example scripts are intentionally **simple and verbose** for teaching
  (see `performance-and-memory/crp-example.js` as the reference style):
  numbered comments, `addLog(...)` helper, no build tooling.
- Scripts are loaded with plain `<script src="...">` tags at the bottom of
  `<body>` — no bundler, no modules, no framework.
- Resource links live in a `Linkografía` card at the end of each page.

## When extending a lesson

1. Match the existing card structure and headings (`<h2>` for the topic,
   `<h4>` for sub-sections).
2. Keep code samples runnable by opening `index.html` directly in a browser.
3. If you introduce a new concept, add a short "Rule of thumb for
   beginners" paragraph so readers walk away with one actionable takeaway.
