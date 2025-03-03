<template>
  <div class="container mx-auto py-10 place-items-center">
    <h1 class="text-3xl font-bold text-center mb-8">Produits</h1>

    <!-- Boutons de sélection des collections -->
    <div class="flex gap-3 py-4 justify-center">
      <button
        v-for="collection in collections"
        :key="collection.id"
        @click="fetchProductsByCollection(collection.id)"
        class="px-4 py-2 rounded-full border flex items-center gap-1 font-semibold"
        :class="{
          'bg-black text-white': selectedCollection === collection.id,
          'bg-white text-black border-black': selectedCollection !== collection.id
        }"
      >
        <span>{{ collection.title }}</span>
      </button>
    </div>

    <div v-if="loading" class="text-center text-gray-500">Chargement...</div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6 justify-items-center">
      <div v-for="product in displayedProducts" :key="product.id">
        <div
          class="relative h-100 w-100 rounded-lg flex flex-col justify-between p-4 group transition-all overflow-hidden"
          :style="{ backgroundImage: `url(${product.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }">
          <div class="absolute inset-0 bg-b-dark-gray opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>

          <div class="relative z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button class="text-b-black bg-white bg-opacity-50 p-2 rounded-full text-xs font-semibold uppercase">
              Get off 20%
            </button>
          </div>

          <div class="relative z-10 flex justify-around mt-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button class="cursor-pointer bg-white text-black rounded-full p-3 font-semibold text-xs flex gap-2">
              <img src="/Icons/cart.svg" alt="Cart" class="w-4 h-4" />
              <p class="uppercase">Add to cart</p>
            </button>
            <button class="uppercase cursor-pointer rounded-full p-3 font-semibold text-xs border-2 border-white text-white">
              Buy now
            </button>
          </div>
        </div>

        <div class="text-b-black py-2 mt-1">
          <h2 class="text-2xl font-semibold text-b-black uppercase">{{ product.title }}</h2>
          <p class="text-sm font-bold text-b-dark-gray">{{ product.price }} {{ product.currency }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";

const products = ref([]);
const collections = ref([]);
const loading = ref(true);
const selectedCollection = ref(null);

// Retourne les produits affichés en fonction de l'état de showAll
const displayedProducts = computed(() => {
  return products.value;
});

// Récupération des collections depuis Mock.shop
const fetchCollections = async () => {
  const query = `
    query {
      collections(first: 10) {
        edges {
          node {
            id
            title
            handle
          }
        }
      }
    }
  `;

  const response = await fetch("https://mock.shop/api", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });

  const data = await response.json();
  collections.value = data.data.collections.edges.map(({ node }) => ({
    id: node.id,
    title: node.title,
    handle: node.handle
  }));

  // Charger la première collection par défaut
  if (collections.value.length > 0) {
    fetchProductsByCollection(collections.value[0].id);
  }
};

// Récupération des produits selon la collection sélectionnée
const fetchProductsByCollection = async (collectionId) => {
  loading.value = true;
  selectedCollection.value = collectionId;

  const query = `
    query {
      collection(id: "${collectionId}") {
        products(first: 10) {
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
    }
  `;

  const response = await fetch("https://mock.shop/api", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });

  const data = await response.json();
  products.value = data.data.collection.products.edges.map(({ node }) => ({
    id: node.id,
    title: node.title,
    image: node.featuredImage?.url || '',
    price: node.priceRange.minVariantPrice.amount,
    currency: node.priceRange.minVariantPrice.currencyCode,
  }));

  loading.value = false;
};

// Charger les collections au démarrage
onMounted(fetchCollections);
</script>
