// cart.js
const CART_KEY = "sooth_cart";

/* Get cart from localStorage */
export const getCart = () => {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
};

/* Save cart to localStorage */
const saveCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

/* Add item to cart */
export const addToCart = (product, quantity) => {
  if (!product.size || product.size.trim() === "") {
    alert("Please select a size before adding to cart!");
    return;
  }

  const cart = getCart();

  const qty = quantity || product.quantity || 1;

  // Check if same product + size exists
  const existingItem = cart.find(
    (item) => item.id === product.id && item.size === product.size
  );

  if (existingItem) {
    existingItem.quantity += qty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: product.size,
      quantity: qty,
    });
  }

  console.log("Cart after adding:", cart);
  saveCart(cart);
};

/* Update quantity of an item (by id + size) */
export const updateCartItemQuantity = (id, size, quantity) => {
  const cart = getCart().map((item) =>
    item.id === id && item.size === size ? { ...item, quantity } : item
  );
  saveCart(cart);
};

/* Remove item (by id + size) */
export const removeFromCart = (id, size) => {
  const cart = getCart().filter(
    (item) => !(item.id === id && item.size === size)
  );
  saveCart(cart);
};

/* Clear entire cart */
export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
};

/* Get cart totals */
export const getCartTotals = () => {
  const cart = getCart();
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return { totalQuantity, totalPrice };
};






// // cart.js
// const CART_KEY = "sooth_cart";

// /* Get cart from localStorage */
// export const getCart = () => {
//   return JSON.parse(localStorage.getItem(CART_KEY)) || [];
// };

// /* Save cart to localStorage */
// const saveCart = (cart) => {
//   localStorage.setItem(CART_KEY, JSON.stringify(cart));
// };

// /* Add item to cart */
// export const addToCart = (product, quantity = 1) => {
//   // Ensure size is selected
//   if (!product.size) {
//     alert("Please select a size before adding to cart!");
//     return;
//   }

//   const cart = getCart();

//   // Check if same product + size already exists
//   const existingItem = cart.find(
//     (item) => item.id === product.id && item.size === product.size
//   );

//   if (existingItem) {
//     existingItem.quantity += quantity;
//   } else {
//     cart.push({
//       id: product.id,
//       name: product.name,
//       price: product.price,
//       quantity,
//       image: product.image,
//       size: product.size, // ✅ store the size
//     });
//   }

//   console.log("Cart after adding:", cart); // debug log
//   saveCart(cart);
// };

// /* Update quantity of an item (by id + size) */
// export const updateCartItemQuantity = (id, size, quantity) => {
//   const cart = getCart().map((item) =>
//     item.id === id && item.size === size ? { ...item, quantity } : item
//   );

//   console.log("Cart after update:", cart); // debug log
//   saveCart(cart);
// };

// /* Remove item (by id + size) */
// export const removeFromCart = (id, size) => {
//   const cart = getCart().filter(
//     (item) => !(item.id === id && item.size === size)
//   );

//   console.log("Cart after remove:", cart); // debug log
//   saveCart(cart);
// };

// /* Clear entire cart */
// export const clearCart = () => {
//   localStorage.removeItem(CART_KEY);
//   console.log("Cart cleared"); // debug log
// };

// /* Get cart totals */
// export const getCartTotals = () => {
//   const cart = getCart();

//   const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
//   const totalPrice = cart.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   console.log("Cart totals:", { totalQuantity, totalPrice }); // debug log
//   return { totalQuantity, totalPrice };
// };







