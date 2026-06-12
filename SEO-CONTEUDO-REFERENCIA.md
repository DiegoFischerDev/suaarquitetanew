# Sua Arquiteta — Referência de SEO e Conteúdo

> **Objetivo deste documento:** Servir como contexto completo para a LLM (ou equipe) que irá criar o novo site moderno da Sua Arquiteta. Contém todos os textos, metadados, keywords, dados estruturados e orientações de SEO validados para o novo site.

---

## 1. Contexto do projeto

| Item | Valor |
|------|-------|
| **Domínio canônico** | `https://www.suaarquiteta.com.br` |
| **Marca** | Sua Arquiteta — Agni Garcia Arquitetura |
| **Profissional** | Agni Garcia — Arquiteta e Urbanista |
| **Localização principal** | Recife, PE, Brasil |
| **Área de atendimento** | Recife (presencial) + todo o Brasil e exterior (remoto) |
| **Idioma** | `pt-BR` |
| **Tipo de site** | Landing page single-page |
| **Resultado SEO** | Primeira página do Google para termos como "arquiteto arquiteta recife" |

---

## 2. Orientações de SEO

### 2.1 Princípios obrigatórios

1. **Keyword principal no `<title>` e na `<meta description>`** — termos como "Arquitetura", "Design de interiores", "Recife", "Arquiteto e Arquiteta" aparecem logo no título e na descrição.
2. **H1 rico em keywords** — o hero usa um H1 longo com múltiplos termos de busca relevantes (ver seção Hero).
3. **Conteúdo semântico abundante** — serviços, FAQ, depoimentos e bio da profissional geram texto indexável com variações naturais das keywords.
4. **Dados estruturados (JSON-LD)** — `ProfessionalService`, `Person` e `FAQPage` ajudam o Google a entender o negócio e exibir rich snippets.
5. **URL canônica** — `rel="canonical"` apontando para `https://www.suaarquiteta.com.br`.
6. **`meta robots`** — usar `index, follow`.
7. **Open Graph e Twitter Cards** — compartilhamento social com título, descrição e imagem.
8. **Alt text descritivo em imagens** — todas as imagens relevantes têm `alt` com contexto (nome, serviço, localização).
9. **FAQ com perguntas reais** — espelhadas no Schema.org `FAQPage` (essencial para featured snippets).
10. **CTAs com links profundos para WhatsApp** — mensagens pré-preenchidas por tipo de serviço (conversão + rastreamento).
11. **Sitemap e robots.txt** — indexação orientada aos crawlers, com URLs em HTTPS.
12. **Hierarquia de headings** — 1× H1 → H2 por seção → H3/H4 nos blocos.
13. **Performance** — otimizar Core Web Vitals (LCP, CLS, INP) sem remover conteúdo SEO.
14. **Acessibilidade** — nav semântica, aria-labels, skip links, contraste e foco visível.

### 2.2 Keywords estratégicas

**Primárias:**
- arquiteto recife
- arquiteta recife
- arquiteto arquiteta recife
- arquitetura recife
- design de interiores recife

**Secundárias (distribuir em H2, H3, parágrafos, alt texts e FAQ):**
- arquitetura a preço popular
- projeto arquitetônico
- design de interiores
- móveis planejados
- alvará de funcionamento
- memorial descritivo
- projeto de iluminação
- legalização de imóveis
- levantamento arquitetônico
- atestado de bombeiros
- projeto estrutural
- projeto elétrico
- projeto hidrossanitário
- reformas e obras
- consultoria arquitetônica
- arquitetura residencial
- arquitetura comercial

**Long-tail (usar em FAQ, depoimentos e CTAs):**
- quanto custa projeto de arquitetura em recife
- arquiteta online para todo brasil
- projeto de closet 3d
- memorial descritivo para alvará
- acompanhamento de obra arquiteta

---

## 3. Metadados completos

### 3.1 Title e meta tags básicas

```html
<title>SUA ARQUITETA RECIFE - Arquitetura | Interiores</title>
<meta name="title" content="SUA ARQUITETA RECIFE - Arquitetura | Interiores">
<meta name="description" content="Arquitetura a preço popular em Recife. Design de interiores. Alvará de Funcionamento. Móveis Planejados. Arquiteto e Arquiteta em Recife. Projeto de Iluminação. Memorial Descritivo.">
<meta name="keywords" content="arquiteto arquiteta recife">
<meta name="author" content="@DiegoFischer.dev">
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://www.suaarquiteta.com.br" />
<link rel="sitemap" type="application/xml" href="sitemap.xml" />
```

### 3.2 Open Graph (Facebook / LinkedIn)

```html
<meta property="og:type" content="website">
<meta property="og:url" content="https://www.suaarquiteta.com.br">
<meta property="og:title" content="Sua Arquiteta Recife">
<meta property="og:description" content="Conheça Sua Arquiteta Agni Garcia. Projetos presenciais em Recife ou remoto para qualquer cidade do Brasil.">
<meta property="og:image" content="https://www.suaarquiteta.com.br/assets/images/bg_section_one.jpg">
```

### 3.3 Twitter Cards

```html
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://www.suaarquiteta.com.br">
<meta property="twitter:title" content="Sua Arquiteta Recife">
<meta property="twitter:description" content="Conheça Sua Arquiteta Agni Garcia. Projetos presenciais em Recife ou remoto para qualquer cidade do Brasil.">
<meta property="twitter:image" content="https://www.suaarquiteta.com.br/assets/images/bg_section_one.jpg">
```

### 3.4 Favicon e PWA

```html
<link rel="icon" type="image/png" sizes="48x48" href="/assets/favicon/favicon-48x48.png">
<link rel="icon" type="image/png" sizes="192x192" href="/assets/favicon/android-chrome-192x192.png">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon/apple-touch-icon.png">
<link rel="manifest" href="/assets/favicon/site.webmanifest">
<meta name="msapplication-TileColor" content="#3D3834">
<meta name="theme-color" content="#3D3834">
```

**Web manifest (`site.webmanifest`):**
```json
{
  "name": "Sua Arquiteta Recife",
  "short_name": "Sua Arquiteta",
  "theme_color": "#3D3834",
  "background_color": "#3D3834",
  "display": "standalone"
}
```

### 3.5 robots.txt

```
User-agent: *
Disallow: /secreto/
Sitemap: https://www.suaarquiteta.com.br/sitemap.xml
```

### 3.6 sitemap.xml

```xml
<url>
  <loc>https://www.suaarquiteta.com.br/</loc>
  <lastmod>2026-06-11</lastmod>
</url>
```

---

## 4. Dados estruturados (JSON-LD)

Implementar os três tipos no `<head>`:

### 4.1 ProfessionalService

```json
{
  "@type": "ProfessionalService",
  "@id": "https://www.suaarquiteta.com.br/#business",
  "name": "Sua Arquiteta - Agni Garcia Arquitetura",
  "url": "https://www.suaarquiteta.com.br",
  "image": "https://www.suaarquiteta.com.br/assets/images/logo_agni_garcia_arquitetura_white.png",
  "telephone": "+55-81-99668-6852",
  "email": "contato@suaarquiteta.com.br",
  "description": "Arquitetura a preço popular em Recife. Design de interiores, projetos arquitetônicos residenciais e comerciais, legalização e serviços complementares.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Recife",
    "addressRegion": "PE",
    "addressCountry": "BR"
  },
  "areaServed": [
    { "@type": "City", "name": "Recife" },
    { "@type": "Country", "name": "Brasil" }
  ],
  "sameAs": [
    "https://www.instagram.com/sua_arquiteta/",
    "https://www.behance.net/agnigarcia"
  ]
}
```

### 4.2 Person (Agni Garcia)

```json
{
  "@type": "Person",
  "@id": "https://www.suaarquiteta.com.br/#person",
  "name": "Agni Garcia",
  "jobTitle": "Arquiteta e Urbanista",
  "image": "https://www.suaarquiteta.com.br/assets/images/expert.png",
  "description": "Arquiteta e designer de interiores com base em Recife, oferecendo projetos para todo o território nacional."
}
```

### 4.3 FAQPage

Ver seção **7.7 Dúvidas Frequentes** — cada pergunta/resposta deve estar idêntica no HTML visível e no JSON-LD.

---

## 5. Analytics e rastreamento

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-Y9F57S1NXE"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-11070437917');
</script>
```

**IDs:**
- Google Analytics: `G-Y9F57S1NXE`
- Google Ads: `AW-11070437917`

---

## 6. Navegação

| Link no menu | Âncora / Destino |
|--------------|------------------|
| Serviços | `#section_two` |
| Quem Somos | `#section_three` |
| Planos e Valores | `#section_five` |
| Depoimentos | `#section_seven` |
| Dúvidas Frequentes | `#section_eight` |
| WhatsApp | Link externo (ver CTAs) |

**Logo:** link para `#section_one` (topo/hero)

---

## 7. Textos por seção

### 7.1 Hero (Seção 1)

**H1:**
> Arquitetura a preço popular em Recife. Design de interiores. Alvará de Funcionamento. Móveis Planejados. Arquiteto e Arquiteta em Recife. Projeto de Iluminação. Memorial Descritivo.

**H2:**
> Você Acaba De Encontrar A Sua Arquiteta!

**H3:**
> Projetamos espaços modernos e eficientes

**Toggle de projetos:**
- Residenciais
- Comerciais

**Alt texts:**
- Logo: `Logo Sua Arquiteta - Agni Garcia Arquitetura`
- Imagem hero: `Projeto de arquitetura residencial ou comercial em Recife`

---

### 7.2 Apresentação + Fatores do Projeto (Seção 2)

**H2:**
> Olá, Meu Nome é Agni Garcia, **Sua Arquiteta**

**Vídeo YouTube:**
- URL: `https://www.youtube.com/embed/HE9OOHUdzDQ`
- Título do iframe: `SUA ARQUITETA RECIFE - Arquitetura | Interiores`

**H3:**
> Quais Fatores São Mais Importantes Para o Seu Projeto???

#### Cards interativos (6 fatores)

| Fator | Título | Texto ao expandir |
|-------|--------|-------------------|
| 1 | FUNCIONALIDADE | Tornar os ambientes mais funcionais e produtivos. |
| 2 | ECONOMIA | Evitar refazer obras por falta de planejamento ou acompanhamento inadequado. |
| 3 | ESTÉTICA | Organizar melhor os espaços, gerando sensação de harmonia, conforto e bem estar. |
| 4 | TEMPO | Economizar tempo, ter listas de compras personalizadas e indicação de fornecedores. |
| 5 | SEGURANÇA | Projetar ambientes de acordo com as normas da Associação Brasileira de Normas Técnicas (ABNT), seguindo processos de segurança rígidos. |
| 6 | IDENTIDADE VISUAL | Atrair mais clientes, alinhando o estilo da loja ao tipo do produto e a identidade da marca. |

**H2 — Serviços:**
> Serviços Que Oferecemos

#### Lista de serviços

| Serviço | Descrição |
|---------|-----------|
| **PROJETOS ARQUITETÔNICOS** | Projetos de Arquitetura Para Sua Residência Ou Estabelecimento Comercial. |
| **DESIGN DE INTERIORES** | Projeto de Pontos de Iluminação, Piso, Paredes, Forro de Gesso, Mobiliário e Outros. |
| **PROJETOS COMPLEMENTARES** | Projeto Estrutural, Elétrico, Hidrossanitário, Ar Condicionado e Outros |
| **REFORMAS E OBRAS** | Equipe de Obras Completa, Marcenaria, Serralheiros e Outros |
| **CONSULTORIA** | Apresentamos Soluções, Tiramos Dúvidas e Fazemos Sugestões Sobre Projetos, Compra de Imóveis, Design de Interiores |
| **OUTROS SERVIÇOS** | Legalização, Parecer Técnico, Laudos e Perícias, Levantamento Arquitetônico, Memoriais Descritivos Para Obtenção de Alvarás, Atestado de Bombeiros |

---

### 7.3 Quem Somos (Seção 3)

**H2:**
> Conheça Sua Arquiteta

**Nome:**
> Agni Garcia

**Cargo:**
> Arquiteta & Urbanista

**Pós-graduações:**
> - Gestão de Obras, Orçamentos e Perícias
> - Gestão de Patrimônio Histórico
> - Design de Interiores

**Bio (parágrafo completo):**
> "Sou arquiteta e designer de interiores há mais de 8 anos, com base em Recife, porém ofereço projetos para todo o território nacional. Sempre sonhei em democratizar a arquitetura, por isso busco oferecer planos a preços populares.
>
> Eu sei o quanto um ambiente bonito e bem planejado impacta no dia a dia e bem-estar das pessoas, por isso nosso atendimento é humanizado e personalizado para atender as necessidades específicas de cada cliente.
>
> Hoje conto com uma equipe de talentosos profissionais que me apoiam nessa missão, desde mestres de obra, marceneiros, eletricistas, advogados e equipe de marketing para proporcionar maior número de soluções para nossos clientes."

**Alt da foto:** `Agni Garcia, arquiteta em Recife`

---

### 7.4 Planos e Valores (Seção 5)

**H2:**
> Adquira seu projeto com 50% de desconto!

**Subtítulo:**
> (Ofertas por tempo limitado)

#### Plano 1 — Projeto Arquitetônico
- **Título:** Projeto Arquitetônico
- **Subtítulo:** Residencial ou Comercial
- **Inclusos:**
  - CONSULTORIA
  - ATENDIMENTO VIA WHATSAPP
  - IMAGENS EM 3D
  - IMAGEM 2D PLANTA BAIXA, CORTES E FACHADAS
  - IMAGEM 2D SITUAÇÃO, LOCAÇÃO E COBERTA
  - PLANTA DE LAYOUT
  - PLANTA DE PONTOS ELÉTRICOS
  - PLANTA DE PONTOS HIDRÁULICOS
- **CTA:** Saiba mais

#### Plano 2 — Design de Interiores
- **Título:** Design de Interiores
- **Subtítulo:** Residencial ou Comercial
- **Inclusos:**
  - CONSULTORIA
  - ATENDIMENTO VIA WHATSAPP
  - IMAGENS EM 3D
  - IMAGEM 2D PLANTA BAIXA E CORTES
  - PLANTA DE LAYOUT
  - PLANTA DE PONTOS ELÉTRICOS
  - PLANTA DE PONTOS HIDRÁULICOS
  - PROJETO DE PONTOS DE ILUMINAÇÃO
  - PAGINAÇÃO PISO E PAREDES
  - PLANTA DE FORRO DE GESSO
  - DETALHAMENTOS DO MOBILIÁRIO
- **CTA:** Saiba mais

#### Plano 3 — Serviços de Legalização
- **Título:** Serviços de Legalização
- **Inclusos:**
  - CONSULTORIA
  - ATENDIMENTO VIA WHATSAPP
  - IMAGEM 2D PLANTA BAIXA, CORTES E FACHADAS
  - EMISSÃO DA RESPONSABILIDADE TÉCNICA (TAXA INCLUIDA)
  - LEVANTAMENTO ARQUITETÔNICO (APENAS EM RECIFE)
- **CTA:** Saiba mais

#### Plano 4 — Serviços Complementares
- **Título:** Serviços Complementares
- **Subtítulo:** Terceirizados
- **Inclusos:**
  - PROJETO ESTRUTURAL (engenheiro)
  - PROJETO ELÉTRICO
  - PROJETO HIDRÁULICO
  - PROJETO DE COMBATE A INCÊNDIOS
  - ELABORAÇÃO DO MEMORIAL DESCRITIVO
  - PROJETO AR CONDICIONADOS
  - PROJETO ACÚSTICO
  - EQUIPE DE OBRAS
  - LAUDOS TÉCNICOS
  - ACOMPANHAMENTO PRESENCIAL DE OBRAS
- **CTA:** Saiba mais

---

### 7.5 Empresas / Parceiros (Seção 6)

**H3:**
> Já Realizamos o Sonho de Marcas Como

**Alt da imagem de logos:** `Logos de empresas parceiras atendidas pela Sua Arquiteta`

---

### 7.6 Depoimentos (Seção 7)

**H2:**
> O Que Dizem os Clientes

#### Depoimento 1 — Vanessa Alves
- **Serviço:** Móveis planejados
- **Texto:** Me chamo Vanessa Alves. Moro na cidade de São Paulo e contratei a arquiteta Agni Garcia de forma on line para fazer um projeto de um closet para mim. Gente, fiquei bem surpresa com o resultado. A Agni conseguiu entender perfeitamente as minhas necessidades. Ela é super moderna e o projeto ficou incrível e muito lindo. Eu pude ver como iria ficar antes mesmo de ficar pronto. Nossa, eu AMEI demais. Gratidão!
- **Alt foto:** `Foto de Vanessa Alves, cliente da Sua Arquiteta`

#### Depoimento 2 — Eduardo
- **Serviço:** Restaurante
- **Texto:** Me chamo Eduardo, sou proprietário do restaurante pé de canela. Agni é uma profissional maravilhosa. Desde o começo sempre atenciosa. Acompanhou a obra, entregou o projeto todo em 3d, acompanhou a documentação. legislação se preocupou com acessibilidade. a principal qualidade foi o acompanhamento da obra, não deixou nada a desejar. Pode confiar que o trabalho. Profissional nota 10! Super indico!
- **Alt foto:** `Foto de Eduardo Carvalho, cliente da Sua Arquiteta`

#### Depoimento 3 — Fabiano Pinheiro
- **Serviço:** Quiosque Shopping
- **Texto:** Fiz o meu projeto de quiosque para colocar no shopping com Agni. Uma profissional espetacular. O resultado final foi fantástico. Preço bom e prazo cumprido como acordado.
- **Alt foto:** `Foto de Fabiano Pinheiro, cliente da Sua Arquiteta`

#### Depoimento 4 — Paulo Cunha
- **Serviço:** Memorial Descritivo
- **Texto:** Contratei a Agni para realizar um memorial descritivo com laudo de acústica para a nossa empresa de fabricação de tintas. Desde o primeiro momento se mostrou muito profissional e entregou o documento no prazo estipulado por ela. Nos deu suporte no decorrer de todo o processo de tramitação na prefeitura.
- **Alt foto:** `Foto de Paulo Cunha, cliente da Sua Arquiteta`

**Alt avaliação:** `Avaliação 5 estrelas`

---

### 7.7 Dúvidas Frequentes (Seção 8)

**H2:**
> Dúvidas Frequentes

#### FAQ 1
**P:** Quais tipos de projetos vocês trabalham?
**R:** Trabalhamos com projetos arquitetônicos residenciais, comerciais e projetos de regularizações de imóveis em área urbana. Além disso, contamos com uma equipe de profissionais que realizam projetos complementares, tais como: projetos estruturais, projetos elétricos de baixa tensão, projetos hidrossanitários, projetos de ar condicionado, projetos acústicos, até projetos para implementação do sistema de proteção contra incêndios, atendendo as normas técnicas para liberação do atestado do corpo de bombeiros.

#### FAQ 2
**P:** Qual o prazo para elaboração de um projeto?
**R:** O tempo varia de acordo com o tipo de projeto a ser elaborado por causa de sua complexidade. Projeto arquitetônico – entre 15 e 90 dias. Design de interiores – entre 15 e 90 dias. Projetos complementares – entre 15 e 45 dias. Existe ainda um fator importantíssimo que faz com que esses prazos sofram algumas variações que é: A PARTICIPAÇÃO DE VOCÊS, QUERIDOS CLIENTES. É importantíssimo que vocês compreendam as etapas do projeto contratado para que possamos transmitir de maneira fiel atendendo suas necessidades.

#### FAQ 3
**P:** Posso sugerir alterações durante a realização do projeto?
**R:** Sim, podemos realizar alterações na proposta do projeto. Mas ATENÇÃO, essas alterações devem ser solicitadas na etapa de planejamento, onde a sua arquiteta vai te apresentar algumas propostas de projetos. Mas digo com toda certeza, é muito difícil uma proposta apresentada não atender suas expectativas, sabe por que? Quando damos início ao serviço contratado fazemos uma série de perguntas para melhor entender a necessidade de cada cliente. É nessas fases iniciais que não deixamos lacunas abertas para dúvidas. Por esta razão o projeto fica do jeitinho que o cliente sonhou. Para alterações solicitadas após a aprovação da proposta, poderá ser negociada uma taxa adicional a depender do tamanho da alteração.

#### FAQ 4
**P:** Para projeto de interiores, vocês têm equipe para executar o projeto?
**R:** Sim, contamos com os mais variados profissionais. Enviamos para vocês um orçamento para que a obra seja executada com a nossa equipe. Fechando com a nossa equipe de obra terá o meu acompanhamento para que tudo fique exatamente igual ao projeto.

#### FAQ 5
**P:** Caso eu contrate outra equipe de obras ainda terei o teu acompanhamento?
**R:** Sim, para garantir a perfeita execução do projeto, estão inclusas pelo menos duas visitas de acompanhamento presencial na sua obra. Exceto para projetos fora de Pernambuco.

#### FAQ 6
**P:** Vocês realizam projetos apenas em Recife?
**R:** Fazemos projetos e atendemos as mais diversas cidades e até mesmo outros países. Hoje em dia, graças a tecnologia, conseguimos atender todos de qualquer lugar do mundo.

#### FAQ 7
**P:** Consigo saber quanto irá custar minha obra?
**R:** É possível ter um orçamento do custo de toda a obra, desde que o projeto esteja finalizado. Não é possível realizar um orçamento sem projeto.

#### FAQ 8
**P:** É possível contratar um projeto apenas de móveis?
**R:** Claro que sim! Contratando apenas consultoria. Na consultoria apresentamos desenhos simples e vistas em 3D para seu closet por exemplo. De posse dessas imagens, qualquer marceneiro será capaz de fabricar seus móveis.

---

### 7.8 Rodapé

**H4:**
> Ainda com dúvidas?
> Teremos prazer em te atender

**Contatos:**
| Canal | Valor |
|-------|-------|
| WhatsApp | (81) 99668-6852 |
| Instagram | @Sua_Arquiteta → `https://www.instagram.com/sua_arquiteta/` |
| Behance | Portfólio Agni → `https://www.behance.net/agnigarcia` |
| E-mail | contato@suaarquiteta.com.br |

**Copyright:**
> Agni Garcia Arquitetura 2026 © Todos os direitos reservados

**Créditos:**
> Desenvolvido por Diego Fischer Dev → `https://www.linkedin.com/in/diegofischerdev`

---

## 8. CTAs — Links WhatsApp com mensagens pré-preenchidas

**Número:** `5581996686852`

| Contexto | Mensagem pré-preenchida | URL |
|----------|-------------------------|-----|
| Geral / Nav / Footer | Oi Agni! Conheci teu trabalho através do seu site e gostaria de saber mais informações | `https://wa.me/5581996686852?text=Oi+Agni%21+Conheci+teu+trabalho+atrav%C3%A9s+do+seu+site+e+gostaria+de+saber+mais+informa%C3%A7%C3%B5es` |
| Projeto Arquitetônico | Oi Agni! conheci teu trabalho através do seu site e gostaria de saber como posso contratar um Projeto Arquitetônico Residencial ou Comercial.😍 | `https://wa.me/5581996686852?text=Oi%20Agni!%20conheci%20teu%20trabalho%20atrav%C3%A9s%20do%20seu%20site%20e%20gostaria%20de%20saber%20como%20posso%20contratar%20um%20Projeto%20Arquitet%C3%B4nico%20Residencial%20ou%20Comercial.%F0%9F%98%8D` |
| Design de Interiores | Oi Agni! Conheci teu trabalho através do seu site e gostaria de saber como posso contratar um serviço de Design de Interiores | `https://wa.me/5581996686852?text=Oi%20Agni!%20Conheci%20teu%20trabalho%20atrav%C3%A9s%20do%20seu%20site%20e%20gostaria%20de%20saber%20como%20posso%20contratar%20um%20servi%C3%A7o%20de%20Design%20de%20Interiores%20` |
| Legalização | Oi Agni! Conheci teu trabalho através do seu site e gostaria de saber como posso contratar Serviços de Legalização | `https://wa.me/5581996686852?text=Oi+Agni%21+Conheci+teu+trabalho+atrav%C3%A9s+do+seu+site+e+gostaria+de+saber+como+posso+contratar+Servi%C3%A7os+de+Legaliza%C3%A7%C3%A3o` |
| Complementares | Oi Agni! Conheci teu trabalho através do seu site e gostaria de saber como posso contratar Serviços Complementares Terceirizados | `https://wa.me/5581996686852?text=Oi+Agni%21+Conheci+teu+trabalho+atrav%C3%A9s+do+seu+site+e+gostaria+de+saber+como+posso+contratar+Servi%C3%A7os+Complementares+Terceirizados` |

Todos os links externos devem usar `target="_blank"` e `rel="noopener noreferrer"`.

---

## 9. Identidade visual

| Elemento | Valor |
|----------|-------|
| Cor tema (`theme-color`) | `#3D3834` |
| Logo principal | `logo_agni_garcia_arquitetura_white.png` |
| Logo nav | `logo_agni_white.png` |
| Foto profissional | `expert.png` |
| Imagem OG | `bg_section_one.jpg` |
| Galeria de projetos | `assets/Projetos/{1-90}.jpeg` (1-50 comerciais, 51-90 residenciais) |

O site pode ser visualmente moderno, mas deve preservar o nome da marca, tom de voz acolhedor e profissional da Agni, e a proposta de "arquitetura democratizada / preço popular".

---

## 10. Checklist SEO

- [ ] `<html lang="pt-BR">`
- [ ] `<title>` conforme seção 3.1
- [ ] `<meta name="description">` com todas as keywords principais
- [ ] `<link rel="canonical">` apontando para `https://www.suaarquiteta.com.br`
- [ ] Open Graph e Twitter Cards completos
- [ ] JSON-LD: `ProfessionalService` + `Person` + `FAQPage`
- [ ] Um único H1 com keywords principais
- [ ] H2 por seção com termos semânticos
- [ ] FAQ visível no HTML = FAQ no JSON-LD (textos idênticos)
- [ ] Alt text em todas as imagens com contexto
- [ ] `robots.txt` com Sitemap
- [ ] `sitemap.xml` com HTTPS e `lastmod` atualizado
- [ ] Favicon 48×48+ acessível em URL estável
- [ ] Google Analytics / Ads configurados
- [ ] Links WhatsApp com mensagens por serviço
- [ ] `meta robots` = `index, follow`
- [ ] Performance: imagens otimizadas (WebP/AVIF), lazy loading
- [ ] Mobile-first responsivo
- [ ] HTTPS em produção

---

## 11. Instruções para a LLM

1. **Preserve 100% dos textos** listados neste documento.
2. **Modernize apenas a apresentação** (layout, tipografia, animações, componentes) sem alterar o significado dos textos.
3. **Não remova seções** — Hero, Serviços, Quem Somos, Planos, Depoimentos, FAQ e Footer são todas áreas com valor SEO.
4. **Mantenha a estrutura de headings** com keywords naturais; pode reorganizar visualmente, mas não eliminar termos.
5. **Implemente Schema.org** desde o início.
6. **O tom de voz** é próximo, profissional e humanizado — reflete a personalidade da Agni Garcia.
7. **Priorize conversão via WhatsApp** — botões flutuantes e CTAs por tipo de serviço são essenciais.

---

*Referência de SEO e conteúdo — Sua Arquiteta — Junho/2026.*
