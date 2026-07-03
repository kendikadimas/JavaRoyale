<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class NutritionFact extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'energy_kcal',
        'protein_g',
        'fat_g',
        'carbs_g',
        'sugar_g',
        'sodium_mg',
    ];

    protected $casts = [
        'energy_kcal' => 'decimal:2',
        'protein_g'   => 'decimal:2',
        'fat_g'       => 'decimal:2',
        'carbs_g'     => 'decimal:2',
        'sugar_g'     => 'decimal:2',
        'sodium_mg'   => 'decimal:2',
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
