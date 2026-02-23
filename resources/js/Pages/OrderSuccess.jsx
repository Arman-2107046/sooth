import React from "react";
import { Link } from "@inertiajs/react";

const OrderSuccess = () => {
  return (
    <div className="flex items-center justify-center py-16 bg-white">
      <div className="w-full max-w-md p-8 space-y-6 text-center border border-gray-300 rounded-xl">
        
        {/* Simple Success Icon */}
        <div className="flex items-center justify-center w-16 h-16 mx-auto bg-gray-100 rounded-full">
          <svg
            className="w-8 h-8 text-gray-800"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Message */}
        <h2 className="text-2xl font-semibold text-gray-900">Order Confirmed</h2>
        <p className="text-gray-700">
          Your order has been successfully placed.
        </p>
        <p className="text-sm text-gray-500">
          A confirmation email has been sent to your email.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          {/* <Link
            href="/orders"
            className="px-5 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800"
          >
            View Orders
          </Link> */}
          <Link
            href="/"
            className="px-5 py-2 text-sm font-medium text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Contact Info */}
        <p className="pt-4 mt-4 text-xs text-gray-500 border-t border-gray-200">
          Need help? Email{" "}
          <a href="mailto:support@example.com" className="underline">
            support@soothbangladesh.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default OrderSuccess;