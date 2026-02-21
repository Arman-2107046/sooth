<?php

namespace App\Filament\Admin\Resources\Subcategories\Schemas;

use App\Models\Category;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class SubcategoryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('category_id')   // ✅ Use Select, not TextInput
                    ->label('Category')
                    ->required()
                    ->options(Category::pluck('name', 'id')->toArray()) // Load all categories
                    ->searchable(), // Allows searching by category name

                TextInput::make('name')
                    ->required(),
                Toggle::make('is_active')
                    ->required(),
            ]);
    }
}
