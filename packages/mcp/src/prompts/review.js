import { z } from "zod";

/**
 * Registers the review-component prompt.
 * Provides a best-practices checklist for reviewing an Elena component.
 *
 * @param {import("@modelcontextprotocol/sdk/server/mcp.js").McpServer} server
 */
export function registerReviewPrompt(server) {
  server.registerPrompt(
    "review-component",
    {
      title: "Review Elena Component",
      description: "Analyze an existing Elena component for best practices and correctness",
      argsSchema: {
        code: z.string().describe("The component source code to review"),
        css: z.string().optional().describe("The component CSS to review"),
      },
    },
    ({ code, css }) => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: [
              "Review this Elena web component for correctness and best practices.",
              "",
              "## Component JS",
              "```js",
              code,
              "```",
              css ? `\n## Component CSS\n\`\`\`css\n${css}\n\`\`\`` : "",
              "",
              "Check for:",
              "- [ ] Props listed in static props match class field defaults",
              "- [ ] Non-reflected props use { name, reflect: false } object form in static props",
              "- [ ] JSDoc @attribute and @type annotations on every prop",
              "- [ ] Class-level @displayName, @status, @event, @cssprop JSDoc where appropriate",
              "- [ ] Internal/private methods are annotated with @internal",
              "- [ ] Correct component type (Primitive Components own their DOM via render(); Composite Components wrap children with no render(); Declarative Components use Declarative Shadow DOM)",
              "- [ ] Primitive Components: render() returns html tagged template",
              "- [ ] Primitive Components: if static element is set, it points to a valid inner element selector (optional, defaults to firstElementChild)",
              "- [ ] Composite Components: no render(), no static events, no static element",
              "- [ ] If willUpdate() is defined: it runs before render() for derived state and does NOT call super",
              "- [ ] If static events is used: handleEvent() is NOT overridden on the class",
              "- [ ] CSS uses @scope (recommended) or namespaced selectors for style isolation",
              "- [ ] :scope has an explicit display mode set (e.g. display: inline-block)",
              "- [ ] Primitive Components: :scope:not([hydrated]) and inner element share baseline styles",
              "- [ ] CSS custom properties defined on :scope (or host selector) for theming",
              "- [ ] Attribute selectors on :scope for variant/state styling",
              "- [ ] ClassName.define() called after class body",
              "- [ ] Empty string props not left as empty attributes",
              "- [ ] Uses nothing (not empty string) in conditional template expressions",
              "- [ ] Primitive Components: text property used instead of children for dynamic framework content",
              "- [ ] Primitive Components: pre-hydration CSS styles avoid layout shifts for SSR",
            ]
              .filter(Boolean)
              .join("\n"),
          },
        },
      ],
    })
  );
}
