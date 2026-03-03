<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('placed_orders', callback: function (Blueprint $table) {
            $table->id();

            // Customer basic info
            $table->string('username');
            $table->string('email');
            $table->string('phone_number');

            // Order totals
            $table->decimal('total_price', 10, 2);
            $table->integer('total_quantity');

            // Enums for status
            $table->enum('delivery_status', [
                'pending',
                'processing',
                'shipped',
                'delivered',
                'cancelled'
            ])->default('pending');

            $table->enum('payment_status', [
                'pending',
                'paid',
                'failed',
                'refunded'
            ])->default('pending');

            // JSON snapshot of order items + customer details + shipping info
            $table->json('order_summary');


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('placed_orders');
    }
};
