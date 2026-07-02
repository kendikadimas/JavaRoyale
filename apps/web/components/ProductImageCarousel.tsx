'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface CarouselProps {
  images: string[];
  alt: string;
  bgColor: string;
}

export function ProductImageCarousel({ images, alt, bgColor }: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 4000); // Rotate every 4 seconds
    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className={`relative w-full aspect-[4/3] max-w-md rounded-[2.5rem] overflow-hidden ${bgColor} border border-earth-200/40 shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)] hover:border-brand-yellow/30 flex items-center justify-center p-8 group transition-all duration-500`}>
      {/* Images container */}
      <div className="relative w-[96%] h-[96%] overflow-hidden flex items-center justify-center">
        {images.map((img, idx) => (
          <div
            key={img}
            className={`absolute inset-0 transition-all duration-700 ease-in-out transform flex items-center justify-center ${
              idx === activeIndex 
                ? 'opacity-100 scale-110 pointer-events-auto' 
                : 'opacity-0 scale-95 pointer-events-none'
            }`}
          >
            <Image
              src={img}
              alt={`${alt} view ${idx + 1}`}
              fill
              priority={idx === 0}
              className="object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)] group-hover:scale-115 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
        ))}
      </div>

      {/* Carousel dots indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5 z-20 bg-black/10 backdrop-blur-sm px-2.5 py-1.5 rounded-full">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === activeIndex 
                  ? 'bg-white w-5' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
