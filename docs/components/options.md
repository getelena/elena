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

| Field | Type | Description |
|-------|------|-------------|
| `tagName` | `string` | The HTML tag name for this component (e.g. `"elena-button"`). Required for `define()` to register the element. |
| `props` | `(string \| { name: string, reflect?: boolean })[]` | The list of props this component accepts. Each prop stays in sync with its matching HTML attribute. Use `{ name, reflect: false }` to keep a prop JS-only without writing it back to the attribute. |
| `events` | `string[]` | Events to forward from the inner element up to the host (e.g. `["click", "focus", "blur"]`). |
| `element` | `string` | A CSS selector for the inner element that `this.element` points to (e.g. `".inner"`, `"button"`). Defaults to the first child element when omitted. |
