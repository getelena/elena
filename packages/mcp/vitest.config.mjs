import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    name: { label: "@elenajs/mcp", color: "magenta" },
    testTimeout: 10_000,
  },
});
