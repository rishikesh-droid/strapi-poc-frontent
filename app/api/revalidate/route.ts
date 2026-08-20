import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { TAGS } from "@/lib/strapi";

export const dynamic = "force-dynamic";

// Map a Strapi content-type (webhook `model`) to the cache tag(s) to purge.
const MODEL_TAGS: Record<string, string[]> = {
  article: [TAGS.articles],
  category: [TAGS.articles],
  author: [TAGS.articles],
  "case-study": [TAGS.caseStudies],
  homepage: [TAGS.homepage],
  "contact-page": [TAGS.contactPage],
};

/**
 * On-demand revalidation endpoint. Strapi calls this via a webhook on
 * publish/update, so the affected page refreshes within ~1-2s instead of
 * waiting for the time-based cache to expire.
 *
 * Configure a Strapi webhook →  POST  /api/revalidate?secret=<REVALIDATE_SECRET>
 */
export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, message: "Invalid secret" }, { status: 401 });
  }

  let model = "";
  try {
    const body = await request.json();
    model = typeof body?.model === "string" ? body.model : "";
  } catch {
    // no/invalid body → fall through to revalidating everything
  }

  // Unknown/absent model → purge all tags to be safe.
  const tags = MODEL_TAGS[model] ?? Object.values(TAGS);
  // `{ expire: 0 }` expires the tag immediately so the next request fetches
  // fresh data (change visible on the first refresh, no stale serve).
  for (const tag of tags) revalidateTag(tag, { expire: 0 });

  return NextResponse.json({ ok: true, model: model || "(all)", revalidated: tags });
}
