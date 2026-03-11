<div align="center">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://elenajs.com/img/elena-dark.png" alt="Elena" width="558" height="220">
  </source>
  <source media="(prefers-color-scheme: light)" srcset="https://elenajs.com/img/elena-light.png" alt="Elena" width="558" height="220">
  </source>
  <img src="https://elenajs.com/img/elena-light.png" alt="Elena" width="558" height="220">
</picture>

### Simple, tiny library for building Progressive Web Components.

<br/>

<a href="https://arielsalminen.com"><img src="https://img.shields.io/badge/creator-@arielle-F95B1F" alt="Creator @arielle"/></a>
<a href="https://www.npmjs.com/org/elenajs"><img src="https://img.shields.io/npm/v/@elenajs/core.svg" alt="Latest version on npm" /></a>
<a href="https://github.com/getelena/elena/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-yellow.svg" alt="Elena is released under the MIT license." /></a>
<a href="https://github.com/getelena/elena/actions/workflows/tests.yml"><img src="https://img.shields.io/badge/coverage-100%25-green" alt="Coverage 100%" /></a>
<a href="https://www.npmjs.com/package/@elenajs/core"><img src="https://img.shields.io/npm/dt/@elenajs/core.svg" alt="Total Downloads"></a>
<a href="https://github.com/getelena/elena/actions/workflows/tests.yml"><img src="https://github.com/getelena/elena/actions/workflows/tests.yml/badge.svg" alt="Tests status" /></a>

</div>

<br/>

<p align="center">Elena is a simple, tiny library (2kB) for building <a href="https://elenajs.com/">Progressive Web Components</a>. Unlike most web component libraries, Elena doesn’t force JavaScript for everything. You can load HTML and CSS first, then use JavaScript to progressively add interactivity.</p>

## Documentation

See the full documentation for Elena at [elenajs.com](https://elenajs.com).

```sh
npm install @elenajs/core
```

## Packages

Elena is a monorepo containing several packages published to npm under the `@elenajs` scope:

| Package | Description | Version | Stability |
| --- | --- | --- | --- |
| [`@elenajs/prettier-config`](https://github.com/getelena/elena/tree/main/packages/prettier-config) | Prettier config for Elena projects. | [![npm](https://img.shields.io/npm/v/@elenajs/prettier-config.svg)](https://www.npmjs.com/package/@elenajs/prettier-config) | [![stability-mature](https://img.shields.io/badge/stability-mature-008000.svg)](https://github.com/mkenney/software-guides/blob/master/STABILITY-BADGES.md#mature) |
| [`@elenajs/eslint-config`](https://github.com/getelena/elena/tree/main/packages/eslint-config) | ESLint config for Elena projects. | [![npm](https://img.shields.io/npm/v/@elenajs/eslint-config.svg)](https://www.npmjs.com/package/@elenajs/eslint-config) | [![stability-mature](https://img.shields.io/badge/stability-mature-008000.svg)](https://github.com/mkenney/software-guides/blob/master/STABILITY-BADGES.md#mature) |
| [`@elenajs/core`](https://github.com/getelena/elena/tree/main/packages/core) | The core Elena library. | [![npm](https://img.shields.io/npm/v/@elenajs/core.svg)](https://www.npmjs.com/package/@elenajs/core) | [![stability-release-candidate](https://img.shields.io/badge/stability-pre--release-48c9b0.svg)](https://github.com/mkenney/software-guides/blob/master/STABILITY-BADGES.md#release-candidate) |
| [`@elenajs/bundler`](https://github.com/getelena/elena/tree/main/packages/bundler) | Bundler for Elena component libraries. | [![npm](https://img.shields.io/npm/v/@elenajs/bundler.svg)](https://www.npmjs.com/package/@elenajs/bundler) | [![stability-beta](https://img.shields.io/badge/stability-beta-33bbff.svg)](https://github.com/mkenney/software-guides/blob/master/STABILITY-BADGES.md#beta) |
| [`@elenajs/plugin-cem-define`](https://github.com/getelena/elena/tree/main/packages/plugin-cem-define) | CEM Define plugin for Elena. | [![npm](https://img.shields.io/npm/v/@elenajs/plugin-cem-define.svg)](https://www.npmjs.com/package/@elenajs/plugin-cem-define) | [![stability-beta](https://img.shields.io/badge/stability-beta-33bbff.svg)](https://github.com/mkenney/software-guides/blob/master/STABILITY-BADGES.md#beta) |
| [`@elenajs/plugin-cem-tag`](https://github.com/getelena/elena/tree/main/packages/plugin-cem-tag) | CEM Tag plugin for Elena. | [![npm](https://img.shields.io/npm/v/@elenajs/plugin-cem-tag.svg)](https://www.npmjs.com/package/@elenajs/plugin-cem-tag) | [![stability-beta](https://img.shields.io/badge/stability-beta-33bbff.svg)](https://github.com/mkenney/software-guides/blob/master/STABILITY-BADGES.md#beta) |
| [`@elenajs/plugin-cem-typescript`](https://github.com/getelena/elena/tree/main/packages/plugin-cem-typescript) | CEM TypeScript plugin for Elena. | [![npm](https://img.shields.io/npm/v/@elenajs/plugin-cem-typescript.svg)](https://www.npmjs.com/package/@elenajs/plugin-cem-typescript) | [![stability-beta](https://img.shields.io/badge/stability-beta-33bbff.svg)](https://github.com/mkenney/software-guides/blob/master/STABILITY-BADGES.md#beta) |
| [`@elenajs/plugin-rollup-css`](https://github.com/getelena/elena/tree/main/packages/plugin-rollup-css) | Rollup CSS plugin for Elena. | [![npm](https://img.shields.io/npm/v/@elenajs/plugin-rollup-css.svg)](https://www.npmjs.com/package/@elenajs/plugin-rollup-css) | [![stability-beta](https://img.shields.io/badge/stability-beta-33bbff.svg)](https://github.com/mkenney/software-guides/blob/master/STABILITY-BADGES.md#beta) |
| [`@elenajs/cli`](https://github.com/getelena/elena/tree/main/packages/cli) | Elena CLI for creating components. | [![npm](https://img.shields.io/npm/v/@elenajs/cli.svg)](https://www.npmjs.com/package/@elenajs/cli) | [![stability-alpha](https://img.shields.io/badge/stability-alpha-f4d03f.svg)](https://github.com/mkenney/software-guides/blob/master/STABILITY-BADGES.md#alpha) |
| [`@elenajs/components`](https://github.com/getelena/elena/tree/main/packages/components) | Elena demo component library. | [![npm](https://img.shields.io/npm/v/@elenajs/components.svg)](https://www.npmjs.com/package/@elenajs/components) | [![stability-alpha](https://img.shields.io/badge/stability-alpha-f4d03f.svg)](https://github.com/mkenney/software-guides/blob/master/STABILITY-BADGES.md#alpha) |
| [`@elenajs/ssr`](https://github.com/getelena/elena/tree/main/packages/ssr) | Elena server-side rendering tools. | [![npm](https://img.shields.io/npm/v/@elenajs/ssr.svg)](https://www.npmjs.com/package/@elenajs/ssr) | [![stability-experimental](https://img.shields.io/badge/stability-experimental-orange.svg)](https://github.com/mkenney/software-guides/blob/master/STABILITY-BADGES.md#experimental) |
| [`@elenajs/mcp`](https://github.com/getelena/elena/tree/main/packages/mcp) | Elena MCP server. | [![npm](https://img.shields.io/npm/v/@elenajs/mcp.svg)](https://www.npmjs.com/package/@elenajs/mcp) | [![stability-experimental](https://img.shields.io/badge/stability-experimental-orange.svg)](https://github.com/mkenney/software-guides/blob/master/STABILITY-BADGES.md#experimental) |

<!-- https://github.com/mkenney/software-guides/blob/master/STABILITY-BADGES.md -->

## Development

For more details about pull requests, commit conventions and code style, please see [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT

## Copyright

Copyright © 2026 [Ariel Salminen](https://arielsalminen.com)
