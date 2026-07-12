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

    // Refresh ScrollTrigger after a tick to ensure layout is computed
    ScrollTrigger.refresh();

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
        anticipatePin: 1,
      }
    });
  }, { scope: sectionRef, dependencies: [products] });

  const stripHtml = (html: string) => html.replace(/<[^>]*>?/gm, '');

  return (
    <section ref={sectionRef} className="bg-white h-screen flex flex-col pt-10 md:pt-14 lg:pt-16 pb-4">
      <div className="px-6 lg:px-12 z-20 mb-4 md:mb-6">
        <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-brand-black leading-tight">
          Explore Java Origins <br />
          {/* <span className="font-normal text-gray-500">wellness in every form</span> */}
        </h2>
      </div>

      <div className="flex-1 flex items-center overflow-hidden">
        <div 
          ref={scrollContainerRef} 
          className="flex flex-row flex-nowrap items-center px-6 lg:px-12 gap-6 w-[max-content] pb-10"
        >
          {products.map((product, i) => {
            const theme = themes[i % themes.length];
            const displayTitle = product.name;

            return (
              <div 
                key={product.id} 
                className={`w-[85vw] md:w-[70vw] lg:w-[60vw] xl:w-[50vw] h-[65vh] md:h-[65vh] relative flex flex-col shrink-0`}
              >
                {/* Card background with rounded, separate from overflow */}
                <div className={`absolute inset-0 ${theme.bg} rounded-[2rem] md:rounded-[3rem] shadow-sm`} />

                {/* Content wrapper — text only, does not clip image */}
                <div className="relative z-20 flex flex-col h-full p-6 md:p-10 pointer-events-none">
                  {/* Header (Top Left Mobile / Top Right Desktop) */}
                  <div className="relative z-30 max-w-[100%] md:max-w-[70%] md:self-end md:text-right pointer-events-auto">
                    <h3 className={`font-display font-black text-2xl md:text-3xl lg:text-4xl tracking-tighter leading-tight ${theme.text}`}>
                      {displayTitle}
                    </h3>
                  </div>

                  {/* Bottom Section Desktop / Top Section Mobile (Description + Button) */}
                  <div className="relative z-20 flex flex-col items-start md:items-end mt-4 md:mt-auto md:self-end max-w-[100%] md:max-w-[40%] pointer-events-auto">
                    <div className="relative w-full">
                      <p className={`font-display font-medium text-xs md:text-sm text-justify leading-snug md:leading-snug ${theme.text} drop-shadow-sm mb-3 md:mb-5 opacity-90 line-clamp-4 md:line-clamp-4`}>
                        {product.description 
                          ? stripHtml(product.description) 
                          : 'The perfect balance of tradition and refreshing taste.'}
                      </p>
                      <Link 
                        href={`/products/${product.slug}`}
                        className={`text-xs font-bold ${theme.text} hover:underline inline-flex items-center gap-1 opacity-100 transition-opacity`}
                      >
                        Read more <ArrowRight size={14} weight="bold" className="md:hidden" /> <span className="hidden md:inline">→</span>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Image — outside content wrapper, can overflow card bounds */}
                <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 md:translate-x-0 md:top-0 md:bottom-auto md:left-0 h-[50%] md:h-[110%] z-10 pointer-events-none flex justify-center md:items-end w-[90%] md:w-[55%]`}>
                  {product.images && product.images.length > 0 ? (
                    <img
                       src={imageUrl(product.images[0].image_path)}
                       alt={product.images[0].alt_text ?? product.name}
                       className="w-full h-full object-contain object-bottom md:object-left"
                     />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-24 h-48 md:w-40 md:h-80 bg-black/10 rounded-2xl animate-pulse" />
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
