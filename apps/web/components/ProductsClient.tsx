'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ProductImageCarousel } from '@/components/ProductImageCarousel';
import { ProductDetailModal } from '@/components/ProductDetailModal';
import { imageUrl } from '@/lib/api';
import type { Product } from '@/lib/api';

export function ProductsClient({ products }: { products: Product[] }) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <>
      <div className="space-y-0">
        {products.length === 0 && (
          <div className="py-32 text-center text-gray-400 text-lg">
            No products available.
          </div>
        )}
        {products.map((product, idx) => {
          const isEven = idx % 2 === 0;
          const productImages = product.images.map((img) => imageUrl(img.image_path));
          return (
            <section
              key={product.id}
              className={`py-20 lg:py-28 ${
                idx === 0 ? 'border-b' : 'border-y'
              } border-earth-100/40 ${
                isEven ? 'bg-white' : 'bg-earth-50/20'
              } relative overflow-hidden`}
            >
              <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

                  {/* Image Column */}
                  <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-2'} flex justify-center w-full`}>
                    <ProductImageCarousel
                      images={productImages.length > 0 ? productImages : ['/placeholder-product.png']}
                      alt={product.name}
                      bgColor="bg-brand-orange"
                    />
                  </div>

                  {/* Details Column */}
                  <div className={`lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'} space-y-6`}>
                    <div>
                      <h2 className="font-display font-black text-3xl md:text-5xl text-brand-black uppercase leading-tight tracking-tight mt-2">
                        {product.name}
                      </h2>
                    </div>

                    {product.description && (
                      <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-xl">
                        {product.description}
                      </p>
                    )}

                    {/* Variants */}
                    {product.variants.length > 0 && (
                      <div className="space-y-3 pt-2">
                        <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">Available Sizes</p>
                        <div className="flex flex-wrap gap-2">
                          {product.variants.map((v) => (
                            <span
                              key={v.id}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-earth-200 text-xs font-semibold text-earth-700 bg-white"
                            >
                              {v.variant_name}{v.net_weight ? ` — ${v.net_weight}` : ''}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      {/* View Details Button */}
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="group/btn inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-earth-900 text-white font-bold uppercase text-xs tracking-widest hover:bg-earth-700 transition-all duration-300 hover:scale-[1.02] transform"
                      >
                        <span>View Details</span>
                        <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:scale-110" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </button>

                      {/* Inquire Now Button */}
                      <Link
                        href={`/contact?product=${encodeURIComponent(product.name)}`}
                        className="group/btn inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-yellow text-brand-black font-bold uppercase text-xs tracking-widest hover:bg-brand-orange hover:text-white transition-all duration-300 shadow-lg shadow-brand-yellow/10 hover:shadow-brand-orange/20 hover:scale-[1.02] transform"
                      >
                        <span>Inquire Now</span>
                        <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}
