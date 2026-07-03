import Link from 'next/link';
import type { SiteSetting } from '@/lib/api';
import { InstagramLogo, LinkedinLogo, FacebookLogo, YoutubeLogo, WhatsappLogo, TiktokLogo } from '@phosphor-icons/react/dist/ssr';

interface FooterProps {
  siteSetting: SiteSetting | null;
}

export function Footer({ siteSetting }: FooterProps) {
  // Safe default fallback settings to prevent empty sections or deadlinks
  const defaultSetting = {
    address: 'Lobby Diamond A2, Apartemen Gateway Pater',
    email: 'javaroyalenusantara@gmail.com',
    whatsapp_primary: '+6282130613460',
    social_links: {
      instagram: 'https://instagram.com/javadrinkofficialid',
      tiktok: 'https://tiktok.com/@javaroyaleproduct',
    }
  };

  const address = siteSetting?.address || defaultSetting.address;
  const email = siteSetting?.email || defaultSetting.email;
  const whatsappPrimary = siteSetting?.whatsapp_primary || defaultSetting.whatsapp_primary;
  
  // Merge social links
  const social = {
    ...defaultSetting.social_links,
    ...(siteSetting?.social_links ?? {})
  } as Record<string, string>;


  return (
    <footer className="bg-gradient-to-b from-earth-900 via-earth-900 to-black text-white border-t border-brand-yellow/10 relative overflow-hidden">
      {/* Decorative subtle background glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-yellow/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-orange/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
        {/* Brand Column */}
        <div className="md:col-span-2 lg:col-span-2 space-y-6">
          <div className="flex items-center gap-3">
            {/* <span className="w-10 h-10 rounded-xl bg-brand-yellow flex items-center justify-center text-brand-black font-black text-base shadow-[0_0_20px_rgba(246,212,0,0.3)] transition-transform hover:scale-105 duration-300">
              JO
            </span> */}
            <span className="font-display font-black text-xl tracking-tight uppercase bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-400">
              Java Origins
            </span>
          </div>
          
          <p className="text-gray-300 text-sm leading-relaxed max-w-md">
            Premium Indonesian F&B export producer specialising in traditional herbal drinks (Jamu) and vacuum-fried fruit snacks. BPOM certified, Halal, and export-ready.
          </p>
          
          <p className="text-xs text-gray-500 font-medium">
            Pure Zealand &middot; Head Office & Factory
          </p>

          <div className="pt-2">
            <a
              href={`https://wa.me/${whatsappPrimary.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-brand-yellow text-brand-black font-bold text-sm hover:bg-white hover:shadow-xl hover:shadow-brand-yellow/10 hover:-translate-y-0.5 transition-all duration-300"
            >
              <WhatsappLogo size={18} weight="fill" />
              <span>WHATSAPP US</span>
            </a>
          </div>
        </div>

        {/* Navigation Column */}
        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-brand-yellow mb-6">Navigation</h3>
          <ul className="space-y-3.5">
            {[
              { href: '/', label: 'Home' },
              { href: '/about', label: 'About Us' },
              { href: '/products', label: 'Products' },
              { href: '/why-choose-us', label: 'Why Choose Us' },
              { href: '/blog', label: 'Blog' },
              { href: '/faq', label: 'FAQ' },
              { href: '/contact', label: 'Contact' },
            ].map((link) => (
              <li key={link.href} className="overflow-hidden">
                <Link 
                  href={link.href} 
                  className="inline-block text-gray-400 text-sm hover:text-brand-yellow hover:translate-x-1 transition-all duration-300 font-medium"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Column */}
        <div className="space-y-6">
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-brand-yellow mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="text-gray-300 text-sm leading-relaxed font-medium">
                {address}
              </li>
              <li>
                <a 
                  href={`mailto:${email}`} 
                  className="text-gray-400 text-sm hover:text-brand-yellow transition-colors font-semibold"
                >
                  {email}
                </a>
              </li>
              <li>
                <a 
                  href={`https://wa.me/${whatsappPrimary.replace(/[^0-9]/g, '')}`} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 text-sm hover:text-brand-yellow transition-colors font-semibold"
                >
                  {whatsappPrimary}
                </a>
              </li>
            </ul>
          </div>

          {/* Social Icons with premium styles */}
          <div className="space-y-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 block">Follow Us</span>
            <div className="flex items-center gap-3">
              {social.instagram && (
                <a 
                  href={social.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-gray-400 hover:text-brand-yellow hover:border-brand-yellow hover:bg-brand-yellow/5 hover:scale-110 hover:shadow-[0_0_15px_rgba(246,212,0,0.15)] transition-all duration-300"
                  aria-label="Instagram"
                >
                  <InstagramLogo size={20} />
                </a>
              )}
              {social.linkedin && (
                <a 
                  href={social.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-gray-400 hover:text-brand-yellow hover:border-brand-yellow hover:bg-brand-yellow/5 hover:scale-110 hover:shadow-[0_0_15px_rgba(246,212,0,0.15)] transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <LinkedinLogo size={20} />
                </a>
              )}
              {social.tiktok && (
                <a 
                  href={social.tiktok} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-gray-400 hover:text-brand-yellow hover:border-brand-yellow hover:bg-brand-yellow/5 hover:scale-110 hover:shadow-[0_0_15px_rgba(246,212,0,0.15)] transition-all duration-300"
                  aria-label="TikTok"
                >
                  <TiktokLogo size={20} />
                </a>
              )}
              {social.facebook && (
                <a 
                  href={social.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-gray-400 hover:text-brand-yellow hover:border-brand-yellow hover:bg-brand-yellow/5 hover:scale-110 hover:shadow-[0_0_15px_rgba(246,212,0,0.15)] transition-all duration-300"
                  aria-label="Facebook"
                >
                  <FacebookLogo size={20} />
                </a>
              )}
              {social.youtube && (
                <a 
                  href={social.youtube} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-gray-400 hover:text-brand-yellow hover:border-brand-yellow hover:bg-brand-yellow/5 hover:scale-110 hover:shadow-[0_0_15px_rgba(246,212,0,0.15)] transition-all duration-300"
                  aria-label="YouTube"
                >
                  <YoutubeLogo size={20} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 bg-black/40 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs font-medium">
            &copy; {new Date().getFullYear()} Pure Zealand. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-gray-400 text-xs font-semibold">
            <span>Made in Indonesia</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>BPOM RI Certified</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>Halal MUI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
