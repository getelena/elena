---
url: /pr-preview/pr-20/components/mixins.md
description: >-
  Learn how to write and compose mixins to share behavior across Elena
  Progressive Web Components.
---

# Mixins&#x20;

Mixins are a standard JavaScript pattern for sharing behavior across [Progressive Web Components](/components/overview). Since Elena’s `Elena()` factory is itself a mixin, custom mixins compose naturally with it.

## Writing a mixin

A mixin is a function that takes a base class and returns an extended class:

```js
const Draggable = (superClass) => class extends superClass {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("draggable", "true");
    this.addEventListener("dragstart", this._onDragStart);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("dragstart", this._onDragStart);
  }

  _onDragStart(e) {
    e.dataTransfer.setData("text/plain", this.text);
  }
};
```

## Using a mixin

Apply a mixin by wrapping it around the Elena base class:

```js
import { Elena, html } from "@elenajs/core";

class DraggableCard extends Draggable(Elena(HTMLElement)) {
  static tagName = "draggable-card";

  render() {
    return html`<div class="card">${this.text}</div>`;
  }
}
DraggableCard.define();
```

The mixin’s `connectedCallback` calls `super.connectedCallback()`, which reaches Elena’s built-in lifecycle. The result is a component with both Elena’s reactive rendering and your custom behavior.

## Composition order

Always apply mixins **after** `Elena()`:

```js
class MyComponent extends Draggable(Elena(HTMLElement)) { }
```

This way the mixin’s `super.connectedCallback()` reaches Elena’s implementation and has access to its API.

## Lifecycle rules

Elena’s lifecycle methods follow the standard `super` call pattern. Mixins that override lifecycle methods **must call `super`** to preserve Elena’s behavior:

| Method | Must call `super`? |
|---|---|
| `connectedCallback()` | Yes |
| `disconnectedCallback()` | Yes |
| `adoptedCallback()` | Yes |
| `attributeChangedCallback()` | Yes |
| `firstUpdated()` | Yes |
| `updated()` | Yes |
| `willUpdate()` | No (base is a no-op) |

## Multiple mixins

Mixins stack. Apply them left to right, with each wrapping the previous:

```js
const Loggable = (superClass) => class extends superClass {
  connectedCallback() {
    super.connectedCallback();
    console.log(`${this.tagName} connected`);
  }
};
```

```js
const Tooltipped = (superClass) => class extends superClass {
  connectedCallback() {
    super.connectedCallback();
    if (this.getAttribute("tooltip")) {
      this._setupTooltip();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._teardownTooltip();
  }

  _setupTooltip() { /* ... */ }
  _teardownTooltip() { /* ... */ }
};
```

```js
class FancyButton extends Loggable(Tooltipped(Elena(HTMLElement))) {
  static tagName = "fancy-button";
  // ...
}
FancyButton.define();
```

## Adding props

Mixins can introduce their own props. List them in `static props` on the final component class so Elena can observe them:

```js
const Sizeable = (superClass) => class extends superClass {
  /** @property @type {"sm" | "md" | "lg"} */
  size = "md";
};
```

```js
class SizeableButton extends Sizeable(Elena(HTMLElement)) {
  static tagName = "sizeable-button";
  static props = ["size", "variant"];

  /** @property @type {"default" | "primary"} */
  variant = "default";

  render() {
    return html`<button>${this.text}</button>`;
  }
}
SizeableButton.define();
```

> \[!TIP]
> Props must always be listed in `static props` on the component class for Elena to observe and sync them. A mixin can provide the default value and logic, but the final class is responsible for registering the prop.
