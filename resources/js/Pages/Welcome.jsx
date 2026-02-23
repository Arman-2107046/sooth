import BlogSection from "@/Components/AppComponents/BlogComponent";
import CatalogSection from "@/Components/AppComponents/Catalog";
import FeaturedProduct from "@/Components/AppComponents/FeaturedProduct";
import Footer from "@/Components/AppComponents/Footer";
import Hero from "@/Components/AppComponents/Hero";
import Navbar from "@/Components/AppComponents/Navbar";
import NewProducts from "@/Components/AppComponents/NewProducts";
import React from "react";

const Welcome = ({ categories, featuredProducts, newProducts ,latestBlogs,blogCategories}) => {
    return (
        <div>
            <Navbar />
            <Hero />
            <CatalogSection categories={categories} />
            <FeaturedProduct featuredProducts={featuredProducts} />
            <NewProducts newProducts={newProducts} />
            <BlogSection
                latestBlogs={latestBlogs}
                categories={blogCategories}
            />
            <Footer />
        </div>
    );
};

export default Welcome;
