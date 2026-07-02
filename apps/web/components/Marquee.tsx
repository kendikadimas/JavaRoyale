'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export function Marquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  
  const textItems = [
    "100% ORGANIC",
    "EXPORT QUALITY",
    "AUTHENTIC INDONESIAN JAMU",
    "HALAL CERTIFIED",
    "GMP COMPLIANT"
  ];
  
  const repeatCount = 4;
  const marqueeItems = Array(repeatCount).fill(textItems).flat();

  useGSAP(() => {
    // Smooth infinite GSAP marquee
    gsap.to(".marquee-inner", {
      xPercent: -50,
      ease: "none",
      duration: 35,
      repeat: -1,
    });
  }, { scope: marqueeRef });

  return (
    <div ref={marqueeRef} className="bg-brand-yellow text-brand-black overflow-hidden py-4 lg:py-6 border-y border-brand-yellow/80 shadow-[0_0_25px_rgba(246,212,0,0.15)] relative z-20">
      <div className="marquee-inner flex whitespace-nowrap w-[200%] items-center">
        {marqueeItems.map((text, i) => (
          <div key={i} className="flex items-center">
            <span className="font-display font-black text-xl lg:text-2xl tracking-widest uppercase mx-8">
              {text}
            </span>
            <span className="w-2 h-2 rounded-full bg-brand-black/30 mx-4" />
          </div>
        ))}
        {marqueeItems.map((text, i) => (
          <div key={`copy-${i}`} className="flex items-center">
            <span className="font-display font-black text-xl lg:text-2xl tracking-widest uppercase mx-8">
              {text}
            </span>
            <span className="w-2 h-2 rounded-full bg-brand-black/30 mx-4" />
          </div>
        ))}
      </div>
    </div>
  );
}
