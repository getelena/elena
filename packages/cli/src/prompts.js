import { input, select, checkbox } from "@inquirer/prompts";
import { comment, highlight, color } from "./utils/color.js";

/**
 * Validates a kebab-case component name.
 *
 * @param {string} value
 * @returns {string | true}
 */
function validateName(value) {
  if (!value) {
    return "Component tag name is required.";
  }
  if (!value.includes("-")) {
    return "Requires at least one hyphen to be valid.";
  }
  if (!/^[a-z][a-z0-9]*(-[a-z0-9]+)+$/.test(value)) {
    return "Use lowercase letters, numbers, and hyphens (e.g. elena-button).";
  }
  return true;
}

/**
 * Runs the interactive prompts to gather component options.
 *
 * @param {string | undefined} nameArg - Optional name from CLI argument
 * @returns {Promise<{ name: string, type: "primitive" | "composite", language: "javascript" | "typescript", outputDir: string }>}
 */
export async function runPrompts(nameArg) {
  const theme = {
    prefix: {
      idle: color("░█"),
      done: color("░█"),
    },
    icon: {
      cursor: comment("❯"),
    },
    style: {
      message: text => color(text),
      highlight: text => highlight(text),
      answer: text => highlight(text),
      description: text => color(text),
      keysHelpTip: keys => keys.map(([key, action]) => `${comment(key)} ${action}`).join(" · "),
    },
  };

  const name = nameArg
    ? nameArg
    : await input({
        message: "Component tag name (kebab-case):",
        validate: validateName,
        theme,
      });

  if (nameArg) {
    const validation = validateName(nameArg);
    if (validation !== true) {
      console.error(validation);
      process.exit(1);
    }
  }

  const type = await select({
    message: "Component type:",
    choices: [
      {
        name: "Primitive",
        value: "primitive",
        description: "Owns and renders its own HTML markup",
      },
      {
        name: "Composite",
        value: "composite",
        description: "Wraps and enhances composed HTML markup",
      },
    ],
    theme,
  });

  const featureChoices =
    type === "primitive"
      ? [
          { name: "JS Props", value: "props" },
          { name: "JS Events", value: "events" },
          { name: "JS Methods", value: "methods" },
          { name: "CSS Custom Properties", value: "cssprops" },
          { name: "CSS Encapsulation", value: "cssencap" },
          { name: "CSS SSR Pattern", value: "ssr" },
          { name: "Code Comments", value: "comments" },
        ]
      : [
          { name: "JS Props", value: "props" },
          { name: "JS Methods", value: "methods" },
          { name: "CSS Custom Properties", value: "cssprops" },
          { name: "CSS Encapsulation", value: "cssencap" },
          { name: "Code Comments", value: "comments" },
        ];

  const features = await checkbox({
    message: "Component features:",
    choices: featureChoices,
    theme,
  });

  const language = await select({
    message: "Language:",
    choices: [
      { name: "JavaScript", value: "javascript" },
      { name: "TypeScript", value: "typescript" },
      { name: "HTML", value: "html" },
    ],
    theme,
  });

  const outputDir = await input({
    message: "Output directory:",
    default: "src/components",
    theme,
  });

  return { name, type, language, features, outputDir };
}
