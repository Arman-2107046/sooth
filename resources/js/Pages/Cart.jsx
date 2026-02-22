import Footer from "@/Components/AppComponents/Footer";
import Navbar from "@/Components/AppComponents/Navbar";
import React, { useState, useEffect } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [specialInstructions, setSpecialInstructions] = useState("");

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("sooth_cart");
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        console.log("Loaded cart from localStorage:", parsedCart); // ✅ Debug log
        setCartItems(parsedCart);
      } catch (error) {
        console.error("Error parsing cart JSON:", error);
        setCartItems([]);
      }
    } else {
      console.log("Cart is empty in localStorage");
    }
  }, []);

  // Update quantity
  const updateQuantity = (index, newQuantity) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = newQuantity;
    setCartItems(updatedCart);
    localStorage.setItem("sooth_cart", JSON.stringify(updatedCart));
    console.log("Updated quantity:", updatedCart);
  };

  // Remove item
  const removeItem = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    localStorage.setItem("sooth_cart", JSON.stringify(updatedCart));
    console.log("Removed item, updated cart:", updatedCart);
  };

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  console.log("Total Price:", totalPrice);

  return (
    <>
      <Navbar />

      <section className="min-h-[90vh] py-12 bg-white mt-[4rem]">
        <div className="container px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Your cart</h1>
            <a href="#" className="text-sm font-medium text-gray-600 hover:underline">
              Continue shopping
            </a>
          </div>

          {cartItems.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-lg text-gray-600">Your cart is empty.</p>
            </div>
          ) : (
            <>
              {/* Cart Table Header */}
              <div className="hidden mb-4 border-b md:grid md:grid-cols-3 md:gap-4">
                <div className="text-sm font-medium text-gray-600">PRODUCT</div>
                <div className="text-sm font-medium text-center text-gray-600">QUANTITY</div>
                <div className="text-sm font-medium text-right text-gray-600">TOTAL</div>
              </div>

              {/* Cart Items */}
              <div className="space-y-6">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
                    {/* Product Info */}
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-20 h-20 overflow-hidden border rounded">
                        <img
                          src={item.image || "/images/placeholder.png"} // placeholder if image missing
                          alt={item.name}
                          className="object-cover w-full h-full"
                          onError={(e) => {
                            e.target.src = "/images/placeholder.png";
                            console.log("Image not found for:", item.name);
                          }}
                        />
                      </div>
                      <div>
                        <h3 className="text-base font-medium text-gray-900">{item.name}</h3>
                        <p className="mt-1 text-sm text-gray-600">Tk {item.price.toLocaleString()}</p>
                        {item.size && (
                          <p className="mt-1 text-sm text-gray-600">Size: {item.size}</p>
                        )}
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center justify-center">
                      <div className="inline-flex items-center overflow-hidden border rounded-md">
                        <button
                          className="flex items-center justify-center w-10 h-10 transition-colors bg-gray-50 hover:bg-gray-100"
                          onClick={() => updateQuantity(idx, Math.max(1, item.quantity - 1))}
                        >
                          <span className="text-lg">−</span>
                        </button>
                        <input
                          type="text"
                          className="w-12 h-10 text-sm text-center border-0 focus:ring-0"
                          value={item.quantity}
                          readOnly
                        />
                        <button
                          className="flex items-center justify-center w-10 h-10 transition-colors bg-gray-50 hover:bg-gray-100"
                          onClick={() => updateQuantity(idx, item.quantity + 1)}
                        >
                          <span className="text-lg">+</span>
                        </button>
                      </div>
                      <button
                        className="ml-4 text-gray-400 transition-colors hover:text-gray-600"
                        onClick={() => removeItem(idx)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>

                    {/* Total */}
                    <div className="flex items-center justify-between md:justify-end">
                      <p className="text-base font-medium text-gray-900 md:ml-auto">
                        Tk {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Special Instructions */}
              <div className="mt-12">
                <label className="block mb-3 text-sm font-medium text-gray-700">
                  Order special instructions
                </label>
                <textarea
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="Add any special instructions for your order..."
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-gray-200 focus:outline-none"
                  rows={4}
                />
              </div>

              {/* Estimated Total and Checkout */}
              <div className="flex flex-col items-end mt-12 space-y-4 md:flex-row md:justify-between md:items-center">
                <div className="text-right md:text-left">
                  <p className="text-lg font-medium text-gray-900">
                    Estimated total <span className="font-bold">Tk {totalPrice.toLocaleString()} BDT</span>
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    Tax included. Shipping and discounts calculated at checkout.
                  </p>
                  <p className="mt-2 text-xs text-gray-500">
                    By shopping, you agree to our Terms of Service, Privacy Policy, and Refund Policy.
                  </p>
                </div>

                <button className="w-full px-6 py-3 mt-4 text-sm font-medium text-white transition-colors bg-black rounded-md hover:bg-gray-800 md:w-auto md:mt-0">
                  Check out
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Cart;