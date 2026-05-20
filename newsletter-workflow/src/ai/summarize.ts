import OpenAI from "openai";

import type { Article, Digest, NewsCluster } from "../types/newsletter.js";

const DEFAULT_MAX_CLUSTERS_FOR_SUMMARY = 35;

const PROMOTIONAL_HOST_PATTERNS = [
  "calendly.com",
  "forms.gle",
  "glean.com",
  "hightouch.com",
  "insiderstore.com.br",
  "masterclass.com",
  "passionfroot.me",
  "postermywall.com",
  "repairit.wondershare.com",
  "upscaile.com",
  "wisprflow.ai",
];

const PROMOTIONAL_TITLE_PATTERNS = [
  /advertis/i,
  /course/i,
  /curso/i,
  /deal/i,
  /discount/i,
  /executive pass/i,
  /patrocin/i,
  /sponsor/i,
  /training/i,
];

export async function summarizeDigest(clusters: NewsCluster[]): Promise<Digest> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is required to generate the digest.");
  }

  if (clusters.length === 0) {
    return emptyDigest("Nenhuma notícia encontrada nas newsletters processadas.");
  }

  const digestDate = new Date().toISOString().slice(0, 10);
  const editorialClusters = selectEditorialClusters(clusters);
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
    temperature: 0.2,
    messages: [
      {
        role: "system",
        content:
          "Você é editor de um resumo diário de tecnologia em português do Brasil. Priorize notícias, lançamentos, pesquisas, segurança, infraestrutura, IA, desenvolvimento de software e movimentos relevantes de mercado. Ignore anúncios, cursos, ofertas, páginas institucionais, páginas de newsletter, formulários e conteúdo claramente promocional. Agrupe assuntos semelhantes, seja objetivo e cite fontes públicas com links Markdown quando houver URL pública. Quando a fonte for apenas uma newsletter interna, cite o nome da newsletter sem link. Não invente datas e não coloque uma data no título do resumo; a data do digest será fornecida nos dados.",
      },
      {
        role: "user",
        content: JSON.stringify(
          {
            digestDate,
            clusters: editorialClusters.map((cluster) => ({
              title: cluster.title,
              articles: cluster.articles.map((article) => ({
                title: article.title,
                url: isPublicSource(article) ? article.canonicalUrl : undefined,
                sourceName: article.sourceName,
                text: article.text.slice(0, 5000),
              })),
            })),
          },
          null,
          2
        ),
      },
    ],
  });
  const summary = response.choices[0]?.message.content ?? "";

  return {
    date: digestDate,
    title: "Resumo diário de tecnologia",
    items: [
      {
        title: "Resumo gerado",
        summary,
        sources: extractCitedSources(summary, editorialClusters),
      },
    ],
  };
}

function selectEditorialClusters(clusters: NewsCluster[]): NewsCluster[] {
  const maxClusters = Number(process.env.NEWSLETTER_MAX_SUMMARY_CLUSTERS ?? DEFAULT_MAX_CLUSTERS_FOR_SUMMARY);

  return clusters
    .map((cluster) => ({
      cluster,
      score: scoreCluster(cluster),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxClusters)
    .map(({ cluster }) => cluster);
}

function scoreCluster(cluster: NewsCluster): number {
  const text = `${cluster.title} ${cluster.articles.map((article) => article.text).join(" ")}`;
  let score = 0;

  if (cluster.articles.some(isPublicSource)) {
    score += 4;
  }

  if (/ai|agents?|anthropic|apple|claude|codex|data|developer|gemini|github|google|ia|java|llm|microsoft|openai|security|software/i.test(text)) {
    score += 4;
  }

  if (/announc|breach|launch|released|research|study|vulnerability|lançou|pesquisa|segurança|vazamento/i.test(text)) {
    score += 2;
  }

  if (cluster.articles.some(isPromotionalArticle)) {
    score -= 6;
  }

  return score;
}

function extractCitedSources(
  summary: string,
  clusters: NewsCluster[]
): Array<{ title: string; url: string; sourceName?: string }> {
  const citedUrls = new Set(Array.from(summary.matchAll(/\]\((https?:\/\/[^)]+)\)/g)).map((match) => normalizeUrlKey(match[1])));
  const publicArticles = clusters.flatMap((cluster) => cluster.articles).filter(isPublicSource);

  if (citedUrls.size === 0) {
    return publicArticles.slice(0, 20).map(toDigestSource);
  }

  return dedupeSources(
    publicArticles
      .filter((article) => citedUrls.has(normalizeUrlKey(article.canonicalUrl)))
      .map(toDigestSource)
  );
}

function toDigestSource(article: Article): { title: string; url: string; sourceName?: string } {
  return {
    title: article.title,
    url: article.canonicalUrl,
    sourceName: article.sourceName,
  };
}

function dedupeSources(
  sources: Array<{ title: string; url: string; sourceName?: string }>
): Array<{ title: string; url: string; sourceName?: string }> {
  const seen = new Set<string>();
  const uniqueSources: Array<{ title: string; url: string; sourceName?: string }> = [];

  for (const source of sources) {
    const key = normalizeUrlKey(source.url);
    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    uniqueSources.push(source);
  }

  return uniqueSources;
}

function isPublicSource(article: Article): boolean {
  return article.canonicalUrl.startsWith("http") && !isPromotionalArticle(article);
}

function isPromotionalArticle(article: Article): boolean {
  const text = `${article.title} ${article.sourceName ?? ""} ${article.canonicalUrl}`;
  const host = getHost(article.canonicalUrl);

  return (
    PROMOTIONAL_HOST_PATTERNS.some((pattern) => host.includes(pattern)) ||
    PROMOTIONAL_TITLE_PATTERNS.some((pattern) => pattern.test(text))
  );
}

function normalizeUrlKey(rawUrl: string): string {
  const url = new URL(rawUrl);
  url.hash = "";
  url.hostname = url.hostname.replace(/^www\./, "");

  if (url.pathname !== "/") {
    url.pathname = url.pathname.replace(/\/+$/, "");
  }

  return url.toString();
}

function getHost(rawUrl: string): string {
  try {
    return new URL(rawUrl).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function emptyDigest(message: string): Digest {
  return {
    date: new Date().toISOString().slice(0, 10),
    title: "Resumo diário de tecnologia",
    items: [
      {
        title: "Workflow não executado",
        summary: message,
        sources: [],
      },
    ],
  };
}
