import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import BlogArticle from "@/components/BlogArticle";
import BlogGrid from "@/components/BlogGrid";
import { getArticleBySlug, getRelatedArticles } from "@/lib/strapi";

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Article not found" };

  return {
    title: article.title,
    description: article.description ?? undefined,
  };
}

export default async function ArticlePage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const article = await getArticleBySlug(slug);

  // Any slug that doesn't match a published article → 404.
  // No per-article page ever needs to be created: this one template
  // renders every article managed in Strapi.
  if (!article) notFound();

  const related = await getRelatedArticles(slug, 3);

  return (
    <div className="pb-8">
      <BlogArticle article={article} />

      {related.length > 0 && (
        <Container className="mt-24">
          <div className="border-t border-line pt-16">
            <h2 className="text-2xl font-semibold tracking-tight text-ink">
              Related articles
            </h2>
            <div className="mt-8">
              <BlogGrid articles={related} />
            </div>
          </div>
        </Container>
      )}
    </div>
  );
}
