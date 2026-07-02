'use client';

import { useState } from 'react';
import { CaretDown, Check } from '@phosphor-icons/react';
import type { ProductVariant } from '@/lib/api';

interface Props {
  variants: ProductVariant[];
}

export function ProductInteractive({ variants }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!variants || variants.length === 0) return null;

  return (
    <div className="w-full mt-8 border-t border-earth-200">
      {variants.map((variant, index) => {
        const isOpen = openIndex === index;
        const fact = variant.nutrition_fact;

        return (
          <div key={variant.id} className="border-b border-earth-200">
            <button
              onClick={() => toggle(index)}
              className="w-full py-5 flex items-center justify-between text-left group transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="font-display font-bold text-sm md:text-base text-earth-800 tracking-wider">
                  NUTRITIONAL FACTS & SPECS ({variant.variant_name})
                </span>
                {variant.net_weight && (
                  <span className="text-[10px] md:text-xs font-semibold text-gray-500 bg-earth-50 border border-earth-200 px-2.5 py-0.5 rounded-full">
                    {variant.net_weight}
                  </span>
                )}
              </div>
              <span className={`text-earth-800 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-orange' : ''}`}>
                <CaretDown size={18} weight="bold" />
              </span>
            </button>

            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isOpen ? 'max-h-[800px] opacity-100 pb-6' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 text-sm text-gray-600">
                {/* Left: Ingredients & Compliance */}
                <div className="space-y-4">
                  {variant.ingredients && variant.ingredients.length > 0 && (
                    <div>
                      <span className="font-bold text-earth-800 uppercase tracking-widest text-[11px] block mb-2">Ingredients List:</span>
                      <ul className="grid grid-cols-2 gap-2">
                        {variant.ingredients.map((ing, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs text-gray-600">
                            <Check size={12} weight="bold" className="text-brand-green" />
                            <span>{ing}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {variant.compliance_notes && (
                    <div className="bg-earth-50 rounded-2xl p-4 border border-earth-100 text-xs">
                      <span className="font-bold text-earth-800 uppercase tracking-widest text-[10px] block mb-1">Compliance & Quality Certifications:</span>
                      <p className="leading-relaxed text-gray-500 italic">{variant.compliance_notes}</p>
                    </div>
                  )}
                </div>

                {/* Right: Nutrition Table */}
                {fact && (
                  <div>
                    <span className="font-bold text-earth-800 uppercase tracking-widest text-[11px] block mb-2">Nutrition Values:</span>
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
        );
      })}
    </div>
  );
}
