import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '@/views/HomeView.vue';

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/users', name: 'users', component: () => import('@/views/UsersView.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
