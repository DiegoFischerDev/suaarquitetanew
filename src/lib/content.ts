import { WHATSAPP_LINKS } from "./site";

export const HERO = {
  architectName: "Agni Garcia",
  visualTitle: "Sua Arquiteta",
  visualSubtitle: "Projetamos espaços modernos e eficientes",
  h1: "Arquiteta a preço popular em Recife",
  h2: "Você Acaba De Encontrar A Sua Arquiteta!",
  h3: "Projetamos espaços modernos e eficientes",
  projectTypes: ["Residenciais", "Comerciais"] as const,
};

export const FACTORS = [
  {
    id: "funcionalidade",
    title: "FUNCIONALIDADE",
    text: "Tornar os ambientes mais funcionais e produtivos.",
  },
  {
    id: "economia",
    title: "ECONOMIA",
    text: "Evitar refazer obras por falta de planejamento ou acompanhamento inadequado.",
  },
  {
    id: "estetica",
    title: "ESTÉTICA",
    text: "Organizar melhor os espaços, gerando sensação de harmonia, conforto e bem estar.",
  },
  {
    id: "tempo",
    title: "TEMPO",
    text: "Economizar tempo, ter listas de compras personalizadas e indicação de fornecedores.",
  },
  {
    id: "seguranca",
    title: "SEGURANÇA",
    text: "Projetar ambientes de acordo com as normas da Associação Brasileira de Normas Técnicas (ABNT), seguindo processos de segurança rígidos.",
  },
  {
    id: "identidade",
    title: "IDENTIDADE VISUAL",
    text: "Atrair mais clientes, alinhando o estilo da loja ao tipo do produto e a identidade da marca.",
  },
] as const;

export const SERVICES = [
  {
    title: "PROJETOS ARQUITETÔNICOS",
    description:
      "Projetos de Arquitetura Para Sua Residência Ou Estabelecimento Comercial.",
  },
  {
    title: "DESIGN DE INTERIORES",
    description:
      "Projeto de Pontos de Iluminação, Piso, Paredes, Forro de Gesso, Mobiliário e Outros.",
  },
  {
    title: "PROJETOS COMPLEMENTARES",
    description:
      "Projeto Estrutural, Elétrico, Hidrossanitário, Ar Condicionado e Outros",
  },
  {
    title: "REFORMAS E OBRAS",
    description:
      "Equipe de Obras Completa, Marcenaria, Serralheiros e Outros",
  },
  {
    title: "CONSULTORIA",
    description:
      "Apresentamos Soluções, Tiramos Dúvidas e Fazemos Sugestões Sobre Projetos, Compra de Imóveis, Design de Interiores",
  },
  {
    title: "OUTROS SERVIÇOS",
    description:
      "Legalização, Parecer Técnico, Laudos e Perícias, Levantamento Arquitetônico, Memoriais Descritivos Para Obtenção de Alvarás, Atestado de Bombeiros",
  },
] as const;

export const EDITORIAL_STATEMENT = {
  quote:
    "O que mais me encanta na arquitetura é saber que um bom projeto não transforma apenas um espaço. Ele transforma a experiência de quem o vive, todos os dias, durante muitos anos.",
  attribution: "Agni Garcia",
  role: "Sua Arquiteta",
  image: "/assets/images/Projetos/32.webp",
  imageAlt:
    "Projeto de design de interiores desenvolvido pela arquiteta Agni Garcia em Recife",
} as const;

export const PRICING_COPY = {
  subtitle:
    "Vamos conversar sobre o seu espaço — sem compromisso, com atenção de verdade.",
} as const;

export const ABOUT = {
  heading: "Conheça Sua Arquiteta",
  introHeading: "Olá, Meu Nome é Agni Garcia, Sua Arquiteta",
  name: "Agni Garcia",
  role: "Arquiteta & Urbanista",
  postGraduations: [
    "Gestão de Obras, Orçamentos e Perícias",
    "Gestão de Patrimônio Histórico",
    "Design de Interiores",
  ],
  highlights: [
    "Centenas de projetos realizados",
    "100% de feedbacks positivos",
  ] as const,
  bio: [
    "Sou pernambucana, arquiteta e designer de interiores. Há mais de 8 anos ajudo famílias e profissionais a criarem espaços que unem beleza, funcionalidade e bem-estar, atendendo clientes em todo o Brasil.",
  ],
};

export const PLANS = [
  {
    id: "arquitetonico",
    title: "Projeto Arquitetônico",
    subtitle: "Residencial ou Comercial",
    items: [
      "CONSULTORIA",
      "ATENDIMENTO VIA WHATSAPP",
      "IMAGENS EM 3D",
      "IMAGEM 2D PLANTA BAIXA, CORTES E FACHADAS",
      "IMAGEM 2D SITUAÇÃO, LOCAÇÃO E COBERTA",
      "PLANTA DE LAYOUT",
      "PLANTA DE PONTOS ELÉTRICOS",
      "PLANTA DE PONTOS HIDRÁULICOS",
    ],
    cta: "Saiba mais",
    whatsapp: WHATSAPP_LINKS.arquitetonico,
  },
  {
    id: "interiores",
    title: "Design de Interiores",
    subtitle: "Residencial ou Comercial",
    items: [
      "CONSULTORIA",
      "ATENDIMENTO VIA WHATSAPP",
      "IMAGENS EM 3D",
      "IMAGEM 2D PLANTA BAIXA E CORTES",
      "PLANTA DE LAYOUT",
      "PLANTA DE PONTOS ELÉTRICOS",
      "PLANTA DE PONTOS HIDRÁULICOS",
      "PROJETO DE PONTOS DE ILUMINAÇÃO",
      "PAGINAÇÃO PISO E PAREDES",
      "PLANTA DE FORRO DE GESSO",
      "DETALHAMENTOS DO MOBILIÁRIO",
    ],
    cta: "Saiba mais",
    whatsapp: WHATSAPP_LINKS.interiores,
  },
  {
    id: "legalizacao",
    title: "Serviços de Legalização",
    subtitle: undefined,
    items: [
      "CONSULTORIA",
      "ATENDIMENTO VIA WHATSAPP",
      "IMAGEM 2D PLANTA BAIXA, CORTES E FACHADAS",
      "EMISSÃO DA RESPONSABILIDADE TÉCNICA (TAXA INCLUIDA)",
      "LEVANTAMENTO ARQUITETÔNICO (APENAS EM RECIFE)",
    ],
    cta: "Saiba mais",
    whatsapp: WHATSAPP_LINKS.legalizacao,
  },
  {
    id: "complementares",
    title: "Serviços Complementares",
    subtitle: "Terceirizados",
    items: [
      "PROJETO ESTRUTURAL (engenheiro)",
      "PROJETO ELÉTRICO",
      "PROJETO HIDRÁULICO",
      "PROJETO DE COMBATE A INCÊNDIOS",
      "ELABORAÇÃO DO MEMORIAL DESCRITIVO",
      "PROJETO AR CONDICIONADOS",
      "PROJETO ACÚSTICO",
      "EQUIPE DE OBRAS",
      "LAUDOS TÉCNICOS",
      "ACOMPANHAMENTO PRESENCIAL DE OBRAS",
    ],
    cta: "Saiba mais",
    whatsapp: WHATSAPP_LINKS.complementares,
  },
] as const;

export const TESTIMONIALS = [
  {
    name: "Vanessa Alves",
    service: "Móveis planejados",
    text: "Me chamo Vanessa Alves. Moro na cidade de São Paulo e contratei a arquiteta Agni Garcia de forma on line para fazer um projeto de um closet para mim. Gente, fiquei bem surpresa com o resultado. A Agni conseguiu entender perfeitamente as minhas necessidades. Ela é super moderna e o projeto ficou incrível e muito lindo. Eu pude ver como iria ficar antes mesmo de ficar pronto. Nossa, eu AMEI demais. Gratidão!",
    image: "/assets/images/Vanessa-Alves.webp",
    alt: "Foto de Vanessa Alves, cliente da Sua Arquiteta",
  },
  {
    name: "Eduardo",
    service: "Restaurante",
    text: "Me chamo Eduardo, sou proprietário do restaurante pé de canela. Agni é uma profissional maravilhosa. Desde o começo sempre atenciosa. Acompanhou a obra, entregou o projeto todo em 3d, acompanhou a documentação. legislação se preocupou com acessibilidade. a principal qualidade foi o acompanhamento da obra, não deixou nada a desejar. Pode confiar que o trabalho. Profissional nota 10! Super indico!",
    image: "/assets/images/Eduardo-Caravalho.webp",
    alt: "Foto de Eduardo Carvalho, cliente da Sua Arquiteta",
  },
  {
    name: "Fabiano Pinheiro",
    service: "Quiosque Shopping",
    text: "Fiz o meu projeto de quiosque para colocar no shopping com Agni. Uma profissional espetacular. O resultado final foi fantástico. Preço bom e prazo cumprido como acordado.",
    image: "/assets/images/Fabiano-Pinheiro.webp",
    alt: "Foto de Fabiano Pinheiro, cliente da Sua Arquiteta",
  },
  {
    name: "Paulo Cunha",
    service: "Memorial Descritivo",
    text: "Contratei a Agni para realizar um memorial descritivo com laudo de acústica para a nossa empresa de fabricação de tintas. Desde o primeiro momento se mostrou muito profissional e entregou o documento no prazo estipulado por ela. Nos deu suporte no decorrer de todo o processo de tramitação na prefeitura.",
    image: "/assets/images/Paulo-Cunha.webp",
    alt: "Foto de Paulo Cunha, cliente da Sua Arquiteta",
  },
] as const;

export const FAQ = [
  {
    question: "Quais tipos de projetos vocês trabalham?",
    answer:
      "Trabalhamos com projetos arquitetônicos residenciais, comerciais e projetos de regularizações de imóveis em área urbana. Além disso, contamos com uma equipe de profissionais que realizam projetos complementares, tais como: projetos estruturais, projetos elétricos de baixa tensão, projetos hidrossanitários, projetos de ar condicionado, projetos acústicos, até projetos para implementação do sistema de proteção contra incêndios, atendendo as normas técnicas para liberação do atestado do corpo de bombeiros.",
  },
  {
    question: "Qual o prazo para elaboração de um projeto?",
    answer:
      "O tempo varia de acordo com o tipo de projeto a ser elaborado por causa de sua complexidade. Projeto arquitetônico – entre 15 e 90 dias. Design de interiores – entre 15 e 90 dias. Projetos complementares – entre 15 e 45 dias. Existe ainda um fator importantíssimo que faz com que esses prazos sofram algumas variações que é: A PARTICIPAÇÃO DE VOCÊS, QUERIDOS CLIENTES. É importantíssimo que vocês compreendam as etapas do projeto contratado para que possamos transmitir de maneira fiel atendendo suas necessidades.",
  },
  {
    question: "Posso sugerir alterações durante a realização do projeto?",
    answer:
      "Sim, podemos realizar alterações na proposta do projeto. Mas ATENÇÃO, essas alterações devem ser solicitadas na etapa de planejamento, onde a sua arquiteta vai te apresentar algumas propostas de projetos. Mas digo com toda certeza, é muito difícil uma proposta apresentada não atender suas expectativas, sabe por que? Quando damos início ao serviço contratado fazemos uma série de perguntas para melhor entender a necessidade de cada cliente. É nessas fases iniciais que não deixamos lacunas abertas para dúvidas. Por esta razão o projeto fica do jeitinho que o cliente sonhou. Para alterações solicitadas após a aprovação da proposta, poderá ser negociada uma taxa adicional a depender do tamanho da alteração.",
  },
  {
    question: "Para projeto de interiores, vocês têm equipe para executar o projeto?",
    answer:
      "Sim, contamos com os mais variados profissionais. Enviamos para vocês um orçamento para que a obra seja executada com a nossa equipe. Fechando com a nossa equipe de obra terá o meu acompanhamento para que tudo fique exatamente igual ao projeto.",
  },
  {
    question: "Caso eu contrate outra equipe de obras ainda terei o teu acompanhamento?",
    answer:
      "Sim, para garantir a perfeita execução do projeto, estão inclusas pelo menos duas visitas de acompanhamento presencial na sua obra. Exceto para projetos fora de Pernambuco.",
  },
  {
    question: "Vocês realizam projetos apenas em Recife?",
    answer:
      "Fazemos projetos e atendemos as mais diversas cidades e até mesmo outros países. Hoje em dia, graças a tecnologia, conseguimos atender todos de qualquer lugar do mundo.",
  },
  {
    question: "Consigo saber quanto irá custar minha obra?",
    answer:
      "É possível ter um orçamento do custo de toda a obra, desde que o projeto esteja finalizado. Não é possível realizar um orçamento sem projeto.",
  },
  {
    question: "É possível contratar um projeto apenas de móveis?",
    answer:
      "Claro que sim! Contratando apenas consultoria. Na consultoria apresentamos desenhos simples e vistas em 3D para seu closet por exemplo. De posse dessas imagens, qualquer marceneiro será capaz de fabricar seus móveis.",
  },
] as const;

const CHAMPAGNAT_PLANTA =
  "/assets/images/Projetos/ginasio-champagnat-planta.webp";
const CHAMPAGNAT_INTERIOR =
  "/assets/images/Projetos/ginasio-champagnat-interior.webp";
const CHAMPAGNAT_FACHADA =
  "/assets/images/Projetos/ginasio-champagnat-fachada.webp";

export const BEFORE_AFTER_PROJECTS = [
  {
    id: "ginasio-champagnat-1",
    before: CHAMPAGNAT_PLANTA,
    after: CHAMPAGNAT_INTERIOR,
    beforeAlt:
      "Planta do Ginásio de Esportes Champagnat — projeto arquitetônico Sua Arquiteta Recife",
    afterAlt:
      "Interior em 3D do Ginásio de Esportes Champagnat — Sua Arquiteta Agni Garcia",
  },
  {
    id: "ginasio-champagnat-2",
    before: CHAMPAGNAT_INTERIOR,
    after: CHAMPAGNAT_FACHADA,
    beforeAlt:
      "Render 3D do interior do Ginásio de Esportes Champagnat — Sua Arquiteta",
    afterAlt:
      "Fachada do Ginásio de Esportes Champagnat após o projeto arquitetônico — Sua Arquiteta",
  },
  {
    id: "ginasio-champagnat-3",
    before: CHAMPAGNAT_PLANTA,
    after: CHAMPAGNAT_FACHADA,
    beforeAlt:
      "Planta do Ginásio de Esportes Champagnat — projeto comercial em Recife — Sua Arquiteta",
    afterAlt:
      "Fachada executada do Ginásio de Esportes Champagnat — Sua Arquiteta Agni Garcia",
  },
] as const;

const PROJECT_FILES = [
  "ginasio-champagnat-interior.webp",
  "ginasio-champagnat-fachada.webp",
  "1.webp",
  "5.webp",
  "6.webp",
  "11.webp",
  "15.webp",
  "17.webp",
  "32.webp",
  "37.webp",
  "56.webp",
  "59.webp",
  "62.webp",
  "72.webp",
  "76.webp",
  "78.webp",
  "85.webp",
  "88.webp",
] as const;

const PROJECT_ALT_BY_FILE: Partial<Record<(typeof PROJECT_FILES)[number], string>> = {
  "ginasio-champagnat-interior.webp":
    "Render 3D do interior do Ginásio de Esportes Champagnat — Sua Arquiteta Recife",
  "ginasio-champagnat-fachada.webp":
    "Fachada do Ginásio de Esportes Champagnat — projeto arquitetônico em Recife — Sua Arquiteta",
};

export const PROJECT_GALLERY = PROJECT_FILES.map((file, index) => ({
  src: `/assets/images/Projetos/${file}`,
  alt:
    PROJECT_ALT_BY_FILE[file] ??
    `Projeto de arquitetura ${index + 1 <= 8 ? "comercial" : "residencial"} em Recife — Sua Arquiteta Agni Garcia`,
}));

const EDITORIAL_IMAGE_FILES = [
  "32.webp",
  "ginasio-champagnat-interior.webp",
  "ginasio-champagnat-fachada.webp",
  "1.webp",
  "59.webp",
  "72.webp",
  "85.webp",
  "78.webp",
] as const satisfies ReadonlyArray<(typeof PROJECT_FILES)[number]>;

export const EDITORIAL_STATEMENT_IMAGES = EDITORIAL_IMAGE_FILES.map((file) => {
  const image = PROJECT_GALLERY.find((item) => item.src.endsWith(`/${file}`));
  if (!image) {
    throw new Error(`Editorial image not found: ${file}`);
  }
  return image;
});

/** @deprecated Use PROJECT_GALLERY */
export const PROJECT_IMAGES = PROJECT_GALLERY.map((image, index) => ({
  ...image,
  category: index + 1 <= 8 ? ("Comercial" as const) : ("Residencial" as const),
}));
