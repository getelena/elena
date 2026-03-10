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
 * Elena CEM Tag Plugin
 * https://elenajs.com
 */

/**
 * Returns the CEM class declaration and resolved tag name for a class node,
 * or `undefined` if the node is not a registered custom element.
 *
 * @param {Partial<import("@custom-elements-manifest/analyzer").JavaScriptModule>} moduleDoc
 * @param {import("typescript").ClassDeclaration} node
 * @returns {{ class: import("@custom-elements-manifest/analyzer").Declaration; tagName: string } | undefined}
 */
function getElenaElementDetails(moduleDoc, node) {
  const declaration = moduleDoc.declarations?.find(d => d.name === node.name?.getText());
  if (!declaration) {
    return undefined;
  }

  const customElement = moduleDoc.exports?.find(
    e => e.kind === "js" && e.declaration.name === declaration.name
  );

  if (!customElement) {
    return undefined;
  }

  return { class: declaration, tagName: customElement.name };
}

/**
 * CEM analyzer plugin that reads a non-standard JSDoc tag from each custom element class
 * and writes its value onto the CEM class declaration under the same key.
 *
 * Used for Elena-specific tags like `@status` and `@displayName`.
 *
 * @see https://custom-elements-manifest.open-wc.org/analyzer/plugins/authoring/#example-plugin
 * @param {string} tagName - The JSDoc tag name to extract (e.g. `"status"`, `"displayName"`).
 * @returns {import("@custom-elements-manifest/analyzer").Plugin}
 */
export function elenaTagPlugin(tagName) {
  return {
    name: `${tagName}-tag`,

    analyzePhase({ ts, node, moduleDoc }) {
      if (!ts.isClassDeclaration(node)) {
        return;
      }

      const details = getElenaElementDetails(moduleDoc, node);
      if (!details) {
        return;
      }

      const [tag] = ts.getAllJSDocTags(node, t => t.tagName.getText() === tagName);
      details.class[tagName] = tag && ts.getTextOfJSDocComment(tag.comment);
    },
  };
}
