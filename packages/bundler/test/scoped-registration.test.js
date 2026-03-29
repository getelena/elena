import { existsSync, readFileSync, rmSync } from "fs";
import { join } from "path";
import { beforeAll, afterAll, describe, test, expect } from "vitest";
import { setupBuild } from "./helpers.mjs";

describe('registration: "scoped"', () => {
  let tmpDir;
  let dist;

  beforeAll(() => {
    ({ tmpDir, dist } = setupBuild(`export default { registration: "scoped", analyze: false };`));
  });

  afterAll(() => {
    if (tmpDir) {
      rmSync(tmpDir, { recursive: true, force: true });
    }
  });

  describe("stripped output", () => {
    test("individual modules do not contain .define() calls", () => {
      const button = readFileSync(join(dist, "button.js"), "utf8");
      expect(button).not.toMatch(/\.define\(\)/);
    });

    test("individual modules do not contain side-effect imports", () => {
      const button = readFileSync(join(dist, "button.js"), "utf8");
      const bareImports = button.match(/^\s*import\s+["'][^"']+["']\s*;/gm);
      expect(bareImports).toBeNull();
    });

    test("bundle.js does not contain .define() calls", () => {
      const bundle = readFileSync(join(dist, "bundle.js"), "utf8");
      expect(bundle).not.toMatch(/\.define\(\)/);
    });
  });

  describe("register.js", () => {
    test("register.js is generated", () => {
      expect(existsSync(join(dist, "register.js"))).toBe(true);
    });

    test("register.js exports defineAll function", () => {
      const register = readFileSync(join(dist, "register.js"), "utf8");
      expect(register).toContain("export function defineAll(registry)");
    });

    test("register.js imports component classes", () => {
      const register = readFileSync(join(dist, "register.js"), "utf8");
      expect(register).toContain("Button");
      expect(register).toContain("Spinner");
      expect(register).toContain("Stack");
    });

    test("register.js re-exports component classes", () => {
      const register = readFileSync(join(dist, "register.js"), "utf8");
      expect(register).toMatch(/export\s*\{/);
    });

    test("defineAll calls .define(registry) for each component", () => {
      const register = readFileSync(join(dist, "register.js"), "utf8");
      expect(register).toContain(".define(registry)");
    });
  });

  describe("build output still works", () => {
    test("individual modules exist", () => {
      expect(existsSync(join(dist, "button.js"))).toBe(true);
      expect(existsSync(join(dist, "stack.js"))).toBe(true);
    });

    test("bundle.js exists", () => {
      expect(existsSync(join(dist, "bundle.js"))).toBe(true);
    });

    test("CSS files are still generated", () => {
      expect(existsSync(join(dist, "button.css"))).toBe(true);
      expect(existsSync(join(dist, "bundle.css"))).toBe(true);
    });
  });
});
