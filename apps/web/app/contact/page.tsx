import type { Metadata } from 'next';
import { getSeoSetting } from '@/lib/api';
import { ContactForm } from './ContactForm';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoSetting('contact');
  return {
    title: seo?.seo_title ?? 'Contact — Java Origins',
    description: seo?.seo_description ?? 'Contact the Java Origins export team for bulk orders, distributor partnerships, and product inquiries.',
  };
}

export default async function ContactPage() {
  return (
    <div className="pt-32 pb-24 bg-earth-50/30 min-h-screen relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-yellow/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Page Title & Header - Combined to make it concise */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold tracking-[0.3em] text-brand-orange uppercase block">
            Export Inquiry
          </span>
          <h1 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-brand-black uppercase tracking-tight leading-none">
            GET IN <span className="text-brand-orange">TOUCH</span>
          </h1>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed">
            Interested in bulk pricing, export distribution, or OEM? Let us know, and our export team will respond within 1 business day.
          </p>
        </div>

        {/* Main Grid: Card Layout */}
        <div className="max-w-6xl mx-auto bg-white rounded-[2.5rem] border border-earth-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Column: Direct Info Card (Earthy Dark Theme) */}
          <div className="lg:col-span-5 bg-earth-900 text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
            {/* Glowing background elements */}
            <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-brand-yellow/10 blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-brand-orange/10 blur-[80px] pointer-events-none" />

            <div className="space-y-10 relative z-10">
              <div>
                <h2 className="font-display font-black text-xl md:text-2xl uppercase tracking-wider text-brand-yellow">
                  CONTACT INFO
                </h2>
                <div className="w-10 h-0.5 bg-brand-orange mt-2" />
              </div>

              <div className="space-y-6">
                {/* Indonesia Office */}
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-brand-yellow border border-white/10 shrink-0 group-hover:scale-105 transition-transform">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Indonesia Office</span>
                    <p className="text-gray-200 text-xs leading-relaxed">
                      Lobby Diamond A2, Apartemen Gateway Paster, Bandung - Indonesia.
                    </p>
                    <a
                      href="https://wa.me/6282130613460"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-1 text-xs font-bold text-brand-yellow hover:text-white transition-colors"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.705 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      +62 821 3061 3460
                    </a>
                  </div>
                </div>

                {/* New Zealand Office */}
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-brand-yellow border border-white/10 shrink-0 group-hover:scale-105 transition-transform">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">New Zealand Office</span>
                    <p className="text-gray-200 text-xs leading-relaxed">
                      384 Moutere Highway, Tasman.
                    </p>
                    <a
                      href="https://wa.me/64212532492"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-1 text-xs font-bold text-brand-yellow hover:text-white transition-colors"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.705 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      +64 21 253 2492
                    </a>
                  </div>
                </div>

                {/* Email Support */}
                <div className="flex items-start gap-4 group min-w-0 w-full">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-brand-yellow border border-white/10 shrink-0 group-hover:scale-105 transition-transform">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Email Support</span>
                    <a href="mailto:javaorigins.nz@gmail.com" className="text-gray-200 text-xs sm:text-sm font-bold hover:text-brand-yellow transition-colors break-all block">
                      javaorigins.nz@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* B2B Export tagline */}
            <div className="pt-10 border-t border-white/10 text-[10px] text-gray-400 tracking-wider uppercase font-semibold relative z-10 leading-relaxed">
              Exporting Indonesian Herbal Excellence Globally
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 p-8 md:p-12">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
