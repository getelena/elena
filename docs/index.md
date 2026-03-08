<br/>

<div align="center">
<h1>
<img src="/elena.png" class="light-only" alt="Elena" width="127" height="156">
<img src="/elena-dark.png" class="dark-only" alt="Elena" width="127" height="156">
</h1>

<h3>Simple, tiny library for building Progressive Web Components.</h3>

<div style="margin-top:2.25rem;display: flex; gap: 0.25rem;align-items: center; justify-content: center;">
<a href="https://arielsalminen.com"><img src="/creator.svg" alt="Creator @arielle"/></a>
<a href="https://www.npmjs.com/org/elenajs"><img src="https://img.shields.io/npm/v/@elenajs/core.svg" alt="Latest version on npm" /></a>
<a href="https://github.com/getelena/elena/blob/main/LICENSE"><img src="/license.svg" alt="Elena is released under the MIT license." /></a>
<a href="https://github.com/getelena/elena/actions/workflows/tests.yml"><img src="/coverage.svg" alt="Coverage 100%" /></a>
<a href="https://www.npmjs.com/package/@elenajs/core"><img src="https://img.shields.io/npm/dt/@elenajs/core.svg" alt="Total Downloads"></a>
</div>

</div>

## What is Elena?

**Elena is a simple, tiny library (2kB) for building [Progressive Web Components](/components/terminology).** With Elena, you can immediately render the component's base HTML & CSS, then progressively enhance the experience with JavaScript rather than relying on it from the start. 

### Here is a minimal example

::: code-group

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

```html
<my-stack direction="row">
  <div>First</div>
  <div>Second</div>
  <div>Third</div>
</my-stack>
```

> [!TIP] Prerequisites
> This documentation assumes familiarity with HTML, CSS, and JavaScript. If you're new to custom elements, the [MDN guide](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements) is a good starting point, though prior experience is not required.

## Why was Elena created

Elena was created by [@arielle](https://arielsalminen.com) after nearly a decade of building enterprise-scale design systems with [web components](https://arielsalminen.com/2019/why-we-use-web-components/). The recurring pain points were always the same: accessibility barriers, server-side rendering friction, layout shifts, FOUC/FOIC, and compatibility challenges with analytics tools and the existing workflows.

Elena was built to solve these problems while staying grounded in web standards and what the platform natively provides. This is how _“Progressive Web Components”_ were born.

## Why should I use Elena

**Elena is built for teams creating component libraries and design systems.** If you need web components that work across multiple frameworks (such as [React](https://react.dev), [Next.js](https://nextjs.org), [Vue](https://vuejs.org), [Angular](https://angular.dev)), render HTML and CSS before JavaScript loads, and avoid accessibility barriers, SSR friction, and layout shifts: Elena is designed for exactly that.

It handles the cross-framework complexity (prop/attribute syncing, event delegation, framework compatibility) so you can focus on building components rather than plumbing.

## Elena’s features

- 🔋 **Extremely lightweight:** 2kB minified & compressed, simple and tiny by design.
- 📈 **Progressively enhanced:** Renders HTML & CSS first, then hydrates with JavaScript.
- 🫶 **Accessible by default:** Semantic HTML foundation with no Shadow DOM barriers.
- 🌍 **Standards based:** Built entirely on native custom elements & web standards.
- ⚡ **Reactive updates:** Prop and state changes trigger efficient, batched re-renders.
- 🎨 **Scoped styles:** Simple & clean CSS encapsulation without complex workarounds.
- 🖥️ **SSR friendly:** Works out of the box, with optional server-side utilities if needed.
- 🧩 **Zero dependencies:** No runtime dependencies, runs entirely on the web platform.
- 🔓 **Zero lock-in:** Works with every major framework, or no framework at all.

## Elena vs other libraries

### Elena vs standard web components

Elena builds on native custom elements, so the mental model is familiar. The key differences are:

- **No Shadow DOM.** Elena lives entirely in the Light DOM. This is an intentional design choice to improve accessibility, SSR compatibility, and to make styling easier.
- **No `<template>`.** [Composite Components](/components/terminology) compose HTML children directly; [Primitive Components](/components/terminology) own their inner HTML via `render()`, with only the host element and its text content on the consuming page.
- **CSS encapsulation without Shadow DOM.** Elena uses `@scope` to prevent styles from leaking out, combined with a custom [CSS reset](/advanced/scoping) to prevent global styles from leaking in.

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

## Browser support

Elena is tested in the latest two versions of the following browsers. We may address critical bugs in earlier versions based on their severity and impact. If you need to support IE11 or pre-Chromium Edge, this library isn’t for you.

<div class="elena-stack">
  <img src="/chrome.png" width="64" height="64" alt="Chrome" />
  <img src="/safari.png" width="64" height="64" alt="Safari" />
  <img src="/edge.png" width="64" height="64" alt="Chrome" />
  <img src="/firefox.png" width="64" height="64" alt="Chrome" />
  <img src="/opera.png" width="64" height="64" alt="Chrome" />
</div>

## Next steps

- Start with the [Quick Start](/start/) guide.
- View the [Live examples](/examples/) for demos.
