import React, { useState } from "react";
import Navbar from "@/Components/AppComponents/Navbar";
import Footer from "@/Components/AppComponents/Footer";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can call your API or Inertia post to send the message
        console.log("Form submitted:", formData);
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <section className="relative px-6 py-24 bg-gradient-to-b from-gray-50 to-white mt-[4rem]">
                <div className="container max-w-5xl mx-auto">
                    <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-center md:text-5xl">
                        Contact Us
                    </h1>
                    <p className="mb-12 text-center text-gray-600">
                        Have questions or need assistance? Reach out to us and
                        our team will respond promptly.
                    </p>

                    <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                        {/* Contact Info */}
                        <div className="flex flex-col justify-center gap-6">
                            <div>
                                <h2 className="mb-2 text-xl font-semibold">
                                    Our Address
                                </h2>
                                <p className="text-gray-700">
                                    House-52, Road-05, Sector-09, Uttara,
                                    Dhaka-1230{" "}
                                </p>
                            </div>

                            <div>
                                <h2 className="mb-2 text-xl font-semibold">
                                    Email
                                </h2>
                                <p className="text-gray-700">
                                    support@soothbangladesh.com
                                </p>
                            </div>

                            <div>
                                <h2 className="mb-2 text-xl font-semibold">
                                    Phone
                                </h2>
                                <p className="text-gray-700">+8801854661046 </p>
                            </div>

                            <div>
                                <h2 className="mb-2 text-xl font-semibold">
                                    Follow Us
                                </h2>
                                <div className="flex gap-4 mt-2">
                                    <a
                                        href="#"
                                        className="flex items-center justify-center w-10 h-10 transition bg-gray-100 rounded-full hover:bg-gray-200"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5 text-blue-600"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M22 12c0-5.522-4.478-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54v-2.891h2.54v-2.203c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.463h-1.261c-1.243 0-1.63.771-1.63 1.562v1.873h2.773l-.443 2.891h-2.33v6.987C18.343 21.128 22 16.991 22 12z" />
                                        </svg>
                                    </a>
                                    <a
                                        href="#"
                                        className="flex items-center justify-center w-10 h-10 transition bg-gray-100 rounded-full hover:bg-gray-200"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5 text-sky-500"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.165-2.724 9.864 9.864 0 01-3.127 1.195 4.916 4.916 0 00-8.38 4.482A13.944 13.944 0 011.671 3.149 4.916 4.916 0 003.195 9.72a4.903 4.903 0 01-2.229-.616v.062a4.916 4.916 0 003.946 4.827 4.996 4.996 0 01-2.224.084 4.918 4.918 0 004.593 3.417 9.867 9.867 0 01-6.102 2.105c-.396 0-.788-.023-1.175-.069a13.945 13.945 0 007.557 2.213c9.054 0 14.001-7.496 14.001-13.986 0-.213-.005-.425-.014-.636A10.025 10.025 0 0024 4.557z" />
                                        </svg>
                                    </a>
                                    <a
                                        href="#"
                                        className="flex items-center justify-center w-10 h-10 transition bg-gray-100 rounded-full hover:bg-gray-200"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5 text-blue-700"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M22.23 0H1.77C.792 0 0 .774 0 1.729v20.542C0 23.225.792 24 1.77 24H22.23c.978 0 1.77-.774 1.77-1.729V1.729C24 .774 23.208 0 22.23 0zM7.09 20.452H3.545V9h3.545v11.452zM5.318 7.432c-1.134 0-2.055-.924-2.055-2.061 0-1.136.921-2.06 2.055-2.06s2.055.924 2.055 2.06c0 1.137-.921 2.061-2.055 2.061zm15.134 13.02h-3.544v-5.569c0-1.328-.026-3.036-1.848-3.036-1.848 0-2.133 1.444-2.133 2.936v5.669h-3.545V9h3.406v1.561h.049c.475-.899 1.637-1.848 3.369-1.848 3.604 0 4.27 2.371 4.27 5.451v6.287z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="p-8 bg-white shadow-lg rounded-xl">
                            {submitted && (
                                <div className="mb-6 font-semibold text-green-600">
                                    Your message has been sent successfully!
                                </div>
                            )}
                            <form
                                onSubmit={handleSubmit}
                                className="flex flex-col gap-4"
                            >
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="px-4 py-3 border border-black rounded-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="px-4 py-3 border border-black rounded-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                                />
                                <input
                                    type="text"
                                    name="subject"
                                    placeholder="Subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="px-4 py-3 border border-black rounded-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                                />
                                <textarea
                                    name="message"
                                    placeholder="Your Message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="6"
                                    required
                                    className="px-4 py-3 border border-black rounded-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                                ></textarea>
                                <button
                                    type="submit"
                                    className="px-6 py-3 mt-2 text-white transition bg-black rounded-sm hover:bg-black focus:outline-none focus:ring-1 focus:ring-black focus:ring-offset-1"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Contact;
