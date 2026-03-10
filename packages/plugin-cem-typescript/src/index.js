/**
 *  ██████████ ████
 * ░░███░░░░░█░░███
 *  ░███  █ ░  ░███   ██████  ████████    ██████
 *  ░██████    ░███  ███░░███░░███░░███  ░░░░░███
 *  ░███░░█    ░███ ░███████  ░███ ░███   ███████
 *  ░███ ░   █ ░███ ░███░░░   ░███ ░███  ███░░███
 *  ██████████ █████░░██████  ████ █████░░████████
 * ░░░░░░░░░░ ░░░░░  ░░░░░░  ░░░░ ░░░░░  ░░░░░░░░
 *
 * Elena CEM TypeScript Plugin
 * https://elenajs.com
 */

import { writeFileSync } from "fs";
import { join } from "path";

/**
 * CEM analyzer plugin that generates a per-component `.d.ts` file for each
 * custom element in the manifest.
 *
 * This lets TypeScript resolve sub-path imports like
 * `@elenajs/components/dist/button.js` without manual declaration files.
 *
 * @param {{ outdir?: string }} options
 * @returns {import("@custom-elements-manifest/analyzer").Plugin}
 */
export function elenaTypeScriptPlugin({ outdir = "dist" } = {}) {
  return {
    name: "per-component-dts",

    // Inject the built-in `text` property into every custom element declaration.
    // Elena provides `text` on all components, but the CEM analyzer doesn’t know
    // about it since it’s defined in the base class.
    moduleLinkPhase({ moduleDoc }) {
      for (const declaration of moduleDoc.declarations ?? []) {
        if (!declaration.tagName) {
          continue;
        }

        const members = (declaration.members ??= []);
        const attrs = (declaration.attributes ??= []);
        const hasText = members.some(m => m.name === "text");
        if (!hasText) {
          const desc =
            "The text content of the element, captured from light DOM before the first render.";
          members.push({
            kind: "field",
            name: "text",
            type: { text: "string" },
            description: desc,
            attribute: "text",
          });
          attrs.push({
            name: "text",
            fieldName: "text",
            type: { text: "string" },
            description: desc,
          });
        }
      }
    },

    // Generate a `.d.ts` file for each custom element module. Each file exports
    // the component’s props type and a class declaration with typed fields and
    // event handlers (e.g. `button.d.ts` for `button.js`).
    packageLinkPhase({ customElementsManifest }) {
      for (const mod of customElementsManifest.modules) {
        const elementDeclaration = mod.declarations?.find(d => d.tagName);
        if (!elementDeclaration) {
          continue;
        }

        const fields = (elementDeclaration.members ?? []).filter(
          m => m.kind === "field" && !m.static
        );
        const events = elementDeclaration.events ?? [];

        // Format a single class member line, optionally preceded by a JSDoc comment.
        const typedLine = (member, description) => {
          const doc = description ? `  /** ${description} */\n` : "";
          return `${doc}  ${member}`;
        };

        const fieldLines = fields.map(f =>
          typedLine(`${f.name}?: ${f.type?.text ?? "string"};`, f.description)
        );
        const eventLines = events.map(e =>
          typedLine(`on${e.name}?: (e: CustomEvent<never>) => void;`, e.description)
        );

        const members = [...fieldLines, ...eventLines].join("\n");
        const body = members ? `\n${members}\n` : "";
        const propsType = `${elementDeclaration.name}Props`;
        const content = [
          `export type { ${propsType} } from './custom-elements.js';`,
          "",
          `declare class ${elementDeclaration.name} extends HTMLElement {${body}}`,
          "",
          `export default ${elementDeclaration.name};`,
          "",
        ].join("\n");

        const fileName = mod.path
          .split("/")
          .pop()
          .replace(/\.(js|ts)$/, ".d.ts");
        writeFileSync(join(outdir, fileName), content);
      }
    },
  };
}
