interface TestimonialEntry {
  name: string;
  service: string;
  text: string;
}

interface TestimonialsSeoArchiveProps {
  testimonials: readonly TestimonialEntry[];
}

export function TestimonialsSeoArchive({
  testimonials,
}: TestimonialsSeoArchiveProps) {
  return (
    <aside className="sr-only" aria-label="Todos os depoimentos dos clientes">
      <ul>
        {testimonials.map((item) => (
          <li key={item.name}>
            <article>
              <blockquote cite={`#depoimento-${item.name.toLowerCase().replace(/\s+/g, "-")}`}>
                <p>{item.text}</p>
              </blockquote>
              <footer>
                <cite>{item.name}</cite>
                <span> — {item.service}</span>
              </footer>
            </article>
          </li>
        ))}
      </ul>
    </aside>
  );
}
