import { defineConfig } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";

export default defineConfig({
  test: {
    name: { label: "@elenajs/core", color: "green" },
    browser: {
      enabled: true,
      provider: playwright({ launch: { headless: true } }),
      instances: [{ browser: "chromium" }],
    },
    include: ["test/bench/**/*.bench.js"],
  },
});
