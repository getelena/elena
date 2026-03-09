# Events

## Delegated events

When a web component renders its own inner DOM via `render()`, native events like `click` fire on the inner element (e.g. the `<button>`), not on the host (`<elena-button>`). 

`static events` tells Elena to listen for those events on the inner element and re-fire them on the host, so consumers can attach listeners to the custom element directly:

```js
export default class Button extends Elena(HTMLElement) {
  static events = ["click", "focus", "blur"];
}
```

Consumers can then listen on the host element as usual:

::: code-group

```html [HTML]
<my-button>Click me</my-button>

<script>
  const button = document.querySelector("my-button");

  button.addEventListener("click", e => {
    console.log("clicked!", e);
  });
</script>
```

```html [Angular]
<my-button (click)="onClick($event)">Click me</my-button>
```

```tsx [Next.js]
export default function App() {
  return (
    <my-button onClick={e => console.log("clicked!", e)}>
      Click me
    </my-button>
  );
}
```

```tsx [React]
function App() {
  return (
    <my-button onClick={e => console.log("clicked!", e)}>
      Click me
    </my-button>
  );
}
```

```svelte [Svelte]
<my-button on:click={e => console.log("clicked!", e)}>
  Click me
</my-button>
```

```vue [Vue]
<template>
  <my-button @click="onClick">Click me</my-button>
</template>
```

:::


Elena sets up the listeners automatically and removes them when the element is disconnected from the DOM.

> [!TIP]
> Delegated events are re-fired as new `ElenaEvent` instances. Only the event `type` and `cancelable` flag carry over. Event-specific properties like `key`, `clientX`, or `data` are not copied. If you need access to those, listen directly on the inner element in `connectedCallback` instead.

If you need more control, you can also manage event listeners manually. Add them in `connectedCallback` and remove them in `disconnectedCallback`:

```js
export default class Button extends Elena(HTMLElement) {
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("click", this._onClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", this._onClick);
  }

  _onClick = e => {
    console.log("clicked!", e);
  };
}
```

> [!WARNING]
> Avoid defining your own `handleEvent` method on a component that uses `static events`. Elena uses `handleEvent` internally for event delegation, and overriding it will break the built-in behavior.

## Custom events

You can use `ElenaEvent` to fire your own events from inside a component. It extends the native `Event` with `bubbles: true` and `composed: true` already set:

```js
import { ElenaEvent } from "@elenajs/core";

this.dispatchEvent(new ElenaEvent("my-event", { detail: { value: 42 } }));
```

You can override either default if needed:

```js
this.dispatchEvent(new ElenaEvent("my-event", { bubbles: false }));
```

## Documenting events

Use the `@event` JSDoc tag on the component class to document which events a component fires. These are picked up by `@elenajs/bundler` and included in the Custom Elements Manifest:

```js
/**
 * @event click - Programmatically fire click on the component.
 * @event focus - Programmatically move focus to the component.
 * @event blur - Programmatically remove focus from the component.
 */
export default class Button extends Elena(HTMLElement) { /*...*/ }
```
