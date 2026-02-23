import React, { useEffect, useState } from "react";
import Navbar from "@/Components/AppComponents/Navbar";
import Footer from "@/Components/AppComponents/Footer";
import { router, usePage } from "@inertiajs/react";

const SHIPPING_OPTIONS = {
    inside_dhaka: {
        label: "Inside Dhaka",
        price: 60,
    },
    outside_dhaka: {
        label: "Outside of Dhaka",
        price: 120,
    },
};

const Checkout = () => {
    const { auth } = usePage().props; // get authenticated user info
    const [cartItems, setCartItems] = useState([]);
    const [shippingMethod, setShippingMethod] = useState("inside_dhaka");

    const [form, setForm] = useState({
        email: "",
        phone: "",
        first_name: "",
        last_name: "",
        address: "",
        city: "",
        postal_code: "",
    });

    /* ───────── Load Cart ───────── */
    useEffect(() => {
        const storedCart = localStorage.getItem("sooth_cart");
        if (!storedCart) return router.visit("/cart");

        try {
            const parsed = JSON.parse(storedCart);
            if (!parsed.length) router.visit("/cart");
            setCartItems(parsed);
        } catch {
            router.visit("/cart");
        }
    }, []);

    /* ───────── Calculations ───────── */
    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const totalQuantity = cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    const shippingCost = SHIPPING_OPTIONS[shippingMethod].price;
    const total = subtotal + shippingCost;

    /* ───────── Handlers ───────── */
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if user is logged in
        if (!auth?.user) {
            alert("⚠️ Please log in to place an order!");
            router.visit("/login"); // optional: redirect to login page
            return;
        }

        const payload = {
            customer: form,
            items: cartItems.map(item => ({
                id: item.id,
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                image: item.image,
            })),
            subtotal,
            shipping_method: SHIPPING_OPTIONS[shippingMethod].label,
            shipping_cost: shippingCost,
            total_price: total,
            total_quantity: totalQuantity,
            payment_method: "COD",
        };

        console.log("ORDER PAYLOAD:", payload);

        // Post order to backend
        router.post("/orders", payload, {
            onSuccess: () => {
                localStorage.removeItem("sooth_cart"); // clear cart after success
                router.visit("/order-success"); // optional: redirect to success page
            },
        });
    };

    return (
        <>
            <Navbar />

            <section className="min-h-screen bg-gray-50 py-10 mt-[4rem]">
                <div className="max-w-6xl px-4 mx-auto">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

                        {/* ───────── LEFT : FORM ───────── */}
                        <form
                            onSubmit={handleSubmit}
                            className="p-6 space-y-6 bg-white rounded-lg shadow-sm"
                        >
                            {/* Contact */}
                            <div className="space-y-3">
                                <h2 className="text-lg font-semibold">Contact</h2>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="Email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border rounded-md"
                                />
                                <input
                                    type="text"
                                    name="phone"
                                    required
                                    placeholder="Phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border rounded-md"
                                />
                            </div>

                            {/* Delivery */}
                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold">Delivery</h2>

                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        name="first_name"
                                        required
                                        placeholder="First name"
                                        value={form.first_name}
                                        onChange={handleChange}
                                        className="px-4 py-3 border rounded-md"
                                    />
                                    <input
                                        type="text"
                                        name="last_name"
                                        required
                                        placeholder="Last name"
                                        value={form.last_name}
                                        onChange={handleChange}
                                        className="px-4 py-3 border rounded-md"
                                    />
                                </div>

                                <input
                                    type="text"
                                    name="address"
                                    required
                                    placeholder="Address"
                                    value={form.address}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border rounded-md"
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        name="city"
                                        required
                                        placeholder="City"
                                        value={form.city}
                                        onChange={handleChange}
                                        className="px-4 py-3 border rounded-md"
                                    />
                                    <input
                                        type="text"
                                        name="postal_code"
                                        placeholder="Postal code"
                                        value={form.postal_code}
                                        onChange={handleChange}
                                        className="px-4 py-3 border rounded-md"
                                    />
                                </div>
                            </div>

                            {/* Shipping */}
                            <div className="space-y-3">
                                <h2 className="text-lg font-semibold">Shipping method</h2>

                                {Object.entries(SHIPPING_OPTIONS).map(([key, option]) => (
                                    <label
                                        key={key}
                                        className={`flex items-center justify-between p-4 border rounded-md cursor-pointer transition
                                            ${shippingMethod === key ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"}
                                        `}
                                    >
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                checked={shippingMethod === key}
                                                onChange={() => setShippingMethod(key)}
                                            />
                                            <span className="font-medium">{option.label}</span>
                                        </div>
                                        <span className="font-medium">৳{option.price}</span>
                                    </label>
                                ))}
                            </div>

                            {/* Payment */}
                            <div className="space-y-3">
                                <h2 className="text-lg font-semibold">Payment</h2>
                                <div className="flex items-center gap-3 p-4 border rounded-md bg-gray-50">
                                    <input type="radio" checked readOnly />
                                    <span className="font-medium">Cash on Delivery (COD)</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 font-medium text-white transition bg-black rounded-md hover:bg-gray-800"
                            >
                                Place Order
                            </button>
                        </form>

                        {/* ───────── RIGHT : ORDER SUMMARY ───────── */}
                        <div className="p-6 space-y-4 bg-white rounded-lg shadow-sm md:sticky md:top-24 h-fit">
                            <h2 className="text-lg font-semibold">Order summary</h2>

                            {cartItems.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center gap-4 py-3 border-b last:border-b-0"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="object-cover border rounded-md w-14 h-14"
                                    />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">{item.name}</p>
                                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="text-sm font-semibold">
                                        ৳{(item.price * item.quantity).toLocaleString()}
                                    </p>
                                </div>
                            ))}

                            <div className="pt-4 space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>Subtotal ({totalQuantity} items)</span>
                                    <span>৳{subtotal.toLocaleString()}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>৳{shippingCost}</span>
                                </div>
                            </div>

                            <hr />

                            <div className="flex justify-between text-base font-semibold">
                                <span>Total</span>
                                <span>৳{total.toLocaleString()} BDT</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default Checkout;