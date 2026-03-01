/**
 *  ██████████ ████
 * ░░███░░░░░█░░███
 *  ░███  █ ░  ░███   ██████  ████████    ██████
 *  ░██████    ░███  ███░░███░░███░░███  ░░░░░███
 *  ░███░░█    ░███ ░███████  ░███ ░███   ███████
 *  ░███ ░   █ ░███ ░███░░░   ░███ ░███  ███░░███
 *  ██████████ █████░░██████  ████ █████░░████████
 * ░░░░░░░░░░ ░░░░░  ░░░░░░  ░░░░ ░░░░░  ░░░░░░░░
 *
 * Elena test config
 * https://elenajs.com
 *
 */
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    name: { label: "@elenajs/core", color: "green" },
    environment: "happy-dom",
    include: ["test/**/*.test.js"],
    exclude: ["test/visual/**"],
    setupFiles: ["test/setup.js"],
    coverage: {
      provider: "v8",
      include: ["src/**/*.{js,ts}"],
      exclude: ["**/test"],
    },
  },
});
