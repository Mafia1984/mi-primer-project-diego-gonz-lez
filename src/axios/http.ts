import axios from 'axios';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15000,
});

http.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('[HTTP ERROR]', error?.response || error?.message);
    return Promise.reject(error);
  }
);

export default http;
