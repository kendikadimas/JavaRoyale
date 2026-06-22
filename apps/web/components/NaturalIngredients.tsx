'use client';

import { useRef } from 'react';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';

const ingredients = [
  {
    id: 'turmeric',
    name: 'TURMERIC',
    desc: 'A golden root that weaves wellness into your life. It effectively helps reduce inflammation, strengthens the immune system, and is naturally rich in beneficial antioxidants.',
  },
  {
    id: 'ginger',
    name: 'GINGER',
    desc: 'Nature\'s way to soothe discomfort and bring balance. It gently warms the body, relieves nausea, aids in healthy digestion, and helps boost overall immunity.',
  },
  {
    id: 'lemongrass',
    name: 'LEMONGRASS',
    desc: 'Your daily calm in a chaotic world. Its fresh aroma effectively soothes the body, helps relieve bloating and discomfort, and supports deep relaxation.',
  },
  {
    id: 'lime',
    name: 'LIME',
    desc: 'Zesty and alive with vibrant energy. It is packed with vitamin C and antioxidants, which helps boost freshness and revitalizes while supporting healthy skin and immunity.',
  },
  {
    id: 'palm-sugar',
    name: 'PALM SUGAR',
    desc: 'A pure natural sweetener packed with essential minerals. It is a source that provides quick energy to the body and is gentler on digestion compared to refined sugar.',
  },
  {
    id: 'honey',
    name: 'HONEY',
    desc: 'The sweet essence of nature. It gently soothes the throat and effectively relieves coughs, provides a natural source of energy, and helps boost immunity.',
  },
];

export function NaturalIngredients() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const cardW = 320;
    const gap = 24;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -cardW - gap : cardW + gap,
      behavior: 'smooth',
    });
  };

  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12 text-center">
        <h2 className="font-display font-bold text-4xl md:text-5xl text-brand-black tracking-tight">
          NATURAL INGREDIENTS
        </h2>
        <p className="text-gray-500 text-base md:text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
          Herbal Goodness, Healthy Life. Each bottle is filled with nature&rsquo;s finest gifts for your wellness.
        </p>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 lg:left-0 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-md border border-earth-100 flex items-center justify-center text-gray-500 hover:text-brand-orange hover:border-brand-yellow transition-all"
          aria-label="Scroll left"
        >
          <CaretLeft size={18} weight="bold" />
        </button>

        <button
          onClick={() => scroll('right')}
          className="absolute right-2 lg:right-0 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-md border border-earth-100 flex items-center justify-center text-gray-500 hover:text-brand-orange hover:border-brand-yellow transition-all"
          aria-label="Scroll right"
        >
          <CaretRight size={18} weight="bold" />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-6 px-6"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {ingredients.map((item) => (
            <div
              key={item.id}
              className="snap-start shrink-0 w-[280px] sm:w-[300px] lg:w-[340px] bg-earth-50 rounded-3xl border border-earth-100 flex flex-col overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="px-6 py-10 text-center flex flex-col items-center">
                <h3 className="font-display font-bold text-xl md:text-2xl text-brand-black mb-4 tracking-tight">
                  {item.name}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-[28ch]">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 mt-8">
          {ingredients.map((item, i) => (
            <button
              key={item.id}
              onClick={() => {
                if (!scrollRef.current) return;
                const cardW = 304;
                const gap = 24;
                scrollRef.current.scrollTo({ left: i * (cardW + gap), behavior: 'smooth' });
              }}
              className="w-2.5 h-2.5 rounded-full bg-earth-200 hover:bg-brand-yellow transition-colors"
              aria-label={`Go to ${item.name}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
