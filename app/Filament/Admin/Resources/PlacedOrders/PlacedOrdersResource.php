<?php

namespace App\Filament\Admin\Resources\PlacedOrders;

use App\Filament\Admin\Resources\PlacedOrders\Pages\CreatePlacedOrders;
use App\Filament\Admin\Resources\PlacedOrders\Pages\EditPlacedOrders;
use App\Filament\Admin\Resources\PlacedOrders\Pages\ListPlacedOrders;
use App\Filament\Admin\Resources\PlacedOrders\Schemas\PlacedOrdersForm;
use App\Filament\Admin\Resources\PlacedOrders\Tables\PlacedOrdersTable;
use App\Models\PlacedOrders;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class PlacedOrdersResource extends Resource
{
    protected static ?string $model = PlacedOrders::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    public static function form(Schema $schema): Schema
    {
        return PlacedOrdersForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return PlacedOrdersTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListPlacedOrders::route('/'),
            'create' => CreatePlacedOrders::route('/create'),
            'edit' => EditPlacedOrders::route('/{record}/edit'),
        ];
    }
}
