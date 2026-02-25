
<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useDataStore } from '@/stores/data.store';

const dataStore = useDataStore();
const { usersCount, universitiesCount, temperatureNow, loading, error, lastFetchedAt } = storeToRefs(dataStore);

onMounted(() => {
  dataStore.fetchAll();
});
</script>

<template>
  <section class="container" style="padding: 1rem">
    <h1>Demo de APIs + Store</h1>

    <p><strong>Usuarios:</strong> {{ usersCount }}</p>
    <p><strong>Universidades (Ecuador):</strong> {{ universitiesCount }}</p>
    <p><strong>Temperatura actual (Quito):</strong> {{ temperatureNow ?? '—' }} °C</p>
    <p style="font-size: .9rem; color: #666">Última carga: {{ lastFetchedAt ?? '—' }}</p>

    <div v-if="loading">Cargando…</div>
    <div v-if="error" style="color: crimson">Error: {{ error }}</div>

    <button @click="dataStore.fetchAll()" :disabled="loading">Recargar todo</button>
  </section>
</template>

<style scoped>
.container button { margin-top: .75rem; }
</style>
