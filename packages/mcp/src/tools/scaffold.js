import { z } from "zod";

/**
 * Converts PascalCase to kebab-case.
 *
 * @param {string} str
 * @returns {string}
 */
export function toKebab(str) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}

/**
 * Returns the default value literal for a given type.
 *
 * @param {string} type
 * @param {string} defaultVal
 * @returns {string}
 */
export function formatDefault(type, defaultVal) {
  if (defaultVal) {
    return defaultVal;
  }
  const lower = type.toLowerCase();
  if (lower === "boolean") {
    return "false";
  }
  if (lower === "number") {
    return "0";
  }
  if (lower === "array") {
    return "[]";
  }
  if (lower === "object") {
    return "{}";
  }
  return '""';
}

/**
 * Generates the JavaScript source for an Elena component.
 *
 * @param {object} params
 * @returns {string}
 */
export function generateJS(params) {
  const { name, tagName, props, events, cssProperties, description, status } = params;

  // Imports
  const imports = 'import { Elena, html } from "@elenajs/core";';

  // Class-level JSDoc (goes above the class declaration)
  const jsdocLines = ["/**"];
  jsdocLines.push(` * ${description || `${name} component.`}`);
  jsdocLines.push(" *");
  jsdocLines.push(` * @displayName ${name}`);
  jsdocLines.push(` * @status ${status}`);
  if (events.length > 0) {
    jsdocLines.push(" *");
    for (const event of events) {
      jsdocLines.push(` * @event ${event} - Fires the ${event} event.`);
    }
  }
  if (cssProperties.length > 0) {
    jsdocLines.push(" *");
    for (const cp of cssProperties) {
      jsdocLines.push(` * @cssprop [${cp.name}] - ${cp.description || `Controls ${cp.name}.`}`);
    }
  }
  jsdocLines.push(" */");
  const classJsdoc = jsdocLines.join("\n");

  // Static class fields
  const staticLines = [`  static tagName = "${tagName}";`];
  if (props.length > 0) {
    const propNames = props.map(p => `"${p.name}"`).join(", ");
    staticLines.push(`  static props = [${propNames}];`);
  }
  if (events.length > 0) {
    const eventNames = events.map(e => `"${e}"`).join(", ");
    staticLines.push(`  static events = [${eventNames}];`);
  }

  // Prop class fields with JSDoc
  const propFieldLines = [];
  for (const prop of props) {
    propFieldLines.push("");
    propFieldLines.push("  /**");
    if (prop.description) {
      propFieldLines.push(`   * ${prop.description}`);
    } else {
      propFieldLines.push(`   * The ${prop.name} of the component.`);
    }
    propFieldLines.push("   *");
    propFieldLines.push("   * @property");
    propFieldLines.push(`   * @type {${prop.type || "string"}}`);
    propFieldLines.push("   */");
    propFieldLines.push(`  ${prop.name} = ${formatDefault(prop.type, prop.default)};`);
  }

  // render() method
  const renderLines = [
    "",
    "  /**",
    "   * Renders the template.",
    "   *",
    "   * @internal",
    "   */",
    "  render() {",
    `    return html\`<div class="${tagName}">\${this.text}</div>\`;`,
    "  }",
  ];

  // Assemble
  const lines = [
    imports,
    "",
    classJsdoc,
    `export default class ${name} extends Elena(HTMLElement) {`,
    ...staticLines,
    ...propFieldLines,
    ...renderLines,
    "}",
    "",
    `${name}.define();`,
    "",
  ];

  return lines.join("\n");
}

/**
 * Generates the CSS source for an Elena component.
 *
 * @param {object} params
 * @returns {string}
 */
export function generateCSS(params) {
  const { tagName, name, cssProperties, cssEncapsulation, ssr } = params;
  const upperName = name.toUpperCase();

  const lines = [
    `/* ---------------------------------------------`,
    `/ ELENA ${upperName}`,
    `/ --------------------------------------------- */`,
    "",
    `/* Scope makes sure styles don't leak out */`,
    `@scope (${tagName}) {`,
    "",
  ];

  if (cssEncapsulation) {
    lines.push("  /* Reset makes sure styles don't leak in */");
    lines.push("  :scope,");
    lines.push("  *:where(:not(img, svg):not(svg *)),");
    lines.push("  *::before,");
    lines.push("  *::after {");
    lines.push("    all: unset;");
    lines.push("    display: revert;");
    lines.push("  }");
    lines.push("");
  }

  lines.push("  :scope {");

  if (cssProperties.length > 0) {
    lines.push("    /* Public CSS Custom Properties */");
    for (const cp of cssProperties) {
      lines.push(`    ${cp.name}: initial;`);
    }
    lines.push("");
  }

  lines.push("    display: inline-block;");
  lines.push("  }");
  lines.push("");

  if (ssr) {
    lines.push("  :scope:not([hydrated]),");
  }

  lines.push(`  .${tagName} {`);
  lines.push("    /* Add shared styles here */");
  lines.push("  }");
  lines.push("}");
  lines.push("");

  return lines.join("\n");
}

/**
 * Registers the scaffold-component tool.
 *
 * @param {import("@modelcontextprotocol/sdk/server/mcp.js").McpServer} server
 */
export function registerScaffoldTool(server) {
  server.registerTool(
    "scaffold-component",
    {
      title: "Scaffold Elena Component",
      description:
        "Generate boilerplate for a new Elena component (JS class + CSS file). " +
        "Returns file contents — does not write to disk. " +
        "The generated code imports from @elenajs/core and follows all Elena patterns: " +
        "Elena() factory, html tagged templates, @scope CSS, JSDoc annotations, and ClassName.define().",
      inputSchema: {
        name: z.string().describe("Component class name in PascalCase (e.g. 'DatePicker')"),
        tagName: z.string().describe("Custom element tag name (e.g. 'elena-date-picker')"),
        props: z
          .array(
            z.object({
              name: z.string(),
              type: z.string().default("string"),
              default: z.string().optional(),
              description: z.string().optional(),
            })
          )
          .default([])
          .describe("Props to define"),
        events: z
          .array(z.string())
          .default([])
          .describe("Event names to delegate (e.g. ['click', 'focus'])"),
        cssProperties: z
          .array(
            z.object({
              name: z.string(),
              description: z.string().optional(),
            })
          )
          .default([])
          .describe("CSS custom properties to document"),
        description: z.string().default("").describe("Component description for JSDoc"),
        status: z.enum(["alpha", "beta", "stable"]).default("alpha"),
        cssEncapsulation: z
          .boolean()
          .default(true)
          .describe("Include the all:unset encapsulation reset in CSS (default: true)"),
        ssr: z
          .boolean()
          .default(false)
          .describe(
            "Include :scope:not([hydrated]) pre-hydration styles in CSS to avoid layout shift (default: false)"
          ),
      },
    },
    async params => {
      const jsContent = generateJS(params);
      const cssContent = generateCSS(params);
      const dirName = toKebab(params.name);

      return {
        content: [
          {
            type: "text",
            text: [
              `## Generated files for ${params.tagName}`,
              "",
              `### src/${dirName}/${dirName}.js`,
              "```js",
              jsContent,
              "```",
              "",
              `### src/${dirName}/${dirName}.css`,
              "```css",
              cssContent,
              "```",
            ].join("\n"),
          },
        ],
      };
    }
  );
}
