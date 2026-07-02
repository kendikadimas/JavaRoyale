import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getArticles, getSeoSetting, imageUrl, assetUrl } from '@/lib/api';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoSetting('blog');
  return {
    title: seo?.seo_title ?? 'Blog — Java Origins',
    description: seo?.seo_description ?? undefined,
  };
}const CalendarIcon = () => (
  <svg className="w-4 h-4 text-brand-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-4 h-4 text-brand-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-4 h-4 text-brand-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export default async function BlogPage() {
  const res = await getArticles().catch(() => null);
  const articles = res?.data ?? [];

  return (
    <>
      <section className="pt-32 pb-12 bg-earth-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h1 className="font-display font-black text-4xl md:text-5xl text-brand-black mb-4 uppercase tracking-tight">
            BLOG & <span className="text-brand-orange">INSIGHTS</span>
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-xl">
            Export insights, herbal wellness tips, and the latest news from Java Origins.
          </p>
        </div>
      </section>

      <section className="bg-white py-12 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {articles.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-gray-400 text-lg">No articles published yet. Check back soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  href={`/blog/${article.slug}`}
                  className="group block bg-brand-yellow border border-brand-yellow rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-brand-yellow/10 hover:scale-[1.005] transition-all duration-300 p-4"
                >
                  <div className="flex flex-col gap-3.5">
                    {/* Top: Image Container */}
                    <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-earth-900/5 shrink-0">
                      <Image
                        src={article.featured_image
                          ? imageUrl(article.featured_image)
                          : assetUrl('pouchjavadrink.jpeg')}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      />
                    </div>

                    {/* Bottom: Content details */}
                    <div className="space-y-2.5 text-left w-full">
                      {/* Badges row */}
                      <div className="flex flex-wrap gap-1.5">
                        <span className="px-2 py-0.5 rounded-full bg-earth-900 text-brand-yellow text-[9px] font-black tracking-wider uppercase">
                          Blog Post
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-earth-900/10 text-earth-900 text-[9px] font-black tracking-wider uppercase border border-earth-900/10">
                          {article.category.replace(/-/g, ' ')}
                        </span>
                      </div>

                      {/* Small Date */}
                      <div className="text-[9px] font-black text-brand-orange tracking-widest uppercase">
                        {article.published_at
                          ? new Date(article.published_at).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
                          : 'Draft'}
                      </div>

                      {/* Title */}
                      <h2 className="font-display font-black text-base md:text-lg text-brand-black uppercase tracking-tight leading-tight group-hover:text-brand-orange transition-colors duration-300">
                        {article.title}
                      </h2>

                      {/* Description */}
                      <div
                        className="text-earth-800 text-[11px] md:text-xs leading-relaxed line-clamp-2 max-w-3xl font-medium"
                        dangerouslySetInnerHTML={{ __html: article.body?.replace(/<[^>]*>/g, ' ').slice(0, 140) + '...' }}
                      />

                      {/* Divider */}
                      <div className="w-full h-[1px] bg-earth-900/10 pt-1" />

                      {/* Bottom Metadata row */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[9px] font-black text-earth-900/70 pt-0.5 tracking-wider uppercase">
                        <div className="flex items-center gap-1">
                          <UserIcon />
                          <span>By Editor</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ClockIcon />
                          <span>5 Min Read</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CalendarIcon />
                          <span>
                            {article.published_at
                              ? new Date(article.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                              : 'Draft'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
