
import { http } from './http';
import type { WeatherResponse } from '@/types/weather';

// Coordenadas aproximadas de Quito (puedes cambiarlas por tu ciudad)
const LAT = -0.19;
const LON = -78.50;

export async function getCurrentWeather(): Promise<WeatherResponse> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current_weather=true`;
  const { data } = await http.get<WeatherResponse>(url);
  return data;
}
