<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;

class Admin extends Authenticatable implements FilamentUser
{
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * REQUIRED by Filament
     */
    public function canAccessPanel(Panel $panel): bool
    {
        return true; // or real admin logic
    }
}
