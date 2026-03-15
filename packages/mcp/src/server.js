/**
 *  ██████████ ████
 * ░░███░░░░░█░░███
 *  ░███  █ ░  ░███   ██████  ████████    ██████
 *  ░██████    ░███  ███░░███░░███░░███  ░░░░░███
 *  ░███░░█    ░███ ░███████  ░███ ░███   ███████
 *  ░███ ░   █ ░███ ░███░░░   ░███ ░███  ███░░███
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
import { registerFrameworksResource } from "./resources/frameworks.js";
import { registerSsrResource } from "./resources/ssr.js";
import { registerApiResource } from "./resources/api.js";
import { registerScaffoldTool } from "./tools/scaffold.js";
import { registerLookupTool } from "./tools/lookup.js";
import { registerDocTools } from "./tools/docs.js";
import { registerCreatePrompt } from "./prompts/create.js";
import { registerReviewPrompt } from "./prompts/review.js";
import { createCemLoader } from "./lib/cem-loader.js";

const { version } = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf-8"));

/**
 * Server-level instructions sent to AI clients during initialization.
 * Provides essential context so the AI uses Elena patterns correctly.
 */
const INSTRUCTIONS = `You are working with Elena, a lightweight (2.5kB) library for building Progressive Web Components. Elena renders base HTML & CSS first, then progressively enhances with JavaScript. Zero runtime dependencies.

## How Elena Works

Components are built by extending the \`Elena()\` factory function from \`@elenajs/core\`:

\`\`\`js
import { Elena, html, nothing } from "@elenajs/core";
\`\`\`

There are two recommended patterns for building Elena components:

### Component with \`render()\`
Owns and renders its own HTML markup. All content is controlled through props. Examples: button, input, checkbox, switch.

\`\`\`js
import { Elena, html } from "@elenajs/core";

export default class Button extends Elena(HTMLElement) {
  static tagName = "elena-button";
  static props = ["variant", "disabled"];
  static events = ["click", "focus", "blur"];

  /** @attribute @type {"default" | "primary" | "danger"} */
  variant = "default";
  /** @attribute @type {Boolean} */
  disabled = false;

  render() {
    return html\`<button>\${this.text}</button>\`;
  }
}
Button.define();
\`\`\`

### HTML Web Component
Wraps and enhances composed children. No \`render()\` method — never touches the light DOM children. Examples: stack, card, layout, fieldset.

\`\`\`js
import { Elena } from "@elenajs/core";

export default class Stack extends Elena(HTMLElement) {
  static tagName = "elena-stack";
  static props = ["direction"];

  /** @attribute @type {"column" | "row"} */
  direction = "column";
}
Stack.define();
\`\`\`

## Critical Rules

1. **Always import from \`@elenajs/core\`** — use \`Elena\`, \`html\`, and \`nothing\` from this package.
2. **Static class fields** — configure components with \`static tagName\`, \`static props\`, \`static events\`, \`static element\` (all optional). Do NOT use an options object.
3. **Props** must be listed in \`static props\` AND given default class field values with JSDoc \`@attribute\` and \`@type\` annotations. Use \`{ name: "prop", reflect: false }\` in \`static props\` to suppress attribute reflection.
4. **Text content** — Every Elena component has a built-in reactive \`this.text\` property. Use it in \`render()\` instead of \`this.textContent\`.
5. **Templates** — \`render()\` must return an \`html\` tagged template literal. Use \`nothing\` (not empty strings) in conditional expressions.
6. **Registration** — Always call \`ClassName.define()\` after the class body.
7. **CSS (components with \`render()\`)** — Use \`@scope (tag-name)\` for style isolation. The encapsulation reset is: \`:scope, *:where(:not(img, svg):not(svg *)), *::before, *::after { all: unset; display: revert; }\`. Style both \`:scope:not([hydrated])\` and the inner element with the same baseline styles.
8. **CSS (HTML Web Components)** — Use \`@scope (tag-name)\` but do NOT include the encapsulation reset. Only style the host element.
9. **JSDoc** — Use class-level \`@displayName\`, \`@status\`, \`@event\`, \`@cssprop\`, \`@slot\` annotations. Mark internal methods with \`@internal\`.
10. **HTML Web Components** must NOT have \`render()\`, \`static events\`, or \`static element\`.
11. **Components with \`render()\`** must NOT have framework components rendered inside them — Elena calls \`replaceChildren()\` on render.
12. **\`willUpdate()\`** — Optional lifecycle hook that runs before every render. Use it to compute derived state. Do not call \`super\` inside it.

## Attribute Naming Rules

- **Valid characters:** Lowercase ASCII letters (a-z) and hyphens (-) only.
- **Short:** Maximum of 2 words. Prefer 1 word when possible.
- **Reserved names:** Property names must not conflict with existing standardized HTMLElement prototype members.

## Available Tools & Resources

- Use the \`scaffold-component\` tool to generate correct Elena component boilerplate (JS + CSS).
- Use the \`lookup-component\` tool to query existing component APIs from the Custom Elements Manifest.
- Use the \`get-patterns\` tool for comprehensive authoring patterns and CSS guidelines.
- Use the \`get-api-reference\` tool for the full API reference for all Elena packages.
- Use the \`get-frameworks-guide\` tool for framework integration guides (React, Vue, Angular, Svelte, Next.js, Eleventy, plain HTML).
- Use the \`get-ssr-guide\` tool for server-side rendering patterns and the \`@elenajs/ssr\` API.
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
  registerFrameworksResource(server);
  registerSsrResource(server);
  registerApiResource(server);

  // Tools
  registerScaffoldTool(server);
  registerLookupTool(server, loadCem);
  registerDocTools(server);

  // Prompts
  registerCreatePrompt(server);
  registerReviewPrompt(server);

  return server;
}
