<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductVariant;
use Illuminate\Database\Seeder;

class ProductPouchSeeder extends Seeder
{
    public function run(): void
    {
        // Skip if already exists
        if (Product::where('slug', 'java-drink-pouch')->exists()) {
            $this->command->info('JavaDrink Pouch already exists, skipping.');
            return;
        }

        $pouch = Product::create([
            'name'        => 'JavaDrink Pouch',
            'slug'        => 'java-drink-pouch',
            'description' => 'Designed for your travel and on-the-go lifestyle. This resealable stand-up pouch contains convenient single-serve sachets of our premium soluble herbal powders, letting you enjoy authentic Indonesian wellness anywhere in the world.',
            'advantages'  => [
                'Travel pack convenience',
                'Resealable stand-up pouch',
                'Authentic Javanese wellness',
            ],
            'sort_order'  => 2,
            'is_active'   => true,
        ]);

        ProductImage::create([
            'product_id' => $pouch->id,
            'image_path' => '/new/pouchjava.png',
            'alt_text'   => 'JavaDrink Pouch Pack',
            'order'      => 0,
        ]);

        ProductImage::create([
            'product_id' => $pouch->id,
            'image_path' => '/fotoproduk.jpeg',
            'alt_text'   => 'JavaDrink Pouch Layout',
            'order'      => 1,
        ]);

        ProductVariant::create([
            'product_id'       => $pouch->id,
            'variant_name'     => 'Pouch 200g',
            'net_weight'       => '200 g',
            'compliance_notes' => 'GMP Compliant. Halal Certified.',
        ]);

        ProductVariant::create([
            'product_id'       => $pouch->id,
            'variant_name'     => 'Pouch 100g',
            'net_weight'       => '100 g',
            'compliance_notes' => 'GMP Compliant. Halal Certified.',
        ]);

        $this->command->info('JavaDrink Pouch seeded successfully.');
    }
}
