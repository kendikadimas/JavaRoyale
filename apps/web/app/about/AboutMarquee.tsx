'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export function AboutMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  
  const textItems = [
    "100% NATURAL",
    "IMMUNITY BOOST",
    "WARM & SOOTHING",
    "NO ARTIFICIAL ADDITIVES",
    "IMPROVE DIGESTION",
    "DETOXIFYING",
    "GMP COMPLIANT"
  ];
  
  const repeatCount = 4;
  const marqueeItems = Array(repeatCount).fill(textItems).flat();

  useGSAP(() => {
    gsap.to(".about-marquee-inner", {
      xPercent: -50,
      ease: "none",
      duration: 25,
      repeat: -1,
    });
  }, { scope: marqueeRef });

  return (
    <div ref={marqueeRef} className="bg-brand-yellow text-earth-900 overflow-hidden py-10 lg:py-16 relative z-10 border-t border-earth-800">
      <div className="about-marquee-inner flex whitespace-nowrap w-[200%] items-center select-none pointer-events-none">
        {marqueeItems.map((text, i) => (
          <div key={i} className="flex items-center">
            <span className="font-display font-black text-6xl md:text-8xl lg:text-9xl tracking-tighter uppercase mx-12">
              {text}
            </span>
            <span className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-earth-900/20 mx-6" />
          </div>
        ))}
        {marqueeItems.map((text, i) => (
          <div key={`copy-${i}`} className="flex items-center">
            <span className="font-display font-black text-6xl md:text-8xl lg:text-9xl tracking-tighter uppercase mx-12">
              {text}
            </span>
            <span className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-earth-900/20 mx-6" />
          </div>
        ))}
      </div>
    </div>
  );
}
