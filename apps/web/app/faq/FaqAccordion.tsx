'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { Plus, Minus } from '@phosphor-icons/react';
import type { FaqItem } from '@/lib/api';

interface Props {
  items: FaqItem[];
}

export function FaqAccordion({ items }: Props) {
  return (
    <Accordion.Root type="single" collapsible className="space-y-3">
      {items.map((item) => (
        <Accordion.Item
          key={item.id}
          value={String(item.id)}
          className="border border-earth-100 rounded-2xl overflow-hidden bg-white data-[state=open]:border-brand-yellow transition-colors"
        >
          <Accordion.Header>
            <Accordion.Trigger className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group">
              <span className="font-display font-semibold text-brand-black text-base leading-snug group-data-[state=open]:text-brand-orange transition-colors">
                {item.question}
              </span>
              <span className="shrink-0 w-8 h-8 rounded-full bg-earth-50 group-data-[state=open]:bg-brand-yellow flex items-center justify-center transition-colors">
                <Plus size={14} weight="bold" className="group-data-[state=open]:hidden text-gray-500" />
                <Minus size={14} weight="bold" className="hidden group-data-[state=open]:block text-brand-black" />
              </span>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
            <p className="px-6 pb-6 text-gray-600 text-sm leading-relaxed">
              {item.answer}
            </p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
