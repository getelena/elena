/**
 *  ██████████ ████
 * ░░███░░░░░█░░███
 *  ░███  █ ░  ███   ██████  ████████    ██████
 *  ░██████    ███  ███░░███░░███░░███  ░░░░░███
 *  ░███░░█    ███ ░███████  ░███ ░███   ███████
 *  ░███ ░   █ ███ ░███░░░   ░███ ░███  ███░░███
 *  ██████████ █████░░██████  ████ █████░░████████
 * ░░░░░░░░░░ ░░░░░  ░░░░░░  ░░░░ ░░░░░  ░░░░░░░░
 *
 * Elena CEM Define Plugin
 * https://elenajs.com
 */

/**
 * CEM analyzer plugin that reads `static tagName` from an Elena component class
 * and registers the element in the manifest.
 *
 * @returns {import("@custom-elements-manifest/analyzer").Plugin}
 */
export function elenaDefinePlugin() {
  return {
    name: "define-element",

    analyzePhase({ ts, node, moduleDoc }) {
      if (!ts.isClassDeclaration(node)) {
        return;
      }

      const className = node.name?.getText();
      if (!className) {
        return;
      }

      // Skip classes that don't extend Elena(...)
      const heritageClause = node.heritageClauses?.[0];
      if (
        !heritageClause?.types.some(
          t => ts.isCallExpression(t.expression) && t.expression.expression.getText() === "Elena"
        )
      ) {
        return;
      }

      const tagName = getStaticTagName(ts, node);
      if (!tagName) {
        return;
      }

      const declaration = moduleDoc.declarations?.find(d => d.name === className);
      if (declaration) {
        declaration.tagName = tagName;
      }

      moduleDoc.exports ??= [];
      moduleDoc.exports.push({
        kind: "custom-element-definition",
        name: tagName,
        declaration: { name: className, module: moduleDoc.path },
      });
    },
  };
}

/**
 * Extracts the `tagName` string value from a `static tagName = "..."` class field.
 *
 * @param {import("typescript")} ts
 * @param {import("typescript").ClassDeclaration} classNode
 * @returns {string | undefined}
 */
function getStaticTagName(ts, classNode) {
  for (const member of classNode.members) {
    if (
      ts.isPropertyDeclaration(member) &&
      member.modifiers?.some(m => m.kind === ts.SyntaxKind.StaticKeyword) &&
      member.name?.getText() === "tagName" &&
      member.initializer &&
      ts.isStringLiteral(member.initializer)
    ) {
      return member.initializer.text;
    }
  }
  return undefined;
}
