'use client';

import Image from 'next/image';
import Link from 'next/link';

export function WhatIsJavaDrink() {
  return (
    <section className="bg-white py-12 md:py-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto relative rounded-[2rem] md:rounded-[3rem] overflow-hidden min-h-[500px] py-12 md:py-16 flex items-center shadow-2xl">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/new/herosection.png"
            alt="What is Java Origins Background"
            fill
            className="object-cover object-center grayscale-[20%]"
          />
          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full p-8 md:p-16 lg:p-24 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left: Title */}
          <div>
            <h2 className="font-display font-black text-4xl md:text-5xl lg:text-[4rem] text-white uppercase tracking-tighter leading-[1.1] mb-6">
              What Is <br />Java Origins?
            </h2>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-brand-yellow text-brand-black font-bold hover:bg-white hover:scale-105 transition-all shadow-xl shadow-brand-yellow/10"
            >
              Learn More
            </Link>
          </div>

          {/* Right: Description & Benefits */}
          <div className="flex flex-col items-start lg:pl-10">
            <p className="text-white/95 text-base md:text-lg leading-relaxed mb-6 font-medium">
              Java Origins is a premium, natural herbal beverage made from carefully selected Indonesian herbs. It brings warmth, comfort, and vital wellness to support your healthy lifestyle every day.
            </p>
            
            <div className="grid grid-cols-2 gap-x-4 gap-y-3.5 w-full">
              {[
                'Anti - Aging',
                'Anti - Inflamansi',
                'Anti - Virus',
                'Detoxification',
                'Boost Immunity',
                'Lower Kolesterol',
                'Improve Digestion',
                'Improve Blood Circulation',
                'Lose More Weight',
              ].map((benefit) => (
                <div key={benefit} className="flex items-center gap-2.5 text-white/90 text-xs md:text-sm font-bold uppercase tracking-wider">
                  <svg className="w-4 h-4 text-brand-yellow shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

