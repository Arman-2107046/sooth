import React from "react";
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Dashboard({ orders }) {
    // Map delivery status to colors
    const statusColors = {
        pending: "bg-yellow-100 text-yellow-800",
        processing: "bg-blue-100 text-blue-800",
        shipped: "bg-purple-100 text-purple-800",
        delivered: "bg-green-100 text-green-800",
        cancelled: "bg-red-100 text-red-800",
    };

    return (
        <AuthenticatedLayout
            // header={
            //     <h2 className="text-xl font-semibold leading-tight text-gray-800">
            //         Dashboard
            //     </h2>
            // }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Visit Cart Button */}
                    <div className="flex justify-center mb-8">
                        <Link
                            href="/cart"
                            className="px-6 py-3 text-white uppercase tracking-wider bg-gradient-to-r from-gray-900 to-black border border-black shadow-md hover:shadow-xl transform hover:-translate-y-0.5 transition duration-300"
                        >
                            Visit Your Cart
                        </Link>
                    </div>

                    {/* Orders */}
                    <div className="flex flex-col gap-8">
                        {orders.data.length === 0 && (
                            <p className="text-center text-gray-500">
                                No orders yet.
                            </p>
                        )}

                        {orders.data.map((order) => (
                            <div
                                key={order.id}
                                className="p-6 border border-gray-300"
                            >
                                {/* Order Header */}
                                <div className="flex flex-col mb-4 md:flex-row md:justify-between md:items-center">
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            Order ID #{order.id} •{" "}
                                            {new Date(
                                                order.created_at,
                                            ).toLocaleDateString()}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Payment: {order.payment_status}
                                        </p>
                                    </div>
                                    <span
                                        className={`px-3 py-1 text-sm  rounded-sm ${statusColors[order.delivery_status]}`}
                                    >
                                        {order.delivery_status.toUpperCase()}
                                    </span>
                                </div>

                                {/* Items */}
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                    {order.items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center gap-3 p-2 border border-gray-200"
                                        >
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="object-cover w-16 h-16"
                                            />
                                            <div className="flex flex-col">
                                                <p className="text-sm ">
                                                    {item.name}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Qty: {item.quantity}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Price: ৳{item.price}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Order Total */}
                                <div className="flex justify-end mt-4 text-sm text-gray-700">
                                    Total: ৳{order.total_price}
                                </div>
                            </div>
                        ))}

                        {/* Pagination */}
                        <div className="flex flex-wrap justify-center gap-2">
                            {orders.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || ""}
                                    preserveScroll
                                    preserveState
                                    className={`px-4 py-2 text-sm border ${
                                        link.active
                                            ? "bg-black text-white border-black"
                                            : "border-gray-300 text-gray-600 hover:bg-gray-100"
                                    } ${!link.url && "opacity-40 pointer-events-none"}`}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
