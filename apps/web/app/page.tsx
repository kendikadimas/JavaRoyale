import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getHomepageSetting, getProducts, getSeoSetting, getSiteSetting, getTestimonials, getSocialEmbedSettings, imageUrl, assetUrl } from '@/lib/api';
import { TestimonialSection } from '@/components/TestimonialSection';
import { SocialEmbedWidget } from '@/components/SocialEmbedWidget';
import { NaturalIngredients } from '@/components/NaturalIngredients';
import { FaqInline } from '@/components/FaqInline';
import { ArrowRight, Leaf, Certificate, Globe, Truck } from '@phosphor-icons/react/dist/ssr';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoSetting('home');
  return {
    title: seo?.seo_title ?? 'Java Royale Nusantara — Premium Indonesian F&B Export',
    description: seo?.seo_description ?? undefined,
  };
}

export default async function HomePage() {
  const [hero, productsRes, site, testimonials, embeds] = await Promise.all([
    getHomepageSetting().catch(() => null),
    getProducts({ page: 1 }).catch(() => null),
    getSiteSetting().catch(() => null),
    getTestimonials().catch(() => []),
    getSocialEmbedSettings().catch(() => []),
  ]);

  const featuredIds = hero?.highlighted_product_ids ?? [];
  const allProducts = productsRes?.data ?? [];
  const featured = featuredIds.length > 0
    ? allProducts.filter((p) => featuredIds.includes(p.id))
    : allProducts.slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[100dvh] bg-earth-900 flex flex-col justify-center overflow-hidden pt-16">
        {/* Background accent */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#F6D400_0%,_transparent_50%)] opacity-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-brand-yellow/20 text-brand-yellow text-xs font-semibold tracking-widest uppercase mb-6">
              Indonesia &rarr; Global
            </span>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05] tracking-tight mb-6">
              {hero?.hero_title ?? 'Premium Indonesian F&B for Global Markets'}
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed max-w-lg mb-8">
              {hero?.hero_subtitle ?? 'Artisan Jamu herbal drinks and vacuum-fried tropical snacks. BPOM certified, Halal, ready for worldwide export.'}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-yellow text-brand-black font-semibold hover:bg-brand-orange transition-colors"
              >
                {hero?.cta_text ?? 'Explore Products'} <ArrowRight size={16} weight="bold" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-earth-800">
              <Image
                src={assetUrl('talljavaproduct.jpeg')}
                alt="Java Royale premium drink products"
                fill
                className="object-cover mix-blend-luminosity opacity-70"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-earth-900/80 to-transparent" />
              {/* Floating badge */}
              <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3">
                <p className="text-white/60 text-xs">Exported to</p>
                <p className="text-white font-semibold text-sm">UAE &bull; Singapore &bull; Netherlands &bull; Australia</p>
              </div>
            </div>
            {/* Decorative dot */}
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full border-2 border-brand-yellow/30" />
          </div>
        </div>
      </section>

      {/* TRUST SIGNALS */}
      <section className="bg-brand-yellow">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: <Certificate size={24} weight="fill" />, label: 'BPOM Certified' },
            { icon: <Leaf size={24} weight="fill" />, label: 'Halal MUI' },
            { icon: <Globe size={24} weight="fill" />, label: 'Export Ready' },
            { icon: <Truck size={24} weight="fill" />, label: 'Global Shipping' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <span className="text-brand-black">{item.icon}</span>
              <span className="font-display font-semibold text-brand-black text-sm">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE JAVA DRINK */}
      <section className="bg-gradient-to-b from-white to-earth-50 py-20 lg:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-yellow/20 text-brand-orange text-xs font-semibold tracking-widest uppercase mb-4">
              Why Choose
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-brand-black tracking-tight leading-[1.08]">
              Java Drink?
            </h2>
            <p className="text-gray-500 mt-4 text-base leading-relaxed">
              Every sip is a journey through Indonesia&rsquo;s finest herbs, crafted with tradition and delivered with modern quality assurance.
            </p>
          </div>

          {/* Bento grid — asymmetric layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {/* Item 1 — spans 2 cols */}
            <div className="md:col-span-2 bg-earth-900 text-white rounded-3xl p-7 md:p-9 flex flex-col justify-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-brand-yellow/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />
              <span className="font-display font-black text-4xl text-brand-yellow/30 mb-2 leading-none">01</span>
              <h3 className="font-display font-bold text-xl md:text-2xl text-white mb-2 relative">Authentic Indonesian Jamu Recipe</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-lg relative">
                Rooted in centuries of Indonesian herbal wisdom. Our recipes are passed down and perfected for the global palate — offering genuine Jamu experience in every bottle.
              </p>
            </div>

            {/* Item 2 */}
            <div className="bg-brand-yellow/10 border border-brand-yellow/20 rounded-3xl p-7 md:p-9 flex flex-col justify-center group hover:bg-brand-yellow/20 transition-colors">
              <span className="font-display font-black text-4xl text-brand-yellow/40 mb-2 leading-none">02</span>
              <h3 className="font-display font-bold text-lg md:text-xl text-brand-black mb-2">Natural Herbal Ingredients</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                100% natural ingredients sourced directly from Indonesian farmers. No fillers, no shortcuts — just pure herbal goodness.
              </p>
            </div>

            {/* Item 3 */}
            <div className="bg-white border border-earth-100 rounded-3xl p-7 md:p-9 flex flex-col justify-center group hover:border-brand-red/30 hover:shadow-sm transition-all">
              <span className="font-display font-black text-4xl text-brand-red/20 mb-2 leading-none">03</span>
              <h3 className="font-display font-bold text-lg md:text-xl text-brand-black mb-2">No Artificial Colors or Preservatives</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Clean label commitment. What you see is what nature intended — vibrant colours from turmeric, sweetness from palm sugar, freshness from lime.
              </p>
            </div>

            {/* Item 4 */}
            <div className="bg-white border border-earth-100 rounded-3xl p-7 md:p-9 flex flex-col justify-center group hover:border-brand-green/30 hover:shadow-sm transition-all">
              <span className="font-display font-black text-4xl text-brand-green/20 mb-2 leading-none">04</span>
              <h3 className="font-display font-bold text-lg md:text-xl text-brand-black mb-2">Refreshing &amp; Easy to Enjoy</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Ready-to-drink convenience without compromising on authenticity. Perfect for modern consumers seeking a healthy, delicious herbal beverage.
              </p>
            </div>

            {/* Item 5 — spans 2 cols */}
            <div className="md:col-span-2 bg-gradient-to-r from-brand-orange/10 to-brand-yellow/10 border border-brand-yellow/20 rounded-3xl p-7 md:p-9 flex flex-col justify-center relative overflow-hidden group">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-orange/20 rounded-full blur-3xl pointer-events-none" />
              <span className="font-display font-black text-4xl text-brand-orange/30 mb-2 leading-none">05</span>
              <h3 className="font-display font-bold text-xl md:text-2xl text-brand-black mb-2 relative">Premium Quality Ingredients</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-lg relative">
                We source only the finest herbs, spices, and sweeteners. Each batch is inspected, tested, and approved before it reaches your market.
              </p>
            </div>
          </div>

          {/* Last row — 3 items */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto mt-4">
            {/* Item 6 */}
            <div className="bg-earth-900 text-white rounded-3xl p-7 md:p-9 flex flex-col justify-center relative overflow-hidden group">
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-brand-yellow/10 rounded-full blur-2xl pointer-events-none" />
              <span className="font-display font-black text-4xl text-brand-yellow/30 mb-2 leading-none">06</span>
              <h3 className="font-display font-bold text-lg md:text-xl text-white mb-2 relative">Export-Quality Standards</h3>
              <p className="text-gray-400 text-sm leading-relaxed relative">
                BPOM registered, Halal MUI certified, and produced in GMP facilities. Full export documentation and Certificate of Analysis available for every order.
              </p>
            </div>

            {/* CTA card — spans 2 cols */}
            <div className="md:col-span-2 bg-brand-yellow rounded-3xl p-7 md:p-9 flex flex-col md:flex-row items-center justify-between gap-5">
              <div>
                <p className="font-display font-bold text-xl md:text-2xl text-brand-black">Ready to taste the difference?</p>
                <p className="text-brand-black/70 text-sm mt-1">Explore our full range of Jamu herbal drinks.</p>
              </div>
              <Link
                href="/products"
                className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-black text-white font-semibold text-sm hover:bg-earth-800 transition-colors"
              >
                View Products <ArrowRight size={14} weight="bold" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      {featured.length > 0 && (
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="font-display font-bold text-3xl md:text-4xl text-brand-black">
                  Our Products
                </h2>
                <p className="text-gray-500 mt-2">Handcrafted with the finest Indonesian ingredients</p>
              </div>
              <Link href="/products" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-brand-orange hover:text-brand-red transition-colors">
                View all <ArrowRight size={14} weight="bold" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featured.slice(0, 3).map((product, i) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className={`group relative overflow-hidden rounded-2xl ${
                    i === 0 ? 'md:row-span-1' : ''
                  } bg-earth-50 border border-earth-100 hover:border-brand-yellow transition-all hover:shadow-lg`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {product.images[0] ? (
                      <Image
                        src={imageUrl(product.images[0].image_path)}
                        alt={product.images[0].alt_text ?? product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-earth-200 flex items-center justify-center">
                        <Leaf size={48} className="text-earth-400" />
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-brand-yellow text-brand-black text-xs font-semibold capitalize">
                        {product.category.replace(/-/g, ' ')}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-bold text-brand-black text-lg mb-1 group-hover:text-brand-orange transition-colors">{product.name}</h3>
                    <p className="text-gray-500 text-sm line-clamp-2">{product.description}</p>
                    <div className="flex items-center gap-1.5 mt-4 text-brand-orange text-sm font-semibold">
                      View details <ArrowRight size={14} weight="bold" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* WHY CHOOSE US STRIP */}
      <section className="bg-earth-900 text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display font-bold text-3xl md:text-4xl leading-tight mb-6">
                From the heart of Indonesia<br />
                <span className="text-brand-yellow">to your market</span>
              </h2>
              <p className="text-gray-300 leading-relaxed mb-8">
                We combine generations of traditional Indonesian herbal knowledge with modern food technology and rigorous export compliance — so your customers receive authentic, safe, and premium products.
              </p>
              <Link
                href="/why-choose-us"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-brand-yellow text-brand-yellow font-semibold hover:bg-brand-yellow hover:text-brand-black transition-all"
              >
                Our Standards <ArrowRight size={16} weight="bold" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: '100%', label: 'Halal Certified', color: 'bg-brand-green/20 text-brand-green' },
                { num: 'BPOM', label: 'Registered Products', color: 'bg-brand-yellow/20 text-brand-yellow' },
                { num: '6+', label: 'Export Destinations', color: 'bg-brand-orange/20 text-brand-orange' },
                { num: '12mo', label: 'Shelf Life Guarantee', color: 'bg-brand-red/20 text-brand-red' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <p className={`font-display font-bold text-3xl mb-1 ${stat.color}`}>{stat.num}</p>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NATURAL INGREDIENTS */}
      <NaturalIngredients />

      {/* FAQ */}
      <section className="bg-earth-50 py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-yellow/20 text-brand-orange text-xs font-semibold tracking-widest uppercase mb-4">
              Tanya Jawab
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-brand-black tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <FaqInline />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <TestimonialSection testimonials={testimonials} />

      {/* SOCIAL EMBEDS */}
      <SocialEmbedWidget embeds={embeds} />

      {/* CTA SECTION */}
      <section className="bg-brand-red py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
            Ready to bring Java Royale to your market?
          </h2>
          <p className="text-red-100 mb-8 max-w-xl mx-auto">
            Talk to our export team about MOQ, certifications, private label, and shipping logistics.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-brand-red font-bold hover:bg-brand-yellow hover:text-brand-black transition-all"
          >
            Start a Conversation <ArrowRight size={16} weight="bold" />
          </Link>
        </div>
      </section>
    </>
  );
}
