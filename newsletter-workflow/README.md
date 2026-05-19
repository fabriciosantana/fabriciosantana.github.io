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
```

Variáveis opcionais:

```bash
GMAIL_MAX_RESULTS=20
GMAIL_NEWER_THAN_DAYS=2
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4o-mini
```

Para inspecionar os e-mails encontrados sem gerar resumo:

```bash
npm run inspect:gmail
```

Pela raiz do repositório:

```bash
npm run newsletter:inspect:gmail
```
