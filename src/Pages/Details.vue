<template>
    <div v-if="loading">Chargement...</div>
    <div v-else>
      <div v-if="products.length > 0">
        <div v-for="product in products" :key="product.id" class="flex gap-8 bg-gray-100 p-6 rounded-lg">
          <!-- Image du produit -->
          <img :src="selectedImage" alt="Product image" class="w-1/3 rounded-lg shadow-md" />
  
          <!-- Détails du produit -->
          <div class="w-2/3">
            <h2 class="text-2xl font-semibold">{{ product.title }}</h2>
            <p class="text-xl font-bold text-gray-700">CAD $ {{ selectedVariant?.price }}</p>
  
            <!-- Sélection de la couleur -->
            <div class="mt-4">
              <p class="font-semibold">Color: {{ selectedColor }}</p>
              <div class="flex gap-2 mt-2">
                <button 
                  v-for="(image, color) in colorImages" 
                  :key="color" 
                  @click="selectColor(color)"
                  :style="{ backgroundColor: color }"
                  class="w-6 h-6 rounded-full border-2"
                  :class="{ 'border-black': selectedColor === color }"
                ></button>
              </div>
            </div>
  
            <!-- Sélection de la taille -->
            <div class="mt-4">
              <p class="font-semibold">Size:</p>
              <div class="flex gap-2 mt-2">
                <button 
                  v-for="size in availableSizes" 
                  :key="size" 
                  @click="selectedSize = size"
                  class="px-4 py-2 border rounded-lg text-sm font-semibold"
                  :class="{ 'bg-black text-white': selectedSize === size }"
                >
                  {{ size }}
                </button>
              </div>
            </div>
  
            <!-- Boutons d'achat -->
            <div class="mt-6 flex gap-4">
              <button class="bg-black text-white px-6 py-2 rounded-lg font-semibold">BUY NOW</button>
              <button class="border px-6 py-2 rounded-lg font-semibold">ADD TO CART</button>
            </div>
  
            <!-- Description -->
            <div class="mt-4">
              <p class="font-semibold text-lg">Description</p>
              <p class="text-gray-600">{{ product.description }}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Aucun produit trouvé.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  
  const route = useRoute();
  const products = ref([]);
  const loading = ref(true);
  
  // Données de sélection dynamique
  const selectedColor = ref("");
  const selectedSize = ref("");
  const selectedImage = ref(""); // Image dynamique
  const selectedVariant = ref(null);
  const colorImages = ref({});
  const availableSizes = ref([]);
  
  const selectColor = (color) => {
    selectedColor.value = color;
    selectedImage.value = colorImages.value[color]; // Changer l'image en fonction de la couleur
    updateAvailableSizes(color); // Mettre à jour les tailles disponibles
  };
  
  // Mettre à jour les tailles selon la couleur sélectionnée
  const updateAvailableSizes = (color) => {
    const variants = products.value[0]?.variants.filter(variant =>
      variant.options.some(opt => opt.name.toLowerCase() === "color" && opt.value === color)
    );
  
    if (variants.length > 0) {
      selectedVariant.value = variants[0]; // Prendre la première variante de cette couleur
      availableSizes.value = [...new Set(variants.map(v => v.options.find(opt => opt.name.toLowerCase() === "size")?.value))];
      selectedSize.value = availableSizes.value[0] || ""; // Sélectionner la première taille
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
          variants(first: 10) {
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
      console.log("Données reçues :", data); // Vérification de la réponse API
  
      if (data?.data?.product) {
        const product = data.data.product;
        const variants = product.variants.edges.map(({ node }) => ({
          id: node.id,
          title: node.title,
          price: node.price.amount,
          currency: node.price.currencyCode,
          image: node.image?.url || product.featuredImage?.url,
          options: node.selectedOptions || [], // Récupération des tailles, couleurs, etc.
        }));
  
        // Extraire les couleurs et tailles disponibles
        const colors = {};
        variants.forEach(variant => {
          const colorOption = variant.options.find(opt => opt.name.toLowerCase() === "color");
          if (colorOption) {
            colors[colorOption.value] = variant.image; // Associer chaque couleur à une image
          }
        });
  
        colorImages.value = colors;
        selectedColor.value = Object.keys(colors)[0] || ""; // Sélectionner la première couleur
        selectedImage.value = colors[selectedColor.value] || product.featuredImage?.url;
  
        products.value = [
          {
            id: product.id,
            title: product.title,
            description: product.description || "Pas de description disponible.",
            image: product.featuredImage?.url || "https://via.placeholder.com/200",
            price: variants[0]?.price || "N/A",
            currency: variants[0]?.currency || "",
            variants,
          },
        ];
  
        updateAvailableSizes(selectedColor.value); // Initialiser les tailles pour la première couleur
      } else {
        console.error("Le produit est introuvable.");
      }
    } catch (error) {
      console.error("Erreur lors du chargement des détails du produit :", error);
    } finally {
      loading.value = false;
    }
  };
  
  onMounted(DetailsCard);
  </script>
  