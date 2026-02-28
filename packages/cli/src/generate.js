/**
 * Converts kebab-case to PascalCase.
 *
 * @param {string} str - kebab-case string (e.g. "date-picker")
 * @returns {string} PascalCase string (e.g. "DatePicker")
 */
export function toPascal(str) {
  return str
    .split("-")
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

/**
 * @param {string[]} features
 * @param {string} feature
 * @returns {boolean}
 */
function has(features, feature) {
  return features.includes(feature);
}

/**
 * Builds the options object literal as a string.
 *
 * @param {string} tagName
 * @param {string[]} features
 * @param {boolean} isPrimitive
 * @returns {string}
 */
function buildOptions(tagName, features, isPrimitive) {
  const lines = [`  tagName: "${tagName}",`];

  if (has(features, "props")) {
    lines.push(isPrimitive ? `  props: ["variant"],` : `  props: ["direction"],`);
  }

  if (isPrimitive && has(features, "events")) {
    lines.push(`  events: ["click", "focus", "blur"],`);
  }

  return `const options = {\n${lines.join("\n")}\n};`;
}

/**
 * Builds JSDoc block for a primitive component.
 *
 * @param {string} className
 * @param {string} tagName
 * @param {string[]} features
 * @returns {string}
 */
function primitiveJSDoc(className, tagName, features) {
  const lines = [
    "/**",
    " * The description of the component goes here.",
    " *",
    ` * @displayName ${className}`,
    " * @status alpha",
  ];

  if (has(features, "events")) {
    lines.push(
      " *",
      " * @event click - Programmatically fire click on the component.",
      " * @event focus - Programmatically move focus to the component.",
      " * @event blur - Programmatically remove focus from the component."
    );
  }

  if (has(features, "cssprops")) {
    lines.push(
      " *",
      ` * @cssprop [--${tagName}-text] - Overrides the default text color.`,
      ` * @cssprop [--${tagName}-bg] - Overrides the default background color.`,
      ` * @cssprop [--${tagName}-font] - Overrides the default font family.`
    );
  }

  lines.push(" */");
  return lines.join("\n");
}

/**
 * Builds JSDoc block for a composite component.
 *
 * @param {string} className
 * @param {string} tagName
 * @param {string[]} features
 * @returns {string}
 */
function compositeJSDoc(className, tagName, features) {
  const lines = [
    "/**",
    " * The description of the component goes here.",
    " *",
    ` * @displayName ${className}`,
    " * @slot - The web component content",
    " * @status alpha",
  ];

  if (has(features, "cssprops")) {
    lines.push(
      " *",
      ` * @cssprop [--${tagName}-text] - Overrides the default text color.`,
      ` * @cssprop [--${tagName}-bg] - Overrides the default background color.`,
      ` * @cssprop [--${tagName}-font] - Overrides the default font family.`
    );
  }

  lines.push(" */");
  return lines.join("\n");
}

/**
 * Generates the JavaScript source for a primitive Elena component.
 *
 * @param {string} name - kebab-case component name (e.g. "button")
 * @param {string[]} features
 * @returns {string}
 */
function primitiveJS(name, features) {
  const className = toPascal(name);
  const tagName = `${name}`;
  const opts = buildOptions(tagName, features, true);
  const jsdoc = primitiveJSDoc(className, tagName, features);

  const bodyLines = [];

  if (has(features, "props")) {
    bodyLines.push(
      "  constructor() {",
      "    super();",
      "",
      "    /**",
      "     * The style variant of the component.",
      "     * @attribute",
      '     * @type {"default" | "primary" | "danger"}',
      "     */",
      '    this.variant = "default";',
      "  }"
    );
  }

  bodyLines.push(
    "",
    "  /**",
    "   * Renders the html template.",
    "   * @internal",
    "   */",
    "  render() {",
    "    return html`",
    `      <div class="${tagName}">\${this.text}</div>`,
    "    `;",
    "  }"
  );

  if (has(features, "methods")) {
    bodyLines.push("", "  myMethod() {", "    console.log(this.element);", "  }");
  }

  return `// ░ [ELENA]: Primitive Component
import { Elena, html } from "@elenajs/core";

${opts}

${jsdoc}
export default class ${className} extends Elena(HTMLElement, options) {
${bodyLines.join("\n")}
}
${className}.define();
`;
}

/**
 * Generates the TypeScript source for a primitive Elena component.
 *
 * @param {string} name - kebab-case component name (e.g. "button")
 * @param {string[]} features
 * @returns {string}
 */
function primitiveTS(name, features) {
  const className = toPascal(name);
  const tagName = `${name}`;
  const opts = buildOptions(tagName, features, true);
  const jsdoc = primitiveJSDoc(className, tagName, features);

  const bodyLines = [];

  if (has(features, "props")) {
    bodyLines.push(
      "  /**",
      "   * The style variant of the component.",
      "   * @attribute",
      "   */",
      '  variant: "default" | "primary" | "danger" = "default";'
    );
  }

  bodyLines.push(
    "",
    "  /**",
    "   * Renders the html template.",
    "   * @internal",
    "   */",
    "  render() {",
    "    return html`",
    `      <div class="${tagName}">\${this.text}</div>`,
    "    `;",
    "  }"
  );

  if (has(features, "methods")) {
    bodyLines.push("", "  myMethod() {", "    console.log(this.element);", "  }");
  }

  return `// ░ [ELENA]: Primitive Component
import { Elena, html } from "@elenajs/core";

${opts}

${jsdoc}
export default class ${className} extends Elena(HTMLElement, options) {
${bodyLines.join("\n")}
}
${className}.define();
`;
}

/**
 * Generates the CSS source for a primitive Elena component.
 *
 * @param {string} name - kebab-case component name (e.g. "button")
 * @param {string[]} features
 * @returns {string}
 */
function primitiveCSS(name, features) {
  const tagName = `${name}`;
  const hasCssProps = has(features, "cssprops");
  const hasProps = has(features, "props");
  const hasCssEncap = has(features, "cssencap");
  const hasSsr = has(features, "ssr");

  const lines = [`/* Scope makes sure styles don't leak out */`, `@scope (${tagName}) {`];

  if (hasCssEncap) {
    lines.push(
      ``,
      `  /* Unset makes sure styles don't leak in */`,
      `  :scope, *, *::before, *::after {`,
      `    all: unset;`,
      `  }`
    );
  }

  lines.push(``, `  /* Targets the host element (${tagName}) */`, `  :scope {`);

  if (hasCssProps) {
    lines.push(
      ``,
      `    /* Recommended: Public CSS properties */`,
      `    --${tagName}-font: sans-serif;`,
      `    --${tagName}-text: white;`,
      `    --${tagName}-bg: blue;`
    );
  }

  lines.push(
    ``,
    `    /* Recommended: Display mode for the host element */`,
    `    display: inline-block;`,
    `  }`,
    ``
  );

  if (hasSsr) {
    lines.push(
      `  /**`,
      `   * Recommended: When building Primitive Components, we recommend to`,
      `   * target both the non-hydrated host element and the inner element`,
      `   * with the same baseline styles. This way the component will look`,
      `   * the same before & after client side hydration.`,
      `   */`,
      `  :scope:not([hydrated]),`
    );
  }

  lines.push(`  .${tagName} {`);

  if (hasCssProps) {
    lines.push(
      `    font-family: var(--${tagName}-font);`,
      `    color: var(--${tagName}-text);`,
      `    background: var(--${tagName}-bg);`
    );
  }

  lines.push(`    display: inline-block;`, `  }`);

  if (hasProps) {
    lines.push(
      ``,
      `  /* Rest of your component styles */`,
      `  :scope[variant="primary"] {`,
      `    --${tagName}-bg: red;`,
      `  }`
    );
  }

  lines.push(`}`, ``);
  return lines.join("\n");
}

/**
 * Generates the JavaScript source for a composite Elena component.
 *
 * @param {string} name - kebab-case component name (e.g. "stack")
 * @param {string[]} features
 * @returns {string}
 */
function compositeJS(name, features) {
  const className = toPascal(name);
  const tagName = `${name}`;
  const opts = buildOptions(tagName, features, false);
  const jsdoc = compositeJSDoc(className, tagName, features);

  const bodyLines = [];

  if (has(features, "props")) {
    bodyLines.push(
      "  constructor() {",
      "    super();",
      "",
      "    /**",
      "     * The direction of the content.",
      "     *",
      "     * @attribute",
      '     * @type {"column" | "row"}',
      "     */",
      '    this.direction = "column";',
      "  }"
    );
  }

  if (has(features, "methods")) {
    if (bodyLines.length > 0) bodyLines.push("");
    bodyLines.push("  myMethod() {", "    console.log(this);", "  }");
  }

  // If the class body is empty, render with just a newline
  const body = bodyLines.length > 0 ? `\n${bodyLines.join("\n")}\n` : "";

  return `import { Elena } from "@elenajs/core";

${opts}

${jsdoc}
export default class ${className} extends Elena(HTMLElement, options) {${body}}
${className}.define();
`;
}

/**
 * Generates the TypeScript source for a composite Elena component.
 *
 * @param {string} name - kebab-case component name (e.g. "stack")
 * @param {string[]} features
 * @returns {string}
 */
function compositeTS(name, features) {
  const className = toPascal(name);
  const tagName = `${name}`;
  const opts = buildOptions(tagName, features, false);
  const jsdoc = compositeJSDoc(className, tagName, features);

  const bodyLines = [];

  if (has(features, "props")) {
    bodyLines.push(
      "  /**",
      "   * The direction of the content.",
      "   *",
      "   * @attribute",
      "   */",
      '  direction: "column" | "row" = "column";'
    );
  }

  if (has(features, "methods")) {
    if (bodyLines.length > 0) bodyLines.push("");
    bodyLines.push("  myMethod() {", "    console.log(this);", "  }");
  }

  const body = bodyLines.length > 0 ? `\n${bodyLines.join("\n")}\n` : "";

  return `import { Elena } from "@elenajs/core";

${opts}

${jsdoc}
export default class ${className} extends Elena(HTMLElement, options) {${body}}
${className}.define();
`;
}

/**
 * Generates the CSS source for a composite Elena component.
 *
 * @param {string} name - kebab-case component name (e.g. "stack")
 * @param {string[]} features
 * @returns {string}
 */
function compositeCSS(name, features) {
  const tagName = `${name}`;
  const hasCssProps = has(features, "cssprops");
  const hasProps = has(features, "props");
  const hasCssEncap = has(features, "cssencap");

  const lines = [`/* Scope makes sure styles don't leak out */`, `@scope (${tagName}) {`];

  if (hasCssEncap) {
    lines.push(
      ``,
      `  /* Unset makes sure styles don't leak in */`,
      `  :scope, *, *::before, *::after {`,
      `    all: unset;`,
      `  }`
    );
  }

  lines.push(``, `  /* Targets the host element (${tagName}) */`, `  :scope {`);

  if (hasCssProps) {
    lines.push(
      ``,
      `    /* Recommended: Public CSS properties */`,
      `    --${tagName}-font: sans-serif;`,
      `    --${tagName}-text: white;`,
      `    --${tagName}-bg: blue;`,
      ``
    );
  }

  lines.push(
    `    display: flex;`,
    `    justify-content: flex-start;`,
    `    align-items: flex-start;`,
    `    flex-flow: column wrap;`,
    `    flex-direction: column;`,
    `    gap: 0.5rem;`,
    `  }`
  );

  if (hasProps) {
    lines.push(
      ``,
      `  /* Attributes provide customization */`,
      `  :scope[direction="row"] {`,
      `    flex-direction: row;`,
      `  }`
    );
  }

  lines.push(`}`, ``);
  return lines.join("\n");
}

/**
 * Generates the component source code (JS or TS).
 *
 * @param {string} name - kebab-case component name
 * @param {"primitive" | "composite"} type - component type
 * @param {"javascript" | "typescript"} language - output language
 * @param {string[]} features - selected features
 * @returns {string}
 */
export function generateSource(name, type, language, features) {
  if (type === "primitive") {
    return language === "typescript" ? primitiveTS(name, features) : primitiveJS(name, features);
  }
  return language === "typescript" ? compositeTS(name, features) : compositeJS(name, features);
}

/**
 * Generates the component CSS.
 *
 * @param {string} name - kebab-case component name
 * @param {"primitive" | "composite"} type - component type
 * @param {string[]} features - selected features
 * @returns {string}
 */
export function generateCSS(name, type, features) {
  return type === "primitive" ? primitiveCSS(name, features) : compositeCSS(name, features);
}
