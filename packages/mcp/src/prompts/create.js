import { z } from "zod";

/**
 * Registers the create-component prompt.
 * Provides a guided workflow for creating a new Elena component.
 *
 * @param {import("@modelcontextprotocol/sdk/server/mcp.js").McpServer} server
 */
export function registerCreatePrompt(server) {
  server.registerPrompt(
    "create-component",
    {
      title: "Create Elena Component",
      description: "Interactive guide to creating a new Elena component with correct patterns",
      argsSchema: {
        name: z.string().describe("Component name in PascalCase"),
        type: z
          .enum(["primitive", "composite"])
          .optional()
          .describe("Component type (will ask if not provided)"),
        description: z.string().optional().describe("Brief component description"),
      },
    },
    ({ name, type, description }) => ({
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: [
              `I want to create a new Elena web component called "${name}".`,
              type ? `It should be a ${type} component.` : "",
              description ? `Description: ${description}` : "",
              "",
              "Please help me design and scaffold this component following Elena's patterns:",
              "1. First, read the Elena patterns guide (elena://patterns resource) to understand the conventions.",
              "2. Ask me about the props, events, and CSS custom properties I need.",
              "3. Use the scaffold-component tool to generate the boilerplate.",
              "4. Review the generated code and suggest any improvements.",
              "",
              "Key Elena rules to follow:",
              "- Primitive components own their DOM via render(). Composite components wrap children with no render().",
              "- Props must be listed in options.props AND given defaults in the constructor.",
              "- Use JSDoc @attribute, @type, @cssprop, @event, @status, @displayName annotations.",
              "- CSS must use @scope for style isolation. Primitive components must style both :scope:not([hydrated]) and the inner element with shared baseline styles.",
              "- Tag name format: elena-<name> (e.g. elena-button).",
            ]
              .filter(Boolean)
              .join("\n"),
          },
        },
      ],
    })
  );
}
