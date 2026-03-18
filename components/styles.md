---
url: /elena/components/styles.md
description: >-
  These guidelines cover the approaches we recommend when styling Progressive
  Web Components to make them work reliably across the custom element lifecycle.
---

# Styles

These guidelines cover the approaches we recommend when styling [Progressive Web Components](/components/overview) to make them work reliably across the custom element lifecycle. You can craft the CSS however works best for your project, but the patterns below help avoid some common pitfalls.

## Writing scoped styles

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

### Preventing styles from leaking in

`@scope` stops your styles from leaking out, but it does not prevent global styles from leaking in. To prevent global styles from reaching in, add a universal reset as the first rule inside `@scope`:

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

For projects that use [CSS cascade layers](https://developer.mozilla.org/en-US/docs/Learn_web/CSS/Building_blocks/Cascade_layers), you can also control which styles win by declaring a layer order. Wrap your component styles in a named layer, then declare it after your base layer so it takes precedence:

```css
/* Global CSS layer order */
@layer global, elena;

/* Global CSS layer */
@layer global {
  button { color: red; }
}
```

```css
/* Component CSS layer */
@layer elena {
  @scope (elena-button) {
    button { color: blue; }
  }
}
```

## Full example

Here’s a full example using these patterns:

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

  /* Targets the host element (elena-button) */
  :scope {

    /* Public theming API (with default values set) */
    --_elena-button-bg: var(--elena-button-bg, blue);
    --_elena-button-text: var(--elena-button-text, white);
    --_elena-button-font: var(--elena-button-font, system-ui, sans-serif);

    /* Internal theming API references (usage) */
    background-color: var(--_elena-button-bg);
    color: var(--_elena-button-text);

    /* Display mode for the host element */
    display: inline-block;
  }

  /* Elena SSR Pattern to avoid layout shift */
  :scope:not([hydrated]),
  .elena-button:is(button) {
    font-family: var(--_elena-button-font);
    color: var(--_elena-button-text);
    background: var(--_elena-button-bg);
  
    display: inline-block;
  }

  /* Rest of your component styles */
  :scope[variant="primary"] {
    --_elena-button-bg: var(--elena-button-bg, red);
  }
}
```

The `:scope:not([hydrated]), .inner-element` pattern ensures components look the same before and after hydration. Elena adds the `hydrated` attribute to the host element after its first render. By applying the same baseline styles to both the unhydrated host and the rendered inner element, the component avoids any layout shift.

Use attribute selectors on `:scope` for variant and state styling:

```css
:scope[variant="primary"] { color: red }
:scope[disabled] { opacity: 0.5 }
```

## Pre-hydration state and styles

Since components with `render()` control their own internal markup, you may sometimes need to surface additional content before hydration. This can be done with CSS pseudo-elements and `attr()`:

```css
:scope:not([hydrated])::before {
  content: attr(label);
  /* etc */
}

:scope:not([hydrated])::after {
  content: attr(placeholder);
  /* etc */
}
```

For more detailed guidelines, see the [Server Side Rendering](/advanced/ssr) section.

> \[!TIP]
> You can skip this section entirely for components without `render()`, when you plan to [hide components until loaded](/advanced/loading#hide-until-loaded), or when the rest of your app renders client side only.

## Composite Components

Composite Components style the host element and can pass styles down to their composed children. Since they never render their own internal markup, there are no pre-hydration concerns:

```css
/* Scope makes sure styles don’t leak out */
@scope (elena-stack) {

  /* Targets the host element (elena-stack) */
  :scope {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-flow: column wrap;
    flex-direction: column;
    gap: 0.5rem;
  }

  /* Attributes provide customization */
  :scope[direction="row"] {
    flex-direction: row;
  }
}
```

## Theming API

Define public CSS custom properties on `:scope` to expose a theming API for consumers:

```css
/* Component definition */
@scope (elena-button) {
  :scope {
    /* Public theming API (with default values set) */
    --_elena-button-bg: var(--elena-button-bg, blue);
    --_elena-button-text: var(--elena-button-text, white);

    /* Internal theming API references (usage) */
    background-color: var(--_elena-button-bg);
    color: var(--_elena-button-text);
  }
}
```

Consumers can override these from outside the component:

```css
/* Consumer override */
elena-button {
  --elena-button-bg: green;
}
```

Custom properties cascade naturally: overrides set on a parent element are inherited by all matching components inside it.

## Documenting CSS properties

Document public CSS custom properties with `@cssprop` JSDoc on the component class:

```js
/**
 * The description of the component goes here.
 *
 * @cssprop [--elena-button-text] - Overrides the default text color.
 * @cssprop [--elena-button-bg] - Overrides the default background color.
 * @cssprop [--elena-button-font] - Overrides the default font-family.
 */
export default class Button extends Elena(HTMLElement) { /*...*/ }
```

> \[!TIP]
> **`@elenajs/bundler`** transforms these annotations into the Custom Elements Manifest, which tools and documentation generators can use to surface the component’s public CSS API.

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
