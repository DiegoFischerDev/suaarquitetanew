import { FaqSection } from "@/components/FaqSection";
import { Footer } from "@/components/Footer";
import { HomeShell } from "@/components/HomeShell";
import { Navigation } from "@/components/Navigation";
import { PresentationSection } from "@/components/PresentationSection";
import { ProjectsGallerySection } from "@/components/ProjectsGallerySection";
import { PricingSection } from "@/components/PricingSection";
import { ScrollVideoHero } from "@/components/ScrollVideoHero";
import { SeoHeroText } from "@/components/SeoHeroText";
import { TestimonialsSection } from "@/components/TestimonialsSection";

export default function HomePage() {
  return (
    <HomeShell>
      <Navigation />
      <main id="main-content">
        <ScrollVideoHero />
        <SeoHeroText />
        <PresentationSection />
        <PricingSection />
        <TestimonialsSection />
        <ProjectsGallerySection />
        <FaqSection />
      </main>
      <Footer />
    </HomeShell>
  );
}
