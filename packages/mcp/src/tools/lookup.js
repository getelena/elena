import { z } from "zod";
import { findComponent, formatComponentDetails, getComponents } from "../lib/cem-helpers.js";

/**
 * Registers the lookup-component tool.
 * Queries component API details from the CEM.
 *
 * @param {import("@modelcontextprotocol/sdk/server/mcp.js").McpServer} server
 * @param {function} loadCem
 */
export function registerLookupTool(server, loadCem) {
  server.registerTool(
    "lookup-component",
    {
      title: "Lookup Elena Component",
      description:
        "Query API details for an Elena component by tag name or class name. " +
        "Returns props, events, CSS properties, slots, and metadata. " +
        "Use this to understand existing components before creating new ones or composing them together.",
      inputSchema: {
        name: z
          .string()
          .describe("Component tag name (e.g. 'elena-button') or class name (e.g. 'Button')"),
      },
    },
    async ({ name }) => {
      const cem = loadCem();
      if (!cem) {
        return {
          content: [
            {
              type: "text",
              text: "No custom-elements.json found. Run 'elena build' first.",
            },
          ],
          isError: true,
        };
      }

      const decl = findComponent(cem, name);
      if (!decl) {
        const available = getComponents(cem)
          .map(c => c.tagName)
          .join(", ");
        return {
          content: [
            {
              type: "text",
              text: `Component '${name}' not found. Available: ${available}`,
            },
          ],
          isError: true,
        };
      }

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(formatComponentDetails(decl), null, 2),
          },
        ],
      };
    }
  );
}
