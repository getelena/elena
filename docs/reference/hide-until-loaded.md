# Hide until loaded

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
