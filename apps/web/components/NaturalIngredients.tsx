'use client';

import Image from 'next/image';

const ingredients = [
  {
    id: 'ginger',
    name: 'Ginger',
    percentage: '20-30%',
    image: '/new/gingerr.jpg',
  },
  {
    id: 'tumeric',
    name: 'Tumeric',
    percentage: '10-20%',
    image: '/new/tumeric.webp',
  },
  {
    id: 'lemongrass',
    name: 'Lemongrass',
    percentage: '8-17%',
    image: '/new/lemongrass.jpg',
  },
  {
    id: 'lime',
    name: 'Lime',
    percentage: '8%',
    image: '/new/limee.jpg',
  },
  {
    id: 'palm-sugar',
    name: 'Palm Sugar',
    percentage: '20%',
    image: '/new/palmsugar.jpg',
  },
  {
    id: 'honey',
    name: 'Honey',
    percentage: '2%',
    image: '/new/honeyyy.jpg',
  },
];

export function NaturalIngredients() {
  return (
    <section className="py-20 lg:py-32 bg-earth-900 relative overflow-hidden">
      {/* Premium Dark Gradients & Glows */}
      <div className="absolute inset-0 bg-gradient-to-b from-earth-900 via-earth-800 to-earth-900" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-yellow/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-yellow/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-12 items-center">
          
          {/* Left Column: Titles */}
          <div className="lg:col-span-5 flex flex-col justify-center text-center lg:text-left">
            <span className="inline-block px-4 py-1.5 rounded-full border border-brand-yellow/30 bg-brand-yellow/10 text-brand-yellow text-sm font-bold tracking-widest uppercase mb-6 mx-auto lg:mx-0 w-max">
              The Essence
            </span>
            <h2 className="font-display font-black text-5xl md:text-6xl lg:text-[5rem] tracking-tighter leading-[1.05] mb-6 drop-shadow-2xl">
              <span className="text-white block mb-1">Ingredients</span>
              <span className="text-brand-yellow block">Java Drink</span>
            </h2>
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-sm mx-auto lg:mx-0 font-medium">
              Some of the natural, functional ingredients used in every bottle of Java Drink.
            </p>
          </div>

          {/* Right Column: Ingredients Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {ingredients.map((item) => (
                <div key={item.id} className="group flex flex-col items-center bg-earth-800/50 backdrop-blur-sm p-4 rounded-[2rem] shadow-xl border border-earth-700 hover:border-brand-yellow/50 hover:bg-earth-800 hover:-translate-y-1 transition-all duration-300">
                  {/* Image Box */}
                  <div className="w-full aspect-square rounded-[1.5rem] overflow-hidden mb-5 relative bg-earth-900 group-hover:scale-[1.02] transition-transform duration-500 ring-1 ring-earth-700">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </div>
                  {/* Label */}
                  <div className="flex flex-col items-center gap-2 w-full">
                    <h3 className="font-display text-white text-lg md:text-xl font-bold tracking-wide">
                      {item.name}
                    </h3>
                    <span className="inline-block bg-brand-yellow text-earth-900 px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase">
                      {item.percentage}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
