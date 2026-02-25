
// src/stores/users.store.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getUsers, type User } from '../services/usersApi';

export const useUsersStore = defineStore('users', () => {
  const items = ref<User[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  async function fetchAll() {
    try {
      isLoading.value = true;
      error.value = null;
      items.value = await getUsers();
    } catch (e: any) {
      error.value = e?.message ?? 'Error cargando usuarios';
    } finally {
      isLoading.value = false;
    }
  }

  return { items, isLoading, error, fetchAll };
});
