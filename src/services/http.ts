

// src/services/http.ts
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

// Base URL configurable por .env
const baseURL = import.meta.env.VITE_API_BASE_URL || '/';

export const http = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
  withCredentials: false, // cambia a true si tu API usa cookies HttpOnly
});

// === Interceptor de REQUEST: agrega el token si existe ===
http.interceptors.request.use((config) => {
  try {
    const store = useAuthStore();
    if (store?.token) {
      config.headers = config.headers || {};
      (config.headers as any).Authorization = `Bearer ${store.token}`;
    }
  } catch {
    // Pinia aún no montado en algún contexto especial: ignorar
  }
  return config;
});

// === Interceptor de RESPONSE: conserva tu logger de errores ===
http.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error('[HTTP ERROR]', err?.response?.status, err?.message);
    return Promise.reject(err);
  }
);

export default http;

