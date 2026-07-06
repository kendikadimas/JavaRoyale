'use client';

import { useState } from 'react';
import { Plus, Minus } from '@phosphor-icons/react';

const faqs = [
  {
    q: 'What is Java Drink?',
    a: 'Java Drink is a natural herbal beverage made from carefully selected Indonesian herbs, crafted to bring warmth, comfort, and goodness to your daily routine.',
  },
  {
    q: 'What are the health benefits of Java Drink?',
    a: 'Our herbal blend is designed to support healthy digestion, boost immunity, and provide natural antioxidants to keep you energized and refreshed throughout the day.',
  },
  {
    q: 'Where can I purchase Java Drink?',
    a: 'Java Drink is available for bulk export worldwide. Please contact our export team through the Contact page to discuss distribution opportunities in your region.',
  },
  {
    q: 'Can I drink Java Drink every day?',
    a: 'Yes! Java Drink is made from 100% natural ingredients without artificial preservatives, making it a perfect, healthy addition to your daily wellness routine.',
  },
  {
    q: 'What does Java Drink taste like?',
    a: 'It offers a refreshing balance of traditional herbal warmth from ginger and turmeric, naturally sweetened with palm sugar, and brightened with a hint of citrusy lime.',
  },
];

export function FaqInline() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="border-t border-brand-yellow/60">
      {faqs.map((faq, i) => {
        const isOpen = openId === i;
        return (
          <div
            key={i}
            className="border-b border-brand-yellow/60"
          >
            <button
              onClick={() => toggle(i)}
              className="w-full text-left py-6 flex items-center justify-between gap-4 focus:outline-none group"
            >
              <h3 className="font-display font-bold text-lg md:text-xl text-brand-black pr-8 group-hover:text-brand-orange transition-colors">
                {faq.q}
              </h3>
              <div className="shrink-0 text-brand-black group-hover:text-brand-orange transition-colors">
                {isOpen ? <Minus size={24} weight="bold" /> : <Plus size={24} weight="bold" />}
              </div>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'
              }`}
            >
              <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-3xl">
                {faq.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
