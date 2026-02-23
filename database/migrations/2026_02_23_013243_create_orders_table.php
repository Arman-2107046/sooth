<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id(); // This will act as the unique order ID

            // Relationship with user
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();

            // Order basics
            $table->decimal('total_price', 10, 2);
            $table->integer('total_quantity');

            // Enums for status
            $table->enum('delivery_status', ['pending', 'processing', 'shipped', 'delivered', 'cancelled'])
                  ->default('pending');

            $table->enum('payment_status', ['pending', 'paid', 'failed', 'refunded'])
                  ->default('pending');

            // JSON snapshot of order items + customer details + shipping info
            $table->json('order_summary');

            $table->timestamps();

            // Indexes for faster queries
            $table->index(['user_id', 'delivery_status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};