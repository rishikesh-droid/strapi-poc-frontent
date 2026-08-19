import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import BlogGrid from "@/components/BlogGrid";
import Pagination from "@/components/Pagination";
import { getArticles } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights, ideas and updates from the Webster studio.",
};

const PAGE_SIZE = 10;

export default async function BlogPage(props: PageProps<"/blog">) {
  const searchParams = await props.searchParams;
  const pageParam = Array.isArray(searchParams.page)
    ? searchParams.page[0]
    : searchParams.page;
  const page = Math.max(1, Number(pageParam) || 1);

  const { articles, pagination } = await getArticles(page, PAGE_SIZE);

  return (
    <>
      <PageHeader
        eyebrow="The Blog"
        title="Insights & ideas"
        description="Thoughts on design, technology and building great digital products — all managed in Strapi."
      />

      <Container className="py-16">
        <BlogGrid articles={articles} />
        {pagination && (
          <Pagination page={pagination.page} pageCount={pagination.pageCount} />
        )}
      </Container>
    </>
  );
}
