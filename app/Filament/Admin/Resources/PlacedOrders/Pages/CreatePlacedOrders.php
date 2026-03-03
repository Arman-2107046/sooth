<?php

namespace App\Filament\Admin\Resources\PlacedOrders\Pages;

use App\Filament\Admin\Resources\PlacedOrders\PlacedOrdersResource;
use Filament\Resources\Pages\CreateRecord;

class CreatePlacedOrders extends CreateRecord
{
    protected static string $resource = PlacedOrdersResource::class;
}
