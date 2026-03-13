---
title: Progressive Web Components
---

<pre class="elena">
 ██████████ ████
░░███░░░░░█░░███
 ░███  █ ░  ░███   ██████  ████████    ██████
 ░██████    ░███  ███░░███░░███░░███  ░░░░░███
 ░███░░█    ░███ ░███████  ░███ ░███   ███████
 ░███ ░   █ ░███ ░███░░░   ░███ ░███  ███░░███
 ██████████ █████░░██████  ████ █████░░████████
░░░░░░░░░░ ░░░░░  ░░░░░░  ░░░░ ░░░░░  ░░░░░░░░

░█ <span>Simple, tiny library for building Progressive Web Components.<i>|</i></span>
</pre>

# Elena is a simple, tiny library for building Progressive Web Components.

## What is Elena?

**Elena is a simple, tiny library (2kB) for building [Progressive Web Components](https://arielsalminen.com/2026/progressive-web-components/).** Unlike most web component libraries, Elena doesn’t force JavaScript for everything. You can load HTML and CSS first, then use JavaScript to progressively add interactivity. [^1]

[^1]: **Elena supports multiple component models:** Composite Components that wrap and enhance the HTML composed inside them, including other components; Primitive Components that are self-contained and render their own HTML;
And Declarative Components that are a hybrid of these and utilize [Declarative Shadow DOM](/components/templates#declarative-shadow-dom).

### Here is a minimal example

::: code-group

```js [HTML]
<elena-stack direction="row">
  <div>First</div>
  <div>Second</div>
  <div>Third</div>
</elena-stack>
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

```js [JavaScript]
import { Elena } from "@elenajs/core";

export default class Stack extends Elena(HTMLElement) {
  static tagName = "elena-stack";
  static props = ["direction"];

  direction = "column";
}

Stack.define();
```

:::

> [!TIP] Prerequisites
> This documentation assumes familiarity with HTML, CSS, and JavaScript. If you're new to custom elements, the [MDN guide](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements) is a good starting point, though prior experience is not required.

## Why was Elena created

Elena was created by [@arielle](https://arielsalminen.com) after nearly a decade of building enterprise-scale design systems with [web components](https://arielsalminen.com/2019/why-we-use-web-components/). The recurring pain points were often similar: accessibility issues, server-side rendering, layout shifts, flash of invisible content, React Server Components, too much reliance on client side JavaScript, and compatibility with e.g. third party analytics tools.

Elena was built to solve these problems while staying grounded in web standards and what the platform natively provides. This is how _“Progressive Web Components”_ were born.

## Why should I use Elena

**Elena is built for teams creating component libraries and design systems.** If you need web components that work across multiple frameworks (such as [React](https://react.dev), [Next.js](https://nextjs.org), [Vue](https://vuejs.org), [Angular](https://angular.dev)), render HTML and CSS before JavaScript loads, and sidestep common issues like accessibility problems, SSR limitations, and layout shifts, Elena is built for exactly that.

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

### Elena vs Lit

[Lit](https://lit.dev) is the most widely used web component library and a natural comparison point. Both share a similar foundation, extending native custom elements with tagged template literals for rendering, but differ significantly in approach:

| | Elena | Lit |
|---|---|---|
| **DOM model** | Light DOM (Shadow DOM opt-in) | Shadow DOM |
| **Size** | ~2kB | ~5kB |
| **Templating** | Native tagged template literals with auto-escaping | Custom reactive template engine with directives and binding syntax |
| **Progressive enhancement** | HTML & CSS first, JavaScript enhances after | Requires JavaScript for rendering |
| **SSR** | Works out of the box; optional `@elenajs/ssr` for components with `render()` | Requires `@lit-labs/ssr` |
| **Style encapsulation** | `@scope` + `all: unset` (Shadow DOM opt-in) | Shadow DOM (`:host`, CSS parts) |
| **Prop reflection** | Reflects all; disable per-prop | Reflects none; enable per-prop |
| **Accessibility** | Full Light DOM access | Shadow DOM accessibility limitations |
| **API** | Static class fields + reactive properties | Decorators + reactive properties |

The biggest philosophical difference is the DOM model. Lit uses Shadow DOM by default for strong encapsulation; Elena uses Light DOM by default for accessibility, SSR, and CSS inheritance, with Shadow DOM available as an opt-in. 

On the templating side, both use `html` tagged template literals, but Lit has a custom reactive template engine. Elena, on the other hand, provides just a thin wrapper around the native template literals.

### Elena vs Stencil

[Stencil](https://stenciljs.com) is a compiler that generates native web components, developed by the Ionic team. Unlike runtime libraries like Elena or Lit, Stencil is primarily a build tool. Components are authored in TypeScript + JSX and compiled to standalone custom elements:

| | Elena | Stencil |
|---|---|---|
| **Approach** | Runtime mixin | Compiler |
| **Language** | Vanilla JavaScript or TypeScript | TypeScript + JSX |
| **Build step** | Optional | Required |
| **Templating** | Native tagged template literals with auto-escaping | JSX (compiled via TypeScript) |
| **DOM model** | Light DOM (Shadow DOM opt-in) | Shadow DOM (default; configurable) |
| **Progressive enhancement** | HTML & CSS first, JavaScript enhances after | Requires JavaScript for rendering |
| **SSR** | Works out of the box; optional `@elenajs/ssr` for components with `render()` | Requires Stencil’s Hydrate app |
| **Prop reflection** | Reflects all; disable per-prop | Reflects none; enable per-prop |
| **Style encapsulation** | `@scope` + `all: unset` | Shadow DOM or scoped CSS |
| **API** | Static class fields + reactive properties | Decorators + JSX |
| **Output targets** | Not necessary | Custom elements, React, Angular, Vue wrappers |

Stencil’s standout feature is its output targets: it can generate framework-specific wrappers (React, Angular, Vue) automatically from the same component source. If you need generated bindings for multiple frameworks, Stencil has a clear advantage. Elena, by contrast, works directly with any framework without generated wrappers.

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
