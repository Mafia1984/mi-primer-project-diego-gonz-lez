
import { http } from './http';
import type { User } from '@/types/users';

// Usuarios de prueba (sin autenticación)
export async function getUsers(): Promise<User[]> {
  const { data } = await http.get<User[]>(
    'https://jsonplaceholder.typicode.com/users'
  );
  return data;
}
