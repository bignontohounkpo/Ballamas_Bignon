<template>
  <div class="container">
    <div v-if="loading">Chargement...</div>
    <div v-else>
      <div v-if="products.length > 0">
        <div v-for="product in products" :key="product.id" class="lg:justify-start justify-center flex-wrap flex lg:flex-nowrap gap-5 lg:items-center p-6 rounded-lg">
          <img :src="selectedImage" alt="Product image" class="lg:w-1/3 w-3/3 rounded-xl" />

          <div class="w-3/3">
            <h2 class="text-2xl font-semibold">{{ product.title }}</h2>
            <p class="text-xl font-bold text-gray-700">CAD ${{ selectedVariant?.price }}</p>

            <div class="mt-4">
              <p class="font-semibold text-2xl">Color: {{ selectedColor }}</p>
              <div class="flex gap-2 mt-2">
                <button v-for="(image, color) in colorImages" :key="color" @click="selectColor(color)"
                  :style="{ backgroundColor: color }" class="w-6 h-6 rounded-full border-2"
                  :class="{ 'border-black': selectedColor === color }">
                </button>
              </div>
            </div>

            <div class="mt-4">
              <p class="font-semibold text-2xl">Size:</p>
              <div class="flex gap-2 mt-2">
                <button v-for="size in availableSizes" :key="size" @click="selectedSize = size"
                  class="px-4 py-2 border rounded-lg text-sm font-semibold"
                  :class="{ 'bg-black text-white': selectedSize === size }">
                  {{ size }}
                </button>
              </div>
            </div>

            <div class="mt-6 flex gap-4">
              <button @click="achat" class="bg-black text-white px-6 py-2 rounded-lg font-semibold">BUY NOW</button>
              <button @click="toggleCart" class="border px-6 py-2 rounded-lg font-semibold">
                {{ isInCart ? 'VIEW CART' : 'ADD TO CART' }}
              </button>
            </div>

            <div class="mt-4">
              <p class="font-semibold text-2xl">Description</p>
              <p class="text-b-black text-xl">{{ product.description }}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Aucun produit trouvé.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const products = ref([]);
const loading = ref(true);
const selectedColor = ref("");
const selectedSize = ref("");
const selectedImage = ref("");
const selectedVariant = ref(null);
const colorImages = ref({});
const availableSizes = ref([]);
const isInCart = ref(false);
const cartItems = ref([]);

const selectColor = (color) => {
  selectedColor.value = color;
  selectedImage.value = colorImages.value[color];
  updateAvailableSizes(color);
};

const updateAvailableSizes = (color) => {
  const variants = products.value[0]?.variants.filter(variant =>
    variant.options.some(opt => opt.name.toLowerCase() === "color" && opt.value === color)
  );
  if (variants.length > 0) {
    selectedVariant.value = variants[0];
    availableSizes.value = [...new Set(variants.map(v => v.options.find(opt => opt.name.toLowerCase() === "size")?.value))];
    selectedSize.value = availableSizes.value[0] || "";
  }
};

// ✅ Fonction pour sauvegarder les détails du produit dans le localStorage
const saveProductDetails = () => {
  if (products.value.length > 0 && selectedVariant.value) {
    const productDetails = {
      id:products.value[0].id,
      title: products.title,
      image: selectedImage.value,
      price: selectedVariant.value.price,
      color: selectedColor.value,
      size: selectedSize.value,
    };

    // Stocker les détails dans le localStorage
    localStorage.setItem("productDetails", JSON.stringify(productDetails));
  }
};

const toggleCart = () => {
  const existingCart = JSON.parse(localStorage.getItem("cartItems")) || []; // 🔥 Récupérer l'ancien panier
  
  if (!isInCart.value) {
    const newItem = {
      id: products.value[0].id,
      title: products.value[0].title,
      size: selectedSize.value,
      price: selectedVariant.value?.price,
      currency: "CAD",
      quantity: 1,
      image: selectedImage.value
    };

    existingCart.push(newItem); // 🔥 Ajouter au panier existant
    localStorage.setItem("cartItems", JSON.stringify(existingCart)); // 🔥 Sauvegarder sans écraser
    isInCart.value = true;
  } else {
    saveProductDetails();
    router.push("/cart");
  }
};

const DetailsCard = async () => {
  try {
    const query = `query {
      product(id: "gid://shopify/Product/${route.params.id}") {
        id
        title
        description
        featuredImage {
          url
        }
        variants(first: 4) {
          edges {
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
              selectedOptions {
                name
                value
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
    if (data?.data?.product) {
      const product = data.data.product;
      const variants = product.variants.edges.map(({ node }) => ({
        id: node.id,
        title: node.title,
        price: node.price.amount,
        currency: node.price.currencyCode,
        image: node.image?.url || product.featuredImage?.url,
        options: node.selectedOptions || [],
      }));

      const colors = {};
      variants.forEach(variant => {
        const colorOption = variant.options.find(opt => opt.name.toLowerCase() === "color");
        if (colorOption) {
          colors[colorOption.value] = variant.image;
        }
      });

      colorImages.value = colors;
      selectedColor.value = Object.keys(colors)[0] || "";
      selectedImage.value = colors[selectedColor.value] || product.featuredImage?.url;

      products.value = [{
        id: product.id,
        title: product.title,
        description: product.description || "Pas de description disponible.",
        image: product.featuredImage?.url || "https://via.placeholder.com/200",
        price: variants[0]?.price || "N/A",
        currency: variants[0]?.currency || "" ,
        variants,
      }];

      updateAvailableSizes(selectedColor.value);
    } else {
      console.error("Le produit est introuvable.");
    }
  } catch (error) {
    console.error("Erreur lors du chargement des détails du produit :", error);
  } finally {
    loading.value = false;
  }
};
const achat= ()=> {
 router.push('/payement')
}

onMounted(DetailsCard);
</script>
