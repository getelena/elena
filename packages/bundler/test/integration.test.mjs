/**
 * Integration tests for @elenajs/bundler.
 *
 * Runs the full `elena` pipeline against `packages/components` (a consumer)
 * using a temporary output directory, then asserts that all expected
 * artifacts are produced with correct content.
 *
 * Three scenarios:
 *   1. Default config: no `elena.config.mjs` present, all defaults apply.
 *   2. Custom config: `elena.config.mjs` sets `sourcemap: false, bundle: false`.
 *   3. TypeScript sources: `.ts` component files produce identical output.
 */

import { spawnSync } from "child_process";
import {
  existsSync,
  readFileSync,
  writeFileSync,
  rmSync,
  mkdtempSync,
  mkdirSync,
  cpSync,
} from "fs";
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

/**
 * Sets up a temp directory with TypeScript Elena component sources.
 *
 * @returns {{ tmpDir: string; dist: string }}
 */
function setupTsBuild() {
  const tmpDir = mkdtempSync(join(tmpdir(), "elena-bundler-ts-test-"));
  const dist = join(tmpDir, "dist");
  const srcDir = join(tmpDir, "src");

  mkdirSync(srcDir, { recursive: true });

  // Write a minimal package.json.
  writeFileSync(
    join(tmpDir, "package.json"),
    JSON.stringify({ name: "test-ts-components", type: "module" })
  );

  // Write a tsconfig.json for the TypeScript plugin.
  writeFileSync(
    join(tmpDir, "tsconfig.json"),
    JSON.stringify({
      compilerOptions: {
        target: "ES2020",
        module: "ESNext",
        moduleResolution: "bundler",
        strict: false,
        declaration: false,
        skipLibCheck: true,
      },
      include: ["src"],
    })
  );

  // Write a TypeScript button component.
  writeFileSync(
    join(srcDir, "button.ts"),
    `import { Elena, html } from "@elenajs/core";

const options = {
  tagName: "elena-button",
  props: ["variant", "disabled"],
  events: ["click", "focus", "blur"],
};

/**
 * Button component written in TypeScript.
 *
 * @displayName Button
 * @status alpha
 *
 * @event click - Programmatically fire click on the component.
 * @event focus - Programmatically move focus to the component.
 * @event blur - Programmatically remove focus from the component.
 *
 * @cssprop [--elena-button-text] - Overrides the default text color.
 * @cssprop [--elena-button-bg] - Overrides the default background color.
 */
export default class Button extends Elena(HTMLElement, options) {
  /**
   * The style variant of the button.
   * @attribute
   */
  variant: "default" | "primary" | "danger" = "default";

  /**
   * Makes the component disabled.
   * @attribute
   */
  disabled: boolean = false;

  /**
   * Renders the template.
   * @internal
   */
  render() {
    return html\`<button>\${this.text}</button>\`;
  }
}
Button.define();
`
  );

  // Write a TypeScript composite component.
  writeFileSync(
    join(srcDir, "stack.ts"),
    `import { Elena } from "@elenajs/core";

const options = {
  tagName: "elena-stack",
  props: ["direction"],
};

/**
 * Stack component manages layout of immediate children.
 *
 * @displayName Stack
 * @slot - The stacked content
 * @status alpha
 */
export default class Stack extends Elena(HTMLElement, options) {
  /**
   * The direction of the stack.
   * @attribute
   */
  direction: "column" | "row" = "column";
}
Stack.define();
`
  );

  // Write CSS files (same as JS workflow).
  writeFileSync(
    join(srcDir, "button.css"),
    `@scope (elena-button) {
  :scope, *, *::before, *::after { all: unset; }
  :scope { display: inline-block; }
  button { display: inline-flex; }
}
`
  );

  writeFileSync(
    join(srcDir, "stack.css"),
    `@scope (elena-stack) {
  :scope, *, *::before, *::after { all: unset; }
  :scope { display: flex; flex-direction: column; gap: 0.5rem; }
  :scope[direction="row"] { flex-direction: row; }
}
`
  );

  // Write an index.ts entry point.
  writeFileSync(
    join(srcDir, "index.ts"),
    `export { default as Button } from "./button.js";\nexport { default as Stack } from "./stack.js";\n`
  );

  const result = spawnSync("node", [CLI], {
    cwd: tmpDir,
    stdio: "pipe",
    encoding: "utf8",
  });

  if (result.status !== 0) {
    throw new Error(
      `elena (TS) exited with status ${result.status}:\n${result.stderr || result.stdout}`
    );
  }

  return { tmpDir, dist };
}

describe("TypeScript sources", () => {
  let tmpDir;
  let dist;

  beforeAll(() => {
    ({ tmpDir, dist } = setupTsBuild());
  });

  afterAll(() => {
    if (tmpDir) {
      rmSync(tmpDir, { recursive: true, force: true });
    }
  });

  describe("JavaScript modules", () => {
    test("individual component modules are emitted as .js (not .ts)", () => {
      expect(existsSync(join(dist, "button.js"))).toBe(true);
      expect(existsSync(join(dist, "stack.js"))).toBe(true);
      expect(existsSync(join(dist, "button.ts"))).toBe(false);
      expect(existsSync(join(dist, "stack.ts"))).toBe(false);
    });

    test("sourcemaps exist for each module", () => {
      expect(existsSync(join(dist, "button.js.map"))).toBe(true);
      expect(existsSync(join(dist, "stack.js.map"))).toBe(true);
    });

    test("single-file bundle exists", () => {
      expect(existsSync(join(dist, "bundle.js"))).toBe(true);
    });

    test("output does not contain TypeScript syntax", () => {
      const button = readFileSync(join(dist, "button.js"), "utf8");
      // TypeScript type annotations should be stripped.
      expect(button).not.toMatch(/: "default" \| "primary"/);
      expect(button).not.toMatch(/: boolean/);
    });
  });

  describe("CSS output", () => {
    test("individual component CSS files are copied", () => {
      expect(existsSync(join(dist, "button.css"))).toBe(true);
      expect(existsSync(join(dist, "stack.css"))).toBe(true);
    });

    test("CSS bundle exists", () => {
      expect(existsSync(join(dist, "bundle.css"))).toBe(true);
    });
  });

  describe("Custom Elements Manifest", () => {
    let manifest;

    beforeAll(() => {
      const raw = readFileSync(join(dist, "custom-elements.json"), "utf8");
      manifest = JSON.parse(raw);
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
  });
});
