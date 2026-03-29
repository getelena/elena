import { color } from "./color.js";

const KNOWN_KEYS = new Set([
  "input",
  "output",
  "bundle",
  "plugins",
  "analyze",
  "target",
  "terser",
  "banner",
  "registration",
]);

/**
 * Validates a raw user config and throws on invalid values.
 * Logs warnings for unknown keys.
 *
 * @param {Record<string, unknown>} config
 */
export function validateConfig(config) {
  for (const key of Object.keys(config)) {
    if (!KNOWN_KEYS.has(key)) {
      console.warn(color(`░█ [ELENA]: Unknown config option "${key}".`));
    }
  }

  if (config.input !== undefined && typeof config.input !== "string") {
    throw new Error(
      `░█ [ELENA]: Invalid config: "input" must be a string, got ${typeof config.input}.`
    );
  }

  if (config.output !== undefined) {
    if (typeof config.output !== "object" || config.output === null) {
      throw new Error(`░█ [ELENA]: Invalid config: "output" must be an object.`);
    }
    if (config.output.dir !== undefined && typeof config.output.dir !== "string") {
      throw new Error(`░█ [ELENA]: Invalid config: "output.dir" must be a string.`);
    }
    if (config.output.format !== undefined && typeof config.output.format !== "string") {
      throw new Error(`░█ [ELENA]: Invalid config: "output.format" must be a string.`);
    }
    if (config.output.sourcemap !== undefined && typeof config.output.sourcemap !== "boolean") {
      throw new Error(`░█ [ELENA]: Invalid config: "output.sourcemap" must be a boolean.`);
    }
  }

  if (config.bundle !== undefined && typeof config.bundle !== "string" && config.bundle !== false) {
    throw new Error(`░█ [ELENA]: Invalid config: "bundle" must be a string or false.`);
  }

  if (config.plugins !== undefined && !Array.isArray(config.plugins)) {
    throw new Error(`░█ [ELENA]: Invalid config: "plugins" must be an array.`);
  }

  if (config.analyze !== undefined && config.analyze !== false) {
    if (typeof config.analyze !== "object" || config.analyze === null) {
      throw new Error(`░█ [ELENA]: Invalid config: "analyze" must be an object or false.`);
    }
    if (config.analyze.plugins !== undefined && !Array.isArray(config.analyze.plugins)) {
      throw new Error(`░█ [ELENA]: Invalid config: "analyze.plugins" must be an array.`);
    }
  }

  if (config.target !== undefined && config.target !== false) {
    if (typeof config.target !== "string" && !Array.isArray(config.target)) {
      throw new Error(
        `░█ [ELENA]: Invalid config: "target" must be a string, array of strings, or false.`
      );
    }
  }

  if (
    config.terser !== undefined &&
    (typeof config.terser !== "object" || config.terser === null)
  ) {
    throw new Error(`░█ [ELENA]: Invalid config: "terser" must be an object.`);
  }

  if (config.banner !== undefined && typeof config.banner !== "string" && config.banner !== false) {
    throw new Error(`░█ [ELENA]: Invalid config: "banner" must be a string or false.`);
  }

  if (
    config.registration !== undefined &&
    config.registration !== "auto" &&
    config.registration !== "scoped"
  ) {
    throw new Error(`░█ [ELENA]: Invalid config: "registration" must be "auto" or "scoped".`);
  }
}
