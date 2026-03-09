<div align="center">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://elenajs.com/img/elena-dark.png" alt="Elena" width="201" height="230">
  </source>
  <source media="(prefers-color-scheme: light)" srcset="https://elenajs.com/img/elena.png" alt="Elena" width="201" height="230">
  </source>
  <img src="https://elenajs.com/img/elena.png" alt="Elena" width="201" height="230">
</picture>

### Elena component library demonstrating how to build Progressive Web Components.

<br/>

<a href="https://arielsalminen.com"><img src="https://img.shields.io/badge/creator-@arielle-F95B1F" alt="Creator @arielle"/></a>
<a href="https://www.npmjs.com/package/@elenajs/components"><img src="https://img.shields.io/npm/v/@elenajs/components.svg" alt="Latest version on npm" /></a>
<a href="https://github.com/getelena/elena/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-yellow.svg" alt="Elena is released under the MIT license." /></a>
<a href="https://github.com/getelena/elena/actions/workflows/tests.yml"><img src="https://github.com/getelena/elena/actions/workflows/tests.yml/badge.svg" alt="Tests status" /></a>

</div>

<br/>

<p align="center"><strong>@elenajs/components</strong> is an example Progressive Web Component library built with <a href="https://elenajs.com">Elena</a>. It demonstrates Elena’s component patterns and ships with a <a href="https://custom-elements-manifest.open-wc.org/">Custom Elements Manifest</a>, TypeScript declarations, and individual CSS files for each component.</p>

<br/>

> [!WARNING]
> Please note that `@elenajs/components` is in active development and the APIs may change without notice.

<br/>

## Table of contents

- **[Install](#install)**
- **[Usage](#usage)**
  - **[Import all components](#import-all-components)**
  - **[Import individual components](#import-individual-components)**
  - **[Import styles](#import-styles)**
- **[Available components](#available-components)**
  - **[Button](#button)**
  - **[Stack](#stack)**
- **[TypeScript](#typescript)**
- **[Development](#development)**

## Install

```bash
npm install @elenajs/components
```

## Usage

### Import all components

Import the full bundle to register all components at once:

```js
import "@elenajs/components";
```

### Import individual components

Import only the components you need for better tree-shaking:

```js
import "@elenajs/components/dist/button.js";
import "@elenajs/components/dist/stack.js";
```

### Import styles

Each component ships with a matching CSS file. Import the full bundle or individual files:

```css
/* All component styles */
@import "@elenajs/components/dist/bundle.css";

/* Or individual styles */
@import "@elenajs/components/dist/button.css";
@import "@elenajs/components/dist/stack.css";
```

## Available components

### Button

Renders a `<button>` element with built-in event delegation and variant styling.

```html
<elena-button>Click me</elena-button>
<elena-button variant="primary">Save</elena-button>
<elena-button variant="danger">Delete</elena-button>
<elena-button disabled>Disabled</elena-button>
```

#### Props

| Prop       | Type                                 | Default     | Description                                     |
| ---------- | ------------------------------------ | ----------- | ----------------------------------------------- |
| `variant`  | `"default" \| "primary" \| "danger"` | `"default"` | The style variant of the button.                |
| `disabled` | `Boolean`                            | `false`     | Makes the component disabled.                   |
| `name`     | `string`                             | `""`        | The name used to identify the button in forms.  |
| `value`    | `string`                             | `""`        | The value used to identify the button in forms. |
| `type`     | `"submit" \| "reset" \| "button"`    | `"button"`  | The type of the button.                         |

#### Events

| Event   | Description                           |
| ------- | ------------------------------------- |
| `click` | Fires when the button is clicked.     |
| `focus` | Fires when the button receives focus. |
| `blur`  | Fires when the button loses focus.    |

#### CSS custom properties

| Property                | Description                             |
| ----------------------- | --------------------------------------- |
| `--elena-button-text`   | Overrides the default text color.       |
| `--elena-button-bg`     | Overrides the default background color. |
| `--elena-button-font`   | Overrides the default font family.      |
| `--elena-button-radius` | Overrides the default border radius.    |

### Stack

Manages flexbox layout of its children with optional spacing.

```html
<elena-stack>
  <elena-button>First</elena-button>
  <elena-button>Second</elena-button>
</elena-stack>

<elena-stack direction="row">
  <elena-button>Left</elena-button>
  <elena-button>Right</elena-button>
</elena-stack>
```

#### Props

| Prop        | Type                | Default    | Description                        |
| ----------- | ------------------- | ---------- | ---------------------------------- |
| `direction` | `"column" \| "row"` | `"column"` | The direction of the stack layout. |

## TypeScript

The package ships with TypeScript declarations for JSX integration. To get type checking in your framework:

```ts
// types.d.ts
import type { CustomElements } from "@elenajs/components";

type ElenaIntrinsicElements = {
  [K in keyof CustomElements]: CustomElements[K] & {
    onClick?: (e: MouseEvent) => void;
    onFocus?: (e: FocusEvent) => void;
    onBlur?: (e: FocusEvent) => void;
    children?: React.ReactNode;
  };
};

declare module "react" {
  namespace JSX {
    interface IntrinsicElements extends ElenaIntrinsicElements {}
  }
}
```

## Development

```bash
pnpm start    # Launch dev server with live reload
pnpm build    # Build to dist/ (via elena build)
pnpm clean    # Remove dist/
```

## License

MIT

## Copyright

Copyright © 2026 [Ariel Salminen](https://arielsalminen.com)
