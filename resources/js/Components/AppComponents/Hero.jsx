import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="SOOTH luxury fashion"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-primary/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-primary-foreground text-6xl md:text-8xl lg:text-9xl tracking-[0.25em] font-medium"
        >
          SOOTH
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="font-body text-primary-foreground/80 text-sm md:text-base tracking-[0.3em] uppercase mt-6 font-light"
        >
          Elevate Everyday Elegance
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12"
        >
          {/* <Link
            href={route('/')} 
            className="px-10 py-4 border border-accent text-primary-foreground text-xs tracking-[0.25em] uppercase font-body font-light
                       hover:bg-accent hover:text-primary transition-all duration-500"
          >
            Shop Now
          </Link>  */}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;