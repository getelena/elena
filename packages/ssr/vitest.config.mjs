import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    name: { label: "@elenajs/ssr", color: "blue" },
    environment: "node",
    include: ["test/**/*.test.js"],
    setupFiles: ["test/setup.js"],
  },
});
