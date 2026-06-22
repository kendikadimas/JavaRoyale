<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HomepageSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'hero_title',
        'hero_subtitle',
        'cta_text',
        'highlighted_product_ids',
    ];

    protected $casts = [
        'highlighted_product_ids' => 'array',
    ];

    /**
     * Get the singleton row, creating it if it doesn't exist.
     */
    public static function current(): static
    {
        return static::firstOrCreate([], [
            'hero_title'              => 'Java Royale Nusantara',
            'hero_subtitle'           => 'Premium Indonesian F&B for Global Markets',
            'cta_text'                => 'Explore Our Products',
            'highlighted_product_ids' => [],
        ]);
    }
}
