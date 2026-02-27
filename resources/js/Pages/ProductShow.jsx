import React, { useState } from "react";
import Navbar from "@/Components/AppComponents/Navbar";
import Footer from "@/Components/AppComponents/Footer";
import MiniCart from "@/Components/AppComponents/MiniCart";
import { motion, AnimatePresence } from "framer-motion";
import { addToCart } from "@/utils/cart";
import parse from "html-react-parser";

const ProductShow = ({ product, relatedProducts }) => {
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

  const images = product.images.map((img) => `/storage/${img}`);
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [quantity, setQuantity] = useState(1);
  const [miniCartItem, setMiniCartItem] = useState(null);
  const [sizeOpen, setSizeOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  const sizes = [
    "EU XS / US XS",
    "EU S / US S",
    "EU M / US M",
    "EU L / US L",
    "EU XL / US XL",
    "EU XXL / US XXL",
  ];

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeOpen(true);
      alert("Please select a size before adding to cart!");
      return;
    }

    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: selectedImage,
      size: selectedSize,
      quantity,
    };

    addToCart(item, quantity);
    setMiniCartItem(item);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setSizeOpen(true);
      alert("Please select a size before proceeding to checkout!");
      return;
    }
    handleAddToCart();
    window.location.href = "/checkout";
  };

  const hasDiscount = product.old_price && product.old_price > product.price;

  return (
    <>
      <Navbar />

      {/* ───────── PRODUCT DETAILS ───────── */}
      <section className="py-20 bg-white md:px-20 md:py-28">
        <div className="container px-6 mx-auto lg:px-12">
          <div className="grid items-start grid-cols-1 gap-12 md:grid-cols-2 lg:gap-16">
            {/* Product Images */}
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
              <div className="flex gap-3 pb-2 overflow-x-auto">
                {images.map((img, idx) => (
                  <motion.div
                    key={idx}
                    className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 overflow-hidden cursor-pointer transition-all ${
                      selectedImage === img
                        ? "shadow-md shadow-black/80"
                        : "shadow-none hover:shadow-sm hover:shadow-gray-300/80"
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

            {/* Product Details */}
            <div className="max-w-xl space-y-6">
              <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-center gap-3">
                {hasDiscount && (
                  <span className="text-sm text-gray-400 line-through">
                    Tk {product.old_price.toLocaleString()}
                  </span>
                )}
                <span className="text-2xl font-bold text-gray-900">
                  Tk {product.price.toLocaleString()} BDT
                </span>
                {hasDiscount && (
                  <span className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                    {Math.round(
                      ((product.old_price - product.price) / product.old_price) * 100
                    )}
                    % OFF
                  </span>
                )}
              </div>

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
                    className="w-16 h-10 text-center border-0 focus:ring-0"
                  />
                  <button className="w-10 h-10 text-lg" onClick={incrementQuantity}>
                    +
                  </button>
                </div>
              </div>

              {/* Size Selection */}
              <div className="mt-4">
                <button
                  className="px-4 py-2 text-sm font-medium text-black border border-gray-400 hover:bg-gray-100"
                  onClick={() => setSizeOpen((prev) => !prev)}
                >
                  {sizeOpen ? "Hide Sizes" : "Add Size"}
                </button>

                <AnimatePresence>
                  {sizeOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col gap-2 mt-3"
                    >
                      {sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 text-sm font-medium border  transition text-left ${
                            selectedSize === size
                              ? "bg-black text-white border-black"
                              : "bg-white text-black border-gray-300 hover:bg-gray-100"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {selectedSize && (
                  <p className="mt-2 text-sm text-gray-600">
                    Selected Size: <span className="font-semibold">{selectedSize}</span>
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-4">
                <button
                  className={`px-5 py-2.5 text-sm font-medium border border-black w-full sm:w-auto ${
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
                    className="px-5 py-2.5 text-sm font-medium text-white bg-black hover:bg-gray-800 w-full sm:w-auto"
                    onClick={handleBuyNow}
                  >
                    Buy It Now
                  </button>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <div className="text-sm leading-7 text-gray-800">
                  {parse(product.description)}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ───────── RELATED PRODUCTS ───────── */}
      {relatedProducts?.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container px-6 mx-auto lg:px-12">
            <h2 className="mb-8 text-xl font-semibold text-gray-900">
              You may also like
            </h2>

            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {relatedProducts.map((item) => {
                const discount = item.old_price && item.old_price > item.price;

                return (
                  <a
                    key={item.id}
                    href={`/products/${item.slug}`}
                    className="group"
                  >
                    <div className="overflow-hidden bg-white border">
                      <img
                        src={`/storage/${item.image}`}
                        alt={item.name}
                        className="object-cover w-full transition-transform h-5/4 group-hover:scale-105"
                      />
                    </div>

                    <div className="mt-3 space-y-1">
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                        {item.name}
                      </h3>

                      <div className="flex items-center gap-2">
                        {discount && (
                          <span className="text-xs text-gray-400 line-through">
                            Tk {item.old_price.toLocaleString()}
                          </span>
                        )}
                        <span className="text-sm font-semibold text-gray-800">
                          Tk {item.price.toLocaleString()} BDT
                        </span>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {miniCartItem && (
        <MiniCart addedItem={miniCartItem} onClose={() => setMiniCartItem(null)} />
      )}

      <Footer />
    </>
  );
};

export default ProductShow;




// import React, { useState } from "react";
// import Navbar from "@/Components/AppComponents/Navbar";
// import Footer from "@/Components/AppComponents/Footer";
// import MiniCart from "@/Components/AppComponents/MiniCart";
// import { motion, AnimatePresence } from "framer-motion";
// import { addToCart } from "@/utils/cart";
// import parse from "html-react-parser";

// const ProductShow = ({ product }) => {
//   if (!product || !product.images || product.images.length === 0) {
//     return (
//       <>
//         <Navbar />
//         <div className="py-24 text-center md:py-32 bg-gray-50">
//           <p className="text-xl font-semibold text-gray-700">
//             Loading product details...
//           </p>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   const images = product.images.map((img) => `/storage/${img}`);
//   const [selectedImage, setSelectedImage] = useState(images[0]);
//   const [quantity, setQuantity] = useState(1);
//   const [miniCartItem, setMiniCartItem] = useState(null);
//   const [sizeOpen, setSizeOpen] = useState(false);
//   const [selectedSize, setSelectedSize] = useState("");

//   const incrementQuantity = () => setQuantity(quantity + 1);
//   const decrementQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

//   const sizes = [
//     "EU XS / US XS",
//     "EU S / US S",
//     "EU M / US M",
//     "EU L / US L",
//     "EU XL / US XL",
//     "EU XXL / US XXL",
//   ];

//   const handleAddToCart = () => {
//     if (!selectedSize) {
//       setSizeOpen(true);
//       alert("Please select a size before adding to cart!");
//       return;
//     }

//     const item = {
//       id: product.id,
//       name: product.name,
//       price: product.price,
//       image: selectedImage,
//       size: selectedSize,
//       quantity, // ✅ pass user-selected quantity
//     };

//     addToCart(item, quantity);
//     setMiniCartItem(item);
//   };

//   const handleBuyNow = () => {
//     if (!selectedSize) {
//       setSizeOpen(true);
//       alert("Please select a size before proceeding to checkout!");
//       return;
//     }
//     handleAddToCart();
//     window.location.href = "/checkout";
//   };

//   const hasDiscount = product.old_price && product.old_price > product.price;

//   return (
//     <>
//       <Navbar />

//       <section className="py-20 bg-white md:px-20 md:py-28">
//         <div className="container px-6 mx-auto lg:px-12">
//           <div className="grid items-start grid-cols-1 gap-12 md:grid-cols-2 lg:gap-16">
//             {/* Product Images */}
//             <div className="space-y-6">
//               <div className="relative p-6 bg-white border shadow-sm h-[450px] md:h-[550px] flex items-center justify-center overflow-hidden">
//                 <AnimatePresence mode="wait">
//                   <motion.img
//                     key={selectedImage}
//                     src={selectedImage}
//                     alt={product.name}
//                     className="object-contain w-full h-full max-w-xs mx-auto md:max-w-md"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     transition={{ duration: 0.3 }}
//                   />
//                 </AnimatePresence>
//               </div>
//               <div className="flex gap-3 pb-2 overflow-x-auto">
//                 {images.map((img, idx) => (
//                   <motion.div
//                     key={idx}
//                     className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 overflow-hidden cursor-pointer transition-all ${
//                       selectedImage === img
//                         ? "shadow-md shadow-black/80"
//                         : "shadow-none hover:shadow-sm hover:shadow-gray-300/80"
//                     }`}
//                     onClick={() => setSelectedImage(img)}
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.98 }}
//                   >
//                     <img
//                       src={img}
//                       alt={`Thumbnail ${idx + 1}`}
//                       className="object-cover w-full h-full"
//                     />
//                   </motion.div>
//                 ))}
//               </div>
//             </div>

//             {/* Product Details */}
//             <div className="max-w-xl space-y-6">
//               <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
//                 {product.name}
//               </h1>

//               <div className="flex items-center gap-3">
//                 {hasDiscount && (
//                   <span className="text-sm text-gray-400 line-through">
//                     Tk {product.old_price.toLocaleString()}
//                   </span>
//                 )}
//                 <span className="text-2xl font-bold text-gray-900">
//                   Tk {product.price.toLocaleString()} BDT
//                 </span>
//                 {hasDiscount && (
//                   <span className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
//                     {Math.round(
//                       ((product.old_price - product.price) / product.old_price) *
//                         100
//                     )}
//                     % OFF
//                   </span>
//                 )}
//               </div>

//               <p className="text-sm text-gray-500">
//                 Tax included. Shipping calculated at checkout.
//               </p>

//               {/* Quantity */}
//               <div className="space-y-2">
//                 <p className="text-sm font-medium text-gray-700">Quantity</p>
//                 <div className="flex items-center border w-fit">
//                   <button className="w-10 h-10 text-lg" onClick={decrementQuantity}>
//                     −
//                   </button>
//                   <input
//                     type="number"
//                     value={quantity}
//                     readOnly
//                     className="w-16 h-10 text-center border-0 focus:ring-0"
//                   />
//                   <button className="w-10 h-10 text-lg" onClick={incrementQuantity}>
//                     +
//                   </button>
//                 </div>
//               </div>

//               {/* Size Selection */}
//               <div className="mt-4">
//                 <button
//                   className="px-4 py-2 text-sm font-medium text-black border border-gray-400 hover:bg-gray-100"
//                   onClick={() => setSizeOpen((prev) => !prev)}
//                 >
//                   {sizeOpen ? "Hide Sizes" : "Add Size"}
//                 </button>

//                 <AnimatePresence>
//                   {sizeOpen && (
//                     <motion.div
//                       initial={{ height: 0, opacity: 0 }}
//                       animate={{ height: "auto", opacity: 1 }}
//                       exit={{ height: 0, opacity: 0 }}
//                       transition={{ duration: 0.3 }}
//                       className="flex flex-col gap-2 mt-3"
//                     >
//                       {sizes.map((size) => (
//                         <button
//                           key={size}
//                           onClick={() => setSelectedSize(size)}
//                           className={`px-4 py-2 text-sm font-medium border  transition text-left ${
//                             selectedSize === size
//                               ? "bg-black text-white border-black"
//                               : "bg-white text-black border-gray-300 hover:bg-gray-100"
//                           }`}
//                         >
//                           {size}
//                         </button>
//                       ))}
//                     </motion.div>
//                   )}
//                 </AnimatePresence>

//                 {selectedSize && (
//                   <p className="mt-2 text-sm text-gray-600">
//                     Selected Size: <span className="font-semibold">{selectedSize}</span>
//                   </p>
//                 )}
//               </div>

//               {/* Buttons */}
//               <div className="flex flex-col gap-4 sm:flex-row sm:gap-4">
//                 <button
//                   className={`px-5 py-2.5 text-sm font-medium border border-black w-full sm:w-auto ${
//                     product.status === "out_of_stock"
//                       ? "bg-gray-200 cursor-not-allowed text-gray-500 border-gray-400"
//                       : "bg-white text-black hover:bg-gray-100"
//                   }`}
//                   disabled={product.status === "out_of_stock"}
//                   onClick={handleAddToCart}
//                 >
//                   {product.status === "out_of_stock" ? "Out of Stock" : "Add to Cart"}
//                 </button>

//                 {product.status !== "out_of_stock" && (
//                   <button
//                     className="px-5 py-2.5 text-sm font-medium text-white bg-black hover:bg-gray-800 w-full sm:w-auto"
//                     onClick={handleBuyNow}
//                   >
//                     Buy It Now
//                   </button>
//                 )}
//               </div>

//               {/* Description */}
//               {product.description && (
//                 <div className="text-sm leading-7 text-gray-800">
//                   {parse(product.description)}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </section>




//       {miniCartItem && (
//         <MiniCart addedItem={miniCartItem} onClose={() => setMiniCartItem(null)} />
//       )}

//       <Footer />
//     </>
//   );
// };

// export default ProductShow;

