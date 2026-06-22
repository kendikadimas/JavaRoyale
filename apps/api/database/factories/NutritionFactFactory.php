<?php

namespace Database\Factories;

use App\Models\ProductVariant;
use Illuminate\Database\Eloquent\Factories\Factory;

class NutritionFactFactory extends Factory
{
    public function definition(): array
    {
        return [
            'product_variant_id' => ProductVariant::factory(),
            'energy_kcal'        => $this->faker->randomFloat(2, 20, 450),
            'protein_g'          => $this->faker->randomFloat(2, 0, 15),
            'fat_g'              => $this->faker->randomFloat(2, 0, 20),
            'carbs_g'            => $this->faker->randomFloat(2, 5, 60),
            'sugar_g'            => $this->faker->randomFloat(2, 1, 30),
            'sodium_mg'          => $this->faker->randomFloat(2, 5, 400),
        ];
    }
}
