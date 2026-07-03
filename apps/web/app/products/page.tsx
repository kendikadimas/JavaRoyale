import type { Metadata } from 'next';
import { getSeoSetting, getProducts } from '@/lib/api';
import { ProductsClient } from '@/components/ProductsClient';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoSetting('products');
  return {
    title: seo?.seo_title ?? 'Products — Java Origins',
    description: seo?.seo_description ?? undefined,
  };
}

export default async function ProductsPage() {
  const productsRes = await getProducts({ page: 1 }).catch(() => null);
  const products = productsRes?.data ?? [];

  return (
    <div className="bg-earth-50/30 min-h-screen">
      {/* Header Section */}
      <section className="pt-32 pb-24 bg-brand-yellow relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center lg:text-left">
          <span className="text-xs font-bold tracking-[0.3em] text-brand-black/60 uppercase block mb-3">
            PURE ZEALAND
          </span>
          <h1 className="font-display font-black text-4xl md:text-6xl text-brand-black mb-4 uppercase tracking-tight leading-none">
            OUR <span className="text-white">PRODUCTS</span>
          </h1>
          <p className="text-brand-black/80 text-base md:text-lg max-w-xl">
            Discover our premium lineup of traditional Indonesian functional beverages, reimagined for modern convenience and global export.
          </p>
        </div>

        {/* Wavy Divider */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10 translate-y-[1px]">
          <svg className="relative block w-full h-[40px] md:h-[60px]" viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,32L120,42.7C240,53,480,75,720,74.7C960,75,1200,53,1320,42.7L1440,32L1440,120L1320,120C1200,120,960,120,720,120C480,120,240,120,120,120L0,120Z" className="fill-white"></path>
          </svg>
        </div>
      </section>

      {/* Products Showcase */}
      <ProductsClient products={products} />
    </div>
  );
}
