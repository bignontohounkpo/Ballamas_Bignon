<template>
 <div>
    <Navbar />
    <router-view /> 
    <Footer/>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'; 
import Footer from './components/Footer.vue'; 
// import HomePage from './Pages/HomePage.vue';
</script>
<style scoped>
</style>