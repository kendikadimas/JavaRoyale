<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ArticleFactory extends Factory
{
    public function definition(): array
    {
        $title = $this->faker->sentence(6);

        return [
            'title'           => rtrim($title, '.'),
            'slug'            => Str::slug($title) . '-' . $this->faker->unique()->numberBetween(1, 999),
            'category'        => $this->faker->randomElement(['health-tips', 'news', 'export-insights', 'recipes']),
            'body'            => '<p>' . implode('</p><p>', $this->faker->paragraphs(4)) . '</p>',
            'featured_image'  => null,
            'seo_title'       => rtrim($title, '.'),
            'seo_description' => $this->faker->sentence(12),
            'is_published'    => $this->faker->boolean(70),
            'published_at'    => $this->faker->dateTimeBetween('-6 months', 'now'),
        ];
    }
}
