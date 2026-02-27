import React from "react";
import ProductCard from "@/Components/AppComponents/ProductCard";

const FeaturedProduct = ({ featuredProducts }) => {
    if (
        !featuredProducts ||
        !Array.isArray(featuredProducts) ||
        featuredProducts.length === 0
    ) {
        return (
            <p className="py-12 text-center text-gray-500">
                No featured products available.
            </p>
        );
    }

    return (
        <section className="px-6 py-16 md:px-12 bg-gray-50">
            {/* Section Title */}
            <h2 className="mb-12 text-3xl text-center md:text-4xl">
                Featured Products
            </h2>

            {/* Products Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-[1400px] mx-auto">
                {featuredProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        name={product.name}
                        old_price={product.old_price} // ✅ fixed
                        price={product.price}
                        // Prepend storage path to make the image accessible
                        image={`/storage/${product.image_1}`}
                        slug={product.slug}
                        status={product.status}
                        is_featured={product.is_featured ? 1 : 0}
                    />
                ))}
            </div>
        </section>
    );
};

export default FeaturedProduct;
