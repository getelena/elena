# Getting Started

## Quick start

If you just want to quickly test Elena in a web browser, the fastest way is to include the following directly into your page with a `<script>` tag:

```html
<script type="module">
  import { Elena } from "https://unpkg.com/@elenajs/core@0.15.0";

  export default class MyComponent extends Elena(HTMLElement, {
    tagName: "my-component"
  }) {
    // Do something, or leave empty.
    // This is a valid Elena (composite) component as is.
  }
  MyComponent.define();
</script>
```

Once created, add scoped `<style>` for your component as well:

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
> Whilst this is the fastest way to get started, we don't recommend it for production since you would be relying entirely on unpkg CDN. Instead, we recommend using the [@elenajs/bundler](https://github.com/getelena/elena/tree/main/packages/bundler) for production, for optimal performance.

## Installation

To install Elena as a dependency in your project, run:

```bash
npm install @elenajs/core
```

Once Elena is installed, you can import it from the package:

```js
import { Elena } from "@elenajs/core";
```

## Create a Composite Component

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

## …Or, create a Primitive Component

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
