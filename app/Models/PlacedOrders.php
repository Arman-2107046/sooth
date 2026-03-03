<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlacedOrders extends Model
{
    use HasFactory;

    // Table name (optional if following Laravel convention)
    // protected $table = 'orders';

    // Mass assignable fields
    protected $fillable = [
        'username',
        'email',
        'phone_number',
        'total_price',
        'total_quantity',
        'delivery_status',
        'payment_status',
        'order_summary',
    ];

    // Cast JSON field to array automatically
    protected $casts = [
        'order_summary' => 'array',
        'total_price' => 'decimal:2',
    ];

    // Optional: you can define enums as constants for cleaner code
//     public const DELIVERY_STATUS = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
//     public const PAYMENT_STATUS = ['pending', 'paid', 'failed', 'refunded'];
}