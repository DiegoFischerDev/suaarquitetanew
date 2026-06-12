import { EditorialStatementSection } from "@/components/EditorialStatementSection";
import { HomeShell } from "@/components/HomeShell";
import { Navigation } from "@/components/Navigation";
import { PresentationSection } from "@/components/PresentationSection";
import { ScrollVideoHero } from "@/components/ScrollVideoHero";
import { SeoHeroText } from "@/components/SeoHeroText";
import dynamic from "next/dynamic";

const PricingSection = dynamic(() =>
  import("@/components/PricingSection").then((mod) => ({
    default: mod.PricingSection,
  })),
);

const TestimonialsSection = dynamic(() =>
  import("@/components/TestimonialsSection").then((mod) => ({
    default: mod.TestimonialsSection,
  })),
);

const ProjectsGallerySection = dynamic(() =>
  import("@/components/ProjectsGallerySection").then((mod) => ({
    default: mod.ProjectsGallerySection,
  })),
);

const FaqSection = dynamic(() =>
  import("@/components/FaqSection").then((mod) => ({
    default: mod.FaqSection,
  })),
);

const Footer = dynamic(() =>
  import("@/components/Footer").then((mod) => ({
    default: mod.Footer,
  })),
);

export default function HomePage() {
  return (
    <HomeShell>
      <Navigation />
      <main id="main-content">
        <ScrollVideoHero />
        <SeoHeroText />
        <PresentationSection />
        <EditorialStatementSection />
        <div className="below-fold-section">
          <PricingSection />
        </div>
        <div className="below-fold-section">
          <TestimonialsSection />
        </div>
        <div className="below-fold-section">
          <ProjectsGallerySection />
        </div>
        <div className="below-fold-section">
          <FaqSection />
        </div>
      </main>
      <div className="below-fold-section">
        <Footer />
      </div>
    </HomeShell>
  );
}
