<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductImageFactory extends Factory
{
    public function definition(): array
    {
        return [
            'product_id' => Product::factory(),
            'image_path' => 'images/products/' . $this->faker->uuid() . '.jpg',
            'alt_text'   => $this->faker->sentence(4),
            'order'      => $this->faker->numberBetween(0, 10),
        ];
    }
}
