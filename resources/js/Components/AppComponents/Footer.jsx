import { Link, usePage } from "@inertiajs/react";

const Footer = () => {
  // ✅ Access global categories shared via middleware
  const { categories = [] } = usePage().props;

  const supportLinks = [
    { label: "Contact", href: "/contact" },
    { label: "Returns", href: "/returns" },
    { label: "Privacy Policy", href: "/privacy-policy" },
  ];

  const companyLinks = [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
  ];

  return (
    <footer className="py-16 bg-white border-t border-gray-200">
      <div className="px-6 mx-auto max-w-7xl lg:px-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-16">

          {/* Brand */}
          <div>
            <h4 className="mb-4 text-2xl font-bold tracking-widest text-gray-900">
              SOOTH
            </h4>
            <p className="max-w-xs text-sm leading-relaxed text-gray-600">
              Redefining modern luxury through minimal design, premium materials, and timeless silhouettes.
            </p>
          </div>

          {/* Shop - Dynamic Categories */}
          <div>
            <h5 className="mb-6 text-xs font-medium tracking-wider text-gray-900 uppercase">
              Shop
            </h5>
            <ul className="space-y-3">
              {categories.length > 0 ? (
                categories.map((category) => (
                  <li key={category.id}>
                    <Link
                      href={`/category/${category.slug}`} // ✅ Dynamic route works globally
                      className="text-sm text-gray-600 transition-colors duration-300 hover:text-gray-900"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-sm text-gray-400">No categories available</li>
              )}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h5 className="mb-6 text-xs font-medium tracking-wider text-gray-900 uppercase">
              Support
            </h5>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 transition-colors duration-300 hover:text-gray-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h5 className="mb-6 text-xs font-medium tracking-wider text-gray-900 uppercase">
              Company
            </h5>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 transition-colors duration-300 hover:text-gray-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 mt-16 border-t border-gray-200 md:flex-row">
          <p className="text-xs tracking-wide text-gray-500">
            © {new Date().getFullYear()} SOOTH. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {["Instagram", "Twitter", "Pinterest"].map((social) => (
              <a
                key={social}
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-500 transition-colors duration-300 hover:text-gray-900"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;