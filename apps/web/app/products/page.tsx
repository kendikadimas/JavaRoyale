import type { Metadata } from 'next';
import { getSeoSetting, getProducts } from '@/lib/api';
import { ProductGrid } from './ProductGrid';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoSetting('products');
  return {
    title: seo?.seo_title ?? 'Products — Java Royale Nusantara',
    description: seo?.seo_description ?? undefined,
  };
}

export default async function ProductsPage() {
  const productsRes = await getProducts().catch(() => null);
  const products = productsRes?.data ?? [];

  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <>
      <section className="pt-32 pb-12 bg-earth-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h1 className="font-display font-bold text-4xl md:text-5xl text-brand-black mb-4">
            Our Products
          </h1>
          <p className="text-gray-500 text-lg max-w-xl">
            Premium Indonesian herbal drinks and vacuum-fried snacks, crafted for global export.
          </p>
        </div>
      </section>
      <ProductGrid initialProducts={products} categories={categories} />
    </>
  );
}
