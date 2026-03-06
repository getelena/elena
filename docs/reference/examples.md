# Examples

## Live demos

- **[Client, partial SSR](https://arielsalminen.com/elena/)**
- **[Server, full SSR](https://arielsalminen.com/elena/server.html)**

## Project examples

- **[Usage with Angular](https://github.com/getelena/angular-example-project)**
- **[Usage with Eleventy](https://github.com/getelena/eleventy-example-project)**
- **[Usage with HTML](https://github.com/getelena/html-example-project)**
- **[Usage with Next.js](https://github.com/getelena/next-example-project)**
- **[Usage with React](https://github.com/getelena/react-example-project)**
- **[Usage with Svelte](https://github.com/getelena/svelte-example-project)**
- **[Usage with Vue](https://github.com/getelena/vue-example-project)**

## Component examples

### Composite Component

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

### Primitive Component

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
