<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SiteSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'address',
        'whatsapp_primary',
        'whatsapp_secondary',
        'email',
        'operating_hours',
        'social_links',
    ];

    protected $casts = [
        'social_links' => 'array',
    ];

    /**
     * Get the singleton row, creating it if it doesn't exist.
     */
    public static function current(): static
    {
        return static::firstOrCreate([], [
            'address'          => '',
            'whatsapp_primary' => '',
            'email'            => '',
            'social_links'     => [],
        ]);
    }
}
