import helloWorld from "./hello-world.js";
import compositeComponent from "./composite-component.js";
import primitiveComponent from "./primitive-component.js";
import declarativeComponent from "./declarative-component.js";
import stringProps from "./string-props.js";
import booleanProps from "./boolean-props.js";
import numberProps from "./number-props.js";
import arrayObjectProps from "./array-object-props.js";
import conditionalRendering from "./conditional-rendering.js";
import listRendering from "./list-rendering.js";
import unsafeHtml from "./unsafe-html.js";
import elementRef from "./element-ref.js";
import delegatedEvents from "./delegated-events.js";
import customEvents from "./custom-events.js";
import manualListeners from "./manual-listeners.js";
import willUpdate from "./will-update.js";
import firstUpdated from "./first-updated.js";
import requestUpdate from "./request-update.js";
import cssCustomProperties from "./css-custom-properties.js";
import baselineSupport from "./baseline-support.js";
import mixins from "./mixins.js";
import shadowDom from "./shadow-dom.js";

export const examples = [
  {
    category: "Basics",
    items: [helloWorld, compositeComponent, primitiveComponent, declarativeComponent],
  },
  {
    category: "Props",
    items: [stringProps, booleanProps, numberProps, arrayObjectProps],
  },
  {
    category: "Templates",
    items: [conditionalRendering, listRendering, unsafeHtml, elementRef],
  },
  {
    category: "Events",
    items: [delegatedEvents, customEvents, manualListeners],
  },
  {
    category: "Lifecycle",
    items: [willUpdate, firstUpdated, requestUpdate],
  },
  {
    category: "Styling",
    items: [cssCustomProperties],
  },
  {
    category: "Advanced",
    items: [mixins, shadowDom, baselineSupport],
  },
];
