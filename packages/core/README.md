<div align="center">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://elenajs.com/img/elena-dark.png" alt="Elena" width="201" height="230">
  </source>
  <source media="(prefers-color-scheme: light)" srcset="https://elenajs.com/img/elena.png" alt="Elena" width="201" height="230">
  </source>
  <img src="https://elenajs.com/img/elena.png" alt="Elena" width="201" height="230">
</picture>

### Simple, tiny library for building Progressive Web Components.

<br/>

<a href="https://arielsalminen.com"><img src="https://img.shields.io/badge/creator-@arielle-F95B1F" alt="Creator @arielle"/></a>
<a href="https://www.npmjs.com/org/elenajs"><img src="https://img.shields.io/npm/v/@elenajs/core.svg" alt="Latest version on npm" /></a>
<a href="https://github.com/getelena/elena/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-yellow.svg" alt="Elena is released under the MIT license." /></a>
<a href="https://github.com/getelena/elena/actions/workflows/tests.yml"><img src="https://img.shields.io/badge/coverage-100%25-green" alt="Coverage 100%" /></a>
<a href="https://www.npmjs.com/package/@elenajs/core"><img src="https://img.shields.io/npm/dt/@elenajs/core.svg" alt="Total Downloads"></a>
<a href="https://github.com/getelena/elena/actions/workflows/tests.yml"><img src="https://github.com/getelena/elena/actions/workflows/tests.yml/badge.svg" alt="Tests status" /></a>

</div>

<br/>

<p align="center"><a href="https://elenajs.com">Elena</a> is a simple, tiny library (2kB) for building <a href="#what-is-a-progressive-web-component">Progressive Web Components</a>. With Elena, you can immediately render the component’s base HTML & CSS, then progressively enhance the experience with JavaScript rather than relying on it from the start. This approach provides great support for <a href="#server-side-rendering">Server Side Rendering</a>  <em>(and e.g. React Server&nbsp;Components)</em> without additional configuration or tooling.</p>

<br/>

## Table of contents

- **[Core principles](#core-principles)**
- **[What is a Progressive Web Component?](#what-is-a-progressive-web-component)**
- **[Getting started](#getting-started)**
  - **[Quick start](#quick-start)**
  - **[Installation](#installation)**
  - **[Creating a component](#create-a-composite-component)**
- **[Options](#options)**
- **[Props](#props)**
  - **[Prop types](#prop-types)**
- **[Events](#events)**
- **[Methods](#methods)**
  - **[Utility methods](#utility-methods)**
  - **[Custom methods](#custom-methods)**
- **[Templates](#templates)**
  - **[`html` and `nothing`](#html-and-nothing)**
  - **[Element ref](#element-ref)**
  - **[Text content](#text-content)**
  - **[Advanced template example](#advanced-template-example)**
- **[Live demos](#live-demos)**
- **[Usage examples](#usage-examples)**
  - **[Project examples](#project-examples)**
  - **[Component examples](#component-examples)**
- **[Misc](#misc)**
  - **[Load event](#load-event)**
  - **[Hide until loaded](#hide-until-loaded)**
  - **[Server Side Rendering](#server-side-rendering)**
  - **[TypeScript](#typescript)**
- **[CSS styles](#css-styles)**
  - **[Writing scoped styles](#writing-scoped-styles)**
  - **[Elena CSS Encapsulation Pattern](#elena-css-encapsulation-pattern)**
  - **[Pre-hydration state and styles](#pre-hydration-state-and-styles)**
  - **[Styling Composite Components](#styling-composite-components)**
  - **[Documenting public CSS properties](#documenting-public-css-properties)**
- **[Known issues](#known-issues)**
  - **[Browser compatibility](#browser-compatibility)**
  - **[JavaScript frameworks](#javascript-frameworks)**
- **[Packages in this monorepo](#packages)**
- **[Development](#development)**

## Core principles

- **Progressive:** Renders HTML and CSS first, hydrates it with JavaScript after.
- **Reliable:** Predictable lifecycle and property syncing with no hidden magic.
- **Interoperable:** Built on web standards; no proprietary abstractions.
- **Modular:** Small, composable pieces you can use independently.
- **Universal:** Works across frameworks, tools, and environments.
- **Lightweight:** 2kB minified & gzipped, zero runtime dependencies.
- **Accessible:** Built on semantic HTML, assistive technologies supported by default.

## What is a Progressive Web Component?

A _“Progressive Web Component”_ is a native Custom Element designed in two layers: a base layer of HTML and CSS that renders immediately, without JavaScript, and an enhancement layer of JavaScript that adds reactivity, event handling, and dynamic updates once it loads.

This mirrors the classic principle of [progressive enhancement](https://en.wikipedia.org/wiki/Progressive_enhancement): start from a functional baseline that works everywhere, then improve the experience for users who have JavaScript available. The result is components that render immediately, are more resilient to script failures, are naturally SSR-friendly, and also compatible with any framework.

There are two types of Progressive Web Components:

### Primitive Components

- Self-contained components that own and render their own HTML markup.
- All content is controlled through `props`, nothing is composed into them except text content.
- Examples: `button`, `input`, `checkbox`, `radio`, `textarea`, `icon`, `spinner`, `switch`.

### Composite Components

- Components that wrap and enhance the HTML composed inside them, including other components.
- Provide styling, layout, and behavior around the composed content.
- Examples: `stack`, `table`, `layout`, `card`, `banner`, `visually-hidden`, `fieldset`.

## Getting started

### Quick start

If you just want to quickly test Elena in a web browser, the fastest way is to include the following directly into your page with a `<script>` tag:

```html
<script type="module">
  import { Elena } from "https://unpkg.com/@elenajs/core@0.12.0";

  export default class MyComponent extends Elena(HTMLElement, {
    tagName: "my-component"
  }) {
    // Do something, or leave empty.
    // This is a valid Elena (composite) component as is.
  }
  MyComponent.define();
</script>
```

Once created, add scoped `<styles>` for your component as well:

```html
<style>
  @scope (my-component) {
    :scope {
      display: inline-block;
      background: pink;
      color: black;
    }
  }
</style>
```

Now you can use your component anywhere on the page:

```html
<my-component>Hello Elena!</my-component>
```

> [!TIP]
> Whilst this is the fastest way to get started, we don’t recommend it for production since you would be relying entirely on unpkg CDN. Instead, we recommend using the [@elenajs/bundler](#elenajsbundler) for production, for optimal performance.

### Installation

To install Elena as a dependency in your project, run:

```bash
npm install @elenajs/core
```

Once Elena is installed, you can import it from the package:

```js
import { Elena } from "@elenajs/core";
```

### Create a Composite Component

```js
// ░ [ELENA]: Composite Component
export default class Stack extends Elena(HTMLElement, {
  tagName: "elena-stack",
  props: ["direction"],
}) {
  constructor() {
    super();
    this.direction = "column";
  }
  // Note that Composite Components do not call render()
}
Stack.define();
```

#### Usage:

```html
<elena-stack>
  <elena-input label="Name" type="text"></elena-input>
  <elena-input label="Email" type="email"></elena-input>
  <elena-textarea label="Message"></elena-textarea>
  <elena-button type="submit">Submit</elena-button>
</elena-stack>
```

### …Or, create a Primitive Component

```js
import { Elena, html } from "@elenajs/core";

// ░ [ELENA]: Primitive Component
export default class Button extends Elena(HTMLElement, {
  tagName: "elena-button",
  props: ["variant"],
}) {
  constructor() {
    super();
    this.variant = "default";
  }
  // Primitive Components return their `html` in render()
  render() {
    return html`<button>${this.text}</button>`;
  }
}
Button.define();
```

#### Usage:

```html
<elena-button variant="primary">Save</elena-button>
<elena-button>Cancel</elena-button>
```

## Options

Elena provides an options object where you can set the following:

```js
export default class Button extends Elena(HTMLElement, {
  // Custom element tag name to register:
  tagName: "elena-button",

  // Props to observe and sync as attributes:
  props: ["label", "disabled"],

  // Events to delegate from the inner element:
  events: ["click", "focus", "blur"],

  // CSS selector for the inner element to be used as Ref:
  element: ".my-button",
})
```

All of Elena’s options are optional. `tagName` is required only if you want Elena to handle the web component registration for you. Otherwise call `customElements.define()` yourself:

```js
export default class Button extends Elena(HTMLElement) {
  // do something...
}
customElements.define("elena-button", Button);
```

Please note though that doing this means that your web component can no longer be used in a server context.

> [!TIP]
> When working with Primitive Components, leaving out `element` option means that Elena will try use `firstElementChild` instead, if available. In cases when your template markup is simple, this is actually more performant when you have hundreds or even thousands of Elena components on a page.

## Props

Elena allows you to define prop declarations in its options object. This makes Elena aware of what external props passed to the element should be observed and synced as attributes between the web component host and the inner template element (passed as an `element` in options).

Props are declared in the `props` array in the options object, with default values set inside the `constructor`:

```js
export default class Button extends Elena(HTMLElement, {
  props: ["variant", "disabled", "value", "type"],
}) {
  constructor() {
    super();

    this.variant = "default";
    this.disabled = false;
    this.value = "";
    this.type = "button";
  }
}
```

In addition to declaring props, you can (and should!) document them using a [JSDoc style syntax](https://jsdoc.app):

```js
/**
 * The style variant of the button.
 * @attribute
 * @type {"default" | "primary" | "danger"}
 */
this.variant = "default";

/**
 * Makes the component disabled.
 * @attribute
 * @type {Boolean}
 */
this.disabled = false;

/**
 * The value used to identify the button in forms.
 * @attribute
 * @type {string}
 */
this.value = "";

/**
 * The type of the button.
 * @attribute
 * @type {"submit" | "reset" | "button"}
 */
this.type = "button";
```

> [!TIP]
> **`@elenajs/bundler`** transforms the above JSDocs automatically to TypeScript types and Custom Elements Manifest which allows tooling and IDEs to give rich information about the Elena elements.

### Prop types

The `@type` can be one of the following native constructors:

```js
/** @type {string} */
/** @type {Number} */
/** @type {Array} */
/** @type {Boolean} */
/** @type {Object} */
```

Additionally, you can provide possible prop values using the following syntax:

```js
/** @type {"default" | "primary" | "danger"} */
```

## Events

Elena allows you to define event declarations in its options object. The `events` array is used for determining which events the element should listen to and delegate from the inner template element:

```js
export default class Button extends Elena(HTMLElement, {
  events: ["click", "focus", "blur"],
})
```

Once declared, Elena will set up the necessary event listeners and dispatching logic and take care of cleanup when the element is removed from the DOM.

> [!TIP]
> You can alternatively build your own custom logic inside the web component for events and not rely on the built-in functionality in Elena.

## Methods

Elena ships with the following built-in lifecycle methods:

- **`connectedCallback()`:** Called each time the element is added to the DOM.
- **`disconnectedCallback()`:** Called each time the element is removed from the DOM.
- **`attributeChangedCallback()`:** Called when Elena’s props are changed, added, removed or replaced.
- **`render()`:** Called whenever there’s an update that needs rendering.
- **`updated()`:** Performs a post-update and adds the `hydrated` attribute to the Host element.

### Utility methods

Additionally, Elena provides the following utility methods:

#### `ClassName.define()`

Register the web component with SSR guards. Call this on your subclass after the class body is defined. The tag name is read from the `tagName` option set when calling `Elena()`.

```js
MyElement.define();
```

#### `html`

Tagged template for defining an Elena web component’s HTML structure. Return it from `render()`. Dynamic values are auto-escaped, and nested `html` sub-templates pass through as trusted HTML without double-escaping:

```js
import { Elena, html } from "@elenajs/core";

// ...later:
render() {
  return html`
    <button class="elena-button">
      ${this.text}
    </button>
  `;
}
```

#### `nothing`

A placeholder you can use in conditional template expressions when there is nothing to render. It always produces an empty string and signals to the template engine that no processing is needed.

```js
import { Elena, html, nothing } from "@elenajs/core";

// ...later:
render() {
  return html`
    <button>
      ${this.icon ? html`<span class="icon">${this.icon}</span>` : nothing}
      ${this.text}
    </button>
  `;
}
```

### Custom methods

You can also define your own custom methods:

```js
export default class Button extends Elena(HTMLElement) {
  myMethod() {
    console.log(this.element);
  }
}
```

Elena also allows you to extend the lifecycle methods by calling `super`:

```js
export default class Button extends Elena(HTMLElement) {

  connectedCallback() {
    super.connectedCallback();
    console.log("Element was added to the DOM.");
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    console.log("Element was removed from the DOM.");
  }
}
```

## Templates

Elena uses an HTML-based template syntax built on JavaScript [tagged template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals). Return an `html` tagged template from `render()`:

```js
import { Elena, html } from "@elenajs/core";

// ...later:
render() {
  return html`
    <button variant="${this.variant || "default"}">
      ${this.text}
    </button>
  `;
}
```

The content of the `html` method is passed as tagged template literals, which Elena then compiles on the fly.

### `html` and `nothing`

Use nested `html` sub-templates for conditional HTML blocks. Use `nothing` as a placeholder when a condition is false and there is nothing to render:

```js
import { Elena, html, nothing } from "@elenajs/core";

// ...later:
render() {
  return html`
    ${this.error ? html`<div class="error">${this.error}</div>` : nothing}
  `;
}
```

### Element ref

Elena provides a special **Ref** to the `element` you pass as a DOM selector:

```js
export default class Button extends Elena(HTMLElement, {
  element: ".my-button",
})
```

This allows you a direct access to the underlying DOM element:

```js
console.log(this.element);
```

### Text content

Every Elena element has a built-in reactive `text` property. On first connect, Elena automatically captures the element’s `textContent` from the light DOM before rendering. This lets you pass text content naturally as children:

```html
<elena-button>Click me</elena-button>
```

Use `this.text` in your component's `render()` method to reference the captured text:

```js
render() {
  return html`<button class="elena-button">${this.text}</button>`;
}
```

The `text` property is reactive, setting it programmatically triggers a re-render:

```js
const button = document.querySelector("elena-button");
button.text = "Save changes";
```

When used with JavaScript frameworks, passing text as children works for static text:

```jsx
// Works for static text
<elena-button>Click me</elena-button>
```

For dynamic text that changes over time, use the `text` property instead, since **Primitive Components** own their internal DOM and frameworks cannot update children after Elena has hydrated the element:

```jsx
// React
<elena-button text={buttonText} />

// Angular
<elena-button [text]="buttonText"></elena-button>

// Vue
<elena-button :text="buttonText"></elena-button>
```

> [!TIP]
> **Composite Components** don’t need the above, they preserve children naturally since they have no `render()` method. This feature is for **Primitive Components** only which own their internal DOM and would otherwise destroy any children passed to them.

### Advanced template example

```js
import { Elena, html, nothing } from "@elenajs/core";

// ...later:
render() {
  return html`
    <label for="${this.identifier}">${this.label}</label>
    <div class="elena-input-wrapper">
      ${this.start ? html`<div class="elena-input-start">${this.start}</div>` : nothing}
      <input
        id="${this.identifier}"
        class="elena-input ${this.start ? "elena-input-has-start" : nothing}"
      />
    </div>
    ${this.error ? html`<div class="elena-input-error">${this.error}</div>` : nothing}
  `;
}
```

## Live demos

- **[Button and stack component demo](https://arielsalminen.com/work/elena/)**

## Usage examples

### Project examples

- **[Usage with Angular](https://github.com/getelena/angular-example-project)**
- **[Usage with Eleventy](https://github.com/getelena/eleventy-example-project)**
- **[Usage with HTML](https://github.com/getelena/html-example-project)**
- **[Usage with Next.js](https://github.com/getelena/next-example-project)**
- **[Usage with React](https://github.com/getelena/react-example-project)**
- **[Usage with Svelte](https://github.com/getelena/svelte-example-project)**
- **[Usage with Vue](https://github.com/getelena/vue-example-project)**

### Component examples

#### Composite Component

Below is an example of a **Composite Component** which includes `props` and documentation:

```js
// ░ [ELENA]: Composite Component
import { Elena } from "@elenajs/core";

const options = {
  tagName: "elena-stack",
  props: ["direction"],
};

/**
 * Stack component manages layout of immediate children
 * with optional spacing between each child.
 *
 * @displayName Stack
 * @slot - The stacked content
 * @status alpha
 */
export default class Stack extends Elena(HTMLElement, options) {
  constructor() {
    super();

    /**
     * The direction of the stack.
     * @attribute
     * @type {"column" | "row"}
     */
    this.direction = "column";
  }
}
Stack.define();
```

#### Primitive Component

Below is an example of a **Primitive Component** which includes `props`, `events`, `methods` and documentation:

```js
// ░ [ELENA]: Primitive Component
import { Elena, html } from "@elenajs/core";

const options = {
  tagName: "elena-button",
  props: ["variant", "disabled", "type"],
  events: ["click", "focus", "blur"],
};

/**
 * The description of the component goes here.
 *
 * @displayName Button
 * @status alpha
 *
 * @event click - Programmatically fire click on the component.
 * @event focus - Programmatically move focus to the component.
 * @event blur - Programmatically remove focus from the component.
 *
 * @cssprop [--elena-button-text] - Overrides the default text color.
 * @cssprop [--elena-button-bg] - Overrides the default background color.
 * @cssprop [--elena-button-font] - Overrides the default font-family.
 */
export default class Button extends Elena(HTMLElement, options) {
  constructor() {
    super();

    /**
     * The style variant of the button.
     * @attribute
     * @type {"default" | "primary" | "danger"}
     */
    this.variant = "default";

    /**
     * Makes the component disabled.
     * @attribute
     * @type {Boolean}
     */
    this.disabled = false;

    /**
     * The type of the button.
     * @attribute
     * @type {"submit" | "reset" | "button"}
     */
    this.type = "button";
  }

  /**
   * An example custom method.
   */
  myMethod() {
    console.log(this.element);
  }

  /**
   * Renders the button component template.
   * @internal
   */
  render() {
    return html`
      <button>${this.text}</button>
    `;
  }
}
Button.define();
```

## Misc

### Load event

Elena web components are self-contained and can be loaded and defined asynchronously. Therefore an element may not be interactive immediately.

If you set a property on an Elena web component before it has been fully initialized, it will be applied correctly and will use the values once it has finished client side hydration. However, you cannot call a method on an element before the JavaScript has been loaded.

Most of the time this is not an issue, as you will be calling methods through event handlers. In cases where you want to call a method as soon as possible, for example during a page load, you need to wait for the Elena web component to be defined, using `customElements.whenDefined`:

```html
<script type="module">
  const button = document.querySelector("elena-button");

  // It's fine to set props while an Elena Element is loading
  button.variant = "primary";

  // But if you want to immediately call a method, you should
  // wait for the Elena Element to be defined
  await customElements.whenDefined("elena-button");
  button.click();
</script>
```

### Hide until loaded

Sometimes you may want to hide your web components until they’re hydrated and interactive. You can achieve that with this small code snippet from [Scott Jehl](https://scottjehl.com/posts/web-component-self-destruct-css/):

```css
@keyframes hideElena {
  0%,
  100% {
    visibility: hidden;
  }
}
:not(:defined) {
  animation: hideElena 2s;
}
```

> [!TIP]
> This CSS snippet will take care that as soon as your elements get defined, the hiding will instantly and automatically unapply. But it will also unapply itself after two seconds no matter what, should the JavaScript take that long to do its thing, or fail to run at all.

### Server Side Rendering

Elena’s recommended approach to Server Side Rendering (SSR) is simple & straightforward. Since [Progressive Web Components](#what-is-a-progressive-web-component) are primarily HTML & CSS, you don’t need any special logic on the server to render them. The **[Composite Components](#2-composite-components)** provide a full support for SSR by default, while the **[Primitive Components](#1-primitive-components)** provide a partial support and do the rest of the hydration on the client side.

Partial SSR support for the **Primitive Components** means that the component’s base HTML & CSS lives in the `Light DOM`. The JavaScript lifecycle is then used to progressively enhance the functionality and markup once the element is registered.

The benefit of Elena’s approach is that it doesn’t need any extra logic on the server while still allowing you to ship all your layout components _(the “Composite Components"!)_ with full SSR support.

For the **Primitive Components**, our recommendation is to ship them with CSS styles that visually matches the `loading` and `hydrated` states without causing FOUC or FOIC _(Flash Of Unstyled Content, Flash Of Invisible Content)._ This can be achieved utilizing the provided `hydrated` attribute in your component styles:

```css
/* Elena SSR Pattern to avoid layout shift */
:scope:not([hydrated]),
.inner-element {
  color: var(--elena-button-text);
}
```

Elena currently provides SSR examples for the following frameworks:

- **[Eleventy](https://github.com/getelena/eleventy-example-project)**
- **[Plain HTML](https://github.com/getelena/html-example-project)**
- **[Next.js](https://github.com/getelena/next-example-project)**

In cases where you do want to expand the **Primitive Component** template inline, we also provide a package called [@elenajs/ssr](https://github.com/getelena/elena/tree/main/packages/ssr) that renders the Elena Primitive Components to HTML strings for full SSR support. Please see the [SSR package’s readme](https://github.com/getelena/elena/tree/main/packages/ssr) for usage guidelines.

> [!WARNING]
> Please note that `@elenajs/ssr` is an experimental package and not yet ready for production use. APIs may change without notice.

### TypeScript

Elena is written in vanilla JavaScript with JSDoc annotations. The **`@elenajs/core`** library ships its own type declarations (`dist/elena.d.ts`) which are generated automatically by `tsc` from the JSDoc so that you get full IntelliSense and type checking.

```ts
import { Elena, html, nothing } from "@elenajs/core";
// Elena, ElenaOptions, html, nothing are all typed
```

#### Generating types for your components

When you build your own Elena components, **`@elenajs/bundler`** can generate TypeScript declarations for each one. Running `elena build` (or calling the bundler programmatically) produces:

- **Per-component `.d.ts` files**: A declaration file for each component (e.g. `button.d.ts`) with typed props and event handlers, derived from your JSDoc annotations. This lets TypeScript resolve sub-path imports like `@my-lib/components/dist/button.js`.
- **`custom-elements.json`**: The [Custom Elements Manifest](https://custom-elements-manifest.open-wc.org/), a machine-readable description of your components used by IDEs and documentation tools.
- **`custom-elements.d.ts`**: JSX integration types that map your custom element tag names to their prop types. This enables autocomplete and type checking for `<elena-button variant="primary" />` in JSX/TSX files.

#### Using the generated types in a framework

The generated `custom-elements.d.ts` exports a `CustomElements` type map and a `ScopedElements` helper. To get type checking in JSX (this works with Next.js, see further down for more examples):

```ts
// types.d.ts (in your consuming project)
import type { CustomElements } from "@my-lib/components";

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

### TypeScript examples

Elena provides TypeScript examples for the following JavaScript frameworks:

- **[Next.js](https://github.com/getelena/next-example-project)**
- **[React](https://github.com/getelena/react-example-project)**
- **[Svelte](https://github.com/getelena/svelte-example-project)**
- **[Vue](https://github.com/getelena/vue-example-project)**

### Authoring Elena components with TypeScript

When using TypeScript (instead of JavaScript) to author the Elena components, you can simplify the code (like omitting the `constructor` part) and have your type definitions inline:

```ts
// ░ [ELENA]: Primitive Component
import { Elena, html } from "@elenajs/core";

export default class Button extends Elena(HTMLElement, {
  tagName: "elena-button",
  props: ["variant"],
}) {
  /**
   * The style variant of the component.
   * @attribute
   */
  variant: "default" | "primary" | "danger" = "default";

  /**
   * Renders the html template.
   * @internal
   */
  render() {
    return html`
      <button>${this.text}</button>
    `;
  }
}
Button.define();
```

## CSS styles

These guidelines cover the approaches that we recommend when styling Progressive Web Components to make them work reliably across the lifecycle of a component. You’re obviously able to craft the CSS the best way you see fit for your purpose, but there are some things to take into account that we’ve tried to cover below.

### Writing scoped styles

Elena recommends using the [@scope](https://caniuse.com/css-cascade-scope) at-rule which prevents the component styles from leaking to the outer page. This makes it possible to have entirely isolated styles without sacrificing inheritance or cascading:

```css
@scope (elena-button) {
  /**
   * Scoped styles for the elena-button. These won’t leak
   * out or affect any other elements in your app.
   */
}
```

To style the host `elena-button` itself, you can use `:scope`:

```css
@scope (elena-button) {

  /* Targets the host element (elena-button) */
  :scope {
    all: unset;
    display: inline-block;
  }
}
```

The full baseline pattern for authoring encapsulated component styles looks like this:

```css
/* Scope makes sure styles don’t leak out */
@scope (elena-button) {

  /* Unset makes sure styles don’t leak in */
  :scope, *, *::before, *::after {
    all: unset;
  }

  /* Targets the host element (elena-button) */
  :scope {

    /* Public CSS properties */
    --elena-button-font: sans-serif;
    --elena-button-text: white;
    --elena-button-bg: blue;

    /* Display mode for the host element */
    display: inline-block;
  }

  /* Elena SSR Pattern to avoid layout shift */
  :scope:not([hydrated]),
  button {
    font-family: var(--elena-button-font);
    color: var(--elena-button-text);
    background: var(--elena-button-bg);
    display: inline-block;
    appearance: none;
  }

  /* Rest of your component styles */
  button {
    display: inline-flex;
  }
  :scope[variant="primary"] {
    --elena-button-bg: red;
  }
}
```

The above patterns work great for **Primitive Components** that are self-contained and own and render their own HTML markup.

### Elena CSS Encapsulation Pattern

While the [scoped styles](#writing-scoped-styles) defined earlier prevent the component styles from leaking out, it does not prevent global styles from leaking in. For this, you can use this pattern that does both and then add your own component styles below:

```css
/* Scope makes sure styles don’t leak out */
@scope (elena-button) {

  /* Unset makes sure styles don’t leak in */
  :scope, *, *::before, *::after {
    all: unset; /* Or all: initial */
  }

  /* Rest of your component styles */
}
```

### Pre-hydration state and styles

Since **Primitive Components** are self-contained and render their own HTML markup, you may sometimes need access to more than just the initial text content pre-hydration for better SSR support to avoid layout shifts.

This can be achieved with pseudo elements in CSS by referencing the attributes set on the element itself:

```css
:scope:not([hydrated])::before {
  content: attr(label);
  /* etc */
}

:scope:not([hydrated])::after {
  content: attr(placeholder);
  /* etc */
}
```

For more detailed guidelines, see the [Server Side Rendering](#server-side-rendering) section.

> [!TIP]
> You can skip this section entirely for Composite Components, when you plan to [hide components until loaded](#hide-until-loaded), or when the rest of your app renders client side only.

### Styling Composite Components

When styling **Composite Components** which wrap and enhance the HTML composed inside them, you would commonly style the host element and then provide customization with the props set on the component:

```css
/* Scope makes sure styles don’t leak out */
@scope (elena-stack) {

  /* Unset makes sure styles don’t leak in */
  :scope, *, *::before, *::after {
    all: unset;
  }

  /* Targets the host element (elena-stack) */
  :scope {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-flow: column wrap;
    flex-direction: column;
    gap: 0.5rem;
  }

  /* Attributes provide customization */
  :scope[direction="row"] {
    flex-direction: row;
  }
}
```

Notice above that you don’t have to worry about the pre-hydrated/hydrated states when styling **Composite Components** as all of their HTML lives in the `Light DOM`.

### Documenting public CSS properties

The documentation for the component’s public CSS properties lives in the component itself:

```js
/**
 * The description of the component goes here.
 *
 * @cssprop [--elena-button-text] - Overrides the default text color.
 * @cssprop [--elena-button-bg] - Overrides the default background color.
 * @cssprop [--elena-button-font] - Overrides the default font-family.
 */
export default class Button extends Elena(HTMLElement) { /*...*/ }
```

> [!TIP]
> **`@elenajs/bundler`** transforms the above JSDocs automatically to Custom Elements Manifest which allows you to generate documentation that surfaces the component’s public CSS properties.

## Known issues

### Browser compatibility

- Firefox 148 has an open issue regarding CSS `@scope` and `attr[value]` selector that we’ve [documented here](https://codepen.io/arielsalminen/full/raMazZV). This is already fixed in the pre-release build though and that should be out soon.

### JavaScript frameworks

Rules that apply to **Primitive Components** when used with a framework:

- Never render a framework component _inside_ a Primitive Component (e.g. via `ReactDOM.createRoot(elenaElement)`). Elena calls `replaceChildren()` on render, which would destroy the framework’s fiber tree and cause DOM corruption.
- Avoid a JavaScript framework and Elena both mutating the same attribute on a Primitive Component. A framework’s reconciler would overwrite Elena’s changes on next reconcile, triggering many re-renders. Treat framework-controlled props as read-only inputs inside your Elena element’s `render()`:

  ```js
  // Good: framework passes text, Elena renders it
  <elena-button text={state.text} />

  render() {
    // Good: only reads, never writes back
    return html`<button>${this.text}</button>`;
  }
  // Good: Elena communicates back via events, framework updates state
  <elena-button text={state.text} onclick={e => setState(...)} />
  ```

  ```js
  // Bad: Elena writes back to a framework-controlled prop
  render() {
    this.setAttribute("label", this.label.toUpperCase()); // ← don't do this
  }
  ```

- You can’t pass dynamic text content as children. Instead use the `text` property, since **Primitive Components** own their internal DOM and frameworks cannot update children after the initial Elena render:

  ```jsx
  // React
  <elena-button text={buttonText} />

  // Angular
  <elena-button [text]="buttonText"></elena-button>

  // Vue
  <elena-button :text="buttonText"></elena-button>
  ```

> [!WARNING]
> React 17 does not pass `Array` or `Object` type props or event handlers to web components correctly. Use React 18+ for proper Elena support, or pass all props as string attributes.

## Packages

Elena is a monorepo containing several packages published to npm under the `@elenajs` scope:

- **[`@elenajs/core`](https://github.com/getelena/elena/tree/main/packages/core)** [![stability-release-candidate](https://img.shields.io/badge/stability-pre--release-48c9b0.svg)](https://github.com/mkenney/software-guides/blob/master/STABILITY-BADGES.md#release-candidate)
- **[`@elenajs/bundler`](https://github.com/getelena/elena/tree/main/packages/bundler)** [![stability-beta](https://img.shields.io/badge/stability-beta-33bbff.svg)](https://github.com/mkenney/software-guides/blob/master/STABILITY-BADGES.md#beta)
- **[`@elenajs/cli`](https://github.com/getelena/elena/tree/main/packages/cli)** [![stability-alpha](https://img.shields.io/badge/stability-alpha-f4d03f.svg)](https://github.com/mkenney/software-guides/blob/master/STABILITY-BADGES.md#alpha)
- **[`@elenajs/components`](https://github.com/getelena/elena/tree/main/packages/components)** [![stability-wip](https://img.shields.io/badge/stability-wip-lightgrey.svg)](https://github.com/mkenney/software-guides/blob/master/STABILITY-BADGES.md#work-in-progress)
- **[`@elenajs/ssr`](https://github.com/getelena/elena/tree/main/packages/ssr)** [![stability-experimental](https://img.shields.io/badge/stability-experimental-orange.svg)](https://github.com/mkenney/software-guides/blob/master/STABILITY-BADGES.md#experimental)
- **[`@elenajs/mcp`](https://github.com/getelena/elena/tree/main/packages/mcp)** [![stability-experimental](https://img.shields.io/badge/stability-experimental-orange.svg)](https://github.com/mkenney/software-guides/blob/master/STABILITY-BADGES.md#experimental)
- **[`@elenajs/plugin-cem-define`](https://github.com/getelena/elena/tree/main/packages/plugin-cem-define)** [![stability-beta](https://img.shields.io/badge/stability-beta-33bbff.svg)](https://github.com/mkenney/software-guides/blob/master/STABILITY-BADGES.md#beta)
- **[`@elenajs/plugin-cem-tag`](https://github.com/getelena/elena/tree/main/packages/plugin-cem-tag)** [![stability-beta](https://img.shields.io/badge/stability-beta-33bbff.svg)](https://github.com/mkenney/software-guides/blob/master/STABILITY-BADGES.md#beta)
- **[`@elenajs/plugin-cem-typescript`](https://github.com/getelena/elena/tree/main/packages/plugin-cem-typescript)** [![stability-beta](https://img.shields.io/badge/stability-beta-33bbff.svg)](https://github.com/mkenney/software-guides/blob/master/STABILITY-BADGES.md#beta)
- **[`@elenajs/plugin-rollup-css`](https://github.com/getelena/elena/tree/main/packages/plugin-rollup-css)** [![stability-beta](https://img.shields.io/badge/stability-beta-33bbff.svg)](https://github.com/mkenney/software-guides/blob/master/STABILITY-BADGES.md#beta)

<!-- https://github.com/mkenney/software-guides/blob/master/STABILITY-BADGES.md -->

## Development

### Commands

All commands run from the monorepo root (`elena/`):

```bash
pnpm install              # Install dependencies
pnpm build                # Build all packages
pnpm test                 # Run all tests
pnpm lint                 # Lint with ESLint
```

Core package commands (from `packages/core/`):

```bash
pnpm start                # Rollup watch
pnpm build                # Rollup build
pnpm test                 # Vitest with coverage
pnpm test:visual          # Playwright visual regression tests
pnpm test:visual:update   # Update visual test baselines
pnpm bench                # Run performance benchmarks
npx vitest run test/props.test.js   # Run a single test file
```

Elements dev server (from `packages/components/`):

```bash
pnpm start                 # web-dev-server with live reload
```

For more details about pull requests, commit conventions and code style, please see [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT

## Copyright

Copyright © 2026 [Ariel Salminen](https://arielsalminen.com)
