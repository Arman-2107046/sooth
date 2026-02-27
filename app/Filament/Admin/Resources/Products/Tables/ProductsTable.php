<?php

namespace App\Filament\Admin\Resources\Products\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class ProductsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([

                // ✅ PRODUCT ID
                TextColumn::make('id')
                    ->label('ID')
                    ->sortable(),
                TextColumn::make('category.name') // use relationship
                    ->label('Category')
                    ->sortable(),

                TextColumn::make('subcategory.name') // use relationship
                    ->label('Subcategory')
                    ->sortable(),
                TextColumn::make('name')
                    ->searchable(),
                TextColumn::make('slug')
                    ->searchable(),
                TextColumn::make('old_price')
                    ->money()
                    ->sortable(),
                TextColumn::make('price')
                    ->money()
                    ->sortable(),
                TextColumn::make('stock_count')
                    ->numeric()
                    ->sortable(),
                ImageColumn::make('image_1')
                    ->disk('public')
                    ->size(50), // width & height in px,
                ImageColumn::make('image_2')
                    ->disk('public')
                    ->size(50), // width & height in px,
                ImageColumn::make('image_3')
                    ->disk('public')
                    ->size(50), // width & height in px,
                ImageColumn::make('image_4')
                    ->disk('public')
                    ->size(50), // width & height in px,
                ImageColumn::make('image_5')
                    ->disk('public')
                    ->size(50), // width & height in px,
                TextColumn::make('status')
                    ->badge(),
                IconColumn::make('is_featured')
                    ->boolean(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
