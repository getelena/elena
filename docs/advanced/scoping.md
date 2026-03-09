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