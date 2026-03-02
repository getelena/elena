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
 * CEM analyzer plugin that reads `tagName` from the options object passed to
 * `Elena(superClass, { tagName: "...", ... })` and registers the element in the manifest.
 *
 * Supports both inline objects and variable references:
 * - `Elena(HTMLElement, { tagName: "elena-button", ... })`
 * - `const options = { tagName: "elena-button", ... }; Elena(HTMLElement, options)`
 *
 * @returns {import("@custom-elements-manifest/analyzer").Plugin}
 */
export function elenaDefinePlugin() {
  /** @type {Map<string, string>} variable name → tag name */
  const optionsMap = new Map();

  return {
    name: "define-element",

    analyzePhase({ ts, node, moduleDoc }) {
      // Collect variable declarations: const options = { tagName: "...", ... }
      if (
        ts.isVariableDeclaration(node) &&
        node.initializer &&
        ts.isObjectLiteralExpression(node.initializer)
      ) {
        const varName = node.name.getText();
        const tagName = getTagName(ts, node.initializer);
        if (tagName) {
          optionsMap.set(varName, tagName);
        }
        return;
      }

      if (!ts.isClassDeclaration(node)) {
        return;
      }

      const className = node.name?.getText();
      if (!className) {
        return;
      }

      // Skip classes that don't extend anything (no `extends` clause)
      const heritageClause = node.heritageClauses?.[0];
      if (!heritageClause) {
        return;
      }

      for (const type of heritageClause.types) {
        const expr = type.expression;
        if (!ts.isCallExpression(expr) || expr.expression.getText() !== "Elena") {
          continue;
        }

        const optionsArg = expr.arguments[1];
        if (!optionsArg) {
          continue;
        }

        let tagName;

        if (ts.isObjectLiteralExpression(optionsArg)) {
          // Inline: Elena(HTMLElement, { tagName: "...", ... })
          tagName = getTagName(ts, optionsArg);
        } else if (ts.isIdentifier(optionsArg)) {
          // Variable reference: Elena(HTMLElement, options)
          tagName = optionsMap.get(optionsArg.getText());
        }

        if (!tagName) {
          continue;
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
      }
    },
  };
}

/**
 * Extracts the `tagName` string value from an object literal expression.
 * @param {import("typescript")} ts
 * @param {import("typescript").ObjectLiteralExpression} objectLiteral
 * @returns {string | undefined}
 */
function getTagName(ts, objectLiteral) {
  const prop = objectLiteral.properties.find(
    p => ts.isPropertyAssignment(p) && p.name.getText() === "tagName"
  );
  if (prop && ts.isStringLiteral(prop.initializer)) {
    return prop.initializer.text;
  }
  return undefined;
}
