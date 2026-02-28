import { input, select } from "@inquirer/prompts";

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
  const name = nameArg
    ? nameArg
    : await input({
        message: "Component name (kebab-case, e.g. date-picker):",
        validate: validateName,
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
  });

  const language = await select({
    message: "Language:",
    choices: [
      { name: "JavaScript", value: "javascript" },
      { name: "TypeScript", value: "typescript" },
    ],
  });

  const outputDir = await input({
    message: "Output directory:",
    default: "src/components",
  });

  return { name, type, language, outputDir };
}
