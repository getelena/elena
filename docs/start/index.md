# Quick start

The fastest way to get started is to include the following directly into your webpage:

::: code-group

```html [Primitive Component]
<script type="module">
  import { Elena, html } from "https://unpkg.com/@elenajs/core@0.15.0";

  export default class Button extends Elena(HTMLElement) {
    static tagName = "my-button";
    static props = ["variant"];

    variant = "default";

    render() {
      return html`<button>${this.text}</button>`;
    }
  }
  Button.define();
</script>

<!-- Now you can use your component anywhere on the page -->
<my-button variant="primary">Save</my-button>
<my-button>Cancel</my-button>
```

```html [Composite Component]
<script type="module">
  import { Elena } from "https://unpkg.com/@elenajs/core@0.15.0";

  export default class Stack extends Elena(HTMLElement) {
    static tagName = "my-stack";
    static props = ["direction"];

    direction = "column";
  }
  Stack.define();
</script>

<!-- Now you can use your component anywhere on the page -->
<my-stack direction="row">
  <div>First</div>
  <div>Second</div>
  <div>Third</div>
  <div>Fourth</div>
</my-stack>
```

:::

> [!WARNING]
> Whilst this is the fastest way to get started, we don't recommend it for production since you would be relying entirely on unpkg CDN. Instead, we recommend installing the [@elenajs/core](https://github.com/getelena/elena/tree/main/packages/core) locally and bundling your component libraries with [@elenajs/bundler](https://github.com/getelena/elena/tree/main/packages/bundler) for optimal performance.

## Installation

Before moving further, please make sure you have Node.js installed. You can install the latest version through [their website](https://nodejs.org/en) or by following the [guidelines here](https://nodejs.org/en/download).

If you're planning on using Elena in a project that doesn’t yet use Node Package Manager, you will have to first create a `package.json` file. To do this, run `npm init` and follow the steps provided. Once finished, you can continue by following the instructions below.

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

Once Elena is installed, you can import it from the package:

```js
import { Elena } from "@elenajs/core";
```

## Composite Component

Composite Components wrap and enhance the HTML composed inside them, including other components. They provide styling, layout, and behavior around the composed content. The Composite Components provide [full SSR support](#) by default.

There are two necessary parts to using the Composite Components: the components themselves, and their CSS styles. 

::: code-group

```js [JavaScript]
import { Elena } from "@elenajs/core";

export default class Stack extends Elena(HTMLElement) {
  static tagName = "my-stack";
  static props = ["direction"];

  direction = "column";

  // Note that Composite Components do not call render()
}

Stack.define();
```

```ts [TypeScript]
import { Elena } from "@elenajs/core";

export default class Stack extends Elena(HTMLElement) {
  static tagName = "my-stack";
  static props = ["direction"];

  direction: "column" | "row" = "column";

  // Note that Composite Components do not call render()
}

Stack.define();
```

```css [Styles]
@scope (elena-stack) {
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
  <div>Fourth</div>
</my-stack>
```

## Primitive Component

Primitive Components are self-contained components that own and render their own HTML markup. All content is controlled through props, nothing is composed into them except text content. The Primitive Components provide partial support for SSR and do the rest of the hydration on the client side _(unless you [pre-render them](#))._

There are two necessary parts to using the Primitive Components: the components themselves, and their CSS styles. 

### JavaScript

::: code-group

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

## Bundling components

[@elenajs/bundler](https://github.com/getelena/elena/tree/main/packages/bundler) is the build tool for Elena Progressive Web Component libraries. It bundles JavaScript and TypeScript source files, minifies CSS, generates a Custom Elements Manifest, and produces TypeScript declarations for Elena components.

To install Elena Bundler as a dependency in your project, run:

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

The bundler provides an `elena` CLI binary with a single `build` command:

```bash
npx elena build
```

### Bundler configuration

Create an `elena.config.mjs` (or `elena.config.js`) at the root of your package:

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
};
```

For more detailed documentation, see [Component Libraries](#).

## Command Line Interface

[@elenajs/cli](https://github.com/getelena/elena/tree/main/packages/cli) is an interactive command-line tool for scaffolding Elena components. It generates JavaScript, TypeScript, or single-file HTML source files and scoped CSS with all Elena Progressive Web Component patterns pre-configured.


To install Elena CLI as a dependency in your project, run:

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

Run without arguments to be guided through all options:

```bash
npx elena-create
```

…Or pass a kebab-case name (must contain at least one hyphen) to skip the name prompt:

```bash
npx elena-create elena-button
npx elena-create elena-date-picker
```

For more detailed documentation, see [Command Line Interface](#) section.
