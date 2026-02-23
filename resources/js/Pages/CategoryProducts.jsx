import React, { useState, useEffect, useRef } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Link, usePage } from "@inertiajs/react";
import ProductCard from "@/Components/AppComponents/ProductCard";
import Navbar from "@/Components/AppComponents/Navbar";
import Footer from "@/Components/AppComponents/Footer";

const CategoryWiseProduct = ({ category, products }) => {
    const { filters } = usePage().props;

    const [availabilityFilter, setAvailabilityFilter] = useState(
        filters.availability || "all",
    );
    const [priceFilter, setPriceFilter] = useState({
        from: filters.price_from || "",
        to: filters.price_to || "",
    });
    const [sortOrder, setSortOrder] = useState(filters.sort || "alphabetical");
    const [subcategoryFilter, setSubcategoryFilter] = useState(
        filters.subcategory || "",
    );

    const initialRender = useRef(true);

    const updateFilters = () => {
        Inertia.get(
            `/category/${category.slug}`,
            {
                availability: availabilityFilter,
                price_from: priceFilter.from || undefined,
                price_to: priceFilter.to || undefined,
                sort: sortOrder,
                subcategory: subcategoryFilter || undefined,
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
        subcategoryFilter,
    ]);

    // Unified radio option rendering with type-safe comparison
    const renderRadioOption = (label, value, selected, setSelected) => {
        const isSelected = String(selected) === String(value); // convert both to string
        return (
            <label
                key={value}
                className="flex items-center gap-2 text-sm cursor-pointer select-none group"
                onClick={() => setSelected(String(value))} // ensure state is always string
            >
                {/* Outer ring */}
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

            <section className="py-24 bg-background font-inter">
                <div className="container px-6 mx-auto lg:px-12">
                    <h1 className="mb-12 text-3xl md:text-4xl text-center font-heading tracking-[0.05em]">
                        {category?.name} Products
                    </h1>

                    <div className="flex flex-col gap-6 md:flex-row">
                        {/* SIDEBAR */}
                        <aside className="flex-shrink-0 w-full p-2 md:w-64">
                            {/* Subcategories */}
                            {category.subcategories?.length > 0 && (
                                <div className="mb-6">
                                    <h2 className="mb-3 text-lg font-semibold">
                                        Subcategories
                                    </h2>
                                    <div className="flex flex-col gap-2">
                                        {renderRadioOption(
                                            "All",
                                            "",
                                            subcategoryFilter,
                                            setSubcategoryFilter,
                                        )}
                                        {category.subcategories.map((sub) => (
                                            <React.Fragment key={sub.id}>
                                                {renderRadioOption(
                                                    sub.name,
                                                    sub.id,
                                                    subcategoryFilter,
                                                    setSubcategoryFilter,
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <h2 className="mb-4 text-lg font-semibold">
                                Filters
                            </h2>

                            {/* Availability */}
                            <div className="mb-4">
                                <h3 className="mb-2 font-medium">
                                    Availability
                                </h3>
                                <div className="flex flex-col gap-2">
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
                                <div className="flex flex-col gap-2">
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
                            </div>
                        </aside>

                        {/* PRODUCTS GRID */}
                        <div className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {products.data?.length > 0 ? (
                                products.data.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        name={product.name}
                                        price={product.price}
                                        image={`/storage/${product.image_1}`} // ✅ fixed
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
                        {products.links?.map((link, index) => (
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

export default CategoryWiseProduct;
