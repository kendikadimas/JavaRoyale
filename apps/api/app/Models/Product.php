<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'advantages',
        'ingredients',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'advantages'  => 'array',
        'ingredients' => 'array',
        'is_active'   => 'boolean',
    ];

    public function images(): HasMany
    {
        return $this->hasMany(ProductImage::class)->whereNull('product_variant_id')->orderBy('order');
    }

    public function allImages(): HasMany
    {
        return $this->hasMany(ProductImage::class)->orderBy('order');
    }

    public function variants(): HasMany
    {
        return $this->hasMany(ProductVariant::class);
    }

    public function nutritionFact(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(NutritionFact::class);
    }
}
