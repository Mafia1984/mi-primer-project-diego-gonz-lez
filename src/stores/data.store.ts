
import { defineStore } from 'pinia';
import type { User } from '@/types/users';
import type { University } from '@/types/universities';
import type { WeatherResponse } from '@/types/weather';
import { getUsers } from '@/services/users.api';
import { getUniversitiesEC } from '@/services/universities.api';
import { getCurrentWeather } from '@/services/weather.api';

interface State {
  users: User[];
  universities: University[];
  weather: WeatherResponse | null;

  loading: boolean;
  error: string | null;
  lastFetchedAt: string | null;
}

export const useDataStore = defineStore('data', {
  state: (): State => ({
    users: [],
    universities: [],
    weather: null,
    loading: false,
    error: null,
    lastFetchedAt: null,
  }),

  getters: {
    usersCount: (s) => s.users.length,
    universitiesCount: (s) => s.universities.length,
    temperatureNow: (s) => s.weather?.current_weather?.temperature ?? null,
  },

  actions: {
    async fetchUsers() {
      this.loading = true; this.error = null;
      try {
        this.users = await getUsers();
      } catch (e: any) {
        this.error = e?.message ?? 'Error cargando usuarios';
      } finally {
        this.loading = false;
      }
    },

    async fetchUniversities() {
      this.loading = true; this.error = null;
      try {
        this.universities = await getUniversitiesEC();
      } catch (e: any) {
        this.error = e?.message ?? 'Error cargando universidades';
      } finally {
        this.loading = false;
      }
    },

    async fetchWeather() {
      this.loading = true; this.error = null;
      try {
        this.weather = await getCurrentWeather();
      } catch (e: any) {
        this.error = e?.message ?? 'Error cargando clima';
      } finally {
        this.loading = false;
      }
    },

    async fetchAll() {
      this.loading = true; this.error = null;
      try {
        const [users, universities, weather] = await Promise.all([
          getUsers(),
          getUniversitiesEC(),
          getCurrentWeather(),
        ]);
        this.users = users;
        this.universities = universities;
        this.weather = weather;
        this.lastFetchedAt = new Date().toISOString();
      } catch (e: any) {
        this.error = e?.message ?? 'Error cargando datos';
      } finally {
        this.loading = false;
      }
    },
  },
});
