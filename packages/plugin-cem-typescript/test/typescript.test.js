import { describe, test, expect, beforeAll, afterAll } from "vitest";
import { create, ts } from "@custom-elements-manifest/analyzer";
import { existsSync, readFileSync, mkdtempSync, rmSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";
import { elenaDefinePlugin } from "@elenajs/plugin-cem-define";
import { elenaTypeScriptPlugin } from "../src/index.js";

let tmpDir;

beforeAll(() => {
  tmpDir = mkdtempSync(join(tmpdir(), "elena-ts-plugin-test-"));
});

afterAll(() => {
  if (tmpDir) {
    rmSync(tmpDir, { recursive: true, force: true });
  }
});

/**
 * Runs the CEM analyzer with define + typescript plugins against a source string.
 * Always writes to the shared tmpDir to avoid ENOENT errors from packageLinkPhase.
 *
 * @param {string} source
 * @param {string} [fileName]
 * @returns {import("@custom-elements-manifest/analyzer").Package}
 */
function analyze(source, fileName = "button.js") {
  const mod = ts.createSourceFile(fileName, source, ts.ScriptTarget.ES2015, true);
  return create({
    modules: [mod],
    plugins: [elenaDefinePlugin(), elenaTypeScriptPlugin({ outdir: tmpDir })],
    context: { dev: false },
  });
}

describe("moduleLinkPhase", () => {
  test("injects text field and attribute when not present", () => {
    const manifest = analyze(`
      class Button extends Elena(HTMLElement) {
        static tagName = "elena-button";
        static props = ["variant"];
        constructor() {
          super();
          /** @attribute @type {string} */
          this.variant = "default";
        }
      }
    `);

    const decl = manifest.modules[0].declarations.find(d => d.name === "Button");
    const textMember = decl.members.find(m => m.name === "text");
    expect(textMember).toBeDefined();
    expect(textMember.type.text).toBe("string");

    const textAttr = decl.attributes.find(a => a.name === "text");
    expect(textAttr).toBeDefined();
  });

  test("does not duplicate text field when already present", () => {
    const manifest = analyze(`
      class Button extends Elena(HTMLElement) {
        static tagName = "elena-button";
        constructor() {
          super();
          /** @attribute @type {string} */
          this.text = "";
        }
      }
    `);

    const decl = manifest.modules[0].declarations.find(d => d.name === "Button");
    const textMembers = decl.members.filter(m => m.name === "text");
    expect(textMembers.length).toBe(1);
  });
});

describe("packageLinkPhase", () => {
  test("generates .d.ts with fields and events", () => {
    analyze(`
      /**
       * @event click - Programmatically fire click on the component.
       */
      class Button extends Elena(HTMLElement) {
        static tagName = "elena-button";
        static props = ["variant"];
        static events = ["click"];
        constructor() {
          super();
          /**
           * The style variant.
           * @attribute
           * @type {"default" | "primary"}
           */
          this.variant = "default";
        }
      }
    `);

    const dtsPath = join(tmpDir, "button.d.ts");
    expect(existsSync(dtsPath)).toBe(true);

    const content = readFileSync(dtsPath, "utf8");
    expect(content).toContain("declare class Button extends HTMLElement");
    expect(content).toContain("variant?:");
    expect(content).toContain("text?:");
    expect(content).toContain("export type { ButtonProps }");
    expect(content).toContain("from './custom-elements.js'");
  });

  test("generates .d.ts for component with no events", () => {
    analyze(
      `
      class Stack extends Elena(HTMLElement) {
        static tagName = "elena-stack";
        static props = ["direction"];
        constructor() {
          super();
          /** @attribute @type {"column" | "row"} */
          this.direction = "column";
        }
      }
    `,
      "stack.js"
    );

    const dtsPath = join(tmpDir, "stack.d.ts");
    expect(existsSync(dtsPath)).toBe(true);

    const content = readFileSync(dtsPath, "utf8");
    expect(content).toContain("declare class Stack extends HTMLElement");
    expect(content).not.toContain("onclick");
  });
});
