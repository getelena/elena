<script setup>
import { ref, reactive, watch } from "vue";
import { examples } from "./playground-examples.js";
import { findExample } from "./playground-utils.js";
import PlaygroundEditor from "./PlaygroundEditor.vue";
import PlaygroundPreview from "./PlaygroundPreview.vue";

const props = defineProps({
  currentId: { type: String, default: "" },
});

const emit = defineEmits(["preview-ready", "toggle-sidebar"]);

const activeTab = ref("js");

function getEditorState(id) {
  const example = findExample(examples, id) || examples[0]?.items[0];
  return {
    js: example?.js || "",
    css: example?.css || "",
    html: example?.html || "",
  };
}

const editor = reactive(getEditorState(props.currentId));

watch(
  () => props.currentId,
  id => {
    const example = findExample(examples, id);
    if (!example) {
      return;
    }
    editor.js = example.js;
    editor.css = example.css;
    editor.html = example.html;
    activeTab.value = "js";
  }
);
</script>

<template>
  <PlaygroundEditor
    :js="editor.js"
    :css="editor.css"
    :html="editor.html"
    :active-tab="activeTab"
    @update:js="editor.js = $event"
    @update:css="editor.css = $event"
    @update:html="editor.html = $event"
    @update:active-tab="activeTab = $event"
    @toggle-sidebar="emit('toggle-sidebar')"
  />
  <PlaygroundPreview
    :js="editor.js"
    :css="editor.css"
    :html="editor.html"
    @preview-ready="emit('preview-ready')"
  />
</template>
