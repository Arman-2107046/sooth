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

        return Inertia::render('Welcome', [
            'categories' => $categories,
            'featuredProducts' => $featuredProducts,
        ]);
    }
}