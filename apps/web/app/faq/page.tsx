import type { Metadata } from 'next';
import { getFaqItems, getSeoSetting } from '@/lib/api';
import { FaqAccordion } from './FaqAccordion';
import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoSetting('faq');
  return {
    title: seo?.seo_title ?? 'FAQ — Java Royale Nusantara',
    description: seo?.seo_description ?? undefined,
  };
}

export default async function FaqPage() {
  const faqs = await getFaqItems().catch(() => []);

  return (
    <>
      <section className="pt-32 pb-12 bg-earth-50">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <h1 className="font-display font-bold text-4xl md:text-5xl text-brand-black mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-500 text-lg">Common questions about our products, export process, and partnership options.</p>
        </div>
      </section>

      <section className="bg-white py-12 pb-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          {faqs.length === 0 ? (
            <p className="text-gray-400 text-center py-12">No FAQ items yet.</p>
          ) : (
            <FaqAccordion items={faqs} />
          )}

          <div className="mt-16 bg-earth-50 rounded-2xl p-8 text-center">
            <h2 className="font-display font-bold text-xl text-brand-black mb-2">Still have questions?</h2>
            <p className="text-gray-500 text-sm mb-6">Our export team is ready to assist you with any specific enquiries.</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-yellow text-brand-black font-semibold hover:bg-brand-orange transition-colors"
            >
              Contact Us <ArrowRight size={16} weight="bold" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
