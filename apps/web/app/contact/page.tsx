import type { Metadata } from 'next';
import { getSeoSetting, getSiteSetting } from '@/lib/api';
import { ContactForm } from './ContactForm';
import { MapPin, Phone, Envelope, Clock } from '@phosphor-icons/react/dist/ssr';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoSetting('contact');
  return {
    title: seo?.seo_title ?? 'Contact — Java Royale Nusantara',
    description: seo?.seo_description ?? undefined,
  };
}

export default async function ContactPage() {
  const site = await getSiteSetting().catch(() => null);

  return (
    <>
      <section className="pt-32 pb-12 bg-earth-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h1 className="font-display font-bold text-4xl md:text-5xl text-brand-black mb-4">Get in Touch</h1>
          <p className="text-gray-500 text-lg max-w-xl">
            Interested in our products, bulk order pricing, or becoming a distributor? Send us a message and our export team will respond within 1 business day.
          </p>
        </div>
      </section>

      <section className="bg-white py-12 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-3 gap-12">
          {/* Contact info */}
          <div className="space-y-6">
            <h2 className="font-display font-bold text-xl text-brand-black">Contact Information</h2>
            {site?.address && (
              <div className="flex items-start gap-3">
                <MapPin size={18} weight="fill" className="text-brand-orange mt-0.5 shrink-0" />
                <p className="text-gray-600 text-sm leading-relaxed">{site.address}</p>
              </div>
            )}
            {site?.whatsapp_primary && (
              <div className="flex items-center gap-3">
                <Phone size={18} weight="fill" className="text-brand-orange shrink-0" />
                <a href={`https://wa.me/${site.whatsapp_primary.replace(/[^0-9]/g, '')}`}
                   className="text-gray-600 text-sm hover:text-brand-orange transition-colors">
                  {site.whatsapp_primary} <span className="text-gray-400 text-xs">(WhatsApp)</span>
                </a>
              </div>
            )}
            {site?.whatsapp_secondary && (
              <div className="flex items-center gap-3">
                <Phone size={18} weight="fill" className="text-gray-300 shrink-0" />
                <a href={`https://wa.me/${site.whatsapp_secondary.replace(/[^0-9]/g, '')}`}
                   className="text-gray-600 text-sm hover:text-brand-orange transition-colors">
                  {site.whatsapp_secondary}
                </a>
              </div>
            )}
            {site?.email && (
              <div className="flex items-center gap-3">
                <Envelope size={18} weight="fill" className="text-brand-orange shrink-0" />
                <a href={`mailto:${site.email}`} className="text-gray-600 text-sm hover:text-brand-orange transition-colors">
                  {site.email}
                </a>
              </div>
            )}
            {site?.operating_hours && (
              <div className="flex items-center gap-3">
                <Clock size={18} weight="fill" className="text-brand-orange shrink-0" />
                <p className="text-gray-600 text-sm">{site.operating_hours}</p>
              </div>
            )}
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
