import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "@inertiajs/react";

const BlogSection = ({ latestBlogs = [], categories = {} }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  if (!latestBlogs.length) return null; // Hide section if no blogs

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container px-6 lg:px-12">
        {/* Heading */}
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-heading text-foreground text-3xl md:text-4xl tracking-[0.1em] text-center mb-16"
        >
          From the Journal
        </motion.h2>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
          {latestBlogs.map((blog, i) => (
            <motion.article
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="cursor-pointer group"
            >
              {/* Thumbnail */}
              <div className="overflow-hidden aspect-[4/3] mb-6 rounded-xl bg-gray-100">
                {blog.thumbnail ? (
                  <img
                    src={`/storage/${blog.thumbnail}`}
                    alt={blog.title}
                    className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200" />
                )}
              </div>

              {/* Category */}
              <div className="mb-1 text-xs font-semibold tracking-wide text-blue-600 uppercase">
                {categories[blog.category]}
              </div>

              {/* Title */}
              <h3 className="font-heading text-foreground text-xl tracking-[0.05em] mb-3 group-hover:-translate-y-1 transition-transform duration-400">
                {blog.title}
              </h3>

              {/* Excerpt */}
              <p className="mb-4 text-sm leading-relaxed font-body text-muted-foreground line-clamp-3">
                {blog.excerpt}
              </p>

              {/* Read more */}
              <Link
                href={route("blogs.show", blog.slug)}
                className="hover-underline-gold font-body text-foreground text-xs tracking-[0.15em] uppercase pb-1"
              >
                Read More
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;