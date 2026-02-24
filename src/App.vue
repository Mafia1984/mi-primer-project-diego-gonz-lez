<template>
  <NavBar />
  <main class="container">
    <router-view />
  </main>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
</script>

<style>
:root { color-scheme: light dark; }
html, body, #app { height: 100%; margin: 0; font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; }
.container { max-width: 900px; margin: 0 auto; padding: 16px; }
button { margin-right: 6px; padding: 6px 10px; cursor: pointer; }
</style>
