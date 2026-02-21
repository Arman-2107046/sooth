import React, { useState, useEffect, useRef } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Link, usePage } from "@inertiajs/react";
import ProductCard from "@/Components/AppComponents/ProductCard";
import Navbar from "@/Components/AppComponents/Navbar";
import Footer from "@/Components/AppComponents/Footer";

const ProductCatalog = ({ products, categories }) => {
    const { filters } = usePage().props; // server-side filters

    const [availabilityFilter, setAvailabilityFilter] = useState(
        filters.availability || "all",
    );
    const [priceFilter, setPriceFilter] = useState({
        from: filters.price_from || "",
        to: filters.price_to || "",
    });
    const [sortOrder, setSortOrder] = useState(filters.sort || "alphabetical");
    const [categoryFilter, setCategoryFilter] = useState(
        filters.category || "",
    );

    const initialRender = useRef(true);

    const updateFilters = () => {
        Inertia.get(
            "/products",
            {
                availability: availabilityFilter,
                price_from: priceFilter.from || undefined,
                price_to: priceFilter.to || undefined,
                sort: sortOrder,
                category: categoryFilter || undefined,
            },
            { preserveState: true, replace: true },
        );
    };

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }
        updateFilters();
    }, [
        availabilityFilter,
        priceFilter.from,
        priceFilter.to,
        sortOrder,
        categoryFilter,
    ]);

    // Styled radio option (tick + color)
    const renderRadioOption = (label, value, selected, setSelected) => {
        const isSelected = String(selected) === String(value);
        return (
            <label
                key={value}
                className="flex items-center gap-2 mb-1 text-sm cursor-pointer select-none"
                onClick={() => setSelected(String(value))}
            >
                <span
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        width: 18,
                        height: 18,
                        borderRadius: 3,
                        border: isSelected
                            ? "2px solid #111"
                            : "2px solid #ccc",
                        backgroundColor: isSelected ? "#111" : "#fff",
                        transition: "all 0.15s ease",
                    }}
                >
                    {isSelected && (
                        <svg
                            width="11"
                            height="9"
                            viewBox="0 0 11 9"
                            fill="none"
                        >
                            <path
                                d="M1 4L4 7.5L10 1"
                                stroke="#fff"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    )}
                </span>
                <span
                    style={{
                        color: isSelected ? "#111" : "#555",
                        fontWeight: isSelected ? 500 : 400,
                    }}
                >
                    {label}
                </span>
            </label>
        );
    };

    return (
        <>
            <Navbar />
            <section className="py-24 bg-white font-inter">
                <div className="w-full px-6 mx-auto max-w-[1400px]">
                    <h1 className="mb-8 text-3xl font-medium text-center md:text-4xl">
                        Products
                    </h1>

                    <div className="flex flex-col gap-6 md:flex-row">
                        {/* SIDEBAR */}
                        <aside className="flex-shrink-0 w-full p-2 md:w-64">
                            {/* Categories */}
                            <div className="mb-6">
                                <h2 className="mb-2 text-lg font-semibold">
                                    Categories
                                </h2>
                                <div className="flex flex-col gap-1">
                                    {categories.map((cat) => (
                                        <Link
                                            key={cat.slug}
                                            href={`/category/${cat.slug}`}
                                            className={`block w-full px-1 py-1 rounded transition-colors
                    ${
                        categoryFilter === cat.slug
                            ? "text-primary font-semibold"
                            : "text-gray-700 hover:text-primary"
                    }`}
                                        >
                                            {cat.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <h2 className="mb-4 text-lg font-semibold">
                                Filters
                            </h2>

                            {/* Availability */}
                            <div className="mb-4">
                                <h3 className="mb-2 font-medium">
                                    Availability
                                </h3>
                                {renderRadioOption(
                                    "All",
                                    "all",
                                    availabilityFilter,
                                    setAvailabilityFilter,
                                )}
                                {renderRadioOption(
                                    "In Stock",
                                    "in_stock",
                                    availabilityFilter,
                                    setAvailabilityFilter,
                                )}
                                {renderRadioOption(
                                    "Out of Stock",
                                    "out_of_stock",
                                    availabilityFilter,
                                    setAvailabilityFilter,
                                )}
                            </div>

                            {/* Price */}
                            <div className="mb-4">
                                <h3 className="mb-2 font-medium">Price</h3>
                                <input
                                    type="number"
                                    placeholder="From"
                                    value={priceFilter.from}
                                    onChange={(e) =>
                                        setPriceFilter({
                                            ...priceFilter,
                                            from: e.target.value,
                                        })
                                    }
                                    className="w-full px-2 py-1 mb-2 border border-gray-300"
                                    style={{ borderRadius: 0 }}
                                />
                                <input
                                    type="number"
                                    placeholder="To"
                                    value={priceFilter.to}
                                    onChange={(e) =>
                                        setPriceFilter({
                                            ...priceFilter,
                                            to: e.target.value,
                                        })
                                    }
                                    className="w-full px-2 py-1 border border-gray-300"
                                    style={{ borderRadius: 0 }}
                                />
                            </div>

                            {/* Sort */}
                            <div>
                                <h3 className="mb-2 font-medium">Sort</h3>
                                {renderRadioOption(
                                    "Alphabetically, A-Z",
                                    "alphabetical",
                                    sortOrder,
                                    setSortOrder,
                                )}
                                {renderRadioOption(
                                    "Price: Low to High",
                                    "price_low",
                                    sortOrder,
                                    setSortOrder,
                                )}
                                {renderRadioOption(
                                    "Price: High to Low",
                                    "price_high",
                                    sortOrder,
                                    setSortOrder,
                                )}
                            </div>
                        </aside>

                        {/* PRODUCTS GRID */}
                        <div className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {products.data.length > 0 ? (
                                products.data.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        name={product.name}
                                        price={product.price}
                                        image={product.image_1}
                                        slug={product.slug}
                                        status={product.status}
                                        is_featured={product.is_featured}
                                    />
                                ))
                            ) : (
                                <p className="py-12 text-center text-gray-500 col-span-full">
                                    No products found.
                                </p>
                            )}
                        </div>
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
                  ${!link.url && "opacity-40 pointer-events-none"}`}
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
