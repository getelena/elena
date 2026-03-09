import { defineConfig } from "vitepress";
import { copyFile, mkdir } from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

function copyComponentAssets() {
  const src = path.resolve(__dirname, "../../packages/components/dist");
  const dest = path.resolve(__dirname, "../public/components");

  return {
    name: "copy-component-assets",
    async buildStart() {
      try {
        await mkdir(dest, { recursive: true });
        await copyFile(path.join(src, "bundle.js"), path.join(dest, "bundle.js"));
        await copyFile(path.join(src, "bundle.css"), path.join(dest, "bundle.css"));
      } catch (e) {
        console.warn("░█ [ELENA]: Could not copy component assets:", e.message);
      }
    },
  };
}

export default defineConfig({
  title: "Elena",
  base: "/elena/",
  ignoreDeadLinks: false,
  sitemap: {
    hostname: "https://getelena.github.io/",
  },
  description: "Simple, tiny library for building Progressive Web Components.",
  cleanUrls: true,
  head: [
    ["meta", { property: "og:site_name", content: "Elena | Progressive Web Components" }],
    ["meta", { property: "og:title", content: "Elena | Progressive Web Components" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:url", content: "https://getelena.github.io/elena/" }],
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["meta", { property: "og:image", content: "https://getelena.github.io/elena/social.png" }],
    ["meta", { name: "twitter:image", content: "https://getelena.github.io/elena/social.png" }],
    ["meta", { property: "og:image:alt", content: "Page image for Elenajs.com" }],
    ["meta", { name: "twitter:image:alt", content: "Page image for Elenajs.com" }],
    [
      "meta",
      {
        name: "description",
        content: "Elena is a simple, tiny library for building Progressive Web Components.",
      },
    ],
    [
      "meta",
      {
        name: "twitter:description",
        content: "Elena is a simple, tiny library for building Progressive Web Components.",
      },
    ],
    [
      "meta",
      {
        property: "og:description",
        content: "Elena is a simple, tiny library for building Progressive Web Components.",
      },
    ],
    ["meta", { name: "fediverse:creator", content: "@ariel@front-end.social" }],

    ["link", { rel: "icon", href: "/elena/favicon.ico", sizes: "48x48" }],
    ["link", { rel: "icon", href: "/elena/favicon.svg", sizes: "any", type: "image/svg+xml" }],
    ["link", { rel: "apple-touch-icon", href: "/elena/apple-touch-icon.png" }],
    ["link", { rel: "manifest", href: "/elena/manifest.json" }],
  ],
  markdown: {
    toc: {
      level: [1, 2],
    },
  },
  vite: {
    plugins: [copyComponentAssets()],
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: tag => tag.startsWith("elena-"),
      },
    },
  },
  themeConfig: {
    logo: "/logo.png",
    nav: [
      { text: "Docs", link: "/", activeMatch: "^(?!/api/)" },
      { text: "API Reference", link: "/api/" },
      {
        text: "Tools",
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
            link: "https://github.com/getelena/elena/tree/main/packages/mcp",
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
            link: "https://github.com/getelena/elena/blob/main/CHANGELOG.md",
          },
          {
            text: "Contributing",
            link: "https://github.com/getelena/elena/blob/main/CONTRIBUTING.md",
          },
          {
            text: "Code of Conduct",
            link: "https://github.com/getelena/elena/blob/main/CODE_OF_CONDUCT.md",
          },
          {
            text: "License (MIT)",
            link: "https://github.com/getelena/elena/blob/main/LICENSE",
          },
        ],
      },
      { text: "GitHub", link: "https://github.com/getelena/elena" },
    ],

    sidebar: [
      {
        text: "Getting started",
        collapsed: false,
        items: [
          { text: "Introduction", link: "/" },
          { text: "Quick start", link: "/start/" },
          { text: "Live examples", link: "/examples/" },
        ],
      },
      {
        text: "Components",
        collapsed: false,
        items: [
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
        text: "Digging deeper",
        collapsed: false,
        items: [
          { text: "Creating documentation", link: "/advanced/docs" },
          { text: "Loading components", link: "/advanced/loading" },
          { text: "Component libraries", link: "/advanced/libraries" },
          { text: "Server-side rendering", link: "/advanced/ssr" },
          { text: "Framework integrations", link: "/advanced/frameworks" },
          { text: "Command line interface", link: "/advanced/cli" },
          { text: "Using TypeScript", link: "/advanced/typescript" },
          { text: "Scoping styles", link: "/advanced/scoping" },
          { text: "Known issues", link: "/advanced/gotchas" },
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
