import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import apisRoutes from './apis.routes';
import LoginView from '@/views/auth/LoginView.vue';
import RegisterView from '@/views/auth/RegisterView.vue';



const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/users', name: 'users', component: () => import('@/views/UsersView.vue') },
{ path: '/login', name: 'login', component: LoginView, meta: { public: true } },
{ path: '/register', name: 'register', component: RegisterView, meta: { public: true } },

...apisRoutes

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
