# Contributing

## Git pull requests

If you have a specific bug fix or contribution in mind, you can generate a pull request in this repository. When naming your branch, please follow the below naming convention:

- `release/<version-number>`
- `feature/<feature-name>`
- `hotfix/<fix-name>`

## Commit message conventions

These are the commit message conventions Elena follows.

- Anyone should easily understand what a commit does without reading the change itself.
- Describe what the commit does, not what issue it relates to or fixes.
- Limit the first line of the commit message (message summary) to 72 characters or less.
- Use the present tense ("Add feature" not "Added feature") and imperative mood ("Move cursor to..." not "Moves cursor to...") when providing a description of what you did.
- If your Pull Request addresses an issue, reference it in the body of the commit message.
- Do not place a period `.` at the end.

### Example

```
[$category]: Short summary of what you did

Longer description here if necessary

Fixes #1234
```

Note: Add co-authors to your commit message for commits with multiple authors

```
Co-authored-by: Name Here <email@here>
```

In the above example, `$category` is one of the categories listed below.

### Categories

- `feat`: A new feature for the repository.
- `fix`: A bug fix for an existing functionality.
- `docs`: Documentation changes, including updating readmes.
- `refactor`: A code change that neither fixes a bug nor adds a feature.
- `test`: Adding missing tests or modifying existing ones.
- `chore`: All other changes, such as changes to the build process and libraries.
- `revert`: Reverts a previous commit.

Category names are always lowercase, for consistency.

## Code Style

- Prettier: single quotes off, trailing commas es5, semicolons required, `printWidth: 100`
- ESLint: lenient config, ignores `coverage` dirs
- All source is vanilla JS with JSDoc annotations (no TypeScript)
- ESM modules throughout (`"type": "module"`)

## Commands

All commands run from the monorepo root (`elena/`):

```bash
pnpm install                        # Install dependencies
pnpm build                          # Build all packages
pnpm test                           # Run all tests
pnpm lint                           # Lint with ESLint
pnpm format                         # Prettier on all files
```

Docs commands (from `docs/`):

```bash
pnpm start                          # VitePress dev server
pnpm build                          # VitePress build
pnpm preview                        # VitePress preview
```

Core package commands (from `packages/core/`):

```bash
pnpm start                          # Rollup watch
pnpm build                          # Rollup build
pnpm test                           # Vitest with coverage
pnpm test:visual                    # Playwright visual regression tests
pnpm test:visual:update             # Update visual test baselines
pnpm bench                          # Run performance benchmarks
npx vitest run test/props.test.js   # Run a single test file
```

Components package commands (from `packages/components/`):

```bash
pnpm start                          # web-dev-server with live reload
pnpm build                          # Build via the elena CLI
pnpm test                           # Vitest tests
```
