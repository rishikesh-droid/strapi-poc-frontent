import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import ImageSlider from "@/components/ImageSlider";
import BlogPreview from "@/components/BlogPreview";
import CTASection from "@/components/CTASection";
import { getHomepage } from "@/lib/strapi";

export default async function Home() {
  // Editable text from the Strapi "Homepage" single type.
  // Every component falls back to sensible defaults if a field is empty.
  const home = await getHomepage();

  return (
    <>
      <Hero content={home} />
      <ServicesSection
        eyebrow={home?.servicesEyebrow || undefined}
        title={home?.servicesTitle || undefined}
        subtitle={home?.servicesSubtitle || undefined}
      />
      <ImageSlider
        eyebrow={home?.workEyebrow || undefined}
        title={home?.workTitle || undefined}
      />
      {/* Server component — fetches the latest articles from Strapi */}
      <BlogPreview
        eyebrow={home?.blogEyebrow || undefined}
        title={home?.blogTitle || undefined}
      />
      <CTASection
        title={home?.ctaTitle || undefined}
        subtitle={home?.ctaSubtitle || undefined}
        button={home?.ctaButton || undefined}
      />
    </>
  );
}
