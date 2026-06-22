'use client';

import { useState } from 'react';
import { Plus, Minus } from '@phosphor-icons/react';

const faqs = [
  {
    q: 'What is Vacuum Frying?',
    a: 'Vacuum frying is a low-temperature frying technology that helps preserve the natural nutrients, color, and flavor of fruits and vegetables while reducing oil absorption.',
  },
  {
    q: 'Does the product contain preservatives?',
    a: 'No. Tropical Vege-Fruit Snack contains no preservatives.',
  },
  {
    q: 'Does it contain artificial coloring?',
    a: 'No. The product contains no artificial coloring.',
  },
  {
    q: 'Is it suitable for children?',
    a: 'Yes. It is suitable for both children and adults.',
  },
  {
    q: 'Is the product Halal?',
    a: 'Yes. It is certified Halal by Halal Indonesia.',
  },
  {
    q: 'Is it available for export?',
    a: 'Yes. Export-ready packaging is available for international shipping.',
  },
  {
    q: 'Can I purchase in bulk?',
    a: 'Yes. Bulk orders are welcome for importers, distributors, wholesalers, and resellers.',
  },
];

export function FaqInline() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => {
        const isOpen = openId === i;
        return (
          <div
            key={i}
            className={`rounded-2xl border transition-all ${
              isOpen
                ? 'bg-white border-brand-yellow shadow-sm'
                : 'bg-white/70 border-earth-100 hover:bg-white hover:border-earth-200'
            }`}
          >
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${i}`}
            >
              <span className={`font-display font-semibold text-sm md:text-base leading-snug transition-colors ${
                isOpen ? 'text-brand-orange' : 'text-brand-black'
              }`}>
                {faq.q}
              </span>
              <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                isOpen ? 'bg-brand-yellow text-brand-black' : 'bg-earth-100 text-gray-500'
              }`}>
                {isOpen ? <Minus size={14} weight="bold" /> : <Plus size={14} weight="bold" />}
              </span>
            </button>
            <div
              id={`faq-answer-${i}`}
              role="region"
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <p className="px-6 pb-6 text-gray-500 text-sm leading-relaxed">
                {faq.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
