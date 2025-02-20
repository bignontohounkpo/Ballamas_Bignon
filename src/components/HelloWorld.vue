<script setup>
import { ref } from 'vue'
import Navbar from './Navbar.vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <Navbar />
</template>

<style scoped>

</style>
