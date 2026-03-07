import { defineConfig } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";

export default withMermaid(
  defineConfig({
    title: "Elena",
    ignoreDeadLinks: true,
    description: "Simple, tiny library for building Progressive Web Components.",
    cleanUrls: true,
    head: [["link", { rel: "icon", href: "https://elenajs.com/img/elena.png" }]],
    markdown: {
      toc: {
        level: [1, 2, 3, 4, 5],
      },
    },
    vite: {
      optimizeDeps: {
        include: ["mermaid"],
      },
    },
    themeConfig: {
      logo: "/logo.png",
      nav: [
        { text: "Docs", link: "/", activeMatch: "^(?!/api/)" },
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
            { text: "Quick Start", link: "/start/" },
            { text: "Live Demos", link: "/demos/" },
          ],
        },
        {
          text: "Components",
          collapsed: false,
          items: [
            { text: "Primitives", link: "/components/primitives" },
            { text: "Composites", link: "/components/composites" },
            { text: "Lifecycle", link: "/components/lifecycle" },
            { text: "Options", link: "/components/options" },
            { text: "Props", link: "/components/props" },
            { text: "Events", link: "/components/events" },
            { text: "Methods", link: "/components/methods" },
            { text: "Templates", link: "/components/templates" },
            { text: "Styles", link: "/components/styles" },
          ],
        },
        {
          text: "Digging Deeper",
          collapsed: false,
          items: [
            { text: "Creating Documentation", link: "/advanced/docs" },
            { text: "Loading Components", link: "/advanced/loading" },
            { text: "Component Libraries", link: "/advanced/libraries" },
            { text: "Server-Side Rendering", link: "/advanced/ssr" },
            { text: "Framework Integrations", link: "/advanced/frameworks" },
            { text: "Command Line Interface", link: "/advanced/cli" },
            { text: "Using TypeScript", link: "/advanced/typescript" },
            { text: "Scoping Styles", link: "/advanced/scoping" },
            { text: "Known Issues", link: "/advanced/gotchas" },
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
  })
);
