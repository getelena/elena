/**
 * Static markdown content for SSR patterns.
 * Used by the elena://docs/ssr resource.
 */
export const SSR_CONTENT = `# Server-Side Rendering

Elena's approach to SSR is simple. Since Progressive Web Components are primarily HTML and CSS, you don't need any special server logic to render them.

- **Composite Components** provide full SSR support by default — their HTML lives entirely in the Light DOM.
- **Primitive Components** provide partial SSR support — base HTML & CSS renders server-side, then JavaScript progressively enhances the markup once the element is registered.

## Avoiding Layout Shifts

For Primitive Components, ship CSS styles that visually match both the loading and hydrated states without causing layout shift, FOUC, or FOIC:

\`\`\`css
/* Elena SSR Pattern to avoid layout shift */
:scope:not([hydrated]),
.inner-element {
  color: var(--elena-button-text);
}
\`\`\`

For access to more than just text content pre-hydration, use CSS pseudo-elements referencing host attributes:

\`\`\`css
:scope:not([hydrated])::before {
  content: attr(label);
}

:scope:not([hydrated])::after {
  content: attr(placeholder);
}
\`\`\`

---

## Rendering to HTML Strings

When you want to expand Primitive Component templates server-side instead of handling pre-hydration with CSS, use \`@elenajs/ssr\`.

> **Warning:** \`@elenajs/ssr\` is an experimental package, not yet ready for production use. APIs may change without notice.

### Install

\`\`\`bash
npm install @elenajs/ssr
\`\`\`

### Basic usage

Register your components once, then pass any HTML string through \`ssr()\`:

\`\`\`js
import { ssr, register } from "@elenajs/ssr";
import Button from "./button.js";

register(Button);

const html = ssr(\`<elena-button variant="primary">Save</elena-button>\`);
// Outputs: '<elena-button variant="primary"><button>Save</button></elena-button>'
\`\`\`

### With composites and nesting

Composite Components preserve their children. Primitive Components inside Composites are expanded automatically:

\`\`\`js
import { ssr, register } from "@elenajs/ssr";
import Button from "./button.js";
import Input from "./input.js";
import Stack from "./stack.js";

register(Button, Input, Stack);

const html = ssr(\`
  <elena-stack direction="row">
    <elena-input label="Email" type="email" placeholder="you@example.com"></elena-input>
    <elena-button>Send</elena-button>
  </elena-stack>
\`);
\`\`\`

Output:

\`\`\`html
<elena-stack direction="row">
  <elena-input type="email" placeholder="you@example.com">
    <label for="email">Email</label>
    <input id="email" type="email" placeholder="you@example.com" />
  </elena-input>
  <elena-button><button>Send</button></elena-button>
</elena-stack>
\`\`\`

### With Eleventy (as a transform)

A transform processes every rendered page automatically, expanding any registered Primitive Components:

\`\`\`js
// eleventy.config.js
import { ssr, register } from "@elenajs/ssr";
import Button from "@my-lib/components/button/button.js";
import Input from "@my-lib/components/input/input.js";
import Stack from "@my-lib/components/stack/stack.js";

register(Button, Input, Stack);

export default function (eleventyConfig) {
  eleventyConfig.addTransform("elena-ssr", (content) => {
    return ssr(content);
  });
}
\`\`\`

### With Eleventy (as a shortcode)

For more control over which parts of a page are processed:

\`\`\`js
// eleventy.config.js
import { ssr, register } from "@elenajs/ssr";
import Button from "@my-lib/components/button/button.js";

register(Button);

export default function (eleventyConfig) {
  eleventyConfig.addShortcode("elena", (html) => ssr(html));
}
\`\`\`

---

## API

### \`register(...components)\`

Register Elena Primitive Component classes for SSR. Call this once before using \`ssr()\`.

\`\`\`js
import { register } from "@elenajs/ssr";
import Button from "./button.js";
import Input from "./input.js";

register(Button, Input);
\`\`\`

Throws an error if a component does not have a \`static tagName\`.

### \`ssr(html)\`

Parse an HTML string, expand registered Primitive Components, and return the rendered HTML.

| Parameter | Type     | Description                              |
| --------- | -------- | ---------------------------------------- |
| \`html\`  | \`string\` | HTML string containing Elena components. |

**Returns:** \`string\` — the rendered HTML with Primitive Components expanded.

**Behavior by component type:**

- **Primitive Components** (with \`render()\`): \`render()\` is called and its output replaces the tag's inner HTML. Attributes are preserved on the host element and passed as props.
- **Composite Components** (no \`render()\`): The tag and its attributes are preserved. Children are processed recursively.
- **Other HTML tags**: Passed through unchanged.

---

## How It Works

1. **Parse** the input HTML string into a tree.
2. **Walk** the tree depth-first. For each custom element tag, look it up in the registry.
3. **Expand** Primitive Components: construct a lightweight instance, convert attribute strings to the correct prop types, call \`willUpdate()\` if defined, then call \`render()\`.
4. **Recurse** into Composite Component children.
5. **Serialize** the tree back to an HTML string.

## Client-Side Hydration

The HTML produced by \`ssr()\` is designed for progressive enhancement. When the component JavaScript loads on the client:

1. Elena's \`connectedCallback\` fires on the pre-rendered element.
2. \`render()\` runs and hydrates the component with interactivity.
3. Event listeners are attached, methods become available, and the \`hydrated\` attribute is added.
`;
