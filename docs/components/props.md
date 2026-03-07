# Props

Props are values you pass to an Elena component. Declare them in `static props` and Elena will keep them in sync with HTML attributes, and re-render the component whenever they change.

## Declaring props

List prop names in `static props`, and give each one a default value as a class field:

```js
export default class Button extends Elena(HTMLElement) {
  static props = ["variant", "disabled", "value", "type"];

  variant = "default";
  disabled = false;
  value = "";
  type = "button";
}
```

The default value also tells Elena what type the prop is. A default of `false` means it’s a boolean, `0` means a number, `[]` means an array, and so on. Elena uses this to convert the incoming attribute string to the right type.

> [!TIP]
> When naming props, try to keep them simple and a maximum of one word (e.g. `variant`).

## Built-in props

Every Elena element has a built-in `text` prop. On first connect, Elena automatically captures this text content from the light DOM, so you can pass text naturally as children:

```html
<my-button>Click me</my-button>
```

Use `this.text` in `render()` to reference it:

```js
render() {
  return html`<button>${this.text}</button>`;
}
```

Setting `text` programmatically also triggers a re-render:

```js
document.querySelector("my-button").text = "Save changes";
```

## Non-reflected props

By default, Elena writes all props back to the host element as HTML attributes. To turn this off for a specific prop, use the object form:

```js
export default class Button extends Elena(HTMLElement) {
  static props = [
    "variant",
    { name: "icon", reflect: false },
  ];

  variant = "default";
  icon = "";
}
```

`icon` still works as `this.icon` in JavaScript and updates the component when changed, but Elena won’t add it as an attribute on the element.

## Documenting props

Document each prop with JSDoc annotations. `@attribute` marks the field as a reflected HTML attribute, and `@type` describes the expected value.

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

/**
 * The type of the button.
 * @attribute
 * @type {"submit" | "reset" | "button"}
 */
type = "button";
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

/**
 * The type of the button.
 * @attribute
 */
type: "submit" | "reset" | "button" = "button";
```

:::


> [!TIP]
> **`@elenajs/bundler`** transforms these annotations into TypeScript types and a Custom Elements Manifest, giving IDEs and documentation tools rich information about your components.

## Prop types

Elena supports the following prop types. These are also picked up by `@elenajs/bundler` and included in the Custom Elements Manifest:

::: code-group

```js [JavaScript]
/** @type {string} */
/** @type {Number} */
/** @type {Array} */
/** @type {Boolean} */
/** @type {Object} */
/** @type {"default" | "primary" | "danger"} */
```

```ts [TypeScript]
// Use inline type annotations instead of @type in TypeScript:
variant: "default" | "primary" | "danger" = "default";
disabled: boolean = false;
value: string = "";
count: number = 0;
items: string[] = [];
```

:::
