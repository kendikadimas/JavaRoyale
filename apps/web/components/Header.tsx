'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { List, X } from '@phosphor-icons/react';

const navLinks = [
  { href: '/', label: 'HOME' },
  { href: '/about', label: 'ABOUT' },
  { href: '/products', label: 'PRODUCTS' },
  { href: '/blog', label: 'BLOG' },
  { href: '/contact', label: 'CONTACT' },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomepage = pathname === '/';

  const headerBgClass = isHomepage
    ? (isScrolled 
        ? 'bg-earth-900/95 backdrop-blur-md border-b border-earth-800 shadow-lg py-3' 
        : 'bg-transparent border-b border-transparent py-6')
    : (isScrolled
        ? 'bg-earth-900/95 backdrop-blur-md border-b border-earth-800 shadow-lg py-3'
        : 'bg-earth-900/95 backdrop-blur-md border-b border-earth-800 shadow-lg py-4');

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${headerBgClass}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        
        {/* Logo: JAVA ORIGINS */}
        <div className="flex justify-start">
          <Link href="/" className="flex flex-col items-start select-none group">
            <span className="font-display font-black text-white group-hover:text-brand-yellow text-xl md:text-2xl leading-[0.85] tracking-tighter text-left transition-colors">
              JAVA<br />ORIGINS
            </span>
          </Link>
        </div>

        {/* Right Navigation: Menu items (Desktop) */}
        <nav className="hidden lg:flex items-center gap-8 justify-end">
          {navLinks.map((link) => {
            const active = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`hover:text-brand-yellow text-xs font-bold tracking-[0.2em] transition-colors ${
                  active ? 'text-brand-yellow' : 'text-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center">
          <button
            className="text-white p-2 hover:bg-white/10 rounded-full transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileOpen && (
        <div className="lg:hidden bg-earth-900/95 backdrop-blur-lg border-t border-earth-800 px-6 py-6 space-y-4 absolute top-full left-0 right-0 shadow-xl transition-all duration-300">
          {navLinks.map((link) => {
            const active = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block hover:text-brand-yellow text-sm font-bold tracking-widest py-2 border-b border-white/5 last:border-0 ${
                  active ? 'text-brand-yellow' : 'text-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
