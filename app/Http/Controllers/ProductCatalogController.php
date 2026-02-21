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
            ->paginate(12)   // ✅ 12 products per page
            ->through(fn ($product) => [
                'id' => $product->id,
                'name' => $product->name,
                'slug' => $product->slug,
                'price' => $product->price,
                'status' => $product->status,
                'is_featured' => $product->is_featured,
                'image_1' => $product->image_1,
                'image_2' => $product->image_2,
            ]);

        return Inertia::render('ProductCatalog', [
            'products' => $products,
        ]);
    }

    /**
     * Single product page (unchanged)
     */
    public function show(string $slug)
    {
        $product = Product::with(['category', 'subcategory'])
            ->where('slug', $slug)
            ->firstOrFail();

        return Inertia::render('ProductShow', [
            'product' => $product,
        ]);
    }
}