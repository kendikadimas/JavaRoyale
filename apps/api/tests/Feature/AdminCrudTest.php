<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\FaqItem;
use App\Models\BuyerCategory;
use App\Models\Testimonial;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminCrudTest extends TestCase
{
    use RefreshDatabase;

    private User $adminUser;

    protected function setUp(): void
    {
        parent::setUp();
        $this->adminUser = User::factory()->create();
    }

    public function test_admin_can_crud_faq_items(): void
    {
        // 1. Create / Store
        $response = $this->actingAs($this->adminUser)
            ->post(route('admin.faq-items.store'), [
                'question' => 'What is Java Royale?',
                'answer' => 'Java Royale is a premium Indonesian herbal drink brand.',
                'order' => 1,
            ]);

        $response->assertRedirect(route('admin.faq-items.index'));
        $response->assertSessionHas('success');
        $this->assertDatabaseHas('faq_items', [
            'question' => 'What is Java Royale?',
            'answer' => 'Java Royale is a premium Indonesian herbal drink brand.',
            'order' => 1,
        ]);

        $faqItem = FaqItem::first();

        // 2. Edit View
        $response = $this->actingAs($this->adminUser)
            ->get(route('admin.faq-items.edit', $faqItem));
        $response->assertOk();

        // 3. Update
        $response = $this->actingAs($this->adminUser)
            ->put(route('admin.faq-items.update', $faqItem), [
                'question' => 'What is Java Royale Nusantara?',
                'answer' => 'It is a premium Indonesian wellness brand.',
                'order' => 2,
            ]);

        $response->assertRedirect(route('admin.faq-items.index'));
        $response->assertSessionHas('success');
        $this->assertDatabaseHas('faq_items', [
            'id' => $faqItem->id,
            'question' => 'What is Java Royale Nusantara?',
            'answer' => 'It is a premium Indonesian wellness brand.',
            'order' => 2,
        ]);

        // 4. Delete
        $response = $this->actingAs($this->adminUser)
            ->delete(route('admin.faq-items.destroy', $faqItem));

        $response->assertRedirect(route('admin.faq-items.index'));
        $response->assertSessionHas('success');
        $this->assertDatabaseMissing('faq_items', ['id' => $faqItem->id]);
    }

    public function test_admin_can_crud_buyer_categories(): void
    {
        // 1. Create / Store
        $response = $this->actingAs($this->adminUser)
            ->post(route('admin.buyer-categories.store'), [
                'icon' => 'globe',
                'label' => 'Importers',
                'order' => 1,
            ]);

        $response->assertRedirect(route('admin.buyer-categories.index'));
        $response->assertSessionHas('success');
        $this->assertDatabaseHas('buyer_categories', [
            'icon' => 'globe',
            'label' => 'Importers',
            'order' => 1,
        ]);

        $category = BuyerCategory::first();

        // 2. Edit View
        $response = $this->actingAs($this->adminUser)
            ->get(route('admin.buyer-categories.edit', $category));
        $response->assertOk();

        // 3. Update
        $response = $this->actingAs($this->adminUser)
            ->put(route('admin.buyer-categories.update', $category), [
                'icon' => 'truck',
                'label' => 'Distributors',
                'order' => 2,
            ]);

        $response->assertRedirect(route('admin.buyer-categories.index'));
        $response->assertSessionHas('success');
        $this->assertDatabaseHas('buyer_categories', [
            'id' => $category->id,
            'icon' => 'truck',
            'label' => 'Distributors',
            'order' => 2,
        ]);

        // 4. Delete
        $response = $this->actingAs($this->adminUser)
            ->delete(route('admin.buyer-categories.destroy', $category));

        $response->assertRedirect(route('admin.buyer-categories.index'));
        $response->assertSessionHas('success');
        $this->assertDatabaseMissing('buyer_categories', ['id' => $category->id]);
    }

    public function test_admin_can_crud_testimonials(): void
    {
        // 1. Create / Store
        $response = $this->actingAs($this->adminUser)
            ->post(route('admin.testimonials.store'), [
                'author_name' => 'John Doe',
                'company' => 'IndoFood Import Inc.',
                'quote' => 'Amazing authentic products!',
                'rating' => 5,
                'is_published' => 1,
            ]);

        $response->assertRedirect(route('admin.testimonials.index'));
        $response->assertSessionHas('success');
        $this->assertDatabaseHas('testimonials', [
            'author_name' => 'John Doe',
            'company' => 'IndoFood Import Inc.',
            'quote' => 'Amazing authentic products!',
            'rating' => 5,
            'is_published' => 1,
        ]);

        $testimonial = Testimonial::first();

        // 2. Edit View
        $response = $this->actingAs($this->adminUser)
            ->get(route('admin.testimonials.edit', $testimonial));
        $response->assertOk();

        // 3. Update
        $response = $this->actingAs($this->adminUser)
            ->put(route('admin.testimonials.update', $testimonial), [
                'author_name' => 'Jane Doe',
                'company' => 'Global Beverages Co.',
                'quote' => 'Very satisfied with the shipment quality.',
                'rating' => 4,
                'is_published' => 0,
            ]);

        $response->assertRedirect(route('admin.testimonials.index'));
        $response->assertSessionHas('success');
        $this->assertDatabaseHas('testimonials', [
            'id' => $testimonial->id,
            'author_name' => 'Jane Doe',
            'company' => 'Global Beverages Co.',
            'quote' => 'Very satisfied with the shipment quality.',
            'rating' => 4,
            'is_published' => 0,
        ]);

        // 4. Delete
        $response = $this->actingAs($this->adminUser)
            ->delete(route('admin.testimonials.destroy', $testimonial));

        $response->assertRedirect(route('admin.testimonials.index'));
        $response->assertSessionHas('success');
        $this->assertDatabaseMissing('testimonials', ['id' => $testimonial->id]);
    }

    public function test_admin_can_crud_products(): void
    {
        // 1. Create / Store
        $response = $this->actingAs($this->adminUser)
            ->post(route('admin.products.store'), [
                'name' => 'Java Drink Canned',
                'slug' => 'java-drink-canned',
                'category' => 'ready-to-drink',
                'description' => 'Perfect ready-to-drink herbal beverage.',
                'is_active' => 1,
                'advantages' => ['Refreshing', 'Organic', 'Export Quality'],
                'variants' => [
                    [
                        'variant_name' => 'Standard Can 330ml',
                        'net_weight' => '330ml',
                        'compliance_notes' => 'FDA Approved',
                        'ingredients' => ['Turmeric', 'Ginger', 'Tamarind'],
                        'nutrition' => [
                            'energy_kcal' => 120,
                            'protein_g' => 1,
                            'fat_g' => 0,
                            'carbs_g' => 28,
                            'sugar_g' => 24,
                            'sodium_mg' => 10,
                        ]
                    ]
                ]
            ]);

        $response->assertRedirect(route('admin.products.index'));
        $response->assertSessionHas('success');
        $this->assertDatabaseHas('products', [
            'name' => 'Java Drink Canned',
            'slug' => 'java-drink-canned',
            'category' => 'ready-to-drink',
            'is_active' => 1,
        ]);

        $product = Product::first();
        $this->assertDatabaseHas('product_variants', [
            'product_id' => $product->id,
            'variant_name' => 'Standard Can 330ml',
            'net_weight' => '330ml',
        ]);

        // 2. Edit View
        $response = $this->actingAs($this->adminUser)
            ->get(route('admin.products.edit', $product));
        $response->assertOk();

        // 3. Update
        $response = $this->actingAs($this->adminUser)
            ->put(route('admin.products.update', $product), [
                'name' => 'Java Drink Premium Can',
                'slug' => 'java-drink-premium-can',
                'category' => 'ready-to-drink-premium',
                'description' => 'Updated description.',
                'is_active' => 0,
                'advantages' => ['Refreshing', 'Organic'],
                'variants' => [
                    [
                        'variant_name' => 'Premium Can 330ml',
                        'net_weight' => '330ml',
                        'compliance_notes' => 'FDA & EU Approved',
                        'ingredients' => ['Premium Turmeric', 'Ginger'],
                        'nutrition' => [
                            'energy_kcal' => 110,
                            'protein_g' => 1,
                            'fat_g' => 0,
                            'carbs_g' => 25,
                            'sugar_g' => 20,
                            'sodium_mg' => 5,
                        ]
                    ]
                ]
            ]);

        $response->assertRedirect(route('admin.products.index'));
        $response->assertSessionHas('success');
        $this->assertDatabaseHas('products', [
            'id' => $product->id,
            'name' => 'Java Drink Premium Can',
            'slug' => 'java-drink-premium-can',
            'category' => 'ready-to-drink-premium',
            'is_active' => 0,
        ]);

        // 4. Delete
        $response = $this->actingAs($this->adminUser)
            ->delete(route('admin.products.destroy', $product));

        $response->assertRedirect(route('admin.products.index'));
        $response->assertSessionHas('success');
        $this->assertDatabaseMissing('products', ['id' => $product->id]);
    }

    public function test_admin_can_crud_articles(): void
    {
        // 1. Create / Store
        $response = $this->actingAs($this->adminUser)
            ->post(route('admin.articles.store'), [
                'title' => 'Khasiat Jamu Kunyit Asam',
                'slug' => 'khasiat-jamu-kunyit-asam',
                'category' => 'Herbal Health',
                'body' => 'Kunyit asam has many health benefits...',
                'is_published' => 1,
                'seo_title' => 'Khasiat Jamu Kunyit Asam untuk Kesehatan',
                'seo_description' => 'Temukan segudang khasiat kunyit asam...',
            ]);

        $response->assertRedirect(route('admin.articles.index'));
        $response->assertSessionHas('success');
        $this->assertDatabaseHas('articles', [
            'title' => 'Khasiat Jamu Kunyit Asam',
            'slug' => 'khasiat-jamu-kunyit-asam',
            'category' => 'Herbal Health',
            'body' => 'Kunyit asam has many health benefits...',
            'is_published' => 1,
        ]);

        $article = \App\Models\Article::first();

        // 2. Edit View
        $response = $this->actingAs($this->adminUser)
            ->get(route('admin.articles.edit', $article));
        $response->assertOk();

        // 3. Update
        $response = $this->actingAs($this->adminUser)
            ->put(route('admin.articles.update', $article), [
                'title' => 'Khasiat Jamu Kunyit Asam Terbaru',
                'slug' => 'khasiat-jamu-kunyit-asam-terbaru',
                'category' => 'Herbal Health',
                'body' => 'Updated body content.',
                'is_published' => 0,
                'seo_title' => 'Khasiat Jamu Kunyit Asam Terbaru',
                'seo_description' => 'Temukan segudang khasiat kunyit asam...',
            ]);

        $response->assertRedirect(route('admin.articles.index'));
        $response->assertSessionHas('success');
        $this->assertDatabaseHas('articles', [
            'id' => $article->id,
            'title' => 'Khasiat Jamu Kunyit Asam Terbaru',
            'slug' => 'khasiat-jamu-kunyit-asam-terbaru',
            'is_published' => 0,
        ]);

        // 4. Delete
        $response = $this->actingAs($this->adminUser)
            ->delete(route('admin.articles.destroy', $article));

        $response->assertRedirect(route('admin.articles.index'));
        $response->assertSessionHas('success');
        $this->assertDatabaseMissing('articles', ['id' => $article->id]);
    }
}
