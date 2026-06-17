# Workana Opportunity: Painel Web de Gestão Operacional para Despachantes Veiculares

## Original opportunity

Estamos buscando um desenvolvedor qualificado para criar um painel web de gestão operacional. Este painel será uma camada visual de acompanhamento gerencial para despachantes veiculares, consumindo dados existentes do sistema SDG da Bludata via API, banco de dados ou exportação automática.

O objetivo é transformar esses dados em uma Torre de Controle Operacional que facilite a gestão diária, reduza esquecimentos, identifique gargalos e aumente a produtividade da equipe.

A ferramenta deve ser somente para consulta e gestão, sem permitir cadastros, alterações, emissão de documentos ou movimentações operacionais.

Funcionalidades desejadas:

- dashboard principal com processos em andamento, concluídos, atrasados, próximos do vencimento, sem movimentação e tempo médio de conclusão;
- painel de prioridades com o que exige atenção imediata;
- gargalos operacionais por etapa;
- lista de processos parados;
- produtividade da equipe;
- fluxo operacional visual da recepção até a entrega;
- login, responsividade, atualização automática e exibição em TV corporativa.

## Fit with Fabricio Santana's positioning

Esta oportunidade é um forte encaixe porque combina dashboard operacional, integração com sistema existente, camada de leitura segura, modelagem de dados, cálculo de indicadores, visualização gerencial, login e deploy de aplicação web. Ela se alinha bem com a oferta do site para sistemas internos, APIs, automação, arquitetura, testes e entrega estruturada.

Pontos de força relevantes:

- 20+ anos em engenharia de software, liderança técnica, arquitetura, banco de dados, testes automatizados, cloud e sistemas críticos;
- experiência com sistemas internos, integrações, regras operacionais, observabilidade e entrega sustentável;
- capacidade de transformar dados existentes em uma camada gerencial objetiva e útil;
- forte aderência a projetos em que consistência de dados, rastreabilidade, manutenção e separação de responsabilidades importam;
- posicionamento comercial baseado em discovery, ciclos fechados, documentação, demos e propriedade do código pelo cliente.

## Opportunity assessment

O principal desafio não é apenas montar um dashboard bonito. O problema real de engenharia é construir uma camada de leitura gerencial sobre o SDG que calcule indicadores confiáveis, destaque prioridades reais, exponha gargalos operacionais e preserve a separação entre consulta e operação.

O pedido é bem direcionado, mas ainda há incertezas importantes:

- qual é o melhor meio de acesso aos dados do SDG: API, leitura de banco ou exportação automática;
- qual é a qualidade e granularidade dos dados históricos;
- quais campos existem para identificar etapa atual, última movimentação, responsável, prazo e conclusão;
- como o SDG representa reabertura, processos duplicados, cancelados ou exceções;
- qual frequência de atualização é necessária para a operação;
- quantos usuários acessarão o painel e se haverá perfis diferentes;
- quais monitores, TVs ou resoluções precisam ser suportados;
- quais regras definem prioridade, atraso, processo parado e gargalo.

Os principais riscos são:

- assumir que os dados do SDG estão prontos para consumo gerencial sem mapear inconsistências;
- construir indicadores sem alinhar regras operacionais com a equipe;
- permitir que o painel pareça um novo sistema operacional e gere expectativa de edição ou movimentação;
- subestimar o trabalho de consolidação quando a fonte de dados for exportação automática em vez de API;
- não tratar atrasos de carga, falhas de sincronização ou dados incompletos;
- misturar relatório histórico, monitoramento em tempo real e produtividade individual sem definir prioridades;
- subestimar a experiência de exibição em TV corporativa, que exige hierarquia visual e refresh controlado;
- deixar vagas as regras de autenticação, permissão de acesso e segregação de dados.

A proposta deve evitar vender um BI genérico. Uma primeira versão mais segura deve focar em um release operacional bem delimitado, com:

- camada de ingestão ou sincronização de leitura sobre o SDG;
- definição clara dos KPIs e regras de prioridade;
- dashboard principal com filtros e contadores confiáveis;
- visão de gargalos e processos parados;
- produtividade por colaborador com métricas auditáveis;
- fluxo operacional visual por etapa;
- login e controle de acesso;
- exibição responsiva para escritório e TV corporativa;
- deploy em ambiente de produção com handoff técnico.

## Real engineering problem

O valor do projeto está em quatro decisões técnicas e operacionais:

- como ler os dados do SDG sem afetar a operação principal;
- como transformar esses dados em métricas consistentes e compreensíveis;
- como desenhar uma interface que facilite triagem diária e não apenas consulta passiva;
- como impedir que a ferramenta se transforme em um ERP paralelo.

Por isso, a discovery precisa produzir um mapa claro entre fonte de dados, regras de negócio e visualizações. Sem isso, o risco é entregar um painel visualmente bonito, mas gerencialmente fraco.

## Recommended commercial framing

O caminho comercial mais seguro é vender uma Discovery Sprint de 1 semana antes da implementação. Ela deve transformar o pedido em um plano técnico executável.

Estrutura sugerida:

- Fase 1: Discovery Sprint, 1 semana.
- Fase 2: definição da arquitetura de leitura, do modelo de sincronização, dos KPIs, das regras de prioridade e da experiência de uso.
- Fase 3: primeiro ciclo de implementação do painel operacional.

Estimativa comercial sugerida:

- Próximo passo imediato: R$ 3.000 para Discovery Sprint.
- Pacote mais provável depois da discovery: R$ 24.000 para 4 semanas de `Product Acceleration`, caso a fonte de dados seja acessível e o primeiro release consiga ficar concentrado em um painel de leitura com os módulos pedidos.
- A discovery pode elevar a recomendação para `Scale & Intelligence` se houver integração mais difícil, qualidade fraca de dados, múltiplas fontes, regras pesadas de consolidação ou exigências maiores de operação e observabilidade.

## Key questions before final commitment

- O SDG da Bludata já oferece API documentada, acesso de leitura ao banco ou exportação automática estruturada?
- Quem vai aprovar e fornecer o acesso técnico necessário a essa fonte de dados?
- Quais campos hoje permitem calcular etapa atual, última movimentação, prazo, atraso, conclusão e responsável?
- Como o processo operacional é representado hoje dentro do SDG: existem status padrão ou a equipe usa convenções próprias?
- O que define exatamente um processo parado, um processo atrasado e um processo prioritário para o cliente?
- A atualização precisa ser em tempo quase real, por janelas programadas ou por cargas periódicas?
- Haverá um único perfil de visualização ou diferentes perfis de acesso?
- A exibição em TV corporativa precisa de modo fullscreen, rotação automática ou layout específico?
- Qual volume aproximado de processos e histórico precisa ser suportado no lançamento?
- Já existe um orçamento aprovado e uma data-alvo para a primeira versão operacional?
