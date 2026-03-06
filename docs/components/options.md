# Options

Elena components are configured using static class fields:

```js
export default class Button extends Elena(HTMLElement) {
  // Custom element tag name to register.
  static tagName = "elena-button";

  // Props to observe and sync as attributes.
  static props = ["label", "disabled"];

  // Events to delegate from the inner element.
  static events = ["click", "focus", "blur"];

  // CSS selector for the inner element ref (this.element).
  // Omit when the target is the firstElementChild (faster default).
  static element = ".my-button";
}
```

> [!TIP]
> All options are optional. `static element` is a CSS selector for the inner element ref (`this.element`), used for event delegation and direct DOM access. When omitted, Elena uses `firstElementChild` instead, if available.

## Option reference

| Option | Type | Description |
|--------|------|-------------|
| `static tagName` | `string` | Custom element tag name to register (e.g. `"elena-button"`). When set, `ClassName.define()` will register the element using this name. |
| `static props` | `string[]` | Array of prop names (or `{ name, reflect? }` objects) to observe and sync as attributes (e.g. `["variant", "disabled"]`). |
| `static events` | `string[]` | Array of event names to delegate from the inner element (e.g. `["click", "focus", "blur"]`). |
| `static element` | `string` | Selector for the inner element ref (`this.element`). When omitted, Elena uses `firstElementChild`; bare identifier → `getElementsByClassName`; any other string → `querySelector`. |
