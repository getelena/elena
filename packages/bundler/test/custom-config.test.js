/**
 * Integration test: Custom config
 * (elena.config.mjs sets sourcemap: false, bundle: false).
 */
import { existsSync, rmSync } from "fs";
import { join } from "path";
import { beforeAll, afterAll, describe, test, expect } from "vitest";
import { setupBuild } from "./helpers.mjs";

describe("Custom config (elena.config.mjs)", () => {
  let tmpDir;
  let dist;

  beforeAll(() => {
    ({ tmpDir, dist } = setupBuild(`
export default {
  input: 'src',
  output: {
    dir: 'dist',
    format: 'esm',
    sourcemap: false,
  },
  bundle: false,
};
`));
  });

  afterAll(() => {
    if (tmpDir) {
      rmSync(tmpDir, { recursive: true, force: true });
    }
  });

  test("individual component modules exist without sourcemaps", () => {
    expect(existsSync(join(dist, "button.js"))).toBe(true);
    // sourcemap: false means no .map files should be emitted.
    expect(existsSync(join(dist, "button.js.map"))).toBe(false);
    expect(existsSync(join(dist, "index.js.map"))).toBe(false);
  });

  test("bundle is disabled when bundle: false", () => {
    expect(existsSync(join(dist, "bundle.js"))).toBe(false);
    expect(existsSync(join(dist, "bundle.js.map"))).toBe(false);
  });

  test("CEM manifest is still generated", () => {
    expect(existsSync(join(dist, "custom-elements.json"))).toBe(true);
  });

  test("CSS output is still generated", () => {
    expect(existsSync(join(dist, "button.css"))).toBe(true);
    expect(existsSync(join(dist, "bundle.css"))).toBe(true);
  });
});
