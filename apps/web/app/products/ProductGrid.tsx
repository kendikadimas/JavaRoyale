'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/lib/api';
import { imageUrl } from '@/lib/api';
import { Leaf, ArrowRight } from '@phosphor-icons/react';

interface Props {
  initialProducts: Product[];
  categories: string[];
}

export function ProductGrid({ initialProducts, categories }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filtered = activeCategory === 'all'
    ? initialProducts
    : initialProducts.filter((p) => p.category === activeCategory);

  return (
    <section className="bg-white py-10 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === 'all'
                ? 'bg-brand-yellow text-brand-black'
                : 'bg-earth-50 text-gray-600 hover:bg-earth-100'
            }`}
          >
            All Products
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all capitalize ${
                activeCategory === cat
                  ? 'bg-brand-yellow text-brand-black'
                  : 'bg-earth-50 text-gray-600 hover:bg-earth-100'
              }`}
            >
              {cat.replace(/-/g, ' ')}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <Leaf size={48} className="text-earth-200 mx-auto mb-4" />
            <p className="text-gray-400">No products found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="group bg-earth-50 border border-earth-100 rounded-2xl overflow-hidden hover:border-brand-yellow hover:shadow-lg transition-all"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-earth-100">
                  {product.images[0] ? (
                    <Image
                      src={imageUrl(product.images[0].image_path)}
                      alt={product.images[0].alt_text ?? product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Leaf size={40} className="text-earth-300" />
                    </div>
                  )}
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-brand-yellow text-brand-black text-xs font-semibold capitalize">
                    {product.category.replace(/-/g, ' ')}
                  </span>
                </div>
                <div className="p-5">
                  <h2 className="font-display font-bold text-brand-black text-lg mb-1 group-hover:text-brand-orange transition-colors">
                    {product.name}
                  </h2>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{product.variants?.length ?? 0} variant{product.variants?.length !== 1 ? 's' : ''}</span>
                    <span className="flex items-center gap-1 text-brand-orange text-sm font-semibold">
                      Details <ArrowRight size={14} weight="bold" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
