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
 * Generates the JavaScript source for a primitive Elena component.
 *
 * @param {string} name - kebab-case component name (e.g. "button")
 * @returns {string}
 */
function primitiveJS(name) {
  const className = toPascal(name);
  const tagName = `elena-${name}`;

  return `// ░ [ELENA]: Primitive Component
import { Elena, html } from "@elenajs/core";

const options = {
  tagName: "${tagName}",
  props: ["variant"],
  events: ["click", "focus", "blur"],
};

/**
 * The description of the component goes here.
 *
 * @displayName ${className}
 * @status alpha
 *
 * @event click - Programmatically fire click on the component.
 * @event focus - Programmatically move focus to the component.
 * @event blur - Programmatically remove focus from the component.
 *
 * @cssprop [--${tagName}-text] - Overrides the default text color.
 * @cssprop [--${tagName}-bg] - Overrides the default background color.
 * @cssprop [--${tagName}-font] - Overrides the default font family.
 */
export default class ${className} extends Elena(HTMLElement, options) {
  constructor() {
    super();

    /**
     * The style variant of the component.
     * @attribute
     * @type {"default" | "primary" | "danger"}
     */
    this.variant = "default";
  }

  /**
   * Renders the html template.
   * @internal
   */
  render() {
    return html\`
      <div class="${tagName}">\${this.text}</div>
    \`;
  }
}
${className}.define();
`;
}

/**
 * Generates the TypeScript source for a primitive Elena component.
 *
 * @param {string} name - kebab-case component name (e.g. "button")
 * @returns {string}
 */
function primitiveTS(name) {
  const className = toPascal(name);
  const tagName = `elena-${name}`;

  return `// ░ [ELENA]: Primitive Component
import { Elena, html } from "@elenajs/core";

const options = {
  tagName: "${tagName}",
  props: ["variant"],
  events: ["click", "focus", "blur"],
};

/**
 * The description of the component goes here.
 *
 * @displayName ${className}
 * @status alpha
 *
 * @event click - Programmatically fire click on the component.
 * @event focus - Programmatically move focus to the component.
 * @event blur - Programmatically remove focus from the component.
 *
 * @cssprop [--${tagName}-text] - Overrides the default text color.
 * @cssprop [--${tagName}-bg] - Overrides the default background color.
 * @cssprop [--${tagName}-font] - Overrides the default font family.
 */
export default class ${className} extends Elena(HTMLElement, options) {
  /**
   * The style variant of the component.
   * @attribute
   */
  variant: "default" | "primary" | "danger" = "default";

  /**
   * Renders the html template.
   * @internal
   */
  render() {
    return html\`
      <div class="${tagName}">\${this.text}</div>
    \`;
  }
}
${className}.define();
`;
}

/**
 * Generates the CSS source for a primitive Elena component.
 *
 * @param {string} name - kebab-case component name (e.g. "button")
 * @returns {string}
 */
function primitiveCSS(name) {
  const tagName = `elena-${name}`;

  return `/* Scope makes sure styles don't leak out */
@scope (${tagName}) {

  /* Unset makes sure styles don't leak in */
  :scope, *, *::before, *::after {
    all: unset;
  }

  /* Targets the host element (${tagName}) */
  :scope {

    /* Recommended: Public CSS properties */
    --${tagName}-font: sans-serif;
    --${tagName}-text: white;
    --${tagName}-bg: blue;

    /* Recommended: Display mode for the host element */
    display: inline-block;
  }

  /**
   * Recommended: When building Primitive Components, we recommend to
   * target both the non-hydrated host element and the inner element
   * with the same baseline styles. This way the component will look
   * the same before & after client side hydration.
   */
  :scope:not([hydrated]),
  .${tagName} {
    font-family: var(--${tagName}-font);
    color: var(--${tagName}-text);
    background: var(--${tagName}-bg);
    display: inline-block;
  }

  /* Rest of your component styles */
  :scope[variant="primary"] {
    --${tagName}-bg: red;
  }
}
`;
}

/**
 * Generates the JavaScript source for a composite Elena component.
 *
 * @param {string} name - kebab-case component name (e.g. "stack")
 * @returns {string}
 */
function compositeJS(name) {
  const className = toPascal(name);
  const tagName = `elena-${name}`;

  return `import { Elena } from "@elenajs/core";

const options = {
  tagName: "${tagName}",
  props: ["direction"],
};

/**
 * The description of the component goes here.
 *
 * @displayName ${className}
 * @slot - The web component content
 * @status alpha
 * 
 * @cssprop [--${tagName}-text] - Overrides the default text color.
 * @cssprop [--${tagName}-bg] - Overrides the default background color.
 * @cssprop [--${tagName}-font] - Overrides the default font family.
 */
export default class ${className} extends Elena(HTMLElement, options) {
  constructor() {
    super();

    /**
     * The direction of the content.
     *
     * @attribute
     * @type {"column" | "row"}
     */
    this.direction = "column";
  }
}
${className}.define();
`;
}

/**
 * Generates the TypeScript source for a composite Elena component.
 *
 * @param {string} name - kebab-case component name (e.g. "stack")
 * @returns {string}
 */
function compositeTS(name) {
  const className = toPascal(name);
  const tagName = `elena-${name}`;

  return `import { Elena } from "@elenajs/core";

const options = {
  tagName: "${tagName}",
  props: ["direction"],
};

/**
 * The description of the component goes here.
 *
 * @displayName ${className}
 * @slot - The web component content
 * @status alpha
 * 
 * @cssprop [--${tagName}-text] - Overrides the default text color.
 * @cssprop [--${tagName}-bg] - Overrides the default background color.
 * @cssprop [--${tagName}-font] - Overrides the default font family.
 */
export default class ${className} extends Elena(HTMLElement, options) {
  /**
   * The direction of the content.
   *
   * @attribute
   */
  direction: "column" | "row" = "column";
}
${className}.define();
`;
}

/**
 * Generates the CSS source for a composite Elena component.
 *
 * @param {string} name - kebab-case component name (e.g. "stack")
 * @returns {string}
 */
function compositeCSS(name) {
  const tagName = `elena-${name}`;

  return `/* Scope makes sure styles don't leak out */
@scope (${tagName}) {

  /* Unset makes sure styles don't leak in */
  :scope, *, *::before, *::after {
    all: unset;
  }

  /* Targets the host element (${tagName}) */
  :scope {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-flow: column wrap;
    flex-direction: column;
    gap: 0.5rem;
  }

  /* Attributes provide customization */
  :scope[direction="row"] {
    flex-direction: row;
  }
}
`;
}

/**
 * Generates the component source code (JS or TS).
 *
 * @param {string} name - kebab-case component name
 * @param {"primitive" | "composite"} type - component type
 * @param {"javascript" | "typescript"} language - output language
 * @returns {string}
 */
export function generateSource(name, type, language) {
  if (type === "primitive") {
    return language === "typescript" ? primitiveTS(name) : primitiveJS(name);
  }
  return language === "typescript" ? compositeTS(name) : compositeJS(name);
}

/**
 * Generates the component CSS.
 *
 * @param {string} name - kebab-case component name
 * @param {"primitive" | "composite"} type - component type
 * @returns {string}
 */
export function generateCSS(name, type) {
  return type === "primitive" ? primitiveCSS(name) : compositeCSS(name);
}
