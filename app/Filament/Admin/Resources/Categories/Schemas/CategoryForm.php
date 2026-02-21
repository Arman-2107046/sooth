<?php

namespace App\Filament\Admin\Resources\Categories\Schemas;

use App\Models\Category;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class CategoryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([

                TextInput::make('name')
                    ->required()
                    ->reactive()
                    ->afterStateUpdated(function ($state, callable $set, $record) {
                        if (! $state) return;

                        $baseSlug = Str::slug($state);

                        // Ignore current record while editing
                        $count = Category::where('slug', 'LIKE', "{$baseSlug}%")
                            ->when($record, fn ($q) => $q->where('id', '!=', $record->id))
                            ->count();

                        $slug = $count ? "{$baseSlug}-" . ($count + 1) : $baseSlug;

                        $set('slug', $slug);
                    }),

                TextInput::make('slug')
                    ->required()
                    ->unique(ignoreRecord: true)
                    ->label('Slug'),

                FileUpload::make('thumbnail')
                    ->label('Thumbnail')
                    ->disk('public')
                    ->directory('categories')
                    ->image()
                    ->preserveFilenames()
                    ->imagePreviewHeight('150'),

                Toggle::make('is_active')
                    ->required(),
            ]);
    }
}