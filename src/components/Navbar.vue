<template>
  <div class=" ">
    <div class="bg-black text-white text-center py-2 font-archivo text-xs">
      Sign up and get 20% off for all new arrivals collections
    </div>
    <nav
      class="container pt-5 pb-5 border-b-2 border-b-gray-400 flex justify-between"
    >
      <div class="flex gap-6">
        <button @click="toggleMenu" class="lg:hidden">
          <img
            :src="
              openmenu
                ? '/Icons/hambuger-menu (1).svg'
                : '/Icons/hambuger-menu.svg'
            "
            alt="Menu"
            class="w-6 h-6"
          />
        </button>
      </div>

      <div
        v-if="openmenu"
        class="absolute top-30 left-0 right-0 bg-white text-black transition-all duration-500 ease-in-out"
      >
        <div class="flex flex-col items-center py-4 lg:hidden">
          <a to="/" class="font-archivo py-4">Men </a>
          <a to="/hello" class="font-chillax py-2">Women</a>
          <a to="/hello" class="font-archivo py-2">Kids</a>
          <a to="/hello" class="font-archivo py-2">Collections</a>
          <a to="/hello" class="font-archivo py-2">Shop</a>
          <a to="/hello" class="font-archivo py-2">About Us</a>
          <a to="/hello" class="font-archivo py-2">Cart(0)</a>
          <div class="flex justify-between py-2">
            <img src="/Icons/Connexion.svg" class="w-6 h-6" alt="" />
            <p>Account</p>
          </div>
          <a to="/hello" class="font-archivo py-2">FAQ</a>
          <a to="/hello" class="font-archivo py-2">Contact</a>
        </div>
      </div>
      <div class="lg:flex gap-6 hidden">
        <a to="/" class="font-archivo">Men </a>
        <a to="/hello" class="font-chillax">Women</a>
        <a to="/hello" class="font-archivo">Kids</a>
        <a to="/hello" class="font-archivo">Collections</a>
      </div>
      <p class="navbar-logo text-3xl text-white font-chillax">BALLAMAS</p>
      <div class="lg:flex gap-4 hidden">
        <a to="/hello" class="font-archivo">Shop</a>
        <a to="/hello" class="font-archivo">About Us</a>
        <div class="flex justify-between">
          <img src="/Icons/Connexion.svg" class="w-6 h-6" alt="" />
          <p>Account</p>
        </div>
        <a to="/hello" class="font-archivo">Cart(0)</a>
        <img src="/Icons/rechercher.svg " class="w-6 h-6" alt="" />
        <a to="/hello" class="font-archivo lg:hidden">FAQ</a>
        <a to="/hello" class="font-archivo lg:hidden">Contact</a>
      </div>

      <div class="flex gap-6 lg:hidden">
        <img src="/Icons/rechercher.svg " class="w-6 h-6" alt="" />
        <img src="/Icons/panier.svg " class="w-6 h-6 lg:hidden" alt="" />
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref } from "vue";
const openmenu = ref(false);

const toggleMenu = () => {
  openmenu.value = !openmenu.value;
};
</script>

<style>
.navbar-logo {
  color: transparent !important;
  -webkit-text-stroke: 0.5px #1d1d1d !important;
}
</style>
