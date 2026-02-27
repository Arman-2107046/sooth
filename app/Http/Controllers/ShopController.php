<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use Inertia\Inertia;

class ShopController extends Controller
{
    public function index()
    {
        $categories = Category::where('is_active', true)
            ->select('id', 'name', 'slug', 'thumbnail')
            ->orderBy('id')
            ->get();

        return Inertia::render('Shop', [
            'categories' => $categories,
        ]);
    }
}