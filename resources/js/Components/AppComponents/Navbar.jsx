import { Link, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, Search } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Catalog", href: "/products" },
];

export default function Navbar() {
  const { auth } = usePage().props;

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close search on ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    Inertia.post(route("logout"));
  };

  const buttonStyle =
    "text-white/80 hover:text-white text-xs tracking-[0.2em] uppercase transition-all duration-300 relative group px-2 py-1";

  return (
    <>
      {/* HEADER */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-black font-body"
        animate={{ height: scrolled ? 70 : 90 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center justify-between h-full px-6 lg:px-16">
          {/* LOGO */}
          <Link
            href="/"
            className="text-white text-2xl tracking-[0.35em] font-heading"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            SOOTH
          </Link>

          {/* DESKTOP NAV */}
          <nav className="items-center hidden gap-10 md:flex">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} className={buttonStyle}>
                {link.label}
                <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-[#C6A15B] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* RIGHT SIDE */}
          <div className="items-center hidden gap-6 md:flex">
            {!auth?.user ? (
              <Link href={route("login")} className={buttonStyle}>
                Login
                <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-[#C6A15B] transition-all duration-300 group-hover:w-full" />
              </Link>
            ) : (
              <>
                <Link href={route("dashboard")} className={buttonStyle}>
                  Dashboard
                  <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-[#C6A15B] transition-all duration-300 group-hover:w-full" />
                </Link>
                <button onClick={handleLogout} className={buttonStyle}>
                  Logout
                  <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-[#C6A15B] transition-all duration-300 group-hover:w-full" />
                </button>
              </>
            )}

            {/* SEARCH */}
            <button
              onClick={() => setSearchOpen(true)}
              className="text-white/70 hover:text-[#C6A15B] transition"
            >
              <Search size={18} strokeWidth={1.5} />
            </button>

            {/* CART */}
            <Link href={route("cart")} className="relative">
              <ShoppingBag size={18} strokeWidth={1.5} className="text-white" />
              <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full -top-2 -right-2">
                0
              </span>
            </Link>
          </div>

          {/* MOBILE BUTTON */}
          <button
            className="text-white md:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={20} />
          </button>
        </div>
      </motion.header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-black flex flex-col items-center justify-center"
          >
            <button
              className="absolute text-white top-8 right-6"
              onClick={() => setMobileOpen(false)}
            >
              <X size={24} />
            </button>

            <nav className="flex flex-col items-center gap-8">
              {[...navLinks, { label: "Cart", href: route("cart") }].map(
                (link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-white text-2xl tracking-[0.15em] uppercase relative group"
                  >
                    {link.label}
                    <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-[#C6A15B] transition-all duration-300 group-hover:w-full" />
                  </Link>
                )
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SEARCH OVERLAY */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] bg-black/95 backdrop-blur-sm flex items-center justify-center"
          >
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute top-8 right-8 text-white/70 hover:text-white"
            >
              <X size={28} />
            </button>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-2xl px-6"
            >
              <input
                type="text"
                autoFocus
                placeholder="Search products..."
                className="
                  w-full bg-transparent
                  border-b border-white/30
                  text-white text-3xl tracking-wide
                  placeholder:text-white/40
                  focus:outline-none focus:border-[#C6A15B]
                  py-4
                "
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
