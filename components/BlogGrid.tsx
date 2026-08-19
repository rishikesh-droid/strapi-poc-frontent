import BlogCard from "./BlogCard";
import Reveal from "./Reveal";
import type { Article } from "@/lib/types";

export default function BlogGrid({ articles }: { articles: Article[] }) {
  if (!articles.length) {
    return (
      <div className="rounded-2xl border border-dashed border-line py-20 text-center text-muted">
        No articles published yet. Create one in the Strapi admin and it will appear here.
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article, i) => (
        <Reveal key={article.id} delay={i * 80}>
          <BlogCard article={article} />
        </Reveal>
      ))}
    </div>
  );
}
