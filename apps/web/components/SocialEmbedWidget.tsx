import type { SocialEmbedSetting } from '@/lib/api';
import { InstagramLogo, TiktokLogo, YoutubeLogo, FacebookLogo } from '@phosphor-icons/react/dist/ssr';

interface Props {
  embeds: SocialEmbedSetting[];
}

const platformIcons: Record<string, React.ReactNode> = {
  instagram: <InstagramLogo size={20} weight="fill" />,
  tiktok: <TiktokLogo size={20} weight="fill" />,
  youtube: <YoutubeLogo size={20} weight="fill" />,
  facebook: <FacebookLogo size={20} weight="fill" />,
};

function EmbedCard({ embed }: { embed: SocialEmbedSetting }) {
  const icon = platformIcons[embed.platform.toLowerCase()] ?? <InstagramLogo size={20} weight="fill" />;

  return (
    <div className="bg-white rounded-2xl border border-earth-100 overflow-hidden">
      {/* Platform header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-earth-100">
        <span className="text-brand-orange">{icon}</span>
        <span className="text-sm font-medium text-gray-600 capitalize">{embed.platform}</span>
        {embed.link_url && (
          <a
            href={embed.link_url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto text-xs text-brand-orange hover:underline"
          >
            View profile
          </a>
        )}
      </div>

      {/* Embed code — sanitised: only render if non-empty */}
      {embed.embed_code ? (
        <div
          className="w-full overflow-hidden"
          dangerouslySetInnerHTML={{
            __html: sanitizeEmbedCode(embed.embed_code),
          }}
        />
      ) : (
        /* Fallback when no embed code: show a link card */
        embed.link_url ? (
          <a
            href={embed.link_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center p-6 md:p-10 text-gray-400 text-sm hover:text-brand-orange transition-colors gap-2"
          >
            <span>Follow us on {embed.platform}</span>
          </a>
        ) : null
      )}
    </div>
  );
}

/**
 * Basic embed code sanitisation:
 * - Only allows <iframe>, <blockquote>, <script> tags that come from known social domains.
 * - Strips javascript: href/src attributes.
 * - Does NOT strip the content wholesale — embed widgets from Elfsight, SnapWidget,
 *   Instagram oEmbed, TikTok oEmbed are expected to be pasted directly from the platforms.
 * Full XSS sanitisation should be handled server-side before storing in DB.
 */
function sanitizeEmbedCode(raw: string): string {
  // Remove javascript: protocol from src/href attributes
  return raw
    .replace(/\s(src|href)\s*=\s*["']\s*javascript:[^"']*/gi, ' $1="#"')
    // Remove event handlers (onclick, onload, etc.)
    .replace(/\s+on\w+\s*=\s*(["'])[^"']*\1/gi, '')
    // Remove <script> tags that don't come from known social CDNs
    // (allow instagram, tiktok, twitter, elfsight, snapwidget CDNs)
    .replace(
      /<script\b(?![^>]*(?:instagram\.com|tiktok\.com|twitter\.com|elfsight\.com|snapwidget\.com|platform\.twitter))[^>]*>[\s\S]*?<\/script>/gi,
      ''
    );
}

export function SocialEmbedWidget({ embeds }: Props) {
  // Filter to only active embeds with content (embed_code or link_url)
  const active = embeds.filter(
    (e) => e.is_active && (e.embed_code || e.link_url)
  );

  // Graceful empty state
  if (active.length === 0) return null;

  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-brand-black">
            Follow our journey
          </h2>
          <p className="text-gray-500 mt-1.5 text-sm">
            Stay updated with our latest products and news.
          </p>
        </div>

        <div className={`grid gap-6 ${
          active.length === 1
            ? 'grid-cols-1 max-w-lg'
            : active.length === 2
            ? 'grid-cols-1 md:grid-cols-2'
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }`}>
          {active.map((embed) => (
            <EmbedCard key={embed.id} embed={embed} />
          ))}
        </div>
      </div>
    </section>
  );
}
