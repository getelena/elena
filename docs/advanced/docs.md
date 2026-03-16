# Creating documentation

Elena components are documented using [JSDoc](https://jsdoc.app) annotations directly in the source code. When you run `elena build`, Elena reads these annotations and generates a Custom Elements Manifest, per-component TypeScript declarations, and JSX integration types.

## Class-level annotations

Place these on the JSDoc comment directly above the class declaration. These are picked up by `@elenajs/bundler` and included in the Custom Elements Manifest.

### `@displayName`

Sets the human-readable display name for the component in documentation tools.

```js
/**
 * @displayName Button
 */
export default class Button extends Elena(HTMLElement) { /*...*/ }
```

### `@status`

Indicates the stability of the component. Common values are `alpha`, `beta`, and `stable`.

```js
/**
 * @status alpha
 */
export default class Button extends Elena(HTMLElement) { /*...*/ }
```

### `@slot`

Documents the default slot of a Composite Component or the slots that a web component with Shadow DOM accepts.

```js
/**
 * @slot - The stacked content
 */
export default class Stack extends Elena(HTMLElement) { /*...*/ }
```

### `@event`

Documents the events a component fires.

```js
/**
 * @event click - Programmatically fire click on the component.
 * @event focus - Programmatically move focus to the component.
 * @event blur - Programmatically remove focus from the component.
 */
export default class Button extends Elena(HTMLElement) { /*...*/ }
```

### `@cssprop`

Documents public CSS custom properties exposed for theming.

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

Use `@internal` to mark methods that are implementation details and should not appear in the public API documentation.

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

Here is a complete component with all JSDoc annotations in place.

::: code-group

```js [JavaScript]
import { Elena, html } from "@elenajs/core";

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
   * Renders the template.
   * @internal
   */
  render() {
    return html`
      <button ${this.disabled ? "disabled" : nothing}>
        ${this.text}
      </button>
    `;
  }
}

Button.define();
```

```ts [TypeScript]
import { Elena, html } from "@elenajs/core";

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
   * Renders the template.
   * @internal
   */
  render() {
    return html`
      <button ${this.disabled ? "disabled" : nothing}>
        ${this.text}
      </button>
    `;
  }
}

Button.define();
```

:::

## How it works

`@elenajs/bundler` runs `elena build` in two stages:

1. **Rollup build:** compiles JavaScript and TypeScript source files, minifies CSS, and writes output to `dist/`.
2. **CEM analysis:** reads your source files and JSDoc annotations, then produces:
   - **`custom-elements.json`:** the [Custom Elements Manifest](https://custom-elements-manifest.open-wc.org/) describing the component’s tag name, props, events, and CSS custom properties in a machine-readable format.
   - **Per-component `.d.ts` files:** a TypeScript declaration file for each component (e.g. `button.d.ts`) with typed props and event handlers derived from your JSDoc. This lets TypeScript resolve sub-path imports like `@my-lib/components/dist/button.js`.
   - **`custom-elements.d.ts`:** JSX integration types that map your custom element tag names to their prop types, enabling autocomplete and type checking for `<elena-button variant="primary" />` in JSX/TSX files.

## Generated output

### `dist/custom-elements.json`

The [Custom Elements Manifest](https://custom-elements-manifest.open-wc.org/) describing the component’s tag name, props, events, and CSS custom properties in a machine-readable format.

```json
{
  "schemaVersion": "1.0.0",
  "readme": "",
  "modules": [
    {
      "kind": "javascript-module",
      "path": "src/index.js",
      "declarations": [],
      "exports": [
        {
          "kind": "js",
          "name": "Button",
          "declaration": {
            "name": "default",
            "module": "./button/button.js"
          }
        }
      ]
    },
    {
      "kind": "javascript-module",
      "path": "src/button/button.js",
      "declarations": [
        {
          "name": "Button",
          "displayName": "Button",
          "description": "Button component is used for interface actions.",
          "status": "alpha",
          "tagName": "elena-button",
          "customElement": true,
          "kind": "class",
          "cssProperties": [
            {
              "description": "Overrides the default text color.",
              "name": "--elena-button-text"
            },
            {
              "description": "Overrides the default background color.",
              "name": "--elena-button-bg"
            },
            {
              "description": "Overrides the default font family.",
              "name": "--elena-button-font"
            },
            {
              "description": "Overrides the default border radius.",
              "name": "--elena-button-radius"
            }
          ],
          "members": [
            {
              "kind": "field",
              "name": "tagName",
              "type": {
                "text": "string"
              },
              "static": true,
              "default": "\"elena-button\""
            },
            {
              "kind": "field",
              "name": "events",
              "type": {
                "text": "array"
              },
              "static": true,
              "default": "[\"click\", \"focus\", \"blur\"]"
            },
            {
              "kind": "field",
              "name": "props",
              "type": {
                "text": "array"
              },
              "static": true,
              "default": "[\"variant\", \"disabled\"]"
            }
          ],
          "events": [
            {
              "description": "Programmatically fire click on the component.",
              "name": "click"
            },
            {
              "description": "Programmatically move focus to the component.",
              "name": "focus"
            },
            {
              "description": "Programmatically remove focus from the component.",
              "name": "blur"
            }
          ],
          "attributes": [
            {
              "name": "variant",
              "type": {
                "text": "\"default\" | \"primary\" | \"danger\" | \"outline\""
              },
              "default": "\"default\"",
              "description": "The style variant of the button.",
              "fieldName": "variant"
            },
            {
              "name": "disabled",
              "type": {
                "text": "boolean"
              },
              "default": "false",
              "description": "Makes the component disabled.",
              "fieldName": "disabled"
            },
            {
              "name": "text",
              "fieldName": "text",
              "type": {
                "text": "string"
              },
              "description": "The text content of the element, captured from light DOM before the first render."
            }
          ],
          "mixins": [
            {
              "name": "Elena",
              "package": "@elenajs/core"
            }
          ],
          "superclass": {
            "name": "HTMLElement"
          }
        }
      ],
      "exports": [
        {
          "kind": "js",
          "name": "default",
          "declaration": {
            "name": "Button",
            "module": "src/button/button.js"
          }
        },
        {
          "kind": "custom-element-definition",
          "name": "elena-button",
          "declaration": {
            "name": "Button",
            "module": "src/button/button.js"
          }
        }
      ]
    }
  ]
}
```

### `dist/button.d.ts`

A TypeScript declaration file for the component with typed props and event handlers derived from your JSDoc. This lets TypeScript resolve sub-path imports like `@my-lib/components/dist/button.js`.

```ts
export type { ButtonProps } from './custom-elements.js';

declare class Button extends HTMLElement {
  /** The style variant of the button. */
  variant?: "default" | "primary" | "danger" | "outline";
  /** Makes the component disabled. */
  disabled?: boolean;
  /** The text content of the element, captured from light DOM before the first render. */
  text?: string;
  /** Programmatically fire click on the component. */
  onclick?: (e: CustomEvent<never>) => void;
  /** Programmatically move focus to the component. */
  onfocus?: (e: CustomEvent<never>) => void;
  /** Programmatically remove focus from the component. */
  onblur?: (e: CustomEvent<never>) => void;
}

export default Button;
```

### `dist/custom-elements.d.ts`

JSX integration types that map your custom element tag names to their prop types, enabling autocomplete and type checking for `<elena-button variant="primary" />` in JSX/TSX files.

```ts
/**
 * This type can be used to create scoped tags for your components.
 *
 * Usage:
 *
 * ```ts
 * import type { ScopedElements } from "path/to/library/jsx-integration";
 *
 * declare module "my-library" {
 *   namespace JSX {
 *     interface IntrinsicElements
 *       extends ScopedElements<'test-', ''> {}
 *   }
 * }
 * ```
 *
 */
export type ScopedElements<Prefix extends string = "", Suffix extends string = ""> = {
  [Key in keyof CustomElements as `${Prefix}${Key}${Suffix}`]: CustomElements[Key];
};

type BaseProps = {
  /** Content added between the opening and closing tags of the element */
  children?: any;
  /** Used for declaratively styling one or more elements using CSS (Cascading Stylesheets) */
  class?: string;
  /** Used for declaratively styling one or more elements using CSS (Cascading Stylesheets) */
  className?: string;
  /** Takes an object where the key is the class name(s) and the value is a boolean expression. When true, the class is applied, and when false, it is removed. */
  classList?: Record<string, boolean | undefined>;
  /** Specifies the text direction of the element. */
  dir?: "ltr" | "rtl";
  /** Contains a space-separated list of the part names of the element that should be exposed on the host element. */
  exportparts?: string;
  /** For <label> and <output>, lets you associate the label with some control. */
  htmlFor?: string;
  /** Specifies whether the element should be hidden. */
  hidden?: boolean | string;
  /** A unique identifier for the element. */
  id?: string;
  /** Keys tell React which array item each component corresponds to */
  key?: string | number;
  /** Specifies the language of the element. */
  lang?: string;
  /** Contains a space-separated list of the part names of the element. Part names allows CSS to select and style specific elements in a shadow tree via the ::part pseudo-element. */
  part?: string;
  /** Use the ref attribute with a variable to assign a DOM element to the variable once the element is rendered. */
  ref?: unknown | ((e: unknown) => void);
  /** Adds a reference for a custom element slot */
  slot?: string;
  /** Prop for setting inline styles */
  style?: Record<string, string | number>;
  /** Overrides the default Tab button behavior. Avoid using values other than -1 and 0. */
  tabIndex?: number;
  /** Specifies the tooltip text for the element. */
  title?: string;
  /** Passing 'no' excludes the element content from being translated. */
  translate?: "yes" | "no";
};

type BaseEvents = {};

export type ButtonProps = {
  /** The style variant of the button. */
  variant?: "default" | "primary" | "danger" | "outline";
  /** Makes the component disabled. */
  disabled?: boolean;
  /** The text content of the element, captured from light DOM before the first render. */
  text?: string;

  /** Programmatically fire click on the component. */
  onclick?: (e: CustomEvent<never>) => void;
  /** Programmatically move focus to the component. */
  onfocus?: (e: CustomEvent<never>) => void;
  /** Programmatically remove focus from the component. */
  onblur?: (e: CustomEvent<never>) => void;
};

export type CustomElements = {
  /**
   * Button component is used for interface actions.
   * ---
   *
   *
   * ### **Events:**
   *  - **click** - Programmatically fire click on the component.
   * - **focus** - Programmatically move focus to the component.
   * - **blur** - Programmatically remove focus from the component.
   *
   * ### **CSS Properties:**
   *  - **--elena-button-text** - Overrides the default text color. _(default: undefined)_
   * - **--elena-button-bg** - Overrides the default background color. _(default: undefined)_
   * - **--elena-button-font** - Overrides the default font family. _(default: undefined)_
   * - **--elena-button-radius** - Overrides the default border radius. _(default: undefined)_
   */
  "elena-button": Partial<ButtonProps & BaseProps & BaseEvents>;
};

```

## Using the generated types

Import `CustomElements` in your consuming project to enable autocomplete in JSX.

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
