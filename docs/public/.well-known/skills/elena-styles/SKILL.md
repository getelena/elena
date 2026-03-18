---
name: elena-styles
description: Critical CSS rules for Elena components. @scope encapsulation, all:unset reset for Primitives only, SSR hydration pattern, theming, and browser bug workarounds.
---

# Elena Styles — Critical Rules

> Full reference: https://getelena.github.io/elena/llms-full.txt
> Page index: https://getelena.github.io/elena/llms.txt

## @scope

Use `@scope (tag-name)` to prevent component styles from leaking out to the page.

## Encapsulation reset

**Primitive Components: include the reset. Composite Components: do NOT.**

The reset prevents global styles from leaking into the component:

```css
@scope (elena-button) {
  :scope,
  *:where(:not(img, svg):not(svg *)),
  *::before,
  *::after {
    all: unset;
    display: revert;
  }
}
```

- The `:where(:not(img, svg):not(svg *))` exclusion is required — do not simplify to `*`. It preserves image and SVG rendering.
- `display: revert` restores browser default display values after `all: unset` removes them.
- Composite Components intentionally let global styles flow in — no reset.

## SSR hydration pattern

Style both the host before hydration AND the rendered inner element with the same baseline styles to avoid layout shift:

```css
:scope:not([hydrated]),
.elena-button:is(button) {
  font-family: var(--_elena-button-font);
  background: var(--_elena-button-bg);
}
```

The `:scope:not([hydrated])` rule applies before JavaScript runs; the inner element selector applies after Elena renders and adds the `[hydrated]` attribute.

## Theming

Define CSS custom properties on `:scope` as the public theming API:

```css
:scope {
  /* Public theming API (with default values set) */
  --_elena-button-bg: var(--elena-button-bg, blue);
  --_elena-button-text: var(--elena-button-text, white);

  /* Internal theming API references (usage) */
  background-color: var(--_elena-button-bg);
  color: var(--_elena-button-text);
}
```

Annotate with `@cssprop [--prop-name] - description` JSDoc on the class for CEM documentation.

## Variant and state styling

Use attribute selectors on `:scope` — not descendant selectors:

```css
:scope[variant="primary"] { color: red }
:scope[disabled] { opacity: 0.5 }
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


## Browser bugs

**Firefox 148**: `@scope` combined with `attr()` value functions (e.g. `content: attr(label)`) fails to apply until a hover or repaint. Fixed in Firefox 149+. For broader Firefox support, use namespaced selectors instead of `@scope`.

**Safari (pre-TP 237)**: `@scope` rules do not apply to `<input>` and `<textarea>`. Fixed in Safari Technology Preview 237. Workaround: style form controls outside `@scope` using namespaced selectors, e.g. `elena-input input { ... }`.

## Shadow DOM

Opt in with `static shadow = "open"` and `static styles`. Elena renders into the shadow root. `@scope` is not needed inside Shadow DOM. CSS custom properties still pierce the shadow boundary for theming.
