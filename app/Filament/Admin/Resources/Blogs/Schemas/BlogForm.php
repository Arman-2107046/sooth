<?php

namespace App\Filament\Admin\Resources\Blogs\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class BlogForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                // LEFT COLUMN
                TextInput::make('title')
                    ->required()
                    ->live(onBlur: true)
                    ->afterStateUpdated(function (string $state, callable $set) {
                        $set('slug', Str::slug($state));
                    }),

                TextInput::make('slug')
                    ->required()
                    ->disabled()
                    ->dehydrated(),

                Select::make('category')
                    ->options([
                        'clothing' => 'Clothing',
                        'fashion_trends' => 'Fashion trends',
                        'style_guides' => 'Style guides',
                        'lifestyle' => 'Lifestyle',
                        'others' => 'Others',
                    ])
                    ->default('clothing')
                    ->required(),
                Textarea::make('excerpt')
                    ->required()
                    ->columnSpanFull(),
                RichEditor::make('content')
                    ->required()
                    ->columnSpanFull()
                    ->toolbarButtons([
                        'h1',
                        'h2',
                        'h3',
                        'bold',
                        'italic',
                        'bulletList',
                        'orderedList',
                        'link',
                        'blockquote',
                    ])
                    ->disableToolbarButtons([
                        'codeBlock',
                        'strike',
                    ]),

                // RIGHT COLUMN
                FileUpload::make('thumbnail')
                    ->label('Thumbnail')
                    ->image()
                    ->disk('public')
                    ->directory('blogs')
                    ->imagePreviewHeight('300'),

                Toggle::make('is_published')
                    ->required(),
                DateTimePicker::make('published_at'),
            ]);
    }
}
