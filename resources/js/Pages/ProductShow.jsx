import React, { useState } from "react";
import Navbar from "@/Components/AppComponents/Navbar";
import Footer from "@/Components/AppComponents/Footer";
import { motion, AnimatePresence } from "framer-motion";

const ProductShow = ({ product,relatedProducts  }) => {
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
    const [selectedSize, setSelectedSize] = useState(
        product.sizes && product.sizes.length > 0 ? product.sizes[0] : "",
    );
    const [quantity, setQuantity] = useState(1);

    const incrementQuantity = () => setQuantity(quantity + 1);
    const decrementQuantity = () =>
        setQuantity(quantity > 1 ? quantity - 1 : 1);

    return (
        <>
            <Navbar />

            <section className="py-20 bg-white md:px-20 md:py-28">
                <div className="container px-6 mx-auto lg:px-12">
                    <div className="grid items-start grid-cols-1 gap-12 md:grid-cols-2 lg:gap-16">
                        {/* PRODUCT IMAGES */}
                        <div className="space-y-6">
                            <div className="relative p-6 bg-white border rounded-lg shadow-sm h-[450px] md:h-[550px] flex items-center justify-center overflow-hidden">
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
                                        className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-200 ${
                                            selectedImage === img
                                                ? "border-primary shadow-md"
                                                : "border-transparent hover:border-gray-200"
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
  {/* Product Name */}
  <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
    {product.name}
  </h1>

  {/* Price */}
  <p className="text-xl font-semibold text-gray-900">
    Tk {product.price.toLocaleString()} BDT
  </p>
  <p className="text-sm text-gray-500">
    Tax included. Shipping calculated at checkout.
  </p>

  {/* Size Selection */}
  {product.sizes?.length > 0 && (
    <div className="space-y-2">
      <p className="text-sm font-medium text-gray-700">Size</p>
      <div className="flex flex-wrap gap-2">
        {product.sizes.map((size, idx) => (
          <button
            key={idx}
            className={`px-4 py-2 text-sm border rounded-lg transition-colors duration-200 ${
              selectedSize === size
                ? "border-primary bg-primary/5 text-primary"
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => setSelectedSize(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  )}

  {/* Quantity Picker */}
  <div className="space-y-2">
    <p className="text-sm font-medium text-gray-700">Quantity</p>
    <div className="flex items-center gap-4">
      <div className="flex items-center overflow-hidden border ">
        <button
          className="flex items-center justify-center w-10 h-10 "
          onClick={decrementQuantity}
        >
          <span className="text-lg font-semibold">−</span>
        </button>
        <input
          type="number"
          className="w-12 h-10 text-sm text-center border-0 focus:ring-0"
          value={quantity}
          readOnly
        />
        <button
          className="flex items-center justify-center w-10 h-10 "
          onClick={incrementQuantity}
        >
          <span className="text-lg font-semibold">+</span>
        </button>
      </div>
    </div>
  </div>

{/* Action Buttons (Half-width, stacked, styled) */}
<div className="flex flex-col gap-2">
  {/* Add to Cart */}
  <button
    className={`w-1/2 px-5 py-2.5 text-sm font-medium text-black border-2 border-black  transition-transform duration-300 ${
      product.status === "out_of_stock"
        ? "bg-gray-200 cursor-not-allowed border-gray-400 text-gray-500"
        : "bg-white hover:bg-gray-100"
    }`}
    disabled={product.status === "out_of_stock"}
  >
    {product.status === "out_of_stock" ? "Out of Stock" : "Add to Cart"}
  </button>

  {/* Buy It Now */}
  {product.status !== "out_of_stock" && (
    <button className="w-1/2 px-5 py-2.5 text-sm font-medium text-white bg-black  transition-all duration-300 hover:bg-gray-800">
      Buy It Now
    </button>
  )}
</div>

  {/* Product Description */}
  <div className="pt-6 space-y-6 border-t border-gray-200">
    {product.description && (
      <p className="text-base text-gray-700">{product.description}</p>
    )}

    {product.benefits?.length > 0 && (
      <div>
        <h3 className="text-sm font-medium text-gray-900">Benefits:</h3>
        <ul className="pl-4 mt-2 space-y-1 text-sm text-gray-600 list-disc">
          {product.benefits.map((benefit, idx) => (
            <li key={idx}>{benefit}</li>
          ))}
        </ul>
      </div>
    )}

    {product.how_to_use?.length > 0 && (
      <div>
        <h3 className="text-sm font-medium text-gray-900">How to Use:</h3>
        <ul className="pl-4 mt-2 space-y-1 text-sm text-gray-600 list-disc">
          {product.how_to_use.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ul>
      </div>
    )}

    {product.specifications && (
      <div>
        <h3 className="text-sm font-medium text-gray-900">Specifications:</h3>
        <p className="mt-2 text-sm text-gray-600">{product.specifications}</p>
      </div>
    )}
  </div>
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
          <a
            key={item.id}
            href={`/products/${item.slug}`}
            className="group"
          >
            <div className="overflow-hidden bg-white border ">
              <img
                src={item.image}
                alt={item.name}
                className="object-cover w-full h-56 transition-transform duration-300 group-hover:scale-105"
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

            <Footer />
        </>
    );
};

export default ProductShow;
