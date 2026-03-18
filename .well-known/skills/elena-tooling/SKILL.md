---
name: elena-tooling
description: Critical rules for the Elena build toolchain. Bundler config, CLI scaffolding, Custom Elements Manifest, SSR with @elenajs/ssr, and TypeScript.
---

# Elena Tooling — Critical Rules

> Full reference: https://getelena.github.io/elena/llms-full.txt
> Page index: https://getelena.github.io/elena/llms.txt

## Bundler

- Run `elena build` from the project root. Reads `elena.config.mjs` (or `elena.config.js`).
- Set `bundle: false` to disable the single-file bundle. Individual component modules are always built regardless.
- Set `analyze: false` to skip Custom Elements Manifest and TypeScript declaration generation entirely.
- The `target` option enables syntax transpilation for older browser support (e.g. `["chrome 71", "safari 12.1"]`). Off by default.
- TypeScript source files are auto-detected — no extra config needed.

## Custom Elements Manifest

- Props without a `@attribute` JSDoc annotation won't appear in `custom-elements.json`.
- Run `elena build` before using `@elenajs/mcp` — the server reads `dist/custom-elements.json`. Without it, component lookup returns errors.

## CLI scaffolding

- `npx elena-create` — interactive prompts for component name, type, props, events, CSS variables, and language (JS/TS/HTML).
- Pass a name directly to skip the name prompt: `npx elena-create my-button`.

## SSR

- Call `register(...components)` before calling `ssr(html)`. Order matters.
- `ssr()` only expands Primitive Components. Composite Components pass through unchanged — they're already SSR-compatible without it.
- The output is a raw HTML string. Serve it as-is; the client bundle hydrates it when JavaScript loads.

## TypeScript

- In `.ts` files, use inline types instead of `@type` JSDoc: `variant: "default" | "primary" = "default"`.
- Keep the `@attribute` JSDoc annotation on each prop — it's still required for the CEM analyzer.
