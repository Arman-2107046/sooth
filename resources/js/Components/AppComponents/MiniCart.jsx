import React, { useState, useEffect } from "react";
import { getCart } from "@/utils/cart";

const MiniCart = ({ addedItem, onClose }) => {
  const [cart, setCart] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0); // ✅ total quantity

  useEffect(() => {
    const currentCart = getCart();
    setCart(currentCart);

    // Calculate total quantity
    const total = currentCart.reduce((sum, item) => sum + item.quantity, 0);
    setTotalQuantity(total);
  }, [addedItem]); // recalc whenever a new item is added

  if (!addedItem) return null; // don't show if no item added

  return (
    <div className="fixed z-50 p-4 bg-white border rounded-md shadow-lg top-5 right-5 w-80 animate-slide-in">
      <button
        className="absolute text-gray-500 top-2 right-2 hover:text-gray-700"
        onClick={onClose}
      >
        ✕
      </button>

      <div className="flex gap-3">
        <div className="w-20 h-20 overflow-hidden border rounded">
          <img
            src={addedItem.image}
            alt={addedItem.name}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex flex-col justify-center flex-1">
          <p className="text-sm text-gray-700">{addedItem.name}</p>
          <p className="mt-1 text-xs text-gray-500">
            Total items in cart: {totalQuantity} {/* ✅ show total quantity */}
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <a
          href="/cart"
          className="block w-full px-4 py-2 text-center border rounded hover:bg-gray-100"
        >
          View Cart ({totalQuantity})
        </a>
        <a
          href="/checkout"
          className="block w-full px-4 py-2 text-center text-white bg-black rounded hover:bg-gray-800"
        >
          Check out
        </a>
        <button
          className="block w-full px-4 py-2 text-sm text-center text-gray-600 underline"
          onClick={onClose}
        >
          Continue shopping
        </button>
      </div>
    </div>
  );
};

export default MiniCart;