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
        'order_summary'
    ];

    // Cast order_summary to array automatically
    protected $casts = [
        'order_summary' => 'array',
        'total_price' => 'decimal:2',
    ];

    /**
     * Relation: Order belongs to a User
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(related: User::class);
    }
}