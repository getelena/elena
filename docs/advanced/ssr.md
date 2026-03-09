# Server-side rendering

Elena’s recommended approach to server-side rendering is simple and straightforward. Since Progressive Web Components are primarily HTML and CSS, you don’t need any special logic on the server to render them. Components without a `render()` method are fully SSR-compatible by default, while components with `render()` provide partial support and complete hydration on the client side.

Partial SSR support for components with `render()` means that the component’s base HTML and CSS lives in the Light DOM. The JavaScript lifecycle then progressively enhances the functionality and markup once the element is registered.

## Avoiding layout shifts

For **components with `render()`** specifically, our recommendation is to ship them with CSS styles that visually match the `loading` and `hydrated` states without causing layout shift, FOUC, or FOIC _(Flash Of Unstyled Content, Flash Of Invisible Content)._ This can be achieved utilizing the provided `hydrated` attribute in your component styles:

```css
/* Elena SSR Pattern to avoid layout shift */
:scope:not([hydrated]),
.inner-element {
  color: var(--elena-button-text);
}
```

Sometimes you may need access to more than just the initial text content pre-hydration for better SSR support to avoid layout shifts. This can be achieved with pseudo elements in CSS by referencing the attributes set on the element itself:

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

> [!TIP]
> You can skip this section entirely for components without `render()`, when you plan to [hide components until loaded](/advanced/loading#hide-until-loaded), or when the rest of your app renders client side only.

## Rendering to HTML strings

When you don’t want to handle the pre-hydration state with CSS, you can expand component templates inline using [@elenajs/ssr](https://github.com/getelena/elena/tree/main/packages/ssr).

> [!WARNING]
> `@elenajs/ssr` is an experimental package and not yet ready for production use. APIs may change without notice.

### Install

```bash
npm install @elenajs/ssr
```

### Basic usage

Register your components once, then pass any HTML string through `ssr()`:

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

### With Eleventy

Use `@elenajs/ssr` with [Eleventy](https://www.11ty.dev/) as either a transform or a shortcode.

#### As a transform

A transform processes every rendered page automatically, expanding any registered components with `render()` found in the output HTML. No shortcodes or special syntax needed: just write Elena components directly in your templates:

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

### API

#### `register(...components)`

Register Elena component classes for SSR expansion. Each class must have a `tagName` defined. Call this once before using `ssr()`.

```js
import { register } from "@elenajs/ssr";
import Button from "./button.js";
import Input from "./input.js";

register(Button, Input);
```

Throws an error if a component does not have a `tagName`.

#### `ssr(html)`

Parse an HTML string, expand registered components with `render()`, and return the rendered HTML.

| Parameter | Type     | Description                              |
| --------- | -------- | ---------------------------------------- |
| `html`    | `string` | HTML string containing Elena components. |

**Returns:** `string`, the rendered HTML with components expanded.

### How it works

1. **Parse** the input HTML string into a tree (tags, attributes, children).
2. **Walk** the tree depth-first. For each custom element tag, look it up in the registry.
3. **Expand** components with `render()` by constructing a lightweight instance, converting attribute strings to the correct prop types (boolean, number, array, object), calling `willUpdate()` if defined, and then calling `render()`.
4. **Recurse** into wrapper component children and non-component tags.
5. **Serialize** the tree back to an HTML string.

The rendered output matches what Elena produces on the client, using the same `html` tagged template escaping and whitespace normalization.

### Client-side hydration

The HTML produced by `ssr()` is designed for progressive enhancement. When the component JavaScript loads on the client:

1. Elena’s `connectedCallback` fires on the pre-rendered element.
2. `render()` runs and hydrates the component with interactivity.
3. Event listeners are attached, methods become available, and the `hydrated` attribute is added.

## Framework examples

Elena currently provides SSR examples for the following frameworks:

- **[Eleventy](https://github.com/getelena/eleventy-example-project)**
- **[Plain HTML](https://github.com/getelena/html-example-project)**
- **[Next.js](https://github.com/getelena/next-example-project):** Elena can be used inside [React Server Components](https://github.com/getelena/next-example-project/blob/main/src/app/page.tsx)

