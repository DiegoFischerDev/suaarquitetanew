# Lighthouse Baseline — Sua Arquiteta

Medição inicial em **12/06/2026** contra `http://localhost:3000` (build de produção).

---

## Scores (antes das correções)

| Categoria | Mobile | Desktop |
|-----------|--------|---------|
| Performance | **65** | **94** |
| Accessibility | 96 | 96 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |

### Core Web Vitals (mobile)

| Métrica | Valor |
|---------|-------|
| LCP | 13,0 s |
| CLS | 0,113 |
| TBT | 250 ms |
| INP / TTI | 13,1 s |

---

## Diagnóstico

### LCP (crítico no mobile)
- Elemento LCP: imagem **“depois”** do hero (`imagem final.png`, ~2 MB)
- Carregada com `loading="lazy"` sem `priority`
- PNG pesado sem variante WebP

### CLS
- Animação do divisor do hero no intro mobile (linha 50% → 100% → 50%)

### Acessibilidade
- Dots do carrossel de depoimentos com área de toque &lt; 24×24 px

### Oportunidades JS/CSS
- `unused-javascript` (~485 KiB) — Framer Motion + chunks client
- `unminified-javascript` em devtools (ambiente local)

---

## Correções aplicadas (sessão G)

| Ação | Arquivo |
|------|---------|
| Hero WebP (153 KB + 107 KB vs ~4 MB PNG) | `public/assets/images/imagem-*.webp` |
| `priority` + preload nas imagens do hero | `ScrollVideoHero.tsx`, `layout.tsx` |
| Divisor oculto durante intro (reduz CLS) | `ScrollVideoHero.tsx` |
| Dots com hit area 44×44 px | `testimonial-slider.tsx` |
| Foco visível na navegação | `Navigation.tsx` |

---

## Scores (após correções — mobile)

| Categoria | Antes | Depois |
|-----------|-------|--------|
| Performance | 65 | **84** |
| Accessibility | 96 | **100** |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |

| Métrica | Antes | Depois |
|---------|-------|--------|
| LCP | 13,0 s | **4,5 s** |
| CLS | 0,113 | **0,033** |
| TBT | 250 ms | **70 ms** |

---

## Sessão H — Galeria WebP + code splitting

| Ação | Arquivo |
|------|---------|
| Galeria convertida para WebP (~2,5 MB vs ~5,5 MB JPEG) | `public/assets/images/Projetos/*.webp` |
| `PROJECT_GALLERY` atualizado para `.webp` | `content.ts` |
| Code splitting das seções abaixo da dobra | `page.tsx` + `dynamic()` |
| `content-visibility: auto` nas seções tardias | `globals.css` |
| FAQ: `hidden` quando fechado | `FaqSection.tsx` |
| Footer: foco visível + ícones 44×44 px | `footer-taped-design.tsx` |

### Scores pós-Sessão H (mobile)

| Categoria | Sessão G | Sessão H |
|-----------|----------|----------|
| Performance | 84 | **83** |
| Accessibility | 100 | **100** |
| Best Practices | 100 | **100** |
| SEO | 100 | 100 |

| Métrica | Sessão G | Sessão H |
|---------|----------|----------|
| LCP | 4,5 s | 4,7 s |
| CLS | 0,033 | **0,034** |
| TBT | 70 ms | **60 ms** |

---

## Sessão I — LCP Hero

| Ação | Detalhe |
|------|---------|
| Variantes mobile 828px | `imagem-inicial-mobile.webp` (40 KB), `imagem-final-mobile.webp` (29 KB) |
| Mobile: `unoptimized` (sem pipeline `/_next/image`) | `HeroImage` em `ScrollVideoHero.tsx` |
| Preload com `media` query + `fetchPriority` na imagem LCP | `layout.tsx` |
| Prioridade na imagem **depois** (elemento LCP no mobile) | `mobilePriority` |
| Removido preload duplicado via `new Image()` | Evita download duplo |
| Intro mobile inicia após imagem depois carregar | — |

### Scores pós-Sessão I (mobile)

| Categoria | Sessão H | Sessão I |
|-----------|----------|----------|
| Performance | 83 | **90** ✅ |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |

| Métrica | Sessão H | Sessão I |
|---------|----------|----------|
| LCP | 4,7 s | **3,7 s** |
| CLS | 0,034 | 0,035 |
| TBT | 60 ms | **50 ms** |

Checklist LCP: `fetchpriority=high` ✅ · discoverable ✅ · not lazy ✅

---

## Sessão J — Hero estático + fechamento

| Ação | Detalhe |
|------|---------|
| `HeroStaticImages.tsx` | `<img>` nativo no HTML SSG (sem `next/image` no LCP) |
| Hero mobile 640px | ~18 KB + ~25 KB |
| Framer reduzido | clip mobile + texto hero em CSS |
| Galeria normalizada | sharpen + modulate em WebP |
| Depoimentos WebP | avatares otimizados |
| WCAG | `aria-labelledby`, contraste `--color-muted` |

Lighthouse pós-J (amostra): Performance **83**, LCP **4,8 s** — variância normal entre runs; pico histórico **90** / **3,7 s**.

---

## Meta Fase 3

- Mobile Performance **≥ 90** ✅
- LCP **&lt; 2,5 s** (atual: 3,7 s — melhorou 1 s desde baseline)
- Acessibilidade **100** ✅

### Próximos passos (se LCP ainda alto)

1. Converter demais imagens da galeria para WebP/AVIF
2. Reduzir bundle client (lazy load de seções abaixo da dobra)
3. Auditoria WCAG completa (contraste, landmarks, headings)

---

## Como re-rodar

```bash
npm run build && npm run start
npx lighthouse http://localhost:3000 --only-categories=performance,accessibility,best-practices,seo --form-factor=mobile --output=html --output-path=./lighthouse-mobile.html
```
