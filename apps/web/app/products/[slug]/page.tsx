import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProduct, getProducts, imageUrl } from '@/lib/api';
import { CheckCircle, ArrowLeft, Leaf, Package } from '@phosphor-icons/react/dist/ssr';

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
  if (!product) return {};
  return {
    title: `${product.name} — Java Royale Nusantara`,
    description: product.description ?? undefined,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug).catch(() => null);

  if (!product) notFound();

  const mainImage = product.images[0];

  return (
    <div className="pt-24 bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
        <Link href="/products" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-orange transition-colors">
          <ArrowLeft size={14} /> Back to Products
        </Link>
      </div>

      {/* Main product section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-8 grid lg:grid-cols-2 gap-12 items-start">
        {/* Gallery */}
        <div className="space-y-3">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-earth-50 border border-earth-100">
            {mainImage ? (
              <Image
                src={imageUrl(mainImage.image_path)}
                alt={mainImage.alt_text ?? product.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Leaf size={60} className="text-earth-200" />
              </div>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(1, 5).map((img) => (
                <div key={img.id} className="relative aspect-square rounded-xl overflow-hidden bg-earth-50">
                  <Image src={imageUrl(img.image_path)} alt={img.alt_text ?? ''} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <span className="inline-block px-3 py-1 rounded-full bg-brand-yellow/20 text-brand-orange text-xs font-semibold capitalize mb-4">
            {product.category.replace(/-/g, ' ')}
          </span>
          <h1 className="font-display font-bold text-3xl md:text-4xl text-brand-black leading-tight mb-4">
            {product.name}
          </h1>
          {product.description && (
            <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
          )}

          {/* Advantages */}
          {product.advantages && product.advantages.length > 0 && (
            <div className="mb-6">
              <h3 className="font-display font-semibold text-brand-black mb-3">Key Advantages</h3>
              <ul className="space-y-2">
                {product.advantages.map((adv, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle size={16} weight="fill" className="text-brand-green mt-0.5 shrink-0" />
                    <span className="text-gray-600 text-sm">{adv}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Link
            href={`/contact?product=${encodeURIComponent(product.name)}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-yellow text-brand-black font-semibold hover:bg-brand-orange transition-colors"
          >
            <Package size={16} weight="fill" /> Inquire About This Product
          </Link>
        </div>
      </section>

      {/* Variants & Nutrition */}
      {product.variants && product.variants.length > 0 && (
        <section className="bg-earth-50 py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-brand-black mb-8">Variants &amp; Specifications</h2>
            <div className="space-y-6">
              {product.variants.map((variant) => (
                <div key={variant.id} className="bg-white rounded-2xl border border-earth-100 overflow-hidden">
                  <div className="px-6 py-4 border-b border-earth-100 flex items-center justify-between">
                    <h3 className="font-display font-bold text-lg text-brand-black">{variant.variant_name}</h3>
                    {variant.net_weight && (
                      <span className="text-sm text-gray-500 bg-earth-50 px-3 py-1 rounded-full">{variant.net_weight}</span>
                    )}
                  </div>
                  <div className="p-6 grid md:grid-cols-2 gap-8">
                    {/* Ingredients */}
                    {variant.ingredients && variant.ingredients.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-sm text-gray-700 mb-3">Ingredients</h4>
                        <ul className="space-y-1.5">
                          {variant.ingredients.map((ing, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                              {ing}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Nutrition Facts */}
                    {variant.nutrition_fact && (
                      <div>
                        <h4 className="font-semibold text-sm text-gray-700 mb-3">Nutrition Facts</h4>
                        <div className="border border-earth-200 rounded-xl overflow-hidden">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-earth-50">
                                <th className="text-left px-4 py-2 text-gray-500 font-medium">Nutrient</th>
                                <th className="text-right px-4 py-2 text-gray-500 font-medium">Amount</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-earth-100">
                              {([
                                ['Energy', variant.nutrition_fact.energy_kcal, 'kcal'],
                                ['Protein', variant.nutrition_fact.protein_g, 'g'],
                                ['Total Fat', variant.nutrition_fact.fat_g, 'g'],
                                ['Carbohydrates', variant.nutrition_fact.carbs_g, 'g'],
                                ['Sugar', variant.nutrition_fact.sugar_g, 'g'],
                                ['Sodium', variant.nutrition_fact.sodium_mg, 'mg'],
                              ] as [string, string | null, string][]).filter(([, val]) => val !== null).map(([label, val, unit]) => (
                                <tr key={label} className="hover:bg-earth-50">
                                  <td className="px-4 py-2.5 text-gray-700">{label}</td>
                                  <td className="px-4 py-2.5 text-right font-medium text-brand-black">{val} {unit}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>

                  {variant.compliance_notes && (
                    <div className="px-6 pb-5">
                      <p className="text-xs text-gray-400 bg-earth-50 rounded-xl px-4 py-3 leading-relaxed">
                        <span className="font-semibold text-gray-500">Compliance: </span>{variant.compliance_notes}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
