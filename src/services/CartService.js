// services/cartService.js
import { ref } from "vue";

const cartItems = ref([]);

export const useCart = () => {
  const addToCart = (item) => {
    const existingItem = cartItems.value.find(
      (cartItem) => cartItem.id === item.id && cartItem.size === item.size
    );

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cartItems.value.push({ ...item, quantity: 1 });
    }
  };

  const removeFromCart = (item) => {
    cartItems.value = cartItems.value.filter(
      (cartItem) => cartItem.id !== item.id || cartItem.size !== item.size
    );
  };

  const clearCart = () => {
    cartItems.value = [];
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
  };
};
