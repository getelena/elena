<script setup>
import { ref, watch, onMounted } from "vue";
import { generateSrcdoc, debounce } from "./playground-utils.js";

const props = defineProps({
  js: { type: String, default: "" },
  css: { type: String, default: "" },
  html: { type: String, default: "" },
});

const iframe = ref(null);
const srcdoc = ref("");
const ready = ref(false);

function updatePreview() {
  ready.value = false;
  srcdoc.value = generateSrcdoc(props.js, props.css, props.html);
}

const debouncedUpdate = debounce(updatePreview, 300);

// Immediate update on first mount and when example changes entirely
onMounted(updatePreview);

watch([() => props.js, () => props.css, () => props.html], (newVals, oldVals) => {
  // If all three changed at once, it's likely an example switch: update immediately
  const allChanged =
    oldVals && newVals[0] !== oldVals[0] && newVals[1] !== oldVals[1] && newVals[2] !== oldVals[2];
  if (allChanged) {
    updatePreview();
  } else {
    debouncedUpdate();
  }
});
</script>

<template>
  <div class="pg-preview">
    <div class="pg-preview-header">
      <span class="pg-preview-title">Preview</span>
      <button class="pg-preview-reload" @click="updatePreview" title="Reload preview">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path
            d="M13.65 2.35A7.96 7.96 0 0 0 8 0C3.58 0 0 3.58 0 8s3.58 8 8 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 8 14 6 6 0 1 1 8 2c1.66 0 3.14.69 4.22 1.78L9 7h7V0l-2.35 2.35z"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
    <iframe
      ref="iframe"
      class="pg-preview-iframe"
      :class="{ 'pg-preview-ready': ready }"
      :srcdoc="srcdoc"
      sandbox="allow-scripts"
      title="Component preview"
    ></iframe>
  </div>
</template>
