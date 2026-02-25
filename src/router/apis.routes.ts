
// src/router/apis.routes.ts
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/apis',
    name: 'apis',
    component: () => import('../views/ApisDashboard.vue')
  }
];

export default routes;
