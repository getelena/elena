# Loading Components

## Load event

Elena web components are self-contained and can be loaded and defined asynchronously. Therefore an element may not be interactive immediately.

If you set a property on an Elena web component before it has been fully initialized, it will be applied correctly and will use the values once it has finished client side hydration. However, you cannot call a method on an element before the JavaScript has been loaded.

Most of the time this is not an issue, as you will be calling methods through event handlers. In cases where you want to call a method as soon as possible, for example during a page load, you need to wait for the Elena web component to be defined, using `customElements.whenDefined`:

```html
<script type="module">
  const button = document.querySelector("elena-button");

  // It's fine to set props while an Elena Element is loading
  button.variant = "primary";

  // But if you want to immediately call a method, you should
  // wait for the Elena Element to be defined
  await customElements.whenDefined("elena-button");
  button.click();
</script>
```

## Hide until loaded

Sometimes you may want to hide your web components until they're hydrated and interactive. You can achieve that with this small code snippet from [Scott Jehl](https://scottjehl.com/posts/web-component-self-destruct-css/):

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
