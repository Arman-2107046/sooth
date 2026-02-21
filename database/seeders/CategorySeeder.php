<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $thumbnailUrl = 'https://i.pinimg.com/474x/80/de/17/80de17bef274e07e137b6b8397370e90.jpg';

        $categories = [
            [
                'name' => "Men's Fashion",
                'slug' => 'mens-fashion',
                'thumbnail' => $thumbnailUrl,
                'is_active' => true,
                'subcategories' => [
                    ['name' => 'Shirts', 'is_active' => true],
                    ['name' => 'Trousers', 'is_active' => true],
                    ['name' => 'Jackets', 'is_active' => true],
                    ['name' => 'Accessories', 'is_active' => true],
                ],
            ],
            [
                'name' => "Women's Fashion",
                'slug' => 'womens-fashion',
                'thumbnail' => $thumbnailUrl,
                'is_active' => true,
                'subcategories' => [
                    ['name' => 'Dresses', 'is_active' => true],
                    ['name' => 'Tops', 'is_active' => true],
                    ['name' => 'Bottoms', 'is_active' => true],
                    ['name' => 'Accessories', 'is_active' => true],
                ],
            ],
            [
                'name' => "Kid's Fashion",
                'slug' => 'kids-fashion',
                'thumbnail' => $thumbnailUrl,
                'is_active' => true,
                'subcategories' => [
                    ['name' => 'Boys Clothing', 'is_active' => true],
                    ['name' => 'Girls Clothing', 'is_active' => true],
                    ['name' => 'Shoes', 'is_active' => true],
                    ['name' => 'Accessories', 'is_active' => true],
                ],
            ],
            [
                'name' => "Unisex",
                'slug' => 'unisex-fashion',
                'thumbnail' => $thumbnailUrl,
                'is_active' => true,
                'subcategories' => [
                    ['name' => 'Hoodies', 'is_active' => true],
                    ['name' => 'T-Shirts', 'is_active' => true],
                    ['name' => 'Sneakers', 'is_active' => true],
                    ['name' => 'Caps', 'is_active' => true],
                ],
            ],
        ];

        foreach ($categories as $catData) {
            $subcategories = $catData['subcategories'];
            unset($catData['subcategories']);

            $category = Category::create($catData);

            foreach ($subcategories as $subcat) {
                $category->subcategories()->create($subcat);
            }
        }
    }
}