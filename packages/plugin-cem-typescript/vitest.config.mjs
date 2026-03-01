import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    name: { label: "@elenajs/plugin-cem-typescript", color: "cyan" },
    environment: "node",
    include: ["test/**/*.test.js"],
  },
});
