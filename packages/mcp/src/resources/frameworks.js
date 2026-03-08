import { FRAMEWORKS_CONTENT } from "../lib/frameworks-content.js";

/**
 * Registers the Elena framework integration guide resource (elena://frameworks).
 * Returns a markdown guide to using Elena with various JavaScript frameworks.
 *
 * @param {import("@modelcontextprotocol/sdk/server/mcp.js").McpServer} server
 */
export function registerFrameworksResource(server) {
  server.registerResource(
    "elena-frameworks",
    "elena://frameworks",
    {
      title: "Elena Framework Integrations",
      description:
        "Guide to using Elena with JavaScript frameworks: Plain HTML, Eleventy, Next.js, React, Svelte, Vue, Angular, and TypeScript setup for each.",
      mimeType: "text/markdown",
    },
    async uri => ({
      contents: [
        {
          uri: uri.href,
          text: FRAMEWORKS_CONTENT,
        },
      ],
    })
  );
}
