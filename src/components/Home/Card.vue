<template>
    <div class="container mx-auto py-10">
      <h1 class="text-3xl font-bold text-center mb-8">Produits</h1>
  
      <div v-if="loading" class="text-center">Chargement...</div>
  
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="product in products"
          :key="product.id"
          class="relative bg-cover bg-center h-80 rounded-lg flex items-end p-4 shadow-lg hover:bg-b-dark-gray"
          :style="{ backgroundImage: `url(${product.image})` }"
        >
          <div class=" bg-opacity-50 text-black p-4 rounded-md w-full">
            <h2 class="text-lg font-semibold">{{ product.title }}</h2>
            <p class="text-lg font-bold mt-2">{{ product.price }} </p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  
  const products = ref([]);
  const loading = ref(true);
  
  const fetchProducts = async () => {
    const query = `
      query {
        products(first: 6) {
          edges {
            node {
              id
              title
              featuredImage {
                url
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    `;
  
    const response = await fetch("https://mock.shop/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });
  
    const data = await response.json();
    products.value = data.data.products.edges.map(({ node }) => ({
      id: node.id,
      title: node.title,
      image: node.featuredImage?.url,
      price: node.priceRange.minVariantPrice.amount,
      currency: node.priceRange.minVariantPrice.currencyCode,
    }));
    loading.value = false;
  };
  
  onMounted(fetchProducts);
  </script>
  