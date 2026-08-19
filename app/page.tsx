import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import ImageSlider from "@/components/ImageSlider";
import BlogPreview from "@/components/BlogPreview";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <ImageSlider />
      {/* Server component — fetches the latest articles from Strapi */}
      <BlogPreview />
      <CTASection />
    </>
  );
}
