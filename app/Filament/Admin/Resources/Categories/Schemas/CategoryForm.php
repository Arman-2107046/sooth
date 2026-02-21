<?php

namespace App\Filament\Admin\Resources\Categories\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class CategoryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required(),
                TextInput::make('slug')
                    ->required()
                    ->label('Slug')
                    // ->disabled() // ✅ prevent manual editing, optional
                    ->unique(ignoreRecord: true), // ensure unique slug in DB,


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
