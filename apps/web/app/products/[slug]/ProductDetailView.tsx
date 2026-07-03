'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check, CaretDown, ArrowRight } from '@phosphor-icons/react';
import type { Product } from '@/lib/api';
import { imageUrl } from '@/lib/api';
import { AboutMarquee } from '../../about/AboutMarquee';

interface Props {
  product: Product;
}

const getIngredientIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes('turmeric') || n.includes('kunyit')) return '🫚';
  if (n.includes('ginger') || n.includes('jahe')) return '🫚';
  if (n.includes('tamarind') || n.includes('asam')) return '🫛';
  if (n.includes('honey') || n.includes('madu')) return '🍯';
  if (n.includes('lime') || n.includes('jeruk')) return '🍋';
  if (n.includes('lemon')) return '🍋';
  if (n.includes('sugar') || n.includes('gula')) return '🍬';
  if (n.includes('lemongrass') || n.includes('serai')) return '🌿';
  if (n.includes('rice') || n.includes('beras')) return '🌾';
  if (n.includes('jackfruit') || n.includes('nangka')) return '🍍';
  if (n.includes('mango') || n.includes('mangga')) return '🥭';
  if (n.includes('durian')) return '🍈';
  if (n.includes('coconut') || n.includes('kelapa')) return '🥥';
  if (n.includes('salt') || n.includes('garam')) return '🧂';
  return '🌿';
};

export function ProductDetailView({ product }: Props) {
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [nutritionOpen, setNutritionOpen] = useState(true);

  const activeVariant = product.variants[activeVariantIndex] ?? product.variants[0];
  const activeIngredients = product.ingredients ?? [];
  const fact = product.nutrition_fact;

  const images = product.images ?? [];
  const activeImagePath = images[activeImageIndex]
    ? imageUrl(images[activeImageIndex].image_path)
    : '';

  return (
    <>
      {/* ── Section 1: Product Detail ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-8 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

        {/* Left: Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          {/* Main image */}
          <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden bg-earth-50 border border-earth-100 shadow-xl flex items-center justify-center p-8">
            <div className="absolute w-[240px] h-[240px] rounded-full bg-brand-yellow/10 blur-[80px]" />
            {activeImagePath ? (
              <div className="relative w-full h-full">
                <Image
                  src={activeImagePath}
                  alt={images[activeImageIndex]?.alt_text ?? product.name}
                  fill
                  className="object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.12)] hover:scale-[1.02] transition-transform duration-500"
                  priority
                />
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-earth-300 text-sm">
                No Image Available
              </div>
            )}
          </div>

          {/* Thumbnails — only show if more than 1 image */}
          {images.length > 1 && (
            <div className="flex gap-3 flex-wrap">
              {images.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden bg-earth-50 border transition-all duration-200 ${
                    activeImageIndex === idx
                      ? 'border-brand-orange ring-2 ring-brand-orange/20 shadow-md'
                      : 'border-earth-100 hover:border-brand-orange'
                  }`}
                >
                  <Image
                    src={imageUrl(img.image_path)}
                    alt={img.alt_text ?? product.name}
                    fill
                    className="object-contain p-2"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Info */}
        <div className="lg:col-span-6 space-y-8">

          {/* Title & Description */}
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-brand-yellow/20 text-brand-orange text-[10px] font-bold tracking-widest uppercase mb-4 border border-brand-yellow/40">
              Java Origins Product
            </span>
            <h1 className="font-display font-black text-3xl md:text-5xl text-brand-black leading-tight uppercase tracking-tight mb-4">
              {product.name}
            </h1>
            {product.description && (
              <div
                className="text-gray-600 leading-relaxed text-sm md:text-base prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            )}
          </div>

          {/* Advantages */}
          {product.advantages && product.advantages.length > 0 && (
            <div className="space-y-3">
              <span className="font-bold text-earth-800 uppercase tracking-widest text-xs block border-b border-earth-100 pb-2">
                KEY ADVANTAGES
              </span>
              <ul className="space-y-2">
                {product.advantages.map((adv, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-brand-yellow/20 border border-brand-yellow/40 flex items-center justify-center shrink-0">
                      <Check size={11} weight="bold" className="text-brand-orange" />
                    </span>
                    {adv}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Variant Selector */}
          {product.variants.length > 0 && (
            <div className="space-y-3 bg-earth-50 p-4 rounded-2xl border border-earth-100">
              <span className="text-[10px] font-black text-earth-800 uppercase tracking-widest block">
                SELECT VARIANT
              </span>
              <div className="flex flex-wrap gap-2.5">
                {product.variants.map((v, idx) => {
                  const isActive = activeVariantIndex === idx;
                  return (
                    <button
                      key={v.id}
                      onClick={() => setActiveVariantIndex(idx)}
                      className={`px-4 py-2.5 rounded-xl font-display font-bold text-xs uppercase tracking-wider transition-all duration-300 border ${
                        isActive
                          ? 'bg-brand-yellow border-brand-yellow text-brand-black shadow-md shadow-brand-yellow/10'
                          : 'bg-white border-earth-200 text-earth-800 hover:border-brand-orange hover:text-brand-orange'
                      }`}
                    >
                      {v.variant_name}
                      {v.net_weight && (
                        <span className="ml-1.5 opacity-60 font-normal normal-case">
                          {v.net_weight}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={`/contact?product=${encodeURIComponent(product.name)}&variant=${encodeURIComponent(activeVariant?.variant_name ?? '')}`}
              className="flex-1 inline-flex items-center justify-center px-6 py-4 rounded-xl bg-brand-yellow text-brand-black font-bold uppercase text-xs tracking-widest hover:bg-brand-orange hover:text-white transition-all duration-300 shadow-lg shadow-brand-yellow/10"
            >
              Inquire Now
            </Link>
            <Link
              href={`/contact?product=${encodeURIComponent(product.name)}&variant=${encodeURIComponent(activeVariant?.variant_name ?? '')}&type=distributor`}
              className="flex-1 inline-flex items-center justify-center px-6 py-4 rounded-xl border-2 border-earth-800 text-earth-800 font-bold uppercase text-xs tracking-widest hover:bg-earth-900 hover:text-white transition-all duration-300"
            >
              Become a Distributor
            </Link>
          </div>

          {/* Ingredients */}
          {activeIngredients.length > 0 && (
            <div className="space-y-4">
              <span className="font-bold text-earth-800 uppercase tracking-widest text-xs block border-b border-earth-100 pb-2">
                ACTIVE INGREDIENTS
              </span>
              <div className="flex flex-wrap gap-5">
                {activeIngredients.map((ing, idx) => (
                  <div key={idx} className="flex flex-col items-center space-y-1.5">
                    <div className="w-12 h-12 rounded-full bg-earth-50 border border-earth-200 shadow-sm flex items-center justify-center text-xl hover:scale-105 hover:bg-earth-100 transition-all duration-300">
                      {getIngredientIcon(ing)}
                    </div>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide text-center max-w-[80px] leading-tight">
                      {ing.replace(/Organic\s+/gi, '')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Nutritional Facts + Compliance accordion */}
          {activeVariant && (fact || activeIngredients.length > 0 || activeVariant.compliance_notes) && (
            <div className="w-full border-t border-earth-200">
              <button
                onClick={() => setNutritionOpen(!nutritionOpen)}
                className="w-full py-5 flex items-center justify-between text-left transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="font-display font-bold text-sm md:text-base text-earth-800 tracking-wider">
                    NUTRITIONAL FACTS & SPECS
                  </span>
                  {activeVariant.net_weight && (
                    <span className="text-[10px] font-semibold text-gray-500 bg-earth-50 border border-earth-200 px-2.5 py-0.5 rounded-full">
                      {activeVariant.variant_name} · {activeVariant.net_weight}
                    </span>
                  )}
                </div>
                <span className={`text-earth-800 transition-transform duration-300 ${nutritionOpen ? 'rotate-180 text-brand-orange' : ''}`}>
                  <CaretDown size={18} weight="bold" />
                </span>
              </button>

              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${nutritionOpen ? 'max-h-[800px] opacity-100 pb-6' : 'max-h-0 opacity-0'}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 text-sm text-gray-600">

                  {/* Left: Ingredients list + compliance */}
                  <div className="space-y-4">
                    {activeIngredients.length > 0 && (
                      <div>
                        <span className="font-bold text-earth-800 uppercase tracking-widest text-[10px] block mb-2">
                          Ingredients:
                        </span>
                        <ul className="grid grid-cols-2 gap-2">
                          {activeIngredients.map((ing, i) => (
                            <li key={i} className="flex items-center gap-2 text-xs text-gray-600">
                              <Check size={12} weight="bold" className="text-brand-orange shrink-0" />
                              <span>{ing}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {activeVariant.compliance_notes && (
                      <div className="bg-earth-50 rounded-2xl p-4 border border-earth-100 text-xs">
                        <span className="font-bold text-earth-800 uppercase tracking-widest text-[10px] block mb-1">
                          Compliance & Certifications:
                        </span>
                        <p className="leading-relaxed text-gray-500 italic">
                          {activeVariant.compliance_notes}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Right: Nutrition table */}
                  {fact && (
                    <div>
                      <span className="font-bold text-earth-800 uppercase tracking-widest text-[10px] block mb-2">
                        Nutrition Values:
                      </span>
                      <div className="border border-earth-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="bg-earth-50 border-b border-earth-200">
                              <th className="text-left px-4 py-2 text-gray-500 font-bold uppercase tracking-wider">Nutrient</th>
                              <th className="text-right px-4 py-2 text-gray-500 font-bold uppercase tracking-wider">Per serving</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-earth-100">
                            {([
                              ['Energy',        fact.energy_kcal, 'kcal'],
                              ['Protein',       fact.protein_g,   'g'],
                              ['Total Fat',     fact.fat_g,       'g'],
                              ['Carbohydrates', fact.carbs_g,     'g'],
                              ['Sugar',         fact.sugar_g,     'g'],
                              ['Sodium',        fact.sodium_mg,   'mg'],
                            ] as [string, string | number | null, string][])
                              .filter(([, val]) => val !== null && val !== undefined)
                              .map(([label, val, unit]) => (
                                <tr key={label} className="hover:bg-earth-50/50 transition-colors">
                                  <td className="px-4 py-2 text-gray-700 font-medium">{label}</td>
                                  <td className="px-4 py-2 text-right font-bold text-earth-900">{val} {unit}</td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Section 2: About Banner ── */}
      <section className="relative h-[400px] md:h-[450px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/ingredients.jpeg"
            alt="Traditional Jamu Heritage"
            fill
            className="object-cover grayscale brightness-[0.35] contrast-[1.1]"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-6">
          <h2 className="font-display font-black text-3xl md:text-5xl text-white uppercase tracking-tight">
            WHAT IS JAVA ORIGINS ALL ABOUT?
          </h2>
          <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Java Origins is more than a brand — a bridge connecting traditional Indonesian food craftsmanship to the global market.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-yellow text-brand-black font-bold uppercase text-xs tracking-widest hover:bg-brand-orange hover:text-white transition-all duration-300"
          >
            Learn More <ArrowRight size={14} weight="bold" />
          </Link>
        </div>
      </section>

      {/* ── Section 3: Marquee ── */}
      <AboutMarquee />
    </>
  );
}
