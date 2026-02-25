
// src/services/weatherApi.ts
export type HourlyWeather = {
  time: string[];
  temperature_2m: number[];
  relativehumidity_2m: number[];
};

export type WeatherResponse = {
  latitude: number;
  longitude: number;
  timezone: string;
  hourly: HourlyWeather;
};

export async function getHourlyWeather(lat: number, lon: number): Promise<WeatherResponse> {
  const baseURL = import.meta.env.VITE_API_WEATHER_URL || 'https://api.open-meteo.com/v1/forecast';
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    hourly: 'temperature_2m,relativehumidity_2m',
    timezone: 'auto'
  });

  const res = await fetch(`${baseURL}?${params.toString()}`);
  if (!res.ok) throw new Error(`Weather API error: ${res.status} ${res.statusText}`);
  return res.json() as Promise<WeatherResponse>;
}
