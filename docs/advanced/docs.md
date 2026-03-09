# Creating documentation

Elena components are documented using [JSDoc](https://jsdoc.app) annotations written directly in the source file. When you run `elena build`, the `@elenajs/bundler` reads these annotations and generates a Custom Elements Manifest, per-component TypeScript declarations, and JSX integration types.

## How it works

`@elenajs/bundler` runs `elena build` in two stages:

1. **Rollup build:** compiles JavaScript and TypeScript source files, minifies CSS, and writes output to `dist/`.
2. **CEM analysis:** reads your source files and JSDoc annotations, then produces:
   - **`custom-elements.json`:** the [Custom Elements Manifest](https://custom-elements-manifest.open-wc.org/), a machine-readable description of your components used by IDEs and documentation tools.
   - **Per-component `.d.ts` files:** a TypeScript declaration file for each component (e.g. `button.d.ts`) with typed props and event handlers derived from your JSDoc. This lets TypeScript resolve sub-path imports like `@my-lib/components/dist/button.js`.
   - **`custom-elements.d.ts`:** JSX integration types that map your custom element tag names to their prop types, enabling autocomplete and type checking for `<elena-button variant="primary" />` in JSX/TSX files.

## Class-level annotations

Place these on the JSDoc comment directly above the class declaration.

### `@displayName`

Sets the human-readable display name for the component in documentation tools. This is picked up by `@elenajs/bundler` and included in the Custom Elements Manifest:

```js
/**
 * @displayName Button
 */
export default class Button extends Elena(HTMLElement) { /*...*/ }
```

### `@status`

Indicates the stability of the component. Common values are `alpha`, `beta`, and `stable`. This is picked up by `@elenajs/bundler` and included in the Custom Elements Manifest:

```js
/**
 * @status alpha
 */
export default class Button extends Elena(HTMLElement) { /*...*/ }
```

### `@slot`

Documents the default slot of an HTML Web Component or the slots that a web component with Shadow DOM accepts. This is picked up by `@elenajs/bundler` and included in the Custom Elements Manifest:

```js
/**
 * @slot - The stacked content
 */
export default class Stack extends Elena(HTMLElement) { /*...*/ }
```

### `@event`

Documents the events a component fires. These are picked up by `@elenajs/bundler` and included in the Custom Elements Manifest:

```js
/**
 * @event click - Programmatically fire click on the component.
 * @event focus - Programmatically move focus to the component.
 * @event blur - Programmatically remove focus from the component.
 */
export default class Button extends Elena(HTMLElement) { /*...*/ }
```

### `@cssprop`

Documents public CSS custom properties exposed for theming. These are picked up by `@elenajs/bundler` and included in the Custom Elements Manifest:

```js
/**
 * @cssprop [--elena-button-text] - Overrides the default text color.
 * @cssprop [--elena-button-bg] - Overrides the default background color.
 * @cssprop [--elena-button-font] - Overrides the default font family.
 */
export default class Button extends Elena(HTMLElement) { /*...*/ }
```

## Prop annotations

Document each prop with JSDoc directly above its instance field declaration. `@attribute` marks the field as a reflected HTML attribute. `@type` describes the expected value.

::: code-group

```js [JavaScript]
/**
 * The style variant of the button.
 * @attribute
 * @type {"default" | "primary" | "danger"}
 */
variant = "default";

/**
 * Makes the component disabled.
 * @attribute
 * @type {Boolean}
 */
disabled = false;

/**
 * The value used to identify the button in forms.
 * @attribute
 * @type {string}
 */
value = "";
```

```ts [TypeScript]
/**
 * The style variant of the button.
 * @attribute
 */
variant: "default" | "primary" | "danger" = "default";

/**
 * Makes the component disabled.
 * @attribute
 */
disabled: boolean = false;

/**
 * The value used to identify the button in forms.
 * @attribute
 */
value: string = "";
```

:::

The supported `@type` values in JavaScript are:

```js
/** @type {string} */
/** @type {Number} */
/** @type {Array} */
/** @type {Boolean} */
/** @type {Object} */
/** @type {"default" | "primary" | "danger"} */
```

In TypeScript, write inline type annotations instead of `@type` and the bundler will derive the types directly from the declarations.

## Method annotations

Use `@internal` to mark methods that are implementation details and should not appear in the public API documentation:

```js
/**
 * Renders a link: <a href="#">.
 * @internal
 */
renderLink(template) {
  return html`<a href="${this.href}">${template}</a>`;
}
```

## Full example

Here is a complete component with all JSDoc annotations in place:

::: code-group

```js [JavaScript]
import { Elena, html, unsafeHTML, nothing } from "@elenajs/core";

/**
 * Button component is used for interface actions.
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
 * @cssprop [--elena-button-font] - Overrides the default font family.
 * @cssprop [--elena-button-radius] - Overrides the default border radius.
 */
export default class Button extends Elena(HTMLElement) {
  static tagName = "elena-button";
  static events = ["click", "focus", "blur"];
  static props = [
    "variant",
    "disabled",
    "label",
    { name: "icon", reflect: false },
  ];

  /**
   * The style variant of the button.
   * @attribute
   * @type {"default" | "primary" | "danger" | "outline"}
   */
  variant = "default";

  /**
   * Makes the component disabled.
   * @attribute
   * @type {boolean}
   */
  disabled = false;

  /**
   * Sets aria-label for the inner button.
   * @attribute
   * @type {string}
   */
  label = "";

  /**
   * An SVG icon to display inside the button.
   * @attribute
   * @type {string}
   */
  icon = "";

  /**
   * Renders the template.
   * @internal
   */
  render() {
    const icon = this.icon
      ? unsafeHTML(`<span class="elena-icon">${this.icon}</span>`)
      : nothing;

    return html`
      <button
        class="elena-button"
        ${this.disabled ? "disabled" : nothing}
        ${this.label ? html`aria-label="${this.label}"` : nothing}
      >
        ${this.text ? html`<span>${this.text}</span>` : nothing}
        ${icon}
      </button>
    `;
  }
}

Button.define();
```

```ts [TypeScript]
import { Elena, html, unsafeHTML, nothing } from "@elenajs/core";

/**
 * Button component is used for interface actions.
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
 * @cssprop [--elena-button-font] - Overrides the default font family.
 * @cssprop [--elena-button-radius] - Overrides the default border radius.
 */
export default class Button extends Elena(HTMLElement) {
  static tagName = "elena-button";
  static events = ["click", "focus", "blur"];
  static props = [
    "variant",
    "disabled",
    "label",
    { name: "icon", reflect: false },
  ];

  /**
   * The style variant of the button.
   * @attribute
   */
  variant: "default" | "primary" | "danger" | "outline" = "default";

  /**
   * Makes the component disabled.
   * @attribute
   */
  disabled: boolean = false;

  /**
   * Sets aria-label for the inner button.
   * @attribute
   */
  label: string = "";

  /**
   * An SVG icon to display inside the button.
   * @attribute
   */
  icon: string = "";

  /**
   * Renders the template.
   * @internal
   */
  render() {
    const icon = this.icon
      ? unsafeHTML(`<span class="elena-icon">${this.icon}</span>`)
      : nothing;

    return html`
      <button
        class="elena-button"
        ${this.disabled ? "disabled" : nothing}
        ${this.label ? html`aria-label="${this.label}"` : nothing}
      >
        ${this.text ? html`<span>${this.text}</span>` : nothing}
        ${icon}
      </button>
    `;
  }
}

Button.define();
```

:::

## Generated output

Running `elena build` on the above produces:

**`dist/custom-elements.json`:** a manifest describing the component’s tag name, props, events, and CSS custom properties for IDEs and documentation tools.

**`dist/button.d.ts`:** a TypeScript declaration with typed props and event handlers:

```ts
export default class Button extends HTMLElement {
  variant: "default" | "primary" | "danger" | "outline";
  disabled: boolean;
  label: string;
  icon: string;
  text: string;
}
```

**`dist/custom-elements.d.ts`:** JSX integration types exporting a `CustomElements` map and `ScopedElements` helper for typed JSX usage.

## Using the generated types

Import `CustomElements` in your consuming project to enable autocomplete in JSX:

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

For framework-specific TypeScript examples, see [Using TypeScript](/advanced/typescript).
