<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'total_price',
        'total_quantity',
        'delivery_status',
        'payment_status',
        'order_summary',
    ];

    /**
     * Cast order_summary to array automatically for easy JSON handling,
     * and total_price as decimal.
     */
    protected $casts = [
        'order_summary' => 'array',   // ✅ important for Filament to read nested JSON
        'total_price' => 'decimal:2',
        'total_quantity' => 'integer',
    ];

    /**
     * Relation: Order belongs to a User
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Optional helper to get order items easily
     */
    public function getItemsAttribute()
    {
        return $this->order_summary['items'] ?? [];
    }

    /**
     * Optional helper to get customer info easily
     */
    public function getCustomerAttribute()
    {
        return $this->order_summary['customer'] ?? [];
    }
}