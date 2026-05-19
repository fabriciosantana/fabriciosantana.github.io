import OpenAI from "openai";

import type { Digest, NewsCluster } from "../types/newsletter.js";

export async function summarizeDigest(clusters: NewsCluster[]): Promise<Digest> {
  if (!process.env.OPENAI_API_KEY) {
    return emptyDigest("Defina OPENAI_API_KEY para gerar o resumo com IA.");
  }

  if (clusters.length === 0) {
    return emptyDigest("Nenhuma notícia encontrada nas newsletters processadas.");
  }

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
          "Você resume notícias de tecnologia em português do Brasil. Parafraseie, agrupe assuntos semelhantes e cite as fontes originais usadas.",
      },
      {
        role: "user",
        content: JSON.stringify(
          clusters.map((cluster) => ({
            title: cluster.title,
            articles: cluster.articles.map((article) => ({
              title: article.title,
              url: article.canonicalUrl,
              sourceName: article.sourceName,
              text: article.text.slice(0, 5000),
            })),
          })),
          null,
          2
        ),
      },
    ],
  });

  return {
    date: new Date().toISOString().slice(0, 10),
    title: "Resumo diário de tecnologia",
    items: [
      {
        title: "Resumo gerado",
        summary: response.choices[0]?.message.content ?? "",
        sources: clusters.flatMap((cluster) =>
          cluster.articles.map((article) => ({
            title: article.title,
            url: article.canonicalUrl,
            sourceName: article.sourceName,
          }))
        ),
      },
    ],
  };
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
