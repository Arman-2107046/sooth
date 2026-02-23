import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";
import { useState } from "react";

const ProductCard = ({
  name,
  price,
  image,
  slug,
  is_featured = 0,
  status = "in_stock",
}) => {
  const [hovered, setHovered] = useState(false);

  const isOutOfStock = status === "out_of_stock";

  return (
    <motion.div
      className={`group ${
        isOutOfStock ? "cursor-not-allowed opacity-60" : "cursor-pointer"
      }`}
      onMouseEnter={() => !isOutOfStock && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={!isOutOfStock ? { y: -4 } : {}}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/products/${slug}`}
        className={isOutOfStock ? "pointer-events-none" : "block"}
      >
        <div className="relative overflow-hidden bg-secondary mb-4 aspect-[3/4]">

          {/* BADGES */}
          {is_featured === 1 && !isOutOfStock && (
            <span className="absolute top-4 left-4 z-10 bg-accent text-primary text-[10px] tracking-[0.2em] uppercase font-body font-medium px-3 py-1">
              Featured
            </span>
          )}

          {isOutOfStock && (
            <span className="absolute top-4 left-4 z-10 bg-black text-white text-[10px] tracking-[0.2em] uppercase font-body font-medium px-3 py-1">
              Out of Stock
            </span>
          )}

          <img
            src={image}
            alt={name}
            className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
              !isOutOfStock ? "group-hover:scale-105" : ""
            }`}
          />

          {/* ADD TO CART */}
          {/* {!isOutOfStock && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-0 left-0 right-0 p-4"
            >
              <button
                type="button"
                className="w-full py-3 bg-primary text-primary-foreground text-xs tracking-[0.2em] uppercase font-body font-light hover:bg-accent hover:text-primary transition-colors duration-300"
              >
                Add to Cart
              </button>
            </motion.div>
          )} */}
        </div>

        <h3 className="font-body text-foreground text-sm tracking-[0.05em] font-light">
          {name}
        </h3>

        <p className="mt-1 text-sm font-body text-muted-foreground">
          ৳ {price}
        </p>
      </Link>
    </motion.div>
  );
};

export default ProductCard;