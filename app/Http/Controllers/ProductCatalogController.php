<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;

class ProductCatalogController extends Controller
{
    /**
     * Product catalog with pagination
     */
    public function index()
    {
        $products = Product::with(['category', 'subcategory'])
            ->latest()
            ->paginate(12)
            ->through(fn ($product) => [
                'id' => $product->id,
                'name' => $product->name,
                'slug' => $product->slug,
                'price' => $product->price,
                'status' => $product->status,
                'is_featured' => $product->is_featured,
                'image_1' => $product->image_1,
                'image_2' => $product->image_2,
                'image_3' => $product->image_3,
                'image_4' => $product->image_4,
                'image_5' => $product->image_5,
            ]);

        return Inertia::render('ProductCatalog', [
            'products' => $products,
        ]);
    }

    /**
     * Single product page
     */
    public function show(string $slug)
    {
        $product = Product::with(['category', 'subcategory'])
            ->where('slug', $slug)
            ->firstOrFail();

        // Build images array for all 5 images
        $images = array_filter([
            $product->image_1,
            $product->image_2,
            $product->image_3,
            $product->image_4,
            $product->image_5,
        ]);

        return Inertia::render('ProductShow', [
            'product' => [
                'id' => $product->id,
                'name' => $product->name,
                'slug' => $product->slug,
                'price' => $product->price,
                'status' => $product->status,
                'description' => $product->description,
                'category' => $product->category->name ?? null,
                'subcategory' => $product->subcategory->name ?? null,
                'images' => $images,
            ],
        ]);
    }
}