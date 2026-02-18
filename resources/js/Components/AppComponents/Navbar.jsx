import { Link, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";

export default function Navbar() {
  const { auth, cartCount } = usePage().props; // auth comes from backend, cartCount can be added
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    Inertia.post(route("logout"));
  };

  return (
    <nav className="fixed z-50 w-full bg-white shadow-md dark:bg-black">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-black dark:text-white">
              SOOTH
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="items-center hidden gap-6 md:flex">
            {!auth?.user ? (
              <>
                <Link
                  href={route("login")}
                  className="px-4 py-2 transition rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Login
                </Link>
                <Link
                  href={route("register")}
                  className="px-4 py-2 transition rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  href={route("dashboard")}
                  className="px-4 py-2 transition rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 transition rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Logout
                </button>
              </>
            )}

            {/* Cart Icon */}
            <Link href={route("cart")} className="relative">
              <svg
                className="w-6 h-6 text-black dark:text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.2 6m1.2-6h10M17 13l1.2 6M6 19a2 2 0 100 4 2 2 0 000-4zm12 0a2 2 0 100 4 2 2 0 000-4z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full -top-2 -right-2">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-black dark:text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="px-4 pt-2 pb-4 space-y-1 bg-white shadow-md md:hidden dark:bg-black">
          {!auth?.user ? (
            <>
              <Link
                href={route("login")}
                className="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Login
              </Link>
              <Link
                href={route("register")}
                className="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                href={route("dashboard")}
                className="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-left rounded hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Logout
              </button>
            </>
          )}

          <Link
            href={route("cart")}
            className="flex items-center px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Cart {cartCount > 0 && <span className="ml-2 text-red-500">{cartCount}</span>}
          </Link>
        </div>
      )}
    </nav>
  );
}
