/**
 * Integration test: Default config
 * (no elena.config.mjs present, all defaults apply).
 */
import { existsSync, readFileSync, rmSync } from "fs";
import { join } from "path";
import { beforeAll, afterAll, describe, test, expect } from "vitest";
import { setupBuild } from "./helpers.mjs";

describe("Default config (no elena.config.mjs)", () => {
  let tmpDir;
  let dist;

  beforeAll(() => {
    ({ tmpDir, dist } = setupBuild());
  });

  afterAll(() => {
    if (tmpDir) {
      rmSync(tmpDir, { recursive: true, force: true });
    }
  });

  describe("JavaScript modules", () => {
    test("individual component modules exist", () => {
      expect(existsSync(join(dist, "index.js"))).toBe(true);
      expect(existsSync(join(dist, "button.js"))).toBe(true);
      expect(existsSync(join(dist, "stack.js"))).toBe(true);
    });

    test("sourcemaps exist for each module", () => {
      expect(existsSync(join(dist, "index.js.map"))).toBe(true);
      expect(existsSync(join(dist, "button.js.map"))).toBe(true);
      expect(existsSync(join(dist, "stack.js.map"))).toBe(true);
    });

    test("single-file bundle exists", () => {
      expect(existsSync(join(dist, "bundle.js"))).toBe(true);
      expect(existsSync(join(dist, "bundle.js.map"))).toBe(true);
    });

    test("bundle is valid ESM", () => {
      const bundle = readFileSync(join(dist, "bundle.js"), "utf8");
      // Rollup ESM output uses export statements, not require().
      expect(bundle).not.toMatch(/require\(/);
    });
  });

  describe("CSS output", () => {
    test("individual component CSS files are copied", () => {
      expect(existsSync(join(dist, "button.css"))).toBe(true);
      expect(existsSync(join(dist, "stack.css"))).toBe(true);
    });

    test("CSS bundle exists and is minified", () => {
      expect(existsSync(join(dist, "bundle.css"))).toBe(true);
      const css = readFileSync(join(dist, "bundle.css"), "utf8");
      // Minified CSS has no block comments.
      expect(css).not.toMatch(/\/\*/);
      expect(css.trim().length).toBeGreaterThan(0);
    });
  });

  describe("Custom Elements Manifest", () => {
    let manifest;

    beforeAll(() => {
      const raw = readFileSync(join(dist, "custom-elements.json"), "utf8");
      manifest = JSON.parse(raw);
    });

    test("has correct schemaVersion", () => {
      expect(manifest.schemaVersion).toBe("1.0.0");
    });

    test("registers elena-button", () => {
      const mod = manifest.modules.find(m => m.path.includes("button"));
      const def = mod?.exports?.find(e => e.kind === "custom-element-definition");
      expect(def?.name).toBe("elena-button");
    });

    test("registers elena-stack", () => {
      const mod = manifest.modules.find(m => m.path.includes("stack"));
      const def = mod?.exports?.find(e => e.kind === "custom-element-definition");
      expect(def?.name).toBe("elena-stack");
    });
  });

  describe("TypeScript declarations", () => {
    test("main custom-elements.d.ts is generated", () => {
      expect(existsSync(join(dist, "custom-elements.d.ts"))).toBe(true);
    });

    test("per-component .d.ts files are generated", () => {
      expect(existsSync(join(dist, "button.d.ts"))).toBe(true);
      expect(existsSync(join(dist, "stack.d.ts"))).toBe(true);
    });

    test("per-component .d.ts re-exports from custom-elements.js", () => {
      const dts = readFileSync(join(dist, "button.d.ts"), "utf8");
      expect(dts).toMatch(/from ['"]\.\/custom-elements\.js['"]/);
    });
  });
});
