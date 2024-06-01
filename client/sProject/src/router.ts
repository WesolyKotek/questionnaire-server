import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Main from './components/Main.vue';
import Creating from './components/Creating.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: Main },
  { path: '/creating', component: Creating }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;