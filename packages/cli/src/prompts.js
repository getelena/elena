import { input, select } from "@inquirer/prompts";
import { highlight, color } from "./utils/color.js";

/**
 * Validates a kebab-case component name.
 *
 * @param {string} value
 * @returns {string | true}
 */
function validateName(value) {
  if (!value) {
    return "Component name is required.";
  }
  if (!/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(value)) {
    return "Use lowercase letters, numbers, and hyphens (e.g. date-picker).";
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
      idle: color("░█ [ELENA]:"),
      done: color("░█ [ELENA]:"),
    },
    style: {
      message: text => color(text),
      highlight: text => highlight(text),
      answer: text => highlight(text),
      description: text => color(text),
      keysHelpTip: keys => keys.map(([key, action]) => `${highlight(key)} ${action}`).join(" · "),
    },
  };

  const name = nameArg
    ? nameArg
    : await input({
        message: "Component name (kebab-case, e.g. date-picker):",
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
        description: "Wraps and enhances composed children",
      },
    ],
    theme,
  });

  const language = await select({
    message: "Language:",
    choices: [
      { name: "JavaScript", value: "javascript" },
      { name: "TypeScript", value: "typescript" },
    ],
    theme,
  });

  const outputDir = await input({
    message: "Output directory:",
    default: "src/components",
    theme,
  });

  return { name, type, language, outputDir };
}
