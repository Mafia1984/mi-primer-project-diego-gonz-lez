
// src/stores/posts.store.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getPosts, type Post } from '../services/postsApi';

export const usePostsStore = defineStore('posts', () => {
  const items = ref<Post[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  async function fetchAll() {
    try {
      isLoading.value = true;
      error.value = null;
      items.value = await getPosts();
    } catch (e: any) {
      error.value = e?.message ?? 'Error cargando posts';
    } finally {
      isLoading.value = false;
    }
  }

  return { items, isLoading, error, fetchAll };
});
