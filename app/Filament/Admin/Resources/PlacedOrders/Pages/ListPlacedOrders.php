<?php

namespace App\Filament\Admin\Resources\PlacedOrders\Pages;

use App\Filament\Admin\Resources\PlacedOrders\PlacedOrdersResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListPlacedOrders extends ListRecords
{
    protected static string $resource = PlacedOrdersResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
