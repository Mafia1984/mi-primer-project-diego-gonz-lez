
import { defineStore } from 'pinia';
import http from '@/services/http';

type User = {
  id: string | number;
  name?: string;
  email: string;
};

type AuthState = {
  token: string | null;
  user: User | null;
  status: 'idle' | 'loading' | 'authenticated' | 'error';
  error: string | null;
};

const LOGIN_PATH = import.meta.env.VITE_API_LOGIN || '/auth/login';
const REGISTER_PATH = import.meta.env.VITE_API_REGISTER || '/auth/register';
const ME_PATH = import.meta.env.VITE_API_ME || '/auth/me';

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: localStorage.getItem('auth_token'),
    user: JSON.parse(localStorage.getItem('auth_user') || 'null'),
    status: 'idle',
    error: null,
  }),
  getters: {
    isAuthenticated: (s) => !!s.token,
  },
  actions: {
    persist() {
      if (this.token) localStorage.setItem('auth_token', this.token);
      else localStorage.removeItem('auth_token');
      if (this.user) localStorage.setItem('auth_user', JSON.stringify(this.user));
      else localStorage.removeItem('auth_user');
    },
    async register(payload: { name?: string; email: string; password: string }) {
      this.status = 'loading';
      this.error = null;
      try {
        const { data } = await http.post(REGISTER_PATH, payload);
        this.token = (data as any).token ?? null;
        this.user = (data as any).user ?? null;
        this.status = this.token ? 'authenticated' : 'idle';
        this.persist();
        return data;
      } catch (e: any) {
        this.status = 'error';
        this.error = e?.response?.data?.message || 'Error en registro';
        throw e;
      }
    },
    async login(payload: { email: string; password: string }) {
      this.status = 'loading';
      this.error = null;
      try {
        const { data } = await http.post(LOGIN_PATH, payload);
        this.token = (data as any).token ?? null;
        this.user = (data as any).user ?? null;
        this.status = this.token ? 'authenticated' : 'idle';
        this.persist();
        return data;
      } catch (e: any) {
        this.status = 'error';
        this.error = e?.response?.data?.message || 'Credenciales inválidas';
        throw e;
      }
    },
    async me() {
      if (!this.token) return null;
      try {
        const { data } = await http.get(ME_PATH);
        this.user = (data as any).user ?? (data as any);
        this.persist();
        return this.user;
      } catch {
        this.logout();
        return null;
      }
    },
    logout() {
      this.token = null;
      this.user = null;
      this.status = 'idle';
      this.error = null;
      this.persist();
    },
  },
});
