import Image from 'next/image';
import type { Testimonial } from '@/lib/api';
import { imageUrl } from '@/lib/api';
import { Star, Quotes } from '@phosphor-icons/react/dist/ssr';

interface Props {
  testimonials: Testimonial[];
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          weight={i < rating ? 'fill' : 'regular'}
          className={i < rating ? 'text-brand-yellow' : 'text-gray-200'}
        />
      ))}
    </div>
  );
}

export function TestimonialSection({ testimonials }: Props) {
  // Graceful empty state — renders a clean placeholder, no crash
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="bg-earth-50 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-brand-black">
            What our partners say
          </h2>
          <p className="text-gray-500 mt-2">Trusted by importers and distributors across the globe.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-6 border border-earth-100 flex flex-col gap-4 hover:border-brand-yellow transition-colors"
            >
              {/* Quote icon */}
              <Quotes size={28} weight="fill" className="text-brand-yellow/50" />

              {/* Quote text — max 3 lines */}
              <blockquote className="text-gray-700 text-sm leading-relaxed flex-1 line-clamp-5">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Rating */}
              {t.rating !== null && t.rating > 0 && (
                <StarRating rating={t.rating} />
              )}

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-earth-100">
                {t.photo ? (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                    <Image
                      src={imageUrl(t.photo)}
                      alt={t.author_name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-brand-yellow/20 flex items-center justify-center shrink-0">
                    <span className="font-display font-bold text-brand-orange text-sm">
                      {t.author_name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div>
                  <p className="font-semibold text-brand-black text-sm">{t.author_name}</p>
                  {t.company && (
                    <p className="text-gray-400 text-xs">{t.company}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
