import { SSR_CONTENT } from "../lib/ssr-content.js";

/**
 * Registers the Elena SSR guide resource (elena://ssr).
 * Returns a markdown guide to server-side rendering with Elena.
 *
 * @param {import("@modelcontextprotocol/sdk/server/mcp.js").McpServer} server
 */
export function registerSsrResource(server) {
  server.registerResource(
    "elena-ssr",
    "elena://ssr",
    {
      title: "Elena Server-Side Rendering",
      description:
        "Guide to SSR with Elena: layout shift avoidance, the @elenajs/ssr package API, Eleventy transform and shortcode patterns, and client-side hydration.",
      mimeType: "text/markdown",
    },
    async uri => ({
      contents: [
        {
          uri: uri.href,
          text: SSR_CONTENT,
        },
      ],
    })
  );
}
