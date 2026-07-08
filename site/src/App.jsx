import React, { useState } from "react";

import { digestIndex, digestsByFile } from "./content/digests/generated.js";
import profilePhoto from "./images/Fabricio.jpg";
import "./styles.css";

const whatsappNumber = "5561982336222";
const whatsappUrl = `https://wa.me/${whatsappNumber}`;
const dataprevWhatsappUrl = `${whatsappUrl}?text=${encodeURIComponent(
  "Olá, Fabricio. Quero fazer minha inscrição e pagamento da mentoria Dataprev para Desenvolvimento de Software."
)}`;
const focusAreas = [
  "IA aplicada, sistemas agenticos, RAG e aplicações inteligentes",
  "Engenharia de software, arquitetura, testes e segurança",
  "Java, Spring Boot, Python, JavaScript, TypeScript e desenvolvimento web",
  "Educação em Ciência da Computação e ambientes práticos de aprendizagem",
  "Prototipagem de produtos digitais com utilidade real",
];

const workAreas = [
  {
    title: "Liderança em tecnologia",
    description:
      "Atuo com equipes, sistemas e stakeholders para entregar soluções digitais confiáveis em ambientes institucionais complexos. Minha experiência inclui transformação digital no setor público, sistemas legislativos, deliberação remota, fluxos sem papel, segurança, automação e processos apoiados por IA.",
  },
  {
    title: "Ensino e formação",
    description:
      "Leciono disciplinas de Engenharia de Software e Ciência da Computação, com foco em Programação Orientada a Objetos, Java, testes, desenvolvimento seguro, automação e projetos práticos para estudantes de graduação.",
  },
  {
    title: "IA aplicada e prototipagem",
    description:
      "Tenho interesse especial em IA para além das demonstrações: produtos úteis, ferramentas educacionais, automação de fluxos de trabalho, busca semântica, aplicações RAG e software com agentes.",
  },
];

const featuredProjects = [
  {
    title: "poo",
    url: "https://github.com/fabriciosantana/poo",
    description:
      "Material de Programação Orientada a Objetos para graduação, com foco em Java, fundamentos de OOP, exercícios e atividades práticas.",
  },
  {
    title: "stsw",
    url: "https://github.com/fabriciosantana/stsw",
    description:
      "Conteúdo de Segurança e Testes de Software para Engenharia de Software, incluindo desenvolvimento seguro, testes automatizados, OWASP e qualidade.",
  },
  {
    title: "idp-marp-slides",
    url: "https://github.com/fabriciosantana/idp-marp-slides",
    description:
      "Slides e materiais de apoio para disciplinas no IDP, usando apresentações em Markdown e recursos reutilizáveis de ensino.",
  },
];

const technologies = [
  "Java",
  "Spring Boot",
  "Python",
  "JavaScript",
  "TypeScript",
  "PostgreSQL",
  "Docker",
  "GitHub Actions",
  "JUnit",
  "Cucumber",
  "Playwright",
  "RAG",
  "LLMs",
  "LaTeX",
];

const explorationAreas = [
  "Como ensinar programação, testes e engenharia de software de forma mais efetiva",
  "Como transformar projetos acadêmicos em evidência profissional de portfólio",
  "Como agentes de IA e RAG podem apoiar fluxos de trabalho reais",
  "Como instituições públicas podem usar tecnologia, automação e IA com responsabilidade",
  "Como conectar fundamentos, experimentação técnica e pensamento de produto",
];

const contactLinks = [
  {
    label: "GitHub",
    url: "https://github.com/fabriciosantana",
  },
  {
    label: "LinkedIn",
    url: "https://linkedin.com/in/fabriciofsantana",
  },
  {
    label: "E-mail",
    url: "mailto:fabricio.santana@gmail.com",
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

const dataprevMentorship = {
  heroStats: [
    ["7 alunos", "por turma, para permitir acompanhamento real"],
    ["75/115", "pontos em Conhecimentos Específicos no edital"],
    ["R$ 10.685,44", "remuneração inicial para Analista de TI"],
  ],
  editalFacts: [
    "Concurso Público Dataprev 2026, Edital 001/2026, organizado pela FGV.",
    "Perfil 3: Desenvolvimento de Software, com vagas imediatas em Fortaleza, João Pessoa, Natal e Florianópolis, além de cadastro de reserva em outras capitais.",
    "Prova objetiva prevista para 11 de outubro de 2026, com 70 questões e peso alto em conhecimentos específicos.",
    "Para ser aprovado na objetiva, o candidato precisa atingir a pontuação mínima e não zerar nenhuma disciplina.",
    "Conteúdo amplo: Java, Java EE/Jakarta EE, Spring, testes, APIs, arquitetura, DevOps, dados, segurança, BI e governança de TI.",
  ],
  editalTimeline: [
    {
      date: "03/07/2026",
      title: "Publicação do edital",
      text: "Edital 001/2026 publicado na página oficial da FGV para o concurso Dataprev.",
    },
    {
      date: "06/07/2026, 16h",
      title: "Abertura das inscrições",
      text: "Início do período de inscrição no site da FGV, pelo horário oficial de Brasília.",
    },
    {
      date: "06/08/2026, 16h",
      title: "Encerramento das inscrições",
      text: "Também é o prazo para atendimento especial, envio de laudo e solicitação de nome social.",
    },
    {
      date: "07/08/2026, 16h",
      title: "Último dia para boleto",
      text: "Prazo final para reimprimir e pagar a taxa de inscrição, conforme regras do edital.",
    },
    {
      date: "11/10/2026",
      title: "Prova objetiva",
      text: "Aplicação prevista das 13h às 17h, com fechamento dos portões às 12h30.",
    },
  ],
  pillars: [
    {
      title: "Leitura estratégica do edital",
      text: "Transformamos o edital em um plano de estudo executável, separando o que exige profundidade, revisão, questões e repertório prático de desenvolvimento.",
    },
    {
      title: "Rotina de estudo acompanhada",
      text: "Cada aluno sai com metas semanais, checkpoints de avanço e orientação sobre como equilibrar teoria, questões FGV e revisão ativa.",
    },
    {
      title: "Engenharia de software aplicada",
      text: "A preparação conecta o conteúdo cobrado com experiência real em Java, Spring, testes, arquitetura, segurança, dados e sistemas institucionais.",
    },
  ],
  modules: [
    "Diagnóstico inicial e plano individual de estudo",
    "Priorização dos tópicos de Desenvolvimento de Software",
    "Java, Spring, APIs, orientação a objetos e arquitetura",
    "Testes, qualidade, SonarQube, TDD e ciclo de vida de testes",
    "Banco de dados, SQL, modelagem, NoSQL, ETL/ELT e BI",
    "Segurança da informação, LGPD, OAuth2, OWASP, SAST e DAST",
    "DevOps, Git, containers, microsserviços, cloud e observabilidade",
    "Governança de TI, ITIL, COBIT, Scrum, Kanban, riscos e BPMN",
  ],
  format: [
    ["Turmas pequenas", "até 7 estudantes por turma"],
    [
      "Encontros online e gravados",
      "aulas e mentorias ao vivo, com gravação disponível para a turma",
    ],
    ["Plano de execução", "metas semanais, revisões e priorização"],
    ["Questões e simulados", "treino orientado para padrão FGV e controle de desempenho"],
    ["Acompanhamento", "grupo da turma e ajustes de rota durante a preparação"],
    [
      "Sem promessa vazia",
      "mentoria orienta método e execução; aprovação depende do desempenho do candidato",
    ],
  ],
  included: [
    "1 encontro semanal ao vivo em grupo de até 7 pessoas",
    "Encontros gravados para revisão posterior",
    "Encontros semanais até a véspera da prova",
    "Suporte em tempo real via WhatsApp",
    "Cronograma personalizado de estudos",
    "Resumos dos tópicos do edital",
    "Mapas mentais para fixação do conteúdo",
    "Questões de concursos anteriores organizadas por tópicos",
  ],
  pricing: {
    regular: "R$ 997,00",
    alumni: "R$ 697,00",
    installments: "em até 3x",
    alumniLabel: "ex-mentorados e ex-alunos de graduação",
  },
  schedule: [
    {
      meeting: "Encontro 1",
      title: "Diagnóstico, edital e estratégia de prova",
      topics:
        "Leitura orientada do edital, peso das disciplinas, metas da turma, diagnóstico inicial e montagem do cronograma individual.",
    },
    {
      meeting: "Encontro 2",
      title: "Java, orientação a objetos e fundamentos de backend",
      topics:
        "Revisão dos fundamentos mais cobrados, pontos de atenção em Java, POO, APIs, persistência e como estudar teoria com questões.",
    },
    {
      meeting: "Encontro 3",
      title: "Spring, arquitetura e desenvolvimento web",
      topics:
        "Spring, REST, microsserviços, padrões de arquitetura, integração entre sistemas e leitura prática dos tópicos de desenvolvimento.",
    },
    {
      meeting: "Encontro 4",
      title: "Testes, qualidade, DevOps e observabilidade",
      topics:
        "Testes automatizados, TDD, SonarQube, Git, containers, CI/CD, cloud, monitoramento e como priorizar esses temas na revisão.",
    },
    {
      meeting: "Encontro 5",
      title: "Dados, SQL, BI, segurança e LGPD",
      topics:
        "Modelagem, SQL, NoSQL, ETL/ELT, BI, segurança da informação, OWASP, OAuth2, LGPD e questões típicas desses blocos.",
    },
    {
      meeting: "Encontro 6",
      title: "Governança, métodos ágeis e revisão final orientada por desempenho",
      topics:
        "ITIL, COBIT, Scrum, Kanban, BPMN, gestão de riscos, revisão dos erros mais frequentes e plano de reta final até a prova.",
    },
  ],
  scheduleNote:
    "Os encontros são gravados e ocorrerão semanalmente até a véspera da prova. Este é um plano-base: temas, ordem e nível de profundidade podem ser ajustados conforme o perfil técnico, as dificuldades e a evolução de cada turma.",
  profileProof: [
    "Bacharel em Ciência da Computação (UFRJ)",
    "Especialista em Tecnologia da Informação Aplicada ao Poder Legislativo (ILB)",
    "Especialista em Processamento de Linguagem Natural pela (UFG)",
    "Mestrando em Ciência de Dados e Inteligência Artificial (IDP)",
    "Aprovado para Analista de Informática do Senado Federal",
    "Aprovado para Analista de Sistemas da Eletronuclear",
    "Aprovado para Perito de Informática da Polícia Civil do Rio de Janeiro",
    "Professor de ensino superior em Engenharia de Software e Ciência da Computação",
    "Mais de 20 anos de experiência em engenharia de software",
  ],
  testimonials: [
    {
      quote:
        "A mentoria ajudou a transformar um edital grande em uma rotina objetiva, com prioridade clara e acompanhamento do que precisava ser feito na semana.",
      author: "Yuri B. A. S",
      approval: "Aprovado para Agente de Tecnologia do Banco do Brasil (2023)",
    },
    {
      quote:
        "O acompanhamento deu direção para priorizar o que mais importava, revisar com método e manter constância até a prova.",
      author: "Mentorado",
      approval: "Aprovado em concurso público de TI",
    },
    {
      quote:
        "A orientação conectou o conteúdo técnico do edital com exemplos práticos de desenvolvimento, testes, arquitetura e sistemas reais.",
      author: "Ex-aluno de graduação e mentorado",
      approval: "Aprovado em seleção pública na área de tecnologia",
    },
  ],
  guarantee: [
    {
      title: "14 dias de garantia incondicional",
      text: "Você pode cancelar em até 14 dias após a inscrição, por qualquer motivo. O valor investido será integralmente devolvido.",
    },
    {
      title: "Garantia de entrega e clareza",
      text: "A turma recebe os encontros ao vivo, as gravações, o cronograma de estudos, os materiais combinados e o acompanhamento pelo canal da mentoria.",
    },
    {
      title: "Sem promessa de aprovação",
      text: "Aprovação depende de execução, base prévia, constância e desempenho no dia da prova. A garantia é sobre método, orientação e entrega do que foi contratado.",
    },
  ],
  faq: [
    {
      question: "A mentoria substitui curso completo de teoria?",
      answer:
        "Não. A proposta é orientar estratégia, priorização, rotina, revisão, questões e conexão prática dos temas. Ela funciona melhor para quem já estuda ou quer estudar com direção mais clara.",
    },
    {
      question: "Preciso já programar bem em Java?",
      answer:
        "Não precisa dominar tudo, mas precisa ter disposição para estudar com consistência. O edital cobra desenvolvimento de software em profundidade, então a mentoria vai indicar onde aprofundar e como treinar.",
    },
    {
      question: "A turma é só para Desenvolvimento de Software?",
      answer:
        "Esta oferta é específica para o Perfil 3, Desenvolvimento de Software. Isso evita dispersão e permite trabalhar o edital com foco real.",
    },
    {
      question: "Há garantia de aprovação?",
      answer:
        "Não. Nenhuma preparação séria pode garantir aprovação. O compromisso é com método, orientação, acompanhamento e clareza sobre o que executar até a prova.",
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

const DataprevMentorshipLanding = () => {
  const editalUrl =
    "https://conhecimento.fgv.br/sites/default/files/concursos/edital-dataprev_supe-versaofinal.pdf";

  return (
    <main className="site-shell projects-page mentorship-page">
      <header className="site-header projects-header">
        <a className="brand" href="/" aria-label="Fabricio Santana">
          Fabricio Santana
        </a>
        <nav className="nav-links" aria-label="Navegacao da mentoria Dataprev">
          <a href="#programa">Programa</a>
          <a href="#cronograma">Cronograma</a>
          <a href="#edital">Edital</a>
          <a href="#perfil">Mentor</a>
          <a href="#depoimentos">Depoimentos</a>
          <a href="#garantia">Garantia</a>
          <a href="#inscricao">Inscrição</a>
        </nav>
      </header>

      <section className="projects-hero mentorship-hero">
        <div className="projects-hero-copy">
          <p className="eyebrow">Mentoria para concursos de TI</p>
          <h2>
            Prepare-se para o concurso da Dataprev com orientação de quem já foi aprovado e tem
            experiência prática.
          </h2>
          <p className="projects-lead">
            Programa em turmas de até 7 estudantes para transformar o edital da FGV em plano de
            estudo, priorização, rotina de questões e acompanhamento até a prova.
          </p>
          <div className="mentorship-authority-strip" aria-label="Autoridade do mentor">
            <span>Analista de Informática do Senado Federal</span>
            <span>Professor Universitário</span>
            <span>+20 anos em Engenharia de Software</span>
            <span>Aprovado em concursos de TI</span>
          </div>
          <div className="projects-actions">
            <a className="button primary" href="#inscricao">
              Inscrever-se
            </a>
            <a className="button secondary" href="#programa">
              Ver estrutura da mentoria
            </a>
          </div>
        </div>
        <aside className="hero-proof mentorship-proof" aria-label="Resumo da oferta">
          <div className="hero-proof-title">Mentoria Dataprev</div>
          {dataprevMentorship.heroStats.map(([value, label]) => (
            <div className="proof-item" key={value}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
          <div className="hero-proof-actions">
            <a className="button primary" href="#inscricao">
              Inscrever-se
            </a>
          </div>
        </aside>
      </section>

      <section className="projects-section mentorship-problem-section" id="problema">
        <div className="section-heading wide-heading">
          <p className="eyebrow">O problema</p>
          <h2>O maior risco não é estudar pouco. É estudar errado.</h2>
          <p>
            O edital possui mais de 100 tópicos e 75 pontos em conhecimentos específicos. Em vez de
            estudar tudo da mesma forma, você terá uma estratégia para priorizar os assuntos que
            mais impactam sua nota.
          </p>
        </div>
        <div className="mentorship-pain-grid">
          <article className="use-case-card">
            <h3>Edital muito grande</h3>
          </article>
          <article className="use-case-card">
            <h3>Pouco tempo disponível</h3>
          </article>
          <article className="use-case-card">
            <h3>Dificuldade para priorizar</h3>
          </article>
          <article className="use-case-card">
            <h3>Excesso de materiais</h3>
          </article>
        </div>
        <p className="mentorship-problem-close">
          A mentoria existe para eliminar exatamente esses problemas.
        </p>
      </section>

      <section className="projects-section split-section">
        <div>
          <p className="eyebrow">O que é a mentoria?</p>
          <h2>
            É uma preparação guiada para um edital grande, técnico e competitivo. <br />
            <br />
          </h2>
          <h3>Não é mais um curso genérico de TI com aulas gravadas que você não vai assistir. </h3>
        </div>
        <p className="large-copy">
          O edital da Dataprev exige domínio técnico, leitura estratégica e constância. A mentoria
          organiza o caminho: o que estudar primeiro, onde aprofundar, como revisar, como treinar
          questões e como evitar dispersão em um conteúdo muito amplo.
        </p>
      </section>

      <section className="projects-section use-cases-section" id="programa">
        <div className="section-heading wide-heading">
          <p className="eyebrow">Programa</p>
          <h2>Como a mentoria será organizada</h2>
          <p>
            Turma pequena, encontros ao vivo, plano de estudo, acompanhamento e foco nos temas que
            mais pesam para Desenvolvimento de Software.
          </p>
        </div>
        <div className="process-grid">
          {dataprevMentorship.pillars.map((item) => (
            <article className="process-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
        <div className="mentorship-format-grid">
          {dataprevMentorship.format.map(([title, text]) => (
            <article className="risk-item" key={title}>
              <strong>{title}</strong>
              <span>{text}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="projects-section mentorship-schedule-section" id="cronograma">
        <div className="section-heading wide-heading">
          <p className="eyebrow">Cronograma dos encontros</p>
          <h2>Um plano de encontros semanais até a véspera da prova.</h2>
          <p>{dataprevMentorship.scheduleNote}</p>
        </div>
        <div className="mentorship-schedule-grid">
          {dataprevMentorship.schedule.map((item) => (
            <article className="mentorship-schedule-card" key={item.meeting}>
              <span>{item.meeting}</span>
              <h3>{item.title}</h3>
              <p>{item.topics}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="projects-section discovery-band mentorship-band" id="edital">
        <div>
          <p className="eyebrow">Base oficial</p>
          <h2>Edital Dataprev 2026 analisado para orientar a preparação</h2>
          <p>
            A página foi estruturada a partir do Edital 001/2026 da FGV. A estratégia da turma parte
            da prova objetiva, do peso dos conhecimentos específicos, dos requisitos do perfil e do
            conteúdo cobrado em Desenvolvimento de Software.
          </p>
          <a
            className="button secondary light-button"
            href={editalUrl}
            target="_blank"
            rel="noreferrer"
          >
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
          {dataprevMentorship.editalTimeline.map((item) => (
            <article className="edital-timeline-item" key={`${item.date}-${item.title}`}>
              <span>{item.date}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="projects-section" id="conteudo">
        <div className="section-heading wide-heading">
          <p className="eyebrow">Conteúdo priorizado</p>
          <h2>O que será trabalhado na turma</h2>
          <p>
            A mentoria não tenta tratar todos os tópicos como se tivessem o mesmo peso. O foco é
            organizar uma trilha viável para estudar, revisar e medir evolução.
          </p>
        </div>
        <div className="use-case-grid mentorship-topic-grid">
          {dataprevMentorship.modules.map((item) => (
            <article className="use-case-card" key={item}>
              <h3>{item}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="projects-section split-section" id="perfil">
        <div>
          <p className="eyebrow">Mentor</p>
          <h2>Experiência em concursos, ensino superior e engenharia de software real.</h2>
        </div>
        <div>
          <p className="large-copy">
            Sou Fabricio Santana, analista de informática legislativa no Senado e professor. Minha
            proposta é unir método de preparação para concurso com leitura prática dos assuntos de
            desenvolvimento de software cobrados no edital.
          </p>
          <ul className="check-list">
            {dataprevMentorship.profileProof.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="projects-section mentorship-testimonials-section" id="depoimentos">
        <div className="section-heading wide-heading">
          <p className="eyebrow">Prova social</p>
          <h2>O que alunos e mentorados destacam</h2>
          <p>
            A mentoria parte de uma experiência combinada em aprovação em concursos, docência em
            computação e atuação real em engenharia de software.
          </p>
        </div>
        <div className="mentorship-testimonials-grid">
          {dataprevMentorship.testimonials.map((item) => (
            <article className="testimonial-card" key={`${item.author}-${item.approval}`}>
              <p>“{item.quote}”</p>
              <strong>{item.author}</strong>
              <span>{item.approval}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="projects-section mentorship-guarantee-section" id="garantia">
        <div className="section-heading wide-heading">
          <p className="eyebrow">Garantia</p>
          <h2>Compromisso claro, sem promessa artificial de aprovação.</h2>
        </div>
        <div className="mentorship-guarantee-grid">
          {dataprevMentorship.guarantee.map((item) => (
            <article className="guarantee-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="projects-section faq-section">
        <div className="section-heading wide-heading">
          <p className="eyebrow">Perguntas frequentes</p>
          <h2>Antes de fazer sua inscrição</h2>
        </div>
        <div className="faq-grid">
          {dataprevMentorship.faq.map((item) => (
            <article className="faq-item" key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="projects-final mentorship-registration-section" id="inscricao">
        <div className="mentorship-registration-heading">
          <p className="eyebrow">Inscrição</p>
          <h2>Faça sua inscrição na turma da mentoria Dataprev.</h2>
          <p>
            As turmas serão fechadas com até 7 estudantes. Chame no WhatsApp para confirmar sua
            vaga, receber os dados de pagamento e concluir a inscrição.
          </p>
        </div>
        <div className="mentorship-offer-layout">
          <div className="mentorship-registration-included">
            <h3>O que está incluso</h3>
            <p>
              Encontros ao vivo gravados, suporte durante a semana e materiais objetivos para
              transformar o edital em rotina de estudo até a véspera da prova.
            </p>
            <div className="mentorship-included-grid">
              {dataprevMentorship.included.map((item) => (
                <article className="risk-item" key={item}>
                  {item}
                </article>
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
              <span>
                {dataprevMentorship.pricing.installments} para{" "}
                {dataprevMentorship.pricing.alumniLabel}
              </span>
            </div>
            <div className="final-actions registration-actions">
              <a
                className="button primary"
                href={dataprevWhatsappUrl}
                target="_blank"
                rel="noreferrer"
              >
                Inscrever-se
              </a>
            </div>
          </aside>
        </div>
      </section>

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
            <a href="/mentoria-dataprev">Mentoria Dataprev</a>
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
          <a href="#atuacao">Atuação</a>
          <a href="#projetos">Projetos</a>
          <a href="#conteudos">Conteúdos</a>
          <a href="/mentoria-dataprev">Mentoria Dataprev</a>
          <a href="#contato">Contato</a>
          <a href="/projects">Serviços</a>
        </nav>
      </header>

      <section className="intro-section" id="inicio">
        <div className="intro-copy">
          <p className="eyebrow">Tecnologia, ensino e IA aplicada</p>
          <h1>Fabricio Fernandes Santana</h1>
          <p className="intro-text">
            Líder de tecnologia, professor e construtor de soluções em engenharia de software e
            inteligência artificial aplicada.
          </p>
          <p>
            Trabalho na interseção entre liderança técnica, transformação digital no setor público,
            educação em Ciência da Computação, produtos digitais e experimentação prática com IA,
            RAG, automação e agentes.
          </p>
          <div className="intro-actions">
            <a className="button primary" href="#projetos">
              Ver projetos
            </a>
            <a
              className="button secondary"
              href="https://github.com/fabriciosantana"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
        <img className="profile-photo" src={profilePhoto} alt="Fabricio Santana" />
      </section>

      <section className="content-section" id="sobre">
        <div className="section-heading">
          <p className="eyebrow">Sobre mim</p>
          <h2>Engenharia, ensino, gestão pública e produto</h2>
        </div>
        <div className="text-panel">
          <p>
            Sou um profissional brasileiro de tecnologia e professor. Minha trajetória combina
            Ciência da Computação, Direito, engenharia de software, administração pública, ensino e
            empreendedorismo.
          </p>
          <p>
            Essa combinação molda minha forma de trabalhar: tecnologia não apenas como código, mas
            como instrumento para resolver problemas institucionais, educacionais e de produto com
            clareza, responsabilidade e impacto prático.
          </p>
          <p>
            Uso o GitHub como espaço público de aprendizagem, materiais técnicos, recursos de
            ensino, experimentos e protótipos que transformam ideias em artefatos verificáveis.
          </p>
        </div>
      </section>

      <section className="content-section alternate" id="atuacao">
        <div className="section-heading">
          <p className="eyebrow">Atuação</p>
          <h2>O que faço hoje</h2>
        </div>
        <div className="card-grid">
          {workAreas.map((area) => (
            <article className="card" key={area.title}>
              <h3>{area.title}</h3>
              <p>{area.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <p className="eyebrow">Foco atual</p>
          <h2>Temas que conectam pesquisa, prática e entrega</h2>
        </div>
        <div className="text-panel compact-panel">
          <ul className="check-list">
            {focusAreas.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="content-section alternate" id="projetos">
        <div className="section-heading">
          <p className="eyebrow">Projetos em destaque</p>
          <h2>Repositórios como material de ensino e evidência pública</h2>
        </div>
        <div className="card-grid">
          {featuredProjects.map((project) => (
            <a
              className="card project-card"
              href={project.url}
              target="_blank"
              rel="noreferrer"
              key={project.title}
            >
              <span className="status-label">GitHub</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <p className="eyebrow">Tecnologias</p>
          <h2>Ferramentas que uso para construir, testar e ensinar</h2>
        </div>
        <div className="tech-cloud personal-tech-cloud">
          {technologies.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
      </section>

      <section className="content-section alternate">
        <div className="section-heading">
          <p className="eyebrow">Interesses</p>
          <h2>Áreas que gosto de explorar</h2>
        </div>
        <div className="text-panel compact-panel">
          <ul className="check-list">
            {explorationAreas.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="content-section" id="conteudos">
        <div className="section-heading">
          <p className="eyebrow">Conteúdos sobre TI</p>
          <h2>Publicações e resumos de tecnologia</h2>
          <p>
            Resumos e leituras sobre IA, engenharia de software, produtos digitais, segurança,
            automação e tendências que acompanho de perto.
          </p>
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

      <section className="content-section alternate" id="contato">
        <div className="section-heading">
          <p className="eyebrow">Contato</p>
          <h2>Aberto a conversas sobre tecnologia, ensino e IA aplicada</h2>
        </div>
        <div className="text-panel contact-panel">
          <p>
            Tenho interesse em projetos que conectem pesquisa e implementação, engenharia de
            software e educação, IA e fluxos reais de trabalho, profundidade técnica e valor
            público.
          </p>
          <div className="profile-links">
            {contactLinks.map((link) => (
              <a
                href={link.url}
                target={link.url.startsWith("mailto:") ? undefined : "_blank"}
                rel="noreferrer"
                key={link.label}
              >
                {link.label}
              </a>
            ))}
          </div>
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
      </section>
      <footer className="site-footer">
        <p>Fabricio Santana</p>
        <a href="mailto:fabricio.santana@gmail.com">fabricio.santana@gmail.com</a>
      </footer>
    </main>
  );
};

export default App;
