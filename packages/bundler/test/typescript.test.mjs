/**
 * Integration test: TypeScript sources (.ts component files produce identical output).
 */

import { spawnSync } from "child_process";
import { existsSync, readFileSync, writeFileSync, rmSync, mkdtempSync, mkdirSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";
import { beforeAll, afterAll, describe, test, expect } from "vitest";
import { CLI } from "./helpers.mjs";

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
