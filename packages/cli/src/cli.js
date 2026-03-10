#!/usr/bin/env node

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
 * Elena CLI
 * https://elenajs.com
 */

import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { comment, highlight, color } from "./common/color.js";
import { runPrompts } from "./prompts.js";
import { generateSource, generateCSS } from "./generate.js";

const require = createRequire(import.meta.url);
const { version } = require("../package.json");

const BANNER = `
 ██████████ ████
░░███░░░░░█░░███
 ░███  █ ░  ░███   ██████  ████████    ██████
 ░██████    ░███  ███░░███░░███░░███  ░░░░░███
 ░███░░█    ░███ ░███████  ░███ ░███   ███████
 ░███ ░   █ ░███ ░███░░░   ░███ ░███  ███░░███
 ██████████ █████░░██████  ████ █████░░████████
░░░░░░░░░░ ░░░░░  ░░░░░░  ░░░░ ░░░░░  ░░░░░░░░
`;

const enterAltScreen = () => process.stdout.write("\x1b[?1049h");
const exitAltScreen = () => process.stdout.write("\x1b[?1049l");

/** Runs the interactive CLI prompts and writes the generated component files. */
async function main() {
  enterAltScreen();

  console.log(color(BANNER));
  console.log("Progressive Web Component CLI " + highlight(`v${version}`));
  console.log(comment("https://elenajs.com"));
  console.log("");

  const nameArg = process.argv[2];
  const { name, language, features, outputDir } = await runPrompts(nameArg);

  const componentDir = resolve(process.cwd(), outputDir, name);
  await mkdir(componentDir, { recursive: true });

  const sourceContent = generateSource(name, language, features);
  const files = [];

  if (language === "html") {
    const htmlFile = join(componentDir, `${name}.html`);
    await writeFile(htmlFile, sourceContent);
    files.push(htmlFile);
  } else {
    const ext = language === "typescript" ? "ts" : "js";
    const sourceFile = join(componentDir, `${name}.${ext}`);
    const cssFile = join(componentDir, `${name}.css`);
    const cssContent = generateCSS(name, features);
    await writeFile(sourceFile, sourceContent);
    await writeFile(cssFile, cssContent);
    files.push(sourceFile, cssFile);
  }

  exitAltScreen();

  console.log("");
  console.log(color("░█ [ELENA]: Component created successfully:"));
  for (const file of files) {
    console.log(`   ${file}`);
  }
  console.log("");
}

main().catch(err => {
  exitAltScreen();
  if (err.name === "ExitPromptError") {
    process.exit(0);
  }
  console.error(err);
  process.exit(1);
});
