import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    name: { label: "@elenajs/bundler", color: "red" },
    // Integration tests invoke the full build pipeline, allow generous time.
    testTimeout: 120_000,
    hookTimeout: 120_000,
  },
});
