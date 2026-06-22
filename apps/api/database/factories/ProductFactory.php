<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ProductFactory extends Factory
{
    public function definition(): array
    {
        $name = $this->faker->randomElement([
            'Jamu Kunyit Asam', 'Jamu Beras Kencur', 'Jamu Temulawak', 'Jamu Jahe Merah',
            'Keripik Mangga', 'Keripik Nangka', 'Keripik Durian', 'Keripik Salak',
            'Keripik Pisang', 'Keripik Melon', 'Jamu Sari Rapet', 'Jamu Kunir Putih',
        ]);

        return [
            'name'        => $name,
            'slug'        => Str::slug($name) . '-' . $this->faker->unique()->numberBetween(1, 999),
            'category'    => $this->faker->randomElement(['jamu', 'vacuum-fried-snack']),
            'description' => $this->faker->paragraph(3),
            'advantages'  => [
                $this->faker->sentence(),
                $this->faker->sentence(),
                $this->faker->sentence(),
            ],
            'is_active'   => true,
        ];
    }
}
