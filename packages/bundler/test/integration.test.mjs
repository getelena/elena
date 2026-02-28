/**
 * Integration tests for @elenajs/bundler.
 *
 * Runs the full `elena` pipeline against `packages/components` (the real
 * consumer) using a temporary output directory, then asserts that all expected
 * artifacts are produced with correct content.
 *
 * Two scenarios:
 *   1. Default config: no `elena.config.mjs` present, all defaults apply.
 *   2. Custom config: `elena.config.mjs` sets `sourcemap: false, bundle: false`.
 */

import { spawnSync } from "child_process";
import { existsSync, readFileSync, writeFileSync, rmSync, mkdtempSync, cpSync } from "fs";
import { join, resolve, dirname } from "path";
import { tmpdir } from "os";
import { fileURLToPath } from "url";
import { beforeAll, afterAll, describe, test, expect } from "vitest";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** Absolute path to the CLI entry point. */
const CLI = resolve(__dirname, "../src/cli.js");

/** Source files to build, taken from the real components package. */
const COMPONENTS_SRC = resolve(__dirname, "../../components/src");

/**
 * Sets up a temp directory with component sources, optionally writes an
 * `elena.config.mjs`, runs the CLI, and returns the paths.
 *
 * @param {string} [elenaConfigContent] - Content to write to `elena.config.mjs`.
 *   If omitted, no config file is created (defaults apply).
 * @returns {{ tmpDir: string; dist: string }}
 */
function setupBuild(elenaConfigContent) {
  const tmpDir = mkdtempSync(join(tmpdir(), "elena-bundler-test-"));
  const dist = join(tmpDir, "dist");

  // Copy real component sources into the temp dir.
  cpSync(COMPONENTS_SRC, join(tmpDir, "src"), { recursive: true });

  // Write a minimal package.json so the directory is a valid package.
  writeFileSync(
    join(tmpDir, "package.json"),
    JSON.stringify({ name: "test-components", type: "module" })
  );

  // Optionally write a config file.
  if (elenaConfigContent !== undefined) {
    writeFileSync(join(tmpDir, "elena.config.mjs"), elenaConfigContent);
  }

  const result = spawnSync("node", [CLI], {
    cwd: tmpDir,
    stdio: "pipe",
    encoding: "utf8",
  });

  if (result.status !== 0) {
    throw new Error(
      `elena exited with status ${result.status}:\n${result.stderr || result.stdout}`
    );
  }

  return { tmpDir, dist };
}

// ===========================================================================
// Scenario 1: Default config (no elena.config.mjs)
// ===========================================================================

describe("Default config (no elena.config.mjs)", () => {
  let tmpDir;
  let dist;

  beforeAll(() => {
    ({ tmpDir, dist } = setupBuild());
  });

  afterAll(() => {
    if (tmpDir) rmSync(tmpDir, { recursive: true, force: true });
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

// ===========================================================================
// Scenario 2: Custom config via elena.config.mjs
// ===========================================================================

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
    if (tmpDir) rmSync(tmpDir, { recursive: true, force: true });
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
