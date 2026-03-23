---
sidebar: false
title: API Reference
description: Full API reference for all Elena packages including @elenajs/core, @elenajs/bundler, @elenajs/cli, @elenajs/ssr, and CEM plugins.
---

# API Reference

## `@elenajs/core` <Badge type="warning" text="Pre-release" />

| Export | Signature | Description |
|--------|-----------|-------------|
| `Elena` | `Elena(superClass)` | Creates an Elena component base class. Pass in `HTMLElement` to get started. Configure the component using static [component options](#component-options) on the returned class. |

### Template utilities

| Export | Signature | Description |
|--------|-----------|-------------|
| `html` | `` html`...` `` | Write your component’s HTML as a template literal. Values you interpolate are escaped automatically to prevent XSS. Nested `html` fragments are passed through as-is. Return this from `render()`. |
| `nothing` | `nothing` | Use this in conditional expressions when you want to render nothing. Safer than `""` or `false`, which can produce unexpected output. |
| `unsafeHTML` | `unsafeHTML(str)` | Renders a plain string as raw HTML, skipping automatic escaping. Only use this for content you fully control. |

### Component options

| Field | Type | Description |
|-------|------|-------------|
| `tagName` | `string` | The HTML tag name for this component (e.g. `"elena-button"`). Required for `define()` to register the element. |
| `props` | `(string \| { name: string, reflect?: boolean })[]` | The list of props this component accepts. Each prop stays in sync with its matching HTML attribute. Use `{ name, reflect: false }` to keep a prop JS-only without writing it back to the attribute. |
| `events` | `string[]` | Events to forward from the inner element up to the host (e.g. `["click", "focus", "blur"]`). |
| `element` | `string` | A CSS selector for the inner element that `this.element` points to (e.g. `".inner"`, `"button"`). Defaults to the first child element when omitted. |
| `shadow` | `"open" \| "closed"` | Attaches a shadow root to the host element. Elena renders into the shadow root instead of the host. |
| `styles` | `CSSStyleSheet \| string \| (CSSStyleSheet \| string)[]` | One or more stylesheets to adopt into the shadow root. Only applies when `shadow` is also set. |

### Host attributes

Attributes that Elena adds to the host element automatically. These are not JS properties, they appear in the DOM and can be targeted in CSS.

| Attribute | Description |
|-----------|-------------|
| `hydrated` | Added to the host element after the first render completes. Use `:not([hydrated])` in CSS to style the element before JavaScript runs, and remove those styles once it hydrates. |

### Instance properties

| Property | Type | Description |
|----------|------|-------------|
| `text` | `string` | The text content of the element. Elena reads this from the element’s children before the first render. Setting it later triggers a re-render. When you need to dynamically update this, pass text via a property instead of children. |
| `element` | `HTMLElement \| null` | A reference to the inner element, resolved after the first render using the `element` option. |

### Lifecycle methods

| Method | Description |
|--------|-------------|
| `connectedCallback()` | Runs when the element is added to the page. Sets up props, captures text content, renders, and wires up events. |
| `willUpdate()` | Runs before every render, including the first. Override to compute derived state before the template evaluates. |
| `render()` | Returns the HTML for this component as an `html` template. Called on connect and whenever the component needs re-rendering. Omit this method entirely for components that don’t render their own HTML. |
| `firstUpdated()` | Runs once after the first render. `this.element` is available here. Override to run one-time setup that requires the DOM. |
| `updated()` | Runs after every render, including the first. `this.element` is available here. Override to react to changes after the DOM is updated. On first connect, `firstUpdated()` runs before `updated()`. |
| `requestUpdate()` | Manually schedules a re-render. Use when Elena can’t detect a change automatically, e.g. when mutating an object or array in place. Returns nothing, use `updateComplete` to wait for the render to finish. |
| `disconnectedCallback()` | Runs when the element is removed from the page. Cleans up event listeners. |
| `adoptedCallback()` | Runs when the element is moved to a new document via `document.adoptNode()`. Override to react to document changes. |
| `attributeChangedCallback()` | Runs when an observed attribute changes. Updates the matching JS property and triggers a re-render. |

### Instance promises

| Property | Type | Description |
|----------|------|-------------|
| `updateComplete` | `Promise<void>` | Resolves after the next pending render finishes. Use it to wait for the DOM to settle before reading it. Resolves immediately if no render is pending. |

### Static methods

| Method | Description |
|--------|-------------|
| `ClassName.define()` | Registers the component with the browser using `tagName` option. Call this once after defining your class. Does nothing in non-browser environments. |
| `ClassName.observedAttributes` | The list of attributes the browser should watch for changes, built from `props` option plus the built-in `text` attribute. |

### Error codes

| Error | Explanation |
|---------|-------------|
| <code style="white-space:nowrap;">"text" is reserved.</code> | You included `"text"` in `static props`. Elena manages `text` as a built-in reactive property, remove it from the props array to fix the error. |
| <code style="white-space:nowrap;">define() without a tagName.</code> | `ClassName.define()` was called but `static tagName` is not set on the class. Add a `static tagName` before calling `define()`. |
| `Element not found.` | The CSS selector in `static element` did not match any element in the rendered output. Check that the selector is correct and that `render()` produces a matching element. |
| `Cannot add events.` | `static events` is set but no inner element reference could be resolved. Either add a `render()` that produces an inner element, or check your `static element` selector. |
| <code style="white-space:nowrap;">Prop "&lt;name&gt;" has no default.</code> | An attribute changed for a prop that has no corresponding instance field default. Add a default value (e.g. `myProp = ""`) to the component class body. |
| `Invalid JSON: <value>` | An `Array` or `Object` prop received an attribute value that could not be parsed as JSON. Check that the attribute value is valid JSON. The prop will be set to `null`. |
| `Cannot sync attrs.` | `syncAttribute()` was called with a null element reference. This usually means the inner element was not found before attribute sync ran. Check your `static element` selector. |

## `@elenajs/bundler` <Badge type="warning" text="Pre-release" />

### Commands

```bash
elena build
elena watch
```

### CLI flags

| Flag | Description |
|------|-------------|
| `--config <path>` | Path to a config file. Defaults to `elena.config.mjs` or `elena.config.js` in the project root. |

### `elena.config.mjs` options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `input` | `string` | `"src"` | The folder containing your component source files. |
| `output.dir` | `string` | `"dist"` | Where to write the compiled output. |
| `output.format` | `string` | `"esm"` | JavaScript module format for the output files. |
| `output.sourcemap` | `boolean` | `true` | Whether to generate source maps alongside the output. |
| `bundle` | `string \| false` | `"src/index.js"` | Entry point for a single combined output file. Elena will look for `src/index.ts` automatically if no `.js` file is found. Set to `false` to skip the bundle entirely. |
| `plugins` | `Plugin[]` | `[]` | Extra Rollup plugins to include in the build, added after Elena’s built-in ones. |
| `analyze` | `object \| false` | `{ plugins: [] }` | CEM analysis options. Set to `false` to skip Custom Elements Manifest generation, TypeScript declarations, and JSX types entirely. |
| `analyze.plugins` | `Plugin[]` | `[]` | Extra plugins for the Custom Elements Manifest generation step. |
| `target` | `string \| string[] \| false` | `false` | Browserslist target(s) for transpilation. When set, enables syntax transforms (e.g. class fields, optional chaining) via `@babel/preset-env` to widen browser support. Example: `["chrome 71", "firefox 69", "safari 12.1"]`. |
| `terser` | `object` | `{ ecma: 2020, module: true }` | Custom Terser minifier options, merged with the defaults. |

### Error codes

| Error | Explanation |
|---------|-------------|
| <code style="white-space:nowrap;">Unknown command: &lt;command&gt;.</code> | You ran `elena <command>` with an unrecognized command. The CLI only accepts `elena build` or `elena watch`. |
| <code style="white-space:nowrap;">Config file not found: &lt;path&gt;.</code> | The `--config` flag points to a file that does not exist. Check the path and try again. |
| <code style="white-space:nowrap;">Found "elena.config&lt;ext&gt;" but only .mjs and .js are supported.</code> | Elena found a config file with an unsupported extension (e.g. `.ts`, `.json`, `.cjs`). Rename it to `elena.config.mjs` or `elena.config.js`. |
| <code style="white-space:nowrap;">Unknown config option "&lt;key&gt;".</code> | Your config file contains an unrecognized option. Check for typos. Valid options are: `input`, `output`, `bundle`, `plugins`, `analyze`, `target`, `terser`. |
| <code style="white-space:nowrap;">Invalid config: "&lt;option&gt;" must be &lt;type&gt;.</code> | A config option has the wrong type. The error message tells you which option and what type it expects. See the [config options](#elena-config-mjs-options) table for correct types. |
| <code style="white-space:nowrap;">Input directory "&lt;dir&gt;" does not exist.</code> | The `input` directory (default `"src"`) was not found. Make sure it exists, or set the `input` option to the correct path. |
| <code style="white-space:nowrap;">Bundle entry "&lt;path&gt;" does not exist.</code> | The `bundle` entry point (default `"src/index.js"`) was not found. Create the file, or set `bundle` to `false` to skip bundling. |
| `Build error:` | Rollup encountered an error during a `watch` rebuild. The underlying error is logged directly after this message. |

## `@elenajs/cli` <Badge type="warning" text="Pre-release" />

```bash
npx elena-create
```

Starts an interactive prompt that walks you through creating a new Elena component. No flags needed, it asks you everything it needs:

| Prompt | Options |
|--------|---------|
| Component name | Any valid kebab-case custom element name (e.g. `my-button`) |
| Component features | Props, events, methods, CSS custom properties, encapsulation reset, SSR, and code comments (each optional) |
| Language | JavaScript, TypeScript, or single-file HTML |
| Output directory | Where to write the generated files |

The generated files follow all Elena authoring patterns, including JSDoc annotations and `@scope` CSS.

## `@elenajs/ssr` <Badge type="danger" text="Experimental" />

| Export | Signature | Description |
|--------|-----------|-------------|
| `register` | `register(...components)` | Tell the SSR renderer which component classes to expand. Each class must have `tagName` option set. Call this before `ssr()`. |
| `unregister` | `unregister(...components)` | Remove previously registered component classes from the SSR registry. |
| `clear` | `clear()` | Remove all registered component classes from the SSR registry at once. |
| `ssr` | `ssr(html)` | Takes an HTML string, expands any registered components into full HTML, and returns the result. Full HTML documents (including `<!DOCTYPE>`) are supported. |

## `@elenajs/plugin-rollup-css` <Badge type="warning" text="Pre-release" />

| Export | Signature | Description |
|--------|-----------|-------------|
| `cssPlugin` | `cssPlugin(srcDir)` | Copies and minifies each `.css` file from `srcDir` into the output folder as individual files. |
| `cssBundlePlugin` | `cssBundlePlugin(srcDir, fileName)` | Combines all `.css` files from `srcDir` into a single minified file named `fileName`. CSS files resolved by `cssModuleScriptPlugin` are automatically excluded. |
| `cssModuleScriptPlugin` | `cssModuleScriptPlugin()` | Handles CSS Module Script imports (`with { type: "css" }`). Reads and minifies the CSS file, then returns a JS module that constructs and exports a `CSSStyleSheet` for Shadow DOM adoption. |
| `cssStaticStylesPlugin` | `cssStaticStylesPlugin()` | Finds `static styles` class fields with template literal values and minifies the CSS inside them. |
| `minifyCss` | `minifyCss(css, filename?)` | Minifies a CSS string using Lightning CSS. |

## `@elenajs/plugin-cem-define` <Badge type="warning" text="Pre-release" />

| Export | Signature | Description |
|--------|-----------|-------------|
| `elenaDefinePlugin` | `elenaDefinePlugin()` | CEM plugin that reads `tagName` option from each Elena component class and registers it in the Custom Elements Manifest. |

## `@elenajs/plugin-cem-prop` <Badge type="warning" text="Pre-release" />

| Export | Signature | Description |
|--------|-----------|-------------|
| `elenaPropPlugin` | `elenaPropPlugin()` | CEM plugin that reads `@property` or `@prop` JSDoc tags from component class fields and creates corresponding `attributes` entries in the Custom Elements Manifest. |

## `@elenajs/plugin-cem-tag` <Badge type="warning" text="Pre-release" />

| Export | Signature | Description |
|--------|-----------|-------------|
| `elenaTagPlugin` | `elenaTagPlugin(jsdocTag)` | CEM plugin that copies a custom JSDoc tag from each component’s documentation comment into the Custom Elements Manifest. `jsdocTag` is the tag name without the `@` (e.g. `"status"` for `@status`, `"displayName"` for `@displayName`). Call it once per tag you want to extract. |

## `@elenajs/plugin-cem-typescript` <Badge type="warning" text="Pre-release" />

| Export | Signature | Description |
|--------|-----------|-------------|
| `elenaTypeScriptPlugin` | `elenaTypeScriptPlugin(options?)` | CEM plugin that generates a `.d.ts` type file for each component (e.g. `button.d.ts` alongside `button.js`), including typed props and event handler fields. Also adds the built-in `text` prop to every component’s type. |

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `outdir` | `string` | `"dist"` | Where to write the generated `.d.ts` TypeScript types. |

## `@elenajs/mcp` <Badge type="danger" text="Experimental" />

### Commands

```bash
elena-mcp <project-root>
```

### Resources

| Resource URI | Description |
|--------------|-------------|
| `elena://components` | A list of all components with their name, description, and status. |
| `elena://components/{tagName}` | Full details for one component: props, events, CSS custom properties, and slots. |
| `elena://patterns` | The Elena component authoring guide. |
| `elena://frameworks` | Framework integration guide (React, Vue, Angular, Svelte, Next.js, Eleventy, plain HTML). |
| `elena://ssr` | Server-side rendering guide and `@elenajs/ssr` API reference. |
| `elena://api` | Full API reference for all Elena packages. |

### Tools

| Tool | Description |
|------|-------------|
| `scaffold-component` | Generates a starter JS class and CSS file for a new component. |
| `lookup-component` | Looks up a component’s API from the Custom Elements Manifest. |
| `get-patterns` | Returns the Elena component authoring guide. |
| `get-api-reference` | Returns the full API reference for all Elena packages. |
| `get-frameworks-guide` | Returns the framework integration guide. |
| `get-ssr-guide` | Returns the SSR guide and `@elenajs/ssr` API reference. |

### Prompts

| Prompt | Description |
|--------|-------------|
| `create-component` | A guided prompt for creating a new Elena component. |
| `review-component` | A guided prompt for reviewing a component against Elena best practices. |