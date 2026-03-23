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
 * Elena CEM Prop Plugin
 * https://elenajs.com
 */

/**
 * CEM analyzer plugin that reads `@property` or `@prop` JSDoc tags from class
 * fields and creates corresponding `attributes` entries in the manifest.
 *
 * @returns {import("@custom-elements-manifest/analyzer").Plugin}
 */
export function elenaPropPlugin() {
  return {
    name: "prop-to-attribute",

    analyzePhase({ ts, node, moduleDoc }) {
      if (!ts.isClassDeclaration(node)) {
        return;
      }

      const className = node.name?.getText();
      const declaration = moduleDoc.declarations?.find(d => d.name === className);

      if (!declaration) {
        return;
      }

      for (const member of node.members) {
        if (!ts.isPropertyDeclaration(member)) {
          continue;
        }

        if (member.modifiers?.some(m => m.kind === ts.SyntaxKind.StaticKeyword)) {
          continue;
        }

        const tags = ts.getAllJSDocTags(member, t => {
          const name = t.tagName.getText();
          return name === "property" || name === "prop";
        });

        if (tags.length === 0) {
          continue;
        }

        const fieldName = member.name?.getText();
        const memberDoc = declaration.members?.find(m => m.name === fieldName && !m.static);

        if (!memberDoc) {
          continue;
        }

        memberDoc.attribute = fieldName;
        const attrs = (declaration.attributes ??= []);

        if (!attrs.some(a => a.name === fieldName)) {
          attrs.push({
            name: fieldName,
            fieldName,
            type: memberDoc.type,
            default: memberDoc.default,
            description: memberDoc.description,
          });
        }
      }
    },
  };
}
