<template>
    <div class="container">
      <h1 class="text-2xl font-bold mb-4 font-chllax">You may also like</h1>
      
      <!-- <button 
        @click="fetchProducts" 
        class="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        🔄 Recharger
      </button> -->
  
      <div v-if="loading">Chargement des produits...</div>
  
      <div v-else-if="error">
        <p class="text-red-500">❌ Erreur : {{ error }}</p>
      </div>
  
      <div v-else
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 sm:gap-16 md:gap-8 lg:gap-12 w-full justify-items-center ">
      <div v-for="product in randomProducts " :key="product.id" class="cursor-pointer"
        @click="DetailView(product.id)">
        <div
          class="relative h-100 w-80 xl:w-96 rounded-lg flex flex-col justify-between p-4 group transition-all overflow-hidden"
          :style="{
            backgroundImage: `url(${product.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }">
          <div class="w-full absolute inset-0 bg-b-dark-gray opacity-0 group-hover:opacity-50 transition-opacity duration-300">
          </div>

          <div class="relative z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button class="text-b-black bg-white bg-opacity-50 p-2 rounded-full text-xs font-semibold uppercase">
              Get off 20%
            </button>
          </div>

          <div
            class="relative z-10 flex justify-around mt-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button class="cursor-pointer bg-white text-black rounded-full p-3 font-semibold text-xs flex gap-2">
              <img src="/Icons/cart.svg" alt="Cart" class="w-4 h-4" />
              <p class="uppercase">Add to cart</p>
            </button>
            <button
              class="uppercase cursor-pointer rounded-full p-3 font-semibold text-xs border-2 border-white text-white">
              Buy now
            </button>
          </div>
        </div>

        <div class="text-b-black py-2 mt-1">
          <h2 class="text-2xl font-semibold text-b-black uppercase">
            {{ product.title }}
          </h2>
          <p class="text-sm font-bold text-b-dark-gray">
            {{ product.price }} {{ product.currency }}
          </p>
        </div>
      </div>
    </div>
</div>

  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  
  const products = ref([]);
  const randomProducts = ref([]);
  const loading = ref(true);
  const error = ref(null);
  
  const fetchProducts = async () => {
    loading.value = true;
    error.value = null;
  
    try {
      const query = `query {
        products(first: 50) { 
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
      }`;
  
      const response = await fetch("https://mock.shop/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
  
      const data = await response.json();
      console.log("Données reçues :", data); // DEBUG: Voir la réponse API
  
      if (data?.data?.products) {
        products.value = data.data.products.edges.map(({ node }) => ({
          id: node.id,
          title: node.title,
          image: node.featuredImage?.url || "https://via.placeholder.com/150",
          price: node.priceRange.minVariantPrice.amount,
          currency: node.priceRange.minVariantPrice.currencyCode,
        }));
  
        // Mélange et sélection de 4 produits aléatoires
        randomProducts.value = products.value.sort(() => 0.5 - Math.random()).slice(0, 4);
      } else {
        error.value = "Aucun produit reçu de l'API.";
      }
    } catch (err) {
      error.value = "Erreur lors du chargement des produits : " + err.message;
    } finally {
      loading.value = false;
    }
  };
  
  onMounted(fetchProducts);
  </script>
  