// Shapes returned by the Strapi 5 REST API (attributes are flattened in v5).

export interface StrapiMediaFormat {
  url: string;
  width: number;
  height: number;
}

export interface StrapiMedia {
  id: number;
  documentId?: string;
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
  formats?: {
    thumbnail?: StrapiMediaFormat;
    small?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    large?: StrapiMediaFormat;
  } | null;
}

export interface Category {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description?: string | null;
}

export interface Author {
  id: number;
  documentId: string;
  name: string;
  email?: string | null;
  avatar?: StrapiMedia | null;
}

// A single entry from the article `blocks` dynamic zone.
export interface ArticleBlock {
  __component: string;
  id: number;
  body?: string; // shared.rich-text / shared.quote
  title?: string; // shared.quote
  file?: StrapiMedia | null; // shared.media
  files?: StrapiMedia[] | null; // shared.slider
}

export interface Article {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description?: string | null;
  cover?: StrapiMedia | null;
  author?: Author | null;
  category?: Category | null;
  blocks?: ArticleBlock[] | null;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Stat {
  id: number;
  label?: string | null;
  value?: string | null;
}

export interface CaseStudy {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  subtitle?: string | null;
  coverImage?: StrapiMedia | null;
  stats?: Stat[] | null;
  content?: ArticleBlock[] | null;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Homepage {
  heroEyebrow?: string | null;
  heroTitle?: string | null;
  heroHighlight?: string | null;
  heroSubtitle?: string | null;
  heroCtaPrimary?: string | null;
  heroCtaSecondary?: string | null;
  servicesEyebrow?: string | null;
  servicesTitle?: string | null;
  servicesSubtitle?: string | null;
  workEyebrow?: string | null;
  workTitle?: string | null;
  blogEyebrow?: string | null;
  blogTitle?: string | null;
  ctaTitle?: string | null;
  ctaSubtitle?: string | null;
  ctaButton?: string | null;
}

export interface ContactPage {
  eyebrow?: string | null;
  title?: string | null;
  subtitle?: string | null;
  email?: string | null;
  phone?: string | null;
}

export interface StrapiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface StrapiResponse<T> {
  data: T;
  meta: { pagination?: StrapiPagination };
}
