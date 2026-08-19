import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import CaseStudy from "@/components/CaseStudy";
import WorkGrid from "@/components/WorkGrid";
import { getCaseStudyBySlug, getRelatedCaseStudies } from "@/lib/strapi";

export async function generateMetadata(
  props: PageProps<"/work/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const caseStudy = await getCaseStudyBySlug(slug);
  if (!caseStudy) return { title: "Case study not found" };

  return {
    title: caseStudy.title,
    description: caseStudy.subtitle ?? undefined,
  };
}

export default async function CaseStudyPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const caseStudy = await getCaseStudyBySlug(slug);

  // One template renders every case study. A new entry in Strapi is instantly
  // available at /work/<its-slug> — no new page/component needed.
  if (!caseStudy) notFound();

  const related = await getRelatedCaseStudies(slug, 2);

  return (
    <div className="pb-8">
      <CaseStudy caseStudy={caseStudy} />

      {related.length > 0 && (
        <Container className="mt-24">
          <div className="border-t border-line pt-16">
            <h2 className="text-2xl font-semibold tracking-tight text-ink">
              More work
            </h2>
            <div className="mt-8">
              <WorkGrid caseStudies={related} />
            </div>
          </div>
        </Container>
      )}
    </div>
  );
}
