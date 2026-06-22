'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { List, X } from '@phosphor-icons/react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/products', label: 'Products' },
  { href: '/market-opportunities', label: 'Markets' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-sm border-b border-earth-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="w-8 h-8 rounded-full bg-brand-yellow flex items-center justify-center text-brand-black font-display font-bold text-sm group-hover:bg-brand-orange transition-colors">
            JR
          </span>
          <span className="font-display font-bold text-brand-black text-sm leading-tight">
            Java Royale<br />
            <span className="text-[10px] font-medium text-gray-500 tracking-wide">NUSANTARA</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  active
                    ? 'bg-brand-yellow text-brand-black'
                    : 'text-gray-600 hover:text-brand-black hover:bg-earth-100'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center px-5 py-2 rounded-full bg-brand-yellow text-brand-black font-semibold text-sm hover:bg-brand-orange transition-colors"
          >
            Inquire Now
          </Link>
          <button
            className="lg:hidden p-2 text-brand-black"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <List size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-earth-100 px-6 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-earth-100"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="block mt-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-brand-yellow text-brand-black text-center"
          >
            Inquire Now
          </Link>
        </div>
      )}
    </header>
  );
}
