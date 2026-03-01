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
  const hasComments = has(features, "comments");
  const opts = buildOptions(tagName, features, true);

  const bodyLines = [];

  if (has(features, "props")) {
    if (hasComments) {
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
    } else {
      bodyLines.push(
        "  constructor() {",
        "    super();",
        '    this.variant = "default";',
        "  }"
      );
    }
  }

  if (hasComments) {
    bodyLines.push(
      "",
      "  /**",
      "   * Renders the html template.",
      "   * @internal",
      "   */",
      "  render() {"
    );
  } else {
    bodyLines.push("", "  render() {");
  }
  bodyLines.push(
    "    return html`",
    `      <div class="${tagName}">\${this.text}</div>`,
    "    `;",
    "  }"
  );

  if (has(features, "methods")) {
    bodyLines.push("", "  myMethod() {", "    console.log(this.element);", "  }");
  }

  const header = hasComments ? "// ░ [ELENA]: Primitive Component\n" : "";
  const jsdoc = hasComments ? `\n${primitiveJSDoc(className, tagName, features)}` : "";

  return `${header}import { Elena, html } from "@elenajs/core";

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
  const hasComments = has(features, "comments");
  const opts = buildOptions(tagName, features, true);

  const bodyLines = [];

  if (has(features, "props")) {
    if (hasComments) {
      bodyLines.push(
        "  /**",
        "   * The style variant of the component.",
        "   * @attribute",
        "   */",
        '  variant: "default" | "primary" | "danger" = "default";'
      );
    } else {
      bodyLines.push('  variant: "default" | "primary" | "danger" = "default";');
    }
  }

  if (hasComments) {
    bodyLines.push(
      "",
      "  /**",
      "   * Renders the html template.",
      "   * @internal",
      "   */",
      "  render() {"
    );
  } else {
    bodyLines.push("", "  render() {");
  }
  bodyLines.push(
    "    return html`",
    `      <div class="${tagName}">\${this.text}</div>`,
    "    `;",
    "  }"
  );

  if (has(features, "methods")) {
    bodyLines.push("", "  myMethod() {", "    console.log(this.element);", "  }");
  }

  const header = hasComments ? "// ░ [ELENA]: Primitive Component\n" : "";
  const jsdoc = hasComments ? `\n${primitiveJSDoc(className, tagName, features)}` : "";

  return `${header}import { Elena, html } from "@elenajs/core";

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
  const hasComments = has(features, "comments");

  const lines = [`@scope (${tagName}) {`];

  if (hasCssEncap) {
    if (hasComments) {
      lines.push(``, `  /* Unset makes sure styles don't leak in */`);
    }
    lines.push(`  :scope, *, *::before, *::after {`, `    all: unset;`, `  }`);
  }

  if (hasComments) {
    lines.push(``, `  /* Targets the host element (${tagName}) */`);
  }
  lines.push(`  :scope {`);

  if (hasCssProps) {
    if (hasComments) {
      lines.push(``, `    /* Public CSS properties */`);
    }
    lines.push(
      `    --${tagName}-font: sans-serif;`,
      `    --${tagName}-text: white;`,
      `    --${tagName}-bg: blue;`
    );
  }

  if (hasComments) {
    lines.push(``, `    /* Display mode for the host element */`);
  }
  lines.push(`    display: inline-block;`, `  }`);

  if (hasSsr) {
    if (hasComments) {
      lines.push(``, `  /* Elena SSR Pattern to avoid layout shift */`);
    }
    lines.push(`  :scope:not([hydrated]),`);
  } else {
    lines.push(``);
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
    if (hasComments) {
      lines.push(``, `  /* Rest of your component styles */`);
    }
    lines.push(`  :scope[variant="primary"] {`, `    --${tagName}-bg: red;`, `  }`);
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
  const hasComments = has(features, "comments");
  const opts = buildOptions(tagName, features, false);

  const bodyLines = [];

  if (has(features, "props")) {
    if (hasComments) {
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
    } else {
      bodyLines.push(
        "  constructor() {",
        "    super();",
        '    this.direction = "column";',
        "  }"
      );
    }
  }

  if (has(features, "methods")) {
    if (bodyLines.length > 0) {
      bodyLines.push("");
    }
    bodyLines.push("  myMethod() {", "    console.log(this);", "  }");
  }

  const body = bodyLines.length > 0 ? `\n${bodyLines.join("\n")}\n` : "";
  const jsdoc = hasComments ? `\n${compositeJSDoc(className, tagName, features)}` : "";

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
  const hasComments = has(features, "comments");
  const opts = buildOptions(tagName, features, false);

  const bodyLines = [];

  if (has(features, "props")) {
    if (hasComments) {
      bodyLines.push(
        "  /**",
        "   * The direction of the content.",
        "   *",
        "   * @attribute",
        "   */",
        '  direction: "column" | "row" = "column";'
      );
    } else {
      bodyLines.push('  direction: "column" | "row" = "column";');
    }
  }

  if (has(features, "methods")) {
    if (bodyLines.length > 0) {
      bodyLines.push("");
    }
    bodyLines.push("  myMethod() {", "    console.log(this);", "  }");
  }

  const body = bodyLines.length > 0 ? `\n${bodyLines.join("\n")}\n` : "";
  const jsdoc = hasComments ? `\n${compositeJSDoc(className, tagName, features)}` : "";

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
  const hasComments = has(features, "comments");

  const lines = [`@scope (${tagName}) {`];

  if (hasCssEncap) {
    if (hasComments) {
      lines.push(``, `  /* Unset makes sure styles don't leak in */`);
    }
    lines.push(`  :scope, *, *::before, *::after {`, `    all: unset;`, `  }`);
  }

  if (hasComments) {
    lines.push(``, `  /* Targets the host element (${tagName}) */`);
  }
  lines.push(`  :scope {`);

  if (hasCssProps) {
    if (hasComments) {
      lines.push(``, `    /* Public CSS properties */`);
    }
    lines.push(
      `    --${tagName}-font: sans-serif;`,
      `    --${tagName}-text: white;`,
      `    --${tagName}-bg: blue;`
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
    if (hasComments) {
      lines.push(``, `  /* Attributes provide customization */`);
    }
    lines.push(`  :scope[direction="row"] {`, `    flex-direction: row;`, `  }`);
  }

  lines.push(`}`, ``);
  return lines.join("\n");
}

/**
 * Generates an HTML file with the component JS in a script block,
 * CSS in a style block, and an example usage of the component.
 *
 * @param {string} name - kebab-case component name
 * @param {"primitive" | "composite"} type - component type
 * @param {string[]} features - selected features
 * @returns {string}
 */
function primitiveHTML(name, features) {
  const tagName = `${name}`;
  const js = primitiveJS(name, features);
  const css = primitiveCSS(name, features);

  return `<style>
${css
  .trimEnd()
  .split("\n")
  .map(line => (line ? `    ${line}` : ""))
  .join("\n")}
</style>
<script type="module">
${js
  .trimEnd()
  .split("\n")
  .map(line => (line ? `    ${line}` : ""))
  .join("\n")}
</script>
<${tagName}>Hello world!</${tagName}>`;
}

/**
 * Generates an HTML file for a composite component.
 *
 * @param {string} name - kebab-case component name
 * @param {string[]} features - selected features
 * @returns {string}
 */
function compositeHTML(name, features) {
  const tagName = `${name}`;
  const js = compositeJS(name, features);
  const css = compositeCSS(name, features);

  return `<style>
${css
  .trimEnd()
  .split("\n")
  .map(line => (line ? `    ${line}` : ""))
  .join("\n")}
</style>
<script type="module">
${js
  .trimEnd()
  .split("\n")
  .map(line => (line ? `    ${line}` : ""))
  .join("\n")}
</script>
<${tagName}>
  <p>Hello world!</p>
</${tagName}>`;
}

/**
 * Generates the component source code (JS, TS, or HTML).
 *
 * @param {string} name - kebab-case component name
 * @param {"primitive" | "composite"} type - component type
 * @param {"javascript" | "typescript" | "html"} language - output language
 * @param {string[]} features - selected features
 * @returns {string}
 */
export function generateSource(name, type, language, features) {
  if (language === "html") {
    return type === "primitive" ? primitiveHTML(name, features) : compositeHTML(name, features);
  }
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
