import { FAQ } from "@/lib/content";
import { NAV_LINKS, SITE_URL } from "@/lib/site";

export function JsonLd() {
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "Sua Arquiteta - Agni Garcia Arquitetura",
    description:
      "Arquitetura e design de interiores em Recife. Projetos presenciais ou remotos para todo o Brasil.",
    inLanguage: "pt-BR",
    publisher: { "@id": `${SITE_URL}/#business` },
  };

  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Início",
        item: SITE_URL,
      },
      ...NAV_LINKS.map((link, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: link.label,
        item: `${SITE_URL}${link.href}`,
      })),
    ],
  };

  const professionalService = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#business`,
    name: "Sua Arquiteta - Agni Garcia Arquitetura",
    url: SITE_URL,
    image: `${SITE_URL}/assets/images/logo_agni_garcia_arquitetura_white.png`,
    telephone: "+55-81-99668-6852",
    email: "contato@suaarquiteta.com.br",
    description:
      "Arquitetura a preço popular em Recife. Design de interiores, projetos arquitetônicos residenciais e comerciais, legalização e serviços complementares.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Recife",
      addressRegion: "PE",
      addressCountry: "BR",
    },
    areaServed: [
      { "@type": "City", name: "Recife" },
      { "@type": "Country", name: "Brasil" },
    ],
    sameAs: [
      "https://www.instagram.com/sua_arquiteta/",
      "https://www.behance.net/agnigarcia",
    ],
  };

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: "Agni Garcia",
    jobTitle: "Arquiteta e Urbanista",
    image: `${SITE_URL}/assets/images/expert.png`,
    description:
      "Arquiteta e designer de interiores com base em Recife, oferecendo projetos para todo o território nacional.",
    worksFor: { "@id": `${SITE_URL}/#business` },
    url: SITE_URL,
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalService) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
    </>
  );
}
