---
title: Overview
description: Learn about Progressive Web Components and the different approaches to building them to help you decide what fits your use case.
---

# Overview

Elena introduces an approach called **“Progressive Web Components”:**

A [Progressive Web Component](https://arielsalminen.com/2026/progressive-web-components/) is a native Custom Element designed in two layers: a base layer of HTML and CSS that renders immediately, without JavaScript, and an enhancement layer of JavaScript that adds reactivity, event handling, and more advanced templating. 

There are three types of Progressive Web Components:

## 1. Composite

Composite Components wrap and enhance the HTML composed inside them. All of their HTML and CSS lives in the Light DOM. You could also call these [HTML Web Components](https://adactio.com/journal/20618).

## 2. Primitive

Primitive Components are self-contained and render their own HTML. All of their CSS lives in the Light DOM together with the base HTML required for rendering the initial state.

## 3. Declarative

Declarative Components are a hybrid of these and utilize [Declarative Shadow DOM](/components/templates#declarative-shadow-dom).

<svg id="elena-diagram" class="elena-svg" width="100%" viewBox="0 0 680 540" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="elena-title">
<g class="columns">
<g class="column">
<g class="c-teal">
<rect x="40" y="40" width="180" height="232" rx="6" stroke-width="0.5" />
<text class="th" x="130" y="68" text-anchor="middle">Composite</text>
</g>
<g class="c-teal legend-layer-teal">
<rect x="56" y="88" width="148" height="126" rx="6" stroke-width="0.5" opacity="0.5" />
<text class="ts" x="130" y="108" text-anchor="middle">Light DOM</text>
</g>
<g class="c-gray" data-layer="gray">
<rect x="70" y="122" width="120" height="36" rx="6" stroke-width="0.5" />
<text class="ts" x="130" y="140" text-anchor="middle" dominant-baseline="central">slotted HTML</text>
</g>
<g class="c-blue" data-layer="blue">
<rect x="70" y="168" width="120" height="36" rx="6" stroke-width="0.5" opacity="0.6" />
<text class="ts" x="130" y="186" text-anchor="middle" dominant-baseline="central">@scope CSS</text>
</g>
<g class="c-amber" data-layer="amber">
<rect x="56" y="224" width="148" height="36" rx="6" stroke-width="0.5" />
<text class="ts" x="130" y="241" text-anchor="middle" dominant-baseline="central">JS enhancement</text>
</g>
</g>
<g class="column">
<g class="c-purple">
<rect x="250" y="40" width="180" height="278" rx="6" stroke-width="0.5" />
<text class="th" x="340" y="68" text-anchor="middle">Primitive</text>
</g>
<g class="c-purple legend-layer-purple">
<rect x="266" y="88" width="148" height="172" rx="6" stroke-width="0.5" opacity="0.5" />
<text class="ts" x="340" y="108" text-anchor="middle">Light DOM</text>
</g>
<g class="c-gray" data-layer="gray">
<rect x="280" y="122" width="120" height="36" rx="6" stroke-width="0.5" />
<text class="ts" x="340" y="140" text-anchor="middle" dominant-baseline="central">base HTML</text>
</g>
<g class="c-blue" data-layer="blue">
<rect x="280" y="168" width="120" height="36" rx="6" stroke-width="0.5" opacity="0.6" />
<text class="ts" x="340" y="186" text-anchor="middle" dominant-baseline="central">@scope CSS</text>
</g>
<g class="c-amber" data-layer="amber">
<rect x="280" y="214" width="120" height="36" rx="6" stroke-width="0.5" />
<text class="ts" x="340" y="233" text-anchor="middle" dominant-baseline="central">render() HTML</text>
</g>
<g class="c-amber" data-layer="amber">
<rect x="266" y="270" width="148" height="36" rx="6" stroke-width="0.5" />
<text class="ts" x="340" y="288" text-anchor="middle" dominant-baseline="central">JS enhancement</text>
</g>
</g>
<g class="column">
<g class="c-coral">
<rect x="460" y="40" width="180" height="330" rx="6" stroke-width="0.5" />
<text class="th" x="550" y="68" text-anchor="middle">Declarative</text>
</g>
<g class="c-coral legend-layer-coral">
<rect x="476" y="88" width="148" height="84" rx="6" stroke-width="0.5" opacity="0.5" />
<text class="ts" x="550" y="108" text-anchor="middle">Light DOM</text>
</g>
<g class="c-gray" data-layer="gray">
<rect x="490" y="122" width="120" height="36" rx="6" stroke-width="0.5" />
<text class="ts" x="550" y="140" text-anchor="middle" dominant-baseline="central">slotted HTML</text>
</g>
<g class="c-pink legend-layer-pink">
<rect x="476" y="182" width="148" height="130" rx="6" stroke-width="0.5" />
<text class="ts" x="550" y="202" text-anchor="middle">Shadow DOM</text>
</g>
<g class="c-gray" data-layer="gray">
<rect x="490" y="216" width="120" height="36" rx="6" stroke-width="0.5" />
<text class="ts" x="550" y="234" text-anchor="middle" dominant-baseline="central">&lt;template&gt;</text>
</g>
<g class="c-blue" data-layer="blue">
<rect x="490" y="262" width="120" height="36" rx="6" stroke-width="0.5" opacity="0.6" />
<text class="ts" x="550" y="280" text-anchor="middle" dominant-baseline="central">:host CSS</text>
</g>
<g class="c-amber" data-layer="amber">
<rect x="476" y="322" width="148" height="36" rx="6" stroke-width="0.5" />
<text class="ts" x="550" y="340" text-anchor="middle" dominant-baseline="central">JS enhancement</text>
</g>
</g>
</g>
<g class="legend">
<g class="c-gray legend-bg">
<rect x="40" y="400" width="600" height="104" rx="6" stroke-width="0.5" />
</g>
<g class="legend-item" data-highlight="teal" tabindex="0" role="button" aria-label="Highlight authored HTML in Light DOM">
<rect x="50" y="414" width="280" height="22" fill="transparent" />
<rect class="swatch-teal" x="60" y="420" width="14" height="14" rx="3" fill="#9FE1CB" stroke="#0F6E56" stroke-width="0.5" />
<text class="ts" x="82" y="431">Authored HTML in Light DOM</text>
</g>
<g class="legend-item" data-highlight="purple" tabindex="0" role="button" aria-label="Highlight self-rendered HTML in Light DOM">
<rect x="50" y="438" width="280" height="22" fill="transparent" />
<rect class="swatch-purple" x="60" y="444" width="14" height="14" rx="3" fill="#EEEDFE" stroke="#534AB7" stroke-width="0.5" />
<text class="ts" x="82" y="455">Self-rendered HTML in Light DOM</text>
</g>
<g class="legend-item" data-highlight="blue" tabindex="0" role="button" aria-label="Highlight CSS encapsulation">
<rect x="50" y="462" width="280" height="22" fill="transparent" />
<rect class="swatch-blue" x="60" y="468" width="14" height="14" rx="3" fill="#E6F1FB" stroke="#185FA5" stroke-width="0.5" />
<text class="ts" x="82" y="479">CSS encapsulation</text>
</g>
<g class="legend-item" data-highlight="amber" tabindex="0" role="button" aria-label="Highlight JavaScript enhancement">
<rect x="370" y="414" width="260" height="22" fill="transparent" />
<rect class="swatch-amber" x="380" y="420" width="14" height="14" rx="3" fill="#FAEEDA" stroke="#854F0B" stroke-width="0.5" />
<text class="ts" x="402" y="431">JavaScript enhancement</text>
</g>
<g class="legend-item" data-highlight="pink" tabindex="0" role="button" aria-label="Highlight Declarative Shadow DOM">
<rect x="370" y="438" width="260" height="22" fill="transparent" />
<rect class="swatch-pink" x="380" y="444" width="14" height="14" rx="3" fill="#FBEAF0" stroke="#993556" stroke-width="0.5" />
<text class="ts" x="402" y="455">Declarative Shadow DOM</text>
</g>
<g class="legend-item" data-highlight="gray" tabindex="0" role="button" aria-label="Highlight HTML content on page">
<rect x="370" y="462" width="260" height="22" fill="transparent" />
<rect class="swatch-gray" x="380" y="468" width="14" height="14" rx="3" fill="#F1EFE8" stroke="#5F5E5A" stroke-width="0.5" />
<text class="ts" x="402" y="479">HTML content on page</text>
</g>
</g>
</svg>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  const svg = document.getElementById("elena-diagram");
  if (!svg) return;
  const items = svg.querySelectorAll(".legend-item");
  const layers = svg.querySelectorAll("[data-layer]");
  const legendLayers = svg.querySelectorAll('[class*="legend-layer-"]');
  function activate(color) {
    svg.querySelectorAll(".active").forEach((el) => el.classList.remove("active"));
    svg.classList.add("legend-active");
    layers.forEach((el) => {
      if (el.dataset.layer === color) el.classList.add("active");
    });
    legendLayers.forEach((el) => {
      if (el.classList.contains("legend-layer-" + color)) el.classList.add("active");
    });
    items.forEach((el) => {
      if (el.dataset.highlight === color) el.classList.add("active");
    });
  }
  let deactivateTimer = null;
  function deactivate() {
    deactivateTimer = setTimeout(() => {
      svg.classList.remove("legend-active");
      svg.querySelectorAll(".active").forEach((el) => el.classList.remove("active"));
    }, 1000);
  }
  function cancelDeactivate() {
    clearTimeout(deactivateTimer);
  }
  items.forEach((item) => {
    item.addEventListener("mouseenter", () => { cancelDeactivate(); activate(item.dataset.highlight); });
    item.addEventListener("mouseleave", deactivate);
    item.addEventListener("focus", () => { cancelDeactivate(); activate(item.dataset.highlight); });
    item.addEventListener("blur", deactivate);
  });
  layers.forEach((layer) => {
    layer.addEventListener("mouseenter", () => { cancelDeactivate(); activate(layer.dataset.layer); });
    layer.addEventListener("mouseleave", deactivate);
  });
});
</script>

> [!TIP]
> Elena doesn’t force this taxonomy. They’re all just components, and you choose how to build yours. But since [Progressive Web Components](https://arielsalminen.com/2026/progressive-web-components/) is a design philosophy rather than a library feature, understanding the distinction between these approaches helps when deciding what fits your use case.

## Next steps

- Start with the [Quick Start](/start/) guide.
- View the [Live examples](/examples/) for demos.
- Browse our [FAQ](/advanced/faq) for frequently asked questions.