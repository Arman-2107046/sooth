<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\Blog;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        // ================= ACTIVE CATEGORIES =================
        $categories = Category::where('is_active', true)
            ->select('id', 'name', 'slug', 'thumbnail')
            ->orderBy('id')
            ->get();

        // ================= FEATURED PRODUCTS =================
        $featuredProducts = Product::with(['category', 'subcategory'])
            ->where('is_featured', true)
            ->where('status', 'in_stock')
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
            ->toArray();

        // ================= NEW PRODUCTS =================
        $newProducts = Product::with(['category', 'subcategory'])
            ->where('is_featured', false)
            ->where('status', 'in_stock')
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

        // ================= LATEST 3 BLOG POSTS =================
        $latestBlogs = Blog::where('is_published', true)
            ->latest('published_at')
            ->take(3)
            ->get()
            ->map(function ($blog) {
                return [
                    'id' => $blog->id,
                    'title' => $blog->title,
                    'slug' => $blog->slug,
                    'excerpt' => $blog->excerpt,
                    'thumbnail' => $blog->thumbnail,
                    'category' => $blog->category,
                    'published_at' => $blog->published_at,
                ];
            })
            ->toArray();

        // ================= BLOG CATEGORIES =================
        $blogCategories = [
            'clothing' => 'Clothing',
            'fashion_trends' => 'Fashion Trends',
            'style_guides' => 'Style Guides',
            'lifestyle' => 'Lifestyle',
            'others' => 'Others',
        ];

        // ================= RETURN TO INERTIA =================
        return Inertia::render('Welcome', [
            'categories' => $categories,
            'featuredProducts' => $featuredProducts,
            'newProducts' => $newProducts,
            'latestBlogs' => $latestBlogs,
            'blogCategories' => $blogCategories,
        ]);
    }
}