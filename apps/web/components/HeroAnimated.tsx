'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkle } from '@phosphor-icons/react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export function HeroAnimated() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });
    
    tl.from('.hero-badge', { y: 20, opacity: 0, duration: 0.6 })
      .from('.hero-title-line', { y: 40, opacity: 0, stagger: 0.15, duration: 0.8 }, '-=0.4')
      .from('.hero-desc', { y: 20, opacity: 0, duration: 0.6 }, '-=0.6')
      .from('.hero-btn', { y: 20, opacity: 0, stagger: 0.1, duration: 0.6 }, '-=0.4')
      .from('.hero-image-glow', { scale: 0.8, opacity: 0, duration: 1 }, '-=0.8')
      .from('.hero-image', { x: 40, opacity: 0, duration: 1 }, '-=0.8');
  }, { scope: container });

  return (
    <section ref={container} className="relative min-h-[100dvh] h-auto bg-gradient-to-br from-earth-900 via-earth-900 to-earth-800 flex flex-col justify-center overflow-hidden pt-24 pb-12 lg:pt-28">
      {/* Decorative background lights/glows */}
      <div className="absolute inset-0 z-0">
        {/* Subtle warm radial gradient overlay to enrich colors */}
        <div className="absolute inset-0 bg-gradient-to-r from-earth-900/90 via-earth-900/40 lg:via-earth-900/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-earth-900 via-transparent to-transparent" />
        
        {/* Fresh Yellow radial light overlays for modern aesthetic */}
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-brand-yellow/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-brand-yellow/5 blur-[150px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full h-full flex flex-col justify-center">
        <div className="grid lg:grid-cols-12 gap-12 items-center h-full">
          
          {/* Left Content */}
          <div className="lg:col-span-6 flex flex-col items-start text-left relative z-20 mt-8 lg:mt-0">             

            <h1 className="font-display font-black text-[17vw] sm:text-[12vw] md:text-6xl lg:text-7xl xl:text-[5rem] text-white uppercase leading-[0.85] tracking-tighter mb-6 drop-shadow-2xl">
              <div className="overflow-hidden"><div className="hero-title-line">THE</div></div>
              <div className="overflow-hidden"><div className="hero-title-line text-brand-yellow">ROYAL</div></div>
              <div className="overflow-hidden"><div className="hero-title-line text-brand-yellow">HERBAL</div></div>
              <div className="overflow-hidden"><div className="hero-title-line">DRINK</div></div>
            </h1>
            
            <p className="hero-desc max-w-md text-gray-200 text-sm sm:text-base md:text-lg font-semibold tracking-wider leading-relaxed mb-8 opacity-90 drop-shadow-sm uppercase">
              JAVA ORIGINS CELEBRATES INDONESIA&apos;S ORIGINAL FUNCTIONAL BEVERAGE, JAMU. TASTE TRADITION, CRAFTED FOR TODAY&apos;S LIFESTYLE.
            </p>
            
            <div className="flex flex-row items-center gap-3 w-full sm:w-auto">
              <div className="hero-btn flex-1 sm:flex-none">
                <Link
                  href="/products"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 md:px-8 py-4 rounded-xl bg-brand-yellow text-brand-black font-bold hover:bg-white hover:scale-[1.03] shadow-xl shadow-brand-yellow/10 transition-all duration-300 text-xs md:text-sm tracking-wider uppercase"
                >
                  Explore <ArrowRight size={16} weight="bold" className="hidden sm:block" />
                </Link>
              </div>
              <div className="hero-btn flex-1 sm:flex-none">
                <Link
                  href="/about"
                  className="w-full inline-flex items-center justify-center px-4 md:px-8 py-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white/20 hover:border-white/50 hover:scale-[1.03] shadow-xl transition-all duration-300 text-xs md:text-sm tracking-wider uppercase"
                >
                  Our Story
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Interactive Product Display */}
          <div className="hidden lg:flex lg:col-span-6 items-center justify-center lg:relative w-full lg:h-[85vh] z-10 pointer-events-auto overflow-visible">
            {/* Golden glow behind product */}
            <div className="hero-image-glow absolute w-full h-full max-w-[800px] rounded-full bg-brand-yellow/15 blur-[150px] z-0 animate-pulse" />
            
            {/* GSAP Target Wrapper */}
            <div className="hero-image relative z-10 w-[85%] h-[85%] lg:w-full lg:h-full flex items-center justify-center">
              {/* Scaling Wrapper (isolated from GSAP) */}
              <div className="w-full h-full relative origin-center scale-100 sm:scale-110 lg:scale-125 xl:scale-[1.4] transition-transform duration-700 hover:scale-105 sm:hover:scale-110 lg:hover:scale-125 xl:hover:scale-[1.45] hover:-rotate-1">
                <Image
                  src="/new/herosection.png"
                  alt="Java Origins Premium Herbal Drink"
                  fill
                  className="object-contain drop-shadow-[0_25px_25px_rgba(0,0,0,0.5)]"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
