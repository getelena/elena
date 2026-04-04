import { defineConfig } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";

export default defineConfig({
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  test: {
    name: "@elenajs/core",
    browser: {
      enabled: true,
      provider: playwright({ launch: { headless: true } }),
      instances: [{ browser: "chromium" }],
    },
    benchmark: {
      include: ["test/bench/**/*.js"],
    },
  },
});
