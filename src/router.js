import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './Pages/HomePage.vue'; 
import Details from './Pages/Details.vue';
import Cart from './components/Cart/Cart.vue';
import Payement from './components/Payement/Payement.vue';

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
  {
    path: '/payement',
    name: 'Payement',
    component: Payement,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;