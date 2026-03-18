<script setup>
import { shallowRef, ref, onMounted } from "vue";
import PlaygroundLoading from "./PlaygroundLoading.vue";

const Loaded = shallowRef(null);
const previewReady = ref(false);

onMounted(async () => {
  const mod = await import("./Playground.vue");
  Loaded.value = mod.default;
});
</script>

<template>
  <component :is="Loaded || PlaygroundLoading" @preview-ready="previewReady = true" />
  <Transition name="pg-unload">
    <PlaygroundLoading v-if="Loaded && !previewReady" class="pg-loading-overlay" />
  </Transition>
</template>
