import { describe, test, expect, beforeAll, afterAll } from "vitest";
import { mkdtempSync, writeFileSync, mkdirSync, rmSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";
import { cssPlugin, cssBundlePlugin } from "../src/index.js";

describe("cssPlugin", () => {
  let tmpDir;

  beforeAll(() => {
    tmpDir = mkdtempSync(join(tmpdir(), "elena-css-plugin-test-"));
    const srcDir = join(tmpDir, "src");
    mkdirSync(srcDir);

    writeFileSync(
      join(srcDir, "button.css"),
      `/* Button styles */
@scope (elena-button) {
  :scope {
    display: inline-block;
  }
}`
    );

    writeFileSync(
      join(srcDir, "stack.css"),
      `/* Stack styles */
@scope (elena-stack) {
  :scope {
    display: flex;
  }
}`
    );
  });

  afterAll(() => {
    if (tmpDir) {
      rmSync(tmpDir, { recursive: true, force: true });
    }
  });

  test("emits individual minified CSS files", () => {
    const emitted = [];
    const plugin = cssPlugin(join(tmpDir, "src"));
    plugin.generateBundle.call({ emitFile: file => emitted.push(file) });

    expect(emitted.length).toBe(2);

    const buttonFile = emitted.find(f => f.fileName === "button.css");
    expect(buttonFile).toBeDefined();
    expect(buttonFile.type).toBe("asset");

    const stackFile = emitted.find(f => f.fileName === "stack.css");
    expect(stackFile).toBeDefined();
  });

  test("minifies CSS (removes comments and whitespace)", () => {
    const emitted = [];
    const plugin = cssPlugin(join(tmpDir, "src"));
    plugin.generateBundle.call({ emitFile: file => emitted.push(file) });

    const buttonFile = emitted.find(f => f.fileName === "button.css");
    expect(buttonFile.source).not.toContain("/* Button styles */");
    expect(buttonFile.source).not.toContain("/* Stack styles */");
  });
});

describe("cssBundlePlugin", () => {
  let tmpDir;

  beforeAll(() => {
    tmpDir = mkdtempSync(join(tmpdir(), "elena-css-bundle-test-"));
    const srcDir = join(tmpDir, "src");
    mkdirSync(srcDir);

    writeFileSync(
      join(srcDir, "button.css"),
      `@scope (elena-button) { :scope { display: inline-block; } }`
    );

    writeFileSync(join(srcDir, "stack.css"), `@scope (elena-stack) { :scope { display: flex; } }`);
  });

  afterAll(() => {
    if (tmpDir) {
      rmSync(tmpDir, { recursive: true, force: true });
    }
  });

  test("concatenates all CSS into a single minified bundle", () => {
    const emitted = [];
    const plugin = cssBundlePlugin(join(tmpDir, "src"), "bundle.css");
    plugin.generateBundle.call({ emitFile: file => emitted.push(file) });

    expect(emitted.length).toBe(1);
    expect(emitted[0].fileName).toBe("bundle.css");
    expect(emitted[0].type).toBe("asset");
    expect(emitted[0].source).toContain("elena-button");
    expect(emitted[0].source).toContain("elena-stack");
  });

  test("CSS files in subdirectories are included", () => {
    const subDir = join(tmpDir, "src", "nested");
    mkdirSync(subDir);
    writeFileSync(join(subDir, "card.css"), `@scope (elena-card) { :scope { display: block; } }`);

    const emitted = [];
    const plugin = cssBundlePlugin(join(tmpDir, "src"), "bundle.css");
    plugin.generateBundle.call({ emitFile: file => emitted.push(file) });

    expect(emitted[0].source).toContain("elena-card");
  });
});
