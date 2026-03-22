<script setup>
import { ref, shallowRef, onMounted, onUnmounted, watch } from "vue";
import { useData } from "vitepress";

const props = defineProps({
  js: { type: String, default: "" },
  css: { type: String, default: "" },
  html: { type: String, default: "" },
  activeTab: { type: String, default: "js" },
  dirty: { type: Boolean, default: false },
  hasSaved: { type: Boolean, default: false },
  saveStatus: { type: String, default: null },
});

const emit = defineEmits([
  "update:js",
  "update:css",
  "update:html",
  "update:activeTab",
  "toggle-sidebar",
  "reset",
]);

const { isDark } = useData();
const editorContainer = ref(null);
const view = shallowRef(null);
const tabs = ["html", "css", "js"];

// Start loading CodeMirror immediately when this module is evaluated,
// rather than waiting for the editor to mount.
let cmPromise =
  typeof window !== "undefined"
    ? Promise.all([
        import("codemirror"),
        import("@codemirror/state"),
        import("@codemirror/lang-javascript"),
        import("@codemirror/lang-html"),
        import("@codemirror/lang-css"),
        import("@codemirror/theme-one-dark"),
      ])
    : null;

// Track modules loaded by dynamic import
let cmModules = null;

// Track the current compartments for language and theme
let languageCompartment = null;
let themeCompartment = null;

function getContentForTab(tab) {
  if (tab === "js") {
    return props.js;
  }
  if (tab === "css") {
    return props.css;
  }
  return props.html;
}

function getEmitForTab(tab) {
  if (tab === "js") {
    return "update:js";
  }
  if (tab === "css") {
    return "update:css";
  }
  return "update:html";
}

async function loadCodeMirror() {
  if (cmModules) {
    return cmModules;
  }

  try {
    const [cm, cmState, langJs, langHtml, langCss, themeDark] = await cmPromise;
    cmModules = { cm, cmState, langJs, langHtml, langCss, themeDark };
    return cmModules;
  } catch {
    // Retry once: create a fresh Promise.all to avoid a cached rejection
    cmPromise = Promise.all([
      import("codemirror"),
      import("@codemirror/state"),
      import("@codemirror/lang-javascript"),
      import("@codemirror/lang-html"),
      import("@codemirror/lang-css"),
      import("@codemirror/theme-one-dark"),
    ]);
    const [cm, cmState, langJs, langHtml, langCss, themeDark] = await cmPromise;
    cmModules = { cm, cmState, langJs, langHtml, langCss, themeDark };
    return cmModules;
  }
}

function getLanguageExtension(tab) {
  if (!cmModules) {
    return [];
  }
  if (tab === "js") {
    return cmModules.langJs.javascript();
  }
  if (tab === "css") {
    return cmModules.langCss.css();
  }
  return cmModules.langHtml.html();
}

function getThemeExtension() {
  if (!cmModules) {
    return [];
  }
  return isDark.value ? cmModules.themeDark.oneDark : [];
}

async function createEditor() {
  const mods = await loadCodeMirror();
  const { EditorView, basicSetup } = mods.cm;
  const { EditorState, Compartment } = mods.cmState;

  languageCompartment = new Compartment();
  themeCompartment = new Compartment();

  const doc = getContentForTab(props.activeTab);

  const startState = EditorState.create({
    doc,
    extensions: [
      basicSetup,
      languageCompartment.of(getLanguageExtension(props.activeTab)),
      themeCompartment.of(getThemeExtension()),
      EditorView.updateListener.of(update => {
        if (update.docChanged) {
          emit(getEmitForTab(props.activeTab), update.state.doc.toString());
        }
      }),
      EditorView.theme({
        "&": { height: "100%", fontSize: "13px" },
        ".cm-scroller": { overflow: "auto", fontFamily: "var(--vp-font-family-mono)" },
        ".cm-content": { padding: "12px 0", lineHeight: "1.6" },
        ".cm-gutters": { border: "none" },
      }),
    ],
  });

  if (view.value) {
    view.value.destroy();
  }

  view.value = new EditorView({
    state: startState,
    parent: editorContainer.value,
  });
}

function switchTab(tab) {
  if (tab === props.activeTab) {
    return;
  }
  emit("update:activeTab", tab);
}

function syncContent() {
  if (!view.value) {
    return;
  }
  const content = getContentForTab(props.activeTab);
  const currentContent = view.value.state.doc.toString();
  if (content !== currentContent) {
    view.value.dispatch({
      changes: { from: 0, to: view.value.state.doc.length, insert: content },
    });
  }
}

// When tab changes, replace editor content and language
watch(
  () => props.activeTab,
  () => {
    if (!view.value || !cmModules) {
      return;
    }
    syncContent();
    view.value.dispatch({
      effects: languageCompartment.reconfigure(getLanguageExtension(props.activeTab)),
    });
  }
);

// When example changes externally (sidebar selection), update editor content
watch([() => props.js, () => props.css, () => props.html], syncContent);

// Toggle dark/light theme
watch(isDark, () => {
  if (!view.value || !themeCompartment) {
    return;
  }
  view.value.dispatch({
    effects: themeCompartment.reconfigure(getThemeExtension()),
  });
});

onMounted(createEditor);

onUnmounted(() => {
  if (view.value) {
    view.value.destroy();
  }
});
</script>

<template>
  <div class="pg-editor">
    <div class="pg-editor-tabs">
      <button
        class="pg-sidebar-toggle"
        @click="emit('toggle-sidebar')"
        aria-label="Toggle examples"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M2 4h12M2 8h12M2 12h12"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
      </button>
      <button
        v-for="tab in tabs"
        :key="tab"
        class="pg-editor-tab"
        :class="{ active: activeTab === tab }"
        @click="switchTab(tab)"
      >
        {{ tab.toUpperCase() }}
      </button>
      <div class="pg-editor-actions">
        <span v-if="saveStatus === 'saving'" class="pg-save-indicator">
          <svg class="pg-save-spinner" width="14" height="14" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="2" opacity="0.25" />
            <path
              d="M14 8a6 6 0 0 0-6-6"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
          Saving
        </span>
        <button v-else-if="dirty && hasSaved" class="pg-editor-reset" @click="emit('reset')">
          Reset
        </button>
      </div>
    </div>
    <div ref="editorContainer" class="pg-editor-container"></div>
  </div>
</template>
