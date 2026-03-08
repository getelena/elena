---
head:
  - - link
    - rel: stylesheet
      href: /components/bundle.css
  - - script
    - type: module
      src: /components/bundle.js
---

<script setup>
import { ref, computed } from "vue";

const iconDownload = `<svg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><path d='M20 16a1 1 0 0 1 1 1v2a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-2a1 1 0 0 1 2 0v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1 -1v-2a1 1 0 0 1 1 -1m-8 -13a1 1 0 0 1 1 1v9.585l3.293 -3.292a1 1 0 0 1 1.414 1.414l-5 5a1 1 0 0 1 -.09 .08l.09 -.08a1 1 0 0 1 -.674 .292l-.033 .001h-.032l-.054 -.004l.086 .004a1 1 0 0 1 -.617 -.213a1 1 0 0 1 -.09 -.08l-5 -5a1 1 0 0 1 1.414 -1.414l3.293 3.292v-9.585a1 1 0 0 1 1 -1' /></svg>`;

const iconSettings = `<svg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><path fill='none' d='M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065' /><path fill='none' d='M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0' /></svg>`;

const iconSort = `<svg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><path d='M8 9l4 -4l4 4' fill='none'/><path fill='none' d='M16 15l-4 4l-4 -4'/></svg>`;

const iconCheckSm = `<svg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><path d='M5 12l5 5l10 -10'/></svg>`;

const iconCheckMd = `<svg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2.25' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><path d='M5 12l5 5l10 -10'/></svg>`;

const iconCheckLg = `<svg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><path d='M5 12l5 5l10 -10'/></svg>`;

const iconExternal = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><path d='M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6'/><path d='M11 13l9 -9'/><path d='M15 4h5v5'/></svg>`;

const iconThumbsUp = `<svg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><path d='M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3' /></svg>`;

const iconHeart = `<svg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><path d='M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572' /></svg>`;

const count = ref(0);
const variants = ["primary", "danger", "default"];
const variantIndex = ref(0);
const currentVariant = computed(() => variants[variantIndex.value]);
const cycleButtonText = computed(() => `Click to cycle (${currentVariant.value})`);

function cycleVariant() {
  variantIndex.value = (variantIndex.value + 1) % variants.length;
}
</script>

# Live examples

This page demonstrates Elena’s [Progressive Web Components](/components/terminology) on a regular page without any server side configuration. This is the recommended way to consume Elena components with or without a framework. 

Mostly, you will get almost identical experience as a user compared to a full pre-rendering done by the `@elenajs/ssr` tool.

## Basic example

<div class="elena-demo">
  <elena-stack direction="row">
    <elena-button type="submit">Button</elena-button>
    <elena-button :icon="iconDownload">Download</elena-button>
    <elena-button label="Settings" :icon="iconSettings"></elena-button>
  </elena-stack>
</div>

```html
<elena-stack>
  <elena-button type="submit">Button</elena-button>
  <elena-button icon="<svg>">Download</elena-button>
  <elena-button label="Settings" icon="<svg>"></elena-button>
</elena-stack>
```

## Component variants

<div class="elena-demo">
  <elena-stack direction="row">
    <elena-button variant="primary">Primary</elena-button>
    <elena-button variant="primary" :icon="iconSort">Primary</elena-button>
    <elena-button variant="default">Default</elena-button>
    <elena-button variant="danger">Danger</elena-button>
    <elena-button variant="outline">Outline</elena-button>
    <elena-button disabled>Disabled</elena-button>
  </elena-stack>
</div>

```html
<elena-stack>
  <elena-button variant="primary">Primary</elena-button>
  <elena-button variant="primary" icon="<svg>">Primary</elena-button>
  <elena-button>Default</elena-button>
  <elena-button variant="danger">Danger</elena-button>
  <elena-button variant="outline">Outline</elena-button>
  <elena-button disabled>Disabled</elena-button>
</elena-stack>
```

## Component sizes

<div class="elena-demo">
  <elena-stack direction="row">
    <elena-button size="sm" :icon="iconCheckSm">Small</elena-button>
    <elena-button size="md" :icon="iconCheckMd">Medium</elena-button>
    <elena-button size="lg" :icon="iconCheckLg">Large</elena-button>
  </elena-stack>
</div>

```html
<elena-stack>
  <elena-button size="sm" icon="<svg>">Small</elena-button>
  <elena-button size="md" icon="<svg>">Medium</elena-button>
  <elena-button size="lg" icon="<svg>">Large</elena-button>
</elena-stack>
```

## Components as links

<div class="elena-demo">
  <elena-stack direction="row">
    <elena-button href="https://github.com/getelena/elena" variant="primary">Elena on GitHub</elena-button>
    <elena-button href="https://elenajs.com" target="_blank" :icon="iconExternal">External</elena-button>
    <elena-button href="#file" download :icon="iconDownload">Download</elena-button>
  </elena-stack>
</div>

```html
<elena-stack>
  <elena-button href="https://github.com/getelena/elena" variant="primary">Elena on GitHub</elena-button>
  <elena-button href="https://elenajs.com" target="_blank" icon="<svg>">External</elena-button>
  <elena-button href="#file" download icon="<svg>">Download</elena-button>
</elena-stack>
```

## Interactive components

<div class="elena-demo">
  <elena-stack direction="row">
    <elena-button variant="primary" @click="count++">Increment</elena-button>
    <elena-button variant="danger" @click="count = 0">Reset</elena-button>
  </elena-stack>
  <p><strong>Count:</strong> "{{ count }}"</p>
</div>

```html
<elena-stack>
  <elena-button variant="primary">Increment</elena-button>
  <elena-button variant="danger">Reset</elena-button>
</elena-stack>
```

## Dynamic components

<div class="elena-demo">
  <elena-stack direction="row">
    <elena-button :variant="currentVariant" :text="cycleButtonText" @click="cycleVariant"></elena-button>
    <elena-button :variant="currentVariant" :text="currentVariant" @click="cycleVariant"></elena-button>
  </elena-stack>
  <p><strong>Current:</strong> "{{ currentVariant }}"</p>
</div>

```html
<elena-stack>
  <elena-button variant="primary">Click to cycle</elena-button>
  <elena-button variant="primary">primary</elena-button>
</elena-stack>
```

## Full width components

<div class="elena-demo">
  <elena-button variant="primary" expand>Full width</elena-button>
</div>

```html
<elena-button variant="primary" expand>Full width</elena-button>
```

## Styling components

<div class="elena-demo">
  <elena-stack direction="row">
    <elena-button style="--elena-button-bg: #ffddd2; --elena-button-border: #ffddd2; --elena-button-text: #463634">Custom style</elena-button>
    <elena-button style="--elena-button-bg: #ffddd2; --elena-button-border: #ffddd2; --elena-button-text: #463634" :icon="iconThumbsUp">Like</elena-button>
    <elena-button style="--elena-button-bg: #ffddd2; --elena-button-border: #ffddd2; --elena-button-text: #463634" label="Love" :icon="iconHeart"></elena-button>
  </elena-stack>
</div>

```html
<elena-stack>
  <elena-button style="--elena-button-bg: #ffddd2; ...">Custom style</elena-button>
  <elena-button style="--elena-button-bg: #ffddd2; ..." icon="<svg>">Like</elena-button>
  <elena-button style="--elena-button-bg: #ffddd2; ..." label="Love" icon="<svg>"></elena-button>
</elena-stack>
```
