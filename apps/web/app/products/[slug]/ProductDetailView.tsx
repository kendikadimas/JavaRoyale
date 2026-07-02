'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check, CaretDown, ArrowRight, Sparkle } from '@phosphor-icons/react';
import type { Product } from '@/lib/api';
import { imageUrl } from '@/lib/api';
import { AboutMarquee } from '../../about/AboutMarquee';

interface Props {
  product: Product;
}

// Helper to map ingredients to emojis/graphics
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
  return '🌿';
};

// Helper for dynamic taste/texture profile meters (mockup section 1 right)
const getProductProfile = (slug: string, isSnack: boolean) => {
  if (isSnack) {
    return [
      { label: 'CRISPINESS', value: 95 },
      { label: 'NATURAL SWEETNESS', value: 65 },
      { label: 'FRUIT AROMA', value: 85 },
      { label: 'CRUNCHINESS', value: 90 },
    ];
  }
  
  if (slug.includes('kunyit') || slug.includes('tumeric') || slug.includes('drink') || slug.includes('jamu')) {
    return [
      { label: 'ACIDITY', value: 75 },
      { label: 'SWEETNESS', value: 50 },
      { label: 'EARTHINESS', value: 65 },
      { label: 'REFRESHMENT', value: 90 },
    ];
  } else if (slug.includes('jahe') || slug.includes('ginger')) {
    return [
      { label: 'SPICINESS', value: 85 },
      { label: 'SWEETNESS', value: 40 },
      { label: 'WARMTH', value: 95 },
      { label: 'REFRESHMENT', value: 70 },
    ];
  } else {
    return [
      { label: 'ACIDITY', value: 55 },
      { label: 'SWEETNESS', value: 60 },
      { label: 'EARTHINESS', value: 50 },
      { label: 'REFRESHMENT', value: 80 },
    ];
  }
};

// Helper for features (mockup section 1 right)
const getProductFeatures = (isSnack: boolean) => {
  if (isSnack) {
    return [
      { label: 'No Preservatives', icon: '🛡️' },
      { label: 'Vacuum Fried', icon: '💨' },
      { label: '100% Natural', icon: '🌱' },
      { label: 'Gluten Free', icon: '🌾' },
    ];
  }
  return [
    { label: 'No Preservatives', icon: '🛡️' },
    { label: 'Caffeine Free', icon: '☕' },
    { label: '100% Vegan', icon: '🌱' },
    { label: 'Organic Herbs', icon: '🌿' },
  ];
};

// Helper to determine the image path based on variant
const getVariantImage = (slug: string, variantName: string, defaultPath: string) => {
  const name = variantName.toLowerCase();
  if (slug.includes('jamu') || slug.includes('kunyit')) {
    if (name.includes('botol') || name.includes('bottle') || name.includes('can')) {
      return '/new/botoldrink.png';
    }
    if (name.includes('sachet') || name.includes('pouch') || name.includes('instant')) {
      return '/new/pouchjava.png';
    }
  }
  return defaultPath;
};
// Helper for dynamic ingredient details (mockup section 2)
const getDetailedIngredients = (slug: string) => {
  const isSnack = slug.includes('snack') || slug.includes('nangka') || slug.includes('fruit');
  if (isSnack) {
    return [
      {
        name: 'JACKFRUIT',
        desc: 'Rich in fiber and vitamins. Sourced at peak ripeness from volcanic soils and cooked at low temperature to retain sweetness.',
        emoji: '🍍'
      },
      {
        name: 'COCONUT OIL',
        desc: 'We use premium coconut oil in minimal quantities during vacuum frying, giving a light crispiness without greasy residue.',
        emoji: '🥥'
      },
      {
        name: 'MANGO',
        desc: 'High in Vitamin C and natural antioxidants. Sourced from local tropical orchards and preserved at peak freshness.',
        emoji: '🥭'
      },
      {
        name: 'NATURAL SALTS',
        desc: 'A tiny pinch of sea salt to balance and elevate the natural sweet fructose profile of the tropical fruits.',
        emoji: '🧂'
      }
    ];
  }

  return [
    {
      name: 'GINGER',
      desc: "Ginger doesn't just spice up our day—its natural warmth calms discomfort. Renowned for boosting circulation and soothing muscles, it's a vital key to wellness.",
      emoji: '🫚'
    },
    {
      name: 'TAMARIND',
      desc: "Tangy and timeless, tamarind adds a gentle detox to our daily routine, with antioxidants that promote heart health and digestion, keeping your body refreshed.",
      emoji: '🫛'
    },
    {
      name: 'LIME',
      desc: "Zesty, refreshing, and full of energy, lime is packed with Vitamin C and antioxidants to strengthen immunity and brighten your day—one invigorating drop at a time.",
      emoji: '🍋'
    },
    {
      name: 'LEMONGRASS',
      desc: "Crisp and herbal, lemongrass is a giant in traditional healing. It has natural digestion-enhancing qualities, calms the mind, and lends a wonderful citrusy aroma.",
      emoji: '🌿'
    }
  ];
};

export function ProductDetailView({ product }: Props) {
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);
  const [nutritionOpen, setNutritionOpen] = useState(true);

  const activeVariant = product.variants[activeVariantIndex] || product.variants[0];
  const isSnack = product.category.toLowerCase().includes('snack') || product.category.toLowerCase().includes('fruit') || product.slug.includes('nangka');
  
  const mainImage = product.images[0];
  const defaultImagePath = mainImage ? imageUrl(mainImage.image_path) : '';
  
  // Dynamically switch image based on variant name for a premium feel
  const activeImagePath = activeVariant 
    ? getVariantImage(product.slug, activeVariant.variant_name, defaultImagePath)
    : defaultImagePath;

  const features = getProductFeatures(isSnack);
  const tasteProfile = getProductProfile(product.slug, isSnack);
  const detailedIngredients = getDetailedIngredients(product.slug);
  const activeIngredients = activeVariant?.ingredients ?? [];
  const fact = activeVariant?.nutrition_fact;

  return (
    <>
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Left Column: Gallery & Interactive Image */}
        <div className="lg:col-span-6 space-y-6">
          <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden bg-earth-50 border border-earth-100 shadow-xl flex items-center justify-center p-8">
            {/* Background glow overlay */}
            <div className="absolute w-[240px] h-[240px] rounded-full bg-brand-yellow/10 blur-[80px]" />
            {activeImagePath ? (
              <div className="relative w-full h-full">
                <Image
                  src={activeImagePath}
                  alt={product.name}
                  fill
                  className="object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.12)] hover:scale-[1.02] transition-transform duration-500"
                  priority
                />
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-earth-200">No Image Available</span>
              </div>
            )}
          </div>
          
          {/* Dynamic thumbnails */}
          {product.variants.length > 1 && (
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Variant Images</span>
              <div className="flex gap-4">
                {product.variants.map((v, idx) => {
                  const imgPath = getVariantImage(product.slug, v.variant_name, defaultImagePath);
                  const isSelected = activeVariantIndex === idx;
                  return (
                    <button
                      key={v.id}
                      onClick={() => setActiveVariantIndex(idx)}
                      className={`relative w-20 h-20 rounded-2xl overflow-hidden bg-earth-50 border transition-all ${
                        isSelected 
                          ? 'border-brand-orange ring-2 ring-brand-orange/20 shadow-md' 
                          : 'border-earth-100 hover:border-brand-orange'
                      }`}
                    >
                      <Image
                        src={imgPath}
                        alt={v.variant_name}
                        fill
                        className="object-contain p-2"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Info, Tabs & Configuration */}
        <div className="lg:col-span-6 space-y-8">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-brand-yellow/20 text-brand-orange text-[10px] font-bold tracking-widest uppercase mb-4 border border-brand-yellow/40">
              {product.category.replace(/-/g, ' ')}
            </span>
            <h1 className="font-display font-black text-3xl md:text-5xl text-brand-black leading-tight uppercase tracking-tight mb-4">
              {product.name}
            </h1>
            {product.description && (
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">{product.description}</p>
            )}
          </div>

          {/* Variant Selector Tabs */}
          {product.variants.length > 1 && (
            <div className="space-y-3 bg-earth-50 p-4 rounded-2xl border border-earth-100">
              <span className="text-[10px] font-black text-earth-800 uppercase tracking-widest block">
                SELECT VARIANT OPTION
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
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Action Buttons */}
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
              Ask for Distributor
            </Link>
          </div>

          {/* Active Ingredients (Horizontal circles row) */}
          {activeIngredients.length > 0 && (
            <div className="space-y-4">
              <span className="font-bold text-earth-800 uppercase tracking-widest text-xs block border-b border-earth-100 pb-2">
                ACTIVE INGREDIENTS ({activeVariant?.variant_name})
              </span>
              <div className="flex flex-wrap gap-6">
                {activeIngredients.slice(0, 5).map((ing, idx) => (
                  <div key={idx} className="flex flex-col items-center space-y-2">
                    <div className="w-14 h-14 rounded-full bg-earth-50 border border-earth-200 shadow-sm flex items-center justify-center text-2xl hover:scale-105 hover:bg-earth-100 transition-all duration-300">
                      {getIngredientIcon(ing)}
                    </div>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide text-center max-w-[85px] leading-tight">
                      {ing.replace(/Organic\s+/gi, '')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Features (Horizontal circles row) */}
          <div className="space-y-4">
            <span className="font-bold text-earth-800 uppercase tracking-widest text-xs block border-b border-earth-100 pb-2">
              FEATURES & CERTIFICATIONS
            </span>
            <div className="flex flex-wrap gap-6">
              {features.map((feat, idx) => (
                <div key={idx} className="flex flex-col items-center space-y-2">
                  <div className="w-14 h-14 rounded-full bg-earth-50 border border-earth-200 shadow-sm flex items-center justify-center text-xl hover:scale-105 hover:bg-earth-100 transition-all duration-300">
                    {feat.icon}
                  </div>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide text-center max-w-[80px] leading-tight">
                    {feat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Taste/Texture Profile progress bars */}
          <div className="space-y-4">
            <span className="font-bold text-earth-800 uppercase tracking-widest text-xs block border-b border-earth-100 pb-2">
              {isSnack ? 'TEXTURE PROFILE' : 'TASTE PROFILE'}
            </span>
            <div className="space-y-3 font-display">
              {tasteProfile.map((prof, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-bold tracking-wider text-gray-500">
                    <span>{prof.label}</span>
                    <span>{prof.value}%</span>
                  </div>
                  <div className="h-2 w-full bg-earth-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-orange rounded-full transition-all duration-1000"
                      style={{ width: `${prof.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Collapsible Nutritional Facts accordion (linked to active variant) */}
          {activeVariant && (
            <div className="w-full mt-8 border-t border-earth-200">
              <div className="border-b border-earth-200">
                <button
                  onClick={() => setNutritionOpen(!nutritionOpen)}
                  className="w-full py-5 flex items-center justify-between text-left group transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-display font-bold text-sm md:text-base text-earth-800 tracking-wider">
                      NUTRITIONAL FACTS & SPECS ({activeVariant.variant_name})
                    </span>
                    {activeVariant.net_weight && (
                      <span className="text-[10px] md:text-xs font-semibold text-gray-500 bg-earth-50 border border-earth-200 px-2.5 py-0.5 rounded-full">
                        {activeVariant.net_weight}
                      </span>
                    )}
                  </div>
                  <span className={`text-earth-800 transition-transform duration-300 ${nutritionOpen ? 'rotate-180 text-brand-orange' : ''}`}>
                    <CaretDown size={18} weight="bold" />
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    nutritionOpen ? 'max-h-[800px] opacity-100 pb-6' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 text-sm text-gray-600">
                    {/* Left: Ingredients & Compliance */}
                    <div className="space-y-4">
                      {activeIngredients.length > 0 && (
                        <div>
                          <span className="font-bold text-earth-800 uppercase tracking-widest text-[10px] block mb-2">Ingredients List:</span>
                          <ul className="grid grid-cols-2 gap-2">
                            {activeIngredients.map((ing, i) => (
                              <li key={i} className="flex items-center gap-2 text-xs text-gray-600">
                                <Check size={12} weight="bold" className="text-brand-green" />
                                <span>{ing}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {activeVariant.compliance_notes && (
                        <div className="bg-earth-50 rounded-2xl p-4 border border-earth-100 text-xs">
                          <span className="font-bold text-earth-800 uppercase tracking-widest text-[10px] block mb-1">Compliance & Quality Certifications:</span>
                          <p className="leading-relaxed text-gray-500 italic">{activeVariant.compliance_notes}</p>
                        </div>
                      )}
                    </div>

                    {/* Right: Nutrition Table */}
                    {fact && (
                      <div>
                        <span className="font-bold text-earth-800 uppercase tracking-widest text-[10px] block mb-2">Nutrition Values:</span>
                        <div className="border border-earth-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                          <table className="w-full text-xs">
                            <thead>
                              <tr className="bg-earth-50 border-b border-earth-200">
                                <th className="text-left px-4 py-2 text-gray-500 font-bold uppercase tracking-wider">Nutrient</th>
                                <th className="text-right px-4 py-2 text-gray-500 font-bold uppercase tracking-wider">Per serving</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-earth-100 font-body">
                              {([
                                ['Energy', fact.energy_kcal, 'kcal'],
                                ['Protein', fact.protein_g, 'g'],
                                ['Total Fat', fact.fat_g, 'g'],
                                ['Carbohydrates', fact.carbs_g, 'g'],
                                ['Sugar', fact.sugar_g, 'g'],
                                ['Sodium', fact.sodium_mg, 'mg'],
                              ] as [string, string | null, string][]).filter(([, val]) => val !== null).map(([label, val, unit]) => (
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
            </div>
          )}
        </div>
      </section>

      {/* 2. "Pure Goodness" Ingredient cards grid */}
      <section className="py-20 bg-earth-50 border-y border-earth-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center space-y-12">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold tracking-[0.3em] text-brand-orange uppercase block">
              OUR INGREDIENT STANDARD
            </span>
            <h2 className="font-display font-black text-3xl md:text-4xl text-brand-black uppercase tracking-tight">
              {isSnack ? 'PURE, NATURAL GOODNESS IN EVERY CRUNCH' : 'PURE, NATURAL GOODNESS IN EVERY SIP'}
            </h2>
            <div className="w-12 h-1 bg-brand-yellow rounded mx-auto" />
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              Each batch from Java Origins is packed with raw, whole ingredients sourced from local farms at peak freshness. We prioritize clean processing to lock in maximum natural nutrients.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {detailedIngredients.map((item, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 border border-earth-200 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center space-y-4 group">
                <div className="w-20 h-20 rounded-full bg-earth-50 border border-earth-200 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300">
                  {item.emoji}
                </div>
                <h3 className="font-display font-bold text-sm tracking-wider text-earth-800 uppercase">
                  {item.name}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Wide Grayscale Banner section */}
      <section className="relative h-[450px] flex items-center justify-center overflow-hidden">
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
            Java Origins is more than a brand; it is a bridge connecting traditional Indonesian food craftsmanship to the requirements of the global market.
          </p>
          <div>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-yellow text-brand-black font-bold uppercase text-xs tracking-widest hover:bg-brand-orange hover:text-white transition-all duration-300"
            >
              Learn More <ArrowRight size={14} weight="bold" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. "Follow Us on Instagram" social mockup grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center space-y-12">
          <div className="space-y-3">
            <span className="text-xs font-bold tracking-[0.3em] text-brand-orange uppercase block">
              COMMUNITY FEED
            </span>
            <h2 className="font-display font-black text-3xl md:text-4xl text-brand-black uppercase tracking-tight">
              FOLLOW US ON INSTAGRAM
            </h2>
            <div className="w-12 h-1 bg-brand-yellow rounded mx-auto" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { path: '/ingredients.jpeg', alt: 'Fresh Raw Herbs' },
              { path: '/tropicalasea.jpeg', alt: 'Organic Sourcing' },
              { path: '/fotoproduk.jpeg', alt: 'Modern Jamu Bottle' },
              { path: '/javavariant.jpeg', alt: 'Product Lineup' },
              { path: '/tropicalsnack.jpeg', alt: 'Fruit Snack Pack' }
            ].map((img, idx) => (
              <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden shadow-sm border border-earth-100 group cursor-pointer">
                <Image
                  src={img.path}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-earth-900/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <div className="text-white text-center p-4">
                    <Sparkle size={24} className="mx-auto mb-1 text-brand-yellow" />
                    <span className="text-[10px] font-bold tracking-widest uppercase">View Post</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Footer scrolling marquee banner */}
      <AboutMarquee />
    </>
  );
}
