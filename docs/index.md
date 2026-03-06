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

Elena is built entirely on standards based custom elements and has no external dependencies. More than a library, it is a methodology for making [custom elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements) work progressively across all client and server side frameworks _(e.g. Next.js, React or Vue)._

### Elena’s features

- 🔋 **Extremely lightweight:** Only 2kB minified & gzipped with zero runtime overhead.
- 📈 **Progressively enhanced:** Renders HTML & CSS first, then hydrates with JavaScript.
- 🫶 **Accessible by default:** Semantic HTML foundation with no Shadow DOM barriers.
- 🌍 **Standards based:** Built entirely on native custom elements & web standards.
- ⚡ **Reactive props:** Prop changes sync to attributes and trigger updates automatically.
- 🎨 **Scoped styles:** Simple & clean CSS encapsulation without complex workarounds.
- 🖥️ **SSR friendly:** Works out of the box, with optional server-side utilities if needed.
- 🧩 **Zero dependencies:** No runtime dependencies, runs entirely on the web platform.
- 🔓 **Zero lock-in:** Works with every major framework, or no framework at all.

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

```ts [TypeScript]
import { Elena } from "@elenajs/core";

export default class Stack extends Elena(HTMLElement) {
  static tagName = "my-stack";
  static props = ["direction"];

  direction: "column" | "row" = "column";
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

> [!WARNING] Prerequisites
> Since Elena is a thin layer extending the functionality of standard custom elements, the rest of the documentation assumes familiarity with HTML, CSS and JavaScript. If you are totally new to custom elements, it might be a good idea to see the [MDN guide](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements) that covers them in detail. Prior experience with custom elements helps, but is not required when using Elena.


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

I ([@arielle](https://arielsalminen.com)) have worked with [web components](https://arielsalminen.com/2019/why-we-use-web-components/) for about a decade and built various enterprise grade design systems using this technology. While I love what they offer on paper, they also have a lot of issues when it comes to accessibility, server side rendering, layout shifts, FOUC/FOIC, and compatibility with e.g. various analytics tools.

With Elena, I wanted to solve these problems, as much as possible, while still sticking to web standards and what the web platform has to offer. This is how _“Progressive Web Components”_ were born.

## Why should I use Elena

First, a few questions to consider:

- Have you ever struggled with the [challenges described](#why-was-elena-created) above?
- Have you ever attempted to use plain custom elements to build something that would be consumed by various JavaScript frameworks such as [Next.js](#), [React](#), or [Vue](#)? 
- Have you noticed how things can get pretty complicated when you start to mix in reactivity, property/attribute syncing, and other features that a developer using those frameworks would expect as a standard?
- Do you want your web components to work with [React Server Components](#) and similar? 

If you answered _“yes”_ to some or all of the above, Elena may just be the right tool for you. Mainly, Elena is aimed at building component libraries. Elena’s tooling shines specifically at this, and provides many useful features to complement those workflows.

## Elena vs other libraries

Before talking about libraries, we need to talk about how Elena compares against the standard web components and what are the key differences:

- Elena does not use [Shadow DOM](#). Instead, everything lives in the Light DOM. This is an intentional design choice to improve accessibility and server side rendering.
- For style encapsulation, Elena provides a [CSS Encapsulation Pattern](#) that prevents the component styles from leaking out and the global styles from leaking in.
- Elena does not use `<template>`. Instead, all of your text content and most of the HTML markup is placed directly on the consuming webpage. 
- The only exception to above being [Primitive Components](#) that are self-contained and own and render their own HTML markup. With the primitives, only the host element and its text content live directly on the consuming webpage.

At this point, you may wonder, why are they called **Progressive Web Components** then? Wouldn’t **Progressive Custom Elements** make more sense? Yes and no. _Web Component_ is a much more widely recognized term today, hence we stick to what is familiar. Additionally, many of Elena’s concepts are based on what are now commonly referred to as [HTML Web Components](https://adactio.com/journal/20618).

## Next steps

- Start with the [Quick Start](#) guide.
- View the [Live Demos](#) for examples.
