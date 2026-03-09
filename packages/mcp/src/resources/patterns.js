import { PATTERNS_CONTENT } from "../lib/patterns-content.js";

/**
 * Registers the Elena patterns guide resource (elena://patterns).
 * Returns a markdown guide to Elena component authoring patterns.
 *
 * @param {import("@modelcontextprotocol/sdk/server/mcp.js").McpServer} server
 */
export function registerPatternsResource(server) {
  server.registerResource(
    "elena-patterns",
    "elena://patterns",
    {
      title: "Elena Component Authoring Patterns",
      description:
        "Guide to Elena component patterns: component types, options, props, events, CSS conventions, JSDoc, lifecycle",
      mimeType: "text/markdown",
    },
    async uri => ({
      contents: [
        {
          uri: uri.href,
          text: PATTERNS_CONTENT,
        },
      ],
    })
  );
}
