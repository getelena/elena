---
url: /pr-preview/pr-20/components/overview.md
description: >-
  Learn about Progressive Web Components and the different approaches to
  building them to help you decide what fits your use case.
---

# Overview

A [Progressive Web Component](https://arielsalminen.com/2026/progressive-web-components/) is a native Custom Element designed in two layers: a base layer of HTML and CSS that renders immediately, without JavaScript, and an enhancement layer of JavaScript that adds reactivity, event handling, and more advanced templating. There are three types of Progressive Web Components:

## 1. Composite

Composite Components wrap and enhance the HTML composed inside them. All of their HTML and CSS lives in the Light DOM. You could also call these [HTML Web Components](https://adactio.com/journal/20618).

## 2. Primitive

Primitive Components are self-contained and render their own HTML. All of their CSS lives in the Light DOM together with the base HTML required for rendering the initial state.

## 3. Declarative

Declarative Components are a hybrid of these and utilize [Declarative Shadow DOM](/components/templates#declarative-shadow-dom).

> \[!TIP]
> Elena doesn’t force this taxonomy. They’re [all just web components](/advanced/faq#can-i-build-normal-web-components-with-elena), and you choose how to build yours. But since [Progressive Web Components](https://arielsalminen.com/2026/progressive-web-components/) is a design philosophy rather than a library feature, understanding the distinction between these approaches helps when deciding what fits your use case.

## Next steps

* Start with the [Quick Start](/start/) guide.
* View the [Live examples](/examples/) for demos.
* Browse our [FAQ](/advanced/faq) for frequently asked questions.
