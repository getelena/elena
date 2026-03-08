import { getComponents, formatComponentSummary } from "../lib/cem-helpers.js";

/**
 * Registers the component catalog resource (elena://components).
 * Returns a JSON array of all components with summary info.
 *
 * @param {import("@modelcontextprotocol/sdk/server/mcp.js").McpServer} server
 * @param {function} loadCem
 */
export function registerCatalogResource(server, loadCem) {
  server.registerResource(
    "component-catalog",
    "elena://components",
    {
      title: "Elena Component Catalog",
      description: "List of all available Elena components with summary info",
      mimeType: "application/json",
    },
    async uri => {
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

      const components = getComponents(cem).map(formatComponentSummary);
      return {
        contents: [
          {
            uri: uri.href,
            text: JSON.stringify(components, null, 2),
          },
        ],
      };
    }
  );
}
