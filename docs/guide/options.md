# Options

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

All of Elena's options are optional. `tagName` is required only if you want Elena to handle the web component registration for you. Otherwise call `customElements.define()` yourself:

```js
export default class Button extends Elena(HTMLElement) {
  // do something...
}
customElements.define("elena-button", Button);
```

Please note though that doing this means that your web component can no longer be used in a server context.

> [!TIP]
> When working with Primitive Components, leaving out `element` option means that Elena will try use `firstElementChild` instead, if available. In cases when your template markup is simple, this is actually more performant when you have hundreds or even thousands of Elena components on a page.

## Option reference

| Option | Type | Description |
|--------|------|-------------|
| `tagName` | `string` | Custom element tag name to register (e.g. `"elena-button"`). When set, `ClassName.define()` will register the element using this name. |
| `props` | `string[]` | Array of prop names to observe and sync as attributes (e.g. `["variant", "disabled"]`). |
| `events` | `string[]` | Array of event names to delegate from the inner element (e.g. `["click", "focus", "blur"]`). |
| `element` | `string` | Selector for the inner element ref (`this.element`). No value → `firstElementChild`; bare identifier → `getElementsByClassName`; any other string → `querySelector`. |
