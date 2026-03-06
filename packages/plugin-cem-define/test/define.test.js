import { describe, test, expect } from "vitest";
import { create, ts } from "@custom-elements-manifest/analyzer";
import { elenaDefinePlugin } from "../src/index.js";

/**
 * Runs the CEM analyzer with the define plugin against a source string.
 *
 * @param {string} source
 * @returns {import("@custom-elements-manifest/analyzer").Package}
 */
function analyze(source) {
  const mod = ts.createSourceFile("test.js", source, ts.ScriptTarget.ES2015, true);
  return create({ modules: [mod], plugins: [elenaDefinePlugin()], context: { dev: false } });
}

describe("elenaDefinePlugin", () => {
  test("extracts tagName from static class field", () => {
    const manifest = analyze(`
      class Button extends Elena(HTMLElement) {
        static tagName = "elena-button";
        static props = ["variant"];
      }
    `);

    const mod = manifest.modules[0];
    const decl = mod.declarations.find(d => d.name === "Button");
    expect(decl.tagName).toBe("elena-button");

    const ceDef = mod.exports.find(e => e.kind === "custom-element-definition");
    expect(ceDef.name).toBe("elena-button");
    expect(ceDef.declaration.name).toBe("Button");
  });

  test("skips class without static tagName", () => {
    const manifest = analyze(`
      class Plain extends Elena(HTMLElement) {}
    `);

    const mod = manifest.modules[0];
    const decl = mod.declarations?.find(d => d.name === "Plain");
    expect(decl?.tagName).toBeUndefined();
    expect(mod.exports?.find(e => e.kind === "custom-element-definition")).toBeUndefined();
  });

  test("skips class not extending Elena()", () => {
    const manifest = analyze(`
      class Plain extends HTMLElement {}
    `);

    const mod = manifest.modules[0];
    expect(mod.exports?.find(e => e.kind === "custom-element-definition")).toBeUndefined();
  });
});
