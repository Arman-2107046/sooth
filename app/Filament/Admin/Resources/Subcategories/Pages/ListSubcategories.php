<?php

namespace App\Filament\Admin\Resources\Subcategories\Pages;

use App\Filament\Admin\Resources\Subcategories\SubcategoryResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListSubcategories extends ListRecords
{
    protected static string $resource = SubcategoryResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
