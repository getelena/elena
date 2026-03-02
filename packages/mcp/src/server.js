/**
 *  ██████████ ████
 * ░░███░░░░░█░░███
 *  ░███  █ ░  ███   ██████  ████████    ██████
 *  ░██████    ███  ███░░███░░███░░███  ░░░░░███
 *  ░███░░█    ███ ░███████  ░███ ░███   ███████
 *  ░███ ░   █ ███ ░███░░░   ░███ ░███  ███░░███
 *  ██████████ █████░░██████  ████ █████░░████████
 * ░░░░░░░░░░ ░░░░░  ░░░░░░  ░░░░ ░░░░░  ░░░░░░░░
 *
 * Elena MCP Server
 * https://elenajs.com
 */

import { readFileSync } from "node:fs";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerCatalogResource } from "./resources/catalog.js";
import { registerComponentResource } from "./resources/component.js";
import { registerPatternsResource } from "./resources/patterns.js";
import { registerScaffoldTool } from "./tools/scaffold.js";
import { registerLookupTool } from "./tools/lookup.js";
import { registerCreatePrompt } from "./prompts/create.js";
import { registerReviewPrompt } from "./prompts/review.js";
import { createCemLoader } from "./lib/cem-loader.js";

const { version } = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf-8"));

/**
 * Server-level instructions sent to AI clients during initialization.
 * Provides essential context so the AI uses Elena patterns correctly.
 */
const INSTRUCTIONS = `You are working with Elena, a lightweight (2kB) library for building Progressive Web Components. Elena renders base HTML & CSS first, then progressively enhances with JavaScript. Zero runtime dependencies.

## How Elena Works

Components are built by extending the \`Elena()\` factory function from \`@elenajs/core\`:

\`\`\`js
import { Elena, html, nothing } from "@elenajs/core";
\`\`\`

Elena has two component types:

### Primitive Components
Self-contained components that own and render their own HTML markup via \`render()\`. All content is controlled through props. Examples: button, input, checkbox, switch.

\`\`\`js
import { Elena, html } from "@elenajs/core";

export default class Button extends Elena(HTMLElement, {
  tagName: "elena-button",
  props: ["variant", "disabled"],
  events: ["click", "focus", "blur"],
}) {
  constructor() {
    super();
    /** @attribute @type {"default" | "primary" | "danger"} */
    this.variant = "default";
    /** @attribute @type {Boolean} */
    this.disabled = false;
  }
  render() {
    return html\`<button>\${this.text}</button>\`;
  }
}
Button.define();
\`\`\`

### Composite Components
Components that wrap and enhance composed children. They have NO \`render()\` method and never touch the light DOM children. Examples: stack, card, layout, fieldset.

\`\`\`js
import { Elena } from "@elenajs/core";

export default class Stack extends Elena(HTMLElement, {
  tagName: "elena-stack",
  props: ["direction"],
}) {
  constructor() {
    super();
    /** @attribute @type {"column" | "row"} */
    this.direction = "column";
  }
}
Stack.define();
\`\`\`

## Critical Rules

1. **Always import from \`@elenajs/core\`** — use \`Elena\`, \`html\`, and \`nothing\` from this package.
2. **Options object** accepts: \`tagName\`, \`props\`, \`events\`, \`element\` (all optional).
3. **Props** must be listed in \`options.props\` AND given default values in the constructor with JSDoc \`@attribute\` and \`@type\` annotations.
4. **Text content** — Every primitive component has a built-in reactive \`this.text\` property. Use it in \`render()\` instead of \`this.textContent\`.
5. **Templates** — \`render()\` must return an \`html\` tagged template literal. Use \`nothing\` (not empty strings) in conditional expressions.
6. **Registration** — Always call \`ClassName.define()\` after the class body.
7. **CSS** — Use \`@scope (tag-name)\` for style isolation. Always include the encapsulation reset: \`:scope, *, *::before, *::after { all: unset; }\`. For primitive components, style both \`:scope:not([hydrated])\` and the inner element with the same baseline styles.
8. **JSDoc** — Use class-level \`@displayName\`, \`@status\`, \`@event\`, \`@cssprop\`, \`@slot\` annotations.
9. **Composite components** must NOT have \`render()\`, \`events\`, or \`element\` options.
10. **Primitive components** must NOT have framework components rendered inside them — Elena calls \`replaceChildren()\` on render.

## Attribute Naming Rules

- **Valid characters:** Lowercase ASCII letters (a-z) and hyphens (-) only.
- **Short:** Maximum of 2 words. Prefer 1 word when possible.
- **Reserved names:** Property names must not conflict with existing standardized HTMLElement prototype members.

## Available Tools & Resources

- Use the \`scaffold-component\` tool to generate correct Elena component boilerplate (JS + CSS).
- Use the \`lookup-component\` tool to query existing component APIs from the Custom Elements Manifest.
- Read the \`elena://patterns\` resource for comprehensive authoring patterns and CSS guidelines.
- Read the \`elena://components\` resource to see all existing components.
- Read \`elena://components/{tagName}\` for detailed API of a specific component.`;

/**
 * Creates and configures the Elena MCP server.
 *
 * @param {object} options
 * @param {string} options.projectRoot - Root directory of the component project
 * @param {string} [options.cemPath] - Override path to custom-elements.json
 * @returns {McpServer}
 */
export function createServer({ projectRoot, cemPath }) {
  const server = new McpServer(
    {
      name: "elena-mcp",
      version,
    },
    {
      instructions: INSTRUCTIONS,
    }
  );

  const loadCem = createCemLoader(projectRoot, cemPath);

  // Resources
  registerCatalogResource(server, loadCem);
  registerComponentResource(server, loadCem);
  registerPatternsResource(server);

  // Tools
  registerScaffoldTool(server);
  registerLookupTool(server, loadCem);

  // Prompts
  registerCreatePrompt(server);
  registerReviewPrompt(server);

  return server;
}
