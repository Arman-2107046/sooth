<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Category;
use App\Models\Product;

class CategoryWiseProduct extends Controller
{
    /**
     * Show products of a specific category with filters
     * 
     * @param string $slug
     */
    public function show(Request $request, string $slug)
    {
        // Find the category by slug along with its subcategories
        $category = Category::with('subcategories')->where('slug', $slug)->firstOrFail();

        // Get filter values from request
        $availability = $request->input('availability', 'all'); // 'all', 'in_stock', 'out_of_stock'
        $priceFrom = $request->input('price_from');
        $priceTo = $request->input('price_to');
        $sortOrder = $request->input('sort', 'alphabetical'); // 'alphabetical', 'price_low', 'price_high'
        $subcategoryId = $request->input('subcategory'); // optional

        // Start query
        $query = Product::with(['category', 'subcategory'])
            ->where(function($q) use ($category) {
                // Products in main category or its subcategories
                $q->where('category_id', $category->id)
                  ->orWhereIn('subcategory_id', $category->subcategories->pluck('id'));
            });

        // Filter by subcategory if selected
        if ($subcategoryId) {
            $query->where('subcategory_id', $subcategoryId);
        }

        // Filter by availability
        if ($availability === 'in_stock') {
            $query->where('status', 'in_stock');
        } elseif ($availability === 'out_of_stock') {
            $query->where('status', 'out_of_stock');
        }

        // Filter by price
        if ($priceFrom !== null) {
            $query->where('price', '>=', $priceFrom);
        }
        if ($priceTo !== null) {
            $query->where('price', '<=', $priceTo);
        }

        // Sort
        if ($sortOrder === 'alphabetical') {
            $query->orderBy('name', 'asc');
        } elseif ($sortOrder === 'price_low') {
            $query->orderBy('price', 'asc');
        } elseif ($sortOrder === 'price_high') {
            $query->orderBy('price', 'desc');
        } else {
            $query->latest();
        }

        // Pagination with query string for filters
        $products = $query->paginate(12)
            ->withQueryString()
            ->through(fn($product) => [
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

        return Inertia::render('CategoryProducts', [
            'category' => [
                'id' => $category->id,
                'name' => $category->name,
                'slug' => $category->slug,
                'subcategories' => $category->subcategories->map(fn($sub) => [
                    'id' => $sub->id,
                    'name' => $sub->name,
                    'slug' => $sub->slug,
                ]),
            ],
            'products' => $products,
            'filters' => [
                'availability' => $availability,
                'price_from' => $priceFrom,
                'price_to' => $priceTo,
                'sort' => $sortOrder,
                'subcategory' => $subcategoryId,
            ],
        ]);
    }
}