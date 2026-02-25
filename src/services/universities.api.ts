
import { http } from './http';
import type { University } from '@/types/universities';

// Universidades de Ecuador (sin autenticación)
export async function getUniversitiesEC(): Promise<University[]> {
  const { data } = await http.get<University[]>(
    'https://universities.hipolabs.com/search?country=Ecuador'
  );
  return data;
}
