import { PROJECT_GALLERY } from "@/lib/content";
import { StickyScrollGallery } from "@/components/ui/sticky-scroll-gallery";

export function ProjectsGallerySection() {
  return (
    <section
      id="section_projects"
      className="bg-cream-dark/40"
      aria-labelledby="heading-gallery"
    >
      <StickyScrollGallery
        images={PROJECT_GALLERY}
        introTitle="Galeria de projetos"
        introSubtitle="Residenciais e comerciais desenvolvidos em Recife e em atendimento remoto para todo o Brasil."
      />
    </section>
  );
}
