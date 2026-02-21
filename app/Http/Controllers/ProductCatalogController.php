<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Inertia\Inertia;
use Illuminate\Http\Request;

class ProductCatalogController extends Controller
{
    /**
     * Product catalog with server-side filters and pagination
     */
    public function index(Request $request)
    {
        // Get filter values from request
        $availability = $request->input('availability', 'all'); // 'all', 'in_stock', 'out_of_stock'
        $priceFrom = $request->input('price_from');
        $priceTo = $request->input('price_to');
        $sortOrder = $request->input('sort', 'alphabetical'); // 'alphabetical', 'price_low', 'price_high'
        $categorySlug = $request->input('category'); // optional

        // Start query
        $query = Product::with(['category', 'subcategory']);

        // Filter by availability
        if ($availability === 'in_stock') {
            $query->where('status', 'in_stock');
        } elseif ($availability === 'out_of_stock') {
            $query->where('status', 'out_of_stock');
        }

        // Filter by price
        if (!is_null($priceFrom)) {
            $query->where('price', '>=', $priceFrom);
        }
        if (!is_null($priceTo)) {
            $query->where('price', '<=', $priceTo);
        }

        // Filter by category
        if ($categorySlug) {
            $query->whereHas('category', function ($q) use ($categorySlug) {
                $q->where('slug', $categorySlug);
            });
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

        // Pagination
        $products = $query->paginate(12)
            ->withQueryString() // keep filters on pagination links
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

        // Fetch all categories (name + slug)
        $categories = Category::select('name', 'slug')->get();

        return Inertia::render('ProductCatalog', [
            'products' => $products,
            'categories' => $categories,
            'filters' => [
                'availability' => $availability,
                'price_from' => $priceFrom,
                'price_to' => $priceTo,
                'sort' => $sortOrder,
                'category' => $categorySlug,
            ],
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

    // Product images
    $images = array_filter([
        $product->image_1,
        $product->image_2,
        $product->image_3,
        $product->image_4,
        $product->image_5,
    ]);

    // 🔹 Related products (max 4)
    $relatedProducts = Product::where('id', '!=', $product->id)
        ->where('category_id', $product->category_id)
        ->where('status', 'in_stock')
        ->latest()
        ->limit(4)
        ->get()
        ->map(fn ($item) => [
            'id' => $item->id,
            'name' => $item->name,
            'slug' => $item->slug,
            'price' => $item->price,
            'status' => $item->status,
            'image' => $item->image_1,
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
        'relatedProducts' => $relatedProducts,
    ]);
}
}