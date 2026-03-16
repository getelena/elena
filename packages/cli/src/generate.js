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
 * Elena CLI Code Generator
 * https://elenajs.com
 */

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
 * Checks if a feature is selected.
 *
 * @param {string[]} features
 * @param {string} feature
 * @returns {boolean}
 */
function has(features, feature) {
  return features.includes(feature);
}

/**
 * Builds JSDoc block for a component.
 *
 * @param {string} className
 * @param {string} tagName
 * @param {string[]} features
 * @returns {string}
 */
function buildJSDoc(className, tagName, features) {
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
 * Generates the JavaScript source for an Elena component.
 *
 * @param {string} name - kebab-case component name (e.g. "button")
 * @param {string[]} features - selected features (e.g. "props","methods")
 * @returns {string}
 */
function generateJS(name, features) {
  const className = toPascal(name);
  const tagName = name;
  const hasComments = has(features, "comments");

  const bodyLines = [];

  // Static fields
  bodyLines.push(`  static tagName = "${tagName}";`);
  if (has(features, "props")) {
    bodyLines.push(`  static props = ["variant"];`);
  }
  if (has(features, "events")) {
    bodyLines.push(`  static events = ["click", "focus", "blur"];`);
  }

  // Instance prop field
  if (has(features, "props")) {
    bodyLines.push(``);
    if (hasComments) {
      bodyLines.push(
        `  /**`,
        `   * The style variant of the component.`,
        `   * @attribute`,
        `   * @type {"default" | "primary" | "danger"}`,
        `   */`
      );
    } else {
      bodyLines.push(`  /** @attribute @type {"default" | "primary" | "danger"} */`);
    }
    bodyLines.push(`  variant = "default";`);
  }

  // render()
  bodyLines.push(``);
  if (hasComments) {
    bodyLines.push(`  /**`, `   * Renders the html template.`, `   * @internal`, `   */`);
  }
  bodyLines.push(
    `  render() {`,
    `    return html\``,
    `      <div class="${tagName}">\${this.text}</div>`,
    `    \`;`,
    `  }`
  );

  if (has(features, "methods")) {
    bodyLines.push(``, `  myMethod() {`, `    console.log(this.element);`, `  }`);
  }

  const jsdoc = hasComments ? `${buildJSDoc(className, tagName, features)}\n` : "";

  return `import { Elena, html } from "@elenajs/core";

${jsdoc}export default class ${className} extends Elena(HTMLElement) {
${bodyLines.join("\n")}
}
${className}.define();
`;
}

/**
 * Generates the TypeScript source for an Elena component.
 *
 * @param {string} name - kebab-case component name (e.g. "button")
 * @param {string[]} features - selected features (e.g. "props","methods")
 * @returns {string}
 */
function generateTS(name, features) {
  const className = toPascal(name);
  const tagName = name;
  const hasComments = has(features, "comments");

  const bodyLines = [];

  // Static fields
  bodyLines.push(`  static tagName = "${tagName}";`);
  if (has(features, "props")) {
    bodyLines.push(`  static props = ["variant"];`);
  }
  if (has(features, "events")) {
    bodyLines.push(`  static events = ["click", "focus", "blur"];`);
  }

  // Instance prop field (TS inline type, no @type JSDoc needed)
  if (has(features, "props")) {
    bodyLines.push(``);
    if (hasComments) {
      bodyLines.push(
        `  /**`,
        `   * The style variant of the component.`,
        `   * @attribute`,
        `   */`
      );
    } else {
      bodyLines.push(`  /** @attribute */`);
    }
    bodyLines.push(`  variant: "default" | "primary" | "danger" = "default";`);
  }

  // render()
  bodyLines.push(``);
  if (hasComments) {
    bodyLines.push(`  /**`, `   * Renders the html template.`, `   * @internal`, `   */`);
  }
  bodyLines.push(
    `  render() {`,
    `    return html\``,
    `      <div class="${tagName}">\${this.text}</div>`,
    `    \`;`,
    `  }`
  );

  if (has(features, "methods")) {
    bodyLines.push(``, `  myMethod() {`, `    console.log(this.element);`, `  }`);
  }

  const jsdoc = hasComments ? `${buildJSDoc(className, tagName, features)}\n` : "";

  return `import { Elena, html } from "@elenajs/core";

${jsdoc}export default class ${className} extends Elena(HTMLElement) {
${bodyLines.join("\n")}
}
${className}.define();
`;
}

/**
 * Generates the CSS source for an Elena component.
 *
 * @param {string} name - kebab-case component name (e.g. "button")
 * @param {string[]} features
 * @returns {string}
 */
function generateCSSSrc(name, features) {
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
    lines.push(
      `  :scope,`,
      `  *:where(:not(img, svg):not(svg *)),`,
      `  *::before,`,
      `  *::after {`,
      `    all: unset;`,
      `    display: revert;`,
      `  }`
    );
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

  lines.push(`}`);
  return lines.join("\n");
}

/**
 * Generates an HTML file with the component JS in a script block,
 * CSS in a style block, and an example usage of the component.
 *
 * @param {string} name - kebab-case component name
 * @param {string[]} features - selected features
 * @returns {string}
 */
function generateHTML(name, features) {
  const tagName = `${name}`;
  const js = generateJS(name, features);
  const css = generateCSSSrc(name, features);

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
 * Generates the component source code (JS, TS, or HTML).
 *
 * @param {string} name - kebab-case component name
 * @param {"javascript" | "typescript" | "html"} language - output language
 * @param {string[]} features - selected features
 * @returns {string}
 */
export function generateSource(name, language, features) {
  if (language === "html") {
    return generateHTML(name, features);
  }
  return language === "typescript" ? generateTS(name, features) : generateJS(name, features);
}

/**
 * Generates the component CSS.
 *
 * @param {string} name - kebab-case component name
 * @param {string[]} features - selected features
 * @returns {string}
 */
export function generateCSS(name, features) {
  return generateCSSSrc(name, features);
}
