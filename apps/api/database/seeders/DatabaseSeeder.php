<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\BuyerCategory;
use App\Models\FaqItem;
use App\Models\HomepageSetting;
use App\Models\NutritionFact;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductVariant;
use App\Models\SeoSetting;
use App\Models\SiteSetting;
use App\Models\SocialEmbedSetting;
use App\Models\Testimonial;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        // Admin user — credentials from .env
        $this->call(AdminSeeder::class);

        // --- 3 Products with variants and nutrition facts ---

        // Product 1: JavaDrink Canned
        $canned = Product::create([
            'name'        => 'JavaDrink Canned',
            'slug'        => 'java-drink-canned',
            'description' => 'A refreshing, ready-to-drink canned format that brings the goodness of traditional Javanese jamu into your modern, fast-paced life. Crafted from raw, organic turmeric and tamarind, lightly carbonated for a crisp, energizing finish.',
            'advantages'  => [
                'Curcumin from organic turmeric',
                'Crisp carbonated finish',
                'Ready to drink anywhere',
            ],
            'is_active'   => true,
        ]);

        ProductImage::create([
            'product_id' => $canned->id,
            'image_path' => '/new/canjavadrink.png',
            'alt_text'   => 'JavaDrink Canned',
            'order'      => 0,
        ]);

        ProductImage::create([
            'product_id' => $canned->id,
            'image_path' => '/new/detailjavacanned.png',
            'alt_text'   => 'JavaDrink Canned Detail',
            'order'      => 1,
        ]);

        $cannedVariant = ProductVariant::create([
            'product_id'       => $canned->id,
            'variant_name'     => 'Can 250ml',
            'ingredients'      => ['Turmeric (Curcuma longa)', 'Tamarind', 'Palm Sugar', 'Water', 'Carbonation'],
            'net_weight'       => '250 ml',
            'compliance_notes' => 'GMP Compliant. Halal Certified. Suitable for export globally.',
        ]);

        NutritionFact::create([
            'product_variant_id' => $cannedVariant->id,
            'energy_kcal'        => 75.00,
            'protein_g'          => 0.80,
            'fat_g'              => 0.20,
            'carbs_g'            => 18.00,
            'sodium_mg'          => 58.00,
        ]);

        // Product 2: JavaDrink Powder
        $powder = Product::create([
            'name'        => 'JavaDrink Powder',
            'slug'        => 'java-drink-powder',
            'description' => 'Our signature traditional herbal blend in a soluble powder format, packaged in a premium reusable glass bottle. Made using advanced extraction techniques that preserve essential nutrients, offering a warm and comforting brew for your daily wellness.',
            'advantages'  => [
                'Soluble premium powder',
                'Rich nutrition retention',
                'Comforting warm brew',
            ],
            'is_active'   => true,
        ]);

        ProductImage::create([
            'product_id' => $powder->id,
            'image_path' => '/new/botoldrink.png',
            'alt_text'   => 'JavaDrink Powder Premium Bottle',
            'order'      => 0,
        ]);

        ProductImage::create([
            'product_id' => $powder->id,
            'image_path' => '/new/botolkecil.png',
            'alt_text'   => 'JavaDrink Powder Detail',
            'order'      => 1,
        ]);

        $powderVariant1 = ProductVariant::create([
            'product_id'       => $powder->id,
            'variant_name'     => 'Powder',
            'ingredients'      => ['Turmeric Extract', 'Tamarind Extract', 'Palm Sugar'],
            'net_weight'       => '450 g',
            'compliance_notes' => 'GMP Compliant. Halal Certified.',
        ]);

        NutritionFact::create([
            'product_variant_id' => $powderVariant1->id,
            'energy_kcal'        => 45.00,
            'protein_g'          => 0.50,
            'fat_g'              => 0.10,
            'carbs_g'            => 10.80,
            'sodium_mg'          => 35.00,
        ]);

        $powderVariant2 = ProductVariant::create([
            'product_id'       => $powder->id,
            'variant_name'     => 'Bulk',
            'ingredients'      => ['Turmeric Extract', 'Tamarind Extract', 'Palm Sugar'],
            'net_weight'       => '1 kg',
            'compliance_notes' => 'GMP Compliant. Halal Certified.',
        ]);

        $powderVariant3 = ProductVariant::create([
            'product_id'       => $powder->id,
            'variant_name'     => 'Powder Mini', // This is the Powder Mini variant!
            'ingredients'      => ['Turmeric Extract', 'Tamarind Extract', 'Palm Sugar'],
            'net_weight'       => '200 g',
            'compliance_notes' => 'GMP Compliant. Halal Certified.',
        ]);

        // Product 3: JavaDrink Pouch
        $pouch = Product::create([
            'name'        => 'JavaDrink Pouch',
            'slug'        => 'java-drink-pouch',
            'description' => 'Designed for your travel and on-the-go lifestyle. This resealable stand-up pouch contains convenient single-serve sachets of our premium soluble herbal powders, letting you enjoy authentic Indonesian wellness anywhere in the world.',
            'advantages'  => [
                'Travel pack convenience',
                'Resealable stand-up pouch',
                'Authentic Javanese wellness',
            ],
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

        $pouchVariant1 = ProductVariant::create([
            'product_id'       => $pouch->id,
            'variant_name'     => 'Pouch 200g',
            'ingredients'      => ['Turmeric Extract', 'Tamarind Extract', 'Palm Sugar'],
            'net_weight'       => '200 g',
            'compliance_notes' => 'GMP Compliant. Halal Certified.',
        ]);

        $pouchVariant2 = ProductVariant::create([
            'product_id'       => $pouch->id,
            'variant_name'     => 'Pouch 100g',
            'ingredients'      => ['Turmeric Extract', 'Tamarind Extract', 'Palm Sugar'],
            'net_weight'       => '100 g',
            'compliance_notes' => 'GMP Compliant. Halal Certified.',
        ]);

        $pouchVariant3 = ProductVariant::create([
            'product_id'       => $pouch->id,
            'variant_name'     => 'Pouch 20g',
            'ingredients'      => ['Turmeric Extract', 'Tamarind Extract', 'Palm Sugar'],
            'net_weight'       => '20 g',
            'compliance_notes' => 'GMP Compliant. Halal Certified.',
        ]);

        // --- 3 Articles (English) ---
        $this->call(ArticleSeeder::class);

        // --- 5 FAQ Items ---

        $faqs = [
            [
                'question' => 'Apakah produk Pure Zealand / Java Origins sudah memiliki sertifikasi BPOM dan Halal?',
                'answer'   => 'Ya, seluruh produk kami telah terdaftar di BPOM (Badan Pengawas Obat dan Makanan) dan memiliki sertifikasi Halal dari MUI. Dokumen sertifikasi tersedia untuk keperluan importasi.',
                'order'    => 0,
            ],
            [
                'question' => 'Berapa minimum order quantity (MOQ) untuk pembelian bulk?',
                'answer'   => 'MOQ kami bervariasi per produk. Secara umum, MOQ untuk jamu sachet adalah 5.000 pcs per SKU, sedangkan untuk vacuum-fried snack adalah 500 kg per SKU. Hubungi kami untuk negosiasi MOQ khusus.',
                'order'    => 1,
            ],
            [
                'question' => 'Apakah tersedia layanan private label atau OEM?',
                'answer'   => 'Ya, kami menyediakan layanan private label dan OEM untuk buyer yang ingin menjual produk dengan merek sendiri. Tim kami akan membantu proses dari formulasi hingga desain kemasan.',
                'order'    => 2,
            ],
            [
                'question' => 'Ke negara mana saja produk Java Origins sudah diekspor?',
                'answer'   => 'Produk kami telah dikirim ke Singapura, Malaysia, Uni Emirat Arab, Arab Saudi, Belanda, dan Australia. Kami terbuka untuk pasar baru dan siap membantu proses sertifikasi lokal yang diperlukan.',
                'order'    => 3,
            ],
            [
                'question' => 'Bagaimana cara mengajukan inquiry atau menjadi distributor?',
                'answer'   => 'Isi formulir kontak di halaman Contact kami, atau langsung WhatsApp ke nomor yang tertera. Tim export kami akan merespons dalam 1x24 jam kerja.',
                'order'    => 4,
            ],
        ];

        foreach ($faqs as $faq) {
            FaqItem::create($faq);
        }

        // --- Singleton settings ---

        HomepageSetting::current();
        SiteSetting::firstOrCreate([], [
            'address'          => 'Jl. Raya Industri No. 12, Kawasan Industri Jababeka, Bekasi, Jawa Barat 17530',
            'whatsapp_primary' => '+62811234567',
            'whatsapp_secondary' => '+62822345678',
            'email'            => 'export@javaorigins.com',
            'operating_hours'  => 'Senin–Jumat 08.00–17.00 WIB',
            'social_links'     => [
                'instagram' => 'https://instagram.com/javaorigins',
                'linkedin'  => 'https://linkedin.com/company/javaorigins',
            ],
        ]);

        // --- Social embed placeholder ---

        SocialEmbedSetting::create([
            'platform'   => 'instagram',
            'embed_code' => null,
            'link_url'   => 'https://instagram.com/javaorigins',
            'is_active'  => true,
        ]);

        // --- Buyer categories ---

        $buyerCategories = [
            ['icon' => 'building-storefront', 'label' => 'Importir & Distributor', 'order' => 0],
            ['icon' => 'shopping-bag',        'label' => 'Retail & Supermarket',   'order' => 1],
            ['icon' => 'globe-alt',           'label' => 'E-Commerce Platform',    'order' => 2],
            ['icon' => 'heart',               'label' => 'Health & Wellness Brand','order' => 3],
        ];

        foreach ($buyerCategories as $cat) {
            BuyerCategory::create($cat);
        }

        // --- Testimonial ---

        Testimonial::create([
            'author_name'  => 'Ahmad Fauzi',
            'company'      => 'Nusantara Trading Pte Ltd, Singapura',
            'quote'        => 'Kualitas produk Java Origins konsisten dan dokumentasi ekspor sangat lengkap. Kami sudah bermitra lebih dari 2 tahun dan tidak pernah ada masalah di customs.',
            'rating'       => 5,
            'photo'        => null,
            'is_published' => true,
        ]);

        // --- SEO settings ---

        $seoPages = [
            ['page_key' => 'home',                 'seo_title' => 'Java Origins — Premium Indonesian F&B Export',               'seo_description' => 'Java Origins adalah produsen dan eksportir jamu herbal dan vacuum-fried snack premium asal Indonesia. BPOM, Halal, siap ekspor global.'],
            ['page_key' => 'about',                'seo_title' => 'Tentang Java Origins — Produsen Herbal & Snack Ekspor',        'seo_description' => 'Kenali Pure Zealand: visi, misi, dan komitmen kami menghadirkan produk F&B Indonesia berkualitas untuk pasar internasional.'],
            ['page_key' => 'products',             'seo_title' => 'Katalog Produk Ekspor — Jamu Herbal & Vacuum-Fried Snack',            'seo_description' => 'Jelajahi katalog lengkap produk Java Origins: jamu kunyit, beras kencur, temulawak, dan keripik buah vacuum fried untuk order ekspor.'],
            ['page_key' => 'why-choose-us',        'seo_title' => 'Mengapa Memilih Java Origins — Keunggulan Produk F&B Ekspor',          'seo_description' => 'Temukan keunggulan Java Origins: sertifikasi BPOM & Halal, teknologi vacuum frying, dan komitmen kualitas untuk pasar ekspor global.'],
            ['page_key' => 'market-opportunities', 'seo_title' => 'Peluang Pasar Ekspor — Herbal & Snack Indonesia Global',              'seo_description' => 'Pelajari peluang ekspor produk herbal dan snack Indonesia ke pasar ASEAN, Timur Tengah, Eropa, dan Australia bersama Java Origins.'],
            ['page_key' => 'blog',                 'seo_title' => 'Blog & Artikel — Java Origins',                              'seo_description' => 'Tips kesehatan, insight ekspor, dan berita terbaru dari Java Origins — produsen jamu herbal dan vacuum-fried snack.'],
            ['page_key' => 'faq',                  'seo_title' => 'FAQ — Pertanyaan Umum Seputar Produk & Ekspor Java Origins',            'seo_description' => 'Jawaban untuk pertanyaan umum tentang sertifikasi, MOQ, private label, dan proses ekspor produk Java Origins.'],
            ['page_key' => 'contact',              'seo_title' => 'Hubungi Kami — Inquiry Ekspor & Kemitraan Java Origins',              'seo_description' => 'Tertarik menjadi distributor atau melakukan bulk order? Hubungi tim ekspor Java Origins sekarang.'],
        ];

        foreach ($seoPages as $seo) {
            SeoSetting::create($seo);
        }
    }
}
