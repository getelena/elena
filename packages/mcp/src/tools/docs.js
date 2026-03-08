import { PATTERNS_CONTENT } from "../lib/patterns-content.js";
import { FRAMEWORKS_CONTENT } from "../lib/frameworks-content.js";
import { SSR_CONTENT } from "../lib/ssr-content.js";
import { API_CONTENT } from "../lib/api-content.js";

/**
 * Registers all Elena documentation tools.
 * These return static markdown guides as tool results so AI clients
 * that do not surface MCP resources (e.g. Claude Desktop) can still
 * access the full Elena authoring context.
 *
 * @param {import("@modelcontextprotocol/sdk/server/mcp.js").McpServer} server
 */
export function registerDocTools(server) {
  server.registerTool(
    "get-patterns",
    {
      title: "Get Elena Authoring Patterns",
      description:
        "Returns the Elena component authoring guide. " +
        "Covers component types (primitive vs composite), static class fields, props, events, " +
        "templates, CSS encapsulation patterns, lifecycle methods, framework tips, and best practices. " +
        "Read this before creating or reviewing any Elena component.",
      inputSchema: {},
    },
    async () => ({
      content: [{ type: "text", text: PATTERNS_CONTENT }],
    })
  );

  server.registerTool(
    "get-api-reference",
    {
      title: "Get Elena API Reference",
      description:
        "Returns the full API reference for all Elena packages: " +
        "@elenajs/core (static class fields, lifecycle, props, events, templates, error codes), " +
        "@elenajs/bundler, @elenajs/ssr, @elenajs/mcp, and the build plugins.",
      inputSchema: {},
    },
    async () => ({
      content: [{ type: "text", text: API_CONTENT }],
    })
  );

  server.registerTool(
    "get-frameworks-guide",
    {
      title: "Get Elena Framework Integration Guide",
      description:
        "Returns the Elena framework integration guide. " +
        "Covers Plain HTML, Eleventy, Next.js, React, Svelte, Vue, and Angular — " +
        "including TypeScript declaration setup and framework-specific caveats.",
      inputSchema: {},
    },
    async () => ({
      content: [{ type: "text", text: FRAMEWORKS_CONTENT }],
    })
  );

  server.registerTool(
    "get-ssr-guide",
    {
      title: "Get Elena SSR Guide",
      description:
        "Returns the Elena server-side rendering guide. " +
        "Covers layout shift avoidance, the @elenajs/ssr package API (register() and ssr()), " +
        "Eleventy transform and shortcode patterns, and client-side hydration.",
      inputSchema: {},
    },
    async () => ({
      content: [{ type: "text", text: SSR_CONTENT }],
    })
  );
}
