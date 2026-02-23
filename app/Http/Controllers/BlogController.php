<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class BlogController extends Controller
{
    /**
     * Blog listing page (CACHED)
     */
public function index(Request $request)
{
    $categories = [
        'clothing',
        'fashion_trends',
        'style_guides',
        'lifestyle',
        'others',
    ];

    $request->validate([
        'category' => ['nullable', Rule::in($categories)],
    ]);

    $category = $request->category; // 👈 NULL means "ALL"
    $page = $request->input('page', 1);

    $cacheKey = 'blogs:index:' . md5(json_encode([
        'category' => $category,
        'page'     => $page,
    ]));

    $blogs = Cache::remember($cacheKey, 300, function () use ($category) {
        return Blog::query()
            ->where('is_published', true)
            ->when($category, fn ($q) =>
                $q->where('category', $category)
            )
            ->latest('published_at')
            ->paginate(9)
            ->withQueryString();
    });

    return Inertia::render('Blogs/Index', [
        'blogs' => $blogs,
        'categories' => Cache::rememberForever('blog:categories', fn () => [
            'clothing'        => 'Clothing',
            'fashion_trends'  => 'Fashion Trends',
            'style_guides'    => 'Style Guides',
            'lifestyle'       => 'Lifestyle',
            'others'          => 'Others',
        ]),
        'activeCategory' => $category, // 👈 NULL = All
    ]);
}
    /**
     * Single blog page (CACHED)
     */
    public function show(string $slug)
    {
        // 🟢 Main blog cache
        $blog = Cache::remember(
            "blog:{$slug}",
            300,
            fn () => Blog::query()
                ->where('slug', $slug)
                ->where('is_published', true)
                ->firstOrFail()
        );

        // 🟢 Related blogs cache
        $relatedBlogs = Cache::remember(
            "blog:related:{$blog->category}:{$blog->id}",
            300,
            fn () => Blog::query()
                ->where('is_published', true)
                ->where('category', $blog->category)
                ->whereKeyNot($blog->id)
                ->latest('published_at')
                ->limit(3)
                ->get()
        );

        return Inertia::render('Blogs/Show', [
            'blog'         => $blog,
            'relatedBlogs' => $relatedBlogs,

            'categories' => Cache::rememberForever('blog:categories', fn () => [
                'clothing'        => 'Clothing',
                'fashion_trends'  => 'Fashion Trends',
                'style_guides'    => 'Style Guides',
                'lifestyle'       => 'Lifestyle',
                'others'          => 'Others',
            ]),
        ]);
    }
}