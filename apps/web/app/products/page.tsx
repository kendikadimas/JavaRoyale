import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getSeoSetting } from '@/lib/api';
import { ProductImageCarousel } from '@/components/ProductImageCarousel';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoSetting('products');
  return {
    title: seo?.seo_title ?? 'Products — Java Origins',
    description: seo?.seo_description ?? undefined,
  };
}

const CanIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="3" width="14" height="18" rx="2" />
    <path d="M9 6h6" />
    <path d="M5 9h14" />
    <path d="M5 15h14" />
  </svg>
);

const JarIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 3h8v2H8z" />
    <path d="M6 7v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z" />
    <circle cx="12" cy="14" r="3" />
  </svg>
);

const PouchIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 8H3L5 21h14z" />
    <path d="M3 8v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8" />
    <line x1="12" y1="3" x2="12" y2="8" />
  </svg>
);

const getIcon = (type: string) => {
  switch (type) {
    case 'can': return <CanIcon />;
    case 'jar': return <JarIcon />;
    case 'pouch': return <PouchIcon />;
    default: return null;
  }
};

const productsData = [
  {
    id: 'canned',
    format: 'Ready to Drink',
    title: 'JavaDrink Canned',
    description: 'A refreshing, ready-to-drink canned format that brings the goodness of traditional Javanese jamu into your modern, fast-paced life. Crafted from raw, organic turmeric and tamarind, lightly carbonated for a crisp, energizing finish.',
    images: ['/new/canjavadrink.png', '/new/detailjavacanned.png'],
    variants: [],
    icon: 'can',
    bgColor: 'bg-brand-orange'
  },
  {
    id: 'powder',
    format: 'Premium Bottle',
    title: 'JavaDrink Powder',
    description: 'Our signature traditional herbal blend in a soluble powder format, packaged in a premium reusable glass bottle. Made using advanced extraction techniques that preserve essential nutrients, offering a warm and comforting brew for your daily wellness.',
    images: ['/new/botoldrink.png', '/new/botolkecil.png'],
    variants: ['1 kg', '450 kg'],
    icon: 'jar',
    bgColor: 'bg-brand-yellow'
  },
  {
    id: 'pouch',
    format: 'Travel Pack',
    title: 'JavaDrink Pouch',
    description: 'Designed for your travel and on-the-go lifestyle. This resealable stand-up pouch contains convenient single-serve sachets of our premium soluble herbal powders, letting you enjoy authentic Indonesian wellness anywhere in the world.',
    images: ['/new/pouchjava.png', '/fotoproduk.jpeg'],
    variants: ['200gr', '100gr', '20gr'],
    icon: 'pouch',
    bgColor: 'bg-brand-green'
  }
];


export default async function ProductsPage() {
  return (
    <div className="bg-earth-50/30 min-h-screen">
      {/* Header Section */}
      <section className="pt-32 pb-24 bg-brand-yellow relative overflow-hidden">
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center lg:text-left">
          <span className="text-xs font-bold tracking-[0.3em] text-brand-black/60 uppercase block mb-3">
            PURE ZEALAND
          </span>
          <h1 className="font-display font-black text-4xl md:text-6xl text-brand-black mb-4 uppercase tracking-tight leading-none">
            OUR <span className="text-white">PRODUCTS</span>
          </h1>
          <p className="text-brand-black/80 text-base md:text-lg max-w-xl">
            Discover our premium lineup of traditional Indonesian functional beverages, reimagined for modern convenience and global export.
          </p>
        </div>

        {/* Wavy Divider */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10 translate-y-[1px]">
          <svg className="relative block w-full h-[40px] md:h-[60px]" viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,32L120,42.7C240,53,480,75,720,74.7C960,75,1200,53,1320,42.7L1440,32L1440,120L1320,120C1200,120,960,120,720,120C480,120,240,120,120,120L0,120Z" className="fill-white"></path>
          </svg>
        </div>
      </section>

      {/* Products Showcase */}
      <div className="space-y-0">
        {productsData.map((product, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <section
              key={product.id}
              className={`py-20 lg:py-28 ${
                idx === 0 ? 'border-b' : 'border-y'
              } border-earth-100/40 ${
                isEven ? 'bg-white' : 'bg-earth-50/20'
              } relative overflow-hidden`}
            >
              <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                  
                  {/* Image Column */}
                  <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-2'} flex justify-center w-full`}>
                    <ProductImageCarousel
                      images={product.images}
                      alt={product.title}
                      bgColor={product.bgColor}
                    />
                  </div>

                  {/* Details Column */}
                  <div className={`lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'} space-y-6`}>
                    <div>
                    
                      <h2 className="font-display font-black text-3xl md:text-5xl text-brand-black uppercase leading-tight tracking-tight mt-2">
                        {product.title}
                      </h2>
                      {/* <div className="w-12 h-1 bg-brand-yellow rounded mt-4" /> */}
                    </div>

                    <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-xl">
                      {product.description}
                    </p>

                    {/* Variants */}
                    {product.variants.length > 0 && (
                      <div className="space-y-3 pt-2">
                        <span className="text-[10px] font-black text-earth-800 uppercase tracking-widest block">
                          Available Variants
                        </span>
                        <div className="flex flex-wrap gap-2.5">
                          {product.variants.map((variant, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-earth-200/70 text-xs font-bold text-earth-800 uppercase shadow-sm hover:border-brand-orange/40 hover:shadow-md transition-all duration-300"
                            >
                              <span className="text-brand-orange flex items-center justify-center">
                                {getIcon(product.icon)}
                              </span>
                              <span>{variant}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Button */}
                    <div className="pt-4">
                      <Link
                        href={`/contact?product=${encodeURIComponent(product.title)}`}
                        className="group/btn inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-yellow text-brand-black font-bold uppercase text-xs tracking-widest hover:bg-brand-orange hover:text-white transition-all duration-300 shadow-lg shadow-brand-yellow/10 hover:shadow-brand-orange/20 hover:scale-[1.02] transform"
                      >
                        <span>Inquire Now</span>
                        <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
