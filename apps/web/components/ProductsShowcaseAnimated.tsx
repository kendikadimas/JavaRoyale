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
                className={`w-[85vw] md:w-[70vw] lg:w-[60vw] xl:w-[50vw] h-[65vh] md:h-[65vh] ${theme.bg} rounded-[2rem] md:rounded-[3rem] p-6 md:p-8 flex flex-row shrink-0 overflow-hidden shadow-sm gap-4 md:gap-6`}
              >
                {/* Left — Image Container */}
                <div className="w-[45%] md:w-[48%] h-full rounded-xl md:rounded-2xl overflow-hidden flex-shrink-0 bg-black/5">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={imageUrl(product.images[0].image_path)}
                      alt={product.images[0].alt_text ?? product.name}
                      className="w-full h-full object-cover object-center"
                    />
                  ) : (
                    <div className="w-full h-full bg-black/10 animate-pulse" />
                  )}
                </div>

                {/* Right — Title + Description + Button */}
                <div className="flex-1 flex flex-col justify-between py-1 md:py-2 overflow-hidden">
                  {/* Title — each word on its own line, right-aligned */}
                  <div className="text-right">
                    <h3 className={`font-display font-black text-3xl md:text-4xl lg:text-5xl tracking-tighter leading-[0.95] ${theme.text}`}>
                      {displayTitle.split(' ').map((word, wi) => (
                        <span key={wi} className="block">{word}</span>
                      ))}
                    </h3>
                  </div>

                  {/* Description + Button */}
                  <div className="flex flex-col items-end gap-3">
                    <p className={`font-display font-medium text-xs md:text-sm text-right leading-snug ${theme.text} opacity-80 line-clamp-3 md:line-clamp-4`}>
                      {product.description 
                        ? stripHtml(product.description) 
                        : 'The perfect balance of tradition and refreshing taste.'}
                    </p>
                    <Link 
                      href={`/products/${product.slug}`}
                      className={`text-xs font-bold ${theme.text} hover:underline inline-flex items-center gap-1`}
                    >
                      Read more <ArrowRight size={14} weight="bold" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
