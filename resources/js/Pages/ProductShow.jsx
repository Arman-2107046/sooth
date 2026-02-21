import React, { useState } from "react";
import Navbar from "@/Components/AppComponents/Navbar";
import Footer from "@/Components/AppComponents/Footer";
import { motion, AnimatePresence } from "framer-motion";

const ProductShow = ({ product }) => {
    if (!product || !product.images || product.images.length === 0) {
        return (
            <>
                <Navbar />
                <div className="py-24 text-center md:py-32">
                    <p className="text-xl font-semibold">Loading product...</p>
                </div>
                <Footer />
            </>
        );
    }

    const [selectedImage, setSelectedImage] = useState(product.images[0]);

    return (
        <>
            <Navbar />

            <section className="py-24 md:py-32 bg-gradient-to-b from-white to-gray-50">
                <div className="container px-6 mx-auto lg:px-12">
                    <div className="grid items-start grid-cols-1 gap-12 md:grid-cols-2">
                        {/* PRODUCT IMAGES */}
                        <div>
                            <div className="relative p-4 mb-6 border rounded-2xl shadow-lg bg-white h-[500px] md:h-[550px] flex items-center justify-center overflow-hidden">
                                {/* Animate main image fade */}
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={selectedImage}
                                        src={selectedImage}
                                        alt={product.name}
                                        className="object-contain w-full h-full"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </AnimatePresence>
                            </div>

                            {/* Thumbnails */}
                            <div className="flex gap-4 overflow-x-auto">
                                {product.images.map((img, idx) => (
                                    <div
                                        key={idx}
                                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
                                            selectedImage === img
                                                ? "border-primary shadow-md scale-105"
                                                : "border-gray-200 hover:border-primary hover:shadow-sm"
                                        }`}
                                        onClick={() => setSelectedImage(img)}
                                    >
                                        <img
                                            src={img}
                                            alt={`Thumbnail ${idx}`}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* PRODUCT DETAILS */}
                        <div className="flex flex-col justify-start space-y-6">
                            <h1 className="text-5xl font-bold tracking-tight text-gray-900 md:text-5xl font-heading">
                                {product.name}
                            </h1>
                            <p className="text-lg text-gray-500">
                                Category:{" "}
                                <span className="text-gray-700">{product.category}</span> /{" "}
                                <span className="text-gray-700">{product.subcategory}</span>
                            </p>
                            <p className="text-3xl font-extrabold md:text-4xl text-primary">
                                ৳ {product.price.toLocaleString()}
                            </p>
                            <p className="text-lg leading-relaxed text-gray-700">{product.description}</p>

                            {product.status === "out_of_stock" ? (
                                <button
                                    className="px-8 py-4 text-lg font-semibold tracking-wider text-white uppercase bg-gray-400 rounded-lg cursor-not-allowed"
                                    disabled
                                >
                                    Out of Stock
                                </button>
                            ) : (
                                <button className="px-8 py-4 text-lg font-semibold tracking-wider text-white uppercase transition-transform duration-300 rounded-lg bg-primary hover:scale-105 hover:bg-accent">
                                    Add to Cart
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default ProductShow;