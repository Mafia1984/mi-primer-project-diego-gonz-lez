
// src/services/usersApi.ts
import { createApi } from './apiClient';

const baseURL = import.meta.env.VITE_API_USERS_URL || 'https://jsonplaceholder.typicode.com';
const api = createApi(baseURL);

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export async function getUsers(): Promise<User[]> {
  const { data } = await api.get<User[]>('/users');
  return data;
}
