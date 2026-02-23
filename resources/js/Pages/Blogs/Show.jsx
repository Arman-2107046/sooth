import Footer from "@/Components/AppComponents/Footer";
import Navbar from "@/Components/AppComponents/Navbar";
import { Link } from "@inertiajs/react";
import parse from "html-react-parser";
import { Facebook, Twitter, Linkedin } from "lucide-react";
import { useEffect, useState } from "react";

export default function Show({ blog, relatedBlogs = [], categories }) {
    const [blogUrl, setBlogUrl] = useState("");
    const blogTitle = encodeURIComponent(blog.title);

    // ✅ Safe URL handling (Inertia / SSR friendly)
    useEffect(() => {
        setBlogUrl(encodeURIComponent(window.location.href));
    }, []);

    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${blogUrl}`,
        twitter: `https://twitter.com/intent/tweet?url=${blogUrl}&text=${blogTitle}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${blogUrl}`,
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* ================= ARTICLE ================= */}
            <article className="px-6 py-20 mx-auto max-w-7xl">
                {/* Category */}
                <span className="inline-block mb-4 text-xs font-semibold tracking-wide text-blue-700 uppercase">
                    {categories[blog.category]}
                </span>

                {/* Title */}
                <h1 className="text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl">
                    {blog.title}
                </h1>

                {/* Date */}
                {blog.published_at && (
                    <div className="mt-3 text-sm text-gray-500">
                        {new Date(blog.published_at).toLocaleDateString(
                            undefined,
                            {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            }
                        )}
                    </div>
                )}

                {/* Featured Image */}
                {blog.thumbnail && (
                    <div className="mt-10 overflow-hidden rounded-xl">
                        <img
                            src={`/storage/${blog.thumbnail}`}
                            alt={blog.title}
                            loading="lazy"
                            className="object-cover w-full"
                        />
                    </div>
                )}

                {/* Content */}
                <div
                    className="
                        mt-10
                        leading-7
                        text-gray-800
                        [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mt-10 [&_h1]:mb-4
                        [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-4
                        [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-3
                        [&_p]:my-5
                        [&_ul]:my-5 [&_ul]:pl-6 [&_ul]:list-disc
                        [&_ol]:my-5 [&_ol]:pl-6 [&_ol]:list-decimal
                        [&_li]:my-2
                        [&_strong]:font-semibold
                        [&_a]:text-blue-600 [&_a]:underline
                        [&_blockquote]:border-l-4 [&_blockquote]:border-blue-100
                        [&_blockquote]:pl-4 [&_blockquote]:text-gray-600 [&_blockquote]:my-6
                        [&_hr]:my-10 [&_hr]:border-gray-200
                    "
                >
                    {parse(blog.content)}
                </div>

                {/* ================= SHARE ================= */}
                <div className="flex items-center gap-4 pt-8 mt-12 border-t">
                    <span className="text-xs tracking-wide text-gray-500 uppercase">
                        Share
                    </span>

                    <a
                        href={shareLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 transition rounded-full hover:bg-blue-50"
                        aria-label="Share on Facebook"
                    >
                        <Facebook className="w-5 h-5 text-blue-600" />
                    </a>

                    <a
                        href={shareLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 transition rounded-full hover:bg-sky-50"
                        aria-label="Share on Twitter"
                    >
                        <Twitter className="w-5 h-5 text-sky-500" />
                    </a>

                    <a
                        href={shareLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 transition rounded-full hover:bg-blue-50"
                        aria-label="Share on LinkedIn"
                    >
                        <Linkedin className="w-5 h-5 text-blue-700" />
                    </a>
                </div>

                {/* Back */}
                <div className="pt-10 mt-12 border-t">
                    <Link
                        href={route("blogs.index")}
                        className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-gray-600 uppercase hover:text-gray-900"
                    >
                        ← Back to all articles
                    </Link>
                </div>
            </article>

            {/* ================= RELATED BLOGS ================= */}
            {relatedBlogs.length > 0 && (
                <section className="px-6 pb-24 mx-auto max-w-7xl">
                    <h2 className="mb-10 text-2xl font-bold text-gray-900">
                        You may also like
                    </h2>

                    <div className="grid gap-8 md:grid-cols-3">
                        {relatedBlogs.map((item) => (
                            <Link
                                key={item.id}
                                href={route("blogs.show", item.slug)}
                                className="group"
                            >
                                <div className="mb-4 overflow-hidden rounded-xl">
                                    {item.thumbnail ? (
                                        <img
                                            src={`/storage/${item.thumbnail}`}
                                            alt={item.title}
                                            loading="lazy"
                                            className="object-cover w-full h-48 transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="h-48 bg-gray-100" />
                                    )}
                                </div>

                                <div className="mb-2 text-xs font-semibold tracking-wide text-blue-700 uppercase">
                                    {categories[item.category]}
                                </div>

                                <h3 className="text-sm font-semibold leading-snug text-gray-900 group-hover:underline">
                                    {item.title}
                                </h3>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            <Footer />
        </div>
    );
}




// import Footer from "@/Components/AppComponents/Footer";
// import Navbar from "@/Components/AppComponents/Navbar";
// import { Link } from "@inertiajs/react";
// import parse from "html-react-parser";
// import { Facebook, Twitter, Linkedin } from "lucide-react";

// export default function Show({ blog, relatedBlogs = [], categories }) {
//     const blogUrl = encodeURIComponent(window.location.href);
//     const blogTitle = encodeURIComponent(blog.title);

//     const shareLinks = {
//         facebook: `https://www.facebook.com/sharer/sharer.php?u=${blogUrl}`,
//         twitter: `https://twitter.com/intent/tweet?url=${blogUrl}&text=${blogTitle}`,
//         linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${blogUrl}`,
//     };

//     return (
//         <div className="bg-white">
//             <Navbar />

//             {/* ARTICLE */}
//             <article className="px-6 py-20 mx-auto max-w-7xl">
//                 {/* Category badge */}
//                 <span className="inline-block mb-4 text-xs font-semibold tracking-wide text-blue-700 uppercase">
//                     {categories[blog.category]}
//                 </span>

//                 {/* Title */}
//                 <h1 className="text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl">
//                     {blog.title}
//                 </h1>

//                 {/* Date */}
//                 <div className="mt-3 text-sm text-gray-500">
//                     {new Date(blog.published_at).toLocaleDateString(undefined, {
//                         year: "numeric",
//                         month: "long",
//                         day: "numeric",
//                     })}
//                 </div>

//                 {/* Featured Image */}
//                 {blog.thumbnail && (
//                     <div className="mt-10 overflow-hidden rounded-xl">
//                         <img
//                             src={`/storage/${blog.thumbnail}`}
//                             alt={blog.title}
//                             className="object-cover w-full"
//                         />
//                     </div>
//                 )}

//                 {/* Content */}
//                 <div
//                     className="
//                         mt-10
//                         leading-7
//                         text-gray-800
//                         [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mt-10 [&_h1]:mb-4
//                         [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-4
//                         [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-3
//                         [&_p]:my-5
//                         [&_ul]:my-5 [&_ul]:pl-6 [&_ul]:list-disc
//                         [&_ol]:my-5 [&_ol]:pl-6 [&_ol]:list-decimal
//                         [&_li]:my-2
//                         [&_strong]:font-semibold
//                         [&_a]:text-blue-600 [&_a]:underline
//                         [&_blockquote]:border-l-4 [&_blockquote]:border-blue-100
//                         [&_blockquote]:pl-4 [&_blockquote]:text-gray-600 [&_blockquote]:my-6
//                         [&_hr]:my-10 [&_hr]:border-gray-200
//                     "
//                 >
//                     {parse(blog.content)}
//                 </div>

//                 {/* SHARE */}
//                 <div className="flex items-center gap-4 pt-8 mt-12 border-t">
//                     <span className="text-xs tracking-wide text-gray-500 uppercase">
//                         Share
//                     </span>

//                     <a
//                         href={shareLinks.facebook}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="p-2 transition rounded-full hover:bg-blue-50"
//                         aria-label="Share on Facebook"
//                     >
//                         <Facebook className="w-5 h-5 text-blue-600" />
//                     </a>

//                     <a
//                         href={shareLinks.twitter}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="p-2 transition rounded-full hover:bg-sky-50"
//                         aria-label="Share on Twitter"
//                     >
//                         <Twitter className="w-5 h-5 text-sky-500" />
//                     </a>

//                     <a
//                         href={shareLinks.linkedin}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="p-2 transition rounded-full hover:bg-blue-50"
//                         aria-label="Share on LinkedIn"
//                     >
//                         <Linkedin className="w-5 h-5 text-blue-700" />
//                     </a>
//                 </div>

//                 {/* Back */}
//                 <div className="pt-10 mt-12 border-t">
//                     <Link
//                         href={route("blogs.index")}
//                         className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-gray-600 uppercase hover:text-gray-900"
//                     >
//                         ← Previous Article
//                     </Link>
//                 </div>
//             </article>

//             {/* RELATED BLOGS */}
//             {relatedBlogs.length > 0 && (
//                 <section className="px-6 pb-24 mx-auto max-w-7xl">
//                     <h2 className="mb-10 text-2xl font-bold text-gray-900">
//                         You may also like
//                     </h2>

//                     <div className="grid gap-8 md:grid-cols-3">
//                         {relatedBlogs.map((item) => (
//                             <Link
//                                 key={item.id}
//                                 href={route("blogs.show", item.slug)}
//                                 className="group"
//                             >
//                                 <div className="mb-4 overflow-hidden rounded-xl">
//                                     {item.thumbnail ? (
//                                         <img
//                                             src={`/storage/${item.thumbnail}`}
//                                             alt={item.title}
//                                             className="object-cover w-full h-48 transition-transform duration-500 group-hover:scale-105"
//                                         />
//                                     ) : (
//                                         <div className="h-48 bg-gray-100" />
//                                     )}
//                                 </div>

//                                 <div className="mb-2 text-xs font-semibold tracking-wide text-blue-700 uppercase">
//                                     {categories[item.category]}
//                                 </div>

//                                 <h3 className="text-sm font-semibold leading-snug text-gray-900 group-hover:underline">
//                                     {item.title}
//                                 </h3>
//                             </Link>
//                         ))}
//                     </div>
//                 </section>
//             )}

//             <Footer />
//         </div>
//     );
// }















