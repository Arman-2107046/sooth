<?php

namespace App\Filament\Admin\Resources\PlacedOrders\Pages;

use App\Filament\Admin\Resources\PlacedOrders\PlacedOrdersResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditPlacedOrders extends EditRecord
{
    protected static string $resource = PlacedOrdersResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
