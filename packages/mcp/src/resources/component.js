import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { getComponents, findComponent, formatComponentDetails } from "../lib/cem-helpers.js";

/**
 * Registers the per-component detail resource (elena://components/{tagName}).
 * Returns full details for a specific component.
 *
 * @param {import("@modelcontextprotocol/sdk/server/mcp.js").McpServer} server
 * @param {function} loadCem
 */
export function registerComponentResource(server, loadCem) {
  server.registerResource(
    "component-details",
    new ResourceTemplate("elena://components/{tagName}", {
      list: async () => {
        const cem = loadCem();
        if (!cem) {
          return { resources: [] };
        }
        return {
          resources: getComponents(cem).map(c => ({
            uri: `elena://components/${c.tagName}`,
            name: c.displayName || c.name,
          })),
        };
      },
    }),
    {
      title: "Elena Component Details",
      description:
        "Full details for a specific Elena component including props, events, CSS properties, and slots",
      mimeType: "application/json",
    },
    async (uri, { tagName }) => {
      const cem = loadCem();
      if (!cem) {
        return {
          contents: [
            {
              uri: uri.href,
              text: JSON.stringify({
                error: "No custom-elements.json found. Run 'elena build' first.",
              }),
            },
          ],
        };
      }

      const decl = findComponent(cem, tagName);
      if (!decl) {
        const available = getComponents(cem)
          .map(c => c.tagName)
          .join(", ");
        return {
          contents: [
            {
              uri: uri.href,
              text: JSON.stringify({
                error: `Component '${tagName}' not found. Available: ${available}`,
              }),
            },
          ],
        };
      }

      return {
        contents: [
          {
            uri: uri.href,
            text: JSON.stringify(formatComponentDetails(decl), null, 2),
          },
        ],
      };
    }
  );
}
