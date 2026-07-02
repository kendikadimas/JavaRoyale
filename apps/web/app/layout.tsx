import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Nunito_Sans } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getSiteSetting } from '@/lib/api';

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-plus-jakarta-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const nunitoSans = Nunito_Sans({
  variable: '--font-nunito-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Java Origins — Premium Indonesian F&B Export',
  description: 'Producer and exporter of premium Indonesian herbal drinks (Jamu) and vacuum-fried fruit snacks. BPOM certified, Halal, export-ready.',
  openGraph: {
    siteName: 'Java Origins',
    locale: 'id_ID',
    type: 'website',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteSetting = await getSiteSetting().catch(() => null);

  return (
    <html lang="id" className={`${plusJakartaSans.variable} ${nunitoSans.variable}`}>
      <body className="min-h-[100dvh] flex flex-col bg-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer siteSetting={siteSetting} />
      </body>
    </html>
  );
}
