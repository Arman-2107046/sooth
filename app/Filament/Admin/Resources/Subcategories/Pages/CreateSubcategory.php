<?php

namespace App\Filament\Admin\Resources\Subcategories\Pages;

use App\Filament\Admin\Resources\Subcategories\SubcategoryResource;
use Filament\Resources\Pages\CreateRecord;

class CreateSubcategory extends CreateRecord
{
    protected static string $resource = SubcategoryResource::class;
}
