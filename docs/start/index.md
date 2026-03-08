# Quick start

The fastest way to get started is to include the following directly into your webpage:

```html
<script type="module">
  import { Elena, html } from "https://unpkg.com/@elenajs/core";

  class MyGreeting extends Elena(HTMLElement) {
    static tagName = "my-greeting";
    static props = ["name"];

    name = "Somebody";

    render() {
      return html`<p>Hello, ${this.name}!</p>`;
    }
  }

  MyGreeting.define();
</script>

<!-- Use it anywhere on the page: -->
<my-greeting name="World"></my-greeting>
```

> [!WARNING]
> This relies on the unpkg CDN and is not recommended for production. For production use, install `@elenajs/core` locally and bundle your components with `@elenajs/bundler`.

## Installation

Before moving further, please make sure you have Node.js installed. You can install the latest version through [their website](https://nodejs.org/en) or by following the [guidelines here](https://nodejs.org/en/download).

If you’re planning on using Elena in a project that doesn’t yet use Node Package Manager, you will have to first create a `package.json` file. To do this, run `npm init` and follow the steps provided. Once finished, you can continue by following the instructions below.

To install Elena as a dependency in your project, run:

::: code-group

```sh [npm]
npm install @elenajs/core
```

```sh [yarn]
yarn add @elenajs/core
```

```sh [pnpm]
pnpm add @elenajs/core
```

:::

Then import Elena in your component files:

```js
import { Elena } from "@elenajs/core";
```

## Building your first component

Elena has two component types:

- **[Composite Components](/components/terminology):** wrap and enhance the HTML composed inside them, including other components. No `render()` method. Full SSR support out of the box.
- **[Primitive Components](/components/terminology):** self-contained components that own and render their own HTML markup. Require a `render()` method returning an `html` tagged template. Partial SSR support out of the box without `@elenajs/ssr`.

### 1. Composite Component

A [Composite Component](/components/terminology) wraps whatever HTML is composed inside it and applies styling and behavior around it. It has no `render()` method and never touches its children.

::: code-group

```ts [TypeScript]
import { Elena } from "@elenajs/core";

export default class Stack extends Elena(HTMLElement) {
  static tagName = "my-stack";
  static props = ["direction"];

  direction: "column" | "row" = "column";
}

Stack.define();
```

```js [JavaScript]
import { Elena } from "@elenajs/core";

export default class Stack extends Elena(HTMLElement) {
  static tagName = "my-stack";
  static props = ["direction"];

  direction = "column";
}

Stack.define();
```

```css [Styles]
@scope (my-stack) {
  :scope {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-flow: column wrap;
    flex-direction: column;
    gap: 0.5rem;
  }

  :scope[direction="row"] {
    flex-direction: row;
  }
}
```

:::

#### Usage

```html
<my-stack direction="row">
  <div>First</div>
  <div>Second</div>
  <div>Third</div>
</my-stack>
```

### 2. Primitive Component

A [Primitive Component](/components/terminology) owns and renders its own HTML markup via `render()` method. Two things to know to get started:

- **`html`** is Elena’s tagged template function. It auto-escapes interpolated values to prevent XSS, and nested `html` fragments pass through without double-escaping.
- **`this.text`** is a built-in reactive property. Elena captures any text content placed inside the element before hydration, so you can pass text as a child node or set it as a property.

::: code-group

```ts [TypeScript]
import { Elena, html } from "@elenajs/core";

export default class Button extends Elena(HTMLElement) {
  static tagName = "my-button";
  static props = ["variant"];

  variant: "default" | "primary" | "danger" = "default";

  render() {
    return html`
      <button class="my-button">
        ${this.text}
      </button>
    `;
  }
}

Button.define();
```

```js [JavaScript]
import { Elena, html } from "@elenajs/core";

export default class Button extends Elena(HTMLElement) {
  static tagName = "my-button";
  static props = ["variant"];

  variant = "default";

  render() {
    return html`
      <button class="my-button">
        ${this.text}
      </button>
    `;
  }
}

Button.define();
```

```css [Styles]
@scope (my-button) {
  :scope,
  *:where(:not(img, svg):not(svg *)),
  *::before,
  *::after {
    all: unset;
    display: revert;
  }

  :scope {
    --my-button-bg: pink;
    display: inline-block;
  }

  :scope:not([hydrated]),
  .my-button {
    background: var(--my-button-bg);
    display: inline-flex;
  }

  :scope[variant="primary"] {
    --my-button-bg: green;
  }

  :scope[variant="danger"] {
    --my-button-bg: red;
  }
}
```

:::

#### Usage

```html
<my-button variant="primary">Save</my-button>
<my-button>Cancel</my-button>
```

## Usage with frameworks

Elena components are standard custom elements and work in any framework. Import and define your component once, then use it like any HTML element:

::: code-group

```html [HTML]
<script type="module" src="my-design-system"></script>

<my-stack direction="row">
  <my-button variant="primary">Save</my-button>
  <my-button>Cancel</my-button>
</my-stack>
```

```tsx [React]
import "my-design-system";

export default function App() {
  return (
    <my-stack direction="row">
      <my-button variant="primary">Save</my-button>
      <my-button>Cancel</my-button>
    </my-stack>
  );
}
```

```tsx [Next.js]
import "my-design-system";

export default function App() {
  return (
    <my-stack direction="row">
      <my-button variant="primary">Save</my-button>
      <my-button>Cancel</my-button>
    </my-stack>
  );
}
```

```vue [Vue]
<script setup>
import "my-design-system";
</script>

<template>
  <my-stack direction="row">
    <my-button variant="primary">Save</my-button>
    <my-button>Cancel</my-button>
  </my-stack>
</template>
```

```svelte [Svelte]
<script>
  import "my-design-system";
</script>

<my-stack direction="row">
  <my-button variant="primary">Save</my-button>
  <my-button>Cancel</my-button>
</my-stack>
```

```ts [Angular]
import "my-design-system";

@Component({
  selector: "app-root",
  template: `
    <my-stack direction="row">
      <my-button variant="primary" text="Save"></my-button>
      <my-button text="Cancel"></my-button>
    </my-stack>
  `,
})
export class AppComponent {}
```

:::

For more, see the [Framework Integration](/advanced/frameworks) examples.

## Bundling components

[@elenajs/bundler](https://github.com/getelena/elena/tree/main/packages/bundler) is the build tool for Elena component libraries. It bundles JavaScript and TypeScript source files, minifies styles, generates a Custom Elements Manifest, and produces TypeScript declarations.

::: code-group

```sh [npm]
npm install --save-dev @elenajs/bundler
```

```sh [yarn]
yarn add --dev @elenajs/bundler
```

```sh [pnpm]
pnpm add --save-dev @elenajs/bundler
```

:::

Run the build:

```bash
npx elena build
```

### Bundler configuration

Create an `elena.config.mjs` at the root of your package:

```js
/**
 * ░ [ELENA]: Bundler configuration
 * @type {import("@elenajs/bundler").ElenaConfig}
 */
export default {
  // Source directory scanned for .js/.ts entry files and .css files.
  input: "src",

  // Rollup output options.
  output: {
    dir: "dist",
    format: "esm",
    sourcemap: true,
  },

  // Entry for the single-file bundle. Set to false to disable.
  bundle: "src/index.js",

  // Additional Rollup plugins appended after Elena’s built-in set.
  // plugins: [],

  // Custom Elements Manifest options.
  // analyze: {
  //   plugins: [],
  // },

  // Browserslist targets for transpilation. Enables syntax transforms
  // (e.g. class fields, optional chaining) to widen browser support.
  // target: ["chrome 71", "firefox 69", "safari 12.1"],
};
```

For more, see the [Component Libraries](/start/libraries) guide.

## Command Line Interface

[@elenajs/cli](https://github.com/getelena/elena/tree/main/packages/cli) scaffolds new Elena components interactively. It generates JavaScript, TypeScript, or single-file HTML source files with all Elena patterns pre-configured.

::: code-group

```sh [npm]
npm install --save-dev @elenajs/cli
```

```sh [yarn]
yarn add --dev @elenajs/cli
```

```sh [pnpm]
pnpm add --save-dev @elenajs/cli
```

:::

Run without arguments to step through all options:

```bash
npx elena-create
```

Or pass a component name to skip the name prompt:

```bash
npx elena-create my-button
npx elena-create my-date-picker
```

For more, see the [CLI documentation](/start/cli).

## Next steps

- View the [Live Demos](/demos/) to see Elena in action.
- Read the [Component API](/api/component) reference to learn about props, events, and lifecycle hooks.
- Learn how to build a full [Component Library](/start/libraries).
- Explore [Framework Integration](/advanced/frameworks) examples for React, Vue, Angular, Next.js and more.
