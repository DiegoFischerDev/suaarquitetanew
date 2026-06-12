import { TestimonialsSeoArchive } from "@/components/TestimonialsSeoArchive";
import { TestimonialSlider } from "@/components/ui/testimonial-slider";
import { TESTIMONIALS } from "@/lib/content";

const testimonials = TESTIMONIALS.map((item) => ({
  image: item.image,
  quote: item.text,
  name: item.name,
  role: item.service,
  rating: 5,
}));

export function TestimonialsSection() {
  return (
    <section
      id="section_seven"
      className="section-pad bg-cream"
      aria-labelledby="heading-testimonials"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
          <h2
            id="heading-testimonials"
            className="heading-display text-3xl font-medium text-ink md:text-5xl"
          >
            O Que Dizem os Clientes
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
            Histórias reais de quem transformou o espaço com a Agni
          </p>
        </div>

        <TestimonialsSeoArchive testimonials={TESTIMONIALS} />
        <TestimonialSlider testimonials={testimonials} autoplay />
      </div>
    </section>
  );
}
