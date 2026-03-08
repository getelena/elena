# Loading Components

## Load event

Elena components can be loaded and defined asynchronously, so an element may not be interactive immediately. This means that you can set a property before the component has initialized and it will be applied correctly once hydration completes. However, you cannot call a method before the JavaScript has loaded.

Most of the time this is not an issue, as you will be calling methods through event handlers. In cases where you want to call a method as soon as possible, for example during a page load, you need to wait for the Elena web component to be defined, using `customElements.whenDefined`:

```html
<script type="module">
  const button = document.querySelector("elena-button");

  // It’s fine to set props while an Elena Element is loading
  button.variant = "primary";

  // But if you want to immediately call a method, you should
  // wait for the Elena Element to be defined
  await customElements.whenDefined("elena-button");
  button.click();
</script>
```

## Hide until loaded

Elena adds a `hydrated` attribute to the host element after its first connect. You can use this in CSS to hide or style a component before it becomes interactive:

```css
elena-button:not([hydrated]) {
  visibility: hidden;
}
```

This is the recommended approach when you want precise control over a specific component.

### Hide all undefined elements

For a broader solution that covers all undefined elements, you can use this CSS snippet from [Scott Jehl](https://scottjehl.com/posts/web-component-self-destruct-css/):

```css
@keyframes hideElena {
  0%,
  100% {
    visibility: hidden;
  }
}
:not(:defined) {
  animation: hideElena 2s;
}
```

> [!TIP]
> This CSS snippet will take care that as soon as your elements get defined, the hiding will instantly and automatically unapply. But it will also unapply itself after two seconds no matter what, should the JavaScript take that long to do its thing, or fail to run at all.
