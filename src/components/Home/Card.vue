<template>
  <div class="container mx-auto py-10 place-items-center">
    <h1 class="text-3xl font-bold text-center mb-8">Produits</h1>

    <div v-if="loading" class="text-center text-gray-500">Chargement...</div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6 justify-items-center">
      <div v-for="product in products" :key="product.id">
        <!-- Carte du produit -->
        <div
          class=" relative h-80 w-80 rounded-lg flex flex-col justify-between p-4 group transition-all overflow-hidden"
          :style="{ backgroundImage: `url(${product.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
        >
          <!-- Overlay semi-transparent qui ne masque pas complètement l'image -->
          <div
            class="absolute inset-0 bg-b-dark-gray opacity-0 group-hover:opacity-50 transition-opacity duration-300"
          ></div>

          <!-- Texte en haut à gauche -->
          <div
            class="relative z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <button class="text-b-black bg-white bg-opacity-50 p-2 rounded-full text-xs font-semibold">
              GET OFF 20%
            </button>
          </div>

          <!-- Boutons en bas -->
          <div
            class="relative z-10 flex justify-around mt-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <button class="cursor-pointer bg-white text-black rounded-full p-3 font-semibold text-xs flex gap-2">
              <img src="/Icons/cart.svg" alt="Cart" class="w-4 h-4" />
              <p>ADD TO CART</p>
            </button>
            <button class="cursor-pointer rounded-full p-3 font-semibold text-xs border-2 border-white text-white">
              BUY NOW
            </button>
          </div>
        </div>

        <!-- Description du produit -->
        <div class="text-black py-2  mt-1">
          <h2 class="text-2xl font-semibold text-b-black uppercase">{{ product.title }}</h2>
          <p class="text-sm font-bold  text-b-dark-gray">{{ product.price }} {{ product.currency }}</p>
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
