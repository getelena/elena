---
title: Rendering
description: Learn how Elena detects changes, batches updates, and efficiently re-renders components.
---

# Rendering

Elena renders a web component once when it connects to the page. After that, any change to a [reactive property](/components/props) triggers an update. Elena performs updates asynchronously so property changes are batched: if there are multiple changes, they are combined into a single render.

## What triggers an update

Elena schedules an update when any of these change:

- **A prop value** listed in `static props` is set to a new value
- **The `text` property** is updated
- **An observed attribute** changes on the host element
- **`requestUpdate()`** is called manually

All four go through the same path: Elena schedules a batched update, then runs the [update cycle](/components/lifecycle). Only the parts of the DOM that changed are [updated](#how-the-dom-is-updated).

## How prop changes are detected

Props listed in `static props` are backed by JavaScript getters and setters. When you assign a new value, the setter compares it to the current value and schedules a re-render if it changed:

```js
// This will trigger an update
this.variant = "primary";

// This does not: the value is the same as above
this.variant = "primary";
```

Elena uses strict equality (`===`) to compare values. If the new value is the same reference as the old one, no render is scheduled.

### Reflected vs non-reflected props

By default, props reflect to HTML attributes. When a reflected prop changes, Elena updates the attribute, which triggers `attributeChangedCallback()`, which schedules the update. Non-reflected props (declared with `{ name, reflect: false }`) skip the attribute and schedule the update directly from the setter.

## Batched updates

Elena never renders synchronously in response to a prop change. Instead, it queues a [microtask](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide) the first time a change is detected. If more props change before the microtask runs, they are all included in the same update:

```js
// These three changes produce one update, not three
button.variant = "primary";
button.disabled = true;
button.text = "Save";
```

Because microtasks run before the browser paints, the DOM is updated in time for the next frame. There is no visible flicker between changes.

## What Elena cannot detect

Elena tracks prop changes through setters. If a value is mutated in place without going through the setter, Elena has no way to know it changed.

This applies to:

- **Pushing to an array:** `this.items.push("new")` mutates the existing array. The setter never fires because the array reference stays the same.
- **Changing a nested property:** `this.user.name = "Alex"` mutates the object in place.
- **Mutating any object or array** without reassigning the prop.

In these cases, call `requestUpdate()` to tell Elena that something changed:

```js
this.items.push("new item");
this.requestUpdate();
```

Alternatively, replace the value with a new reference. This goes through the setter and triggers a render automatically:

```js
this.items = [...this.items, "new item"];
```

> [!TIP]
> For simple cases, `requestUpdate()` is fine. For components that update lists or nested data frequently, replacing the value with a new reference is more predictable because it works the same as any other prop change.

## How the DOM is updated

When Elena re-renders, it calls `render()` and compares the result to what is currently in the DOM. It uses two strategies depending on what changed:

- **Patch:** if the template shape is the same, Elena patches only the text nodes that changed. The DOM structure stays intact, preserving element identity, focus state, and scroll position.
- **Morph:** if the template shape changed, Elena rebuilds the affected portion of the DOM and morphs it into place, updating attributes and text in existing nodes where possible.

## The update cycle

Each render follows the same sequence:

1. `willUpdate()` runs first, so you can compute derived state before the template evaluates.
2. `render()` is called to produce the new template shape.
3. Elena updates the DOM using the strategy [described above](#how-the-dom-is-updated).
4. `updated()` runs after the DOM is updated.

On the very first render, `firstUpdated()` also runs, right before `updated()`. See [Lifecycle](./lifecycle) for the full callback reference.

## Waiting for a render

Use `updateComplete` to wait for the current render to finish:

```js
this.text = "Updated";
await this.updateComplete;
console.log(this.element.textContent); // "Updated"
```

If no render is pending, `updateComplete` resolves immediately. See [Methods](./methods) for more details.

## Before the first render

Props can be set on an element before it connects to the page. Elena stores these values internally, but does not render until `connectedCallback()` runs. This means you can safely configure a component before adding it to the DOM:

```js
const button = document.createElement("elena-button");
button.variant = "primary";
button.text = "Save";
document.body.appendChild(button); // First render happens here
```
