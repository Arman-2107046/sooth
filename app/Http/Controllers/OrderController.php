<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class OrderController extends Controller
{
    /**
     * Store a new order
     */
    public function store(Request $request)
    {
            // dd($request->all());

        // ───────── Validation ─────────
        $request->validate([
            'customer' => 'required|array',
            'customer.email' => 'required|email',
            'customer.phone' => 'required|string',
            'customer.first_name' => 'required|string',
            'customer.last_name' => 'required|string',
            'customer.address' => 'required|string',
            'customer.city' => 'required|string',
            'customer.postal_code' => 'nullable|string',
            'items' => 'required|array|min:1',
            'total_price' => 'required|numeric',
            'total_quantity' => 'required|integer',
            'shipping_method' => 'required|string',
            'shipping_cost' => 'required|numeric',
            'payment_method' => 'required|string',
        ]);

        // ───────── Find or Create User ─────────
        $customer = $request->customer;
        $user = User::where('email', $customer['email'])->first();

        if (!$user) {
            $user = User::create([
                'name' => $customer['first_name'] . ' ' . $customer['last_name'],
                'email' => $customer['email'],
                'password' => Hash::make($customer['phone']),
            ]);
        }

        // ───────── Include size for each item ─────────
        $itemsWithSize = array_map(function ($item) {
            return [
                'id' => $item['id'],
                'name' => $item['name'],
                'quantity' => $item['quantity'],
                'price' => $item['price'],
                'image' => $item['image'],
                'size' => $item['size'] ?? null, // ✅ add size
            ];
        }, $request->items);

        // ───────── Create Order ─────────
        $order = Order::create([
            'user_id' => $user->id,
            'total_price' => $request->total_price,
            'total_quantity' => $request->total_quantity,
            'delivery_status' => 'pending',
            'payment_status' => 'pending',
            'order_summary' => [
                'customer' => $customer,
                'items' => $itemsWithSize,
                'shipping_method' => $request->shipping_method,
                'shipping_cost' => $request->shipping_cost,
                'payment_method' => $request->payment_method,
            ],
        ]);

        // ───────── Redirect to success page ─────────
        return redirect()->route('order.success');
    }
}








// namespace App\Http\Controllers;

// use App\Models\Order;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Auth;

// class OrderController extends Controller
// {
//     /**
//      * Store a new order
//      */
//     public function store(Request $request)
//     {
//         $request->validate([
//             'customer' => 'required|array',
//             'customer.email' => 'required|email',
//             'customer.phone' => 'required|string',
//             'customer.first_name' => 'required|string',
//             'customer.last_name' => 'required|string',
//             'customer.address' => 'required|string',
//             'customer.city' => 'required|string',
//             'customer.postal_code' => 'nullable|string',
//             'items' => 'required|array|min:1',
//             'total_price' => 'required|numeric',
//             'total_quantity' => 'required|integer',
//             'shipping_method' => 'required|string',
//             'shipping_cost' => 'required|numeric',
//             'payment_method' => 'required|string',
//         ]);

//         // Create the order
//         $order = Order::create([
//             'user_id' => Auth::id(),
//             'total_price' => $request->total_price,
//             'total_quantity' => $request->total_quantity,
//             'delivery_status' => 'pending',
//             'payment_status' => 'pending',
//             'order_summary' => [
//                 'customer' => $request->customer,
//                 'items' => $request->items,
//                 'shipping_method' => $request->shipping_method,
//                 'shipping_cost' => $request->shipping_cost,
//                 'payment_method' => $request->payment_method,
//             ],
//         ]);
//     return redirect()->route('order.success'); // Make sure this route exists

//         // return response()->json([
//         //     'success' => true,
//         //     'order_id' => $order->id,
//         // ]);
//     }
// }