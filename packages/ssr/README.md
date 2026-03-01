<div align="center">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://elenajs.com/img/elena-dark.png" alt="Elena" width="201" height="230">
  </source>
  <source media="(prefers-color-scheme: light)" srcset="https://elenajs.com/img/elena.png" alt="Elena" width="201" height="230">
  </source>
  <img src="https://elenajs.com/img/elena.png" alt="Elena" width="201" height="230">
</picture>

### Render Elena components to HTML strings for Server Side Rendering.

<br/>

<a href="https://arielsalminen.com"><img src="https://img.shields.io/badge/creator-@arielle-F95B1F" alt="Creator @arielle"/></a>
<a href="https://www.npmjs.com/package/@elenajs/ssr"><img src="https://img.shields.io/npm/v/@elenajs/ssr.svg" alt="Latest version on npm" /></a>
<a href="https://github.com/getelena/elena/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-yellow.svg" alt="Elena is released under the MIT license." /></a>
<a href="https://github.com/getelena/elena/actions/workflows/tests.yml"><img src="https://github.com/getelena/elena/actions/workflows/tests.yml/badge.svg" alt="Tests status" /></a>

</div>

<br/>

<p align="center"><strong>@elenajs/ssr</strong> renders <a href="https://elenajs.com">Elena</a> components to fully expanded HTML strings for Server Side Rendering (SSR). Pass an HTML string containing Elena components, and get back rendered HTML with Primitive Component templates expanded inline. Works in Node.js with zero DOM dependencies.</p>

<br/>

## Table of contents

- **[Install](#install)**
- **[Usage](#usage)**
  - **[Basic example](#basic-example)**
  - **[With composites and nesting](#with-composites-and-nesting)**
  - **[With a full page](#with-a-full-page)**
  - **[With Eleventy](#with-eleventy)**
- **[API](#api)**
  - **[`register(...components)`](#registercomponents)**
  - **[`ssr(html)`](#ssrhtml)**
- **[How it works](#how-it-works)**
- **[Client-side hydration](#client-side-hydration)**
- **[Component types](#component-types)**

## Install

```bash
npm install @elenajs/ssr
```

## Usage

### Basic example

```js
import { ssr, register } from "@elenajs/ssr";
import Button from "./button.js";

register(Button);

const html = ssr(`<elena-button variant="primary">Save</elena-button>`);
// Outputs: '<elena-button variant="primary"><button>Save</button></elena-button>'
```

### With composites and nesting

Composite components preserve their children. Primitive components inside composites are expanded automatically:

```js
import { ssr, register } from "@elenajs/ssr";
import Button from "./button.js";
import Input from "./input.js";
import Stack from "./stack.js";

register(Button, Input, Stack);

const html = ssr(`
  <elena-stack direction="row">
    <elena-input label="Email" type="email" placeholder="you@example.com"></elena-input>
    <elena-button>Send</elena-button>
  </elena-stack>
`);
```

Output:

```html
<elena-stack direction="row">
  <elena-input type="email" placeholder="you@example.com">
    <label for="email">Email</label>
    <input id="email" type="email" placeholder="you@example.com" />
  </elena-input>
  <elena-button><button>Send</button></elena-button>
</elena-stack>
```

### With a full page

```js
import { ssr, register } from "@elenajs/ssr";
import Button from "./button.js";

register(Button);

const page = `
<!doctype html>
<html>
<head>
  <link rel="stylesheet" href="/components/button.css">
</head>
<body>
  ${ssr(`<elena-button variant="primary">Click me</elena-button>`)}
  <script type="module" src="/components/button.js"></script>
</body>
</html>
`;
```

### With Eleventy

You can use `@elenajs/ssr` with [Eleventy](https://www.11ty.dev/) as either a transform or a shortcode.

#### As a transform

A transform processes every rendered page automatically, expanding any registered Elena components found in the output HTML. No shortcodes or special syntax needed, just write Elena components directly in your templates:

```js
// eleventy.config.js
import { ssr, register } from "@elenajs/ssr";
import Button from "@my-lib/components/button/button.js";
import Input from "@my-lib/components/input/input.js";
import Stack from "@my-lib/components/stack/stack.js";

register(Button, Input, Stack);

export default function (eleventyConfig) {
  eleventyConfig.addTransform("elena-ssr", (content) => {
    return ssr(content);
  });
}
```

Then use Elena components directly in any Nunjucks, Liquid, or Markdown template:

```html
<elena-stack direction="row">
  <elena-input type="email" placeholder="you@example.com"></elena-input>
  <elena-button variant="primary">Subscribe</elena-button>
</elena-stack>
```

#### As a shortcode

If you prefer more control over which parts of a page are processed, use a shortcode instead:

```js
// eleventy.config.js
import { ssr, register } from "@elenajs/ssr";
import Button from "@my-lib/components/button/button.js";

register(Button);

export default function (eleventyConfig) {
  eleventyConfig.addShortcode("elena", (html) => ssr(html));
}
```

Then in a template:

```
{% elena '<elena-button variant="primary">Save</elena-button>' %}
```

## API

### `register(...components)`

Register Elena component classes for SSR. Each class must have a `tagName` defined in its Elena options. Call this once before using `ssr()`.

```js
import { register } from "@elenajs/ssr";
import Button from "./button.js";
import Input from "./input.js";

register(Button, Input);
```

**Throws** if any component does not have a `tagName`.

### `ssr(html)`

Parse an HTML string, expand registered Elena components, and return the rendered HTML.

| Parameter | Type     | Description                              |
| --------- | -------- | ---------------------------------------- |
| `html`    | `string` | HTML string containing Elena components. |

**Returns:** `string`, The rendered HTML with components expanded.

**Behavior by component type:**

- **Primitive components** (with `render()`): The component’s `render()` method is called and its output replaces the tag’s inner HTML. Attributes from the input are preserved on the host element and passed as props.
- **Composite components** (no `render()`): The tag and its attributes are preserved. Children are processed recursively.
- **Unknown tags**: Passed through unchanged.

## How it works

1. **Parse** the input HTML string into a tree (tags, attributes, children).
2. **Walk** the tree depth-first. For each custom element tag, look it up in the registry.
3. **Expand** primitive components by creating a lightweight instance via `Object.create()` (no DOM needed), setting props from attributes, and calling `render()`.
4. **Recurse** into composite component children and non-component tags.
5. **Serialize** the tree back to an HTML string.

The rendered output matches what Elena produces on the client, using the same `html` tagged template escaping and whitespace normalization.

## Client-side hydration

The HTML produced by `ssr()` is designed for progressive enhancement. When the component JavaScript loads on the client:

1. Elena’s `connectedCallback` fires on the pre-rendered element.
2. `render()` runs and replaces the inner content (matching what was already there).
3. Event listeners are attached, methods become available, and the `hydrated` attribute is added.

## Component types

| Component type | SSR behavior                                      |
| -------------- | ------------------------------------------------- |
| **Primitive**  | `render()` is called; output replaces inner HTML. |
| **Composite**  | Tag preserved; children processed recursively.    |

## License

MIT

## Copyright

Copyright © 2026 [Ariel Salminen](https://arielsalminen.com)
