import React from "react";
import Navbar from "@/Components/AppComponents/Navbar";
import Footer from "@/Components/AppComponents/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="max-w-5xl px-6 py-24 mx-auto mt-[4rem]">
        <h1 className="mb-6 text-4xl font-extrabold text-center">Terms & Conditions</h1>
        <p className="mb-6 leading-relaxed text-gray-700">
          Welcome to <span className="font-semibold">SOOTH</span>. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.
        </p>

        <h2 className="mt-10 mb-4 text-2xl font-bold">1. Use of Website</h2>
        <p className="mb-4 leading-relaxed text-gray-700">
          You may browse and use our website for personal, non-commercial purposes only. Unauthorized use of this website may give rise to a claim for damages or be a criminal offense.
        </p>

        <h2 className="mt-10 mb-4 text-2xl font-bold">2. Account Registration</h2>
        <p className="mb-4 leading-relaxed text-gray-700">
          When you create an account, you must provide accurate and complete information. You are responsible for maintaining the confidentiality of your account credentials and all activities under your account.
        </p>

        <h2 className="mt-10 mb-4 text-2xl font-bold">3. Orders and Payment</h2>
        <p className="mb-4 leading-relaxed text-gray-700">
          All orders placed through our website are subject to acceptance and availability. Payment must be completed using the methods provided. Prices and promotions are subject to change without prior notice.
        </p>

        <h2 className="mt-10 mb-4 text-2xl font-bold">4. Shipping and Delivery</h2>
        <p className="mb-4 leading-relaxed text-gray-700">
          We strive to deliver orders within the estimated timeframe. However, delays may occur due to unforeseen circumstances. Shipping fees, if any, will be displayed during checkout.
        </p>

        <h2 className="mt-10 mb-4 text-2xl font-bold">5. Returns and Refunds</h2>
        <p className="mb-4 leading-relaxed text-gray-700">
          Returns and refunds are handled in accordance with our Return Policy. Please review our policy carefully before making a purchase. We reserve the right to refuse returns that do not meet the policy conditions.
        </p>

        <h2 className="mt-10 mb-4 text-2xl font-bold">6. Intellectual Property</h2>
        <p className="mb-4 leading-relaxed text-gray-700">
          All content on this website, including images, text, logos, and designs, is the property of <span className="font-semibold">Sooth Fashion</span> and protected by copyright laws. Unauthorized use is strictly prohibited.
        </p>

        <h2 className="mt-10 mb-4 text-2xl font-bold">7. Limitation of Liability</h2>
        <p className="mb-4 leading-relaxed text-gray-700">
          We are not liable for any direct, indirect, incidental, or consequential damages arising from your use of our website, including issues related to products, services, or information provided.
        </p>

        <h2 className="mt-10 mb-4 text-2xl font-bold">8. Governing Law</h2>
        <p className="mb-4 leading-relaxed text-gray-700">
          These terms are governed by the laws of Bangladesh. Any disputes arising from the use of this website shall be subject to the exclusive jurisdiction of the courts in Dhaka.
        </p>

        <h2 className="mt-10 mb-4 text-2xl font-bold">9. Changes to Terms</h2>
        <p className="mb-4 leading-relaxed text-gray-700">
          We reserve the right to modify these terms and conditions at any time. Updates will be posted on this page with the revised date. Continued use of the website constitutes acceptance of the updated terms.
        </p>

        <h2 className="mt-10 mb-4 text-2xl font-bold">10. Contact Us</h2>
        <p className="mb-4 leading-relaxed text-gray-700">
          If you have any questions or concerns regarding these Terms & Conditions, please contact us at:
        </p>
        <p className="mb-6 leading-relaxed text-gray-700">
          <span className="font-semibold">Email:</span> support@soothfashion.com
        </p>
        <p className="mb-6 leading-relaxed text-gray-700">
          <span className="font-semibold">Address:</span> 123 Fashion Street, Dhaka, Bangladesh
        </p>
      </section>

      <Footer />
    </div>
  );
};

export default Terms;