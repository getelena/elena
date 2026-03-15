---
sidebar: false
---

# API Reference

## `@elenajs/core`

| Export | Signature | Description |
|--------|-----------|-------------|
| `Elena` | `Elena(superClass)` | Creates an Elena component base class. Pass in `HTMLElement` to get started. Configure the component using static [component options](#component-options) on the returned class. |
| `ElenaEvent` | `new ElenaEvent(type, init?)` | Extends the native `Event` with `bubbles: true` and `composed: true` already set. Use this to fire custom events from inside a component. |

### Template Utilities

| Export | Signature | Description |
|--------|-----------|-------------|
| `html` | `` html`...` `` | Write your component’s HTML as a template literal. Values you interpolate are escaped automatically to prevent XSS. Nested `html` fragments are passed through as-is. Return this from `render()`. |
| `nothing` | `nothing` | Use this in conditional expressions when you want to render nothing. Safer than `""` or `false`, which can produce unexpected output. |
| `unsafeHTML` | `unsafeHTML(str)` | Renders a plain string as raw HTML, skipping automatic escaping. Only use this for content you fully control. |

### Component Options

| Field | Type | Description |
|-------|------|-------------|
| `tagName` | `string` | The HTML tag name for this component (e.g. `"elena-button"`). Required for `define()` to register the element. |
| `props` | `(string \| { name: string, reflect?: boolean })[]` | The list of props this component accepts. Each prop stays in sync with its matching HTML attribute. Use `{ name, reflect: false }` to keep a prop JS-only without writing it back to the attribute. |
| `events` | `string[]` | Events to forward from the inner element up to the host (e.g. `["click", "focus", "blur"]`). |
| `element` | `string` | A CSS selector for the inner element that `this.element` points to (e.g. `".inner"`, `"button"`). Defaults to the first child element when omitted. |
| `shadow` | `"open" \| "closed"` | Attaches a shadow root to the host element. Elena renders into the shadow root instead of the host. |
| `styles` | `CSSStyleSheet \| string \| (CSSStyleSheet \| string)[]` | One or more stylesheets to adopt into the shadow root. Only applies when `shadow` is also set. |

### Host Attributes

Attributes that Elena adds to the host element automatically. These are not JS properties, they appear in the DOM and can be targeted in CSS.

| Attribute | Description |
|-----------|-------------|
| `hydrated` | Added to the host element after the first render completes. Use `:not([hydrated])` in CSS to style the element before JavaScript runs, and remove those styles once it hydrates. |

### Instance Properties

| Property | Type | Description |
|----------|------|-------------|
| `text` | `string` | The text content of the element. Elena reads this from the element’s children before the first render. Setting it later triggers a re-render. When you need to dynamically update this, pass text via a property instead of children. |
| `element` | `HTMLElement \| null` | A reference to the inner element, resolved after the first render using the `element` option. |

### Lifecycle Methods

| Method | Description |
|--------|-------------|
| `connectedCallback()` | Runs when the element is added to the page. Sets up props, captures text content, renders, and wires up events. |
| `willUpdate()` | Runs before every render, including the first. Override to compute derived state before the template evaluates. |
| `render()` | Returns the HTML for this component as an `html` template. Called on connect and whenever the component needs re-rendering. Omit this method entirely for components that don’t render their own HTML. |
| `firstUpdated()` | Runs once after the first render. `this.element` is available here. Override to run one-time setup that requires the DOM. |
| `updated()` | Runs after every render, including the first. `this.element` is available here. Override to react to changes after the DOM is updated. On first connect, `firstUpdated()` runs before `updated()`. |
| `requestUpdate()` | Manually schedules a re-render. Use when Elena can’t detect a change automatically, e.g. when mutating an object or array in place. Returns nothing, use `updateComplete` to wait for the render to finish. |
| `disconnectedCallback()` | Runs when the element is removed from the page. Cleans up event listeners. |
| `attributeChangedCallback()` | Runs when an observed attribute changes. Updates the matching JS property and triggers a re-render. |

### Instance Promises

| Property | Type | Description |
|----------|------|-------------|
| `updateComplete` | `Promise<void>` | Resolves after the next pending render finishes. Use it to wait for the DOM to settle before reading it. Resolves immediately if no render is pending. |

### Static Methods

| Method | Description |
|--------|-------------|
| `ClassName.define()` | Registers the component with the browser using `tagName` option. Call this once after defining your class. Does nothing in non-browser environments. |
| `ClassName.observedAttributes` | The list of attributes the browser should watch for changes, built from `props` option plus the built-in `text` attribute. |

### Error Codes

| Error | Explanation |
|---------|-------------|
| <code style="white-space:nowrap;">"text" is reserved.</code> | You included `"text"` in `static props`. Elena manages `text` as a built-in reactive property, remove it from the props array to fix the error. |
| <code style="white-space:nowrap;">define() without a tagName.</code> | `ClassName.define()` was called but `static tagName` is not set on the class. Add a `static tagName` before calling `define()`. |
| `Element not found.` | The CSS selector in `static element` did not match any element in the rendered output. Check that the selector is correct and that `render()` produces a matching element. |
| `Cannot add events.` | `static events` is set but no inner element reference could be resolved. Either add a `render()` that produces an inner element, or check your `static element` selector. |
| <code style="white-space:nowrap;">Prop "&lt;name&gt;" has no default.</code> | An attribute changed for a prop that has no corresponding instance field default. Add a default value (e.g. `myProp = ""`) to the component class body. |
| `Invalid JSON: <value>` | An `Array` or `Object` prop received an attribute value that could not be parsed as JSON. Check that the attribute value is valid JSON. The prop will be set to `null`. |
| `Cannot sync attrs.` | `syncAttribute()` was called with a null element reference. This usually means the inner element was not found before attribute sync ran. Check your `static element` selector. |

## `@elenajs/bundler`

### Commands

```bash
elena build
```

### `elena.config.mjs` Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `input` | `string` | `"src"` | The folder containing your component source files. |
| `output.dir` | `string` | `"dist"` | Where to write the compiled output. |
| `output.format` | `string` | `"esm"` | JavaScript module format for the output files. |
| `output.sourcemap` | `boolean` | `true` | Whether to generate source maps alongside the output. |
| `bundle` | `string \| false` | `"src/index.js"` | Entry point for a single combined output file. Elena will look for `src/index.ts` automatically if no `.js` file is found. Set to `false` to skip the bundle entirely. |
| `plugins` | `Plugin[]` | `[]` | Extra Rollup plugins to include in the build, added after Elena’s built-in ones. |
| `analyze.plugins` | `Plugin[]` | `[]` | Extra plugins for the Custom Elements Manifest generation step. |
| `target` | `string \| string[] \| false` | `false` | Browserslist target(s) for transpilation. When set, enables syntax transforms (e.g. class fields, optional chaining) via `@babel/preset-env` to widen browser support. Example: `["chrome 71", "firefox 69", "safari 12.1"]`. |

## `@elenajs/cli`

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

## `@elenajs/ssr`

| Export | Signature | Description |
|--------|-----------|-------------|
| `register` | `register(...components)` | Tell the SSR renderer which component classes to expand. Each class must have `tagName` option set. Call this before `ssr()`. |
| `ssr` | `ssr(html)` | Takes an HTML string, expands any registered components into full HTML, and returns the result. The rest of the HTML tags are left as-is. |

## `@elenajs/mcp`

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

## `@elenajs/plugin-rollup-css`

| Export | Signature | Description |
|--------|-----------|-------------|
| `cssPlugin` | `cssPlugin(srcDir)` | Copies and minifies each `.css` file from `srcDir` into the output folder as individual files. |
| `cssBundlePlugin` | `cssBundlePlugin(srcDir, fileName)` | Combines all `.css` files from `srcDir` into a single minified file named `fileName`. CSS files resolved by `cssModuleScriptPlugin` are automatically excluded. |
| `cssModuleScriptPlugin` | `cssModuleScriptPlugin()` | Handles CSS Module Script imports (`with { type: "css" }`). Reads and minifies the CSS file, then returns a JS module that constructs and exports a `CSSStyleSheet` for Shadow DOM adoption. |
| `cssStaticStylesPlugin` | `cssStaticStylesPlugin()` | Finds `static styles` class fields with template literal values and minifies the CSS inside them. |
| `minifyCss` | `minifyCss(css, filename?)` | Minifies a CSS string using Lightning CSS. |

## `@elenajs/plugin-cem-define`

| Export | Signature | Description |
|--------|-----------|-------------|
| `elenaDefinePlugin` | `elenaDefinePlugin()` | CEM plugin that reads `tagName` option from each Elena component class and registers it in the Custom Elements Manifest. |

## `@elenajs/plugin-cem-tag`

| Export | Signature | Description |
|--------|-----------|-------------|
| `elenaTagPlugin` | `elenaTagPlugin(jsdocTag)` | CEM plugin that copies a custom JSDoc tag from each component’s documentation comment into the Custom Elements Manifest. `jsdocTag` is the tag name without the `@` (e.g. `"status"` for `@status`, `"displayName"` for `@displayName`). Call it once per tag you want to extract. |

## `@elenajs/plugin-cem-typescript`

| Export | Signature | Description |
|--------|-----------|-------------|
| `elenaTypeScriptPlugin` | `elenaTypeScriptPlugin(options?)` | CEM plugin that generates a `.d.ts` type file for each component (e.g. `button.d.ts` alongside `button.js`), including typed props and event handler fields. Also adds the built-in `text` prop to every component’s type. |

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `outdir` | `string` | `"dist"` | Where to write the generated `.d.ts` TypeScript types. |
