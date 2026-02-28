/**
 * Static markdown content describing Elena component authoring patterns.
 * Used by the elena://patterns resource.
 */
export const PATTERNS_CONTENT = `# Elena Component Authoring Patterns

## Component Types

Elena has two component categories:

### Primitive Components
Self-contained components that own and render their own HTML markup via \`render()\`.
All content is controlled through \`props\`, nothing is composed into them.
Examples: button, input, checkbox, radio, textarea, icon, spinner, switch.

### Composite Components
Components that wrap and enhance the HTML composed inside them, including other components.
They have no \`render()\` method and never touch the light DOM children.
Provide styling, layout, and behavior around the composed content.
Examples: stack, table, layout, card, banner, visually-hidden, fieldset.

---

## Component Structure

### Options Object

The \`Elena(superclass, options)\` factory accepts an options object with four optional keys:

- **\`tagName\`** — Custom element tag name (e.g. \`"elena-button"\`)
- **\`props\`** — Array of prop names to observe and sync as attributes
- **\`events\`** — Array of event names to delegate from the inner element
- **\`element\`** — CSS selector for the inner element ref (\`this.element\`). When omitted, Elena uses \`firstElementChild\` instead, which is more performant when you have many components on a page

### Primitive Component Example

\`\`\`js
import { Elena, html } from "@elenajs/core";

const options = {
  tagName: "elena-button",
  props: ["variant", "size", "disabled"],
  events: ["click", "focus", "blur"],
  element: ".elena-button",
};

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
 * @cssprop [--elena-button-color-text] - Controls the color of the text.
 * @cssprop [--elena-button-color-bg] - Controls the color of the background.
 */
export default class Button extends Elena(HTMLElement, options) {
  constructor() {
    super();

    /**
     * The style variant of the button.
     *
     * @attribute
     * @type {"default" | "primary" | "danger"}
     */
    this.variant = "default";

    /**
     * The size of the button.
     *
     * @attribute
     * @type {"sm" | "md" | "lg"}
     */
    this.size = "md";

    /**
     * Makes the component disabled.
     *
     * @attribute
     * @type {Boolean}
     */
    this.disabled = false;
  }

  /**
   * Renders the template.
   *
   * @internal
   */
  render() {
    return html\\\`<button class="elena-button">\\\${this.text}</button>\\\`;
  }
}

Button.define();
\`\`\`

### Composite Component Example

\`\`\`js
import { Elena } from "@elenajs/core";

const options = {
  tagName: "elena-stack",
  props: ["direction"],
};

/**
 * Stack component manages layout of immediate children.
 *
 * @displayName Stack
 * @slot - The stacked content
 * @status alpha
 */
export default class Stack extends Elena(HTMLElement, options) {
  constructor() {
    super();

    /**
     * The direction of the stack.
     *
     * @attribute
     * @type {"column" | "row"}
     */
    this.direction = "column";
  }
}

Stack.define();
\`\`\`

---

## Templates

### \`html\` and \`nothing\`

Elena uses an HTML-based template syntax built on JavaScript tagged template literals. Return an \`html\` tagged template from \`render()\`:

\`\`\`js
import { Elena, html, nothing } from "@elenajs/core";
\`\`\`

The \`html\` tag auto-escapes interpolated values for XSS safety. Nested \`html\` sub-templates pass through as trusted HTML without double-escaping:

\`\`\`js
render() {
  return html\\\`
    <button>
      \\\${this.icon ? html\\\`<span class="icon">\\\${this.icon}</span>\\\` : nothing}
      \\\${this.text}
    </button>
  \\\`;
}
\`\`\`

Use \`nothing\` as a placeholder in conditional template expressions when there is nothing to render. It produces an empty string and signals to the template engine that no processing is needed. Always prefer \`nothing\` over empty strings (\`""\`) or \`false\` in template conditionals.

### Element Ref

Elena provides a direct reference to the inner DOM element via \`this.element\`:

\`\`\`js
export default class Button extends Elena(HTMLElement, {
  element: ".my-button",
})
// this.element → the .my-button element inside the component
\`\`\`

When the \`element\` option is omitted, Elena falls back to \`firstElementChild\`, which is more performant for simple templates with many component instances on a page.

### Reflecting Props as Template Attrs

Elena automatically syncs props and attributes between the host element and the inner element. This means you rarely need to add attributes manually in your template markup — props declared in \`options.props\` are reflected automatically.

---

## Attributes

When naming Custom Element attributes, follow these rules:

- **Valid characters:** Lowercase ASCII letters (a-z) and hyphens (-) only.
- **Short:** Maximum of 2 words. Prefer 1 word when possible.
- **Reserved names:** Property names must not conflict with existing standardized HTMLElement prototype members.

## Props

- Must be listed in \`options.props\`
- Must have default values set in the constructor
- Document with JSDoc \`@attribute\` and \`@type\` annotations
- Supported types: \`String\`, \`Number\`, \`Boolean\`, \`Array\`, \`Object\`
- String enums use \`@type {"a" | "b"}\` syntax

## Text Content

Every Primitive Component has a built-in reactive \`text\` property:
- On first connect, Elena captures the element's \`textContent\` from the light DOM
- Use \`this.text\` in \`render()\` to reference it
- Setting \`text\` programmatically triggers a re-render
- For dynamic text in frameworks, use the \`text\` property instead of children

## Events

- List event names in \`options.events\` for delegation
- Document with class-level JSDoc: \`@event click - Description\`
- \`ElenaEvent\` extends \`Event\` with \`bubbles: true, composed: true\`

## JSDoc Annotations

Class-level:
- \`@displayName\` — Component display name
- \`@status\` — alpha, beta, or stable
- \`@event <name> - description\` — Event documentation
- \`@cssprop [--prop-name] - description\` — CSS custom property
- \`@slot [name] - description\` — Slot documentation (composite only)

Property-level:
- \`@attribute\` — Marks as an observed attribute
- \`@type {Type}\` — Type annotation

---

## CSS Styles

Elena recommends the \`@scope\` at-rule for component styles. It prevents styles from leaking to the outer page while preserving inheritance and cascading.

### Elena CSS Encapsulation Pattern

While \`@scope\` prevents component styles from leaking out, it does not prevent global styles from leaking in. For this, Elena recommends combining \`@scope\` with a universal \`all: unset\` reset:

\`\`\`css
/* Scope makes sure styles don't leak out */
@scope (elena-button) {

  /* Unset makes sure styles don't leak in */
  :scope, *, *::before, *::after {
    all: unset;
  }

  /* Rest of your component styles */
}
\`\`\`

This pattern provides full CSS encapsulation without Shadow DOM.

### Scoped styles (recommended)

Full baseline pattern for a **Primitive Component**:

\`\`\`css
/* Scope makes sure styles don't leak out */
@scope (elena-button) {

  /* Unset makes sure styles don't leak in */
  :scope, *, *::before, *::after {
    all: unset;
  }

  /* Targets the host element (elena-button) */
  :scope {
    /* Public CSS custom properties for theming */
    --elena-button-font: sans-serif;
    --elena-button-text: white;
    --elena-button-bg: blue;

    /* Display mode for the host */
    display: inline-block;
  }

  /* Style both the non-hydrated host and inner element identically */
  :scope:not([hydrated]),
  button {
    font-family: var(--elena-button-font);
    color: var(--elena-button-text);
    background: var(--elena-button-bg);
    appearance: none;
  }

  /* Rest of your component styles */
  button {
    display: inline-flex;
  }

  /* Attribute selectors for variants */
  :scope[variant="primary"] {
    --elena-button-bg: red;
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
- The encapsulation reset (\`:scope, *, *::before, *::after { all: unset; }\`) prevents global styles from leaking in. Place it as the first rule inside \`@scope\`.
- Style both \`:scope:not([hydrated])\` and the inner element with the same baseline styles so the component looks the same before and after hydration.
- Use attribute selectors on \`:scope\` for variant/state styling.
- Define public CSS custom properties on \`:scope\` for theming.

### Styles without \`@scope\` (legacy)

For older browsers, use namespaced selectors and the \`:is()\` pattern:

\`\`\`css
/* Unset makes sure styles don't leak in */
elena-button,
elena-button *,
elena-button *::before,
elena-button *::after {
  all: unset;
}

elena-button { display: inline-block; }
:is(elena-button:not([hydrated]), .elena-button) { /* shared styles */ }
elena-button[variant="primary"] { /* variant overrides */ }
\`\`\`

### Pre-hydration pseudo-elements

For better SSR support in Primitive Components, use CSS pseudo-elements referencing host attributes to avoid layout shifts:

\`\`\`css
:scope:not([hydrated])::before { content: attr(label); }
:scope:not([hydrated])::after { content: attr(placeholder); }
\`\`\`

### Composite Component CSS

Composite Components only style the host — no inner element or hydration concerns:

\`\`\`css
/* Scope makes sure styles don't leak out */
@scope (elena-stack) {

  /* Unset makes sure styles don't leak in */
  :scope, *, *::before, *::after {
    all: unset;
  }

  /* Targets the host element (elena-stack) */
  :scope {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  :scope[direction="row"] { flex-direction: row; }
}
\`\`\`

### Documenting CSS custom properties

Use \`@cssprop\` JSDoc on the component class (see JSDoc Annotations above). \`@elenajs/bundler\` transforms these into the Custom Elements Manifest automatically.

---

## Lifecycle

- \`connectedCallback()\` — Captures textContent, calls render()
- \`disconnectedCallback()\` — Cleanup
- \`attributeChangedCallback()\` — Syncs attributes to properties, triggers re-render
- \`render()\` — Must return an \`html\` tagged template literal (primitive only)
- \`updated()\` — Performs a post-update and adds the \`hydrated\` attribute to the host element

All lifecycle methods can be extended via \`super\`:

\`\`\`js
connectedCallback() {
  super.connectedCallback();
  console.log("Element was added to the DOM.");
}
\`\`\`

## Registration

Always call \`ClassName.define()\` after the class body to register the element.

---

## Server Side Rendering

Elena's approach to SSR is straightforward:

- **Composite Components** provide full SSR support by default — their HTML lives entirely in the Light DOM.
- **Primitive Components** provide partial SSR support — base HTML & CSS renders server-side, then JavaScript progressively enhances the markup once the element is registered.

For Primitive Components, ship CSS styles that visually match both loading and hydrated states to avoid FOUC/FOIC. Use the \`hydrated\` attribute:

\`\`\`css
:scope:not([hydrated]),
.inner-element {
  color: var(--elena-button-text);
}
\`\`\`

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
- Avoid the framework and Elena both mutating the same attribute on a Primitive Component — the framework's reconciler would overwrite Elena's changes, triggering many re-renders.
- Treat framework-controlled props as read-only inputs inside \`render()\`. Elena communicates back via events, the framework updates state.
- For dynamic text, use the \`text\` property instead of children, since Primitive Components own their internal DOM and frameworks cannot update children after hydration:

\`\`\`jsx
// React
<elena-button text={buttonText} />

// Angular
<elena-button [text]="buttonText"></elena-button>

// Vue
<elena-button :text="buttonText"></elena-button>
\`\`\`

**Composite Components** are safe to compose just like any HTML container element — the framework renders both the wrapper and its children.
`;
