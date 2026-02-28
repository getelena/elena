/**
 * Extract all custom element declarations from a CEM.
 *
 * @param {object} cem - Custom Elements Manifest
 * @returns {object[]} Array of class declarations with customElement: true
 */
export function getComponents(cem) {
  if (!cem?.modules) {
    return [];
  }
  return cem.modules
    .flatMap(mod => mod.declarations || [])
    .filter(decl => decl.kind === "class" && decl.customElement);
}

/**
 * Find a single component by tag name or class name.
 *
 * @param {object} cem - Custom Elements Manifest
 * @param {string} nameOrTag - Tag name (e.g. "elena-button") or class name (e.g. "Button")
 * @returns {object | undefined}
 */
export function findComponent(cem, nameOrTag) {
  const components = getComponents(cem);
  const lower = nameOrTag.toLowerCase();
  return components.find(c => c.tagName === lower || c.name.toLowerCase() === lower);
}

/**
 * Determine component type based on whether it has a render() method.
 *
 * @param {object} decl - CEM class declaration
 * @returns {"primitive" | "composite"}
 */
export function getComponentType(decl) {
  const hasRender = (decl.members || []).some(m => m.kind === "method" && m.name === "render");
  return hasRender ? "primitive" : "composite";
}

/**
 * Format a component declaration into a summary.
 *
 * @param {object} decl - CEM class declaration
 * @returns {object}
 */
export function formatComponentSummary(decl) {
  return {
    name: decl.name,
    tagName: decl.tagName,
    description: decl.description || "",
    status: decl.status || "unknown",
    displayName: decl.displayName || decl.name,
    type: getComponentType(decl),
  };
}

/**
 * Format full component details including props, events, CSS properties, and slots.
 *
 * @param {object} decl - CEM class declaration
 * @returns {object}
 */
export function formatComponentDetails(decl) {
  const props = (decl.members || [])
    .filter(m => m.kind === "field" && m.attribute)
    .map(m => ({
      name: m.name,
      type: m.type?.text || "string",
      default: m.default || undefined,
      description: m.description || "",
    }));

  return {
    ...formatComponentSummary(decl),
    props,
    events: (decl.events || []).map(e => ({
      name: e.name,
      description: e.description || "",
    })),
    cssProperties: (decl.cssProperties || []).map(p => ({
      name: p.name,
      description: p.description || "",
    })),
    slots: (decl.slots || []).map(s => ({
      name: s.name || "(default)",
      description: s.description || "",
    })),
  };
}
