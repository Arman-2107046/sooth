import { Link } from "@inertiajs/react";
import Navbar from "@/Components/AppComponents/Navbar";
import Footer from "@/Components/AppComponents/Footer";

export default function Index({ blogs, categories, activeCategory }) {
    return (
        <div className="min-h-screen bg-blue-50/40">
            <Navbar />

            {/* ================= HERO ================= */}
            <section className="bg-white border-b">
                <div className="px-6 py-24 mx-auto max-w-7xl">
                    <div className="grid items-end gap-12 md:grid-cols-2">
                        {/* Left */}
                        <h1 className="text-6xl font-extrabold leading-tight text-blue-900">
                            News & <br /> Updates
                        </h1>

                        {/* Right */}
                        <div className="text-right">
                            <p className="mb-3 text-lg text-gray-600">
                                Stay informed with the latest news and updates.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= FILTER ================= */}
            <section className="border-b bg-white/70 backdrop-blur">
                <div className="flex flex-wrap items-center gap-6 px-6 py-6 mx-auto text-sm max-w-7xl">
                    <span className="text-gray-500">Filter by</span>

                    {/* ALL */}
                    <Link
                        href={route("blogs.index")}
                        prefetch="hover"
                        className={`transition ${
                            !activeCategory
                                ? "text-blue-900 font-semibold"
                                : "text-gray-400 hover:text-blue-800"
                        }`}
                    >
                        All
                    </Link>

                    {Object.entries(categories).map(([key, label]) => (
                        <Link
                            key={key}
                            href={route("blogs.index", { category: key })}
                            prefetch="hover"
                            className={`transition ${
                                activeCategory === key
                                    ? "text-blue-900 font-semibold"
                                    : "text-gray-400 hover:text-blue-800"
                            }`}
                        >
                            {label}
                        </Link>
                    ))}
                </div>
            </section>

            {/* ================= BLOG GRID ================= */}
            <section className="px-6 py-20 mx-auto max-w-7xl">
                {blogs.data.length === 0 ? (
                    <p className="text-center text-gray-500">
                        No blogs found.
                    </p>
                ) : (
                    <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-3">
                        {blogs.data.map((blog) => (
                            <Link
                                key={blog.id}
                                href={route("blogs.show", blog.slug)}
                                prefetch="hover"
                                className="group"
                            >
                                {/* Image */}
                                <div className="mb-5 overflow-hidden bg-white shadow-sm rounded-xl">
                                    {blog.thumbnail ? (
                                        <img
                                            src={`/storage/${blog.thumbnail}`}
                                            alt={blog.title}
                                            loading="lazy"
                                            decoding="async"
                                            className="object-cover w-full h-64 transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="h-64 bg-blue-100" />
                                    )}
                                </div>

                                {/* Category */}
                                <div className="mb-2 text-xs font-semibold tracking-wide text-blue-600 uppercase">
                                    {categories[blog.category]}
                                </div>

                                {/* Title */}
                                <h2 className="mb-2 text-lg font-semibold leading-snug text-gray-900 group-hover:text-blue-800">
                                    {blog.title}
                                </h2>

                                {/* Excerpt */}
                                <p className="text-sm leading-relaxed text-gray-600 line-clamp-3">
                                    {blog.excerpt}
                                </p>
                            </Link>
                        ))}
                    </div>
                )}

                {/* ================= PAGINATION ================= */}
                {blogs.links.length > 1 && (
                    <div className="flex justify-center gap-3 mt-24 text-sm">
                        {blogs.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url || "#"}
                                prefetch="hover"
                                className={`px-3 py-1 transition ${
                                    link.active
                                        ? "text-blue-900 font-semibold underline underline-offset-4"
                                        : "text-gray-400 hover:text-blue-800"
                                } ${
                                    !link.url &&
                                    "pointer-events-none opacity-50"
                                }`}
                                dangerouslySetInnerHTML={{
                                    __html: link.label,
                                }}
                            />
                        ))}
                    </div>
                )}
            </section>

            <Footer />
        </div>
    );
}