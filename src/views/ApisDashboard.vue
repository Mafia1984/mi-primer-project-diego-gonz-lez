
<!-- src/views/ApisDashboard.vue -->
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>APIs & Store</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div class="grid gap-4" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));">
        <ApiCard title="Usuarios" :loading="users.isLoading" :error="users.error" @refresh="users.fetchAll()">
          <p>Total: <strong>{{ users.items.length }}</strong></p>
          <ul>
            <li v-for="u in users.items.slice(0, 5)" :key="u.id">{{ u.name }} — {{ u.email }}</li>
          </ul>
        </ApiCard>

        <ApiCard title="Posts" :loading="posts.isLoading" :error="posts.error" @refresh="posts.fetchAll()">
          <p>Total: <strong>{{ posts.items.length }}</strong></p>
          <ul>
            <li v-for="p in posts.items.slice(0, 5)" :key="p.id">{{ p.title }}</li>
          </ul>
        </ApiCard>

        <ApiCard title="Clima (Open‑Meteo)" :loading="weather.isLoading" :error="weather.error" @refresh="weather.fetchCurrent()">
          <div v-if="weather.data">
            <p>
              Lat: {{ weather.lat.toFixed(3) }}, Lon: {{ weather.lon.toFixed(3) }}
            </p>
            <p>
              Temperatura (°C) próximas horas: {{ weather.data.hourly.temperature_2m.slice(0, 6).join(', ') }}
            </p>
          </div>
          <div v-else>Sin datos aún.</div>
        </ApiCard>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ApiCard from '../components/ApiCard.vue';
import { useUsersStore } from '../stores/users.store';
import { usePostsStore } from '../stores/posts.store';
import { useWeatherStore } from '../stores/weather.store';

const users = useUsersStore();
const posts = usePostsStore();
const weather = useWeatherStore();

onMounted(() => {
  // Disparar cargas iniciales
  users.fetchAll();
  posts.fetchAll();
  weather.fetchCurrent();
});
</script>
