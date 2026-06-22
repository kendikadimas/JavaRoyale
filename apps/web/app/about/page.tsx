import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getSeoSetting, assetUrl } from '@/lib/api';
import { ArrowRight, Leaf, Users, Factory, Handshake } from '@phosphor-icons/react/dist/ssr';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoSetting('about');
  return {
    title: seo?.seo_title ?? 'About Us — Java Royale Nusantara',
    description: seo?.seo_description ?? undefined,
  };
}

export default async function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-earth-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <h1 className="font-display font-bold text-4xl md:text-5xl text-brand-black leading-tight mb-6">
                Rooted in tradition,<br />
                <span className="text-brand-orange">grown for the world</span>
              </h1>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">
                Java Royale Nusantara was born from a simple belief: Indonesia’s richest flavours and healing herbs deserve a global stage. We bridge traditional Indonesian food craftsmanship with the standards demanded by international markets.
              </p>
              <p className="text-gray-600 leading-relaxed">
                From the volcanic soils of Central Java come our turmeric and ginger roots. From the tropical orchards come the jackfruit, mango, and durian that we transform into premium vacuum-fried snacks. Every product carries the soul of its origin.
              </p>
            </div>
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
                <Image
                  src={assetUrl('tropicalasea.jpeg')}
                  alt="Traditional Indonesian tropical ingredients"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-2xl bg-brand-yellow flex items-center justify-center">
                <div className="text-center">
                  <p className="font-display font-bold text-3xl text-brand-black leading-none">15+</p>
                  <p className="text-xs font-semibold text-brand-black/70">Years Heritage</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-brand-black mb-4">Our Mission</h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              To elevate Indonesia’s traditional food heritage into a globally recognised, premium export category — making Indonesian flavours a staple in homes and stores worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {[
              {
                icon: <Leaf size={28} weight="fill" className="text-brand-green" />,
                title: 'Authenticity First',
                body: 'Every recipe is rooted in Indonesian culinary tradition. We work directly with local farmers to source the finest native ingredients at peak freshness.',
              },
              {
                icon: <Factory size={28} weight="fill" className="text-brand-orange" />,
                title: 'Modern Precision',
                body: 'Our facility pairs traditional knowledge with vacuum frying technology and rigorous quality control — producing products that meet international food safety standards.',
              },
              {
                icon: <Users size={28} weight="fill" className="text-brand-red" />,
                title: 'Partner-Centric',
                body: 'We operate as a brand-owner, distributor, and manufacturing partner all in one — giving buyers the flexibility to go to market their way.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-earth-50 rounded-2xl p-6 md:p-8">
                <div className="mb-4">{item.icon}</div>
                <h3 className="font-display font-bold text-xl text-brand-black mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business model */}
      <section className="py-20 bg-brand-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-12">How We Work</h2>
          <div className="grid grid-cols-1 gap-6 md:gap-8">
            {[
              {
                icon: <Leaf size={24} className="text-brand-yellow" />,
                title: 'Brand Owner',
                desc: 'We develop, own, and export Java Royale products under our own brand with full quality control from farm to packaging.',
              },
              {
                icon: <Handshake size={24} className="text-brand-orange" />,
                title: 'Distributor Partner',
                desc: 'We partner with regional distributors and importers who carry our products into local modern trade and e-commerce channels.',
              },
              {
                icon: <Factory size={24} className="text-brand-green" />,
                title: 'Manufacturing Partner (OEM/ODM)',
                desc: 'Brands and retailers can leverage our facility and expertise to produce private-label products — custom formula, custom packaging, custom brand.',
              },
            ].map((item) => (
              <div key={item.title} className="border border-white/10 rounded-2xl p-6 md:p-8 hover:border-brand-yellow/50 transition-colors">
                <div className="mb-4">{item.icon}</div>
                <h3 className="font-display font-bold text-xl mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-earth-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display font-bold text-2xl text-brand-black">Interested in partnering with us?</h3>
            <p className="text-gray-500 mt-1">Let’s explore how we can bring Indonesian flavour to your market together.</p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-yellow text-brand-black font-semibold hover:bg-brand-orange transition-colors"
          >
            Get in Touch <ArrowRight size={16} weight="bold" />
          </Link>
        </div>
      </section>
    </>
  );
}
