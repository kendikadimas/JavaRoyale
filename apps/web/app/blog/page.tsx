import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getArticles, getSeoSetting, imageUrl } from '@/lib/api';
import { ArrowRight, CalendarBlank } from '@phosphor-icons/react/dist/ssr';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoSetting('blog');
  return {
    title: seo?.seo_title ?? 'Blog — Java Royale Nusantara',
    description: seo?.seo_description ?? undefined,
  };
}

export default async function BlogPage() {
  const res = await getArticles().catch(() => null);
  const articles = res?.data ?? [];

  return (
    <>
      <section className="pt-32 pb-12 bg-earth-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h1 className="font-display font-bold text-4xl md:text-5xl text-brand-black mb-4">Blog &amp; Insights</h1>
          <p className="text-gray-500 text-lg max-w-xl">
            Export knowledge, health tips, and the latest from Java Royale Nusantara.
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, i) => (
                <Link
                  key={article.id}
                  href={`/blog/${article.slug}`}
                  className={`group flex flex-col rounded-2xl overflow-hidden border border-earth-100 hover:border-brand-yellow hover:shadow-lg transition-all ${
                    i === 0 ? 'md:col-span-2 lg:col-span-1' : ''
                  }`}
                >
                  {/* Image */}
                  <div className="relative aspect-[16/9] bg-earth-100 overflow-hidden shrink-0">
                    <Image
                      src={article.featured_image
                        ? imageUrl(article.featured_image)
                        : `https://picsum.photos/seed/${article.slug}/800/450`}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-white/90 text-brand-black text-xs font-semibold capitalize">
                        {article.category.replace(/-/g, ' ')}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-3">
                      <CalendarBlank size={12} />
                      {article.published_at
                        ? new Date(article.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
                        : 'Draft'}
                    </div>
                    <h2 className="font-display font-bold text-brand-black text-lg leading-snug mb-2 group-hover:text-brand-orange transition-colors line-clamp-2">
                      {article.title}
                    </h2>
                    <div
                      className="text-gray-500 text-sm line-clamp-3 flex-1 mb-4"
                      dangerouslySetInnerHTML={{ __html: article.body?.replace(/<[^>]*>/g, ' ').slice(0, 140) + '...' }}
                    />
                    <span className="flex items-center gap-1.5 text-brand-orange text-sm font-semibold">
                      Read more <ArrowRight size={14} weight="bold" />
                    </span>
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
