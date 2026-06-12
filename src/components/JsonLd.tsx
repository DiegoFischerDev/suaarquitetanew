import { FAQ } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export function JsonLd() {
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
