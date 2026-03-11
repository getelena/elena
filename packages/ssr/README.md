<div align="center">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://elenajs.com/img/elena-dark.png" alt="Elena" width="558" height="220">
  </source>
  <source media="(prefers-color-scheme: light)" srcset="https://elenajs.com/img/elena-light.png" alt="Elena" width="558" height="220">
  </source>
  <img src="https://elenajs.com/img/elena-light.png" alt="Elena" width="558" height="220">
</picture>

### Render Elena components to HTML strings for server-side rendering.

<br/>

<a href="https://arielsalminen.com"><img src="https://img.shields.io/badge/creator-@arielle-F95B1F" alt="Creator @arielle"/></a>
<a href="https://www.npmjs.com/package/@elenajs/ssr"><img src="https://img.shields.io/npm/v/@elenajs/ssr.svg" alt="Latest version on npm" /></a>
<a href="https://github.com/getelena/elena/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-yellow.svg" alt="Elena is released under the MIT license." /></a>
<a href="https://github.com/getelena/elena/actions/workflows/tests.yml"><img src="https://github.com/getelena/elena/actions/workflows/tests.yml/badge.svg" alt="Tests status" /></a>

</div>

<br/>

<p align="center"><strong>@elenajs/ssr</strong> renders <a href="https://elenajs.com">Elena</a> components to fully expanded HTML strings for server-side rendering (SSR). Pass an HTML string containing Elena components, and get back rendered HTML with component templates expanded inline. Works with Node.js without requiring any browser DOM APIs.</p>

<br/>

> [!WARNING]
> Please note that `@elenajs/ssr` is an experimental package and not yet ready for production use. APIs may change without notice.

<br/>

## Table of contents

- **[Install](#install)**
- **[Usage](#usage)**
  - **[Basic example](#basic-example)**
  - **[With nesting](#with-nesting)**
  - **[With a full page](#with-a-full-page)**
  - **[With Eleventy](#with-eleventy)**
- **[API](#api)**
  - **[`register(...components)`](#registercomponents)**
  - **[`ssr(html)`](#ssrhtml)**
- **[How it works](#how-it-works)**
- **[Client-side hydration](#client-side-hydration)**

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

### With nesting

Nested Elena components are expanded automatically:

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

A transform processes every rendered page automatically, expanding any registered components found in the output HTML. No shortcodes or special syntax needed, just write Elena components directly in your templates:

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

Register Elena component classes for SSR expansion. Each class must have `static tagName` defined. Call this once before using `ssr()`.

```js
import { register } from "@elenajs/ssr";
import Button from "./button.js";
import Input from "./input.js";

register(Button, Input);
```

Throws an error if a component does not have a `tagName`.

### `ssr(html)`

Parse an HTML string, expand registered components with `render()`, and return the rendered HTML.

| Parameter | Type     | Description                              |
| --------- | -------- | ---------------------------------------- |
| `html`    | `string` | HTML string containing Elena components. |

**Returns:** `string`, the rendered HTML with components expanded.

## How it works

1. **Parse** the input HTML string into a tree (tags, attributes, children).
2. **Walk** the tree depth-first. For each custom element tag, look it up in the registry.
3. **Expand** components with `render()` by constructing a lightweight instance, converting attribute strings to the correct prop types (boolean, number, array, object), calling `willUpdate()` if defined, and then calling `render()`.
4. **Recurse** into HTML Web Component children and non-component tags.
5. **Serialize** the tree back to an HTML string.

The rendered output matches what Elena produces on the client, using the same `html` tagged template escaping and whitespace normalization.

## Client-side hydration

The HTML produced by `ssr()` is designed for progressive enhancement. When the component JavaScript loads on the client:

1. Elena's `connectedCallback` fires on the pre-rendered element.
2. `render()` runs and hydrates the component with interactivity.
3. Event listeners are attached, methods become available, and the `hydrated` attribute is added.

## License

MIT

## Copyright

Copyright © 2026 [Ariel Salminen](https://arielsalminen.com)
