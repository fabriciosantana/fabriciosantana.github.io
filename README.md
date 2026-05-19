# Fabricio Santana

Repositório do site pessoal e do workflow de newsletters.

Site publicado em:

https://fabriciosantana.github.io/

## Estrutura

```text
site/
  Aplicação React publicada no GitHub Pages.

newsletter-workflow/
  Automação para coletar newsletters, extrair links, ler artigos,
  agrupar notícias semelhantes e gerar resumos para o site.
```

## Site

Instale as dependências do site:

```bash
npm run install:all
```

Rode localmente:

```bash
npm start
```

Gere o build:

```bash
npm run build-gh
```

Publique:

```bash
npm run deploy
```

## Newsletter workflow

Instale as dependências do workflow:

```bash
npm --prefix newsletter-workflow install
```

Execute:

```bash
npm run newsletter:digest
```
