/**
 * Static markdown content describing Elena component authoring patterns.
 * Used by the elena://patterns resource.
 */
export const PATTERNS_CONTENT = `# Elena Component Authoring Patterns

## Component Types

Elena components are standard custom elements — they work everywhere HTML works.

There are three types of Progressive Web Components:

### 1. Composite Components
Components that wrap and enhance the HTML composed inside them. All of their HTML and CSS lives in the Light DOM. Also known as HTML Web Components. They have no \`render()\` method and never touch the light DOM children. Examples: stack, table, layout, card, banner, visually-hidden, fieldset.

### 2. Primitive Components
Self-contained components that own and render their own HTML markup. All content is controlled through \`props\`. Examples: button, input, checkbox, radio, textarea, icon, spinner, switch.

### 3. Declarative Components
A hybrid that uses Declarative Shadow DOM (\`<template shadowrootmode="open">\`). The browser attaches the shadow root during parsing, so shadow content is visible before JavaScript loads. When a component with \`static shadow\` connects and finds a shadow root already attached, Elena skips \`attachShadow()\` and works with the existing one. Content stays in the light DOM and is projected via \`<slot>\`.

---

## Component Structure

### Static Class Fields

Elena components are configured using static class fields on the class body:

- **\`static tagName\`** — Custom element tag name (e.g. \`"elena-button"\`)
- **\`static props\`** — Array of prop names to observe and sync as attributes
- **\`static events\`** — Array of event names to delegate from the inner element
- **\`static element\`** — CSS selector for the inner element ref (\`this.element\`). When omitted, Elena uses \`firstElementChild\` instead, if available. \`this.element\` is available in \`render()\`, lifecycle methods, and custom methods.
- **\`static shadow\`** — Set to \`"open"\` or \`"closed"\` to opt into Shadow DOM. Elena renders into the shadow root instead of the host, fully isolating styles and DOM from the rest of the page.
- **\`static styles\`** — One or more stylesheets to adopt into the shadow root. Only applies when \`shadow\` is also set. Pass a \`CSSStyleSheet\` (via CSS Module Scripts), a raw CSS string, or an array of either.

All static fields are optional.

### Primitive Component

\`\`\`js
import { Elena, html } from "@elenajs/core";

/**
 * Button component is used for interface actions.
 *
 * @displayName Button
 * @status alpha
 *
 * @event click - Programmatically fire click on the component.
 * @event focus - Programmatically move focus to the component.
 * @event blur - Programmatically remove focus from the component.
 *
 * @cssprop [--elena-button-text] - Overrides the default text color.
 * @cssprop [--elena-button-bg] - Overrides the default background color.
 */
export default class Button extends Elena(HTMLElement) {
  static tagName = "elena-button";
  static props = ["variant", "disabled"];
  static events = ["click", "focus", "blur"];

  /**
   * The style variant of the button.
   * @property
   * @type {"default" | "primary" | "danger"}
   */
  variant = "default";

  /**
   * Makes the component disabled.
   * @property
   * @type {Boolean}
   */
  disabled = false;

  /**
   * Renders the template.
   * @internal
   */
  render() {
    return html\\\`<button>\\\${this.text}</button>\\\`;
  }
}

Button.define();
\`\`\`

### Composite Component

\`\`\`js
import { Elena } from "@elenajs/core";

/**
 * Stack component manages layout of immediate children.
 *
 * @displayName Stack
 * @slot - The stacked content
 * @status alpha
 */
export default class Stack extends Elena(HTMLElement) {
  static tagName = "elena-stack";
  static props = ["direction"];

  /**
   * The direction of the stack.
   * @property
   * @type {"column" | "row"}
   */
  direction = "column";
}

Stack.define();
\`\`\`

### Declarative Component

\`\`\`js
import { Elena } from "@elenajs/core";

/**
 * Button component using Declarative Shadow DOM.
 *
 * @displayName Button
 * @status alpha
 */
export default class Button extends Elena(HTMLElement) {
  static tagName = "elena-button";
  static shadow = "open";
}

Button.define();
\`\`\`

\`\`\`html
<elena-button>
  <template shadowrootmode="open">
    <link rel="stylesheet" href="button.css" />
    <button><slot></slot></button>
  </template>
  Click me
</elena-button>
\`\`\`

---

## Templates

### \`html\`

Elena uses an HTML-based template syntax built on JavaScript tagged template literals. Return an \`html\` tagged template from \`render()\`:

\`\`\`js
import { html } from "@elenajs/core";

render() {
  return html\\\`
    <button type="\\\${this.type}">
      \\\${this.text}
    </button>
  \\\`;
}
\`\`\`

The \`html\` tag auto-escapes interpolated values to prevent XSS. Nested \`html\` fragments are passed through as trusted markup without double-escaping:

\`\`\`js
render() {
  const badge = html\\\`<span class="badge">\\\${this.count}</span>\\\`;

  return html\\\`
    <button>
      \\\${this.text} \\\${badge}
    </button>
  \\\`;
}
\`\`\`

Arrays of \`html\` fragments are rendered as HTML, so you can use \`.map()\` to render lists:

\`\`\`js
render() {
  return html\\\`
    <ul>
      \\\${this.items.map(item => html\\\`<li>\\\${item}</li>\\\`)}
    </ul>
  \\\`;
}
\`\`\`

Templates can also have multiple root elements:

\`\`\`js
render() {
  return html\\\`
    <label for="\\\${this.identifier}">\\\${this.label}</label>
    <input id="\\\${this.identifier}" type="\\\${this.type}" />
  \\\`;
}
\`\`\`

### \`nothing\`

Use \`nothing\` in conditional template expressions when there is nothing to render. It always produces an empty string and signals the template engine that no processing is needed:

\`\`\`js
import { html, nothing } from "@elenajs/core";

render() {
  return html\\\`
    <button>
      \\\${this.icon ? html\\\`<span>\\\${this.icon}</span>\\\` : nothing}
      \\\${this.text}
    </button>
  \\\`;
}
\`\`\`

Prefer \`nothing\` over \`""\` or \`false\` in template expressions. Empty strings and boolean false can produce unexpected whitespace or output.

### \`unsafeHTML\`

Values interpolated into \`html\` are auto-escaped to prevent XSS. \`unsafeHTML\` lets you render a plain string as raw HTML, skipping the escaping. Only use this for content you fully control, such as an SVG icon or trusted server markup:

\`\`\`js
import { html, unsafeHTML, nothing } from "@elenajs/core";

render() {
  const icon = this.icon ? unsafeHTML(\\\`<span>\\\${this.icon}</span>\\\`) : nothing;
  const text = this.text ? html\\\`<span>\\\${this.text}</span>\\\` : nothing;

  return html\\\`
    <button class="my-button">
      \\\${text} \\\${icon}
    </button>
  \\\`;
}
\`\`\`

> **Warning:** Only use \`unsafeHTML\` with content you control. Never pass user-supplied strings to it.

### Element Ref

When \`static element\` is set, Elena resolves \`this.element\` after the first render, giving you direct access to the inner DOM element. Use it in \`render()\`, \`firstUpdated()\`, \`updated()\`, or any custom method:

\`\`\`js
export default class Button extends Elena(HTMLElement) {
  static element = ".my-button";

  updated() {
    this.element.focus();
  }
}
\`\`\`

When \`static element\` is omitted, Elena falls back to \`firstElementChild\`, if available.

### Advanced Examples

#### Rendering Lists

Use \`.map()\` to render arrays of data as repeated markup. Each array element can be an \`html\` fragment, a plain string, or \`nothing\`:

\`\`\`js
render() {
  return html\\\`
    <nav>
      \\\${this.links.map(link =>
        link.visible
          ? html\\\`<a href="\\\${link.url}">\\\${link.label}</a>\\\`
          : nothing
      )}
    </nav>
  \\\`;
}
\`\`\`

For components where the list data is a prop, use \`willUpdate()\` to derive the filtered or transformed list before rendering:

\`\`\`js
willUpdate() {
  this._visibleLinks = this.links.filter(link => link.visible);
}

render() {
  return html\\\`
    <nav>
      \\\${this._visibleLinks.map(link =>
        html\\\`<a href="\\\${link.url}">\\\${link.label}</a>\\\`
      )}
    </nav>
  \\\`;
}
\`\`\`

#### Conditional Attributes

You can conditionally add or remove HTML attributes by interpolating a string or \`nothing\`:

\`\`\`js
render() {
  return html\\\`
    <button
      type="\\\${this.type}"
      \\\${this.disabled ? "disabled" : nothing}
      \\\${this.label ? html\\\`aria-label="\\\${this.label}"\\\` : nothing}
    >
      \\\${this.text}
    </button>
  \\\`;
}
\`\`\`

#### Helper Render Methods

For components that can render as different elements (e.g. a button that becomes a link when \`href\` is set), split the logic into helper methods and compose them in \`render()\`:

\`\`\`js
import { html, unsafeHTML, nothing } from "@elenajs/core";

/** @internal */
renderButton(template) {
  return html\\\`
    <button
      type="\\\${this.type}"
      \\\${this.disabled ? "disabled" : nothing}
      \\\${this.label ? html\\\`aria-label="\\\${this.label}"\\\` : nothing}
    >
      \\\${template}
    </button>
  \\\`;
}

/** @internal */
renderLink(template) {
  return html\\\`
    <a
      href="\\\${this.href}"
      target="\\\${this.target}"
      \\\${this.download ? "download" : nothing}
      \\\${this.label ? html\\\`aria-label="\\\${this.label}"\\\` : nothing}
    >
      \\\${template}
    </a>
  \\\`;
}

render() {
  const icon = this.icon ? unsafeHTML(\\\`<span>\\\${this.icon}</span>\\\`) : nothing;
  const markup = html\\\`
    \\\${this.text ? html\\\`<span>\\\${this.text}</span>\\\` : nothing}
    \\\${icon}
  \\\`;

  return this.href ? this.renderLink(markup) : this.renderButton(markup);
}
\`\`\`

#### Multi-root Template

Templates can return multiple root elements. Useful for components that pair a label with an input:

\`\`\`js
render() {
  return html\\\`
    <label for="\\\${this.identifier}">\\\${this.label}</label>
    <div class="input-wrapper">
      \\\${this.start ? html\\\`<div class="start">\\\${this.start}</div>\\\` : nothing}
      <input
        id="\\\${this.identifier}"
        class="input \\\${this.start ? "has-start" : nothing}"
      />
    </div>
    \\\${this.error ? html\\\`<div class="error">\\\${this.error}</div>\\\` : nothing}
  \\\`;
}
\`\`\`

#### Declarative Shadow DOM

Declarative Shadow DOM lets you define a shadow root directly in HTML using a \`<template shadowrootmode="open">\` element. The browser attaches the shadow root during parsing, so the shadow content is visible before JavaScript loads.

When a component with \`static shadow\` connects and finds a shadow root already attached, Elena skips \`attachShadow()\` and works with the existing one instead. Content stays in the light DOM and is projected into the shadow root via \`<slot>\`:

\`\`\`html
<elena-button>
  <template shadowrootmode="open">
    <link rel="stylesheet" href="button.css" />
    <button><slot></slot></button>
  </template>
  Click me
</elena-button>
\`\`\`

\`\`\`js
import { Elena } from "@elenajs/core";

export default class Button extends Elena(HTMLElement) {
  static tagName = "elena-button";
  static shadow = "open";
}

Button.define();
\`\`\`

### Reflecting Props

Elena syncs props and attributes on the host element. Props declared in \`static props\` are reflected as host attributes automatically. For inner element attributes, add them explicitly in your \`render()\` template.

---

## Attributes

When naming Custom Element attributes, follow these rules:

- **Valid characters:** Lowercase ASCII letters (a-z) and hyphens (-) only.
- **Short:** Keep prop names short and single-word where possible.
- **Reserved names:** Property names must not conflict with existing standardized HTMLElement prototype members (e.g. \`title\`, \`hidden\`, \`id\`, \`style\`, \`className\`, \`innerHTML\`, \`textContent\`). Note: \`text\` is also reserved — it is Elena's built-in reactive text property.

## Props

Props are declared in \`static props\` and given default class field values. The default value tells Elena what type the prop is:

\`\`\`js
export default class Button extends Elena(HTMLElement) {
  static props = ["variant", "disabled", "count", "items"];

  variant = "default"; // string
  disabled = false;    // boolean
  count = 0;           // number
  items = [];          // array (expects JSON string attribute)
}
\`\`\`

Supported types: \`String\`, \`Number\`, \`Boolean\`, \`Array\`, \`Object\`. String enums use \`@type {"a" | "b"}\` syntax in JSDoc.

### Prop Type Coercion

Elena determines how to convert attribute strings by looking at the class field default:

- \`false\` → boolean (\`"true"\`/\`"false"\` strings convert correctly)
- \`0\` → number (attribute string is parsed to number)
- \`[]\` → array (attribute must be valid JSON)
- \`{}\` → object (attribute must be valid JSON)
- \`""\` → string (no conversion)

Invalid JSON for Array or Object props sets the prop to \`null\` and logs an error.

### Non-Reflected Props

To suppress attribute reflection for a specific prop (keep it JS-only), use the object form in \`static props\`:

\`\`\`js
export default class Button extends Elena(HTMLElement) {
  static props = [
    "variant",
    { name: "icon", reflect: false },
  ];

  variant = "default";
  icon = "";
}
\`\`\`

The prop still updates the component and triggers re-renders — it just does not sync back to an HTML attribute.

## Text Content

Every Elena component has a built-in reactive \`text\` property:
- On first connect, Elena captures the element's \`textContent\` from the light DOM (trimmed)
- Use \`this.text\` in \`render()\` to reference it
- Setting \`text\` programmatically triggers a re-render
- For dynamic text in frameworks, use the \`text\` property instead of children

## Events

- List event names in \`static events\` for delegation
- Document with class-level JSDoc: \`@event click - Description\`
- Bubbling events (like \`click\`, \`change\`, \`input\`) pass through to the host naturally with all their original properties intact
- Non-bubbling events (like \`focus\` and \`blur\`) are forwarded to the host as plain \`Event\` instances
- For custom events, use the standard \`CustomEvent\` constructor with \`bubbles: true\` and \`composed: true\`

Never define your own \`handleEvent\` method on a component that uses \`static events\` — Elena uses \`handleEvent\` internally and overriding it breaks event delegation.

## JSDoc Annotations

Class-level:
- \`@displayName\` — Component display name
- \`@status\` — alpha, beta, or stable
- \`@event <name> - description\` — Event documentation
- \`@cssprop [--prop-name] - description\` — CSS custom property
- \`@slot [name] - description\` — Slot documentation

Property-level:
- \`@property\` — Marks as an observed attribute
- \`@type {Type}\` — Type annotation

Method-level:
- \`@internal\` — Marks implementation detail; hidden from public API docs

---

## CSS Styles

Elena recommends the \`@scope\` at-rule for component styles. It prevents styles from leaking to the outer page while preserving inheritance and cascading.

### Elena CSS Encapsulation Pattern

\`@scope\` prevents component styles from leaking out, but does not prevent global styles from leaking in. For Primitive Components, combine \`@scope\` with a universal \`all: unset\` reset:

\`\`\`css
/* Scope makes sure styles don't leak out */
@scope (elena-button) {

  /* Reset makes sure styles don't leak in */
  :scope,
  *:where(:not(img, svg):not(svg *)),
  *::before,
  *::after {
    all: unset;
    display: revert;
  }

  /* Rest of your component styles */
}
\`\`\`

The \`:where(:not(img, svg):not(svg *))\` selector excludes images and SVGs from the reset so they continue to render correctly. \`display: revert\` restores browser default display values after \`all: unset\` clears them.

**Composite Components must NOT use this reset** — they have no inner DOM to protect, and the reset would break composed children.

### CSS Cascade Layers Alternative

As an alternative to \`all: unset\`, you can control style precedence with \`@layer\`. Declare a layer order and wrap component styles in a named layer so they take precedence over global styles:

\`\`\`css
@layer global, elena;

@layer elena {
  @scope (elena-button) {
    button { color: blue; }
  }
}
\`\`\`

### Scoped styles (recommended)

Full baseline pattern for a **Primitive Component**:

\`\`\`css
/* Scope makes sure styles don't leak out */
@scope (elena-button) {

  /* Reset makes sure styles don't leak in */
  :scope,
  *:where(:not(img, svg):not(svg *)),
  *::before,
  *::after {
    all: unset;
    display: revert;
  }

  /* Targets the host element (elena-button) */
  :scope {
    /* Public theming API (with default values set) */
    --_elena-button-bg: var(--elena-button-bg, blue);
    --_elena-button-text: var(--elena-button-text, white);
    --_elena-button-font: var(--elena-button-font, system-ui, sans-serif);

    /* Internal theming API references (usage) */
    background-color: var(--_elena-button-bg);
    color: var(--_elena-button-text);

    /* Display mode for the host */
    display: inline-block;
  }

  /* CSS pre-hydration styles */
  :scope:not([hydrated]),
  .elena-button {
    font-family: var(--_elena-button-font);
    color: var(--_elena-button-text);
    background: var(--_elena-button-bg);
    display: inline-block;
  }

  /* Attribute selectors for variants */
  :scope[variant="primary"] {
    --_elena-button-bg: var(--elena-button-bg, red);
  }

  /* Attribute selectors for states */
  :scope[disabled] {
    opacity: 0.3;
    pointer-events: none;
  }
}
\`\`\`

Key rules:
- \`:scope\` targets the host element defined by \`@scope (elena-tag)\`.
- The encapsulation reset prevents global styles from leaking in. Place it as the first rule inside \`@scope\`.
- Style both \`:scope:not([hydrated])\` and the inner element with the same baseline styles so the component looks the same before and after hydration.
- Use attribute selectors on \`:scope\` for variant/state styling.
- Define public CSS custom properties on \`:scope\` for theming. Use the public/private pattern: \`--_elena-button-bg: var(--elena-button-bg, default)\` where underscore-prefixed properties are internal references and the non-prefixed ones are the public API consumers override from outside.

### Composite Component CSS

Composite Components style the host element and can pass styles down to their composed children. Since they never render their own internal markup, there are no pre-hydration concerns:

\`\`\`css
/* Scope makes sure styles don't leak out */
@scope (elena-stack) {

  :scope {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-flow: column wrap;
    flex-direction: column;
    gap: 0.5rem;
  }

  :scope[direction="row"] {
    flex-direction: row;
  }
}
\`\`\`

### Styles without \`@scope\` (legacy)

For older browsers, use namespaced selectors and the \`:is()\` pattern:

\`\`\`css
/* Reset makes sure styles don't leak in */
elena-button,
elena-button *:where(:not(img, svg):not(svg *)),
elena-button *::before,
elena-button *::after {
  all: unset;
  display: revert;
}

elena-button { display: inline-block; }
:is(elena-button:not([hydrated]), .elena-button) { /* shared styles */ }
elena-button[variant="primary"] { /* variant overrides */ }
\`\`\`

### Pre-hydration pseudo-elements

For better SSR support in Primitive Components, use CSS pseudo-elements referencing host attributes to surface content before JavaScript loads:

\`\`\`css
:scope:not([hydrated])::before { content: attr(label); }
:scope:not([hydrated])::after { content: attr(placeholder); }
\`\`\`

### Documenting CSS custom properties

Use \`@cssprop\` JSDoc on the component class. \`@elenajs/bundler\` transforms these into the Custom Elements Manifest automatically.

### Shadow DOM

For full style isolation, Elena supports opt-in Shadow DOM via \`static shadow = "open" | "closed"\` and \`static styles\`. Elena renders into the shadow root, external styles cannot reach in, and \`@scope\` is not needed. However, Shadow DOM eliminates progressive enhancement: nothing is visible until JavaScript runs. CSS custom properties still pierce shadow boundaries for theming.

\`\`\`js
import styles from "./button.css" with { type: "css" };

export default class Button extends Elena(HTMLElement) {
  static tagName = "elena-button";
  static shadow = "open";
  static styles = styles;
}
Button.define();
\`\`\`

---

## Lifecycle

Methods in order of execution on first connect:

1. \`connectedCallback()\` — Sets up props, captures text content, renders, and wires up events
2. \`willUpdate()\` — Runs before every render; use for derived/computed state. Do not call \`super\`.
3. \`render()\` — Must return an \`html\` tagged template literal (only for components that own their markup)
4. \`firstUpdated()\` — Runs once after the first render, before \`updated()\`
5. \`updated()\` — Runs after every render; adds the \`hydrated\` attribute to the host on first call

On subsequent re-renders: \`willUpdate()\` → \`render()\` → \`updated()\`.

On disconnect: \`disconnectedCallback()\` — cleanup.
On document change: \`adoptedCallback()\` — runs when the element is moved to a new document via \`document.adoptNode()\`.
On attribute change: \`attributeChangedCallback()\` — syncs attributes to properties, batches re-render.

All lifecycle methods can be extended via \`super\` (except \`willUpdate()\`):

\`\`\`js
connectedCallback() {
  super.connectedCallback();
  console.log("Element was added to the DOM.");
}

willUpdate() {
  // No super call needed
  this.label = \\\`\\\${this.firstName} \\\${this.lastName}\\\`;
}
\`\`\`

### Batched Re-renders

Multiple prop changes in a single task are batched. Elena schedules one render per microtask — the DOM is updated once before the browser paints, regardless of how many props changed.

### Manual Re-render

When Elena cannot detect a mutation automatically (e.g. pushing into an array in place), trigger a re-render manually:

\`\`\`js
this.items.push("new item");
this.requestUpdate();
\`\`\`

### \`updateComplete\`

A Promise that resolves after the current render microtask finishes. Resolves immediately if no render is pending. Use it to await DOM updates:

\`\`\`js
await element.updateComplete;
// DOM is now updated
\`\`\`

## Registration

Always call \`ClassName.define()\` after the class body to register the element.

---

## Mixins

Mixins are a standard JavaScript pattern for sharing behavior across components. Since \`Elena()\` is itself a mixin, custom mixins compose naturally with it.

### Writing and using a mixin

A mixin is a function that takes a base class and returns an extended class. Always apply mixins **after** \`Elena()\`:

\\\`\\\`\\\`js
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
\\\`\\\`\\\`

\\\`\\\`\\\`js
class DraggableCard extends Draggable(Elena(HTMLElement)) {
  static tagName = "draggable-card";

  render() {
    return html\\\\\\\`<div class="card">\\\\\\\${this.text}</div>\\\\\\\`;
  }
}
DraggableCard.define();
\\\`\\\`\\\`

### Lifecycle rules

Mixins that override lifecycle methods **must call \`super\`** to preserve Elena's behavior:

| Method | Must call \`super\`? |
|---|---|
| \`connectedCallback()\` | Yes |
| \`disconnectedCallback()\` | Yes |
| \`adoptedCallback()\` | Yes |
| \`attributeChangedCallback()\` | Yes |
| \`firstUpdated()\` | Yes |
| \`updated()\` | Yes |
| \`willUpdate()\` | No (base is a no-op) |

### Multiple mixins

Mixins stack left to right, with each wrapping the previous:

\\\`\\\`\\\`js
class FancyButton extends Loggable(Tooltipped(Elena(HTMLElement))) {
  static tagName = "fancy-button";
}
FancyButton.define();
\\\`\\\`\\\`

### Adding props

Mixins can introduce their own props. List them in \`static props\` on the final component class so Elena can observe them:

\\\`\\\`\\\`js
const Sizeable = (superClass) => class extends superClass {
  /** @property @type {"sm" | "md" | "lg"} */
  size = "md";
};

class SizeableButton extends Sizeable(Elena(HTMLElement)) {
  static tagName = "sizeable-button";
  static props = ["size", "variant"];

  /** @property @type {"default" | "primary"} */
  variant = "default";

  render() {
    return html\\\\\\\`<button>\\\\\\\${this.text}</button>\\\\\\\`;
  }
}
SizeableButton.define();
\\\`\\\`\\\`

---

## Server Side Rendering

Elena's approach to SSR:

- **Composite Components** provide full SSR support by default: their HTML lives entirely in the Light DOM.
- **Primitive Components** provide partial SSR support: base HTML and CSS renders server-side, then JavaScript progressively enhances the markup once the element is registered.
- **Declarative Components** use Declarative Shadow DOM for cases where you need stronger isolation but still want the component to render server-side.

For Primitive Components, ship CSS styles that visually match both the loading and \`hydrated\` states. This can be achieved utilizing the provided \`hydrated\` attribute in your web component's styles:

\`\`\`css
/* Elena CSS pre-hydration styles */
:scope:not([hydrated]),
.element { ... }
\`\`\`

Since both selectors now share the same baseline styles, there are no visible layout shifts, FOUC, or FOIC (Flash Of Unstyled Content, Flash Of Invisible Content).

For better SSR in Primitive Components, use CSS pseudo-elements referencing host attributes:

\`\`\`css
:scope:not([hydrated])::before { content: attr(label); }
:scope:not([hydrated])::after { content: attr(placeholder); }
\`\`\`

---

## Async Loading

Elena elements can be loaded asynchronously. Props can be set before initialization, but methods require waiting:

\`\`\`js
const button = document.querySelector("elena-button");
button.variant = "primary"; // Fine while loading
await customElements.whenDefined("elena-button");
button.click(); // Safe after defined
\`\`\`

---

## Framework Compatibility

Rules for **Primitive Components** when used with a framework:

- Never render a framework component _inside_ a Primitive Component. Elena calls \`replaceChildren()\` on render, which destroys the framework's component tree.
- Avoid the framework and Elena both mutating the same attribute — the framework's reconciler would overwrite Elena's changes, triggering many re-renders.
- Treat framework-controlled props as read-only inputs inside \`render()\`. Elena communicates back via events, the framework updates state.
- For dynamic text, use the \`text\` property instead of children, since Primitive Components own their internal DOM and frameworks cannot update children after hydration:

\`\`\`jsx
// React
<elena-button text={buttonText} />

// Angular — text children are inserted AFTER connectedCallback.
// Always use property binding, never pass text as children.
<elena-button [text]="buttonText"></elena-button>

// Vue
<elena-button :text="buttonText"></elena-button>
\`\`\`

**React 17 note:** React 17 does not pass Array or Object props (or event handlers) to web components correctly. Use React 18+.

**Composite Components** are safe to compose just like any HTML container element — the framework renders both the wrapper and its children.

---

## Common Errors

| Error | Cause |
|---|---|
| \`"text" is reserved.\` | Remove \`text\` from \`static props\` — it is built-in |
| \`define() without a tagName.\` | Add \`static tagName\` to the class |
| \`Element not found.\` | The CSS selector in \`static element\` did not match any element |
| \`Cannot add events.\` | No inner element exists for event delegation |
| \`Prop "<name>" has no default.\` | Add a class field with a default (e.g. \`variant = "default";\`) |
| \`Invalid JSON: <value>\` | Array or Object prop received a non-JSON attribute value |
| \`Cannot sync attrs.\` | Inner element ref was lost (element was removed from DOM) |

---

## Browser Support

**Elena base support** (no \`@scope\`): Chrome 71+, Firefox 69+, Safari 12.1+, Edge 79+, Opera 58+

**With \`@scope\` CSS**: Chrome 118+, Firefox 128+, Safari 17.4+, Edge 118+, Opera 104+

**Known issues:**

- **Firefox 148:** CSS \`@scope\` with \`attr[value]\` selectors had a bug where styles would not apply correctly. Fixed in Firefox 149+. Use the legacy (non-\`@scope\`) pattern as a fallback for older Firefox if needed.
- **Safari 26.3:** \`@scope\` rules are not applied to \`<input>\` and \`<textarea>\` elements. Fixed in Safari Technology Preview 237, but not yet in a stable release. Workaround: style form controls outside \`@scope\` using namespaced selectors (e.g. \`my-filter input { ... }\`).

**URIs in templates:**

Elena's \`html\` tagged template auto-escapes interpolated values to prevent XSS, but it does not block JavaScript URIs. If you interpolate user input into an \`href\` or other URL attribute, a value like \`javascript:alert(1)\` will pass through escaping unchanged. Always validate or sanitize URLs before interpolating them:

\`\`\`js
const safeUrl = /^https?:\\/\\//.test(this.url) ? this.url : "#";
\`\`\`
`;
