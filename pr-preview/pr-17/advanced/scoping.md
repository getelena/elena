---
url: /pr-preview/pr-17/advanced/scoping.md
description: >-
  Learn how to scope Elena’s Progressive Web Component styles using CSS @scope,
  CSS encapsulation, and CSS cascade layers.
---

# Scoping styles

Elena recommends the [@scope](https://caniuse.com/css-cascade-scope) at-rule to prevent component styles from leaking out to the rest of the page:

```css
@scope (elena-button) {
  /**
   * Scoped styles for the elena-button. These won’t leak
   * out or affect any other elements in your app.
   */
}
```

To style the host element itself, use `:scope`:

```css
@scope (elena-button) {

  /* Targets the host element (elena-button) */
  :scope {
    all: unset;
    display: inline-block;
  }
}
```

## Preventing styles from leaking in

`@scope` stops your styles from leaking out, but it does not prevent global styles from leaking in. To block both directions, add a universal reset as the first rule inside `@scope`:

```css
/* Scope makes sure styles don’t leak out */
@scope (elena-button) {

  /* Reset makes sure styles don’t leak in */
  :scope,
  *:where(:not(img, svg):not(svg *)),
  *::before,
  *::after {
    all: unset;
    display: revert;
  }

  /* Rest of your component styles */
}
```

## Shadow DOM

When `@scope` with a reset isn’t enough, Elena supports an opt-in Shadow DOM mode for components. Set `static shadow` to `"open"` or `"closed"` on the class, and pass your styles via `static styles`:

```js
import styles from "./button.css" with { type: "css" };

export default class Button extends Elena(HTMLElement) {
  static tagName = "elena-button";
  static shadow = "open";
  static styles = styles;
}

Button.define();
```

Elena attaches the shadow root on first connect and adopts the stylesheets automatically. Rendering happens inside the shadow root, so external styles cannot reach in.

> \[!WARNING]
> Enabling Shadow DOM means that your component now relies entirely on client side JavaScript for rendering. Nothing will be visible to the user before the component has been fully initialized. See [Declarative Shadow DOM](/components/templates.md#declarative-shadow-dom) for a standards-based approach that can mitigate this.

### CSS in shadow mode

Since external stylesheets cannot reach inside the shadow root, you no longer need `@scope`:

```css
/* No @scope needed */
.my-button {
  font-family: sans-serif;
  color: white;
  background: blue;
}
```

CSS custom properties still pierce shadow boundaries, so your theming API continues working the same way:

```css
/* Still works: */
elena-button {
  --elena-button-bg: green;
}
```

## Styles without `@scope`

For older browsers that don’t support `@scope`, use namespaced selectors and the `:is()` pattern instead:

```css
/* Reset makes sure styles don’t leak in */
elena-button,
elena-button *:where(:not(img, svg):not(svg *)),
elena-button *::before,
elena-button *::after {
  all: unset;
  display: revert;
}

elena-button {
  display: inline-block;
}

:is(elena-button:not([hydrated]), .elena-button) {
  /* shared styles */
}

elena-button[variant="primary"] {
  /* variant */
}
```
