import { describe, test, expect, beforeAll, afterAll } from "vitest";
import { mkdtempSync, writeFileSync, mkdirSync, rmSync } from "fs";
import { join, resolve } from "path";
import { tmpdir } from "os";
import {
  cssPlugin,
  cssBundlePlugin,
  cssModuleScriptPlugin,
  cssStaticStylesPlugin,
} from "../src/index.js";

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
    plugin.generateBundle.call({
      emitFile: file => emitted.push(file),
      getModuleIds: () => [],
    });

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
    plugin.generateBundle.call({
      emitFile: file => emitted.push(file),
      getModuleIds: () => [],
    });

    expect(emitted[0].source).toContain("elena-card");
  });

  test("excludes CSS files resolved by cssModuleScriptPlugin", () => {
    const srcDir = join(tmpDir, "src-exclude");
    mkdirSync(srcDir);
    writeFileSync(join(srcDir, "button.css"), `:scope { display: inline-block; }`);
    writeFileSync(join(srcDir, "shadow.css"), `:host { display: block; }`);

    const shadowPath = resolve(join(srcDir, "shadow.css"));

    const emitted = [];
    const plugin = cssBundlePlugin(srcDir, "bundle.css");
    plugin.generateBundle.call({
      emitFile: file => emitted.push(file),
      getModuleIds: () => ["\0css-module:" + shadowPath, "src/index.js"],
    });

    expect(emitted.length).toBe(1);
    expect(emitted[0].source).toContain("inline-block");
    expect(emitted[0].source).not.toContain(":host");
  });
});

describe("cssModuleScriptPlugin", () => {
  let tmpDir;

  beforeAll(() => {
    tmpDir = mkdtempSync(join(tmpdir(), "elena-css-module-test-"));
    writeFileSync(
      join(tmpDir, "component.css"),
      `/* Shadow DOM styles */
:host {
  display: block;
  color: red;
}`
    );
  });

  afterAll(() => {
    if (tmpDir) {
      rmSync(tmpDir, { recursive: true, force: true });
    }
  });

  test("resolveId returns prefixed id for CSS imports with type css", () => {
    const plugin = cssModuleScriptPlugin();
    const result = plugin.resolveId("./component.css", join(tmpDir, "component.js"), {
      attributes: { type: "css" },
    });

    expect(result).toBeDefined();
    expect(result.id).toContain("\0css-module:");
    expect(result.id).toContain("component.css");
  });

  test("resolveId returns null for CSS imports without type css", () => {
    const plugin = cssModuleScriptPlugin();
    const result = plugin.resolveId("./component.css", join(tmpDir, "component.js"), {});

    expect(result).toBeNull();
  });

  test("resolveId returns null for non-CSS imports", () => {
    const plugin = cssModuleScriptPlugin();
    const result = plugin.resolveId("./component.js", join(tmpDir, "component.js"), {
      attributes: { type: "css" },
    });

    expect(result).toBeNull();
  });

  test("load returns a CSSStyleSheet module for prefixed ids", () => {
    const plugin = cssModuleScriptPlugin();
    const cssPath = join(tmpDir, "component.css");
    const result = plugin.load("\0css-module:" + cssPath);

    expect(result).toContain("new CSSStyleSheet()");
    expect(result).toContain("replaceSync");
    expect(result).toContain("export default sheet");
    expect(result).not.toContain("/* Shadow DOM styles */");
  });

  test("load returns null for non-prefixed ids", () => {
    const plugin = cssModuleScriptPlugin();
    const result = plugin.load(join(tmpDir, "component.css"));

    expect(result).toBeNull();
  });
});

describe("cssStaticStylesPlugin", () => {
  test("minifies CSS in static styles template literals", () => {
    const plugin = cssStaticStylesPlugin();
    const code = `class Foo extends HTMLElement {
  static styles = \`:host {
    display:   block;
    color:   red;
  }\`;
}`;
    const result = plugin.transform(code, "component.js");

    expect(result).toBeDefined();
    expect(result.code).toContain("static styles = `");
    expect(result.code).not.toContain("display:   block");
  });

  test("returns null for files without static styles", () => {
    const plugin = cssStaticStylesPlugin();
    const result = plugin.transform("const x = 1;", "component.js");

    expect(result).toBeNull();
  });

  test("returns null for non-JS files", () => {
    const plugin = cssStaticStylesPlugin();
    const code = `static styles = \`:host { display: block; }\``;
    const result = plugin.transform(code, "component.css");

    expect(result).toBeNull();
  });

  test("handles .ts files", () => {
    const plugin = cssStaticStylesPlugin();
    const code = `class Foo extends HTMLElement {
  static styles = \`:host { display:   block; }\`;
}`;
    const result = plugin.transform(code, "component.ts");

    expect(result).toBeDefined();
    expect(result.code).toContain("static styles = `");
  });
});
