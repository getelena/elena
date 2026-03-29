---
url: /pr-preview/pr-15/components/options.md
description: >-
  Reference for all Elena static class field options including tagName, props,
  events, element, shadow, and styles.
---

# Options

Elena components are configured using static class fields:

```js
/**
 * ░█ [ELENA]: Options
 */
export default class Button extends Elena(HTMLElement) {
  // Custom element tag name to register.
  static tagName = "elena-button";

  // Props to observe and sync as attributes.
  static props = ["variant", "disabled"];

  // Events to delegate from the inner element.
  static events = ["click", "focus", "blur"];

  // CSS selector for the inner element ref (this.element).
  // Omit when the target is the firstElementChild (faster default).
  static element = ".my-button";

  // Enable Shadow DOM (opt-in for those who need it).
  static shadow = "open";

  // Stylesheets to adopt into the shadow root.
  // Only required when using Shadow DOM.
  static styles = styles;
}

// Register the custom element after the class body is defined.
Button.define();
```

> \[!TIP]
> All options are optional. `static element` is a CSS selector for the inner element ref (`this.element`), used for event delegation and direct DOM access. When omitted, Elena uses `firstElementChild` instead, if available.

## Option reference

| Field | Type | Description |
|-------|------|-------------|
| `tagName` | `string` | The HTML tag name for this component (e.g. `"elena-button"`). Required for `define()` to register the element. |
| `props` | `(string \| { name: string, reflect?: boolean })[]` | The list of props this component accepts. Each prop stays in sync with its matching HTML attribute. Use `{ name, reflect: false }` to keep a prop JS-only without writing it back to the attribute. |
| `events` | `string[]` | Events to forward from the inner element up to the host (e.g. `["click", "focus", "blur"]`). Elena sets up listeners automatically and removes them when the element is disconnected. |
| `element` | `string` | A CSS selector for the inner element that `this.element` points to (e.g. `".inner"`, `"button"`). Defaults to the first child element when omitted. `this.element` is available in `render()`, lifecycle methods, and custom methods. |
| `shadow` | `"open" \| "closed"` | Attaches a shadow root to the host element. Elena renders into the shadow root instead of the host, fully isolating styles and DOM from the rest of the page. |
| `styles` | `CSSStyleSheet \| string \| (CSSStyleSheet \| string)[]` | One or more stylesheets to adopt into the shadow root. Only applies when `shadow` is also set. Pass a `CSSStyleSheet` via [CSS Module Scripts](https://web.dev/articles/css-module-scripts), or a raw CSS string. |
| `registry` | `CustomElementRegistry` | A [scoped registry](#scoped-registration) to associate with this component's shadow root. Child custom elements inside the shadow root are resolved from this registry instead of the global one. Only applies when `shadow` is also set. Chrome 146+, Edge 146+, Safari 26+. |

## Registering a component

Call `define()` on the class to register it as a custom element. Elena reads the tag name from `static tagName` and includes SSR guards and prevents double-registration:

```js
Button.define();
```

### Scoped registration

Pass a `CustomElementRegistry` to `define()` to register a component in a [Scoped Custom Element Registry](https://developer.chrome.com/blog/scoped-registries) instead of the global one:

```js
const registry = new CustomElementRegistry();
Button.define(registry);
```

Scoped registries isolate custom element definitions per shadow root. For details about browser compatibility, see [known issues](/advanced/gotchas).

## Next steps

* For more on declaring props, default values, and reflection, see [Props](./props).
