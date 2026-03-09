<div align="center">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://elenajs.com/img/elena-dark.png" alt="Elena" width="201" height="230">
  </source>
  <source media="(prefers-color-scheme: light)" srcset="https://elenajs.com/img/elena.png" alt="Elena" width="201" height="230">
  </source>
  <img src="https://elenajs.com/img/elena.png" alt="Elena" width="201" height="230">
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

<p align="center"><a href="https://elenajs.com">Elena</a> is a simple, tiny library (2kB) for building <a href="https://elenajs.com/components/terminology">Progressive Web Components</a>. Most web component libraries today require JavaScript to render anything at all. With Elena, you can render your component’s base HTML and CSS immediately. JavaScript picks up from there to add interactivity.</p>

## Elena features

- 🔋 **Extremely lightweight:** 2kB minified & compressed, simple and tiny by design.
- 📈 **Progressively enhanced:** Renders HTML & CSS first, then hydrates with JavaScript.
- 🫶 **Accessible by default:** Semantic HTML foundation with no Shadow DOM barriers.
- 🌍 **Standards based:** Built entirely on native custom elements & web standards.
- ⚡ **Reactive updates:** Prop and state changes trigger efficient, batched re-renders.
- 🎨 **Scoped styles:** Simple & clean CSS encapsulation without complex workarounds.
- 🖥️ **SSR friendly:** Works out of the box, with optional server-side utilities if needed.
- 🧩 **Zero dependencies:** No runtime dependencies, runs entirely on the web platform.
- 🔓 **Zero lock-in:** Works with every major framework, or no framework at all.

## Documentation

See the full documentation for Elena at [elenajs.com](https://elenajs.com).

```sh
npm install @elenajs/core
```

## Packages

Elena is a monorepo containing several packages published to npm under the `@elenajs` scope:

- **[`@elenajs/prettier-config`](https://github.com/getelena/elena/tree/main/packages/prettier-config)** [![stability-mature](https://img.shields.io/badge/stability-mature-008000.svg)](https://github.com/mkenney/software-guides/blob/master/STABILITY-BADGES.md#mature)
- **[`@elenajs/eslint-config`](https://github.com/getelena/elena/tree/main/packages/eslint-config)** [![stability-mature](https://img.shields.io/badge/stability-mature-008000.svg)](https://github.com/mkenney/software-guides/blob/master/STABILITY-BADGES.md#mature)
- **[`@elenajs/core`](https://github.com/getelena/elena/tree/main/packages/core)** [![stability-release-candidate](https://img.shields.io/badge/stability-pre--release-48c9b0.svg)](https://github.com/mkenney/software-guides/blob/master/STABILITY-BADGES.md#release-candidate)
- **[`@elenajs/bundler`](https://github.com/getelena/elena/tree/main/packages/bundler)** [![stability-beta](https://img.shields.io/badge/stability-beta-33bbff.svg)](https://github.com/mkenney/software-guides/blob/master/STABILITY-BADGES.md#beta)
- **[`@elenajs/plugin-cem-define`](https://github.com/getelena/elena/tree/main/packages/plugin-cem-define)** [![stability-beta](https://img.shields.io/badge/stability-beta-33bbff.svg)](https://github.com/mkenney/software-guides/blob/master/STABILITY-BADGES.md#beta)
- **[`@elenajs/plugin-cem-tag`](https://github.com/getelena/elena/tree/main/packages/plugin-cem-tag)** [![stability-beta](https://img.shields.io/badge/stability-beta-33bbff.svg)](https://github.com/mkenney/software-guides/blob/master/STABILITY-BADGES.md#beta)
- **[`@elenajs/plugin-cem-typescript`](https://github.com/getelena/elena/tree/main/packages/plugin-cem-typescript)** [![stability-beta](https://img.shields.io/badge/stability-beta-33bbff.svg)](https://github.com/mkenney/software-guides/blob/master/STABILITY-BADGES.md#beta)
- **[`@elenajs/plugin-rollup-css`](https://github.com/getelena/elena/tree/main/packages/plugin-rollup-css)** [![stability-beta](https://img.shields.io/badge/stability-beta-33bbff.svg)](https://github.com/mkenney/software-guides/blob/master/STABILITY-BADGES.md#beta)
- **[`@elenajs/cli`](https://github.com/getelena/elena/tree/main/packages/cli)** [![stability-alpha](https://img.shields.io/badge/stability-alpha-f4d03f.svg)](https://github.com/mkenney/software-guides/blob/master/STABILITY-BADGES.md#alpha)
- **[`@elenajs/components`](https://github.com/getelena/elena/tree/main/packages/components)** [![stability-alpha](https://img.shields.io/badge/stability-alpha-f4d03f.svg)](https://github.com/mkenney/software-guides/blob/master/STABILITY-BADGES.md#alpha)
- **[`@elenajs/ssr`](https://github.com/getelena/elena/tree/main/packages/ssr)** [![stability-experimental](https://img.shields.io/badge/stability-experimental-orange.svg)](https://github.com/mkenney/software-guides/blob/master/STABILITY-BADGES.md#experimental)
- **[`@elenajs/mcp`](https://github.com/getelena/elena/tree/main/packages/mcp)** [![stability-experimental](https://img.shields.io/badge/stability-experimental-orange.svg)](https://github.com/mkenney/software-guides/blob/master/STABILITY-BADGES.md#experimental)

<!-- https://github.com/mkenney/software-guides/blob/master/STABILITY-BADGES.md -->

## Development

For more details about pull requests, commit conventions and code style, please see [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT

## Copyright

Copyright © 2026 [Ariel Salminen](https://arielsalminen.com)
