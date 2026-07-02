import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getBuyerCategories, getSeoSetting, assetUrl } from '@/lib/api';
import { ArrowRight, Globe, TrendUp, ChartBar } from '@phosphor-icons/react/dist/ssr';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoSetting('market-opportunities');
  return {
    title: seo?.seo_title ?? 'Market Opportunities — Java Royale Nusantara',
    description: seo?.seo_description ?? undefined,
  };
}

const markets = [
  { region: 'ASEAN', flag: '🌏', desc: 'Singapore, Malaysia, Philippines, Vietnam — culturally aligned markets with high herbal and health food adoption.', growth: 'High' },
  { region: 'Middle East', flag: '🌍', desc: 'UAE, Saudi Arabia, Kuwait — large halal-conscious consumer base and strong demand for exotic Asian food products.', growth: 'Very High' },
  { region: 'Europe', flag: '🌎', desc: 'Netherlands, Germany, UK — growing health-conscious consumer segments seeking natural, clean-label snacks.', growth: 'Growing' },
  { region: 'Australia & NZ', flag: '🌏', desc: 'Multicultural population with strong Asian diaspora communities and booming health food retail.', growth: 'Steady' },
];

export default async function MarketOpportunitiesPage() {
  const categories = await getBuyerCategories().catch(() => []);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-brand-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-display font-bold text-4xl md:text-5xl leading-tight mb-6">
                Indonesia’s F&amp;B is going global.
                <span className="text-brand-yellow block mt-1">Be part of it.</span>
              </h1>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8">
                The global herbal beverage market is projected to reach $3.2B by 2028. Indonesian vacuum-fried snacks are among the fastest-growing import categories in premium retail across Asia and Europe.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <TrendUp size={18} className="text-brand-green" weight="bold" />
                  <span className="text-gray-300 text-sm">8.4% CAGR herbal beverage market</span>
                </div>
                <div className="flex items-center gap-2">
                  <ChartBar size={18} className="text-brand-yellow" weight="fill" />
                  <span className="text-gray-300 text-sm">Clean-label snacks up 23% YoY</span>
                </div>
              </div>
            </div>
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
                <Image
                  src={assetUrl('tropicalsnack.jpeg')}
                  alt="Premium tropical snack export"
                fill
                className="object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <Globe size={20} className="text-brand-yellow mb-1" weight="fill" />
                <p className="text-white font-semibold">Exported to 6+ countries</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Buyer categories */}
      {categories.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-brand-black mb-12">
              Who we work with
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((cat) => (
                <div key={cat.id} className="bg-earth-50 rounded-2xl p-6 border border-earth-100 hover:border-brand-yellow transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-brand-yellow/20 flex items-center justify-center mb-4 group-hover:bg-brand-yellow transition-colors">
                    <Globe size={24} className="text-brand-orange group-hover:text-brand-black transition-colors" weight="fill" />
                  </div>
                  <h3 className="font-display font-bold text-brand-black text-lg">{cat.label}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regional markets */}
      <section className="py-20 bg-earth-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-brand-black mb-12">Key Export Markets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {markets.map((m) => (
              <div key={m.region} className="bg-white rounded-2xl p-6 border border-earth-100">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-display font-bold text-xl text-brand-black">{m.region}</h3>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    m.growth === 'Very High' ? 'bg-brand-green/20 text-brand-green' :
                    m.growth === 'High' ? 'bg-brand-yellow/20 text-brand-orange' :
                    m.growth === 'Growing' ? 'bg-brand-orange/20 text-brand-orange' :
                    'bg-earth-100 text-gray-600'
                  }`}>{m.growth}</span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-yellow">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-display font-bold text-2xl text-brand-black">Ready to explore your market opportunity?</h2>
            <p className="text-brand-black/70 mt-1 text-sm">Our export team will connect you with the right products and documentation for your region.</p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-black text-white font-semibold hover:bg-earth-800 transition-colors"
          >
            Contact Export Team <ArrowRight size={16} weight="bold" />
          </Link>
        </div>
      </section>
    </>
  );
}
