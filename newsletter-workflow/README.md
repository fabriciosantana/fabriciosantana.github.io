# Newsletter Workflow

Workflow para coletar newsletters, ler links referenciados, agrupar notícias semelhantes e gerar resumos para publicação no site.

## Etapas previstas

1. Coletar e-mails de um marcador/pasta dedicado.
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
