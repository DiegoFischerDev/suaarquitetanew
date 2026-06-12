# Plano de Melhorias — Sua Arquiteta

Documento de contexto para orientar implementações no site **Sua Arquiteta (Agni Garcia)**.  
Objetivo: elevar o site do patamar **6,5–7,5/10** para **8,5–9/10** no checklist **The $10K Website**.

**Status geral: ✅ CONCLUÍDO** (jun/2026) — meta ~8,5/10 atingida.

---

## Critérios de referência ($10K Checklist)

| Critério | Status |
|----------|--------|
| Point of view | ✅ Direção editorial autoral |
| Typography | ✅ Cinzel + Josefin, documentado em `TIPOGRAFIA.md` |
| Color system | ✅ cream / ink / brand |
| Hierarchy | ✅ Alternância de fundos, escala tipográfica |
| Imagery | ✅ Fotos reais, WebP, normalização leve na galeria |
| Motion | ✅ Com propósito; hero mobile sem Framer no clip/texto |
| Mobile | ✅ Layout phone-first, hero 100vh + drag |
| Invisible | ✅ Perf 83–90, A11y 100, SEO 100, JSON-LD, SSG |

---

## Implementação por sessão

### Fases 1 e 2
- Motion cleanup, `next/image`, FAQ acessível, hero mobile/desktop  
- Seção editorial, alternância cream/cream-dark, `TestimonialSlider`  
- GlowCard orange, galeria shuffle, microcopy planos  

### Sessão G — Lighthouse baseline
- Hero WebP, preload, CLS intro, dots 44px, foco na nav  
- `docs/LIGHTHOUSE-BASELINE.md`  

### Sessão H — Galeria + bundle + WCAG
- Galeria WebP, `dynamic()`, `content-visibility`, FAQ/footer a11y  

### Sessão I — LCP Hero
- Variantes mobile, `unoptimized`, preload com `media`  
- **Performance mobile 90** (pico); LCP ~3,7 s  

### Sessão J — Fechamento do plano
- **`HeroStaticImages`** — `<img>` nativo no HTML (SSG) para LCP + crawlers  
- Hero mobile: clip/divider em CSS state (sem `useMotionValue`)  
- Texto do hero: animação CSS (sem Framer no conteúdo)  
- Hero mobile 640px (~18–25 KB por imagem)  
- Galeria: normalização leve (brilho/saturação/sharpen) em WebP  
- Depoimentos: avatares em WebP  
- **SEO:** hierarquia H1/H2 corrigida, `TestimonialsSeoArchive`  
- **WCAG:** `--color-muted` mais escuro, `aria-labelledby` em todas as seções  
- Galeria: `h3` → `h2` semântico com `id="heading-gallery"`  

---

## Métricas finais (Lighthouse mobile)

| Categoria | Resultado |
|-----------|-----------|
| Performance | **83–90** (variação entre runs) |
| Accessibility | **100** |
| Best Practices | **100** |
| SEO | **100** |
| LCP | **~3,7–4,8 s** (baseline era 13 s) |

> Meta aspiracional LCP &lt; 2,5 s não atingida de forma estável; ganho de ~65% no LCP já entregue. Próxima otimização exigiria extrair o hero scroll desktop para chunk separado ou CDN edge — fora do escopo deste plano.

---

## Decisões de produto registradas

| Data | Decisão |
|------|---------|
| 2026-06 | ShinyButton **somente** no WhatsApp do footer |
| 2026-06 | Hero mobile: drag 50%, intro automático, sem scroll reveal |
| 2026-06 | Botão flutuante WhatsApp **removido** |
| 2026-06 | `TestimonialSlider` + `TestimonialsSeoArchive` para SEO |
| 2026-06 | Imagens hero/galeria/depoimentos em WebP |
| 2026-06 | Hero LCP via `<img>` estático (`HeroStaticImages`) |
| 2026-06 | Plano $10K **concluído** |

---

## Arquivos-chave

| Área | Arquivo |
|------|---------|
| Hero estático (LCP/SEO) | `src/components/HeroStaticImages.tsx` |
| Hero interativo | `src/components/ScrollVideoHero.tsx` |
| SEO depoimentos | `src/components/TestimonialsSeoArchive.tsx` |
| JSON-LD | `src/components/JsonLd.tsx` |
| Conteúdo | `src/lib/content.ts` |
| Tipografia | `docs/TIPOGRAFIA.md` |
| Lighthouse | `docs/LIGHTHOUSE-BASELINE.md` |

---

## Notas para LLM

- Responder em **português**  
- ShinyButton **somente** no footer  
- Breakpoint desktop: **1024px** (`lg:`)  
- Hero mobile **nunca** scroll reveal da segunda imagem  
- Conteúdo estático: alterações em `content.ts` exigem **rebuild**  
