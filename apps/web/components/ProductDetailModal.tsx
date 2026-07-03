'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, ArrowRight, CheckCircle, Package, Leaf, ShieldCheck } from '@phosphor-icons/react';
import { imageUrl } from '@/lib/api';
import type { Product } from '@/lib/api';

interface Props {
  product: Product | null;
  onClose: () => void;
}

export function ProductDetailModal({ product, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [product]);

  if (!product) return null;

  const primaryImage = product.images[0] ? imageUrl(product.images[0].image_path) : null;
  const allIngredients = product.variants
    .flatMap((v) => v.images ?? [])
    .length === 0
    ? product.ingredients ?? []
    : product.ingredients ?? [];

  // Collect all unique ingredients across variants
  const ingredientsList = product.ingredients ?? [];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Slide-in Panel */}
      <div
        ref={panelRef}
        className="fixed top-0 right-0 h-full w-full max-w-lg bg-white z-50 shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Product Details</p>
            <h2 className="font-display font-black text-lg text-brand-black tracking-tight leading-tight">{product.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X size={16} weight="bold" />
          </button>
        </div>

        <div className="px-6 py-6 space-y-8">

          {/* Product Image */}
          {primaryImage && (
            <div className="w-full aspect-square rounded-2xl bg-earth-50 overflow-hidden flex items-center justify-center">
              <Image
                src={primaryImage}
                alt={product.name}
                width={400}
                height={400}
                className="w-full h-full object-contain p-6"
              />
            </div>
          )}

          {/* Description */}
          {product.description && (
            <div>
              <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
            </div>
          )}

          {/* Advantages */}
          {product.advantages && product.advantages.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle size={16} weight="fill" className="text-brand-yellow" />
                <p className="text-xs font-bold tracking-widest text-gray-500 uppercase">Key Benefits</p>
              </div>
              <ul className="space-y-2">
                {product.advantages.map((adv, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow mt-2 flex-shrink-0" />
                    {adv}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Ingredients */}
          {ingredientsList.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Leaf size={16} weight="fill" className="text-green-500" />
                <p className="text-xs font-bold tracking-widest text-gray-500 uppercase">Ingredients</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {ingredientsList.map((ing, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium border border-green-100"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Variants */}
          {product.variants.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Package size={16} weight="fill" className="text-blue-500" />
                <p className="text-xs font-bold tracking-widest text-gray-500 uppercase">Available Variants</p>
              </div>
              <div className="space-y-2">
                {product.variants.map((v) => (
                  <div key={v.id} className="flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50 border border-gray-100">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{v.variant_name}</p>
                      {v.net_weight && (
                        <p className="text-xs text-gray-400 mt-0.5">{v.net_weight}</p>
                      )}
                    </div>
                    {v.compliance_notes && (
                      <div className="flex items-center gap-1 text-[10px] text-green-600 font-semibold">
                        <ShieldCheck size={12} weight="fill" />
                        <span>Certified</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Compliance Notes (from first variant) */}
          {product.variants[0]?.compliance_notes && (
            <div className="px-4 py-3 rounded-xl bg-earth-50 border border-earth-100 flex items-start gap-3">
              <ShieldCheck size={16} weight="fill" className="text-earth-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-earth-700 leading-relaxed">{product.variants[0].compliance_notes}</p>
            </div>
          )}

          {/* CTA */}
          <div className="pt-2 pb-4">
            <Link
              href={`/contact?product=${encodeURIComponent(product.name)}`}
              onClick={onClose}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-brand-yellow text-brand-black font-bold text-sm uppercase tracking-widest hover:bg-brand-orange hover:text-white transition-all duration-300"
            >
              <span>Inquire About This Product</span>
              <ArrowRight size={16} weight="bold" />
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
