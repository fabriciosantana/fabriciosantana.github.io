import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";

import type { Article, NewsletterLink } from "../types/newsletter.js";

export async function fetchArticles(links: NewsletterLink[]): Promise<Article[]> {
  const articles: Article[] = [];

  for (const link of links) {
    const article = await fetchArticle(link.url);
    if (article) {
      articles.push(article);
    }
  }

  return articles;
}

async function fetchArticle(url: string): Promise<Article | null> {
  try {
    const response = await fetch(url, {
      headers: {
        "user-agent": "FabricioSantanaNewsletterBot/0.1",
      },
    });

    if (!response.ok) {
      return null;
    }

    const html = await response.text();
    const dom = new JSDOM(html, { url });
    const parsed = new Readability(dom.window.document).parse();

    if (!parsed?.textContent || !parsed.title) {
      return null;
    }

    const canonicalUrl =
      dom.window.document.querySelector("link[rel='canonical']")?.getAttribute("href") ?? url;

    return {
      url,
      canonicalUrl: new URL(canonicalUrl, url).toString(),
      title: parsed.title,
      sourceName: dom.window.document.querySelector("meta[property='og:site_name']")?.getAttribute("content") ?? undefined,
      text: parsed.textContent.replace(/\s+/g, " ").trim(),
    };
  } catch {
    return null;
  }
}
