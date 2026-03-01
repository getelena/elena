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

    moduleLinkPhase({ moduleDoc }) {
      for (const decl of moduleDoc.declarations ?? []) {
        if (!decl.tagName) {
          continue;
        }

        const members = (decl.members ??= []);
        const attrs = (decl.attributes ??= []);
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

    packageLinkPhase({ customElementsManifest }) {
      for (const mod of customElementsManifest.modules) {
        const ceDecl = mod.declarations?.find(d => d.tagName);
        if (!ceDecl) {
          continue;
        }

        const fields = (ceDecl.members ?? []).filter(m => m.kind === "field" && !m.static);
        const events = ceDecl.events ?? [];

        const fieldLines = fields.map(f => {
          const lines = [];
          if (f.description) {
            lines.push(`  /** ${f.description} */`);
          }
          lines.push(`  ${f.name}?: ${f.type?.text ?? "string"};`);
          return lines.join("\n");
        });

        const eventLines = events.map(e => {
          const lines = [];
          if (e.description) {
            lines.push(`  /** ${e.description} */`);
          }
          lines.push(`  on${e.name}?: (e: CustomEvent<never>) => void;`);
          return lines.join("\n");
        });

        const members = [...fieldLines, ...eventLines].join("\n");
        const body = members ? `\n${members}\n` : "";
        const propsType = `${ceDecl.name}Props`;
        const content = `export type { ${propsType} } from './custom-elements.js';\n\ndeclare class ${ceDecl.name} extends HTMLElement {${body}}\n\nexport default ${ceDecl.name};\n`;

        const fileName = mod.path
          .split("/")
          .pop()
          .replace(/\.(js|ts)$/, ".d.ts");
        writeFileSync(join(outdir, fileName), content);
      }
    },
  };
}
