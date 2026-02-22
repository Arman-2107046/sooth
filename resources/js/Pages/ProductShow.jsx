import React, { useState } from "react";
import Navbar from "@/Components/AppComponents/Navbar";
import Footer from "@/Components/AppComponents/Footer";
import MiniCart from "@/Components/AppComponents/MiniCart";
import { motion, AnimatePresence } from "framer-motion";
import { addToCart } from "@/utils/cart";

const ProductShow = ({ product, relatedProducts }) => {
  // If product is not loaded
  if (!product || !product.images || product.images.length === 0) {
    return (
      <>
        <Navbar />
        <div className="py-24 text-center md:py-32 bg-gray-50">
          <p className="text-xl font-semibold text-gray-700">
            Loading product details...
          </p>
        </div>
        <Footer />
      </>
    );
  }

  // State hooks
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [miniCartItem, setMiniCartItem] = useState(null); // ✅ mini cart state

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () =>
    setQuantity(quantity > 1 ? quantity - 1 : 1);

  const handleAddToCart = () => {
    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: selectedImage,
    };
    addToCart(item, quantity);
    setMiniCartItem(item); // ✅ show mini cart
  };

  const handleBuyNow = () => {
    handleAddToCart();
    window.location.href = "/checkout";
  };

  return (
    <>
      <Navbar />

      <section className="py-20 bg-white md:px-20 md:py-28">
        <div className="container px-6 mx-auto lg:px-12">
          <div className="grid items-start grid-cols-1 gap-12 md:grid-cols-2 lg:gap-16">
            {/* PRODUCT IMAGES */}
            <div className="space-y-6">
              <div className="relative p-6 bg-white border shadow-sm h-[450px] md:h-[550px] flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    src={selectedImage}
                    alt={product.name}
                    className="object-contain w-full h-full max-w-xs mx-auto md:max-w-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 pb-2 overflow-x-auto">
                {product.images.map((img, idx) => (
                  <motion.div
                    key={idx}
                    className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 overflow-hidden cursor-pointer border-2 transition-all ${
                      selectedImage === img
                        ? "border-black"
                        : "border-transparent hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedImage(img)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* PRODUCT DETAILS */}
            <div className="max-w-xl space-y-6">
              <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                {product.name}
              </h1>

              <p className="text-xl font-semibold text-gray-900">
                Tk {product.price.toLocaleString()} BDT
              </p>

              <p className="text-sm text-gray-500">
                Tax included. Shipping calculated at checkout.
              </p>

              {/* Quantity */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Quantity</p>
                <div className="flex items-center border w-fit">
                  <button className="w-10 h-10 text-lg" onClick={decrementQuantity}>
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    readOnly
                    className="w-12 h-10 text-center border-0 focus:ring-0"
                  />
                  <button className="w-10 h-10 text-lg" onClick={incrementQuantity}>
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2">
                <button
                  className={`w-1/2 px-5 py-2.5 text-sm font-medium border-2 border-black ${
                    product.status === "out_of_stock"
                      ? "bg-gray-200 cursor-not-allowed text-gray-500 border-gray-400"
                      : "bg-white text-black hover:bg-gray-100"
                  }`}
                  disabled={product.status === "out_of_stock"}
                  onClick={handleAddToCart}
                >
                  {product.status === "out_of_stock" ? "Out of Stock" : "Add to Cart"}
                </button>

                {product.status !== "out_of_stock" && (
                  <button
                    className="w-1/2 px-5 py-2.5 text-sm font-medium text-white bg-black hover:bg-gray-800"
                    onClick={handleBuyNow}
                  >
                    Buy It Now
                  </button>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <div className="pt-6 border-t">
                  <p className="text-gray-700">{product.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts?.length > 0 && (
          <section className="py-20 bg-gray-50">
            <div className="container px-6 mx-auto lg:px-12">
              <h2 className="mb-8 text-xl font-semibold text-gray-900">
                You may also like
              </h2>

              <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                {relatedProducts.map((item) => (
                  <a key={item.id} href={`/products/${item.slug}`} className="group">
                    <div className="overflow-hidden bg-white border">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="object-cover w-full h-56 transition-transform group-hover:scale-105"
                      />
                    </div>

                    <div className="mt-3 space-y-1">
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                        {item.name}
                      </h3>
                      <p className="text-sm font-semibold text-gray-800">
                        Tk {item.price.toLocaleString()} BDT
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}
      </section>

      {/* Mini Cart */}
      {miniCartItem && (
        <MiniCart addedItem={miniCartItem} onClose={() => setMiniCartItem(null)} />
      )}

      <Footer />
    </>
  );
};

export default ProductShow;