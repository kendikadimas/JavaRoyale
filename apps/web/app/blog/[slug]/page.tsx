import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticle, getArticles, imageUrl } from '@/lib/api';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const res = await getArticles().catch(() => null);
  return (res?.data ?? []).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug).catch(() => null);
  if (!article) return {
    title: 'Article Not Found — Java Origins',
    description: 'The requested article could not be found.',
  };
  return {
    title: article.seo_title ?? `${article.title} — Java Origins`,
    description: article.seo_description ?? article.body?.replace(/<[^>]*>/g, ' ').trim().slice(0, 155) ?? 'Read the latest insights from Java Origins.',
  };
}

const CalendarIcon = () => (
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

const BackArrowIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticle(slug).catch(() => null);

  if (!article) notFound();

  // Fetch related articles
  const allArticlesRes = await getArticles().catch(() => null);
  const allArticles = allArticlesRes?.data ?? [];
  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id)
    .slice(0, 2);

  const formattedHeaderDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
    : 'Draft';

  return (
    <div className="pt-32 bg-white min-h-screen">
      {/* Breadcrumb / Back Navigation */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 mb-6">
        <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-brand-orange transition-colors">
          <BackArrowIcon /> Back to Blog
        </Link>
      </div>

      {/* Header Info (Centered like event layout) */}
      <header className="max-w-4xl mx-auto px-6 lg:px-8 text-center space-y-4 mb-10">
        <span className="text-[10px] md:text-xs font-bold tracking-[0.25em] text-brand-orange uppercase block">
          {formattedHeaderDate}
        </span>
        <h1 className="font-display font-black text-3xl md:text-5xl lg:text-6xl text-brand-black uppercase tracking-tight leading-none max-w-3xl mx-auto">
          {article.title}
        </h1>
        <p className="text-gray-500 text-sm md:text-base italic font-semibold max-w-2xl mx-auto">
          {article.seo_description || 'Jamu herbal insights and wellness tradition from Java Origins.'}
        </p>
      </header>

      {/* Featured image (Centered, big, rounded) */}
      {article.featured_image && (
        <div className="max-w-4xl mx-auto px-6 lg:px-8 mb-12">
          <div className="relative aspect-[16/9] rounded-[2rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.08)] bg-earth-50 border border-earth-100">
            <Image
              src={imageUrl(article.featured_image)}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Content & Metadata Area */}
      <section className="max-w-3xl mx-auto px-6 lg:px-8 pb-20 space-y-8">
        {/* Date and Time */}
        <div className="space-y-1 text-left">
          <span className="font-display font-black text-[10px] text-brand-black uppercase tracking-[0.2em] block">
            Date and Time
          </span>
          <p className="text-gray-600 text-sm font-bold uppercase">
            {article.published_at
              ? new Date(article.published_at).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
              : 'Draft'}
          </p>
          <p className="text-gray-400 text-xs font-semibold">
            08:00 AM - 05:00 PM (WIB)
          </p>
        </div>

        {/* Category */}
        <div className="space-y-1 text-left">
          <span className="font-display font-black text-[10px] text-brand-black uppercase tracking-[0.2em] block">
            Article Category
          </span>
          <p className="text-gray-600 text-sm font-bold uppercase">
            {article.category.replace(/-/g, ' ')}
          </p>
        </div>

        {/* Organized By */}
        <div className="space-y-1 text-left">
          <span className="font-display font-black text-[10px] text-brand-black uppercase tracking-[0.2em] block">
            Organized By
          </span>
          <p className="text-gray-600 text-sm font-bold uppercase">
            Pure Zealand
          </p>
        </div>

        {/* About this Event/Article */}
        <div className="space-y-4 pt-6 border-t border-earth-100/60 text-left">
          <span className="font-display font-black text-[10px] text-brand-black uppercase tracking-[0.2em] block">
            About This Article
          </span>
          <div
            className="prose md:prose-lg max-w-none text-gray-600 leading-relaxed font-medium"
            dangerouslySetInnerHTML={{ __html: article.body }}
          />
        </div>
      </section>

      {/* Related Events/Articles (Grid Cards list) */}
      {relatedArticles.length > 0 && (
        <section className="bg-earth-50/30 border-t border-earth-100 py-16 pb-24">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="font-display font-black text-2xl md:text-3xl text-brand-black text-center uppercase tracking-tight mb-10">
              Related Articles
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/blog/${rel.slug}`}
                  className="group block bg-brand-yellow border border-brand-yellow rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-brand-yellow/10 hover:scale-[1.005] transition-all duration-300 p-4"
                >
                  <div className="flex flex-col gap-3.5">
                    {/* Top: Image Container */}
                    <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-earth-900/5 shrink-0">
                      <Image
                        src={rel.featured_image
                          ? imageUrl(rel.featured_image)
                          : '/ingredients.jpeg'}
                        alt={rel.title}
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
                          {rel.category.replace(/-/g, ' ')}
                        </span>
                      </div>

                      {/* Small Date */}
                      <div className="text-[9px] font-black text-brand-orange tracking-widest uppercase">
                        {rel.published_at
                          ? new Date(rel.published_at).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
                          : 'Draft'}
                      </div>

                      {/* Title */}
                      <h2 className="font-display font-black text-base md:text-lg text-brand-black uppercase tracking-tight leading-tight group-hover:text-brand-orange transition-colors duration-300">
                        {rel.title}
                      </h2>

                      {/* Description */}
                      <div
                        className="text-earth-800 text-[11px] md:text-xs leading-relaxed line-clamp-2 max-w-3xl font-medium"
                        dangerouslySetInnerHTML={{ __html: rel.body?.replace(/<[^>]*>/g, ' ').slice(0, 140) + '...' }}
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
                            {rel.published_at
                              ? new Date(rel.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                              : 'Draft'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer All Articles Back Link */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12 text-center">
        <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-orange hover:text-brand-black transition-colors">
          <BackArrowIcon /> All Articles
        </Link>
      </div>
    </div>
  );
}
