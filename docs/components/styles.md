# Styles

These guidelines cover the approaches that we recommend when styling Progressive Web Components to make them work reliably across the lifecycle of a component. You're obviously able to craft the CSS the best way you see fit for your purpose, but there are some things to take into account that we've tried to cover below.

## Writing scoped styles

Elena recommends using the [@scope](https://caniuse.com/css-cascade-scope) at-rule which prevents the component styles from leaking to the outer page. This makes it possible to have entirely isolated styles without sacrificing inheritance or cascading:

```css
@scope (elena-button) {
  /**
   * Scoped styles for the elena-button. These won't leak
   * out or affect any other elements in your app.
   */
}
```

To style the host `elena-button` itself, you can use `:scope`:

```css
@scope (elena-button) {

  /* Targets the host element (elena-button) */
  :scope {
    all: unset;
    display: inline-block;
  }
}
```

The full baseline pattern for authoring encapsulated component styles looks like this:

```css
/* Scope makes sure styles don't leak out */
@scope (elena-button) {

  /* Unset makes sure styles don't leak in */
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
    appearance: none;
  }

  /* Rest of your component styles */
  button {
    display: inline-flex;
  }
  :scope[variant="primary"] {
    --elena-button-bg: red;
  }
}
```

The above patterns work great for **Primitive Components** that are self-contained and own and render their own HTML markup.

## Elena CSS Encapsulation Pattern

While the [scoped styles](#writing-scoped-styles) defined earlier prevent the component styles from leaking out, they do not prevent global styles from leaking in. For this, you can use this pattern that does both:

```css
/* Scope makes sure styles don't leak out */
@scope (elena-button) {

  /* Unset makes sure styles don't leak in */
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

## Pre-hydration state and styles

Since **Primitive Components** are self-contained and render their own HTML markup, you may sometimes need access to more than just the initial text content pre-hydration for better SSR support to avoid layout shifts.

This can be achieved with pseudo elements in CSS by referencing the attributes set on the element itself:

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

## Styling Composite Components

When styling **Composite Components** which wrap and enhance the HTML composed inside them, you would commonly style the host element and then provide customization with the props set on the component:

```css
/* Scope makes sure styles don't leak out */
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

Notice above that you don't have to worry about the pre-hydrated/hydrated states when styling **Composite Components** as all of their HTML lives in the Light DOM.

## Documenting public CSS properties

The documentation for the component's public CSS properties lives in the component itself:

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
> **`@elenajs/bundler`** transforms the above JSDocs automatically to Custom Elements Manifest which allows you to generate documentation that surfaces the component's public CSS properties.

## Styles without `@scope` (legacy)

For older browsers that don't support `@scope`, use namespaced selectors and the `:is()` pattern instead:

```css
/* Unset makes sure styles don't leak in */
elena-button,
elena-button *,
elena-button *::before,
elena-button *::after {
  all: unset;
}

elena-button { display: inline-block; }
:is(elena-button:not([hydrated]), .elena-button) { /* shared styles */ }
elena-button[variant="primary"] { /* variant */ }
```
