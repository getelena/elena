# Styles

These guidelines cover the approaches we recommend when styling Progressive Web Components to make them work reliably across the custom element lifecycle. You can craft the CSS however works best for your project, but the patterns below help avoid some common pitfalls.

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

## Primitive Component example

Here’s an example [Primitive Component](/components/primitives) using these patterns:

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

    /* Public CSS properties */
    --elena-button-font: sans-serif;
    --elena-button-text: white;
    --elena-button-bg: blue;

    /* Display mode for the host element */
    display: inline-block;
  }

  /* Elena SSR Pattern to avoid layout shift */
  :scope:not([hydrated]),
  button {
    font-family: var(--elena-button-font);
    color: var(--elena-button-text);
    background: var(--elena-button-bg);
    display: inline-block;
  }

  /* Rest of your component styles */
  :scope[variant="primary"] {
    --elena-button-bg: red;
  }
}
```

The `:scope:not([hydrated]), button` pattern ensures [Primitive Components](/components/primitives) look the same before and after hydration. Elena adds the `hydrated` attribute to the host element after its first render. By applying the same baseline styles to both the unhydrated host and the rendered inner element, the component avoids any layout shift.

Use attribute selectors on `:scope` for variant and state styling:

```css
:scope[variant="primary"] { --elena-button-bg: red; }
:scope[disabled] { opacity: 0.5; }
```

## Pre-hydration state and styles

Since [Primitive Components](/components/primitives) render their own internal markup, you may sometimes need to surface additional content before hydration. This can be done with CSS pseudo-elements and `attr()`:

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

> [!TIP]
> You can skip this section entirely for Composite Components, when you plan to [hide components until loaded](/reference/misc#hide-until-loaded), or when the rest of your app renders client side only.

## Composite Components

[Composite Components](/components/primitives) style the host element and can pass styles down to their composed children. Since they never render their own internal markup, there are no pre-hydration concerns:

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
    --elena-button-bg: blue;
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

> [!TIP]
> **`@elenajs/bundler`** transforms these annotations into the Custom Elements Manifest, which tools and documentation generators can use to surface the component’s public CSS API.

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
