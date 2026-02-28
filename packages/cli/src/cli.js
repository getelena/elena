#!/usr/bin/env node

import { mkdir, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { color } from "./utils/color.js";
import { runPrompts } from "./prompts.js";
import { generateSource, generateCSS } from "./generate.js";

const BANNER = `
 ██████████ ████
░░███░░░░░█░░███
 ░███  █ ░  ░███   ██████  ████████    ██████
 ░██████    ░███  ███░░███░░███░░███  ░░░░░███
 ░███░░█    ░███ ░███████  ░███ ░███   ███████
 ░███ ░   █ ░███ ░███░░░   ░███ ░███  ███░░███
 ██████████ █████░░██████  ████ █████░░████████
░░░░░░░░░░ ░░░░░  ░░░░░░  ░░░░ ░░░░░  ░░░░░░░░

░█ [ELENA]: Generate a Progressive Web Component
`;

async function main() {
  console.log(color(BANNER));

  const nameArg = process.argv[2];
  const { name, type, language, outputDir } = await runPrompts(nameArg);

  const ext = language === "typescript" ? "ts" : "js";
  const componentDir = resolve(process.cwd(), outputDir, name);
  const sourceFile = join(componentDir, `${name}.${ext}`);
  const cssFile = join(componentDir, `${name}.css`);

  const sourceContent = generateSource(name, type, language);
  const cssContent = generateCSS(name, type);

  await mkdir(componentDir, { recursive: true });
  await writeFile(sourceFile, sourceContent);
  await writeFile(cssFile, cssContent);

  console.log("");
  console.log(color("✔ Component created:"));
  console.log(`  ${sourceFile}`);
  console.log(`  ${cssFile}`);
  console.log("");
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
