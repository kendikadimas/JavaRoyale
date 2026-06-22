import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getSeoSetting, assetUrl } from '@/lib/api';
import { CheckCircle, ArrowRight, Thermometer, Shield, Flask, Medal, Leaf, Globe } from '@phosphor-icons/react/dist/ssr';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoSetting('why-choose-us');
  return {
    title: seo?.seo_title ?? 'Why Choose Us — Java Royale Nusantara',
    description: seo?.seo_description ?? undefined,
  };
}

const certifications = [
  { label: 'BPOM RI', desc: 'All products registered with Indonesia’s National Agency of Drug and Food Control.' },
  { label: 'Halal MUI', desc: 'Certified Halal by Majelis Ulama Indonesia — meets standards for Muslim-majority markets.' },
  { label: 'SNI', desc: 'Products comply with Indonesian National Standard (Standar Nasional Indonesia).' },
  { label: 'GMP Facility', desc: 'Production in a Good Manufacturing Practice certified facility with full traceability.' },
];

const standards = [
  { icon: <Thermometer size={22} weight="fill" />, title: 'Vacuum Frying Technology', desc: 'Low-temperature vacuum process preserves natural colour, aroma, and nutrients while producing snacks with significantly lower oil content than conventional frying.' },
  { icon: <Shield size={22} weight="fill" />, title: 'Cold-Chain Ingredient Sourcing', desc: 'Fresh ingredients sourced from certified farmers are processed within 24 hours of harvest to lock in freshness and phytonutrients.' },
  { icon: <Flask size={22} weight="fill" />, title: 'In-House Lab Testing', desc: 'Every batch undergoes microbiological, chemical, and sensory testing before packaging. No batch leaves our facility without a quality certificate.' },
  { icon: <Globe size={22} weight="fill" />, title: 'Export Documentation', desc: 'We provide full export support: Certificate of Analysis, Phytosanitary Certificate, COO, Halal certificate, and custom documentation on request.' },
  { icon: <Medal size={22} weight="fill" />, title: '12-Month Shelf Life', desc: 'Innovative nitrogen-flush packaging extends shelf life to 12 months without preservatives, ideal for international logistics timelines.' },
  { icon: <Leaf size={22} weight="fill" />, title: 'No Artificial Additives', desc: 'Zero MSG, zero artificial colour, zero artificial preservatives. Our products appeal to the global clean-label consumer trend.' },
];

export default async function WhyChooseUsPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-earth-900 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="font-display font-bold text-4xl md:text-5xl leading-tight mb-6">
              Export-grade quality,<br />
              <span className="text-brand-yellow">built into every step</span>
            </h1>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              We don’t add quality at the end — we build it into every step of the process, from ingredient sourcing to final packaging.
            </p>
          </div>
        </div>
      </section>

      {/* Technology section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
                <Image
                  src={assetUrl('fotoproduk.jpeg')}
                  alt="Java Royale product showcase"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-5 right-5 bg-brand-yellow rounded-2xl p-4 shadow-lg">
                <p className="font-display font-bold text-2xl text-brand-black leading-none">40%</p>
                <p className="text-xs font-semibold text-brand-black/70">Lower oil content</p>
              </div>
            </div>
            <div>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-brand-black mb-6">
                Vacuum Frying: the science behind our snacks
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Conventional frying at 180°C destroys heat-sensitive nutrients and forces high oil absorption. Our vacuum fryers operate below 100°C under reduced atmospheric pressure — preserving the natural colour, texture, and nutritional integrity of the fruit.
              </p>
              <ul className="space-y-3">
                {[
                  'Up to 40% less fat than conventional chips',
                  'Natural fruit colour and aroma retained',
                  'No trans fats, no hydrogenated oils',
                  'Crunchy texture without deep-frying compromise',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle size={18} weight="fill" className="text-brand-green mt-0.5 shrink-0" />
                    <span className="text-gray-600 text-sm">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Standards grid */}
      <section className="py-20 bg-earth-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-brand-black mb-12">Quality at every stage</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {standards.map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 border border-earth-100">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-brand-yellow/20 text-brand-orange mb-4">
                  {item.icon}
                </span>
                <h3 className="font-display font-bold text-lg text-brand-black mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-brand-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-12">Compliance &amp; Certifications</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert) => (
              <div key={cert.label} className="border border-brand-yellow/30 rounded-2xl p-6">
                <p className="font-display font-bold text-xl text-brand-yellow mb-2">{cert.label}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-yellow">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <h2 className="font-display font-bold text-2xl text-brand-black">
            Ready to review our product specifications?
          </h2>
          <Link
            href="/products"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-black text-white font-semibold hover:bg-earth-800 transition-colors"
          >
            View Products <ArrowRight size={16} weight="bold" />
          </Link>
        </div>
      </section>
    </>
  );
}
