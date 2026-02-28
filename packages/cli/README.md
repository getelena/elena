<div align="center">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://elenajs.com/img/elena-dark.png" alt="Elena" width="201" height="230">
  </source>
  <source media="(prefers-color-scheme: light)" srcset="https://elenajs.com/img/elena.png" alt="Elena" width="201" height="230">
  </source>
  <img src="https://elenajs.com/img/elena.png" alt="Elena" width="201" height="230">
</picture>

### Elena CLI for scaffolding Progressive Web Components.

<br/>

<a href="https://arielsalminen.com"><img src="https://img.shields.io/badge/creator-@arielle-F95B1F" alt="Creator @arielle"/></a>
<a href="https://www.npmjs.com/package/@elenajs/cli"><img src="https://img.shields.io/npm/v/@elenajs/cli.svg" alt="Latest version on npm" /></a>
<a href="https://github.com/getelena/elena/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-yellow.svg" alt="Elena is released under the MIT license." /></a>
<a href="https://github.com/getelena/elena/actions/workflows/tests.yml"><img src="https://github.com/getelena/elena/actions/workflows/tests.yml/badge.svg" alt="Tests status" /></a>

</div>

<br/>

<p align="center"><strong>@elenajs/cli</strong> is an interactive command-line tool for scaffolding <a href="https://elenajs.com">Elena</a> components. It generates JavaScript or TypeScript source files and scoped CSS with all Elena Progressive Web Component patterns pre-configured: <code>Elena()</code> factory, <code>html</code> tagged templates, <code>@scope</code> CSS, JSDoc annotations, and <code>ClassName.define()</code>.</p>

<br/>

## Table of contents

- **[Install](#install)**
- **[Usage](#usage)**
  - **[Interactive mode](#interactive-mode)**
  - **[With a component name](#with-a-component-name)**
- **[Prompts](#prompts)**
  - **[Component options](#component-options)**
- **[Generated files](#generated-files)**
  - **[Primitive components](#primitive-components)**
  - **[Composite components](#composite-components)**

## Install

```bash
npm install --save-dev @elenajs/cli
```

## Usage

### Interactive mode

Run without arguments to be guided through all options:

```bash
npx elena-create
```

### With a component name

Pass a kebab-case name (must contain at least one hyphen) to skip the name prompt:

```bash
npx elena-create elena-button
npx elena-create elena-date-picker
```

## Prompts

The CLI walks you through the following steps:

| Prompt                | Description                                                                                                         | Default          |
| --------------------- | ------------------------------------------------------------------------------------------------------------------- | ---------------- |
| **Component name**    | Kebab-case name with at least one hyphen (e.g. `elena-button`, `elena-date-picker`). Skipped if passed as argument. | —                |
| **Component type**    | `Primitive` (owns its own render) or `Composite` (wraps children).                                                  | —                |
| **Component options** | Feature toggles for the generated code. See [Component options](#component-options) below.                          | None selected    |
| **Language**          | `JavaScript` or `TypeScript`.                                                                                       | —                |
| **Output directory**  | Where to generate the component folder.                                                                             | `src/components` |

### Component options

After choosing a component type, you can toggle features to include in the generated code:

| Option                    | Primitive | Composite | Description                                                             |
| ------------------------- | --------- | --------- | ----------------------------------------------------------------------- |
| **Props**                 | ✓         | ✓         | Adds example props with `@attribute` / `@type` JSDoc annotations.       |
| **Events**                | ✓         |           | Adds `events` option and `@event` JSDoc annotations.                    |
| **Methods**               | ✓         | ✓         | Adds an example method stub.                                            |
| **CSS Custom Properties** | ✓         | ✓         | Adds `@cssprop` JSDoc annotations and CSS custom property declarations. |
| **CSS Encapsulation**     | ✓         | ✓         | Adds the `all: unset` reset to prevent global styles from leaking in.   |
| **CSS SSR Pattern**       | ✓         |           | Adds `:scope:not([hydrated])` styles for pre-hydration rendering.       |

## Generated files

For a component named `elena-date-picker`, the CLI creates:

```
src/components/date-picker/
├── elena-date-picker.js (or .ts)
└── elena-date-picker.css
```

### Primitive components

Primitive components own and render their own HTML markup. The generated files include:

- `Elena()` factory with `tagName` and optional `props` / `events`
- A `render()` method returning an `html` tagged template
- JSDoc annotations for `@displayName` and `@status`, plus `@event` and `@cssprop` when selected
- Scoped CSS with `@scope`, optional encapsulation reset, CSS custom properties, and SSR pattern

### Composite components

Composite components wrap and enhance composed children. The generated files include:

- `Elena()` factory with `tagName` and optional `props`
- No `render()` method — the light DOM children are untouched
- JSDoc annotations for `@displayName`, `@slot`, and `@status`, plus `@cssprop` when selected
- Scoped CSS with `@scope`, optional encapsulation reset, and flexbox layout

## License

MIT

## Copyright

Copyright © 2026 [Ariel Salminen](https://arielsalminen.com)
