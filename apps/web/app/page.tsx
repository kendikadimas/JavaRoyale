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

  const featuredIds = (hero?.highlighted_product_ids ?? []).map(Number);
  const allProducts = productsRes?.data ?? [];
  let featured = featuredIds.length > 0
    ? allProducts.filter((p) => featuredIds.includes(p.id))
    : allProducts.slice(0, 3);

  // Kalau featured kurang dari 3, tambah produk lain untuk melengkapi
  if (featured.length < 3) {
    const featuredSet = new Set(featured.map((p) => p.id));
    const extras = allProducts.filter((p) => !featuredSet.has(p.id));
    featured = [...featured, ...extras].slice(0, 3);
  }

  return (
    <>
      <HeroAnimated />
      {/* <Marquee /> */}

      <ProductsShowcaseAnimated products={featured} />

      <WhatIsJavaDrink />


      {/* NATURAL INGREDIENTS */}
      <NaturalIngredients />

      {/* FAQ */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-brand-black tracking-tight mb-4">
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
          
          {/* Partnership Content (Full Width) */}
          <div className="w-full p-8 md:p-12 lg:p-16 flex flex-col items-center justify-center text-center">
            <div className="flex-grow flex flex-col items-center justify-center">
              <span className="inline-block px-3 py-1.5 rounded-full border border-earth-900/20 bg-earth-900/10 text-earth-900 text-xs font-black tracking-widest uppercase mb-6 w-max">
                Partnership
              </span>
              <h2 className="font-display font-black text-4xl md:text-5xl lg:text-[3.8rem] text-earth-900 uppercase tracking-tighter leading-[1] mb-6">
                Partner with Java Origins 
              </h2>
              <p className="text-earth-900/90 text-lg md:text-xl font-bold leading-relaxed mb-10 max-w-xl mx-auto text-justify">
                We welcome retailers, distributors, and resellers to bring Java Origins into their market. As demand grows for authentic heritage products, we offer a curated range designed for retail and hospitality.
                Our collection includes herbal drinks, MSME food & beverage products, herbal body care, and fashion apparel, all focused on quality, authenticity, and cultural value.
                We are open to reseller and distributor partnerships and look forward to building strong, long-term collaboration.
                Get in touch to request samples or discuss partnership opportunities.
              </p>
            </div>
            
            <Link
              href="/contact"
              className="inline-block px-12 text-center py-5 md:py-6 rounded-2xl md:rounded-[1.5rem] bg-earth-900 text-brand-yellow font-bold text-xl hover:bg-white hover:text-earth-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}
