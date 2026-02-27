import React from "react";
import { usePage } from "@inertiajs/react";
import Navbar from "@/Components/AppComponents/Navbar";
import Footer from "@/Components/AppComponents/Footer";
import { motion, useInView } from "framer-motion";
import { Link } from "@inertiajs/react";

// Single Category Card
const CategoryCard = ({ category, index }) => {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/category/${category.slug}`}
        className="relative group cursor-pointer overflow-hidden aspect-[3/4] block"
      >
        <img
          src={`/storage/${category.thumbnail}`}
          alt={category.name}
          className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
        />

        <div className="absolute inset-0 transition-colors duration-500 bg-black/30 group-hover:bg-black/50" />

        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="font-heading text-white text-2xl md:text-3xl tracking-[0.15em] group-hover:-translate-y-2 transition-transform duration-500">
            {category.name}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
};

// Shop Page
const Shop = () => {
  const { categories } = usePage().props;

  return (
    <div>
      <Navbar />

      <section className="py-24 md:py-32 bg-background">
        <div className="container px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-heading text-foreground text-3xl md:text-4xl tracking-[0.1em] text-center mb-16"
          >
            Shop by Category
          </motion.h2>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
            {categories.length > 0 ? (
              categories.map((category, i) => (
                <CategoryCard key={category.id} category={category} index={i} />
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full">
                No categories found.
              </p>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Shop;