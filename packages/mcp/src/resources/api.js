import { API_CONTENT } from "../lib/api-content.js";

/**
 * Registers the Elena API reference resource (elena://api).
 * Returns a markdown API reference for all Elena packages.
 *
 * @param {import("@modelcontextprotocol/sdk/server/mcp.js").McpServer} server
 */
export function registerApiResource(server) {
  server.registerResource(
    "elena-api",
    "elena://api",
    {
      title: "Elena API Reference",
      description:
        "Full API reference for all Elena packages: @elenajs/core (static class fields, lifecycle, props, events, templates), @elenajs/bundler, @elenajs/ssr, @elenajs/mcp, and build plugins.",
      mimeType: "text/markdown",
    },
    async uri => ({
      contents: [
        {
          uri: uri.href,
          text: API_CONTENT,
        },
      ],
    })
  );
}
