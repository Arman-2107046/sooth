const CART_KEY = "sooth_cart";

/* Get cart */
export const getCart = () => {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
};

/* Save cart */
const saveCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

/* Add to cart */
export const addToCart = (product, quantity = 1) => {
  const cart = getCart();

  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image, // ✅ save the actual image here
    });
  }

  console.log("Cart after adding:", cart); // debug log
  saveCart(cart);
};

/* Update quantity */
export const updateCartItemQuantity = (id, quantity) => {
  const cart = getCart().map((item) =>
    item.id === id ? { ...item, quantity } : item
  );
  console.log("Cart after update:", cart); // debug log
  saveCart(cart);
};

/* Remove item */
export const removeFromCart = (id) => {
  const cart = getCart().filter((item) => item.id !== id);
  console.log("Cart after remove:", cart); // debug log
  saveCart(cart);
};

/* Clear cart */
export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
  console.log("Cart cleared"); // debug log
};

/* Cart totals */
export const getCartTotals = () => {
  const cart = getCart();

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  console.log("Cart totals:", { totalQuantity, totalPrice }); // debug log
  return { totalQuantity, totalPrice };
};