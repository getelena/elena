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
import { runRollupBuild, watchRollupBuild } from "./rollup-build.js";
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

const args = process.argv.slice(2);
const command = args.find(a => !a.startsWith("--")) ?? "build";

const configIdx = args.indexOf("--config");
const configPath = configIdx !== -1 ? args[configIdx + 1] : undefined;

/** Loads the Elena config and runs the build or watch. */
async function main() {
  if (command !== "build" && command !== "watch") {
    console.error(
      `░█ [ELENA]: Unknown command: ${command}. Usage: elena [build|watch] [--config <path>]`
    );
    process.exit(1);
  }

  console.log(color(BANNER));

  const config = await loadConfig(process.cwd(), configPath);

  if (command === "watch") {
    const onRebuild =
      config.analyze !== false
        ? async cfg => {
            try {
              await runCemAnalyze(cfg);
            } catch (err) {
              console.error(err);
            }
          }
        : undefined;

    const watcher = watchRollupBuild(config, { onRebuild });

    process.on("SIGINT", () => {
      watcher.close();
      process.exit(0);
    });
    process.on("SIGTERM", () => {
      watcher.close();
      process.exit(0);
    });
    return;
  }

  await runRollupBuild(config);
  if (config.analyze !== false) {
    await runCemAnalyze(config);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
