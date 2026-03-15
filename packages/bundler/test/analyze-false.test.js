/**
 * Integration test: analyze: false skips CEM generation.
 */
import { existsSync } from "fs";
import { join } from "path";
import { beforeAll, afterAll, describe, test, expect } from "vitest";
import { setupBuild } from "./helpers.mjs";
import { rmSync } from "fs";

describe("analyze: false", () => {
  let tmpDir;
  let dist;

  beforeAll(() => {
    ({ tmpDir, dist } = setupBuild(`export default { analyze: false };`));
  });

  afterAll(() => {
    rmSync(tmpDir, { recursive: true, force: true });
  });

  test("does not generate custom-elements.json", () => {
    expect(existsSync(join(dist, "custom-elements.json"))).toBe(false);
  });

  test("does not generate custom-elements.d.ts", () => {
    expect(existsSync(join(dist, "custom-elements.d.ts"))).toBe(false);
  });

  test("still generates JavaScript modules", () => {
    expect(existsSync(join(dist, "button.js"))).toBe(true);
    expect(existsSync(join(dist, "stack.js"))).toBe(true);
  });

  test("still generates CSS files", () => {
    expect(existsSync(join(dist, "button.css"))).toBe(true);
    expect(existsSync(join(dist, "stack.css"))).toBe(true);
  });

  test("still generates the JS bundle", () => {
    expect(existsSync(join(dist, "bundle.js"))).toBe(true);
  });
});
