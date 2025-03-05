import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './Pages/HomePage.vue'; 
import Details from './Pages/Details.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/details/:id',
    name: 'Details',
    component: Details,
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;