/**
 * Integration test: target config
 * (elena.config.mjs sets target to a browserslist array).
 */
import { existsSync, readFileSync, rmSync } from "fs";
import { join } from "path";
import { beforeAll, afterAll, describe, test, expect } from "vitest";
import { setupBuild } from "./helpers.mjs";

describe("target config (elena.config.mjs)", () => {
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
  target: ["chrome 71", "firefox 69", "safari 12.1"],
};
`));
  });

  afterAll(() => {
    if (tmpDir) {
      rmSync(tmpDir, { recursive: true, force: true });
    }
  });

  test("individual component modules are emitted", () => {
    expect(existsSync(join(dist, "button.js"))).toBe(true);
  });

  test("bundle is emitted", () => {
    expect(existsSync(join(dist, "bundle.js"))).toBe(true);
  });

  test("output does not contain native class field syntax", () => {
    const bundle = readFileSync(join(dist, "bundle.js"), "utf8");
    // Native public class field declarations look like `fieldName=` at the
    // start of a class body. After Babel transforms them they become
    // constructor assignments, so the pattern should not appear in output.
    expect(bundle).not.toMatch(/^[ \t]+\w+=(?!=)/m);
  });
});
