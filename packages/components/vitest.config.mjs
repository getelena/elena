import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    name: { label: "@elenajs/components", color: "magenta" },
    environment: "happy-dom",
    include: ["src/**/*.test.js"],
    setupFiles: ["test/setup.js"],
    coverage: {
      provider: "v8",
      include: ["src/**/*.js"],
      exclude: ["src/**/*.test.js"],
    },
  },
});
