import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './Pages/HomePage.vue'; // Assurez-vous que ce chemin est correct
import HelloWorld from './components/HelloWorld.vue'; // Assurez-vous que ce chemin est correct

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/hello',
    name: 'HelloWorld',
    component: HelloWorld,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;