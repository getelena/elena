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
 * Elena Config
 * https://elenajs.com
 */

import pkg from "./package.json" with { type: "json" };

export default {
  input: "src",
  output: {
    dir: "dist",
    format: "esm",
    sourcemap: true,
  },
  bundle: "src/index.js",
  banner: `/**
 * ${pkg.name} v${pkg.version}
 * (c) 2025-present Ariel Salminen and Elena contributors
 * @license MIT
 */`,
};
