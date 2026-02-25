
// src/stores/weather.store.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getHourlyWeather, type WeatherResponse } from '../services/weatherApi';

export const useWeatherStore = defineStore('weather', () => {
  const data = ref<WeatherResponse | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const lat = ref<number>(Number(import.meta.env.VITE_DEFAULT_LAT ?? -0.22985));
  const lon = ref<number>(Number(import.meta.env.VITE_DEFAULT_LON ?? -78.52495));

  async function fetchCurrent() {
    try {
      isLoading.value = true;
      error.value = null;
      data.value = await getHourlyWeather(lat.value, lon.value);
    } catch (e: any) {
      error.value = e?.message ?? 'Error cargando clima';
    } finally {
      isLoading.value = false;
    }
  }

  function setLocation(newLat: number, newLon: number) {
    lat.value = newLat; lon.value = newLon;
  }

  return { data, isLoading, error, lat, lon, fetchCurrent, setLocation };
});
