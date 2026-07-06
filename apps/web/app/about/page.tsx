import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getSeoSetting } from '@/lib/api';
import { AboutMarquee } from './AboutMarquee';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoSetting('about');
  return {
    title: seo?.seo_title ?? 'About Us — Java Origins',
    description: seo?.seo_description ?? undefined,
  };
}

export default async function AboutPage() {
  return (
    <>
      {/* 1. Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-white border-b border-earth-100">
        {/* Decorative solid yellow SVG circles on the edges */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          {/* Top-Right Circle */}
          <svg
            className="absolute -top-16 -right-16 md:-top-24 md:-right-24 w-40 h-40 md:w-72 md:h-72 text-brand-yellow/80"
            viewBox="0 0 100 100"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="50" cy="50" r="50" />
          </svg>

          {/* Bottom-Left Circle */}
          <svg
            className="absolute -bottom-24 -left-24 md:-bottom-32 md:-left-32 w-56 h-56 md:w-96 md:h-96 text-brand-yellow/80"
            viewBox="0 0 100 100"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="50" cy="50" r="50" />
          </svg>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h1 className="font-display font-black text-6xl md:text-8xl lg:text-9xl text-brand-black uppercase tracking-tighter leading-none">
            ABOUT <span className="text-brand-yellow">US</span>
          </h1>
        </div>
      </section>

      {/* 2. Intro Section */}
      <section className="bg-earth-900 text-white pt-16 pb-28 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-xs font-bold tracking-[0.3em] text-brand-yellow uppercase block mb-6">
            About Us - Java Origins
          </span>
          <h2 className="font-display font-bold text-xl md:text-2xl lg:text-3xl text-earth-100 leading-relaxed max-w-4xl mx-auto mb-8">
            Java Origins is a New Zealand–based import and distribution brand connecting Indonesian producers with the New Zealand market. We curate Indonesian products from both MSMEs and established brands, focusing on quality, authenticity, and export readiness.<br /><br />
            We work directly with producers to ensure every product meets New Zealand standards, including food safety, labeling, and import compliance.<br /><br />
            Our range includes coffee, snacks, herbal products, wellness items, and selected FMCG brands, each highlighting its origin and cultural value.<br /><br />
            Java Origins bridges two markets—empowering Indonesian producers to access global opportunities while delivering trusted, high-quality products to New Zealand businesses and consumers.
          </h2>
          <div className="w-16 h-0.5 bg-brand-orange mx-auto opacity-60" />
        </div>
      </section>

      {/* 4. "What is Jamu?" Section */}
      <section className="py-20 bg-white border-t border-earth-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Image */}

            {/* Right Text Content */}
            <div className="space-y-6">
            </div>
          </div>
        </div>
      </section>

      {/* 5. Catalog CTA Banner (Vibrant Brand Color Theme instead of Purple) */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-gradient-to-br from-earth-900 to-earth-800 rounded-3xl overflow-hidden shadow-2xl border border-earth-800">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              {/* Left Image Column */}
              <div className="lg:col-span-5 relative bg-brand-yellow aspect-[4/3] lg:aspect-auto lg:self-stretch min-h-[300px] overflow-hidden group">
                {/* Floating graphic element background */}
                <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-brand-orange/20 blur-xl group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute bottom-[-10%] left-[38%] -translate-x-1/2 w-[75%] h-[105%] max-w-[250px] lg:max-w-[310px]">
                  <Image
                    src="/new/pouchjava.png"
                    alt="Java Origins Premium Packagings"
                    fill
                    className="object-contain object-bottom drop-shadow-[0_20px_20px_rgba(0,0,0,0.15)] group-hover:scale-[1.05] group-hover:rotate-2 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Right CTA Text Column */}
              <div className="lg:col-span-7 p-8 md:p-12 lg:p-16 space-y-6">
                <h3 className="font-display font-black text-2xl md:text-4xl text-white uppercase leading-tight tracking-tight">
                  Java Drink
                </h3>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                  Discover our premium functional beverages range. Download our official export catalogue for product information, specifications, and packaging options.
                </p>
                <div className="pt-2">
                  <a
                    href="/new/java-origins-catalogue.pdf"
                    download="java-origins-catalogue.pdf"
                    className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-brand-yellow text-brand-black font-bold uppercase text-xs tracking-widest hover:bg-brand-orange hover:text-white transition-all duration-300 shadow-lg shadow-brand-yellow/10"
                  >
                    Download Catalogue
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 7. "A Sip of Jamu..." Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content (Text) */}
            <div className="space-y-6 order-2 lg:order-1">
              <span className="text-xs font-bold tracking-[0.3em] text-brand-orange uppercase block">
                DAILY WELLNESS RITUAL
              </span>
              <h2 className="font-display font-black text-3xl md:text-4xl text-brand-black leading-tight tracking-tight">
                A Sip of Jamu: A Moment of Connection
              </h2>
              <div className="w-12 h-1 bg-brand-yellow rounded" />
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                Java drink is more than a wellness choice; it is a ritual of taking a pause, checking in with your body, and appreciating nature's remedies. We capture this essence in convenient modern formats.
              </p>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                Whether you prefer the quick brew of our soluble powder blends or the crisp refreshment of our ready-to-drink options, Java Origins brings the healing herbs of Nusantara into your daily schedule seamlessly.
              </p>
            </div>

            {/* Right Image */}
            <div className="relative aspect-[4/5] group order-1 lg:order-2 flex items-center justify-center">
              <Image
                src="/new/javadrinkfront.png"
                alt="Modern Jamu Lifestyle"
                fill
                className="object-contain group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>


      {/* 10. Scrolling Banner Section */}
      <AboutMarquee />
    </>
  );
}
