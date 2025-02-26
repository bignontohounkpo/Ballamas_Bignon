<template>
  <div class="container mx-auto py-10">
    <h1 class="text-3xl font-bold text-center mb-8">Produits</h1>

    <div v-if="loading" class="text-center">Chargement...</div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 rounded-lg ">
      <div
        v-for="product in products"
        :key="product.id"
      >


      <div class=" bg-b-light-gray relative bg-cover bg-center h-80 w-80 rounded-lg flex flex-col justify-between p-4  hover:bg-red-500 transition-all group"  :style="{ backgroundImage: `url(${product.image})` }">
        <div
          class="top-left-text opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <button class="text-b-black bg-white bg-opacity-50 p-2 rounded-full">GET OFF 20%</button>
        </div>

        <div
          class="button-container opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          <button class="btn">Ajouter au Panier</button>
          <button class="btn">Voir Détails</button>
        </div>
      </div>
        
        <div class="bg-opacity-50 text-black p-4 rounded-md w-full mt-auto">
          <h2 class="text-lg font-semibold">{{ product.title }}</h2>
          <p class="text-lg font-bold mt-2">
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
//   console.log(data)
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

<style scoped>
.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.btn {
  background-color: white;
  border: 1px solid #000;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
}

.top-left-text {
  margin: 10px;

}
.overlay{
    position:absolute;
    background-color: rgb(0, 0, 0, 0.); /* Arrière-plan semi-transparent */

}

.card:hover .button-container {
  opacity: 1;
  
}

.group:hover .top-left-text {
  opacity: 1;
}
</style>
