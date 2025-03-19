<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold font-chllax">Cart ({{ cartItems.length }})</h1>
      <button @click="clearCart" class="text-gray-600 hover:text-gray-800">
        Clear Cart
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2">
        <div v-if="cartItems.length === 0" class="text-center py-8">
          <p class="text-gray-500">Your cart is empty</p>
        </div>
        <div v-else class="space-y-4">
          <div v-for="item in cartItems" :key="item.id" class="flex items-center bg-white p-4 rounded-lg shadow">
            <img :src="item.image" :alt="item.title" class="w-24 h-24 object-cover rounded-md">
            <div class="ml-4 flex-grow">
              <h3 class="text-lg font-semibold">{{ item.title }}</h3>
              <p class="text-gray-600">Size: {{ item.size }}</p>
              <p class="text-gray-800 font-bold">{{ item.price }} {{ item.currency }}</p>
            </div>
            <div class="flex items-center space-x-2">
              <button @click="decrementQuantity(item)" class="p-1 rounded-full bg-gray-100 hover:bg-gray-200">
                <span class="w-6 h-6 flex items-center justify-center">-</span>
              </button>
              <span class="w-8 text-center">{{ item.quantity }}</span>
              <button @click="incrementQuantity(item)" class="p-1 rounded-full bg-gray-100 hover:bg-gray-200">
                <span class="w-6 h-6 flex items-center justify-center">+</span>
              </button>
              <button @click="removeItem(item)" class="ml-4">
                <img src="/Icons/cart.svg" alt="Remove" class="w-5 h-5">
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="lg:col-span-1">
        <div class="bg-white p-6 rounded-lg shadow">
          <h2 class="text-xl font-semibold mb-4">Order summary</h2>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span>Subtotal</span>
              <span>${{ subtotal.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between">
              <span>Discount</span>
              <span>${{ discount.toFixed(2) }}</span>
            </div>
            <div class="border-t pt-2 mt-2">
              <div class="flex justify-between font-bold">
                <span>Order total</span>
                <span>${{ total.toFixed(2) }}</span>
              </div>
            </div>
          </div>
          <button @click="checkout" class="w-full bg-black text-white py-3 rounded-lg mt-6 hover:bg-gray-800 transition-colors">
            Checkout now
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const cartItems = ref([]);

// Computed properties for order summary
const subtotal = computed(() => {
  return cartItems.value.reduce((total, item) => {
    return total + (parseFloat(item.price) * item.quantity);
  }, 0);
});

const discount = computed(() => {
  // Apply 20% discount if cart has items
  return cartItems.value.length > 0 ? subtotal.value * 0.2 : 0;
});

const total = computed(() => {
  return subtotal.value - discount.value;
});

// Cart operations
const incrementQuantity = (item) => {
  item.quantity++;
};

const decrementQuantity = (item) => {
  if (item.quantity > 1) {
    item.quantity--;
  }
};

const removeItem = (item) => {
  const index = cartItems.value.indexOf(item);
  if (index > -1) {
    cartItems.value.splice(index, 1);
  }
};

const clearCart = () => {
  cartItems.value = [];
};

const checkout = () => {
  // Implement checkout logic here
  console.log('Proceeding to checkout...');
};

// Initialize with some sample data (remove this in production)
cartItems.value = [
  {
    id: 1,
    title: 'Slides',
    size: 'Small',
    price: '25.0',
    currency: 'USD',
    quantity: 1,
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 2,
    title: 'Sweatpants',
    size: 'Small',
    price: '35.0',
    currency: 'USD',
    quantity: 1,
    image: 'https://via.placeholder.com/150'
  }
];
</script>
