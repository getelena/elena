import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: ["packages/core", "packages/bundler", "packages/cli", "packages/mcp", "packages/ssr"],
  },
});
