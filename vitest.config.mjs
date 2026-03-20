import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    slowTestThreshold: 4000,
    projects: [
      "packages/cli",
      "packages/core",
      "packages/ssr",
      "packages/plugin-cem-define",
      "packages/plugin-cem-tag",
      "packages/plugin-cem-typescript",
      "packages/plugin-rollup-css",
      "packages/bundler",
      "packages/components",
      "packages/mcp",
    ],
  },
});
