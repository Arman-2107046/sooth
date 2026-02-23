<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\CategoryWiseProduct;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductCatalogController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});



Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



// New Cart route
Route::get('/cart', function () {
    return Inertia::render('Cart');
})->name('cart');

Route::get('/privacy', function () {
    return Inertia::render('PrivacyPolicy');
})->name('privacy.policy');

Route::get('/terms', function () {
    return Inertia::render('Terms');
})->name('terms');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');


Route::get('/checkout', function () {
    return Inertia::render('Checkout');
})->name('checkout');

Route::get('/order-success', function () {
    return Inertia::render('OrderSuccess');
})->name('order.success');

Route::get('/', [HomeController::class, 'index'])->name(name: 'home');


// Product catalog
Route::get('/products', [ProductCatalogController::class, 'index'])->name('products.index');

// Single product page
Route::get('/products/{slug}', [ProductCatalogController::class, 'show'])->name('products.show');


// Category-wise products
Route::get('/category/{slug}', [CategoryWiseProduct::class, 'show'])->name('category.products');


// Single product page
Route::get('/products/{slug}', [ProductCatalogController::class, 'show'])->name('products.show');

Route::middleware('auth')->post('/orders', [OrderController::class, 'store']);


Route::get('/blogs', [BlogController::class, 'index'])->name('blogs.index');
Route::get('/blogs/{slug}', [BlogController::class, 'show'])->name('blogs.show');



// netstat -ano | findstr :3306
// taskkill /PID 18064 /F

// ln -s ../laravel_app/storage/app/public ../public_html/storage


require __DIR__ . '/auth.php';
