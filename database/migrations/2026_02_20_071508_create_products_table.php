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
        Schema::create('products', function (Blueprint $table) {
            $table->id();

            // Relations
            $table->foreignId('category_id')->constrained()->cascadeOnDelete();
            $table->foreignId('subcategory_id')->constrained()->cascadeOnDelete();

            // Product info
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description');

            // Price (BDT)
            $table->unsignedBigInteger('old_price')->nullable(); // ✅ OLD PRICE
            $table->unsignedBigInteger('price');

            // Stock
            $table->unsignedInteger('stock_count')->default(0);

            // Images
            $table->string('image_1');
            $table->string('image_2')->nullable();
            $table->string('image_3')->nullable();
            $table->string('image_4')->nullable();
            $table->string('image_5')->nullable();

            // Status
            $table->enum('status', ['in_stock', 'out_of_stock'])
                ->default('in_stock');

            $table->boolean('is_featured')->default(false)->index();

            // Meta
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
