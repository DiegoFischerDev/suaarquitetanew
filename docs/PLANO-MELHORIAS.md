# Plano de Melhorias — Sua Arquiteta

Documento de contexto para orientar implementações no site **Sua Arquiteta (Agni Garcia)**.  
Objetivo: elevar o site do patamar **6,5–7,5/10** para **8,5–9/10** no checklist **The $10K Website**.

---

## Critérios de referência ($10K Checklist)

1. **Point of view** — direção de design autoral, não template genérico  
2. **Typography** — par display + body, hierarquia clara, sem Inter/Roboto  
3. **Color system** — 3–5 cores, uso consistente, restrição  
4. **Hierarchy** — whitespace, escala, contraste; primário/secundário/terciário  
5. **Imagery** — fotos reais/curadas, não stock genérico  
6. **Motion** — micro-interações com propósito, não fade-up em tudo  
7. **Mobile** — layout pensado para phone, não desktop comprimido  
8. **Invisible** — performance, WCAG AA, SEO, HTML semântico  

---

## Status de implementação

### ✅ Concluído

#### ShinyButton — uso restrito ao footer
- **Removido** efeito shine do WhatsApp no menu (`Navigation.tsx`) → `btn-primary`  
- **Removido** efeito shine do CTA "Saiba mais" no card Interiores (`pricing-section-2.tsx`) → botão cream estático  
- **Mantido** apenas no botão WhatsApp do footer (`footer-taped-design.tsx`)  

#### Hero — comportamento mobile vs desktop
- **Mobile (< 1024px):**
  - Altura da seção: `100vh` (scroll padrão da página)  
  - Sem revelação atrelada ao scroll  
  - Linha de comparação inicia no **centro (50% / 50%)**  
  - Usuário **arrasta a linha** horizontalmente (pointer events no handle)  
  - Scroll vertical da página funciona normalmente  
  - Chevron de "role para revelar" oculto no mobile  
- **Desktop (≥ 1024px):**
  - Mantém altura `290vh` + revelação via scroll  
  - Comportamento original preservado  
- **Arquivo:** `src/components/ScrollVideoHero.tsx`  
- **Breakpoint:** `1024px` (alinhado à galeria e demais componentes)  

---

## Fase 1 — Quick wins (pendente)

### Motion — reduzir fade-up genérico
| Ação | Arquivo(s) | Prioridade |
|------|------------|------------|
| Remover `Reveal` de cada item do FAQ | `FaqSection.tsx` | Alta |
| Remover `Reveal` redundante em serviços/depoimentos | `PresentationSection.tsx`, `TestimonialsSection.tsx` | Alta |
| Manter motion protagonista só em: hero, bio Agni, título planos, galeria | vários | Alta |
| Remover `lenis` do `package.json` se não for integrar | `package.json` | Média |

### Performance e polish técnico
| Ação | Arquivo(s) | Prioridade |
|------|------------|------------|
| Trocar `<img>` por `next/image` na galeria | `sticky-scroll-gallery.tsx` | Alta |
| `sizes` corretos em imagens abaixo da dobra | galeria, depoimentos | Alta |
| FAQ: `id` + `aria-controls` + `aria-labelledby` | `FaqSection.tsx` | Alta |
| Baseline Lighthouse mobile + desktop | — | Alta |
| `priority` apenas na imagem LCP real do hero | `ScrollVideoHero.tsx` | Média |
| Adiar GA/Ads (`lazyOnload`) se aceitável | `layout.tsx` | Média |

### Mobile — refinamentos
| Ação | Arquivo(s) | Prioridade |
|------|------------|------------|
| Card Interiores (featured) primeiro no mobile | `pricing-section-2.tsx` | Média |
| Validar logo watermark mobile na apresentação em telas < 360px | `PresentationSection.tsx` | Baixa |
| Indicador sutil no slider da galeria mobile | `image-auto-slider.tsx` | Baixa |

### POV — toques autorais
| Ação | Arquivo(s) | Prioridade |
|------|------------|------------|
| Variar padrão eyebrow+H2 em 1 seção (depoimentos ou FAQ) | seção alvo | Média |
| Microcopy mais pessoal da Agni em CTAs | `content.ts` | Média |

---

## Fase 2 — Craft médio (pendente)

### Serviços (`GlowCard`)
- Trocar `glowColor="orange"` por tom alinhado à paleta cream/ink  
- Ou substituir por cards editoriais simples (borda ink, hover sutil)  
- **Arquivo:** `ServicesSpecialtiesGrid.tsx`, `spotlight-card.tsx`

### Depoimentos
- Avaliar se `CircularTestimonials` combina com tom editorial  
- Alternativa: layout revista — citação grande, foto pequena, um depoimento por vez  
- **Arquivo:** `TestimonialsSection.tsx`, `circular-testimonials.tsx`

### Motion — regra por seção
| Seção | Manter | Remover |
|-------|--------|---------|
| Hero | scroll reveal (desktop) / drag (mobile) | — |
| Apresentação | bio stagger (`PresentationBio.tsx`) | Reveal no título |
| Planos | `VerticalCutReveal` + timeline cards | — |
| Depoimentos | transição carrossel | Reveal wrapper |
| Galeria | slider mobile / sticky desktop | hover scale excessivo |
| FAQ | accordion | Reveal por item |

### Hierarquia visual
- Criar **1 seção editorial de ruptura** (frase grande + foto, full-bleed) entre apresentação e planos  
- Reforçar alternância de fundos entre “capítulos” (`cream` / `cream-dark`)

---

## Fase 3 — Investimento premium (pendente)

### Imagens
- Retoque consistente (exposição, temperatura) em toda a galeria  
- Hero: assets otimizados por breakpoint (WebP/AVIF)  
- OG image dedicada (não reutilizar `bg_section_one.jpg`)

### Performance e acessibilidade
- **Meta:** Lighthouse mobile ≥ 90, LCP < 2,5s  
- Lazy load abaixo da dobra  
- Auditoria WCAG AA completa (axe / Lighthouse a11y)  
- Foco visível em todos os interativos  
- Contraste do `text-muted` em todos os fundos  

### SEO
- JSON-LD já implementado (`JsonLd.tsx`)  
- Considerar `BreadcrumbList` e `WebSite`  
- Revisar `description` e títulos por seção  

### Tipografia
- Documentar escala tipográfica (H1 hero → caption)  
- Um momento de assinatura (peso 300 ou itálico na display)  

---

## Decisões de produto registradas

| Data | Decisão |
|------|---------|
| 2026-06 | ShinyButton **somente** no WhatsApp do footer |
| 2026-06 | Hero mobile: drag manual 50%, scroll padrão; desktop: scroll reveal |
| 2026-06 | Botão flutuante WhatsApp **removido** (footer + nav cobrem contato) |

---

## Arquivos-chave do projeto

| Área | Arquivo |
|------|---------|
| Hero | `src/components/ScrollVideoHero.tsx` |
| Nav | `src/components/Navigation.tsx` |
| Apresentação | `src/components/PresentationSection.tsx` |
| Planos | `src/components/ui/pricing-section-2.tsx` |
| Footer | `src/components/ui/footer-taped-design.tsx` |
| ShinyButton | `src/components/ui/shiny-button.tsx` |
| Conteúdo | `src/lib/content.ts` |
| Design tokens | `src/app/globals.css` |
| SEO | `src/app/layout.tsx`, `src/components/JsonLd.tsx` |

---

## KPIs alvo

| Métrica | Atual (est.) | Meta |
|---------|--------------|------|
| Lighthouse Performance mobile | ~70–85 | ≥ 90 |
| LCP mobile | > 2,5s provável | < 2,0s |
| Motion (critério 06) | 6,5/10 | ≥ 8/10 |
| Mobile (critério 07) | 7,5/10 | ≥ 8,5/10 |
| POV (critério 01) | 7/10 | ≥ 8,5/10 |

---

## Ordem recomendada para próximas sessões

1. **Sessão B** — Motion cleanup (remover `Reveal` redundante)  
2. **Sessão C** — `next/image` na galeria + Lighthouse  
3. **Sessão D** — Glow cards na paleta da marca  
4. **Sessão E** — FAQ acessível + card Interiores primeiro no mobile  
5. **Sessão F** — Seção editorial ou redesign depoimentos  

---

## Notas para LLM

- Responder em **português**  
- Preferir diffs mínimos e convenções existentes do projeto  
- Não reintroduzir `ShinyButton` fora do footer sem pedido explícito  
- Breakpoint desktop padrão do projeto: **1024px** (`lg:`)  
- Paleta: cream, ink, brand — sem arco-íris  
- `Reveal` (fade-up) é considerado "slop" — usar com parcimônia  
- Hero mobile **nunca** deve voltar a usar scroll para revelar a segunda imagem  
