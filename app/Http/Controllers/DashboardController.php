<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Order;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();

        // Fetch latest orders for current user, 5 per page
        $orders = Order::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->paginate(5)
            ->withQueryString();

        // Transform the collection for frontend
        $orders->getCollection()->transform(function ($order) {
            $summary = $order->order_summary; // Already an array thanks to $casts

            return [
                'id' => $order->id,
                'created_at' => $order->created_at,
                'delivery_status' => $order->delivery_status,
                'payment_status' => $order->payment_status,
                'total_price' => $order->total_price,
                'total_quantity' => $order->total_quantity,
                'customer' => $summary['customer'] ?? [],
                'shipping_method' => $summary['shipping_method'] ?? null,
                'shipping_cost' => $summary['shipping_cost'] ?? 0,
                'payment_method' => $summary['payment_method'] ?? null,
                'items' => $summary['items'] ?? [],
            ];
        });

        return Inertia::render('Dashboard', [
            'orders' => $orders
        ]);
    }
}