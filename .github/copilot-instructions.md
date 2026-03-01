# Project Overview

Elena is a lightweight (2kB minified & gzipped) library for building Progressive Web Components. It renders base HTML & CSS first, then progressively enhances with JavaScript. Zero runtime dependencies. Elena is designed to be progressive and modular — it adapts and restructures itself as the project's goals evolve.

## Project Principles

- **Progressive:** Renders HTML and CSS first, hydrates it with JavaScript after.
- **Reliable:** Predictable lifecycle and property syncing with no hidden magic.
- **Interoperable:** Built on web standards; no proprietary abstractions.
- **Modular:** Small, composable pieces you can use independently.
- **Universal:** Works across frameworks, tools, and environments.
- **Lightweight:** 2kB minified & gzipped, zero runtime dependencies.
- **Accessible:** Built on semantic HTML, assistive technologies supported by default.

## Working Style

- **Work asynchronously** — run file creation, updates, backups, and research in the background as much as possible. The user often fires off multiple ideas, TODOs, or topics in quick succession. Don't block them waiting for writes and backups to finish.
- **Confirm briefly, keep moving** — acknowledge what you've captured with a short summary, then be ready for the next input. Don't make the user wait for all the cross-linking and index updates before they can talk again.
- **Batch background work** — when the user gives multiple things at once, process them in parallel using background tasks.
- **Voice your concerns** — User should not have to ask you for your opinion explicitly. Always evaluate what the user is asking you to do, and voice your concerns before proceeding if you don’t think it’s a good idea. If possible, propose a better solution, but you can voice concerns even without one.
- **Always evaluate** — The above applies even to direct requests. Still evaluate whether your original approach was better. The user may be missing important context. If there was a solid reason why you suggested a certain approach (e.g. avoiding code duplication), push back with reasoning instead of silently complying.

## Commands

All commands run from the monorepo root (`elena/`):

```bash
pnpm install              # Install dependencies
pnpm build                # Build all packages (via Lerna)
pnpm test                 # Run all tests (via Lerna)
pnpm lint                 # Lint with ESLint
```

Core package commands (from `packages/core/`):

```bash
pnpm start                # Rollup watch
pnpm build                # Rollup build
pnpm test                 # Vitest with coverage
pnpm test:visual          # Playwright visual regression tests
pnpm test:visual:update   # Update visual test baselines
pnpm bench                # Run performance benchmarks
npx vitest run test/props.test.js   # Run a single test file
```

Components package commands (from `packages/components/`):

```bash
pnpm start                # web-dev-server with live reload
pnpm build                # Build via the elena CLI (from @elenajs/bundler)
```

Bundler package commands (from `packages/bundler/`):

```bash
pnpm build                # Copy src/ to dist/ (no transpilation needed)
pnpm format               # Prettier on all source files
pnpm test                 # Vitest integration tests
```

CLI package commands (from `packages/cli/`):

```bash
npx elena-create          # Interactive component scaffolding
```

SSR package commands (from `packages/ssr/`):

```bash
pnpm test                 # Vitest tests
```

## Monorepo Structure

- **pnpm workspaces** + **Lerna** (independent versioning)
- Node >= 20, pnpm 10.20.0
- Packages:
  - `packages/core/` — `@elenajs/core` main library
  - `packages/components/` — `@elenajs/components` example components
  - `packages/bundler/` — `@elenajs/bundler` build CLI and tooling
  - `packages/plugin-rollup-css/` — `@elenajs/plugin-rollup-css` Rollup plugin
  - `packages/plugin-cem-define/` — `@elenajs/plugin-cem-define` CEM plugin
  - `packages/plugin-cem-tag/` — `@elenajs/plugin-cem-tag` CEM plugin
  - `packages/plugin-cem-typescript/` — `@elenajs/plugin-cem-typescript` CEM plugin
  - `packages/cli/` — `@elenajs/cli` interactive component scaffolding tool
  - `packages/mcp/` — `@elenajs/mcp` MCP server for AI-assisted component development
  - `packages/ssr/` — `@elenajs/ssr` server-side rendering for Primitive Components

## Architecture

The core library (`packages/core/src/`) has five files:

- **`elena.js`** — Factory function `Elena(superclass, options?)` that returns a mixin class. `options` is optional — `Elena(HTMLElement)` is valid. Manages lifecycle (`connectedCallback`, `attributeChangedCallback`, `disconnectedCallback`), and event delegation (`handleEvent`). Adds `hydrated` attribute after first render. Includes a no-op base `render()` so subclasses without one connect safely. `render()` should return an `html` tagged template; the internal `_applyRender()` method calls `render()` and passes the result to `renderTemplate()`.
- **`common/props.js`** — Bidirectional attribute/property sync with type coercion (boolean, number, string, array, object). `setProps()` creates getters/setters, `getProps()` handles attribute changes. `syncAttribute()` sets or removes attributes (null removes). Empty string props are explicitly removed on connect rather than set as empty attributes.
- **`common/events.js`** — `ElenaEvent` extends `Event` with `bubbles: true, composed: true` defaults.
- **`common/utils.js`** — `escapeHtml()` (XSS-safe string escaping), `html` tagged template (auto-escapes interpolated values; nested `html` fragments pass through without double-escaping; returns `{ __raw, strings, values, toString }` so Elena can diff the template), `nothing` (a `__raw` placeholder that renders as an empty string — use it in conditional expressions instead of `""` or `false`), and `defineElement()` (internal registration helper; not exported publicly). Both `html` and `nothing` are exported from `@elenajs/core`.
- **`common/render.js`** — Template rendering: `renderTemplate()` (main entry point with DOM diffing) and `renderHtml()` (renders a markup string via `DocumentFragment`). Re-renders use a fast path (`patchTextNodes`) that updates only changed text nodes; a full rebuild only happens when the template shape changes or raw HTML values change. Cache state (`_tplStrings`, `_tplValues`, `_tplParts`) is stored on the element instance.

The bundler (`packages/bundler/src/`) is a separate package with its own source layout:

- **`cli.js`** — Entry point for the `elena` binary. Loads `elena.config.mjs` (or `elena.config.js`) from the consumer's working directory, then runs Rollup and CEM analysis in sequence.
- **`rollup-build.js`** — Orchestrates two Rollup build passes: (1) individual `.js` modules from all `.js`/`.ts` files in the source directory plus a concatenated `bundle.css`; (2) an optional single-file `bundle.js`. Applies html-template minification, Terser, and size reporting. TypeScript files are transpiled via `@rollup/plugin-typescript` when detected.
- **`cem-analyze.js`** — Generates the Custom Elements Manifest (`custom-elements.json`) and per-component `.d.ts` TypeScript definitions using `@custom-elements-manifest/analyzer`.
- **`utils/load-config.js`** — Loads `elena.config.mjs` / `elena.config.js` and merges with defaults.
- **`utils/color.js`** — ANSI color helper using Elena's brand color (#f19c77) for CLI output.

The build plugins are published as standalone packages (each with `src/index.js` as the sole entry point):

- **`packages/plugin-rollup-css/`** (`@elenajs/plugin-rollup-css`) — Rollup plugin that minifies individual CSS files and optionally concatenates them into a single bundle. Peer dep: `rollup`.
- **`packages/plugin-cem-define/`** (`@elenajs/plugin-cem-define`) — CEM plugin that extracts `tagName` from the options object passed to `Elena()` (supports both inline and variable-reference patterns). Peer dep: `@custom-elements-manifest/analyzer`.
- **`packages/plugin-cem-tag/`** (`@elenajs/plugin-cem-tag`) — CEM plugin that copies custom JSDoc tags (`@status`, `@displayName`) into the CEM class declaration. Peer dep: `@custom-elements-manifest/analyzer`.
- **`packages/plugin-cem-typescript/`** (`@elenajs/plugin-cem-typescript`) — CEM plugin that generates a `.d.ts` file per component with typed props and event handler fields. Peer dep: `@custom-elements-manifest/analyzer`.

The CLI (`packages/cli/src/`) is an interactive scaffolding tool for creating Elena components:

- **`cli.js`** — Entry point for the `elena-create` binary. Displays an ASCII banner, runs interactive prompts, generates source + CSS files, and writes them to disk.
- **`prompts.js`** — Interactive prompts using `@inquirer/prompts`. Validates kebab-case component names, asks for type (primitive/composite), language (JS/TS/HTML), and output directory.
- **`generate.js`** — Template generators for all combinations: primitive/composite × JS/TS/HTML, plus CSS generators for both component types. Converts kebab-case names to PascalCase. Output follows all Elena patterns including JSDoc annotations and `@scope` CSS. HTML language generates a single-file output with `<style>` and `<script>` blocks plus an example usage. A "Code Comments" feature toggle controls whether JSDoc and CSS comments are included in the generated code.
- **`utils/color.js`** — ANSI color helper using Elena's brand color (#f19c77).

The MCP server (`packages/mcp/src/`) provides AI-assisted component development via the Model Context Protocol:

- **`cli.js`** — Entry point for the `elena-mcp` binary. Starts a stdio MCP server pointing at a component project root.
- **`server.js`** — Creates and configures the `McpServer` instance, registers all resources, tools, and prompts.
- **`resources/catalog.js`** — `elena://components` resource returning a JSON array of all components with summary info.
- **`resources/component.js`** — `elena://components/{tagName}` resource template returning full component details (props, events, CSS properties, slots).
- **`resources/patterns.js`** — `elena://patterns` resource returning the Elena component authoring guide.
- **`tools/scaffold.js`** — `scaffold-component` tool that generates JS class + CSS file boilerplate for a new component.
- **`tools/lookup.js`** — `lookup-component` tool that queries component API details from the CEM.
- **`prompts/create.js`** — `create-component` prompt for guided component creation workflows.
- **`prompts/review.js`** — `review-component` prompt for best-practices review of existing components.
- **`lib/cem-loader.js`** — Loads and mtime-caches `custom-elements.json` from the component project's `dist/` directory.
- **`lib/cem-helpers.js`** — Extracts and formats component metadata from the CEM.
- **`lib/patterns-content.js`** — Static markdown content describing Elena authoring patterns.

The SSR package (`packages/ssr/src/`) renders Elena Primitive Components to HTML strings for server-side rendering:

- **`index.js`** — Exports `ssr(html)` and `register(...components)`. Uses `htmlparser2` to parse HTML, walks the tree, expands registered Primitive Components by calling their `render()` method, and preserves Composite Components and plain HTML unchanged.
- **`utils.js`** — `escapeHtml()` for XSS-safe output and `normalizeWhitespace()` to match Elena's client-side rendering whitespace.

**`elena.config.mjs` options** (all optional):

- `input` — Source directory to scan for `.js`, `.ts`, and `.css` files (default: `"src"`).
- `output` — Rollup output options: `dir` (default: `"dist"`), `format` (default: `"esm"`), `sourcemap` (default: `true`).
- `bundle` — Entry point for the single-file bundle (default: `"src/index.js"`; auto-detects `"src/index.ts"` if no `.js` entry exists). Set to `false` to disable.
- `plugins` — Additional Rollup plugins appended after Elena's built-in set.
- `analyze.plugins` — Additional CEM plugins.

**Component pattern:** Extend `Elena(HTMLElement, options)` with a config object (`tagName`, `props`, `events`, `element` selector), set default values in the constructor, implement `render()` returning an `html` tagged template, then call `ClassName.define()` to register. All config keys and `render()` are optional.

**Component types:** Elena has two component categories:

- **Primitive Components** — Self-contained components that own and render their own HTML markup via `render()`. All content is controlled through `props`, nothing is composed into them. Examples: `button`, `input`, `checkbox`, `radio`, `textarea`, `icon`, `spinner`, `switch`.
- **Composite Components** — Components that wrap and enhance the HTML composed inside them, including other components. They have no `render()` method and never touch the light DOM children. Provide styling, layout, and behavior around the composed content. Examples: `stack`, `table`, `layout`, `card`, `banner`, `visually-hidden`, `fieldset`.

**Options object** accepts four keys (all optional):

- `tagName` — Custom element tag name to register (e.g. `"elena-button"`). When set, `ClassName.define()` will register the element using this name.
- `props` — Array of prop names to observe and sync as attributes (e.g. `["variant", "disabled"]`)
- `events` — Array of event names to delegate from the inner element (e.g. `["click", "focus", "blur"]`)
- `element` — Selector for the inner element ref (`this.element`). Resolved at class-definition time: no value → `firstElementChild`; bare identifier (e.g. `"inner"`) → `getElementsByClassName`; any other string → `querySelector`.

**Props** must be listed in `options.props` and given default values in the constructor (e.g. `this.variant = "default"`). Document with JSDoc `@attribute` and `@type` annotations. Supported types: `String`, `Number`, `Boolean`, `Array`, `Object`. String enums use `@type {"a" | "b"}` syntax.

**Text content** — Every Elena element has a built-in reactive `text` property. On first connect, Elena captures the element's `textContent` from the light DOM before rendering. Use `this.text` in `render()` to reference it. Setting `text` programmatically triggers a re-render. For dynamic text in frameworks, use the `text` property instead of children, since Primitive Components own their internal DOM and frameworks cannot update children after Elena has hydrated the element (e.g. `<elena-button text={buttonText} />` in React).

**JSDoc annotations** — Components also support class-level JSDoc for the custom elements manifest: `@displayName`, `@status`, `@event <name> - description`, and `@cssprop [--prop-name] - description`.

**Built-in methods:** `connectedCallback()`, `disconnectedCallback()`, `attributeChangedCallback()`, `render()`, `updated()` (performs a post-update and adds the `hydrated` attribute to the host element). All can be extended via `super`. `render()` must return an `html` tagged template literal (or nothing, for Composite Components).

**Static methods:** `ClassName.define()` — registers the element with SSR guards using the `tagName` from options. Must be called on the final subclass (not the Elena mixin), after the class body is defined.

## TypeScript

Elena is written in vanilla JS with JSDoc annotations. `@elenajs/core` ships its own type declarations (`dist/elena.d.ts`) generated by `tsc` from JSDoc. When building components with `@elenajs/bundler`, running `elena build` generates:

- **Per-component `.d.ts` files** — typed props and event handlers for each component, derived from JSDoc annotations.
- **`custom-elements.json`** — Custom Elements Manifest for IDEs and documentation tools.
- **`custom-elements.d.ts`** — JSX integration types that map custom element tag names to their prop types. Exports a `CustomElements` type map and a `ScopedElements` helper for typed JSX usage (e.g. `<elena-button variant="primary" />` gets autocomplete and type checking).

## Testing

- **Vitest** with **happy-dom** environment
- Config: `packages/core/vitest.config.mjs`
- Setup file `test/setup.js` provides `createElement(tag, attrs)` and `cleanup()` helpers
- **Primitive Component tests:** `primitive.test.js` (behavioral contract), rendering, hydration, lifecycle, events, props, utils, reinsertion — cover components that own and render their own DOM
- **Composite Component tests:** `composite.test.js` — covers components that wrap and enhance composed children without rendering their own template
- Fixtures in `test/fixtures/` define test components covering: basic props, booleans, numbers, objects, events, attribute-position values, class-name selectors, no-element-option, no-props, no-template, no-render, template-only (no options), composite wrapper/child

## Code Style

- Prettier: single quotes off, trailing commas es5, semicolons required, `printWidth: 100`
- ESLint: lenient config, ignores test/dist/coverage dirs
- All source is vanilla JS with JSDoc annotations (no TypeScript)
- ESM modules throughout (`"type": "module"`)
- **`curly: ["error", "all"]`** — Always use braces for `if`, `else`, `for`, `while`, etc. Single-line bodies without braces are **not allowed**:

  ```js
  // Bad
  if (condition) doSomething();
  if (condition)
    doSomething();

  // Good
  if (condition) {
    doSomething();
  }
  ```

## Commit Conventions

Format: `[$category]: Short summary` (max 72 chars, present tense, imperative mood, no trailing period)

Categories: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `revert`

Branch naming: `release/<version>`, `feature/<name>`, `hotfix/<name>`

## CSS Styles

Elena recommends the `@scope` at-rule for component styles. It prevents styles from leaking to the outer page while preserving inheritance and cascading.

### Elena CSS Encapsulation Pattern

While `@scope` prevents component styles from leaking out, it does not prevent global styles from leaking in. Elena recommends combining `@scope` with a universal `all: unset` reset:

```css
/* Scope makes sure styles don't leak out */
@scope (elena-button) {

  /* Unset makes sure styles don't leak in */
  :scope, *, *::before, *::after {
    all: unset;
  }

  /* Rest of your component styles */
}
```

### Scoped styles (recommended)

Full baseline pattern for a **Primitive Component**:

```css
/* Scope makes sure styles don't leak out */
@scope (elena-button) {

  /* Unset makes sure styles don't leak in */
  :scope, *, *::before, *::after {
    all: unset;
  }

  /* Targets the host element (elena-button) */
  :scope {
    --elena-button-font: sans-serif;
    --elena-button-text: white;
    --elena-button-bg: blue;

    display: inline-block;
  }

  :scope:not([hydrated]),
  button {
    font-family: var(--elena-button-font);
    color: var(--elena-button-text);
    background: var(--elena-button-bg);
    display: inline-block;
    appearance: none;
  }

  button {
    display: inline-flex;
  }

  :scope[variant="primary"] {
    --elena-button-bg: red;
  }
}
```

Key rules:

- `:scope` targets the host element defined by `@scope (elena-tag)`.
- The encapsulation reset (`:scope, *, *::before, *::after { all: unset; }`) prevents global styles from leaking in. Place it as the first rule inside `@scope`.
- Style both `:scope:not([hydrated])` and the inner element with the same baseline styles so the component looks the same before and after hydration.
- Use attribute selectors on `:scope` for variant/state styling (e.g. `:scope[variant="primary"]`, `:scope[disabled]`).
- Define public CSS custom properties on `:scope` for theming.

### Styles without `@scope` (legacy)

For older browsers, use namespaced selectors and the `:is()` pattern instead:

```css
/* Unset makes sure styles don't leak in */
elena-button,
elena-button *,
elena-button *::before,
elena-button *::after {
  all: unset;
}

elena-button { display: inline-block; }
:is(elena-button:not([hydrated]), .elena-button) { /* shared styles */ }
elena-button[variant="primary"] { /* variant */ }
```

### Pre-hydration pseudo-elements

For better SSR support in Primitive Components, use CSS pseudo-elements referencing host attributes:

```css
:scope:not([hydrated])::before { content: attr(label); }
:scope:not([hydrated])::after { content: attr(placeholder); }
```

### Composite Component CSS

Composite Components only style the host — no inner element or hydration concerns:

```css
/* Scope makes sure styles don't leak out */
@scope (elena-stack) {

  /* Unset makes sure styles don't leak in */
  :scope, *, *::before, *::after {
    all: unset;
  }

  :scope {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  :scope[direction="row"] { flex-direction: row; }
}
```

### Documenting CSS custom properties

Use `@cssprop` JSDoc on the component class. `@elenajs/bundler` transforms these into the Custom Elements Manifest:

```js
/**
 * @cssprop [--elena-button-text] - Overrides the default text color.
 * @cssprop [--elena-button-bg] - Overrides the default background color.
 */
```

## Known Issues

### Browser Compatibility

- Firefox 148 has an open issue regarding CSS `@scope` and `attr[value]` selector. This is already fixed in the pre-release build.

## Async Loading

Elena elements can be loaded asynchronously. Props can be set before initialization, but methods require waiting for `customElements.whenDefined("tag-name")` before calling.

## Framework Compatibility

Elena has two types of components with different framework integration rules:

**Primitive Components** (e.g. `button`, `input`) render their own internal DOM via `render()`. Frameworks must treat these as leaf nodes — the framework renders the custom element host, Elena owns everything inside it via `replaceChildren()`.

**Composite Components** (e.g. `stack`, `card`) wrap and enhance composed children. The framework renders both the wrapper and its children; Elena only manages props/attributes on the host without touching the light DOM children. Composite Components are safe to compose just like any HTML container element.

**General rules for Primitive Components in any framework:**

- Never render a framework component _inside_ a Primitive Component. Elena calls `replaceChildren()` on render, which destroys the framework's component tree and causes DOM corruption.
- Avoid the framework and Elena both mutating the same attribute on a Primitive Component — the framework's reconciler would overwrite Elena's changes on next reconcile, triggering many re-renders.
- Treat framework-controlled props as read-only inputs inside `render()`. Elena communicates back via events, the framework updates state.
- For dynamic text, use the `text` property instead of children (e.g. `<elena-button text={buttonText} />` in React, `<elena-button [text]="buttonText">` in Angular), since Primitive Components own their internal DOM and frameworks cannot update children after Elena has hydrated the element.

**React-specific:**

- React sets attributes → `attributeChangedCallback` → Elena re-renders internally ✓
- React adds/removes Elena elements → `connected/disconnectedCallback` fires ✓
- React StrictMode double-mount is handled correctly ✓
- React 17 SSR hydration + Elena can conflict: Elena's `connectedCallback` fires `replaceChildren()` while React is reconciling its hydration tree, causing mismatch errors. Use React 18+ or ensure Elena elements render only client-side.

**React 17 note:** React 17 does not pass non-primitive props (arrays, objects) or event handlers to web components correctly. Use React 18+ for proper web component support, or pass all props as string attributes.
