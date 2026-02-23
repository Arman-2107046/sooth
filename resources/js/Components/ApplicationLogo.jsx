import { Link } from "@inertiajs/react";

export default function ApplicationLogo(props) {
    return (
          <Link
            href="/"
            className="text-black text-2xl tracking-[0.35em] font-heading"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            SOOTH
          </Link>
    );
}
