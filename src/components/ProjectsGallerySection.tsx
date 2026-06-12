import { PROJECT_GALLERY } from "@/lib/content";
import { StickyScrollGallery } from "@/components/ui/sticky-scroll-gallery";

export function ProjectsGallerySection() {
  return (
    <section id="section_projects" className="bg-cream">
      <StickyScrollGallery
        images={PROJECT_GALLERY}
        introTitle="Galeria de projetos"
        introSubtitle="Residenciais e comerciais desenvolvidos em Recife e em atendimento remoto para todo o Brasil. Role para explorar cada ambiente."
      />
    </section>
  );
}
