<template>
  <div  class="container mx-auto py-10 place-items-center ">
    <!-- Boutons de sélection des collections -->
    <div class="flex flex-wrap gap-2 py-4 justify-start lg:justify-center">
      <button v-for="collection in collections" :key="collection.id" @click="fetchProductsByCollection(collection.id)"
        class="px-4 py-2 rounded-full border flex items-center gap-1 font-semibold" :class="{
          'bg-black text-white': selectedCollection === collection.id,
          'bg-white text-black border-black':
            selectedCollection !== collection.id,
        }">
        <span>{{ collection.title }} ({{ collection.count }})</span>
      </button>
    </div>

    <div v-if="loading" class="text-center text-gray-500">Chargement...</div>

    <div v-else
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 sm:gap-16 md:gap-8 lg:gap-8 w-full justify-items-center ">
      <div v-for="product in displayedProducts" :key="product.id" class="cursor-pointer"
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

    <div class="flex justify-center mt-6">
      <button @click="toggleView" class="px-4 py-2 bg-black text-white rounded-full font-semibold">
        {{ showAll ? "View Less" : "View More" }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from 'vue-router';


const route = useRoute()
const router = useRouter()
const products = ref([]);
const collections = ref([]);
const allProducts = ref([]);
const loading = ref(true);
const selectedCollection = ref(null);
const showAll = ref(false);

const displayedProducts = computed(() => {
  return showAll.value ? products.value : products.value.slice(0, 6);
});

const toggleView = () => {
  showAll.value = !showAll.value;
};

// Récupération des collections et de tous les produits
const fetchCollections = async () => {
  const query = `
    query {
      collections(first: 4) {
        edges {
          node {
            id
            title
            handle
            products(first: 20) {
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
      }
    }
  `;

  const response = await fetch("https://mock.shop/api", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });

  const data = await response.json();
  let totalProducts = [];
  collections.value = data.data.collections.edges.map(({ node }) => {
    const productsInCollection = node.products.edges.map(({ node }) => ({
      id: node.id,
      title: node.title,
      image: node.featuredImage?.url || "",
      price: node.priceRange.minVariantPrice.amount,
      currency: node.priceRange.minVariantPrice.currencyCode,
    }));

    totalProducts = [...totalProducts, ...productsInCollection];

    return {
      id: node.id,
      title: node.title,
      handle: node.handle,
      count: productsInCollection.length,
      products: productsInCollection,
    };
  });

  collections.value.unshift({
    id: "all",
    title: "All",
    count: totalProducts.length,
    products: totalProducts,
  });

  // Charger "All" par défaut
  fetchProductsByCollection("all");
};

// Récupération des produits selon la collection sélectionnée
const fetchProductsByCollection = (collectionId) => {
  loading.value = true;
  selectedCollection.value = collectionId;

  const collection = collections.value.find((c) => c.id === collectionId);
  if (collection) {
    products.value = collection.products;
  } else {
    products.value = [];
  }

  loading.value = false;
};
const DetailView = (ide) => { 
const id=ide.split("/")
router.push(`/details/${id[id.length-1]}`)
  // console.log(ide)
  // const id = ide.split('/')
  // router.push(`/Details/${id[id.length - 1]}`);
};


onMounted(fetchCollections);
</script>
