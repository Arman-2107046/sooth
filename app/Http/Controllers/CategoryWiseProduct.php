<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Category;
use App\Models\Product;

class CategoryWiseProduct extends Controller
{
    /**
     * Show products of a specific category
     * 
     * @param string $slug
     */
    public function show(string $slug)
    {
        // Find the category by slug
        $category = Category::with('subcategories')->where('slug', $slug)->firstOrFail();

        // Get all products in this category and its subcategories
        $products = Product::with(['category', 'subcategory'])
            ->where('category_id', $category->id)
            ->orWhereIn('subcategory_id', $category->subcategories->pluck('id'))
            ->latest()
            ->paginate(12) // 12 products per page
            ->through(fn($product) => [
                'id' => $product->id,
                'name' => $product->name,
                'slug' => $product->slug,
                'price' => $product->price,
                'status' => $product->status,
                'is_featured' => $product->is_featured,
                'image_1' => $product->image_1,
                'image_2' => $product->image_2,
            ]);

        return Inertia::render('CategoryProducts', [
            'category' => [
                'id' => $category->id,
                'name' => $category->name,
                'slug' => $category->slug,
            ],
            'products' => $products,
        ]);
    }
}