<?php

namespace Database\Seeders;

use App\Models\Article;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ArticleSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        Article::create([
            'title'           => 'Understanding Vacuum Frying Technology in the Premium Snack Export Industry',
            'slug'            => 'understanding-vacuum-frying-technology',
            'category'        => 'export-insights',
            'body'            => '<p>Vacuum frying is a state-of-the-art frying technology performed under low pressure (vacuum) conditions, significantly lowering the boiling point of oil. This process produces delicious fruit and vegetable snacks with a much lower oil content than conventional frying methods.</p><p>By operating at lower processing temperatures, the natural colors, rich aromas, and vital nutrients of the fresh ingredients are preserved. This is why vacuum-fried products are highly sought after in premium global markets, including Japan, South Korea, Europe, and the United States.</p><p>At Java Origins, we utilize high-capacity, food-grade vacuum frying machinery to maintain consistent export quality and support bulk orders worldwide.</p>',
            'featured_image'  => null,
            'seo_title'       => 'Vacuum Frying Technology for Premium Fruit & Vegetable Snacks',
            'seo_description' => 'Discover how vacuum frying preserves nutrients and color in premium snacks, making them ideal for global export.',
            'is_published'    => true,
            'published_at'    => now()->subDays(30),
        ]);

        Article::create([
            'title'           => 'The Health Benefits of Turmeric and Tamarind in Indonesian Jamu',
            'slug'            => 'health-benefits-turmeric-tamarind-jamu',
            'category'        => 'health-tips',
            'body'            => '<p>Turmeric (Curcuma longa) and Tamarind (Tamarindus indica) have been core ingredients in traditional Indonesian wellness (Jamu) for centuries. Curcumin, the main active compound in turmeric, is scientifically recognized for its powerful anti-inflammatory and antioxidant properties.</p><p>When combined with the refreshing, potassium-rich tamarind, it forms a natural functional blend that supports digestion, detoxifies the body, and boosts immunity.</p><p>Our Java Origins Canned and Powder products recreate this authentic recipe using organic ingredients sourced directly from Javanese farms, crafted for the modern global consumer.</p>',
            'featured_image'  => null,
            'seo_title'       => 'Anti-inflammatory Benefits of Turmeric & Tamarind Jamu',
            'seo_description' => 'Explore the scientifically-proven wellness benefits of Jamu Kunyit Asam (Turmeric Tamarind) and how it fits your daily routine.',
            'is_published'    => true,
            'published_at'    => now()->subDays(15),
        ]);

        Article::create([
            'title'           => 'The Rise of Traditional Wellness in Global Markets: Export Opportunities for Jamu',
            'slug'            => 'rise-traditional-wellness-export-opportunities-jamu',
            'category'        => 'export-insights',
            'body' => '<p>The global health and wellness market has experienced unprecedented growth, with consumers actively seeking authentic, plant-based functional beverages. Traditional Indonesian Jamu is uniquely positioned to capture this demand.</p><p>Indonesia\'s rich volcanic soil yields highly potent herbal ingredients. By adopting international food safety standards and modern convenient packaging, Java Origins is leading the way in bringing authentic Indonesian wellness to distributors and retailers worldwide.</p>',
            'featured_image'  => null,
            'seo_title'       => 'Exporting Jamu to Global Health & Wellness Markets',
            'seo_description' => 'Analyze the growing global demand for natural functional drinks and the export potential of Indonesian herbal beverages.',
            'is_published'    => true,
            'published_at'    => now()->subDays(5),
        ]);
    }
}
