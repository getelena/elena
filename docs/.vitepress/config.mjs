import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Elena",
  description: "Simple, tiny library for building Progressive Web Components.",
  head: [["link", { rel: "icon", href: "https://elenajs.com/img/elena.png" }]],
  markdown: {
    toc: {
      level: [1, 2, 3, 4, 5],
    },
  },
  themeConfig: {
    logo: "/logo.png",
    nav: [
      { text: "Docs", link: "/" },
      { text: "API Reference", link: "/api/" },
      {
        text: "Packages",
        items: [
          {
            text: "@elenajs/core",
            link: "https://github.com/getelena/elena/tree/main/packages/core",
          },
          {
            text: "@elenajs/bundler",
            link: "https://github.com/getelena/elena/tree/main/packages/bundler",
          },
          {
            text: "@elenajs/cli",
            link: "https://github.com/getelena/elena/tree/main/packages/cli",
          },
          {
            text: "@elenajs/ssr",
            link: "https://github.com/getelena/elena/tree/main/packages/ssr",
          },
          {
            text: "@elenajs/components",
            link: "https://github.com/getelena/elena/tree/main/packages/components",
          },
          {
            text: "@elenajs/mcp",
            link: "https://github.com/getelena/mcp",
          },
          {
            text: "@elenajs/plugin-cem-define",
            link: "https://github.com/getelena/elena/tree/main/packages/plugin-cem-define",
          },
          {
            text: "@elenajs/plugin-cem-tag",
            link: "https://github.com/getelena/elena/tree/main/packages/plugin-cem-tag",
          },
          {
            text: "@elenajs/plugin-cem-typescript",
            link: "https://github.com/getelena/elena/tree/main/packages/plugin-cem-typescript",
          },
          {
            text: "@elenajs/plugin-rollup-css",
            link: "https://github.com/getelena/elena/tree/main/packages/plugin-rollup-css",
          },
        ],
      },
      {
        text: "About",
        items: [
          {
            text: "Changelog",
            link: "https://github.com/getelena/elena/tree/main/packages/core",
          },
          {
            text: "Contributing",
            link: "https://github.com/getelena/elena/tree/main/packages/bundler",
          },
          {
            text: "Code of Conduct",
            link: "https://github.com/getelena/elena/tree/main/packages/bundler",
          },
          {
            text: "License (MIT)",
            link: "https://github.com/getelena/elena/tree/main/packages/bundler",
          },
        ],
      },
      { text: "GitHub", link: "https://github.com/getelena/elena" },
    ],

    sidebar: [
      {
        text: "Getting Started",
        collapsed: false,
        items: [
          { text: "Introduction", link: "/" },
          { text: "Quick Start", link: "/guide/quick-start" },
          { text: "Live Demos", link: "/reference/examples" },
        ],
      },
      {
        text: "Components",
        collapsed: false,
        items: [
          { text: "Primitives", link: "/guide/primitive-component" },
          { text: "Composites", link: "/guide/primitive-component" },
          { text: "Options", link: "/guide/options" },
          { text: "Props", link: "/guide/props" },
          { text: "Events", link: "/guide/events" },
          { text: "Methods", link: "/guide/methods" },
          { text: "Templates", link: "/guide/templates" },
          { text: "Styles", link: "/advanced/css-styles" },
        ],
      },
      {
        text: "Digging Deeper",
        collapsed: false,
        items: [
          { text: "Loading Components", link: "/reference/load-event" },
          { text: "Component Libraries", link: "/advanced/typescript" },
          { text: "Server-Side Rendering", link: "/advanced/ssr" },
          { text: "Framework Integrations", link: "/reference/examples" },
          { text: "Command Line Interface", link: "/reference/packages" },
          { text: "Using TypeScript", link: "/advanced/typescript" },
          { text: "Scoping Styles", link: "/advanced/typescript" },
          { text: "Known Issues", link: "/reference/known-issues" },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/getelena/elena" }],

    search: {
      provider: "local",
      options: {
        miniSearch: {
          searchOptions: {
            fuzzy: 0.2,
            prefix: true,
            boost: { title: 4, text: 2, titles: 1 },
          },
        },
      },
    },

    editLink: {
      pattern: "https://github.com/getelena/elena/edit/main/docs/:path",
      text: "Edit this page on GitHub",
    },

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2026 Ariel Salminen",
    },
  },
});
