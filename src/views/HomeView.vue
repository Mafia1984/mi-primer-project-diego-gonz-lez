
<template>
  <main class="container">
    <nav class="breadcrumbs">
      <RouterLink to="/">Inicio</RouterLink>
      <span> · </span>
      <RouterLink to="/usuarios">Usuarios</RouterLink>
    </nav>

    <h1>Inicio</h1>

    <p>
      Count: <strong>{{ count }}</strong> — doble: <strong>{{ double }}</strong>
    </p>

    <div class="btns">
      <button @click="inc">+1</button>
      <button @click="dec">-1</button>
      <button @click="reset">Reset</button>
    </div>

    <p style="margin-top:16px">Ir a <RouterLink to="/usuarios">Usuarios</RouterLink></p>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'

const count = ref(0)
const double = computed(() => count.value * 2)
const inc = () => (count.value += 1)
const dec = () => (count.value -= 1)
const reset = () => (count.value = 0)
</script>

<style scoped>
.container { max-width: 720px; margin: 40px auto; padding: 0 16px; }
.breadcrumbs { margin-bottom: 8px; color: #3b82f6; }
.btns button { margin-right: 8px; padding: 6px 10px; }
</style>
