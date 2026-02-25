
// src/services/postsApi.ts
import { createApi } from './apiClient';

const baseURL = import.meta.env.VITE_API_POSTS_URL || 'https://jsonplaceholder.typicode.com';
const api = createApi(baseURL);

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export async function getPosts(): Promise<Post[]> {
  const { data } = await api.get<Post[]>('/posts');
  return data;
}
