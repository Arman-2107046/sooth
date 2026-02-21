import React from "react";
import { Link } from "@inertiajs/react";
import ProductCard from "@/Components/AppComponents/ProductCard";
import Navbar from "@/Components/AppComponents/Navbar";
import Footer from "@/Components/AppComponents/Footer";

const ProductCatalog = ({ products }) => {
    return (
        <>
            <Navbar />
            <section className="py-24 bg-white">
                <div className="w-full px-6 mx-auto">
                    {/* PAGE TITLE */}
                    <h1 className="mb-12 text-3xl text-center md:text-4xl font-heading">
                        Products
                    </h1>

                    {/* PRODUCTS GRID */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                        {products.data.map((product) => (
                            <ProductCard
                                key={product.id}
                                name={product.name}
                                price={product.price}
                                image={product.image_1}
                                slug={product.slug}
                                status={product.status}
                                is_featured={product.is_featured}
                            />
                        ))}
                    </div>

                    {/* PAGINATION */}
                    <div className="flex flex-wrap justify-center gap-2 mt-16">
                        {products.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url || ""}
                                preserveScroll
                                preserveState
                                className={`px-4 py-2 text-sm border transition
                ${
                    link.active
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-gray-300 text-gray-600 hover:bg-gray-100"
                }
                ${!link.url && "opacity-40 pointer-events-none"}
              `}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default ProductCatalog;
