import { EditorialStatementImageRotator } from "@/components/EditorialStatementImageRotator";
import { EDITORIAL_STATEMENT, EDITORIAL_STATEMENT_IMAGES } from "@/lib/content";

export function EditorialStatementSection() {
  return (
    <section
      id="section_editorial"
      className="relative overflow-hidden bg-ink text-cream"
      aria-label="Manifesto da Agni Garcia"
    >
      <div className="absolute inset-0 lg:hidden" aria-hidden>
        <EditorialStatementImageRotator
          images={EDITORIAL_STATEMENT_IMAGES}
          sizes="100vw"
          decorative
        />
        <div className="absolute inset-0 bg-ink/68" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/52 via-ink/32 to-ink/62" />
      </div>

      <div className="relative grid lg:min-h-[min(72vh,640px)] lg:grid-cols-2">
        <div className="relative z-10 flex min-h-[min(68vh,560px)] flex-col justify-center px-5 py-20 md:px-10 lg:min-h-0 lg:px-16 lg:py-28">
          <blockquote className="heading-display max-w-xl text-[clamp(1.65rem,4.2vw,2.85rem)] font-light leading-snug tracking-wide [text-shadow:0_2px_24px_rgba(26,24,20,0.45)]">
            &ldquo;{EDITORIAL_STATEMENT.quote}&rdquo;
          </blockquote>
          <footer className="mt-8 border-t border-cream/15 pt-6">
            <p className="text-lg font-medium">{EDITORIAL_STATEMENT.attribution}</p>
            <p className="mt-1 text-xs font-medium uppercase tracking-[0.24em] text-cream/65">
              {EDITORIAL_STATEMENT.role}
            </p>
          </footer>
        </div>

        <div className="relative hidden min-h-0 lg:block">
          <EditorialStatementImageRotator
            images={EDITORIAL_STATEMENT_IMAGES}
            sizes="50vw"
            priority
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink via-ink/35 to-transparent" />
        </div>
      </div>
    </section>
  );
}
