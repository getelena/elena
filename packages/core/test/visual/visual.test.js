import { test, expect } from "@playwright/test";

const PAGE = "/test/visual/fixtures/ssr-button.html";

test.describe("SSR Visual Regression", () => {
  test("pre-hydration matches hydrated state", async ({ browser }) => {
    // Screenshot 1: JavaScript disabled (SSR / pre-hydration)
    const ssrContext = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width: 800, height: 600 },
    });
    const ssrPage = await ssrContext.newPage();
    await ssrPage.goto(PAGE);
    await ssrPage.waitForLoadState("networkidle");

    const ssrScreenshot = await ssrPage.screenshot({ fullPage: true });
    await ssrContext.close();

    // Screenshot 2: JavaScript enabled (hydrated)
    const hydratedContext = await browser.newContext({
      javaScriptEnabled: true,
      viewport: { width: 800, height: 600 },
    });
    const hydratedPage = await hydratedContext.newPage();
    await hydratedPage.goto(PAGE);
    await hydratedPage.waitForLoadState("networkidle");
    await hydratedPage.waitForSelector("elena-button[hydrated]", {
      state: "attached",
      timeout: 5000,
    });
    await hydratedPage.waitForTimeout(100);

    const hydratedScreenshot = await hydratedPage.screenshot({ fullPage: true });
    await hydratedContext.close();

    // Both screenshots should match the same baseline
    expect(ssrScreenshot).toMatchSnapshot("ssr-buttons.png");
    expect(hydratedScreenshot).toMatchSnapshot("ssr-buttons.png");
  });

  test("individual buttons match between SSR and hydrated", async ({ browser }) => {
    // SSR context
    const ssrContext = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width: 800, height: 600 },
    });
    const ssrPage = await ssrContext.newPage();
    await ssrPage.goto(PAGE);
    await ssrPage.waitForLoadState("networkidle");

    // Hydrated context
    const hydratedContext = await browser.newContext({
      javaScriptEnabled: true,
      viewport: { width: 800, height: 600 },
    });
    const hydratedPage = await hydratedContext.newPage();
    await hydratedPage.goto(PAGE);
    await hydratedPage.waitForLoadState("networkidle");
    await hydratedPage.waitForSelector("elena-button[hydrated]", {
      state: "attached",
    });
    await hydratedPage.waitForTimeout(100);

    // Compare each button individually
    const buttons = await ssrPage.locator("elena-button").all();
    for (let i = 0; i < buttons.length; i++) {
      const ssrShot = await buttons[i].screenshot();
      const hydratedButton = hydratedPage.locator("elena-button").nth(i);
      const hydratedShot = await hydratedButton.screenshot();

      const name = `button-${i}.png`;
      expect(ssrShot).toMatchSnapshot(name);
      expect(hydratedShot).toMatchSnapshot(name);
    }

    await ssrContext.close();
    await hydratedContext.close();
  });
});
