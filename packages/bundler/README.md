<div align="center">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://elenajs.com/img/elena-dark.png" alt="Elena" width="558" height="220">
  </source>
  <source media="(prefers-color-scheme: light)" srcset="https://elenajs.com/img/elena-light.png" alt="Elena" width="558" height="220">
  </source>
  <img src="https://elenajs.com/img/elena-light.png" alt="Elena" width="558" height="220">
</picture>

### Bundler for Progressive Web Component libraries built with Elena.

<br/>

<a href="https://arielsalminen.com"><img src="https://img.shields.io/badge/creator-@arielle-F95B1F" alt="Creator @arielle"/></a>
<a href="https://www.npmjs.com/package/@elenajs/bundler"><img src="https://img.shields.io/npm/v/@elenajs/bundler.svg" alt="Latest version on npm" /></a>
<a href="https://github.com/getelena/elena/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-yellow.svg" alt="Elena is released under the MIT license." /></a>
<a href="https://github.com/getelena/elena/actions/workflows/tests.yml"><img src="https://github.com/getelena/elena/actions/workflows/tests.yml/badge.svg" alt="Tests status" /></a>

</div>

<br/>

<p align="center"><strong>@elenajs/bundler</strong> is the build tool for <a href="https://elenajs.com">Elena</a> Progressive Web Component libraries. It bundles JavaScript and TypeScript source files, minifies CSS, generates a <a href="https://custom-elements-manifest.open-wc.org/">Custom Elements Manifest</a>, and produces TypeScript declarations for Elena components.</p>

<br/>

## Table of contents

- **[Install](#install)**
- **[CLI usage](#cli-usage)**
- **[Configuration](#configuration)**
  - **[Options](#options)**
- **[Build output](#build-output)**
- **[Programmatic API](#programmatic-api)**

## Install

```bash
npm install --save-dev @elenajs/bundler
```

## CLI usage

The bundler provides an `elena` CLI binary with a single `build` command:

```bash
npx elena build
```

If no command is provided, `build` is assumed:

```bash
npx elena
```

## Configuration

Create an `elena.config.mjs` (or `elena.config.js`) at the root of your package:

```js
/**
 * ░ [ELENA]: Bundler configuration
 *
 * @type {import("@elenajs/bundler").ElenaConfig}
 */
export default {
  // Source directory scanned for .js/.ts entry files and .css files.
  input: "src",

  // Rollup output options.
  output: {
    dir: "dist",
    format: "esm",
    sourcemap: true,
  },

  // Entry for the single-file bundle. Set to false to disable.
  bundle: "src/index.js",

  // Additional Rollup plugins appended after Elena’s built-in set.
  // plugins: [],

  // Custom Elements Manifest options.
  // analyze: {
  //   plugins: [],
  // },

  // Browserslist targets for transpilation. Enables syntax transforms
  // (e.g. class fields, optional chaining) to widen browser support.
  // target: ["chrome 71", "firefox 69", "safari 12.1"],
};
```

### Options

| Option             | Type              | Default          | Description                                                                                                              |
| ------------------ | ----------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `input`            | `string`          | `"src"`          | Source directory to scan for `.js`, `.ts`, and `.css` files.                                                             |
| `output.dir`       | `string`          | `"dist"`         | Output directory for compiled files.                                                                                     |
| `output.format`    | `string`          | `"esm"`          | Rollup output format.                                                                                                    |
| `output.sourcemap` | `boolean`         | `true`           | Whether to emit sourcemaps.                                                                                              |
| `bundle`           | `string \| false` | `"src/index.js"` | Entry point for the single-file bundle. Auto-detects `src/index.ts` if no `.js` entry exists. Set to `false` to disable. |
| `plugins`          | `Plugin[]`        | `[]`             | Additional Rollup plugins appended after the built-in set.                                                               |
| `analyze.plugins`  | `Plugin[]`        | `[]`             | Additional CEM analyzer plugins.                                                                                         |
| `target`           | `string \| string[] \| false` | `false` | Browserslist target(s) for transpilation. When set, enables syntax transforms (e.g. class fields, optional chaining) via `@babel/preset-env` to widen browser support. Example: `["chrome 71", "firefox 69", "safari 12.1"]`. |

## Build output

Running `elena build` produces:

| File                        | Description                                                                                          |
| --------------------------- | ---------------------------------------------------------------------------------------------------- |
| `dist/*.js`                 | Individual ES modules for each source file.                                                          |
| `dist/*.css`                | Minified individual CSS files.                                                                       |
| `dist/bundle.js`            | Single-file JavaScript bundle _(optional)_.                                                          |
| `dist/bundle.css`           | Concatenated and minified CSS bundle.                                                                |
| `dist/custom-elements.json` | [Custom Elements Manifest](https://custom-elements-manifest.open-wc.org/) describing all components. |
| `dist/custom-elements.d.ts` | JSX integration types mapping tag names to prop types.                                               |
| `dist/*.d.ts`               | Per-component TypeScript declarations with typed props and events.                                   |

## TypeScript support

The bundler supports both JavaScript and TypeScript source files. When `.ts` files are detected in the source directory, the bundler automatically transpiles them to JavaScript using `@rollup/plugin-typescript`. The output is identical to what you get from JavaScript sources.

To use TypeScript, write your components with inline type annotations instead of JSDoc:

```ts
import { Elena, html } from "@elenajs/core";

export default class Button extends Elena(HTMLElement) {
  static tagName = "elena-button";
  static props = ["variant"];

  /**
   * The style variant of the component.
   * @attribute
   */
  variant: "default" | "primary" | "danger" = "default";

  render() {
    return html`<button>${this.text}</button>`;
  }
}
Button.define();
```

A `tsconfig.json` is required in the project root. A minimal configuration:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

> **Note:** The bundler handles TypeScript declarations separately via the CEM analyzer, you do not need `declaration: true` in your `tsconfig.json`.

## Programmatic API

The bundler exports its internals so you can integrate it into your own build scripts:

```js
import {
  createRollupConfig,
  runRollupBuild,
  createCemConfig,
  runCemAnalyze,
} from "@elenajs/bundler";
```

Sub-path imports are also available:

```js
import { createRollupConfig, runRollupBuild } from "@elenajs/bundler/rollup";
import { createCemConfig, runCemAnalyze } from "@elenajs/bundler/cem";
```

### `createRollupConfig(options?)`

Returns a Rollup configuration array. Useful if you want to wrap or extend the config in a custom `rollup.config.js`.

### `runRollupBuild(config)`

Runs both build phases (individual modules + optional single-file bundle) programmatically.

### `createCemConfig(options?)`

Returns the Custom Elements Manifest analyzer configuration object.

### `runCemAnalyze(config, cwd?)`

Runs the CEM analysis and writes `custom-elements.json`, `custom-elements.d.ts`, and per-component `.d.ts` files.

## License

MIT

## Copyright

Copyright © 2026 [Ariel Salminen](https://arielsalminen.com)
