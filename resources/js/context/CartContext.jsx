import { createContext, useContext, useState, useEffect } from "react";
import { getCart } from "@/utils/cart";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load initial cart from localStorage
  useEffect(() => {
    const initialCart = getCart() || [];
    setCart(initialCart);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("sooth_cart", JSON.stringify(cart));
  }, [cart]);

  // Add item to cart
  const addItemToCart = (newItem) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === newItem.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex].quantity += newItem.quantity || 1;
        return updated;
      }
      return [...prev, { ...newItem, quantity: newItem.quantity || 1 }];
    });
  };

  // Update quantity
  const updateCartItemQuantity = (id, quantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity || 1) } : item
      )
    );
  };

  // Remove item
  const removeItemFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Total quantity
  const totalQuantity = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);

  // Total price
  const getTotalPrice = () =>
    cart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);

  // Refresh cart manually
  const refreshCart = () => setCart(getCart() || []);

  return (
    <CartContext.Provider
      value={{
        cart,
        addItemToCart,
        updateCartItemQuantity,
        removeItemFromCart,
        totalQuantity,
        getTotalPrice,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);