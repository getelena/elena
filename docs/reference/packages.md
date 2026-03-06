# Packages

Elena is a monorepo containing several packages published to npm under the `@elenajs` scope:

| Package | Stability |
|---------|-----------|
| [`@elenajs/core`](https://github.com/getelena/elena/tree/main/packages/core) | Pre-release |
| [`@elenajs/cli`](https://github.com/getelena/elena/tree/main/packages/cli) | Pre-release |
| [`@elenajs/bundler`](https://github.com/getelena/elena/tree/main/packages/bundler) | Beta |
| [`@elenajs/plugin-cem-define`](https://github.com/getelena/elena/tree/main/packages/plugin-cem-define) | Beta |
| [`@elenajs/plugin-cem-tag`](https://github.com/getelena/elena/tree/main/packages/plugin-cem-tag) | Beta |
| [`@elenajs/plugin-cem-typescript`](https://github.com/getelena/elena/tree/main/packages/plugin-cem-typescript) | Beta |
| [`@elenajs/plugin-rollup-css`](https://github.com/getelena/elena/tree/main/packages/plugin-rollup-css) | Beta |
| [`@elenajs/components`](https://github.com/getelena/elena/tree/main/packages/components) | Alpha |
| [`@elenajs/ssr`](https://github.com/getelena/elena/tree/main/packages/ssr) | Experimental |

## Development

### Commands

All commands run from the monorepo root (`elena/`):

```bash
pnpm install              # Install dependencies
pnpm build                # Build all packages
pnpm test                 # Run all tests
pnpm lint                 # Lint with ESLint
```

Core package commands (from `packages/core/`):

```bash
pnpm start                # Rollup watch
pnpm build                # Rollup build
pnpm test                 # Vitest with coverage
pnpm test:visual          # Playwright visual regression tests
pnpm test:visual:update   # Update visual test baselines
pnpm bench                # Run performance benchmarks
npx vitest run test/props.test.js   # Run a single test file
```

Elements dev server (from `packages/components/`):

```bash
pnpm start                 # web-dev-server with live reload
```

For more details about pull requests, commit conventions and code style, please see [CONTRIBUTING.md](https://github.com/getelena/elena/blob/main/CONTRIBUTING.md).
