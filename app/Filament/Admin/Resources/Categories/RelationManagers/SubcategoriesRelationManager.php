<?php

namespace App\Filament\Admin\Resources\Categories\RelationManagers;

use App\Filament\Admin\Resources\Subcategories\SubcategoryResource;
use Filament\Actions\CreateAction;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables\Table;

class SubcategoriesRelationManager extends RelationManager
{
    protected static string $relationship = 'subcategories';

    protected static ?string $relatedResource = SubcategoryResource::class;

    public function table(Table $table): Table
    {
        return $table
            ->headerActions([
                CreateAction::make(),
            ]);
    }
}
