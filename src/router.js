import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './Pages/HomePage.vue'; 
import Details from './Pages/Details.vue';
import Cart from './components/Cart/Cart.vue';

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
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;