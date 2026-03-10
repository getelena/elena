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
 * Elena Bundler CLI
 * https://elenajs.com
 */

import { loadConfig } from "./common/load-config.js";
import { runRollupBuild } from "./rollup-build.js";
import { runCemAnalyze } from "./cem-analyze.js";
import { color } from "./common/color.js";

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

/** Loads the Elena config and runs the Rollup build + CEM analysis. */
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
