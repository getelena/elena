# Lifecycle

Elena’s component lifecycle has two parts: the standard custom element lifecycle, and a reactive update cycle triggered by property changes.

Re-renders are batched. If multiple props change at once, Elena waits until the current task finishes, then renders all changes in one update. This happens via a microtask, so the DOM is updated before the browser paints:

<br/>

<div class="mermaid-container">

```mermaid
flowchart TD
    A([connectedCallback#40;#41;]) --> B[willUpdate#40;#41;]
    B --> C[render#40;#41;]
    C --> D{First connect?}
    D -->|yes| E[firstUpdated#40;#41;]
    E --> F[updated#40;#41;]
    D -->|no| F
    F --> G([updateComplete])

    H([Property change]) --> S[/Scheduled update/]
    R([requestUpdate#40;#41;]) --> S
    S --> J[willUpdate#40;#41;]
    J --> L[render#40;#41;]
    L --> F
```

</div>

## `connectedCallback()`

Runs when the element is added to the page. Sets up props, captures text content, renders, and wires up events.

## `willUpdate()`

Runs before every render, including the first. Override to compute derived state before the template evaluates.

## `render()`

Returns the HTML for this component as an `html` template. Called on connect and whenever the component needs re-rendering. Omit this method entirely for [Composite Components](#) — they don’t render their own HTML.

## `firstUpdated()`

Runs once after the first render. `this.element` is available here. Override to run one-time setup that requires the DOM.

## `updated()`

Runs after every render, including the first. `this.element` is available here. Override to react to changes after the DOM is updated. On first connect, `firstUpdated()` runs before `updated()`.

## `requestUpdate()`

Manually schedules a re-render. Use this when Elena can’t detect a change automatically. For example, when mutating an object or array in place:

```js
this.items.push("new item");
this.requestUpdate();
```

## `updateComplete`

A `Promise` that resolves after the next pending render finishes. Use it to wait for the DOM to settle before reading it:

```js
this.label = "Updated";
await this.updateComplete;
console.log(this.element.textContent); // "Updated"
```

Resolves immediately if no render is pending.

## `disconnectedCallback()`

Runs when the element is removed from the page. Cleans up event listeners.

## `attributeChangedCallback()`

Runs when an observed attribute changes. Updates the matching JavaScript property and triggers a re-render. Override to react to attribute changes directly:

```js
attributeChangedCallback(prop, oldValue, newValue) {
  super.attributeChangedCallback(prop, oldValue, newValue);
  // react to the change
}
```

| Parameter | Type | Description |
| --- | --- | --- |
| `prop` | `string` | The attribute name that changed. |
| `oldValue` | `string \| null` | The previous attribute value, or `null` if it wasn’t set. |
| `newValue` | `string \| null` | The new attribute value, or `null` if the attribute was removed. |
