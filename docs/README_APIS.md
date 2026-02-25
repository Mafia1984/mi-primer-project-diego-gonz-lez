
# Módulo de consumo de múltiples APIs con Pinia (Vue 3 + Vite + Ionic/Capacitor)

Este paquete agrega un **servicio Axios tipado**, **3 stores de Pinia** (usuarios, posts, clima) y una **vista de tablero** para probarlos. Incluye rutas y componentes listos para integrarse al proyecto base.

## Contenido

- `src/services/apiClient.ts`: factoría `createApi` con interceptores (Authorization y manejo de errores)
- `src/services/usersApi.ts`: `GET /users` (JSONPlaceholder)
- `src/services/postsApi.ts`: `GET /posts` (JSONPlaceholder)
- `src/services/weatherApi.ts`: `GET` Open‑Meteo (sin API key)
- `src/stores/*.store.ts`: stores de Pinia para cada recurso
- `src/views/ApisDashboard.vue`: vista demostrativa
- `src/components/ApiCard.vue`: tarjeta reutilizable
- `src/router/apis.routes.ts`: definición de ruta `/apis`

## Variables de entorno

Copia `.env.example.apis` al raíz de tu proyecto como `.env.development` (y opcionalmente `.env`):

```env
VITE_API_USERS_URL=https://jsonplaceholder.typicode.com
VITE_API_POSTS_URL=https://jsonplaceholder.typicode.com
VITE_API_WEATHER_URL=https://api.open-meteo.com/v1/forecast
VITE_DEFAULT_LAT=-0.22985
VITE_DEFAULT_LON=-78.52495
```

> Nota: Vite **solo** expone variables prefijadas con `VITE_` al código del cliente.

## Pasos de integración

1. Copia el contenido de `src/` a tu `src/` del proyecto.
2. Importa las rutas en tu router principal (`src/router/index.ts`):
   ```ts
   import apisRoutes from './apis.routes';
   const router = createRouter({ /* ... */ routes: [ /* tus rutas */, ...apisRoutes ] });
   ```
3. (Si aún no lo tienes) Asegúrate de **registrar Pinia** en `main.ts`:
   ```ts
   import { createPinia } from 'pinia';
   const app = createApp(App);
   app.use(createPinia());
   ```
4. Ejecuta en desarrollo: `npm run dev` y navega a `http://localhost:5173/apis`.

## Build móvil con Capacitor

Tras un `npm run build`, sincroniza:
```bash
npx cap copy
npx cap sync
```
Abre los proyectos nativos:
```bash
npx cap open android
npx cap open ios
```
