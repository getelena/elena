import { describe, test, expect } from "vitest";
import { create, ts } from "@custom-elements-manifest/analyzer";
import { elenaDefinePlugin } from "@elenajs/plugin-cem-define";
import { elenaPropPlugin } from "../src/index.js";

/**
 * Runs the CEM analyzer with define + prop plugins against a source string.
 *
 * @param {string} source
 * @returns {import("@custom-elements-manifest/analyzer").Package}
 */
function analyze(source) {
  const mod = ts.createSourceFile("test.js", source, ts.ScriptTarget.ES2015, true);
  return create({
    modules: [mod],
    plugins: [elenaDefinePlugin(), elenaPropPlugin()],
    context: { dev: false },
  });
}

describe("elenaPropPlugin", () => {
  test("creates attribute entry for field with @property", () => {
    const manifest = analyze(`
      export default class Button extends Elena(HTMLElement) {
        static tagName = "elena-button";

        /**
         * The style variant.
         *
         * @property
         * @type {"default" | "primary"}
         */
        variant = "default";
      }
    `);

    const decl = manifest.modules[0].declarations.find(d => d.name === "Button");
    const attr = decl.attributes?.find(a => a.name === "variant");
    expect(attr).toBeDefined();
    expect(attr.fieldName).toBe("variant");
    expect(attr.description).toBe("The style variant.");

    const member = decl.members.find(m => m.name === "variant" && !m.static);
    expect(member.attribute).toBe("variant");
  });

  test("creates attribute entry for field with @prop", () => {
    const manifest = analyze(`
      export default class Button extends Elena(HTMLElement) {
        static tagName = "elena-button";

        /**
         * Makes the button disabled.
         *
         * @prop
         * @type {boolean}
         */
        disabled = false;
      }
    `);

    const decl = manifest.modules[0].declarations.find(d => d.name === "Button");
    const attr = decl.attributes?.find(a => a.name === "disabled");
    expect(attr).toBeDefined();
    expect(attr.fieldName).toBe("disabled");
  });

  test("skips fields without @property or @prop", () => {
    const manifest = analyze(`
      export default class Button extends Elena(HTMLElement) {
        static tagName = "elena-button";

        /**
         * Internal counter.
         *
         * @type {number}
         */
        count = 0;
      }
    `);

    const decl = manifest.modules[0].declarations.find(d => d.name === "Button");
    expect(decl.attributes?.find(a => a.name === "count")).toBeUndefined();
  });

  test("skips static fields", () => {
    const manifest = analyze(`
      export default class Button extends Elena(HTMLElement) {
        static tagName = "elena-button";
        static props = ["variant"];
      }
    `);

    const decl = manifest.modules[0].declarations.find(d => d.name === "Button");
    expect(decl.attributes?.find(a => a.name === "props")).toBeUndefined();
  });

  test("handles multiple fields in one class", () => {
    const manifest = analyze(`
      export default class Button extends Elena(HTMLElement) {
        static tagName = "elena-button";

        /** @property @type {"default" | "primary"} */
        variant = "default";

        /** @prop @type {boolean} */
        disabled = false;

        /** @type {number} */
        count = 0;
      }
    `);

    const decl = manifest.modules[0].declarations.find(d => d.name === "Button");
    const attrs = (decl.attributes ?? []).map(a => a.name);
    expect(attrs).toContain("variant");
    expect(attrs).toContain("disabled");
    expect(attrs).not.toContain("count");
  });

  test("does not duplicate existing attribute entries", () => {
    const manifest = analyze(`
      export default class Button extends Elena(HTMLElement) {
        static tagName = "elena-button";

        /** @property @type {string} */
        variant = "default";
      }
    `);

    const decl = manifest.modules[0].declarations.find(d => d.name === "Button");
    const variantAttrs = (decl.attributes ?? []).filter(a => a.name === "variant");
    expect(variantAttrs).toHaveLength(1);
  });
});
