import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getHomepageSetting, getProducts, getSeoSetting, getSiteSetting, getTestimonials, getSocialEmbedSettings, imageUrl, assetUrl } from '@/lib/api';
import { NaturalIngredients } from '@/components/NaturalIngredients';
import { FaqInline } from '@/components/FaqInline';
import { HeroAnimated } from '@/components/HeroAnimated';
import { Marquee } from '@/components/Marquee';
import { ProductsShowcaseAnimated } from '@/components/ProductsShowcaseAnimated';
import { WhatIsJavaDrink } from '@/components/WhatIsJavaDrink';
import { ArrowRight, Leaf, Certificate, Globe, Truck, Flask, Star, Sparkle } from '@phosphor-icons/react/dist/ssr';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoSetting('home');
  return {
    title: seo?.seo_title ?? 'Java Origins — Premium Indonesian F&B Export',
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

  const javaDrinkVariants = [
    {
      id: 101,
      name: 'JavaDrink Canned',
      slug: 'java-drink-canned',
      category: 'ready-to-drink',
      description: 'It\'s like happy hour in a can. Refreshing and fresh, perfect for a late day on the patio or a hot day by the pool.',
      images: [{ image_path: '/new/canjavadrink.png' }]
    },
    {
      id: 102,
      name: 'JavaDrink Pouch',
      slug: 'java-drink-pouch',
      category: 'travel-size',
      description: 'Convenient pouch packaging for your on-the-go lifestyle. Enjoy the authentic taste of Indonesian herbal heritage anywhere.',
      images: [{ image_path: '/new/pouchjava.png' }]
    },
    {
      id: 103,
      name: 'JavaDrink Powder',
      slug: 'java-drink-powder',
      category: 'powder-blend',
      description: 'Our signature herbal blend in a premium bottle. Perfect for brewing at home and sharing with family.',
      images: [{ image_path: '/new/botoldrink.png' }]
    },
    {
      id: 104,
      name: 'JavaDrink Powder Mini',
      slug: 'java-drink-powder-mini',
      category: 'powder-blend',
      description: 'Compact and cute. The same authentic recipe in a smaller bottle, ideal for gifting or personal daily use.',
      images: [{ image_path: '/new/botolkecil.png' }]
    }
  ];

  return (
    <>
      <HeroAnimated />
      <Marquee />

      <ProductsShowcaseAnimated products={javaDrinkVariants as any} />

      <WhatIsJavaDrink />


      {/* NATURAL INGREDIENTS */}
      <NaturalIngredients />

      {/* FAQ */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-brand-black uppercase tracking-tight mb-4">
              Frequently Asked Question
            </h2>
           
          </div>

          <FaqInline />
        </div>
      </section>

      {/* CTA SECTION - Card Layout */}
      <section className="bg-earth-900 py-20 lg:py-32 px-6 lg:px-8 relative overflow-hidden">
        {/* Subtle background glows to tie in with the rest of the dark sections */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-yellow/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-yellow/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto bg-gradient-to-br from-brand-yellow via-brand-yellow to-yellow-500 rounded-[2.5rem] md:rounded-[3.5rem] p-4 flex flex-col lg:flex-row shadow-2xl relative z-10">
          
          {/* Left Side: Product Image Display */}
          <div className="w-full lg:w-1/2 relative h-[350px] md:h-[500px] lg:h-auto rounded-[2rem] md:rounded-[2.8rem] overflow-hidden bg-earth-900 flex items-center justify-center p-8 md:p-12 shadow-inner">
            {/* Subtle glow behind the bottle */}
            <div className="absolute w-[80%] h-[80%] rounded-full bg-brand-yellow/10 blur-[80px]" />
            <div className="relative w-full h-full min-h-[300px]">
              <Image
                src="/new/botoldrink.png"
                alt="Java Origins Premium Herbal Drink"
                fill
                className="object-contain hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Right Side: Partnership Content */}
          <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <div className="flex-grow flex flex-col justify-center">
              <span className="inline-block px-3 py-1.5 rounded-full border border-earth-900/20 bg-earth-900/10 text-earth-900 text-xs font-black tracking-widest uppercase mb-6 w-max">
                Partnership
              </span>
              <h2 className="font-display font-black text-4xl md:text-5xl lg:text-[3.8rem] text-earth-900 uppercase tracking-tighter leading-[1] mb-6">
                Interested in selling Java Origins?
              </h2>
              <p className="text-earth-900/80 text-lg md:text-xl font-medium leading-relaxed mb-10 max-w-xl">
                Let&apos;s bring Java Origins to your community! With growing global demand for authentic, healthy herbal beverages, it&apos;s the perfect premium addition to your store or menu. Request a sample today!
              </p>
            </div>
            
            <Link
              href="/contact"
              className="w-full block text-center py-5 md:py-6 rounded-2xl md:rounded-[1.5rem] bg-earth-900 text-brand-yellow font-bold text-xl hover:bg-white hover:text-earth-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}
