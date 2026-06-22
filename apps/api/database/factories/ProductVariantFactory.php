<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductVariantFactory extends Factory
{
    public function definition(): array
    {
        return [
            'product_id'        => Product::factory(),
            'variant_name'      => $this->faker->randomElement(['Original', 'Sachet 15g', 'Botol 250ml', 'Box 10pcs', 'Bulk 1kg']),
            'ingredients'       => [
                $this->faker->randomElement(['Kunyit', 'Jahe', 'Temulawak', 'Kencur', 'Kayu Manis']),
                $this->faker->randomElement(['Gula Aren', 'Madu', 'Asam Jawa', 'Daun Pandan']),
                $this->faker->randomElement(['Garam', 'Air', 'Cengkeh', 'Kapulaga']),
            ],
            'net_weight'        => $this->faker->randomElement(['15 g', '30 g', '100 g', '250 ml', '500 ml']),
            'compliance_notes'  => $this->faker->optional(0.6)->sentence(10),
        ];
    }
}
