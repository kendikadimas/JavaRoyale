const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const base = API_BASE.endsWith('/api') ? API_BASE : `${API_BASE}/api`;
  const url = `${base}${path}`;
  const res = await fetch(url, {
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    throw new ApiError(res.status, `API error ${res.status} on ${path}`);
  }

  return res.json() as Promise<T>;
}

// ── Types ─────────────────────────────────────────────────────────────────────

export interface SiteSetting {
  id: number;
  address: string | null;
  whatsapp_primary: string | null;
  whatsapp_secondary: string | null;
  email: string | null;
  operating_hours: string | null;
  social_links: Record<string, string> | null;
}

export interface HomepageSetting {
  id: number;
  hero_title: string | null;
  hero_subtitle: string | null;
  cta_text: string | null;
  highlighted_product_ids: number[] | null;
}

export interface ProductImage {
  id: number;
  image_path: string;
  alt_text: string | null;
  order: number;
}

export interface NutritionFact {
  id: number;
  energy_kcal: string | null;
  protein_g: string | null;
  fat_g: string | null;
  carbs_g: string | null;
  sugar_g: string | null;
  sodium_mg: string | null;
}

export interface ProductVariant {
  id: number;
  variant_name: string;
  ingredients: string[] | null;
  net_weight: string | null;
  compliance_notes: string | null;
  nutrition_fact: NutritionFact | null;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  category: string;
  description: string | null;
  advantages: string[] | null;
  is_active: boolean;
  images: ProductImage[];
  variants: ProductVariant[];
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  category: string;
  body: string;
  featured_image: string | null;
  seo_title: string | null;
  seo_description: string | null;
  is_published: boolean;
  published_at: string | null;
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
  order: number;
}

export interface BuyerCategory {
  id: number;
  icon: string;
  label: string;
  order: number;
}

export interface SeoSetting {
  id: number;
  page_key: string;
  seo_title: string | null;
  seo_description: string | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
}

// ── API functions ─────────────────────────────────────────────────────────────

export function getSiteSetting(): Promise<SiteSetting> {
  return apiFetch<SiteSetting>('/site-setting');
}

export function getHomepageSetting(): Promise<HomepageSetting> {
  return apiFetch<HomepageSetting>('/homepage-setting');
}

export function getProducts(params?: { category?: string; page?: number }): Promise<PaginatedResponse<Product>> {
  const q = new URLSearchParams();
  if (params?.category) q.set('category', params.category);
  if (params?.page) q.set('page', String(params.page));
  return apiFetch<PaginatedResponse<Product>>(`/products${q.toString() ? '?' + q : ''}`);
}

export function getProduct(slug: string): Promise<Product> {
  return apiFetch<Product>(`/products/${slug}`);
}

export function getArticles(params?: { page?: number }): Promise<PaginatedResponse<Article>> {
  const q = new URLSearchParams();
  if (params?.page) q.set('page', String(params.page));
  return apiFetch<PaginatedResponse<Article>>(`/articles${q.toString() ? '?' + q : ''}`);
}

export function getArticle(slug: string): Promise<Article> {
  return apiFetch<Article>(`/articles/${slug}`);
}

export function getFaqItems(): Promise<FaqItem[]> {
  return apiFetch<FaqItem[]>('/faq-items');
}

export function getBuyerCategories(): Promise<BuyerCategory[]> {
  return apiFetch<BuyerCategory[]>('/buyer-categories');
}

export function getSeoSetting(pageKey: string): Promise<SeoSetting | null> {
  return apiFetch<SeoSetting>(`/seo-settings/${pageKey}`).catch(() => null);
}

export function submitInquiry(data: {
  name: string;
  email: string;
  company?: string;
  message: string;
  type: string;
}): Promise<{ message: string }> {
  return apiFetch<{ message: string }>('/inquiries', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export interface Testimonial {
  id: number;
  author_name: string;
  company: string | null;
  quote: string;
  rating: number | null;
  photo: string | null;
  is_published: boolean;
}

export interface SocialEmbedSetting {
  id: number;
  platform: string;
  embed_code: string | null;
  link_url: string | null;
  is_active: boolean;
}

export function getTestimonials(): Promise<Testimonial[]> {
  return apiFetch<Testimonial[]>('/testimonials');
}

export function getSocialEmbedSettings(): Promise<SocialEmbedSetting[]> {
  return apiFetch<SocialEmbedSetting[]>('/social-embed-settings');
}

export function imageUrl(path: string | null | undefined): string {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('/')) return path;
  return `${API_BASE}/storage/${path}`;
}

/** Returns the full URL for an asset from /api/public/assets. */
export function assetUrl(filename: string): string {
  return `${API_BASE}/assets/${filename}`;
}
