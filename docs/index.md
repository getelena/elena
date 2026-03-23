---
title: Elena | Progressive Web Components
titleTemplate: false
lastUpdated: false
description: Elena is a simple, tiny library for building Progressive Web Components.
---

<pre class="elena" aria-hidden="true">
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

<h1 class="elena-heading">Introduction</h1>

## What is Elena?

**Elena is a simple, tiny library (2.6kB) for building [Progressive Web Components](/components/overview).** Unlike most web component libraries, Elena doesn’t force JavaScript for everything. You can load HTML and CSS first, then use JavaScript to progressively add interactivity. [^1]

[^1]: **Elena supports [multiple component models](/components/overview):** Composite Components that wrap and enhance the HTML composed inside them; Primitive Components that are self-contained and render their own HTML;
And Declarative Components that are a hybrid of these and utilize [Declarative Shadow DOM](/components/templates#declarative-shadow-dom).

### Here is a minimal example

::: code-group

```html [HTML]
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

[Try it in the playground](/playground/#composite-component)

> [!TIP] Prerequisites
> This documentation assumes familiarity with HTML, CSS, and JavaScript. If you're new to custom elements, the [MDN guide](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements) is a good starting point, though prior experience is not required.

## Why was Elena created

Elena was created by [@arielle](https://arielsalminen.com) after nearly a decade of building enterprise-scale design systems with [web components](https://arielsalminen.com/2019/why-we-use-web-components/). The recurring pain points were often similar: accessibility issues, server-side rendering, layout shifts, flash of invisible content, React Server Components, too much reliance on client side JavaScript, and compatibility with e.g. third party analytics tools.

Elena was built to solve these problems while staying grounded in web standards and what the platform natively provides. This is how _“Progressive Web Components”_ were born.

## Why should I use Elena

**Elena is built for teams creating component libraries and design systems.** If you need web components that work across multiple frameworks (such as [React](https://react.dev), [Next.js](https://nextjs.org), [Vue](https://vuejs.org), [Angular](https://angular.dev)), render HTML and CSS before JavaScript loads, and sidestep common issues like accessibility problems, SSR limitations, and layout shifts, Elena is built for exactly that.

It handles the cross-framework complexity (prop/attribute syncing, event delegation, framework compatibility) so you can focus on building components rather than plumbing.

## Elena’s features

- 🔋 **Extremely lightweight:** 2.6kB minified & compressed, simple and tiny by design.
- 📈 **Progressively enhanced:** Renders HTML & CSS first, then hydrates with JavaScript.
- 🫶 **Accessible by default:** Semantic HTML foundation with no Shadow DOM barriers.
- 🌍 **Standards based:** Built entirely on native custom elements & web standards.
- ⚡ **Reactive updates:** Prop and state changes trigger efficient, batched re-renders.
- 🎨 **Scoped styles:** Simple & clean CSS encapsulation without complex workarounds.
- 🖥️ **SSR friendly:** Works out of the box, with optional server-side utilities if needed.
- 🧩 **Zero dependencies:** No runtime dependencies, runs entirely on the web platform.
- 🔓 **Zero lock-in:** Works with every major framework, or no framework at all.

## Browser support

As a baseline, Elena’s progressive approach supports any web browser that’s capable of rendering Custom Elements. After that, it’s up to you to determine what is appropriate for your project when authoring CSS styles and JavaScript interactivity. Elena, the JavaScript library, is tested in the latest two versions of the following browsers:

<div class="elena-stack">
  <img src="/chrome.png" loading="lazy" width="56" height="56" alt="Chrome" />
  <img src="/safari.png" loading="lazy" width="56" height="56" alt="Safari" />
  <img src="/edge.png" loading="lazy" width="56" height="56" alt="Chrome" />
  <img src="/firefox.png" loading="lazy" width="56" height="56" alt="Chrome" />
  <img src="/opera.png" loading="lazy" width="56" height="56" alt="Chrome" />
</div>

## Next steps

- Start with the [Quick Start](/start/) guide.
- View the [Live examples](/examples/) for demos.
- Read how [Elena compares](/advanced/faq#how-does-elena-compare-against-other-tools) against other web component libraries.
- Browse our [FAQ](/advanced/faq) for frequently asked questions.
- Try Elena in the [Playground](/playground/).

<br/>
