import type {
  Article,
  CaseStudy,
  StrapiMedia,
  StrapiPagination,
  StrapiResponse,
} from "./types";

// Server-side base URL. Configurable via env — never hardcode localhost in components.
const STRAPI_URL =
  process.env.STRAPI_URL ??
  process.env.NEXT_PUBLIC_STRAPI_URL ??
  "http://localhost:1337";

// How long (seconds) a fetched Strapi response is served from Next's Data
// Cache before being revalidated in the background. Pages then render from
// cache — instant, like the static pages — instead of doing a live round-trip
// on every visit. A published edit in Strapi appears within this window.
const REVALIDATE_SECONDS = 60;

/**
 * Low-level fetch against the Strapi REST API.
 * Uses time-based ISR: responses are edge/data-cached for REVALIDATE_SECONDS,
 * so blog/work pages load instantly and only refresh from Strapi periodically.
 */
async function strapiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${STRAPI_URL}/api${path}`, {
    next: { revalidate: REVALIDATE_SECONDS },
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error(`Strapi request failed (${res.status}): ${path}`);
  }

  return res.json() as Promise<T>;
}

/** Turn a relative Strapi media path into an absolute, browser-usable URL. */
export function mediaUrl(media?: StrapiMedia | null): string | null {
  if (!media?.url) return null;
  if (media.url.startsWith("http")) return media.url;
  const base = process.env.NEXT_PUBLIC_STRAPI_URL ?? STRAPI_URL;
  return `${base}${media.url}`;
}

// Fields we ever want for a card / list view — keeps payloads small.
const LIST_QUERY =
  "fields[0]=title&fields[1]=slug&fields[2]=description&fields[3]=publishedAt" +
  "&populate[cover][fields][0]=url&populate[cover][fields][1]=alternativeText" +
  "&populate[cover][fields][2]=formats" +
  "&populate[category][fields][0]=name&populate[category][fields][1]=slug";

/** Latest N published articles — used by the homepage preview. */
export async function getLatestArticles(limit = 3): Promise<Article[]> {
  try {
    const res = await strapiFetch<StrapiResponse<Article[]>>(
      `/articles?${LIST_QUERY}&sort=publishedAt:desc&pagination[pageSize]=${limit}&pagination[page]=1`,
    );
    return res.data ?? [];
  } catch {
    // Don't fail the build if Strapi is momentarily unreachable (e.g. Render
    // free tier waking up). The page revalidates and refills on next request.
    return [];
  }
}

/** Paginated list of published articles — used by /blog. */
export async function getArticles(
  page = 1,
  pageSize = 10,
): Promise<{ articles: Article[]; pagination?: StrapiPagination }> {
  const res = await strapiFetch<StrapiResponse<Article[]>>(
    `/articles?${LIST_QUERY}&sort=publishedAt:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
  );
  return { articles: res.data ?? [], pagination: res.meta?.pagination };
}

/**
 * A single article by slug, with everything needed to render the full page.
 * Fetches ONLY the requested article (filter + pageSize 1), never the whole set.
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const query =
    `/articles?filters[slug][$eq]=${encodeURIComponent(slug)}` +
    "&pagination[pageSize]=1" +
    "&populate[cover]=true" +
    "&populate[category]=true" +
    "&populate[author][populate][avatar]=true" +
    "&populate[blocks][populate]=*";

  const res = await strapiFetch<StrapiResponse<Article[]>>(query);
  return res.data?.[0] ?? null;
}

/** Slugs of other recent articles for the "related" section. */
export async function getRelatedArticles(
  excludeSlug: string,
  limit = 3,
): Promise<Article[]> {
  const res = await strapiFetch<StrapiResponse<Article[]>>(
    `/articles?${LIST_QUERY}` +
      `&filters[slug][$ne]=${encodeURIComponent(excludeSlug)}` +
      `&sort=publishedAt:desc&pagination[pageSize]=${limit}`,
  );
  return res.data ?? [];
}

// ---------------------------------------------------------------------------
// Case studies (the /work section)
// ---------------------------------------------------------------------------

// Lightweight fields for the /work card grid — no heavy content blocks.
const CASE_STUDY_LIST_QUERY =
  "fields[0]=title&fields[1]=slug&fields[2]=subtitle&fields[3]=publishedAt" +
  "&populate[coverImage][fields][0]=url&populate[coverImage][fields][1]=alternativeText" +
  "&populate[coverImage][fields][2]=formats" +
  "&populate[stats]=true";

/** All published case studies for the /work listing. */
export async function getCaseStudies(): Promise<CaseStudy[]> {
  try {
    const res = await strapiFetch<StrapiResponse<CaseStudy[]>>(
      `/case-studies?${CASE_STUDY_LIST_QUERY}&sort=publishedAt:desc&pagination[pageSize]=50`,
    );
    return res.data ?? [];
  } catch {
    // Don't fail the build if Strapi is momentarily unreachable.
    return [];
  }
}

/** A single case study by slug, with every field and image populated. */
export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  const res = await strapiFetch<StrapiResponse<CaseStudy[]>>(
    `/case-studies?filters[slug][$eq]=${encodeURIComponent(slug)}` +
      "&pagination[pageSize]=1" +
      "&populate[coverImage]=true" +
      "&populate[stats]=true" +
      "&populate[content][populate]=*",
  );
  return res.data?.[0] ?? null;
}

/** Other case studies for the "more work" section. */
export async function getRelatedCaseStudies(
  excludeSlug: string,
  limit = 2,
): Promise<CaseStudy[]> {
  const res = await strapiFetch<StrapiResponse<CaseStudy[]>>(
    `/case-studies?${CASE_STUDY_LIST_QUERY}` +
      `&filters[slug][$ne]=${encodeURIComponent(excludeSlug)}` +
      `&sort=publishedAt:desc&pagination[pageSize]=${limit}`,
  );
  return res.data ?? [];
}
