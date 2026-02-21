import { Link } from "@inertiajs/react";

const Footer = ({ categories = [] }) => {
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
    <footer className="py-20 border-t bg-background border-border">
      <div className="container px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-16">

          {/* Brand */}
          <div>
            <h4 className="font-heading text-foreground text-2xl tracking-[0.25em] mb-4">
              SOOTH
            </h4>
            <p className="max-w-xs text-sm leading-relaxed font-body text-muted-foreground">
              Redefining modern luxury through minimal design, premium materials, and timeless silhouettes.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h5 className="font-body text-foreground text-xs tracking-[0.2em] uppercase mb-6 font-medium">
              Shop
            </h5>
            <ul className="space-y-3">
              {categories.length > 0 ? (
                categories.map((category) => (
                  <li key={category.id}>
                    <Link
                      href={`/products/${category.slug}`}
                      className="text-sm font-body text-muted-foreground hover:text-[#C6A15B] transition-colors duration-300"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-sm font-body text-muted-foreground">No categories</li>
              )}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h5 className="font-body text-foreground text-xs tracking-[0.2em] uppercase mb-6 font-medium">
              Support
            </h5>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm font-body text-muted-foreground hover:text-[#C6A15B] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h5 className="font-body text-foreground text-xs tracking-[0.2em] uppercase mb-6 font-medium">
              Company
            </h5>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm font-body text-muted-foreground hover:text-[#C6A15B] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 mt-16 border-t border-border md:flex-row">
          <p className="font-body text-muted-foreground text-xs tracking-[0.1em]">
            © {new Date().getFullYear()} SOOTH. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {["Instagram", "Twitter", "Pinterest"].map((social) => (
              <a
                key={social}
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-muted-foreground text-xs tracking-[0.1em] hover:text-[#C6A15B] transition-colors duration-300"
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