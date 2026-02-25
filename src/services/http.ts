
import axios from 'axios';

// Instancia base de Axios para el proyecto (Vue + Vite)
export const http = axios.create({
  timeout: 15000,
});

// Interceptor opcional para loguear errores
http.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error('[HTTP ERROR]', err?.response?.status, err?.message);
    return Promise.reject(err);
  }
);
