import type { Article, NewsCluster } from "../types/newsletter.js";

export function clusterArticles(articles: Article[]): NewsCluster[] {
  const byCanonicalUrl = new Map<string, Article[]>();

  for (const article of articles) {
    const key = article.canonicalUrl || article.url;
    byCanonicalUrl.set(key, [...(byCanonicalUrl.get(key) ?? []), article]);
  }

  return Array.from(byCanonicalUrl.entries()).map(([id, groupedArticles]) => ({
    id,
    title: groupedArticles[0]?.title ?? "Notícia",
    articles: groupedArticles,
  }));
}
