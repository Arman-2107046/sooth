import React from "react";
import Navbar from "@/Components/AppComponents/Navbar";
import Footer from "@/Components/AppComponents/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="max-w-5xl px-6 py-24 mx-auto mt-[4rem]">
        <h1 className="mb-6 text-4xl font-extrabold text-center">Privacy Policy</h1>
        <p className="mb-6 leading-relaxed text-gray-700">
          At <span className="font-semibold">SOOTH</span>, your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your personal information when you use our website and services.
        </p>

        <h2 className="mt-10 mb-4 text-2xl font-bold">1. Information We Collect</h2>
        <p className="mb-4 leading-relaxed text-gray-700">
          We collect information to provide better services to our customers. This may include:
        </p>
        <ul className="pl-6 mb-6 leading-relaxed text-gray-700 list-disc">
          <li>Personal information like name, email, phone number, and billing/shipping address.</li>
          <li>Account information if you register an account with us.</li>
          <li>Payment information when you make a purchase.</li>
          <li>Browsing behavior, such as pages visited, products viewed, and purchase history.</li>
        </ul>

        <h2 className="mt-10 mb-4 text-2xl font-bold">2. How We Use Your Information</h2>
        <p className="mb-4 leading-relaxed text-gray-700">
          We use your information to:
        </p>
        <ul className="pl-6 mb-6 leading-relaxed text-gray-700 list-disc">
          <li>Process and fulfill orders, including shipping and payment.</li>
          <li>Improve our website and personalize your shopping experience.</li>
          <li>Send updates about your order, promotions, or new products.</li>
          <li>Protect our website and prevent fraudulent activities.</li>
        </ul>

        <h2 className="mt-10 mb-4 text-2xl font-bold">3. Cookies and Tracking</h2>
        <p className="mb-6 leading-relaxed text-gray-700">
          We use cookies and similar technologies to improve your experience, analyze site usage, and serve relevant content. You can disable cookies in your browser settings, but this may affect the functionality of our website.
        </p>

        <h2 className="mt-10 mb-4 text-2xl font-bold">4. Sharing Your Information</h2>
        <p className="mb-6 leading-relaxed text-gray-700">
          We do not sell your personal information. We may share information with trusted third parties who help us provide services, such as:
        </p>
        <ul className="pl-6 mb-6 leading-relaxed text-gray-700 list-disc">
          <li>Payment processors for order transactions.</li>
          <li>Shipping companies to deliver your products.</li>
          <li>Marketing partners for promotions and updates (with your consent).</li>
        </ul>

        <h2 className="mt-10 mb-4 text-2xl font-bold">5. Data Security</h2>
        <p className="mb-6 leading-relaxed text-gray-700">
          We take appropriate technical and organizational measures to protect your information from unauthorized access, alteration, disclosure, or destruction.
        </p>

        <h2 className="mt-10 mb-4 text-2xl font-bold">6. Your Rights</h2>
        <p className="mb-6 leading-relaxed text-gray-700">
          You have the right to:
        </p>
        <ul className="pl-6 mb-6 leading-relaxed text-gray-700 list-disc">
          <li>Access and update your personal information.</li>
          <li>Request deletion of your data from our system.</li>
          <li>Opt-out of promotional emails and marketing communications.</li>
        </ul>

        <h2 className="mt-10 mb-4 text-2xl font-bold">7. Changes to This Policy</h2>
        <p className="mb-6 leading-relaxed text-gray-700">
          We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated date.
        </p>

        <h2 className="mt-10 mb-4 text-2xl font-bold">8. Contact Us</h2>
        <p className="mb-6 leading-relaxed text-gray-700">
          If you have any questions about this Privacy Policy or your personal data, please contact us at:
        </p>
        <p className="mb-6 leading-relaxed text-gray-700">
          <span className="font-semibold">Email:</span> support@soothbangladesh.com
        </p>
        <p className="mb-6 leading-relaxed text-gray-700">
          <span className="font-semibold">Address:</span> 123 Fashion Street, Dhaka, Bangladesh
        </p>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;