import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "@inertiajs/react";

const CategoryCard = ({ category, index }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            <Link
                href={`/products/${category.slug}`}
                className="relative group cursor-pointer overflow-hidden aspect-[3/4] block"
            >
                <img
                    src={category.thumbnail}
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

const CatalogSection = ({ categories = [] }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });
    // console.log("CATEGORIES:", categories);
    return (
        <section id="catalog" className="py-24 md:py-32 bg-background">
            <div className="container px-6 lg:px-12">
                <motion.h2
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="font-heading text-foreground text-3xl md:text-4xl tracking-[0.1em] text-center mb-16"
                >
                    Explore Collection
                </motion.h2>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
                    {categories.map((category, i) => (
                        <CategoryCard
                            key={category.id}
                            category={category}
                            index={i}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CatalogSection;
