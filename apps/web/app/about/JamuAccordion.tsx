'use client';

import { useState } from 'react';
import { CaretDown } from '@phosphor-icons/react';

interface AccordionItem {
  id: string;
  name: string;
  description: string;
  benefits: string[];
  ingredients: string;
}

const varieties: AccordionItem[] = [
  {
    id: 'kunyit-asam',
    name: 'KUNYIT ASAM (TURMERIC TAMARIND)',
    description: 'The golden classic of Indonesian herbal heritage. A balanced, bittersweet traditional formulation pairing organically farmed turmeric with raw Javanese tamarind and palm sugar.',
    benefits: ['Natural anti-inflammatory agent', 'Supports digestive wellness', 'High in curcumin and antioxidants', 'Promotes skin health'],
    ingredients: 'Organic Turmeric, Raw Tamarind, Palm Sugar, Water, Pinch of Salt.',
  },
  {
    id: 'beras-kencur',
    name: 'BERAS KENCUR (RICE & AROMATIC GINGER)',
    description: 'A comforting, creamy wellness drink combining roasted red rice grains with sand ginger (kencur) and palm sugar for a deep, earthy warmth.',
    benefits: ['Relieves physical fatigue and muscle stiffness', 'Boosts energy levels and stamina', 'Relieves coughs and throat irritation', 'Enhances appetite'],
    ingredients: 'Aromatic Ginger (Kencur), Roasted Rice, Palm Sugar, Ginger, Water.',
  },
  {
    id: 'jahe-merah',
    name: 'JAHE MERAH (RED GINGER INFUSION)',
    description: 'A robust and spicy infusion brewed from wild red ginger (known to be more potent than white ginger), sweetened with wild forest honey.',
    benefits: ['Warms the body and improves blood circulation', 'Relieves nausea and travel sickness', 'Boosts cold and flu resistance', 'Soothes respiratory tract'],
    ingredients: 'Red Ginger, Lemongrass, Wild Honey, Palm Sugar, Water.',
  },
  {
    id: 'temulawak',
    name: 'TEMULAWAK (WILD JAVANESE GINGER)',
    description: 'A traditional tonic highlighting Temulawak, a medicinal ginger native to Java, paired with a touch of fresh lime to balance its bold, bitter-sweet notes.',
    benefits: ['Supports liver detoxification and health', 'Improves digestion and appetite', 'Helps lower bad cholesterol', 'Antibacterial and anti-inflammatory properties'],
    ingredients: 'Javanese Wild Ginger (Temulawak), Lime Juice, Palm Sugar, Water.',
  },
  {
    id: 'kunyit-asam-lemon',
    name: 'KUNYIT ASAM LEMON (CITRUS TURMERIC BLEND)',
    description: 'A modern, zesty iteration of our classic Kunyit Asam. Infused with a generous splash of cold-pressed lemon juice for an extra citrus kick.',
    benefits: ['Dual booster of Vitamin C and Curcumin', 'Excellent for morning metabolism and detox', 'Alkalises the body', 'Promotes hydration'],
    ingredients: 'Organic Turmeric, Raw Tamarind, Fresh Lemon Juice, Palm Sugar, Water.',
  },
];

export function JamuAccordion() {
  const [openId, setOpenId] = useState<string | null>('kunyit-asam');

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="w-full max-w-4xl mx-auto border-t border-earth-200">
      {varieties.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className="border-b border-earth-200">
            <button
              onClick={() => toggle(item.id)}
              className="w-full py-6 flex items-center justify-between text-left group transition-colors duration-300"
            >
              <span className={`font-display font-bold text-lg md:text-xl tracking-wider transition-colors duration-300 ${
                isOpen ? 'text-brand-orange' : 'text-earth-800 group-hover:text-brand-orange'
              }`}>
                {item.name}
              </span>
              <span className={`text-earth-800 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-orange' : ''}`}>
                <CaretDown size={22} weight="bold" />
              </span>
            </button>
            
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isOpen ? 'max-h-[500px] opacity-100 pb-8' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 text-sm text-gray-600">
                <div className="md:col-span-2 space-y-4">
                  <p className="leading-relaxed text-base font-body">{item.description}</p>
                  <div>
                    <span className="font-bold text-earth-800 uppercase tracking-wider text-xs block mb-1">Key Ingredients:</span>
                    <p className="font-body italic text-gray-500">{item.ingredients}</p>
                  </div>
                </div>
                <div className="bg-earth-50 rounded-2xl p-5 border border-earth-100 h-fit">
                  <span className="font-bold text-earth-800 uppercase tracking-widest text-xs block mb-3 border-b border-earth-200 pb-1">Benefits:</span>
                  <ul className="space-y-2">
                    {item.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs">
                        <span className="text-brand-orange font-bold mt-0.5">•</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
