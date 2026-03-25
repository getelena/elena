---
url: /examples/pre-rendered.md
description: >-
  Live demo of Elena’s Progressive Web Components pre-rendered with @elenajs/ssr
  and progressively enhanced with JavaScript.
---

# Live examples with `@elenajs/ssr`

This page demonstrates Elena’s Progressive Web Components pre-rendered with the experimental `@elenajs/ssr` and progressively enhanced with JavaScript. You can compare this with a [version without pre-rendering](/examples/) to see the difference.

## Basic example

```html
<elena-stack>
  <elena-button type="submit">Button</elena-button>
  <elena-button icon="download">Download</elena-button>
  <elena-button label="Settings" icon="settings"></elena-button>
</elena-stack>
```

## Component variants

```html
<elena-stack>
  <elena-button variant="primary">Primary</elena-button>
  <elena-button variant="primary" icon="sort">Primary</elena-button>
  <elena-button>Default</elena-button>
  <elena-button variant="danger">Danger</elena-button>
  <elena-button variant="outline">Outline</elena-button>
  <elena-button disabled>Disabled</elena-button>
</elena-stack>
```

## Component sizes

```html
<elena-stack>
  <elena-button size="sm" icon="checked">Small</elena-button>
  <elena-button size="md" icon="checked">Medium</elena-button>
  <elena-button size="lg" icon="checked">Large</elena-button>
</elena-stack>
```

## Components as links

```html
<elena-stack>
  <elena-button href="#" variant="primary">Elena on GitHub</elena-button>
  <elena-button href="#" target="_blank" icon="external">External</elena-button>
  <elena-button href="#" download icon="download">Download</elena-button>
</elena-stack>
```

## Interactive components

```html
<elena-stack>
  <elena-button variant="primary">Increment</elena-button>
  <elena-button variant="danger">Reset</elena-button>
</elena-stack>
```

## Dynamic components

```html
<elena-stack>
  <elena-button variant="primary">Click to cycle (primary)</elena-button>
  <elena-button variant="primary">primary</elena-button>
</elena-stack>
```

## Full width components

```html
<elena-button variant="primary" expand>Full width</elena-button>
```

## Animated components

```html
<elena-stack>
  <elena-button loading variant="primary">Loading...</elena-button>
  <elena-button loading variant="danger">Loading...</elena-button>
  <elena-button loading>Loading...</elena-button>
</elena-stack>
```

## Styling components

```html
<elena-stack>
  <elena-button style="--bg:x">Custom style</elena-button>
  <elena-button style="--bg:x" icon="thumb">Like</elena-button>
  <elena-button style="--bg:x" label="Love" icon="heart"></elena-button>
</elena-stack>
```

## Example library&#x20;

**[@elenajs/components](https://github.com/getelena/elena/tree/main/packages/components)** is a reference component library built with Elena. It demonstrates real-world component patterns and is available as a starting point for your own library.

::: code-group

```sh [npm]
npm install @elenajs/components
```

```sh [yarn]
yarn add @elenajs/components
```

```sh [pnpm]
pnpm add @elenajs/components
```

```sh [bun]
bun add @elenajs/components
```

:::

It includes the following components:

| Component              | Tag                      | Description                                                     |
| ---------------------- | ------------------------ | --------------------------------------------------------------- |
| Button                 | `<elena-button>`         | Renders a `<button>` or `<a>` with variants, states, and icons. |
| Spinner                | `<elena-spinner>`        | Animated loading indicator that inherits the current color.     |
| Stack                  | `<elena-stack>`          | Flexbox layout wrapper with configurable direction and gap.     |
| Visually Hidden        | `<elena-visually-hidden>`| Hides content visually while keeping it accessible.             |

### Usage

Import the full bundle to register all components:

```js
import "@elenajs/components";
```

Or import individual components for better tree-shaking:

```js
import "@elenajs/components/dist/button.js";
import "@elenajs/components/dist/stack.js";
```

Each component has a matching CSS file:

```css
@import "@elenajs/components/dist/button.css";
@import "@elenajs/components/dist/stack.css";
```

Or import the full CSS bundle:

```css
@import "@elenajs/components/dist/bundle.css";
```

The source code is in `packages/components/` of the [Elena monorepo](https://github.com/getelena/elena) and serves as an example of how to structure, build, and publish a library with `@elenajs/bundler`.

## Next steps

* For more details, view [Component Libraries](/advanced/libraries).
* Explore [Framework Integration](/advanced/frameworks) examples for React, Vue, Angular, Next.js and more.
* Browse our [FAQ](/advanced/faq) for frequently asked questions.
* Try Elena in the [Playground](/playground/).
