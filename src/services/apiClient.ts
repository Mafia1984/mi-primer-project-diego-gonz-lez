
// src/services/apiClient.ts
import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

export function createApi(baseURL: string): AxiosInstance {
  const instance = axios.create({
    baseURL,
    timeout: 15000,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });

  // Request interceptor: add Authorization header if token exists
  instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers = config.headers || {};
      (config.headers as any).Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Response interceptor: normalize errors
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
      const status = error?.response?.status;
      const message = error?.response?.data?.message || error.message || 'Unexpected error';
      return Promise.reject({ status, message });
    }
  );

  return instance;
}
