import Footer from "@/Components/AppComponents/Footer";
import Navbar from "@/Components/AppComponents/Navbar";
import React from "react";

const About = () => {
    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-white text-gray-800 px-6 md:px-20 py-16  mt-[4rem]">
                {/* Hero Section */}
                <section className="text-center max-w-4xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        About <span className="text-gray-600">Sooth</span>
                    </h1>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Sooth is more than a fashion brand — it’s a lifestyle.
                        Designed for people who value elegance, comfort, and
                        confidence in every detail.
                    </p>
                </section>

                {/* Brand Story */}
                <section className="grid md:grid-cols-2 gap-12 items-center mb-20">
                    <div>
                        <h2 className="text-3xl font-semibold mb-4">
                            Our Story
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Born from a passion for modern aesthetics and
                            everyday luxury, Sooth was created to blend timeless
                            fashion with contemporary design. We believe fashion
                            should feel effortless, refined, and authentic.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            From carefully curated perfumes to stylish wallets,
                            smartwatches, and skincare essentials — every Sooth
                            product is chosen to elevate your daily life.
                        </p>
                    </div>

                    <div className="bg-gray-100 rounded-2xl p-10 text-center">
                        <h3 className="text-2xl font-semibold mb-3">
                            What We Stand For
                        </h3>
                        <ul className="text-gray-600 space-y-2">
                            <li>• Minimal & premium design</li>
                            <li>• Quality you can feel</li>
                            <li>• Calm, confident lifestyle</li>
                            <li>• Honest pricing</li>
                        </ul>
                    </div>
                </section>

                {/* Mission & Vision */}
                <section className="bg-gray-50 rounded-3xl p-10 md:p-16 mb-20">
                    <h2 className="text-3xl font-semibold mb-6 text-center">
                        Our Mission & Vision
                    </h2>
                    <div className="grid md:grid-cols-2 gap-10">
                        <div>
                            <h3 className="text-xl font-semibold mb-3">
                                Our Mission
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                To deliver thoughtfully designed fashion and
                                lifestyle products that inspire confidence,
                                comfort, and self-expression.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-3">
                                Our Vision
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                To become a trusted global fashion destination
                                known for calm elegance, sustainable choices,
                                and timeless appeal.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Closing */}
                <section className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-semibold mb-4">Why Sooth?</h2>
                    <p className="text-gray-600 leading-relaxed">
                        Because style should feel natural. Because confidence is
                        quiet. Because fashion should{" "}
                        <span className="font-semibold">soothe</span> your life.
                    </p>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default About;
