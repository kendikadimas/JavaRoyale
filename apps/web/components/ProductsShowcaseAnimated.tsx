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
                      className="w-full h-full object-contain object-center"
                    />
                  ) : (
                    <div className="w-full h-full bg-black/10 animate-pulse" />
                  )}
                </div>

                {/* Right — Title + Description + Button */}
                <div className="flex-1 flex flex-col justify-between py-1 md:py-2 overflow-hidden">
                  {/* Title — each word on its own line, right-aligned */}
                  <div className="text-right">
                    {(() => {
                      const words = displayTitle.split(' ');
                      const titleSize = words.length <= 2
                        ? 'text-6xl md:text-7xl lg:text-8xl'
                        : 'text-4xl md:text-5xl lg:text-[3.25rem]';
                      return (
                        <h3 className={`font-display font-black ${titleSize} tracking-tighter leading-[1.05] ${theme.text}`}>
                          {words.map((word, wi) => (
                            <span key={wi} className="block">{word}</span>
                          ))}
                        </h3>
                      );
                    })()}
                  </div>

                {/* Description or Advantages */}
                  <div className="flex flex-col items-end gap-3">
                    {product.description ? (
                      <p className={`font-display font-medium text-sm md:text-base text-right leading-relaxed ${theme.text} opacity-80 line-clamp-3 md:line-clamp-4`}>
                        {stripHtml(product.description)}
                      </p>
                    ) : product.advantages && product.advantages.length > 0 ? (
                      <ul className="flex flex-col items-end gap-1">
                        {product.advantages.slice(0, 4).map((adv, ai) => (
                          <li key={ai} className={`font-display font-medium text-sm md:text-base text-right leading-relaxed ${theme.text} opacity-80 flex items-center gap-1.5 justify-end`}>
                            <span>{adv}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60 flex-shrink-0" />
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    <Link 
                      href={`/products/${product.slug}`}
                      className={`mt-1 px-5 py-2 rounded-full text-xs font-bold border-2 border-current ${theme.text} hover:opacity-70 transition-opacity`}
                    >
                      Read more
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
