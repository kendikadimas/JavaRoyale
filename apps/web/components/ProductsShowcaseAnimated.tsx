'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { imageUrl } from '@/lib/api';
import type { Product } from '@/lib/api';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const themes = [
  { bg: 'bg-earth-50', text: 'text-earth-900', border: 'border-earth-900/40', btn: 'bg-brand-yellow text-brand-black hover:bg-white' },
  { bg: 'bg-earth-900', text: 'text-brand-yellow', border: 'border-brand-yellow/40', btn: 'bg-brand-yellow text-brand-black hover:bg-white' },
  { bg: 'bg-brand-yellow', text: 'text-brand-black', border: 'border-brand-black/40', btn: 'bg-brand-black text-brand-yellow hover:bg-earth-800' },
  { bg: 'bg-earth-100', text: 'text-earth-900', border: 'border-earth-900/40', btn: 'bg-brand-orange text-white hover:bg-brand-red' },
];

export function ProductsShowcaseAnimated({ products }: { products: Product[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const scrollContainer = scrollContainerRef.current;

    if (!section || !scrollContainer) return;

    const getScrollAmount = () => {
      const scrollContainerWidth = scrollContainer.scrollWidth;
      return -(scrollContainerWidth - window.innerWidth);
    };

    gsap.to(scrollContainer, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${scrollContainer.scrollWidth - window.innerWidth}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });
  }, { scope: sectionRef });

  const stripHtml = (html: string) => html.replace(/<[^>]*>?/gm, '');

  return (
    <section ref={sectionRef} className="bg-white overflow-hidden h-[85vh] md:h-[88vh] lg:h-[90vh] flex flex-col pt-16 md:pt-20 lg:pt-24 pb-4">
      <div className="px-6 lg:px-12 z-20 mb-4 md:mb-6">
        <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-brand-black leading-tight">
          Explore Java Origins <br />
          <span className="font-normal text-gray-500">wellness in every form</span>
        </h2>
      </div>

      <div className="flex-1 flex items-start h-full">
        <div 
          ref={scrollContainerRef} 
          className="flex flex-row flex-nowrap items-start px-6 lg:px-12 gap-6 w-[max-content] h-full pt-2 md:pt-4"
        >
          {products.map((product, i) => {
            const theme = themes[i % themes.length];
            const displayTitle = product.name; // Full name
            const categoryLabel = product.category.replace(/-/g, ' ');

            return (
              <div 
                key={product.id} 
                className={`w-[85vw] md:w-[70vw] lg:w-[60vw] xl:w-[50vw] h-[58vh] md:h-[65vh] ${theme.bg} rounded-[2rem] md:rounded-[3rem] p-5 md:p-10 relative flex flex-col justify-between shrink-0 overflow-hidden shadow-sm`}
              >
                {/* Header (Top Left) */}
                <div className="relative z-30 max-w-[90%] md:max-w-[80%]">
                  <h3 className={`font-display font-black text-3xl md:text-5xl lg:text-6xl tracking-tighter ${theme.text}`}>
                    {displayTitle}
                  </h3>
                  <span className={`inline-block mt-2.5 px-3 py-1 md:px-4 md:py-1.5 rounded-full border ${theme.border} ${theme.text} text-[10px] md:text-sm font-bold uppercase tracking-wider ${theme.bg}/80 backdrop-blur-sm`}>
                    {categoryLabel}
                  </span>
                </div>

                {/* Bottom Section (Description + Button on Right) */}
                <div className="relative z-20 flex flex-col items-end text-right w-full mt-auto">
                  <p className={`font-display font-medium text-xs md:text-lg leading-relaxed ${theme.text} drop-shadow-sm w-[60%] md:w-1/2 mb-4 md:mb-8 ${theme.bg}/40 md:bg-transparent p-2 md:p-0 rounded-lg backdrop-blur-md md:backdrop-blur-none`}>
                    {product.description 
                      ? stripHtml(product.description) 
                      : 'The perfect balance of tradition and refreshing taste.'}
                  </p>
                  <Link 
                    href="/products" 
                    className={`w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-full transition-all hover:scale-110 shadow-lg ${theme.btn}`}
                  >
                    <ArrowRight size={18} className="md:w-5 md:h-5" weight="bold" />
                  </Link>
                </div>

                {/* Image (Bottom Left, Absolute) */}
                <div className={`absolute -bottom-6 -left-10 md:-left-4 h-[75%] md:h-[85%] z-10 pointer-events-none ${
                  product.slug === 'java-drink-powder-mini'
                    ? 'w-[72%] md:w-[58%]'
                    : 'w-[55%] md:w-[55%]'
                }`}>
                  {product.images && product.images.length > 0 ? (
                    <Image
                      src={imageUrl(product.images[0].image_path)}
                      alt={product.images[0].alt_text ?? product.name}
                      fill
                      className={`object-contain object-left-bottom md:object-bottom origin-bottom transition-transform duration-500 ${
                        product.slug === 'java-drink-powder-mini'
                          ? 'scale-[2.4] translate-x-[22px] translate-y-[8%] md:scale-[1.43] md:translate-x-0 md:translate-y-[10%]'
                          : 'scale-[1.1] translate-x-[12px] translate-y-[10%] md:scale-[1.05] md:-translate-x-[8px]'
                      }`}
                      sizes="(max-width: 768px) 60vw, 40vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-32 h-64 md:w-40 md:h-80 bg-black/10 rounded-2xl animate-pulse" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
