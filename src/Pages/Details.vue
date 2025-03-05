<template>
<div v-if="loading">Chargement...</div>
    <div v-else>
      <div v-for="product in products" :key="product.id">
        <h2>{{ product.title }}</h2>
        <p>{{ product.description }}</p>
        <img :src="product.image" alt="Product image" width="200" />
        <p>Prix: {{ product.price }} {{ product.currency }}</p>
      </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const products=ref([])
const DetailsCard =async()=>{
    const query=`
    query{
    
  product(id: "gid://shopify/Product/7982905098262") {
    id
    title
    description
    featuredImage {
      id
      url
    }
    variants(first: 4) {
      edges {
        cursor
        node {
          id
          title
          image {
            url
          }
          price {
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
  const data= await response.json()
  products.value = data.data.products.edges.map(({ node }) => ({
    id: node.id,
    title: node.title,
    description: node.description,
    image: node.featuredImage?.url,
    price: node.priceRange.minVariantPrice.amount,
    currency: node.priceRange.minVariantPrice.currencyCode,
  }));
}
onMounted(DetailsCard);



</script>

<style>

</style>