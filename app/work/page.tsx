import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import WorkGrid from "@/components/WorkGrid";
import CTASection from "@/components/CTASection";
import { getCaseStudies } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected case studies from the Webster studio.",
};

export default async function WorkPage() {
  const caseStudies = await getCaseStudies();

  return (
    <>
      <PageHeader
        eyebrow="Our Work"
        title="Case studies"
        description="A selection of projects we've shaped end to end — each one managed as a case study in Strapi."
      />

      <Container className="py-16">
        <WorkGrid caseStudies={caseStudies} />
      </Container>

      <CTASection />
    </>
  );
}
