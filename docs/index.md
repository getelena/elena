<br/>

<div align="center">
<h1>
  <img src="/elena.png" alt="Elena" width="127" height="156">
</h1>

<h3>Simple, tiny library for building Progressive Web Components.</h3>

<div style="margin-top:2.25rem;display: flex; gap: 0.25rem;align-items: center; justify-content: center;">
<a href="https://arielsalminen.com"><img src="https://img.shields.io/badge/creator-@arielle-F95B1F" alt="Creator @arielle"/></a>
<a href="https://www.npmjs.com/org/elenajs"><img src="https://img.shields.io/npm/v/@elenajs/core.svg" alt="Latest version on npm" /></a>
<a href="https://github.com/getelena/elena/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-yellow.svg" alt="Elena is released under the MIT license." /></a>
<a href="https://github.com/getelena/elena/actions/workflows/tests.yml"><img src="https://img.shields.io/badge/coverage-100%25-green" alt="Coverage 100%" /></a>
<a href="https://www.npmjs.com/package/@elenajs/core"><img src="https://img.shields.io/npm/dt/@elenajs/core.svg" alt="Total Downloads"></a>
</div>

</div>

## What is Elena?

**Elena is a simple, tiny library (2kB) for building [Progressive Web Components](#progressive-web-components).** With Elena, you can immediately render the component's base HTML & CSS, then progressively enhance the experience with JavaScript rather than relying on it from the start. 

### Elena’s features

- 🔋 **Extremely lightweight:** 2kB minified & compressed, simple and tiny by design.
- 📈 **Progressively enhanced:** Renders HTML & CSS first, then hydrates with JavaScript.
- 🫶 **Accessible by default:** Semantic HTML foundation with no Shadow DOM barriers.
- 🌍 **Standards based:** Built entirely on native custom elements & web standards.
- ⚡ **Reactive updates:** Prop and state changes trigger efficient, batched re-renders.
- 🎨 **Scoped styles:** Simple & clean CSS encapsulation without complex workarounds.
- 🖥️ **SSR friendly:** Works out of the box, with optional server-side utilities if needed.
- 🧩 **Zero dependencies:** No runtime dependencies, runs entirely on the web platform.
- 🔓 **Zero lock-in:** Works with every major framework, or no framework at all.

### Here is a minimal example

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

### Usage

::: code-group

```html [HTML]
<my-stack direction="row">
  <div>First</div>
  <div>Second</div>
  <div>Third</div>
</my-stack>
```

```html [Angular]
<div class="app">
  <my-stack direction="row">
    <div>First</div>
    <div>Second</div>
    <div>Third</div>
  </my-stack>
</div>
```

```tsx [Next.js]
export default function App() {
  return (
    <my-stack direction="row">
      <div>First</div>
      <div>Second</div>
      <div>Third</div>
    </my-stack>
  );
}
```

```tsx [React]
function App() {
  return (
    <my-stack direction="row">
      <div>First</div>
      <div>Second</div>
      <div>Third</div>
    </my-stack>
  );
}
export default App;
```

```svelte [Svelte]
<div class="app">
  <my-stack direction="row">
    <div>First</div>
    <div>Second</div>
    <div>Third</div>
  </my-stack>
</div>
```

```vue [Vue]
<template>
  <my-stack direction="row">
    <div>First</div>
    <div>Second</div>
    <div>Third</div>
  </my-stack>
</template>
```

:::

> [!TIP] Prerequisites
> Since Elena is a runtime mixin extending the functionality of standard custom elements, the rest of the documentation assumes familiarity with HTML, CSS and JavaScript. If you are totally new to custom elements, it might be a good idea to see the [MDN guide](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements) that covers them in detail. Prior experience with custom elements helps, but is not required when using Elena.


## Progressive Web Components

A _"Progressive Web Component"_ is a native Custom Element designed in two layers: a base layer of HTML and CSS that renders immediately, without JavaScript, and an enhancement layer of JavaScript that adds reactivity, event handling, and more advanced templating. There are two types of Progressive Web Components:

### 1. Primitive Components

- Self-contained components that own and render their own HTML markup.
- All content is controlled through `props`, nothing is composed into them except text content.
- Examples: `button`, `input`, `checkbox`, `radio`, `textarea`, `icon`, `spinner`, `switch`.

### 2. Composite Components

- Components that wrap and enhance the HTML composed inside them, including other components.
- Provide styling, layout, and behavior around the composed content.
- Examples: `stack`, `table`, `layout`, `card`, `banner`, `visually-hidden`, `fieldset`.

## Why was Elena created

Elena was created by [@arielle](https://arielsalminen.com) after nearly a decade of building enterprise-scale design systems with [web components](https://arielsalminen.com/2019/why-we-use-web-components/). The recurring pain points were always the same: accessibility barriers, server-side rendering friction, layout shifts, FOUC/FOIC, and compatibility challenges with analytics tools and the existing workflows.

Elena was built to solve these problems while staying grounded in web standards and what the platform natively provides. This is how _“Progressive Web Components”_ were born.

## Why should I use Elena

**Elena is built for teams creating component libraries and design systems.** If you need web components that work across multiple frameworks (such as [React](https://react.dev), [Next.js](https://nextjs.org), [Vue](https://vuejs.org), [Angular](https://angular.dev)), render HTML and CSS before JavaScript loads, and avoid accessibility barriers, SSR friction, and layout shifts — Elena is designed for exactly that.

It handles the cross-framework complexity (prop/attribute syncing, event delegation, framework compatibility) so you can focus on building components rather than plumbing.

## Elena vs other libraries

### Elena vs standard web components

Elena builds on native custom elements, so the mental model is familiar. The key differences are:

- **No Shadow DOM.** Elena lives entirely in the Light DOM. This is an intentional design choice to improve accessibility, SSR compatibility, and to make styling easier.
- **No `<template>`.** Composite Components compose HTML children directly; Primitive Components own their inner HTML via `render()`, with only the host element and its text content on the consuming page.
- **CSS encapsulation without Shadow DOM.** Elena uses `@scope` to prevent styles from leaking out, combined with a custom [CSS encapsulation pattern](/advanced/scoping) to prevent global styles from leaking in.

> [!TIP] NOTE
> You may wonder: why are they called **Progressive Web Components** and not **Progressive Custom Elements**? _Web Component_ is the more widely recognized term today, and many of Elena’s concepts align closely with what are now called [HTML Web Components](https://adactio.com/journal/20618).

### Elena vs Lit

[Lit](https://lit.dev) is the most widely used web component library and a natural comparison point. Both share a similar foundation, extending native custom elements with tagged template literals for rendering, but differ significantly in approach:

| | Elena | Lit |
|---|---|---|
| **DOM model** | Light DOM | Shadow DOM |
| **Size** | ~2kB | ~5kB |
| **Progressive enhancement** | HTML & CSS first, JavaScript enhances after | Requires JavaScript for rendering |
| **SSR** | Works out of the box; optional `@elenajs/ssr` for Primitive Components | Requires `@lit-labs/ssr` |
| **Style encapsulation** | `@scope` + `all: unset` | Shadow DOM (`:host`, CSS parts) |
| **Accessibility** | Full Light DOM access | Shadow DOM accessibility limitations |
| **API** | Static class fields + reactive properties | Decorators + reactive properties |

The biggest philosophical difference is Shadow DOM. Lit embraces it for strong encapsulation; Elena rejects it in favor of Light DOM for accessibility, SSR, and CSS inheritance. Neither approach is wrong, it depends on what you’re optimizing for. If your use case specifically requires Shadow DOM, Lit is the right tool.

### Elena vs Stencil

[Stencil](https://stenciljs.com) is a compiler that generates native web components, developed by the Ionic team. Unlike runtime libraries like Elena or Lit, Stencil is primarily a build tool. Components are authored in TypeScript + JSX and compiled to standalone custom elements:

| | Elena | Stencil |
|---|---|---|
| **Approach** | Runtime mixin | Compiler |
| **Language** | Vanilla JavaScript or TypeScript | TypeScript + JSX |
| **Build step** | Optional | Required |
| **DOM model** | Light DOM | Shadow DOM (default; configurable) |
| **Progressive enhancement** | HTML & CSS first, JavaScript enhances after | Requires JavaScript for rendering |
| **SSR** | Works out of the box; optional `@elenajs/ssr` for Primitive Components | Requires Stencil's Hydrate app |
| **Style encapsulation** | `@scope` + `all: unset` | Shadow DOM or scoped CSS |
| **API** | Static class fields + reactive properties | Decorators + JSX |
| **Output targets** | Not necessary | Custom elements, React, Angular, Vue wrappers |

Stencil’s standout feature is its output targets, it can generate framework-specific wrappers (React, Angular, Vue) automatically from the same component source. If you need generated bindings for multiple frameworks, Stencil has a clear advantage. Elena, by contrast, works directly with any framework without generated wrappers.

## Next steps

- Start with the [Quick Start](#) guide.
- View the [Live Demos](#) for examples.
