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
        // Admin user
        User::factory()->create([
            'name'  => 'Admin Java Royale',
            'email' => 'admin@javaroyale.com',
        ]);

        // --- 2 Products with variants and nutrition facts ---

        $jamu = Product::create([
            'name'        => 'Jamu Kunyit Asam',
            'slug'        => 'jamu-kunyit-asam',
            'category'    => 'jamu',
            'description' => 'Minuman herbal tradisional berbahan kunyit dan asam jawa. Diproduksi dengan standar BPOM dan halal, cocok untuk pasar ekspor Asia Tenggara dan Timur Tengah.',
            'advantages'  => [
                'Mengandung curcumin alami dari kunyit pilihan',
                'Bebas pengawet buatan, siap ekspor',
                'Tersedia dalam kemasan sachet, botol, dan bulk',
            ],
            'is_active'   => true,
        ]);

        ProductImage::create([
            'product_id' => $jamu->id,
            'image_path' => 'images/products/jamu-kunyit-asam-1.jpg',
            'alt_text'   => 'Jamu Kunyit Asam Java Royale Nusantara',
            'order'      => 0,
        ]);

        $jamuVariantSachet = ProductVariant::create([
            'product_id'       => $jamu->id,
            'variant_name'     => 'Sachet 15g',
            'ingredients'      => ['Kunyit (Curcuma longa)', 'Asam Jawa', 'Gula Aren', 'Garam'],
            'net_weight'       => '15 g',
            'compliance_notes' => 'BPOM RI MD 123456789012. Halal MUI. Suitable for export to ASEAN, Middle East.',
        ]);

        NutritionFact::create([
            'product_variant_id' => $jamuVariantSachet->id,
            'energy_kcal'        => 45.00,
            'protein_g'          => 0.50,
            'fat_g'              => 0.10,
            'carbs_g'            => 10.80,
            'sugar_g'            => 9.50,
            'sodium_mg'          => 35.00,
        ]);

        $jamuVariantBottle = ProductVariant::create([
            'product_id'       => $jamu->id,
            'variant_name'     => 'Botol 250ml',
            'ingredients'      => ['Kunyit (Curcuma longa)', 'Asam Jawa', 'Gula Aren', 'Garam', 'Air'],
            'net_weight'       => '250 ml',
            'compliance_notes' => 'BPOM RI MD 123456789013. Halal MUI.',
        ]);

        NutritionFact::create([
            'product_variant_id' => $jamuVariantBottle->id,
            'energy_kcal'        => 75.00,
            'protein_g'          => 0.80,
            'fat_g'              => 0.20,
            'carbs_g'            => 18.00,
            'sugar_g'            => 16.00,
            'sodium_mg'          => 58.00,
        ]);

        // Product 2
        $keripik = Product::create([
            'name'        => 'Keripik Nangka Vacuum Fried',
            'slug'        => 'keripik-nangka-vacuum-fried',
            'category'    => 'vacuum-fried-snack',
            'description' => 'Snack nangka renyah diproses dengan teknologi vacuum frying. Mempertahankan warna, aroma, dan nutrisi alami buah. Bebas MSG, rendah minyak, cocok untuk pasar premium global.',
            'advantages'  => [
                'Diproses dengan vacuum frying — kandungan minyak jauh lebih rendah dari keripik konvensional',
                'Tidak ada MSG atau pewarna buatan',
                'Tekstur renyah tahan lama dengan shelf life 12 bulan',
            ],
            'is_active'   => true,
        ]);

        ProductImage::create([
            'product_id' => $keripik->id,
            'image_path' => 'images/products/keripik-nangka-1.jpg',
            'alt_text'   => 'Keripik Nangka Vacuum Fried Java Royale',
            'order'      => 0,
        ]);

        $keripikVariant = ProductVariant::create([
            'product_id'       => $keripik->id,
            'variant_name'     => 'Retail 100g',
            'ingredients'      => ['Nangka (Artocarpus heterophyllus)', 'Minyak Sawit Non-GMO', 'Garam'],
            'net_weight'       => '100 g',
            'compliance_notes' => 'BPOM RI MD 234567890123. Halal MUI. SNI 01-4031-1996.',
        ]);

        NutritionFact::create([
            'product_variant_id' => $keripikVariant->id,
            'energy_kcal'        => 380.00,
            'protein_g'          => 2.50,
            'fat_g'              => 18.00,
            'carbs_g'            => 52.00,
            'sugar_g'            => 38.00,
            'sodium_mg'          => 120.00,
        ]);

        // --- 3 Articles ---

        Article::create([
            'title'           => 'Mengenal Teknologi Vacuum Frying dalam Industri Snack Ekspor',
            'slug'            => 'mengenal-teknologi-vacuum-frying',
            'category'        => 'export-insights',
            'body'            => '<p>Vacuum frying adalah teknologi penggorengan yang dilakukan pada tekanan rendah (vakum), sehingga titik didih minyak turun signifikan. Proses ini menghasilkan snack dengan kadar minyak jauh lebih rendah dibanding penggorengan konvensional.</p><p>Dengan suhu proses yang lebih rendah, warna, aroma, dan kandungan nutrisi buah atau sayuran dapat dipertahankan lebih baik. Inilah yang membuat produk vacuum fried semakin diminati di pasar premium global, termasuk Jepang, Korea, dan negara-negara Eropa.</p><p>Java Royale Nusantara menggunakan mesin vacuum frying berstandar food grade dengan kapasitas produksi yang dapat disesuaikan dengan kebutuhan bulk order internasional.</p>',
            'featured_image'  => null,
            'seo_title'       => 'Teknologi Vacuum Frying untuk Snack Ekspor Premium',
            'seo_description' => 'Pelajari bagaimana teknologi vacuum frying menghasilkan snack buah berkualitas premium untuk pasar ekspor global.',
            'is_published'    => true,
            'published_at'    => now()->subDays(30),
        ]);

        Article::create([
            'title'           => 'Khasiat Kunyit dalam Minuman Herbal Tradisional Indonesia',
            'slug'            => 'khasiat-kunyit-minuman-herbal',
            'category'        => 'health-tips',
            'body'            => '<p>Kunyit (Curcuma longa) telah digunakan dalam pengobatan tradisional Indonesia selama berabad-abad. Kandungan curcumin-nya dikenal memiliki sifat anti-inflamasi dan antioksidan yang kuat.</p><p>Dalam formula Jamu Kunyit Asam Java Royale, kami menggabungkan kunyit pilihan dengan asam jawa dan gula aren untuk menciptakan minuman yang tidak hanya menyehatkan, tetapi juga menyegarkan dan cocok untuk konsumen modern.</p>',
            'featured_image'  => null,
            'seo_title'       => 'Manfaat Kunyit untuk Kesehatan — Jamu Herbal Indonesia',
            'seo_description' => 'Kunyit mengandung curcumin yang kaya antioksidan. Temukan manfaatnya dalam produk jamu herbal Java Royale Nusantara.',
            'is_published'    => true,
            'published_at'    => now()->subDays(15),
        ]);

        Article::create([
            'title'           => 'Peluang Ekspor Produk Herbal Indonesia ke Pasar ASEAN',
            'slug'            => 'peluang-ekspor-herbal-indonesia-asean',
            'category'        => 'export-insights',
            'body'            => '<p>Pasar herbal dan wellness di kawasan ASEAN terus tumbuh signifikan. Konsumen yang semakin sadar kesehatan mendorong permintaan produk alami, termasuk minuman herbal dan snack buah berkualitas tinggi.</p><p>Indonesia memiliki keunggulan kompetitif besar: kekayaan tanaman herbal endemik, tradisi pengolahan yang panjang, dan biaya produksi yang kompetitif. Java Royale Nusantara siap menjadi mitra ekspor terpercaya untuk buyer di Singapura, Malaysia, Filipina, dan Vietnam.</p>',
            'featured_image'  => null,
            'seo_title'       => 'Ekspor Produk Herbal Indonesia ke ASEAN — Peluang dan Prospek',
            'seo_description' => 'Indonesia memimpin pasar herbal ASEAN. Temukan peluang distribusi dan kemitraan ekspor bersama Java Royale Nusantara.',
            'is_published'    => false,
            'published_at'    => null,
        ]);

        // --- 5 FAQ Items ---

        $faqs = [
            [
                'question' => 'Apakah produk Java Royale Nusantara sudah memiliki sertifikasi BPOM dan Halal?',
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
                'question' => 'Ke negara mana saja produk Java Royale Nusantara sudah diekspor?',
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
            'email'            => 'export@javaroyale.com',
            'operating_hours'  => 'Senin–Jumat 08.00–17.00 WIB',
            'social_links'     => [
                'instagram' => 'https://instagram.com/javaroyalenusantara',
                'linkedin'  => 'https://linkedin.com/company/javaroyalenusantara',
            ],
        ]);

        // --- Social embed placeholder ---

        SocialEmbedSetting::create([
            'platform'   => 'instagram',
            'embed_code' => null,
            'link_url'   => 'https://instagram.com/javaroyalenusantara',
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
            'quote'        => 'Kualitas produk Java Royale konsisten dan dokumentasi ekspor sangat lengkap. Kami sudah bermitra lebih dari 2 tahun dan tidak pernah ada masalah di customs.',
            'rating'       => 5,
            'photo'        => null,
            'is_published' => true,
        ]);

        // --- SEO settings ---

        $seoPages = [
            ['page_key' => 'home',     'seo_title' => 'Java Royale Nusantara — Premium Indonesian F&B Export',        'seo_description' => 'Java Royale Nusantara adalah produsen dan eksportir jamu herbal dan vacuum-fried snack premium asal Indonesia. BPOM, Halal, siap ekspor global.'],
            ['page_key' => 'about',    'seo_title' => 'Tentang Java Royale Nusantara — Produsen Herbal & Snack Ekspor', 'seo_description' => 'Kenali Java Royale Nusantara: visi, misi, dan komitmen kami menghadirkan produk F&B Indonesia berkualitas untuk pasar internasional.'],
            ['page_key' => 'products', 'seo_title' => 'Katalog Produk Ekspor — Jamu Herbal & Vacuum-Fried Snack',       'seo_description' => 'Jelajahi katalog lengkap produk Java Royale: jamu kunyit, beras kencur, temulawak, dan keripik buah vacuum fried untuk order ekspor.'],
            ['page_key' => 'contact',  'seo_title' => 'Hubungi Kami — Inquiry Ekspor & Kemitraan Java Royale',          'seo_description' => 'Tertarik menjadi distributor atau melakukan bulk order? Hubungi tim ekspor Java Royale Nusantara sekarang.'],
        ];

        foreach ($seoPages as $seo) {
            SeoSetting::create($seo);
        }
    }
}
