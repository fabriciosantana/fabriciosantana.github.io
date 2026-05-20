# Newsletter Workflow

Workflow para coletar newsletters, ler links referenciados, agrupar notícias semelhantes e gerar resumos para publicação no site.

## Etapas previstas

1. Coletar e-mails do Gmail filtrando por remetentes configurados.
2. Extrair conteúdo HTML/texto e links relevantes.
3. Acessar as matérias originais.
4. Limpar e normalizar o texto dos artigos.
5. Agrupar notícias repetidas ou semelhantes.
6. Gerar resumo com referências às fontes originais.
7. Publicar o resultado em `../site/src/content/digests`.

## Execução

```bash
npm install
npm run digest
```

Pela raiz do repositório:

```bash
npm run newsletter:digest
```

## Gmail

O provider do Gmail filtra os remetentes em `src/config/senders.ts`.

Remetentes configurados:

```text
theaireport@mail.beehiiv.com
news@alphasignal.ai
tiw@mail.beehiiv.com
that1ai@mail.beehiiv.com
javarevisited@substack.com
whatsupinai@mail.beehiiv.com
bytebytego@substack.com
ai-signal@mail.beehiiv.com
newsletter@filipedeschamps.com.br
thecode@mail.joinsuperhuman.ai
```

Variáveis de ambiente necessárias:

```bash
GMAIL_CLIENT_ID=
GMAIL_CLIENT_SECRET=
GMAIL_REFRESH_TOKEN=
GMAIL_REDIRECT_URI=http://localhost:3000/oauth2callback
```

Variáveis opcionais:

```bash
GMAIL_MAX_RESULTS=20
GMAIL_NEWER_THAN_DAYS=2
NEWSLETTER_MAX_LINKS_PER_EMAIL=8
NEWSLETTER_MAX_EMAIL_CONTENT_ITEMS_PER_EMAIL=4
NEWSLETTER_MAX_EMAIL_CONTENT_ARTICLES=60
LINK_RESOLVE_TIMEOUT_MS=8000
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4o-mini
LOG_LEVEL=info
```

## Observabilidade

O workflow usa logs estruturados com `pino`. Sem configuração extra, os logs aparecem no console. Para enviar os eventos para Grafana Cloud Loki, configure:

```bash
GRAFANA_LOKI_URL=
GRAFANA_LOKI_USER=
GRAFANA_LOKI_TOKEN=
```

No Grafana Cloud, esses valores ficam nos detalhes do serviço Loki da sua stack. A URL normalmente termina com:

```text
/loki/api/v1/push
```

Também é possível informar apenas a URL base do Loki; o workflow adiciona esse caminho automaticamente.

O workflow não registra corpo completo de e-mails, conteúdo integral de artigos nem tokens; os eventos usam contagens, etapas, duração e erros sanitizados.

Para monitorar a execução diária, crie alertas no Grafana procurando eventos como `workflow_failed` ou ausência de `workflow_finished` no período esperado.

Para testar apenas a conexão com o Grafana:

```bash
npm run inspect:grafana
```

Pela raiz do repositório:

```bash
npm run newsletter:inspect:grafana
```

Se o teste retornar `401`, revise o `GRAFANA_LOKI_USER` e gere um Grafana Cloud Access Policy token para a mesma stack com o escopo `logs:write`.

Para inspecionar a resolução de redirects sem baixar artigos nem chamar IA:

```bash
npm run inspect:redirects
```

Pela raiz do repositório:

```bash
npm run newsletter:inspect:redirects
```

Para inspecionar os itens extraídos diretamente do corpo das newsletters:

```bash
npm run inspect:email-content
```

Pela raiz do repositório:

```bash
npm run newsletter:inspect:email-content
```

Para inspecionar os e-mails encontrados sem gerar resumo:

```bash
npm run inspect:gmail
```

Pela raiz do repositório:

```bash
npm run newsletter:inspect:gmail
```

### Como configurar OAuth do Gmail

1. Crie ou selecione um projeto no Google Cloud.
2. Ative a Gmail API no projeto.
3. Configure a OAuth consent screen.
4. Crie um OAuth Client ID.
5. Use um client do tipo "Desktop app" ou registre o redirect URI:

```text
http://localhost:3000/oauth2callback
```

6. Copie `.env.example` para `.env`:

```bash
cp .env.example .env
```

7. Preencha no `.env`:

```bash
GMAIL_CLIENT_ID=
GMAIL_CLIENT_SECRET=
```

8. Gere o refresh token:

```bash
npm run auth:gmail
```

Pela raiz do repositório:

```bash
npm run newsletter:auth:gmail
```

9. O comando imprimirá o `GMAIL_REFRESH_TOKEN`. Copie esse valor para o `.env`.
