#!/usr/bin/env node

import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { comment, highlight, color } from "./utils/color.js";
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

async function main() {
  enterAltScreen();

  console.log(color(BANNER));
  console.log("Progressive Web Component CLI " + highlight(`v${version}`));
  console.log(comment("https://elenajs.com"));
  console.log("");

  const nameArg = process.argv[2];
  const { name, type, language, features, outputDir } = await runPrompts(nameArg);

  const ext = language === "typescript" ? "ts" : "js";
  const componentDir = resolve(process.cwd(), outputDir, name);
  const sourceFile = join(componentDir, `${name}.${ext}`);
  const cssFile = join(componentDir, `${name}.css`);

  const sourceContent = generateSource(name, type, language, features);
  const cssContent = generateCSS(name, type, features);

  await mkdir(componentDir, { recursive: true });
  await writeFile(sourceFile, sourceContent);
  await writeFile(cssFile, cssContent);

  exitAltScreen();

  console.log("");
  console.log(color("░█ [ELENA]: Component created succesfully:"));
  console.log(`   ${sourceFile}`);
  console.log(`   ${cssFile}`);
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
