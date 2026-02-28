#!/usr/bin/env node

import { loadConfig } from "./utils/load-config.js";
import { runRollupBuild } from "./rollup-build.js";
import { runCemAnalyze } from "./cem-analyze.js";
import { color } from "./utils/color.js";

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

const [, , command = "build"] = process.argv;

async function main() {
  if (command !== "build") {
    console.error(`Unknown command: ${command}. Usage: elena [build]`);
    process.exit(1);
  }

  console.log(color(BANNER));

  const config = await loadConfig(process.cwd());

  await runRollupBuild(config);
  await runCemAnalyze(config);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
