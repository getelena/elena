# Props

Elena allows you to define prop declarations using the `static props` field. This makes Elena aware of what external props passed to the element should be observed and synced as attributes between the web component host and the inner template element.

Props are declared in `static props`, with default values set as instance fields:

```js
export default class Button extends Elena(HTMLElement) {
  static props = ["variant", "disabled", "value", "type"];

  variant = "default";
  disabled = false;
  value = "";
  type = "button";
}
```

> [!TIP]
> When naming properties, keep them simple, easy to understand, and a maximum of 1 word (e.g. `variant`).

## Reflecting props to attributes

By default, Elena reflects all properties to the host element as HTML attributes. If you want to disable this feature for a specific property, use `reflect: false`:

```js
export default class Button extends Elena(HTMLElement) {
  static props = [
    { name: "icon", reflect: false },
  ];
}
```

## Documenting props

In addition to declaring props, you can (and should!) document them using a [JSDoc style syntax](https://jsdoc.app):

```js
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

/**
 * The type of the button.
 * @attribute
 * @type {"submit" | "reset" | "button"}
 */
type = "button";
```

> [!TIP]
> **`@elenajs/bundler`** transforms the above JSDocs automatically to TypeScript types and Custom Elements Manifest which allows tooling and IDEs to give rich information about the Elena elements.

## Prop types

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
