<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        // Active categories
        $categories = Category::where('is_active', true)
            ->select('id', 'name', 'slug', 'thumbnail')
            ->orderBy('id')
            ->get();

        // Featured products
        $featuredProducts = Product::with(['category', 'subcategory'])
            // ->where('status', 'in_stock')      // only available products
            ->where('is_featured', true)        // only featured
            ->where('status', 'in_stock')     // exclude out-of-stock

            ->latest()
            ->get()
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'slug' => $product->slug,
                    'price' => $product->price,
                    'image_1' => $product->image_1,
                    'category' => $product->category->name ?? null,
                    'subcategory' => $product->subcategory->name ?? null,
                ];
            })
            ->toArray(); // <-- important: convert Collection to array

        // New products (max 8, exclude featured)
        $newProducts = Product::with(['category', 'subcategory'])
            ->where('is_featured', false) // exclude featured
            ->where('status', 'in_stock')     // exclude out-of-stock

            ->latest()

            ->take(8)
            ->get()
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'slug' => $product->slug,
                    'price' => $product->price,
                    'image_1' => $product->image_1,
                    'category' => $product->category->name ?? null,
                    'subcategory' => $product->subcategory->name ?? null,
                    'status' => $product->status,
                    'is_featured' => $product->is_featured,
                ];
            })
            ->toArray();

        return Inertia::render('Welcome', [
            'categories' => $categories,
            'featuredProducts' => $featuredProducts,
            'newProducts' => $newProducts,
        ]);
    }
}
