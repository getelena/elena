import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./test/visual",
  snapshotPathTemplate: "{testDir}/{testFileDir}/{testFileName}-snapshots/{arg}{-projectName}{ext}",
  use: {
    baseURL: "http://localhost:3999",
    viewport: { width: 800, height: 600 },
  },
  webServer: {
    command: "npx serve . --listen 3999 --no-clipboard",
    port: 3999,
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium" },
    },
  ],
  retries: process.env.CI ? 1 : 0,
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.01,
    },
  },
});
