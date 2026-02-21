<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\Product;
use App\Models\Category;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $images = [
            'https://i.pinimg.com/736x/7b/f3/81/7bf381e851668fb0697e24641696a3fa.jpg',
            'https://i.pinimg.com/1200x/69/d3/3b/69d33b82b0ec0b0f7fee15010417e870.jpg',
            'https://i.pinimg.com/736x/ee/31/02/ee31029a84b200d581cb9802b93d67f0.jpg',
            'https://i.pinimg.com/736x/13/f3/9d/13f39d510a973885468e8c0c64ce1a8a.jpg',
            'https://i.pinimg.com/736x/f4/49/b3/f449b315dd6c467ec0683980ef5f0281.jpg',
        ];

        $categories = Category::with('subcategories')->get();

        // Adjectives to prepend
        $adjectives = ['Premium', 'Classic', 'Modern', 'Eco', 'Limited Edition', 'Stylish', 'Elegant', 'Comfortable'];

        for ($i = 1; $i <= 100; $i++) {
            $category = $categories->random();
            $subcategory = $category->subcategories->random();

            $subcategoryName = $subcategory->name;

            // Generate meaningful product name
            $name = $adjectives[array_rand($adjectives)] . ' ' . $subcategoryName;

            // Shuffle images
            $shuffledImages = collect($images)->shuffle()->values();

            Product::create([
                'category_id' => $category->id,
                'subcategory_id' => $subcategory->id,
                'name' => $name,
                'slug' => Str::slug($name) . '-' . $i,
                'description' => fake()->paragraph(4),
                'price' => fake()->numberBetween(800, 12000),
                'stock_count' => fake()->numberBetween(0, 50),
                'image_1' => $shuffledImages[0],
                'image_2' => $shuffledImages[1],
                'image_3' => $shuffledImages[2],
                'image_4' => $shuffledImages[3],
                'image_5' => $shuffledImages[4],
                'status' => fake()->boolean(85) ? 'in_stock' : 'out_of_stock',
                'is_featured' => fake()->boolean(20),
                'created_at' => now()->subDays(rand(0, 60)),
                'updated_at' => now(),
            ]);
        }
    }
}