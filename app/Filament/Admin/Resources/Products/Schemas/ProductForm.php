<?php

namespace App\Filament\Admin\Resources\Products\Schemas;

use App\Models\Category;
use App\Models\Subcategory;
use App\Models\Product;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class ProductForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([

                // Category dropdown
                Select::make('category_id')
                    ->label('Category')
                    ->options(Category::all()->pluck('name', 'id'))
                    ->required()
                    ->reactive()
                    ->afterStateUpdated(fn($state, callable $set) => $set('subcategory_id', null)),

                // Subcategory dropdown filtered by selected category
                Select::make('subcategory_id')
                    ->label('Subcategory')
                    ->options(function (callable $get) {
                        $categoryId = $get('category_id');
                        if (!$categoryId) return [];
                        return Subcategory::where('category_id', $categoryId)->pluck('name', 'id');
                    })
                    ->required(),
                TextInput::make('name')
                    ->label('Title')
                    ->required()
                    ->live(onBlur: true)
                    ->afterStateUpdated(function ($state, callable $set, $record) {
                        if (!$state) return;

                        $baseSlug = Str::slug($state);

                        $count = Product::where('slug', 'LIKE', "{$baseSlug}%")
                            ->when($record, fn($q) => $q->where('id', '!=', $record->id))
                            ->count();

                        $slug = $count ? "{$baseSlug}-" . ($count + 1) : $baseSlug;

                        $set('slug', $slug);
                    }),

                TextInput::make('slug')
                    ->label('Slug')
                    ->required()
                    ->unique(ignoreRecord: true),

                // Textarea::make('description')
                //     ->required()
                //     ->columnSpanFull(),
                RichEditor::make('description')
                    ->required()
                    ->columnSpanFull()
                    ->toolbarButtons([
                        'h1',
                        'h2',
                        'h3',
                        'bold',
                        'italic',
                        'bulletList',
                        'orderedList',
                        'link',
                        'blockquote',
                    ])
                    ->disableToolbarButtons([
                        'codeBlock',
                        'strike',
                    ]),


                TextInput::make('old_price')
                    ->required()
                    ->numeric()
                    ->prefix('BDT'),

                TextInput::make('price')
                    ->required()
                    ->numeric()
                    ->prefix('BDT'),

                TextInput::make('stock_count')
                    ->required()
                    ->numeric()
                    ->default(0),

                // Images with edit preview like CategoryForm
                FileUpload::make('image_1')
                    ->label('Image 1')
                    ->image()
                    ->disk('public')
                    ->directory('products')
                    ->preserveFilenames()
                    // ->getUploadedFileUrlUsing(fn ($record) => $record?->image_1)
                    ->imagePreviewHeight('150')
                    ->required(),

                FileUpload::make('image_2')
                    ->label('Image 2')
                    ->image()
                    ->disk('public')
                    ->directory('products')
                    ->preserveFilenames()
                    // ->getUploadedFileUrlUsing(fn ($record) => $record?->image_2)
                    ->imagePreviewHeight('150'),

                FileUpload::make('image_3')
                    ->label('Image 3')
                    ->image()
                    ->disk('public')
                    ->directory('products')
                    ->preserveFilenames()
                    // ->getUploadedFileUrlUsing(fn ($record) => $record?->image_3)
                    ->imagePreviewHeight('150'),

                FileUpload::make('image_4')
                    ->label('Image 4')
                    ->image()
                    ->disk('public')
                    ->directory('products')
                    ->preserveFilenames()
                    // ->getUploadedFileUrlUsing(fn ($record) => $record?->image_4)
                    ->imagePreviewHeight('150'),

                FileUpload::make('image_5')
                    ->label('Image 5')
                    ->image()
                    ->disk('public')
                    ->directory('products')
                    ->preserveFilenames()
                    // ->getUploadedFileUrlUsing(fn ($record) => $record?->image_5)
                    ->imagePreviewHeight('150'),

                Select::make('status')
                    ->options(['in_stock' => 'In stock', 'out_of_stock' => 'Out of stock'])
                    ->default('in_stock')
                    ->required(),

                Toggle::make('is_featured')
                    ->required(),
            ]);
    }
}
