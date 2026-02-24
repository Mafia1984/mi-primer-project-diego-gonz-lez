<script setup lang="ts">
import { ref, onMounted } from 'vue';
import http from '@/axios/http';

type User = { id: number; name: string; email: string; username: string };

const loading = ref(false);
const error = ref<string | null>(null);
const users = ref<User[]>([]);

const load = async () => {
  loading.value = true;
  error.value = null;
  try {
    const { data } = await http.get<User[]>('/users');
    users.value = data;
  } catch (err: any) {
    error.value = err?.message ?? 'Error cargando usuarios';
  } finally {
    loading.value = false;
  }
};

onMounted(load);
</script>

<template>
  <section>
    <h1>Usuarios</h1>
    <button @click="load" :disabled="loading">Recargar</button>

    <p v-if="loading">Cargando...</p>
    <p v-if="error" style="color:red">{{ error }}</p>

    <ul v-if="!loading && !error">
      <li v-for="u in users" :key="u.id">
        <strong>{{ u.name }}</strong> — {{ u.email }} ({{ u.username }})
      </li>
    </ul>
  </section>
</template>
