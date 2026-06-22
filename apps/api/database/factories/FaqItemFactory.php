<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class FaqItemFactory extends Factory
{
    public function definition(): array
    {
        static $order = 0;

        return [
            'question' => $this->faker->sentence(8) . '?',
            'answer'   => $this->faker->paragraph(2),
            'order'    => $order++,
        ];
    }
}
