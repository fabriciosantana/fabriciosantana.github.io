import React, { useState } from "react";

import { digestIndex, digestsByFile } from "./content/digests/generated.js";
import profilePhoto from "./images/fabricio-plenario.png";
import "./styles.css";

const whatsappNumber = "5561982336222";
const whatsappUrl = `https://wa.me/${whatsappNumber}`;
const courses = [
  {
    title: "Engenharia de Software",
    description: "Práticas, ferramentas e decisões técnicas para construir software com qualidade.",
    status: "Em breve",
  },
  {
    title: "Inteligência Artificial aplicada",
    description: "Conceitos e usos práticos de IA para profissionais de tecnologia e negócios.",
    status: "Em planejamento",
  },
  {
    title: "Cloud Computing",
    description: "Fundamentos de nuvem, arquitetura e operacao de sistemas modernos.",
    status: "Em breve",
  },
];

const digestPosts = digestIndex
  .map((entry) => ({
    ...entry,
    digest: digestsByFile[entry.file],
    slug: `resumo-${entry.date}`,
  }))
  .filter((entry) => entry.digest);

const formatDate = (date) =>
  new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));

const formatPrice = (price, language) => price[language];

const renderDigestMarkdown = (markdown) => {
  const escapeHtml = (value) =>
    value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const renderInline = (value) =>
    escapeHtml(value)
      .replace(
        /\*\*\[([^\]]+)\]\((https?:\/\/[^)]+)\)\*\*/g,
        '<a href="$2" target="_blank" rel="noreferrer">$1</a>'
      )
      .replace(
        /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
        '<a href="$2" target="_blank" rel="noreferrer">$1</a>'
      )
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

  return markdown
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      if (line.startsWith("### ")) {
        return `<h3>${renderInline(line.slice(4))}</h3>`;
      }

      if (line.startsWith("#### ")) {
        return `<h4>${renderInline(line.slice(5))}</h4>`;
      }

      if (line.startsWith("- ")) {
        return `<p class="digest-bullet">${renderInline(line.slice(2))}</p>`;
      }

      return `<p>${renderInline(line)}</p>`;
    })
    .join("");
};

const mentorshipAvailabilityText =
  "Olá, Fabricio. Tenho interesse na Mentoria Dataprev para Desenvolvimento de Software e gostaria de verificar a disponibilidade da turma.";

const dataprevMentorship = {
  cta: {
    primary: "Quero reversar minha vaga",
    final: "Falar com o mentor pelo WhatsApp",
  },
  heroFacts: [
    ["11/10/2026", "data prevista da prova"],
    ["75 de 115", "pontos em conhecimentos específicos"],
    ["até 7", "participantes por turma"],
    ["até a prova", "acompanhamento e ajustes de rota"],
  ],
  authority: [
    "Analista de Informática do Senado Federal",
    "Professor de Ciência da Computação",
    "Aprovado em três concursos de TI",
    "Mais de 20 anos em engenharia de software",
  ],
  painPoints: [
    {
      title: "Edital técnico e extenso",
      text: "Mais de 100 tópicos dificultam saber por onde começar e qual profundidade cada assunto exige.",
    },
    {
      title: "Rotina de trabalho intensa",
      text: "Quem trabalha com tecnologia precisa encaixar a preparação em poucas horas disponíveis.",
    },
    {
      title: "Base prática diferente da cobrança da banca",
      text: "Saber desenvolver software não significa conhecer o modo como a FGV transforma conceitos em questões.",
    },
    {
      title: "Muitos materiais, pouca direção",
      text: "Cursos, vídeos, PDFs e questões em excesso podem aumentar a dispersão em vez de acelerar o estudo.",
    },
  ],
  process: [
    ["Diagnóstico inicial", "Avaliação da base técnica, disponibilidade semanal e principais dificuldades."],
    ["Priorização do edital", "Classificação dos tópicos por relevância, dificuldade e necessidade de aprofundamento."],
    ["Cronograma individual", "Definição das metas semanais de teoria, revisão e questões."],
    ["Encontros e simulados", "Orientação ao vivo, treinamento no padrão FGV e correção dos erros."],
    ["Monitoramento e ajuste de rota", "Revisão do desempenho e adaptação do plano conforme a evolução."],
    ["Reta final", "Revisão orientada pelos erros e definição da estratégia para a prova."],
  ],
  deliverables: [
    {
      title: "Diagnóstico de partida",
      label: "Entregue na primeira semana",
      text:
        "Você começa sabendo quais blocos do edital já domina, quais precisam de reforço e onde o estudo deve gerar mais ganho de desempenho.",
      preview: ["Base técnica", "Horas disponíveis", "Lacunas críticas", "Plano inicial"],
    },
    {
      title: "Matriz de prioridade do edital",
      label: "Baseada no edital FGV",
      text:
        "Os tópicos de Desenvolvimento de Software são organizados por peso, dificuldade e risco, para você parar de tratar todo assunto como se tivesse a mesma importância.",
      preview: ["Java e Spring", "Testes", "Segurança", "Dados e DevOps"],
    },
    {
      title: "Cronograma de execução até a prova",
      label: "Personalizado por rotina",
      text:
        "Cada semana vira uma sequência objetiva de teoria, revisão, questões e simulado, ajustada à sua disponibilidade real de estudo.",
      preview: ["Meta semanal", "Revisão", "Questões FGV", "Simulado"],
    },
    {
      title: "Caderno de treino por tópico",
      label: "Foco no padrão da banca",
      text:
        "As questões deixam de ser aleatórias: o treino acompanha os temas priorizados e ajuda a transformar erro em revisão direcionada.",
      preview: ["APIs REST", "SQL", "OWASP", "CI/CD"],
    },
    {
      title: "Painel de evolução e rota",
      label: "Acompanhamento contínuo",
      text:
        "A preparação passa a ter leitura objetiva: acertos, erros recorrentes, temas travados e próximos ajustes antes da reta final.",
      preview: ["Acertos", "Erros recorrentes", "Temas travados", "Próxima ação"],
    },
    {
      title: "Ferramentas visuais de revisão",
      label: "Diagramas, mapas e infográficos",
      text:
        "Conceitos densos de arquitetura, segurança, testes, dados e DevOps são organizados em diagramas, mapas mentais e infográficos para acelerar revisão e conexão entre assuntos.",
      preview: ["Diagramas", "Mapas mentais", "Fluxos", "Infográficos"],
    },
  ],
  benefits: [
    ["Turma de até sete participantes", "Número limitado para permitir acompanhamento real da evolução e das dúvidas."],
    ["Encontros ao vivo e gravados", "Orientação semanal, correção de rota e gravação disponível para revisão."],
    ["Cronograma personalizado", "Metas ajustadas à sua base, rotina e disponibilidade semanal."],
    ["Materiais de revisão", "Resumos e mapas mentais dos tópicos priorizados pela mentoria, elaborados e recomendados conforme a turma."],
    ["Simulados e questões", "Treino no padrão FGV, organizado por assunto e acompanhado por indicadores de desempenho."],
    ["Suporte pelo WhatsApp", "Canal para dúvidas, orientações e ajustes durante a semana."],
  ],
  comparison: [
    ["Estuda os tópicos na ordem do edital", "Estuda segundo prioridade e peso"],
    ["Usa materiais dispersos", "Recebe uma trilha organizada"],
    ["Mede evolução apenas por sensação", "Acompanha questões e simulados"],
    ["Mantém o mesmo plano mesmo com baixo rendimento", "Ajusta a rota com base nos erros"],
    ["Depende de motivação para avançar", "Trabalha com metas semanais"],
  ],
  mentorProof: [
    "Analista de Informática Legislativa do Senado Federal",
    "Professor de Ciência da Computação e Engenharia de Software",
    "Aprovado para Analista de Informática do Senado Federal",
    "Aprovado para Analista de Sistemas da Eletronuclear",
    "Aprovado para Perito de Informática da Polícia Civil do Rio de Janeiro",
    "Mais de 20 anos em engenharia de software",
  ],
  trajectory: [
    "Bacharel em Ciência da Computação (UFRJ)",
    "Especialista em Tecnologia da Informação Aplicada ao Poder Legislativo (ILB)",
    "Especialista em Processamento de Linguagem Natural (UFG)",
    "Mestrando em Ciência de Dados e Inteligência Artificial (IDP)",
  ],
  testimonials: [
    {
      quote:
        "Antes da orientação eu tinha dificuldade em transformar um edital grande em rotina. Com cronograma e acompanhamento, passei a saber o que estudar e revisar a cada semana.",
      author: "Yuri",
      approval: "Aprovado para Agente de Tecnologia do Banco do Brasil — 2023",
    },
    {
      quote:
        "O acompanhamento deu direção para priorizar o que mais importava, revisar com método e manter constância até a prova.",
      author: "Luiz",
      approval: "Aprovado em concurso público de TI",
    },
    {
      quote:
        "A orientação conectou o conteúdo técnico do edital com exemplos práticos de desenvolvimento, testes, arquitetura e sistemas reais.",
      author: "Renata",
      approval: "Aprovada na área de tecnologia",
    },
  ],
  offerItems: [
    "Encontros ao vivo até a prova",
    "Cronograma personalizado",
    "Simulados e questões por tópico",
    "Materiais de revisão",
    "Suporte durante a semana",
    "Turma de até sete participantes",
    "Garantia de 14 dias",
  ],
  pricing: {
    regular: "R$ 997",
    alumni: "R$ 697",
    installments: "em até 3x",
    alumniLabel: "ex-alunos e ex-mentorados",
  },
  urgency: [
    "Inscrições do concurso encerram em 06/08/2026.",
    "Prova prevista para 11/10/2026.",
    "A turma será encerrada quando as sete vagas forem preenchidas.",
  ],
  editalFacts: [
    "Concurso Público Dataprev 2026, Edital 001/2026, organizado pela FGV.",
    "Perfil 3: Desenvolvimento de Software, com vagas imediatas em Fortaleza, João Pessoa, Natal e Florianópolis, além de cadastro de reserva em outras capitais.",
    "Prova objetiva prevista para 11 de outubro de 2026, com 70 questões e peso alto em conhecimentos específicos.",
    "Conteúdo amplo: Java, Java EE/Jakarta EE, Spring, testes, APIs, arquitetura, DevOps, dados, segurança, BI e governança de TI.",
  ],
  editalTimeline: [
    ["03/07/2026", "Publicação do edital"],
    ["06/07/2026", "Abertura das inscrições"],
    ["06/08/2026", "Encerramento das inscrições"],
    ["07/08/2026", "Último dia para boleto"],
    ["11/10/2026", "Prova objetiva"],
  ],
  faq: [
    {
      question: "A mentoria substitui curso completo de teoria?",
      answer:
        "Não. A mentoria ajuda você a decidir o que priorizar, como revisar, quais questões resolver e como conectar os temas técnicos a exemplos práticos.",
    },
    {
      question: "Preciso já programar bem em Java?",
      answer:
        "Não precisa dominar tudo, mas precisa estudar com consistência. O diagnóstico inicial indicará onde aprofundar e quais lacunas atacar primeiro.",
    },
    {
      question: "A turma é só para Desenvolvimento de Software?",
      answer:
        "Sim. O foco no Perfil 3 evita dispersão e permite trabalhar Java, engenharia de software, dados, segurança, DevOps e governança com prioridade para essa prova.",
    },
    {
      question: "Há garantia de aprovação?",
      answer:
        "Não. Aprovação depende de execução, base prévia, constância e desempenho no dia da prova. O compromisso é entregar método, orientação e acompanhamento.",
    },
  ],
};

const projectLanding = {
  pt: {
    nav: ["Soluções", "Como funciona", "Pacotes", "Contato"],
    labels: {
      positioning: "Posicionamento",
      solutions: "Soluções",
      process: "Processo",
      packages: "Pacotes de entrega",
      success: "Casos de sucesso",
      risk: "Redução de risco",
      leadership: "Liderança técnica",
      skills: "Competências",
      faq: "FAQ",
      contact: "Próximo passo",
    },
    switchLabel: "English",
    heroEyebrow: "Desenvolvimento de software sob demanda",
    heroTitle:
      "Transforme seu problema em um MVP, API, automação ou solução com IA com escopo claro e entrega previsível.",
    heroText:
      "Receba uma solução de software com preço fixo, escopo definido e sem surpresas de entrega.",
    heroCta: "Falar no WhatsApp",
    secondaryCta: "Ver pacotes",
    heroNote: "Primeira etapa fixa: 1 semana, até 5 encontros, R$ 3.000.",
    stats: [
      ["20+", "anos de experiência em engenharia, liderança e arquitetura"],
      ["60+", "engenheiros liderados em sistemas críticos institucionais"],
      ["4 semanas", "por ciclo de entrega com escopo e valor combinados"],
    ],
    problemTitle: "Para quem esta oferta foi criada",
    problemText:
      "Para empresas que precisam contratar desenvolvimento de software com previsibilidade: sem proposta vaga, sem horas abertas e sem incerteza sobre o que será entregue. Antes de construir, a equipe entende o problema, organiza prioridades e transforma o projeto em um plano executável.",
    processTitle: "Um fluxo simples para reduzir risco",
    steps: [
      {
        title: "1. Discovery Sprint",
        text: "Em 1 semana, até 5 encontros para entender o problema, mapear requisitos, riscos, integrações e prioridades. Entrega: relatório detalhado e plano de trabalho.",
      },
      {
        title: "2. Backlog e acordo de entrega",
        text: "O escopo do primeiro ciclo é definido com clareza: funcionalidades, critérios de aceite, responsabilidades, dependências e indicadores de sucesso.",
      },
      {
        title: "3. Ciclos de 4 semanas",
        text: "A equipe executa o ciclo com práticas inspiradas no Scrum, acompanhamento frequente, testes, revisão técnica e demonstração do que foi entregue.",
      },
    ],
    discoveryTitle: "Etapa inicial obrigatória",
    discoveryName: "Discovery Sprint",
    discoveryPrice: { pt: "R$ 3.000", en: "US$ 500" },
    discoveryDuration: "1 semana",
    discoveryDescription:
      "A forma mais segura de começar. O cliente paga uma etapa fixa para receber clareza antes de assumir um ciclo maior de desenvolvimento.",
    discoveryItems: [
      "Até 5 encontros remotos",
      "Entendimento do problema e objetivos de negócio",
      "Levantamento de requisitos, riscos e integrações",
      "Priorização inicial do produto",
      "Plano de trabalho para desenvolvimento da solução",
    ],
    packagesTitle: "Escolha o ciclo certo para o seu momento",
    packagesText:
      "Todos os pacotes têm duração fixa de 4 semanas. A melhor escolha depende da urgência, da complexidade técnica e do volume de funcionalidades desejado.",
    packagesNote:
      "Os papéis podem atuar de forma dedicada ou parcial conforme o escopo aprovado; o compromisso é com a entrega do ciclo, não com alocação aberta por horas.",

    successTitle: "Casos de sucesso",
    successText:
      "Alguns exemplos mostram como a equipe transforma requisitos em software pronto para uso, com foco em valor de negócio e entrega técnica consistente.",
    successCase: {
      name: "Todo List Multiusuário",
      summary:
        "Aplicação full-stack de gestão de tarefas para múltiplos usuários, com autenticação, isolamento por conta, visão Kanban e tabela, ordenação, filtragem, arquivamento, exclusão e drag-and-drop para mudança de status.",
      problem:
        "Resolver a necessidade de organizar tarefas individuais com segurança, separação de dados por usuário e uma experiência simples para uso diário em ambiente web.",
      stack: [
        "Java",
        "Spring Boot",
        "Spring Security",
        "JPA",
        "REST APIs",
        "JWT",
        "Flyway",
        "PostgreSQL",
        "Angular",
        "Bootstrap",
        "GitHub Actions",
        "Playwright",
        "Prometheus",
        "Grafana",
        "Loki",
        "Tempo",
      ],
    },
    packages: [
      {
        name: "Essential Delivery",
        price: { pt: "R$ 12.000", en: "US$ 2,000" },
        tag: "Para MVPs e módulos objetivos",
        description:
          "Ideal quando o problema está bem delimitado e a empresa precisa de uma entrega sólida, testável e pronta para evoluir.",
        team: "Scrum Master e 1 engenheiro full-stack.",
        includes: [
          "Backlog do ciclo",
          "Desenvolvimento full-stack",
          "Testes e validações dentro do escopo",
          "Deploy e acompanhamento técnico",
        ],
      },
      {
        name: "Product Acceleration",
        price: { pt: "R$ 24.000", en: "US$ 4,000" },
        tag: "Escolha recomendada",
        description:
          "Para empresas que precisam acelerar a construção de um produto, API ou integração com mais capacidade de desenvolvimento e refinamento.",
        team: "Scrum Master, 2 engenheiros full-stack e 1 engenheiro com foco em testes, DevOps, observabilidade e deploy.",
        includes: [
          "Mais velocidade de entrega",
          "Revisão técnica do ciclo",
          "Testes e CI/CD",
          "Demonstração e relatório do ciclo",
        ],
        featured: true,
      },
      {
        name: "Scale & Intelligence",
        price: { pt: "R$ 36.000", en: "US$ 6,000" },
        tag: "Para projetos críticos ou com IA",
        description:
          "Para soluções com maior complexidade, integrações relevantes, automação avançada, requisitos de segurança ou componentes de inteligência artificial.",
        team: "Líder técnico, Scrum Master, 2 engenheiros full-stack e 1 engenheiro com foco em testes, DevOps, observabilidade e deploy.",
        includes: [
          "Arquitetura evolutiva",
          "Automação e IA quando aplicável",
          "Observabilidade e segurança",
          "Plano técnico de escala",
        ],
      },
    ],
    leadershipTitle: "Liderança técnica com experiência real em sistemas críticos",
    leadershipText:
      "Fabricio Santana atua como responsável técnico, líder e gestor dos projetos. Sua experiência inclui coordenação de times com mais de 60 engenheiros, sistemas críticos para o processo legislativo brasileiro, transformação digital, aplicações móveis, fluxos sem papel, automação, segurança, testes e iniciativas de inteligência artificial.",
    leadershipBullets: [
      "Coordenação de projetos complexos e comunicação entre negócio e tecnologia",
      "Arquitetura, backend, APIs, integrações, segurança e qualidade",
      "Experiência acadêmica em Engenharia de Software e Ciência da Computação",
      "Práticas modernas de engenharia para software seguro, testável e sustentável",
    ],
    useCasesTitle: "O que a equipe pode construir para sua empresa",
    useCasesText:
      "A oferta é especialmente adequada para projetos que precisam sair do plano e virar software funcional, com código organizado, testes e implantação.",
    useCases: [
      "MVPs e produtos web",
      "APIs REST e backends Java/Spring Boot",
      "Ferramentas internas e dashboards",
      "Integrações entre sistemas e bancos de dados",
      "Automação de processos manuais",
      "Aplicações com inteligência artificial",
      "Testes automatizados e qualidade contínua",
      "Melhorias de arquitetura e segurança",
    ],
    riskTitle: "Menos risco para contratar desenvolvimento remoto",
    riskItems: [
      "Escopo do ciclo definido antes da execução",
      "Critérios de aceite claros para cada funcionalidade",
      "Demonstrações frequentes do que foi entregue",
      "Código versionado em repositório Git",
      "Testes automatizados quando aplicável",
      "Deploy, observabilidade e acompanhamento técnico",
      "Você mantém a propriedade do código produzido",
      "Sem cobrança aberta por horas indefinidas",
    ],
    faqTitle: "Perguntas frequentes",
    faqs: [
      {
        question: "A equipe trabalha com clientes internacionais?",
        answer:
          "Sim. A comunicação pode ser feita em inglês, com reuniões remotas e alinhamentos adequados a clientes internacionais.",
      },
      {
        question: "Os valores em dólar são fixos?",
        answer:
          "Na versão em inglês, os valores são apresentados em dólar. A contratação pode ser ajustada conforme a plataforma usada.",
      },
      {
        question: "O cliente é dono do código?",
        answer:
          "Sim. O código produzido para o projeto pertence ao cliente, conforme as condições acordadas na contratação.",
      },
      {
        question: "O projeto precisa começar pelo Discovery Sprint?",
        answer:
          "Sim. Essa etapa reduz risco, organiza o escopo e permite recomendar o pacote certo antes de iniciar um ciclo maior.",
      },
      {
        question: "Quais canais de comunicação são usados?",
        answer:
          "WhatsApp, email, reuniões remotas e, quando necessário, ferramentas do próprio cliente ou da plataforma de contratação.",
      },
      {
        question: "O trabalho inclui implantação?",
        answer:
          "Sim, os pacotes consideram suporte técnico para implantação e acompanhamento dentro do escopo acordado para o ciclo.",
      },
    ],
    techTitle: "Principais tecnologias e competências",
    techs: [
      "Java",
      "Spring Boot",
      "Backend Development",
      "REST APIs",
      "Software Architecture",
      "System Integration",
      "PostgreSQL",
      "Oracle Database",
      "SQL",
      "Angular",
      "Bootstrap",
      "Git",
      "Docker",
      "CI/CD",
      "GitHub Actions",
      "Automated Testing",
      "JUnit",
      "Cucumber",
      "Playwright",
      "Agile Methodologies",
      "Scrum",
      "Cybersecurity",
      "Artificial Intelligence",
    ],
    finalTitle: "Vamos transformar sua necessidade em um plano de entrega claro?",
    finalText:
      "Comece pelo Discovery Sprint. Em uma semana, sua empresa recebe clareza técnica, plano de trabalho e uma recomendação objetiva sobre o melhor ciclo de desenvolvimento.",
  },
  en: {
    nav: ["Solutions", "How it works", "Packages", "Contact"],
    labels: {
      positioning: "Positioning",
      solutions: "Solutions",
      process: "Process",
      packages: "Delivery packages",
      success: "Success cases",
      risk: "Risk reduction",
      leadership: "Technical leadership",
      skills: "Skills",
      faq: "FAQ",
      contact: "Next step",
    },
    switchLabel: "Português",
    heroEyebrow: "Custom software development",
    heroTitle:
      "Get your MVP, API, automation, or AI solution built with clear scope and fixed delivery.",
    heroText:
      "Fixed pricing. Clear milestones. No scope drift. Built for clients who need software shipped on time and without surprises.",
    heroCta: "Contact on WhatsApp",
    secondaryCta: "See packages",
    heroNote: "First fixed step: 1 week, up to 5 meetings, US$ 500.",
    stats: [
      ["20+", "years in engineering, technical leadership, and architecture"],
      ["60+", "engineers led in mission-critical institutional systems"],
      ["4 weeks", "per delivery cycle with agreed scope and fixed price"],
    ],
    problemTitle: "If you need software delivered without surprises",
    problemText:
      "This offer is for clients who want a clear scope, fixed price, and a delivery process that stays aligned from day one to final handoff.",
    processTitle: "A simple flow to reduce risk",
    steps: [
      {
        title: "1. Discovery Sprint",
        text: "In 1 week, up to 5 meetings to understand the problem, map requirements, risks, integrations, and priorities. Deliverable: a detailed report and work plan.",
      },
      {
        title: "2. Backlog and delivery agreement",
        text: "The first cycle scope is clearly defined: features, acceptance criteria, responsibilities, dependencies, and success indicators.",
      },
      {
        title: "3. Four-week delivery cycles",
        text: "The team executes the cycle with Scrum-inspired practices, frequent alignment, testing, technical review, and a demo of what was delivered.",
      },
    ],
    discoveryTitle: "Required first step",
    discoveryName: "Discovery Sprint",
    discoveryPrice: { pt: "R$ 3.000", en: "US$ 500" },
    discoveryDuration: "1 week",
    discoveryDescription:
      "The safest way to start. The client pays for a fixed step to gain clarity before committing to a larger development cycle.",
    discoveryItems: [
      "Up to 5 remote meetings",
      "Problem and business-goal understanding",
      "Requirements, risks, and integrations mapping",
      "Initial product prioritization",
      "Work plan for solution development",
    ],
    packagesTitle: "Pick the delivery cycle that fits your budget",
    packagesText:
      "Every package runs for 4 weeks. Choose the one that matches your scope, urgency, and the amount of product you need to ship now.",
    packagesNote:
      "Roles may be dedicated or part-time depending on the approved scope; the commitment is to the delivery cycle, not open-ended hourly allocation.",

    successTitle: "Success cases",
    successText:
      "A sample project that shows how a clear problem turns into working software with secure access, task organization, and a simple daily workflow.",
    successCase: {
      name: "Multi-user Todo List",
      summary:
        "Full-stack task management app for multiple users with secure login, isolated data per account, table and Kanban views, filtering, sorting, archiving, deletion, and drag-and-drop status updates.",
      problem:
        "Replaces scattered task handling with a simple web app where each user sees only their own data and can manage work quickly.",
      stack: [
        "Java",
        "Spring Boot",
        "Spring Security",
        "JPA",
        "REST APIs",
        "JWT",
        "Flyway",
        "PostgreSQL",
        "Angular",
        "Bootstrap",
        "GitHub Actions",
        "Playwright",
        "Prometheus",
        "Grafana",
        "Loki",
        "Tempo",
      ],
    },
    packages: [
      {
        name: "Essential Delivery",
        price: { pt: "R$ 12.000", en: "US$ 2,000" },
        tag: "For MVPs and focused modules",
        description:
          "Best for a focused MVP or module that needs to ship with quality and room to evolve.",
        team: "Scrum Master and 1 full-stack engineer.",
        includes: [
          "Cycle backlog",
          "Full-stack development",
          "Testing and validation within scope",
          "Deployment and technical follow-up",
        ],
      },
      {
        name: "Product Acceleration",
        price: { pt: "R$ 24.000", en: "US$ 4,000" },
        tag: "Recommended choice",
        description:
          "For teams that need faster shipping of a product, API, or integration without losing control of scope.",
        team: "Scrum Master, 2 full-stack engineers, and 1 engineer focused on test automation, DevOps, observability, and deployment.",
        includes: [
          "More delivery capacity",
          "Cycle technical review",
          "Testing and CI/CD",
          "Cycle demo and report",
        ],
        featured: true,
      },
      {
        name: "Scale & Intelligence",
        price: { pt: "R$ 36.000", en: "US$ 6,000" },
        tag: "For critical or AI projects",
        description:
          "For more complex builds with integrations, automation, security needs, or AI components.",
        team: "Technical lead, Scrum Master, 2 full-stack engineers, and 1 engineer focused on test automation, DevOps, observability, and deployment.",
        includes: [
          "Evolutionary architecture",
          "Automation and AI when applicable",
          "Observability and security",
          "Technical scale plan",
        ],
      },
    ],
    leadershipTitle: "Technical leadership you can trust",
    leadershipText:
      "Fabricio Santana leads delivery, architecture, and execution. His background includes large engineering teams, critical systems, digital transformation, automation, security, testing, and AI initiatives.",
    leadershipBullets: [
      "Coordination of complex projects and communication between business and technology",
      "Architecture, backend, APIs, integrations, security, and quality",
      "Academic experience in Software Engineering and Computer Science",
      "Modern engineering practices for secure, testable, and maintainable software",
    ],
    useCasesTitle: "What the team can build for your company",
    useCasesText:
      "Built for products, internal tools, automations, integrations, and AI features that need to move from idea to shipped software.",
    useCases: [
      "MVPs and web products",
      "REST APIs and Java/Spring Boot backends",
      "Internal tools and dashboards",
      "System and database integrations",
      "Manual process automation",
      "Artificial intelligence applications",
      "Automated testing and continuous quality",
      "Architecture and security improvements",
    ],
    riskTitle: "Lower risk when hiring remote development",
    riskItems: [
      "Cycle scope agreed before execution",
      "Clear acceptance criteria for each feature",
      "Frequent demos of delivered work",
      "Code versioned in a Git repository",
      "Automated tests when applicable",
      "Deployment, observability, and technical follow-up",
      "You keep ownership of the produced code",
      "No open-ended hourly billing",
    ],
    faqTitle: "Frequently asked questions",
    faqs: [
      {
        question: "Does the team work with US clients?",
        answer:
          "Yes. Communication can be handled in English, with remote meetings and alignment suitable for international clients.",
      },
      {
        question: "Are the dollar prices fixed?",
        answer:
          "In the English version, the prices are presented in USD. Contract details can be adjusted according to the platform used.",
      },
      {
        question: "Does the client own the code?",
        answer:
          "Yes. The code produced for the project belongs to the client, according to the conditions agreed during contracting.",
      },
      {
        question: "Does the project need to start with the Discovery Sprint?",
        answer:
          "Yes. This step reduces risk, organizes scope, and makes it possible to recommend the right package before starting a larger cycle.",
      },
      {
        question: "Which communication channels are used?",
        answer:
          "WhatsApp, email, remote meetings, and, when needed, the client’s own tools or the hiring platform.",
      },
      {
        question: "Is deployment included?",
        answer:
          "Yes, the packages include technical support for deployment and follow-up within the agreed cycle scope.",
      },
    ],
    techTitle: "Core technologies and skills",
    techs: [
      "Java",
      "Spring Boot",
      "Backend Development",
      "REST APIs",
      "Software Architecture",
      "System Integration",
      "PostgreSQL",
      "Oracle Database",
      "SQL",
      "Angular",
      "Bootstrap",
      "Git",
      "Docker",
      "CI/CD",
      "GitHub Actions",
      "Automated Testing",
      "JUnit",
      "Cucumber",
      "Playwright",
      "Agile Methodologies",
      "Scrum",
      "Cybersecurity",
      "Artificial Intelligence",
    ],
    finalTitle: "Ready to move your project forward?",
    finalText:
      "Start with the Discovery Sprint and get a clear plan before you commit to a larger build.",
  },
};

const ProjectsLanding = () => {
  const [language, setLanguage] = useState("en");
  const content = projectLanding[language];

  return (
    <main className="site-shell projects-page">
      <header className="site-header projects-header">
        <a className="brand" href="/" aria-label="Fabricio Santana">
          Fabricio Santana
        </a>
        <nav className="nav-links" aria-label="Projects navigation">
          <a href="#solucoes">{content.nav[0]}</a>
          <a href="#como-funciona">{content.nav[1]}</a>
          <a href="#pacotes">{content.nav[2]}</a>
          <a href="#contato">{content.nav[3]}</a>
          <button
            className="language-toggle"
            type="button"
            onClick={() => setLanguage(language === "pt" ? "en" : "pt")}
          >
            {content.switchLabel}
          </button>
        </nav>
      </header>
      <section className="projects-hero">
        <div className="projects-hero-copy">
          <p className="eyebrow">{content.heroEyebrow}</p>
          <h1>{content.heroTitle}</h1>
          <p className="projects-lead">{content.heroText}</p>
        </div>
        <aside className="hero-proof" aria-label="Experience highlights">
          <div className="hero-proof-title">{content.labels.contact}</div>
          {content.stats.map(([value, label]) => (
            <div className="proof-item" key={value}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
          <div className="hero-proof-actions">
            <a className="button primary" href={whatsappUrl} target="_blank" rel="noreferrer">
              {content.heroCta}
            </a>
          </div>
        </aside>
      </section>
      <section className="projects-section split-section">
        <div>
          <p className="eyebrow">{content.labels.positioning}</p>
          <h2>{content.problemTitle}</h2>
        </div>
        <p className="large-copy">{content.problemText}</p>
      </section>
      <section className="projects-section use-cases-section" id="solucoes">
        <div className="section-heading wide-heading">
          <p className="eyebrow">{content.labels.solutions}</p>
          <h2>{content.useCasesTitle}</h2>
          <p>{content.useCasesText}</p>
        </div>
        <div className="use-case-grid">
          {content.useCases.map((item) => (
            <article className="use-case-card" key={item}>
              <h3>{item}</h3>
            </article>
          ))}
        </div>
      </section>
      <section className="projects-section" id="como-funciona">
        <div className="section-heading wide-heading">
          <p className="eyebrow">{content.labels.process}</p>
          <h2>{content.processTitle}</h2>
        </div>
        <div className="process-grid">
          {content.steps.map((step) => (
            <article className="process-card" key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="projects-section discovery-band">
        <div>
          <p className="eyebrow">{content.discoveryTitle}</p>
          <h2>{content.discoveryName}</h2>
          <p>{content.discoveryDescription}</p>
        </div>
        <div className="discovery-card">
          <div className="price-row">
            <strong>{formatPrice(content.discoveryPrice, language)}</strong>
            <span>{content.discoveryDuration}</span>
          </div>
          <ul>
            {content.discoveryItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
      <section className="projects-section" id="pacotes">
        <div className="section-heading wide-heading">
          <p className="eyebrow">{content.labels.packages}</p>
          <h2>{content.packagesTitle}</h2>
          <p>{content.packagesText}</p>
          <p className="packages-note">{content.packagesNote}</p>
        </div>
        <div className="pricing-grid">
          {content.packages.map((item) => (
            <article className={`pricing-card${item.featured ? " featured" : ""}`} key={item.name}>
              <span className="package-tag">{item.tag}</span>
              <h3>{item.name}</h3>
              <div className="package-price">{formatPrice(item.price, language)}</div>
              <p>{item.description}</p>
              <strong className="team-line">{item.team}</strong>
              <ul>
                {item.includes.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <a className="button primary" href={whatsappUrl} target="_blank" rel="noreferrer">
                {content.heroCta}
              </a>
            </article>
          ))}
        </div>
      </section>
      <section className="projects-section success-section">
        <div className="section-heading wide-heading">
          <p className="eyebrow">{content.labels.success}</p>
          <h2>{content.successTitle}</h2>
          <p>{content.successText}</p>
        </div>
        <article className="success-case-card">
          <div className="success-case-header">
            <div>
              <p className="success-case-kicker">{content.successCase.name}</p>
              <h3>{content.successCase.summary}</h3>
            </div>
          </div>
          <p>{content.successCase.problem}</p>
          <div className="success-stack">
            {content.successCase.stack.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </article>
      </section>
      <section className="projects-section risk-section">
        <div className="section-heading wide-heading">
          <p className="eyebrow">{content.labels.risk}</p>
          <h2>{content.riskTitle}</h2>
        </div>
        <div className="risk-grid">
          {content.riskItems.map((item) => (
            <div className="risk-item" key={item}>
              {item}
            </div>
          ))}
        </div>
      </section>
      <section className="projects-section split-section">
        <div>
          <p className="eyebrow">{content.labels.leadership}</p>
          <h2>{content.leadershipTitle}</h2>
        </div>
        <div>
          <p className="large-copy">{content.leadershipText}</p>
          <ul className="check-list">
            {content.leadershipBullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
      <section className="projects-section tech-section" id="tecnologias">
        <div className="section-heading wide-heading">
          <p className="eyebrow">{content.labels.skills}</p>
          <h2>{content.techTitle}</h2>
        </div>
        <div className="tech-cloud">
          {content.techs.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
      </section>
      <section className="projects-section faq-section">
        <div className="section-heading wide-heading">
          <p className="eyebrow">{content.labels.faq}</p>
          <h2>{content.faqTitle}</h2>
        </div>
        <div className="faq-grid">
          {content.faqs.map((item) => (
            <article className="faq-item" key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="projects-final" id="contato">
        <p className="eyebrow">{content.labels.contact}</p>
        <h2>{content.finalTitle}</h2>
        <p>{content.finalText}</p>
        <div className="final-actions">
          <a className="button primary" href={whatsappUrl} target="_blank" rel="noreferrer">
            {content.heroCta}: +55 61 98233-6222
          </a>
        </div>
      </section>
      <footer className="site-footer">
        <p>Fabricio Santana</p>
        <a href="mailto:fabricio.santana@gmail.com">fabricio.santana@gmail.com</a>
      </footer>
    </main>
  );
};

const trackMentorshipEvent = (eventName, details = {}) => {
  if (typeof window === "undefined") {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...details });
};

const DataprevMentorshipLanding = () => {
  const [selectedDeliverable, setSelectedDeliverable] = useState(null);
  const [showMobileCta, setShowMobileCta] = useState(false);
  const editalUrl =
    "https://conhecimento.fgv.br/sites/default/files/concursos/dataprev_-_edital_no_01-2026_-_abertura_-_final_0.pdf";
  const searchParams = typeof window !== "undefined" ? window.location.search : "";
  const dataprevWhatsappUrl = `${whatsappUrl}?text=${encodeURIComponent(
    mentorshipAvailabilityText
  )}${searchParams ? `&${searchParams.slice(1)}` : ""}`;

  React.useEffect(() => {
    const title = "Mentoria Dataprev 2026 para Desenvolvimento de Software | Fabricio Santana";
    const description =
      "Mentoria em turma de até sete participantes para o Perfil 3 da Dataprev, com diagnóstico, cronograma personalizado, encontros ao vivo, simulados e acompanhamento até a prova.";

    document.title = title;

    const upsertMeta = (selector, attributes) => {
      let element = document.head.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        document.head.appendChild(element);
      }
      Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
    };

    upsertMeta('meta[name="description"]', { name: "description", content: description });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: title });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: description });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: profilePhoto });
    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: profilePhoto });

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `${window.location.origin}/mentoria-dataprev`);

    let structuredData = document.getElementById("mentorship-structured-data");
    if (!structuredData) {
      structuredData = document.createElement("script");
      structuredData.setAttribute("type", "application/ld+json");
      structuredData.setAttribute("id", "mentorship-structured-data");
      document.head.appendChild(structuredData);
    }
    structuredData.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Course",
      name: "Mentoria Dataprev 2026 para Desenvolvimento de Software",
      description,
      provider: {
        "@type": "Person",
        name: "Fabricio Santana",
      },
      offers: {
        "@type": "Offer",
        price: "997",
        priceCurrency: "BRL",
        availability: "https://schema.org/LimitedAvailability",
      },
    });

    trackMentorshipEvent("mentorship_hero_view");

    const updateStickyCta = () => {
      const investmentSection = document.getElementById("investimento");
      const pastHero = window.scrollY > window.innerHeight * 0.65;
      const nearInvestment = investmentSection
        ? investmentSection.getBoundingClientRect().top < window.innerHeight * 0.85
        : false;
      setShowMobileCta(pastHero && !nearInvestment);
    };

    updateStickyCta();
    window.addEventListener("scroll", updateStickyCta, { passive: true });
    return () => window.removeEventListener("scroll", updateStickyCta);
  }, []);

  const handleCtaClick = (name) => () => trackMentorshipEvent(name, { page: "mentoria_dataprev" });
  const openDeliverable = (item) => {
    setSelectedDeliverable(item);
    trackMentorshipEvent("mentorship_deliverable_open", { deliverable: item.title });
  };

  return (
    <main className="site-shell projects-page mentorship-page">
      <header className="site-header projects-header mentorship-header">
        <a className="brand" href="/" aria-label="Fabricio Santana">
          Fabricio Santana
        </a>
        <nav className="nav-links mentorship-nav" aria-label="Navegação da mentoria Dataprev">
          <a href="#problema">Problema</a>
          <a href="#como-funciona">Como funciona</a>
          <a href="#entregaveis">Entregáveis</a>
          <a href="#perfil">Mentor</a>
          <a href="#investimento">Investimento</a>
        </nav>
      </header>

      <section className="projects-hero mentorship-hero" id="inicio">
        <div className="projects-hero-copy">
          <p className="eyebrow">Mentoria Dataprev — Perfil 3: Desenvolvimento de Software</p>
          <h2>Prepare-se para o concurso da Dataprev com um plano de estudos estruturado e orientação de quem já foi aprovado em concursos de TI.</h2>
          <p className="projects-lead">
            Transforme mais de 100 tópicos do edital em um plano de estudos estruturado, com
            diagnóstico inicial, cronograma personalizado, simulados e acompanhamento em uma turma de
            até sete participantes.
          </p>
          <div className="mentorship-hero-facts" aria-label="Resumo da mentoria">
            {dataprevMentorship.heroFacts.map(([value, label]) => (
              <span key={value}>
                <strong>{value}</strong> {label}
              </span>
            ))}
          </div>
          <div className="projects-actions">
            <a
              className="button primary"
              href={dataprevWhatsappUrl}
              target="_blank"
              rel="noreferrer"
              onClick={handleCtaClick("mentorship_primary_cta_click")}
            >
              {dataprevMentorship.cta.primary}
            </a>
          </div>
        </div>
        <aside className="mentorship-hero-photo" aria-label="Fabricio Santana, mentor da turma">
          <img src={profilePhoto} alt="Fabricio Santana" loading="eager" />
          <p>Fabricio Santana já foi aprovado em vários concursos, hoje é Analista de Informática do Senado.</p>
        </aside>
      </section>

      <section className="projects-section mentorship-problem-section" id="problema">
        <div className="section-heading wide-heading">
          <p className="eyebrow">O problema</p>
          <h2>O maior risco não é estudar pouco. É estudar errado.</h2>
          <p>
            Esta mentoria foi desenhada para quem já possui alguma base técnica, mas precisa aprender
            a transformar conhecimento profissional em desempenho na prova.
          </p>
        </div>
        <div className="mentorship-pain-grid">
          {dataprevMentorship.painPoints.map((item) => (
            <article className="use-case-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
        <div className="final-actions mentorship-section-actions left-actions">
          <a className="button primary" href={dataprevWhatsappUrl} target="_blank" rel="noreferrer" onClick={handleCtaClick("mentorship_problem_cta_click")}>
            {dataprevMentorship.cta.primary}
          </a>
        </div>
      </section>

      <section className="projects-section mentorship-process-section" id="como-funciona">
        <div className="section-heading wide-heading">
          <p className="eyebrow">Como funciona</p>
          <h2>Um fluxo para transformar o edital em execução semanal.</h2>
        </div>
        <div className="mentorship-process-grid">
          {dataprevMentorship.process.map(([title, text], index) => (
            <article className="mentorship-process-card" key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="projects-section mentorship-deliverables-section" id="entregaveis">
        <div className="section-heading wide-heading">
          <p className="eyebrow">Entregáveis</p>
          <h2>Veja como a mentoria transforma o edital em execução.</h2>
          <p>Estes são os artefatos que dão forma prática à mentoria: eles mostram o que você usa para sair do edital aberto e entrar em uma rotina acompanhada até a prova.</p>
        </div>
        <div className="mentorship-deliverable-grid">
          {dataprevMentorship.deliverables.map((item) => (
            <button className="mentorship-deliverable-card" type="button" key={item.title} onClick={() => openDeliverable(item)}>
              <span>{item.label}</span>
              <h3>{item.title}</h3>
              <div className="mentorship-demo-preview" aria-hidden="true">
                {item.preview.map((previewItem) => (
                  <em key={previewItem}>{previewItem}</em>
                ))}
              </div>
              <p>{item.text}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="projects-section mentorship-benefits-section" id="beneficios">
        <div className="section-heading wide-heading">
          <p className="eyebrow">Benefícios</p>
          <h2>O que muda na sua preparação.</h2>
        </div>
        <div className="mentorship-format-grid">
          {dataprevMentorship.benefits.map(([title, text]) => (
            <article className="risk-item" key={title}>
              <strong>{title}</strong>
              <span>{text}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="projects-section mentorship-comparison-section" id="comparacao">
        <div className="section-heading wide-heading">
          <p className="eyebrow">Comparação</p>
          <h2>Preparação com mais direção e menos dispersão.</h2>
        </div>
        <div className="mentorship-comparison-table" role="table" aria-label="Comparação entre preparação sem acompanhamento e mentoria Dataprev">
          <div className="mentorship-comparison-row mentorship-comparison-head" role="row">
            <strong role="columnheader">Preparação sem acompanhamento</strong>
            <strong role="columnheader">Mentoria Dataprev</strong>
          </div>
          {dataprevMentorship.comparison.map(([solo, mentored]) => (
            <div className="mentorship-comparison-row" role="row" key={solo}>
              <span role="cell">– {solo}</span>
              <span role="cell">✓ {mentored}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="projects-section mentorship-operations-section" id="turma">
        <article className="discovery-card">
          <p className="eyebrow">Turma pequena</p>
          <h2>Por que a turma tem apenas sete participantes?</h2>
          <p>
            Porque o acompanhamento inclui análise da base, cronograma personalizado, correção de
            simulados, dúvidas e ajustes de rota. Sete participantes é o limite definido para
            preservar atenção individual sem perder os benefícios da troca em grupo.
          </p>
        </article>
        <article className="discovery-card">
          <p className="eyebrow">Dedicação esperada</p>
          <h2>Quanto tempo reservar para estudar?</h2>
          <p>
            Como referência, o participante deve conseguir reservar aproximadamente 1h30 a 2h por
            dia, ajustáveis conforme sua base e disponibilidade. O diagnóstico inicial será usado
            para construir um plano realista.
          </p>
        </article>
      </section>

      <section className="projects-section mentorship-mentor-section" id="perfil">
        <div className="mentorship-mentor-media">
          <img src={profilePhoto} alt="Fabricio Santana" loading="lazy" />
          <div className="mentorship-gallery-caption">Fabricio Santana.</div>
        </div>
        <div>
          <p className="eyebrow">Mentor</p>
          <h2>Experiência em concursos, ensino superior e engenharia de software.</h2>
          <p className="large-copy">
            Minha contribuição não é apenas ensinar técnicas de estudo. É ajudar você a compreender
            como Java, arquitetura, testes, segurança, dados e DevOps podem ser cobrados pela FGV,
            conectando teoria, experiência profissional e resolução de questões.
          </p>
          <div className="mentorship-pillar-grid">
            <span>Aprovado em concursos de TI</span>
            <span>Professor universitário</span>
            <span>20+ anos em engenharia</span>
          </div>
          <ul className="check-list mentorship-mentor-list">
            {dataprevMentorship.mentorProof.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <details className="mentorship-details">
            <summary>Ver trajetória completa</summary>
            <ul className="check-list">
              {dataprevMentorship.trajectory.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </details>
        </div>
      </section>

      <section className="projects-section mentorship-testimonials-section" id="depoimentos">
        <div className="section-heading wide-heading">
          <p className="eyebrow">Prova social</p>
          <h2>Relatos de alunos e mentorados</h2>
        </div>
        <div className="mentorship-testimonials-grid">
          {dataprevMentorship.testimonials.map((item) => (
            <article className="testimonial-card" key={`${item.author}-${item.approval}`}>
              <div className="testimonial-avatar" aria-hidden="true">{item.author[0]}</div>
              <p>“{item.quote}”</p>
              <strong>{item.author}</strong>
              <span>{item.approval}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="projects-final mentorship-registration-section" id="investimento" onMouseEnter={() => trackMentorshipEvent("mentorship_price_view")}>
        <div className="mentorship-registration-heading">
          <p className="eyebrow">Investimento</p>
          <h2>Mentoria Dataprev — Perfil 3</h2>
          <p>Entre em contato para confirmar a disponibilidade da turma e sua elegibilidade para a condição especial.</p>
        </div>
        <div className="mentorship-offer-layout">
          <div className="mentorship-registration-included">
            <h3>O que está incluso</h3>
            <ul className="check-list">
              {dataprevMentorship.offerItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mentorship-scarcity-note">
              {dataprevMentorship.urgency.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </div>
          <aside className="mentorship-price-card" aria-label="Valor da mentoria">
            <span className="package-tag">Turma Dataprev</span>
            <h3>Investimento</h3>
            <div className="mentorship-price-main">
              {dataprevMentorship.pricing.regular}
              <span>{dataprevMentorship.pricing.installments}</span>
            </div>
            <div className="mentorship-price-alt">
              <strong>{dataprevMentorship.pricing.alumni}</strong>
              <span>{dataprevMentorship.pricing.installments} para {dataprevMentorship.pricing.alumniLabel}</span>
            </div>
            <p className="mentorship-guarantee-note">Garantia incondicional de 14 dias. Sem promessa de aprovação.</p>
            <a className="button primary" href={dataprevWhatsappUrl} target="_blank" rel="noreferrer" onClick={handleCtaClick("mentorship_whatsapp_click")}>
              {dataprevMentorship.cta.final}
            </a>
          </aside>
        </div>
      </section>

      <section className="projects-section discovery-band mentorship-band" id="edital">
        <div>
          <p className="eyebrow">Edital</p>
          <h2>Dataprev 2026 analisado para orientar a preparação.</h2>
          <p>
            A estratégia da turma parte do Edital 001/2026 da FGV para transformar peso da prova,
            requisitos do perfil e conteúdo de Desenvolvimento de Software em prioridades reais de estudo.
          </p>
          <a className="button secondary light-button" href={editalUrl} target="_blank" rel="noreferrer">
            Abrir edital oficial
          </a>
        </div>
        <div className="discovery-card edital-card">
          <ul>
            {dataprevMentorship.editalFacts.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="edital-timeline" aria-label="Principais datas do edital Dataprev 2026">
          {dataprevMentorship.editalTimeline.map(([date, title]) => (
            <article className="edital-timeline-item" key={`${date}-${title}`}>
              <span>{date}</span>
              <h3>{title}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="projects-section faq-section" id="faq">
        <div className="section-heading wide-heading">
          <p className="eyebrow">Perguntas frequentes</p>
          <h2>Antes de fazer sua inscrição</h2>
        </div>
        <div className="faq-grid mentorship-faq-grid">
          {dataprevMentorship.faq.map((item) => (
            <details className="faq-item mentorship-faq-item" key={item.question} onToggle={(event) => event.currentTarget.open && trackMentorshipEvent("mentorship_faq_open", { question: item.question })}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="projects-final mentorship-final-cta" id="inscricao">
        <p className="eyebrow">Próximo passo</p>
        <h2>Quer verificar se ainda há disponibilidade na turma?</h2>
        <p>
          A conversa inicial serve para confirmar encaixe, disponibilidade e condição aplicável antes da inscrição.
        </p>
        <div className="final-actions">
          <a className="button primary" href={dataprevWhatsappUrl} target="_blank" rel="noreferrer" onClick={handleCtaClick("mentorship_final_cta_click")}>
            {dataprevMentorship.cta.final}
          </a>
        </div>
      </section>

      {showMobileCta && (
        <a className="mentorship-mobile-cta" href={dataprevWhatsappUrl} target="_blank" rel="noreferrer" onClick={handleCtaClick("mentorship_mobile_sticky_cta_click")}>
          Verificar disponibilidade
        </a>
      )}

      {selectedDeliverable && (
        <div className="mentorship-modal" role="dialog" aria-modal="true" aria-labelledby="deliverable-title" onClick={() => setSelectedDeliverable(null)}>
          <div className="mentorship-modal-panel" onClick={(event) => event.stopPropagation()}>
            <button className="mentorship-modal-close" type="button" onClick={() => setSelectedDeliverable(null)} aria-label="Fechar demonstração">
              ×
            </button>
            <span className="status-label">{selectedDeliverable.label}</span>
            <h2 id="deliverable-title">{selectedDeliverable.title}</h2>
            <div className="mentorship-demo-large">
              {selectedDeliverable.preview.map((previewItem) => (
                <span key={previewItem}>{previewItem}</span>
              ))}
            </div>
            <p>{selectedDeliverable.text}</p>
          </div>
        </div>
      )}

      <footer className="site-footer">
        <p>Fabricio Santana</p>
        <a href="mailto:fabricio.santana@gmail.com">fabricio.santana@gmail.com</a>
      </footer>
    </main>
  );
};

const App = () => {
  const [newsletterMessage, setNewsletterMessage] = useState("");
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const selectedDigestPost = digestPosts.find((post) => currentHash === `#${post.slug}`);

  const handleNewsletterSubmit = (event) => {
    event.preventDefault();
    setNewsletterMessage("Obrigado! Seu interesse na newsletter foi registrado.");
  };

  React.useEffect(() => {
    const handleHashChange = () => setCurrentHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  if (window.location.pathname.startsWith("/mentoria-dataprev")) {
    return <DataprevMentorshipLanding />;
  }

  if (window.location.pathname.startsWith("/projects")) {
    return <ProjectsLanding />;
  }

  if (selectedDigestPost) {
    const selectedDigest = selectedDigestPost.digest;
    const selectedDigestItem = selectedDigest.items[0];

    return (
      <main className="site-shell">
        <header className="site-header">
          <a className="brand" href="#inicio" aria-label="Fabricio Santana">
            Fabricio Santana
          </a>
          <nav className="nav-links" aria-label="Navegacao principal">
            <a href="#sobre">Sobre</a>
            <a href="/mentoria-dataprev">Mentoria</a>
            <a href="/projects">Serviços</a>
            <a href="#cursos">Cursos</a>
            <a href="#conteudos">Conteúdos</a>
          </nav>
        </header>

        <article className="digest-detail-page">
          <a className="back-link" href="#conteudos">
            Voltar para conteúdos
          </a>
          <div className="digest-meta">
            <span>Resumo diário</span>
            <time dateTime={selectedDigest.date}>{formatDate(selectedDigest.date)}</time>
          </div>
          <h1>{selectedDigest.title}</h1>
          <div
            className="digest-content"
            dangerouslySetInnerHTML={{
              __html: renderDigestMarkdown(selectedDigestItem.summary),
            }}
          />
          <div className="digest-sources">
            <h4>Fontes citadas</h4>
            <ul>
              {selectedDigestItem.sources.map((source) => (
                <li key={source.url}>
                  <a href={source.url} target="_blank" rel="noreferrer">
                    {source.sourceName ? `${source.sourceName}: ` : ""}
                    {source.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </article>

        <footer className="site-footer">
          <p>Fabricio Santana</p>
          <a href="mailto:fabricio.santana@gmail.com">fabricio.santana@gmail.com</a>
        </footer>
      </main>
    );
  }

  return (
    <main className="site-shell">
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Fabricio Santana">
          Fabricio Santana
        </a>
        <nav className="nav-links" aria-label="Navegacao principal">
          <a href="#sobre">Sobre</a>
          <a href="#cursos">Cursos</a>
          <a href="#mentoria">Mentoria</a>
          <a href="#conteudos">Conteúdos</a>
          <a href="/projects">Serviços</a>
        </nav>
      </header>

      <section className="intro-section" id="inicio">
        <div className="intro-copy">
          <p className="eyebrow">Tecnologia, ensino e gestão</p>
          <p className="intro-text">
            Sou Fabricio Santana, profissional de tecnologia com experiência em desenvolvimento de
            software, liderança técnica, computação em nuvem e ensino superior.
          </p>
          <p className="newsletter-callout">
            Receba meu resumo diário sobre tecnologia e inovação.
          </p>
          <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
            <div className="form-grid">
              <label>
                Nome
                <input type="text" name="name" autoComplete="name" required />
              </label>
              <label>
                E-mail
                <input type="email" name="email" autoComplete="email" required />
              </label>
            </div>
            <label className="consent-field">
              <input type="checkbox" name="privacyConsent" required />
              <span>
                Aceito os termos de privacidade e concordo em receber comunicações de Fabricio
                Santana.
              </span>
            </label>
            <button className="button primary" type="submit">
              Assinar newsletter
            </button>
            {newsletterMessage && <p className="form-message">{newsletterMessage}</p>}
          </form>
        </div>
        <img className="profile-photo" src={profilePhoto} alt="Fabricio Santana" />
      </section>

      <section className="content-section" id="sobre">
        <div className="section-heading">
          <p className="eyebrow">Sobre mim</p>
          <h2>Minha trajetória em tecnologia</h2>
        </div>
        <div className="text-panel">
          <p>
            Atuo há mais de 20 anos na área de tecnologia, conectando engenharia de software, gestão
            de times, cloud computing e inteligência artificial. Também leciono em cursos de
            graduação em Ciência da Computação e Engenharia de Software.
          </p>
          <p>
            Este espaço vai reunir cursos, materiais e textos sobre temas que acompanho de perto:
            arquitetura, desenvolvimento, IA, carreira, ensino e práticas modernas de TI.
          </p>
        </div>
      </section>

      <section className="content-section alternate" id="cursos">
        <div className="section-heading">
          <p className="eyebrow">Cursos</p>
          <h2>Aulas e cursos em desenvolvimento</h2>
        </div>
        <div className="card-grid">
          {courses.map((course) => (
            <article className="card" key={course.title}>
              <span className="status-label">{course.status}</span>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section" id="mentoria">
        <div className="section-heading">
          <p className="eyebrow">Mentoria</p>
          <h2>Acompanhamento para preparação em concursos de TI</h2>
        </div>
        <div className="card-grid">
          <a className="card project-card" href="/mentoria-dataprev">
            <span className="status-label">Turma Dataprev</span>
            <h3>Mentoria Dataprev para Desenvolvimento de Software</h3>
            <p>
              Preparação orientada para o Perfil 3 do concurso Dataprev, com leitura estratégica do
              edital, plano de estudo, encontros ao vivo, simulados e acompanhamento até a prova.
            </p>
          </a>
        </div>
      </section>

      <section className="content-section" id="conteudos">
        <div className="section-heading">
          <p className="eyebrow">Conteúdos sobre TI</p>
          <h2>Publicações e resumos de tecnologia</h2>
        </div>
        <div className="digest-list">
          {digestPosts.map((post) => (
            <a className="digest-card" href={`#${post.slug}`} key={post.date}>
              <div className="digest-meta">
                <span>Resumo diário</span>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </div>
              <h3>{post.title}</h3>
              <p>{post.summary}</p>
              <div className="digest-card-footer">
                <span>{post.sourceCount} fontes citadas</span>
                <strong>Ler resumo completo</strong>
              </div>
            </a>
          ))}
        </div>
      </section>

      <footer className="site-footer">
        <p>Fabricio Santana</p>
        <a href="mailto:fabricio.santana@gmail.com">fabricio.santana@gmail.com</a>
      </footer>
    </main>
  );
};

export default App;
