import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticle, getArticles, imageUrl } from '@/lib/api';
import { ArrowLeft, CalendarBlank, Tag } from '@phosphor-icons/react/dist/ssr';

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
    title: 'Article Not Found — Java Royale Nusantara',
    description: 'The requested article could not be found.',
  };
  return {
    title: article.seo_title ?? `${article.title} — Java Royale Nusantara`,
    description: article.seo_description ?? article.body?.replace(/<[^>]*>/g, ' ').trim().slice(0, 155) ?? 'Read the latest insights from Java Royale Nusantara.',
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticle(slug).catch(() => null);

  if (!article) notFound();

  return (
    <div className="pt-24 bg-white">
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-4">
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-orange transition-colors">
          <ArrowLeft size={14} /> Back to Blog
        </Link>
      </div>

      {/* Header */}
      <header className="max-w-4xl mx-auto px-6 lg:px-8 py-8">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-yellow/20 text-brand-orange text-xs font-semibold capitalize">
            <Tag size={12} />
            {article.category.replace(/-/g, ' ')}
          </span>
          {article.published_at && (
            <span className="flex items-center gap-1.5 text-gray-400 text-xs">
              <CalendarBlank size={12} />
              {new Date(article.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          )}
        </div>
        <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-brand-black leading-tight">
          {article.title}
        </h1>
      </header>

      {/* Featured image */}
      {article.featured_image && (
        <div className="max-w-4xl mx-auto px-6 lg:px-8 mb-10">
          <div className="relative aspect-[16/9] rounded-3xl overflow-hidden">
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

      {/* Body */}
      <article className="max-w-3xl mx-auto px-6 lg:px-8 pb-24">
        <div
          className="prose md:prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: article.body }}
        />
      </article>

      {/* Back link */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 pb-16 border-t border-earth-100 pt-8">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-orange hover:text-brand-red transition-colors">
          <ArrowLeft size={14} /> All Articles
        </Link>
      </div>
    </div>
  );
}
