import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProduct, getProducts } from '@/lib/api';
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr';
import { ProductDetailView } from './ProductDetailView';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const res = await getProducts().catch(() => null);
  return (res?.data ?? []).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug).catch(() => null);
  if (!product) return {
    title: 'Product Not Found — Java Origins',
    description: 'The requested product could not be found.',
  };
  return {
    title: `${product.name} — Java Origins`,
    description: product.description ?? `Discover ${product.name} from Java Origins — premium Indonesian F&B export products.`,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug).catch(() => null);

  if (!product) notFound();

  return (
    <div className="pt-24 bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
        <Link href="/products" className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-brand-orange transition-colors">
          <ArrowLeft size={12} weight="bold" /> Back to Products
        </Link>
      </div>

      {/* 1. Main Product spotlight section (includes all sections inside) */}
      <ProductDetailView product={product} />
    </div>
  );
}
