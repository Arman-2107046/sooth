import React, { useRef } from "react";
import { Link } from "@inertiajs/react";
import { motion, useInView } from "framer-motion";
import ProductCard from "@/Components/AppComponents/ProductCard";
import Navbar from "@/Components/AppComponents/Navbar";
import Footer from "@/Components/AppComponents/Footer";

const CategoryWiseProduct = ({ category, products }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <>
      <Navbar />

      <section className="py-24 md:py-32 bg-background">
        <div className="container px-6 mx-auto lg:px-12">
          {/* PAGE TITLE */}
          <motion.h1
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-12 text-3xl md:text-4xl text-center font-heading tracking-[0.05em]"
          >
            {category?.name || "Category"} Products
          </motion.h1>

          {/* PRODUCTS GRID */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {products?.data?.length > 0 ? (
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
              <p className="text-center col-span-full">No products found.</p>
            )}
          </div>

          {/* PAGINATION */}
          {products?.links?.length > 0 && (
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
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default CategoryWiseProduct;