# Tipografia — Sua Arquiteta

Escala tipográfica e regras de uso do par **Cinzel + Josefin Sans**.

---

## Par tipográfico

| Papel | Fonte | Token CSS | Uso |
|-------|-------|-----------|-----|
| Display | Cinzel | `--font-display` / `.heading-display` | Títulos, hero, frases editoriais |
| Body | Josefin Sans | `--font-body` | Parágrafos, labels, UI, navegação |

**Não usar:** Inter, Roboto, system-ui como display.

---

## Escala (mobile → desktop)

| Elemento | Mobile | Desktop | Peso | Classe / padrão |
|----------|--------|---------|------|-----------------|
| Hero título | `text-3xl` | `text-5xl` / `text-6xl` | 500 | `.heading-display` |
| H2 seção | `text-3xl` | `text-5xl` | 500 | `.heading-display` |
| Editorial statement | `text-2xl` | `text-4xl` | 300 | `.heading-display font-light` |
| Eyebrow | `text-xs` | `text-xs` | 500 | `.eyebrow` |
| Body | `text-sm` | `text-base` | 400 | padrão `body` |
| Citação depoimento | `text-sm` | `text-base` | 400 | `leading-relaxed` |
| Botões | `text-sm` | `text-sm` | 500 | `.btn-primary` / `.btn-ghost` |
| Nome depoimento | `text-lg` | `text-lg` | 500 | — |

---

## Momento de assinatura

Usar **peso 300** (`font-light`) ou **itálico** na display apenas em momentos editoriais de ruptura — não em títulos de seção padrão.

**Onde aplicar hoje:**
- `EditorialStatementSection` — frase grande em `font-light`
- Evitar itálico em CTAs e navegação

**Exemplo:**

```tsx
<p className="heading-display text-2xl font-light leading-snug text-cream md:text-4xl">
  {EDITORIAL_STATEMENT}
</p>
```

---

## Tracking e leading

| Contexto | Letter-spacing | Line-height |
|----------|----------------|-------------|
| Display | `0.04em` (via `.heading-display`) | `leading-tight` em títulos |
| Eyebrow | `0.28em` | padrão |
| Body longo | padrão | `leading-relaxed` |
| Botões | `tracking-wide` | — |

---

## Hierarquia por seção

1. **Eyebrow** (muted, uppercase) → contexto
2. **H2 display** (ink) → título principal
3. **Body** (ink/90 ou muted) → suporte
4. **CTA** (brand/cream) → ação

Manter no máximo **3 níveis** visíveis por bloco.
