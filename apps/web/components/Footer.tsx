import Link from 'next/link';
import type { SiteSetting } from '@/lib/api';
import { InstagramLogo, LinkedinLogo, FacebookLogo, YoutubeLogo, WhatsappLogo, TiktokLogo } from '@phosphor-icons/react/dist/ssr';

interface FooterProps {
  siteSetting: SiteSetting | null;
}

export function Footer({ siteSetting }: FooterProps) {
  const social = siteSetting?.social_links ?? {};

  return (
    <footer className="bg-brand-black text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-2 lg:col-span-2">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="w-8 h-8 rounded-full bg-brand-yellow flex items-center justify-center text-brand-black font-bold text-sm">
              JR
            </span>
            <span className="font-display font-bold text-white">
              Java Royale Nusantara
            </span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-1">
            Premium Indonesian F&B export producer specialising in traditional herbal drinks (Jamu) and vacuum-fried fruit snacks. BPOM certified, Halal, and export-ready.
          </p>
          <p className="text-gray-600 text-xs mb-6">
            PT. Java Royale Nusantara
          </p>
          {siteSetting?.whatsapp_primary && (
            <a
              href={`https://wa.me/${siteSetting.whatsapp_primary.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-yellow text-brand-black font-semibold text-sm hover:bg-brand-orange transition-colors"
            >
              <WhatsappLogo size={16} weight="fill" />
              WhatsApp Us
            </a>
          )}
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-brand-yellow mb-4">Navigation</h3>
          <ul className="space-y-2.5">
            {[
              { href: '/', label: 'Home' },
              { href: '/about', label: 'About Us' },
              { href: '/products', label: 'Products' },
              { href: '/why-choose-us', label: 'Why Choose Us' },
              { href: '/market-opportunities', label: 'Market Opportunities' },
              { href: '/blog', label: 'Blog' },
              { href: '/faq', label: 'FAQ' },
              { href: '/contact', label: 'Contact' },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-gray-400 text-sm hover:text-brand-yellow transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-brand-yellow mb-4">Contact</h3>
          <ul className="space-y-3">
            {siteSetting?.address && (
              <li className="text-gray-400 text-sm leading-relaxed">{siteSetting.address}</li>
            )}
            {siteSetting?.email && (
              <li>
                <a href={`mailto:${siteSetting.email}`} className="text-gray-400 text-sm hover:text-brand-yellow transition-colors">
                  {siteSetting.email}
                </a>
              </li>
            )}
            {siteSetting?.whatsapp_primary && (
              <li>
                <a href={`https://wa.me/${siteSetting.whatsapp_primary.replace(/[^0-9]/g, '')}`} className="text-gray-400 text-sm hover:text-brand-yellow transition-colors">
                  {siteSetting.whatsapp_primary}
                </a>
              </li>
            )}
            {siteSetting?.operating_hours && (
              <li className="text-gray-500 text-xs">{siteSetting.operating_hours}</li>
            )}
          </ul>

          {/* Social */}
          <div className="flex items-center gap-3 mt-6">
            {social.tiktok && (
              <a href={social.tiktok} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-yellow transition-colors">
                <TiktokLogo size={20} />
              </a>
            )}
            {social.instagram && (
              <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-yellow transition-colors">
                <InstagramLogo size={20} />
              </a>
            )}
            {social.linkedin && (
              <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-yellow transition-colors">
                <LinkedinLogo size={20} />
              </a>
            )}
            {social.facebook && (
              <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-yellow transition-colors">
                <FacebookLogo size={20} />
              </a>
            )}
            {social.youtube && (
              <a href={social.youtube} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-yellow transition-colors">
                <YoutubeLogo size={20} />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs">&copy; {new Date().getFullYear()} PT. Java Royale Nusantara. All rights reserved.</p>
          <p className="text-gray-600 text-xs">Made in Indonesia &middot; BPOM &middot; Halal MUI</p>
        </div>
      </div>
    </footer>
  );
}
