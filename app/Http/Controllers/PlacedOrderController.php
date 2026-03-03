<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Models\PlacedOrders;

class PlacedOrderController extends Controller
{
    public function store(Request $request)
    {
        // ───────── Validation ─────────
        $validated = $request->validate([
            'username' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone_number' => 'required|string|max:50',
            'total_price' => 'required|numeric|min:0',
            'total_quantity' => 'required|integer|min:1',
            'delivery_status' => 'required|in:pending,processing,shipped,delivered,cancelled',
            'payment_status' => 'required|in:pending,paid,failed,refunded',
            'order_summary' => 'required|array',
        ]);

        // ───────── Save Order ─────────
        $order = PlacedOrders::create($validated);

        // ───────── Send Emails ─────────
        $userEmail = $validated['email'];
        $adminEmail = 'admin@soothbangladesh.com';
        $fromEmail = 'noreply@soothbangladesh.com';
        $fromName  = 'Sooth Bangladesh';

        // User email body
        $userEmailBody = <<<TEXT
Hello {$validated['username']},

Your order #{$order->id} has been placed successfully!
Total: ৳{$order->total_price}

To track your order status, please register and login using this email address on our website.

Thank you for shopping with us!
TEXT;

        // Admin email body
        $adminEmailBody = <<<TEXT
New order received!

Order ID: {$order->id}
Customer: {$validated['username']}
Email: {$validated['email']}
Total: ৳{$order->total_price}
TEXT;

        try {
            // Send to user
            if (filter_var($userEmail, FILTER_VALIDATE_EMAIL)) {
                Mail::raw($userEmailBody, function ($message) use ($userEmail, $fromEmail, $fromName) {
                    $message->to($userEmail)
                            ->from($fromEmail, $fromName)
                            ->subject('Your Order Confirmation');
                });
            } else {
                \Log::warning("Invalid user email for order #{$order->id}: {$userEmail}");
            }

            // Send to admin
            Mail::raw($adminEmailBody, function ($message) use ($adminEmail, $fromEmail, $fromName) {
                $message->to($adminEmail)
                        ->from($fromEmail, $fromName)
                        ->subject('New Order Notification');
            });

        } catch (\Exception $e) {
            \Log::error("Failed sending emails for order #{$order->id}: ".$e->getMessage());
        }

        // ───────── Redirect with success message ─────────
        return redirect()->route('order.success')
                         ->with('message', 'Order placed successfully! Confirmation email sent.');
    }
}

// namespace App\Http\Controllers;

// use Illuminate\Http\Request;
// use App\Models\PlacedOrders;

// class PlacedOrderController extends Controller
// {
//     /**
//      * Store a new order
//      */
//     public function store(Request $request)
//     {
//         // ───────── Validation ─────────
//         $validated = $request->validate([
//             'username' => 'required|string|max:255',
//             'email' => 'required|email|max:255',
//             'phone_number' => 'required|string|max:50',
//             'total_price' => 'required|numeric|min:0',
//             'total_quantity' => 'required|integer|min:1',
//             'delivery_status' => 'required|in:pending,processing,shipped,delivered,cancelled',
//             'payment_status' => 'required|in:pending,paid,failed,refunded',
//             'order_summary' => 'required|array',
//         ]);

//         // ───────── Save Order ─────────
//         $order = PlacedOrders::create([
//             'username' => $validated['username'],
//             'email' => $validated['email'],
//             'phone_number' => $validated['phone_number'],
//             'total_price' => $validated['total_price'],
//             'total_quantity' => $validated['total_quantity'],
//             'delivery_status' => $validated['delivery_status'],
//             'payment_status' => $validated['payment_status'],
//             'order_summary' => $validated['order_summary'],
//         ]);

//         // ───────── Return Response ─────────
//         // return response()->json([
//         //     'success' => true,
//         //     'message' => 'Order placed successfully!',
//         //     'order_id' => $order->id,
//         // ]);

//         return redirect()->route('order.success');
//     }
// }
