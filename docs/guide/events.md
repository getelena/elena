# Events

Elena allows you to define event declarations using the `static events` field. The `events` array determines which events the element should listen to and delegate from the inner template element:

```js
export default class Button extends Elena(HTMLElement) {
  static events = ["click", "focus", "blur"];
}
```

Once declared, Elena will set up the necessary event listeners and dispatching logic and take care of cleanup when the element is removed from the DOM.

> [!TIP]
> You can alternatively build your own custom logic inside the web component for events and not rely on the built-in functionality in Elena.

## ElenaEvent

Elena ships a built-in `ElenaEvent` class that extends the native `Event` with `bubbles: true` and `composed: true` defaults, making it easy to fire events that cross the component boundary:

```js
import { ElenaEvent } from "@elenajs/core";

this.dispatchEvent(new ElenaEvent("my-event", { detail: { value: 42 } }));
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
