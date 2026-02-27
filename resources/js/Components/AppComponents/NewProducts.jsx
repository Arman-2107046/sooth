import React from "react";
import ProductCard from "@/Components/AppComponents/ProductCard";

const NewProducts = ({ newProducts }) => {
    if (
        !newProducts ||
        !Array.isArray(newProducts) ||
        newProducts.length === 0
    ) {
        return (
            <p className="py-12 text-center text-gray-500">
                No new products available.
            </p>
        );
    }

    return (
        <section className="px-6 py-16 bg-white md:px-12">
            {/* Section Title */}
            <h2 className="mb-12 text-3xl text-center md:text-4xl">
                New Arrivals
            </h2>

            {/* Products Grid */}
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-[1400px] mx-auto">
                {newProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        name={product.name}
                        old_price={product.old_price} // ✅ fixed
                        price={product.price}
                        // Prepend storage path
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

export default NewProducts;
