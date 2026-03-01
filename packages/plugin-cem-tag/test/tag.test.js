import { describe, test, expect } from "vitest";
import { create, ts } from "@custom-elements-manifest/analyzer";
import { elenaDefinePlugin } from "@elenajs/plugin-cem-define";
import { elenaTagPlugin } from "../src/index.js";

/**
 * Runs the CEM analyzer with define + tag plugins against a source string.
 *
 * @param {string} source
 * @param {string} tagName - The JSDoc tag to extract.
 * @returns {import("@custom-elements-manifest/analyzer").Package}
 */
function analyze(source, tagName) {
  const mod = ts.createSourceFile("test.js", source, ts.ScriptTarget.ES2015, true);
  return create({
    modules: [mod],
    plugins: [elenaDefinePlugin(), elenaTagPlugin(tagName)],
    context: { dev: false },
  });
}

describe("elenaTagPlugin", () => {
  test("extracts @status tag value", () => {
    const manifest = analyze(
      `
      /**
       * @status alpha
       */
      export default class Button extends Elena(HTMLElement, { tagName: "elena-button" }) {}
    `,
      "status"
    );

    const decl = manifest.modules[0].declarations.find(d => d.name === "Button");
    expect(decl.status).toBe("alpha");
  });

  test("extracts @displayName tag value", () => {
    const manifest = analyze(
      `
      /**
       * @displayName My Button
       */
      export default class Button extends Elena(HTMLElement, { tagName: "elena-button" }) {}
    `,
      "displayName"
    );

    const decl = manifest.modules[0].declarations.find(d => d.name === "Button");
    expect(decl.displayName).toBe("My Button");
  });

  test("sets undefined when tag is not present", () => {
    const manifest = analyze(
      `
      /**
       * A button component.
       */
      export default class Button extends Elena(HTMLElement, { tagName: "elena-button" }) {}
    `,
      "status"
    );

    const decl = manifest.modules[0].declarations.find(d => d.name === "Button");
    expect(decl.status).toBeUndefined();
  });

  test("skips non-Elena class", () => {
    const manifest = analyze(
      `
      /**
       * @status stable
       */
      class Plain extends HTMLElement {}
    `,
      "status"
    );

    const decl = manifest.modules[0].declarations?.find(d => d.name === "Plain");
    expect(decl?.status).toBeUndefined();
  });
});
