'use client';

import { useState } from 'react';
import type { Product } from '@/lib/api';
import { ProductDetailView } from './[slug]/ProductDetailView';

interface Props {
  products: Product[];
}

export function ProductListConfigurator({ products }: Props) {
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);

  const activeProduct = products[selectedProductIndex] || products[0];

  if (!activeProduct) {
    return (
      <div className="text-center py-20 text-gray-500">
        No products found in the catalog.
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Product Switcher Bar */}
      <div className="border-y border-earth-100 bg-earth-50/50 py-6 sticky top-20 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <span className="text-[10px] font-black text-earth-800 uppercase tracking-[0.2em] block">
            Select Catalog Product:
          </span>
          <div className="flex flex-wrap gap-3">
            {products.map((p, idx) => {
              const isActive = selectedProductIndex === idx;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedProductIndex(idx)}
                  className={`px-5 py-3 rounded-xl font-display font-black text-xs uppercase tracking-widest transition-all duration-300 border ${
                    isActive
                      ? 'bg-earth-900 border-earth-900 text-brand-yellow shadow-lg shadow-earth-900/10'
                      : 'bg-white border-earth-200 text-earth-800 hover:border-brand-orange hover:text-brand-orange'
                  }`}
                >
                  {p.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Product Detailed Spotlight rendering */}
      <div className="pt-4">
        <ProductDetailView product={activeProduct} />
      </div>
    </div>
  );
}
