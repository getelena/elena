import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: [
      "packages/core",
      "packages/bundler",
      "packages/cli",
      "packages/mcp",
      "packages/ssr",
      "packages/plugin-cem-define",
      "packages/plugin-cem-tag",
      "packages/plugin-cem-typescript",
      "packages/plugin-rollup-css",
    ],
  },
});
