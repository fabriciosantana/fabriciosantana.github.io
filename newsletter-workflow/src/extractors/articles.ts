import { Readability } from "@mozilla/readability";
import { JSDOM, VirtualConsole } from "jsdom";

import { logEvent, sanitizeError } from "../observability/logger.js";
import type { Article, NewsletterLink } from "../types/newsletter.js";

export async function fetchArticles(links: NewsletterLink[]): Promise<Article[]> {
  const articles: Article[] = [];
  const failureCountsByHost = new Map<string, number>();
  const failureCountsByReason = new Map<string, number>();

  for (const link of links) {
    const result = await fetchArticle(link.url);
    if (result.ok) {
      const article = result.article;
      articles.push(article);
      continue;
    }

    const host = getHost(link.url);
    failureCountsByHost.set(host, (failureCountsByHost.get(host) ?? 0) + 1);
    failureCountsByReason.set(result.reason, (failureCountsByReason.get(result.reason) ?? 0) + 1);
  }

  const dedupedArticles = dedupeArticlesByCanonicalUrl(articles);

  await logEvent("info", "Articles fetched", {
    event: "articles_fetched",
    inputLinkCount: links.length,
    fetchedArticleCount: articles.length,
    dedupedArticleCount: dedupedArticles.length,
    failureCountsByHost: Object.fromEntries(failureCountsByHost),
    failureCountsByReason: Object.fromEntries(failureCountsByReason),
  });

  return dedupedArticles;
}

async function fetchArticle(
  url: string
): Promise<{ ok: true; article: Article } | { ok: false; reason: string }> {
  try {
    const response = await fetch(url, {
      headers: {
        "user-agent": "FabricioSantanaNewsletterBot/0.1",
      },
    });

    if (!response.ok) {
      return { ok: false, reason: `http_${response.status}` };
    }

    const html = stripStyles(await response.text());
    const dom = new JSDOM(html, { url, virtualConsole: new VirtualConsole() });
    const parsed = new Readability(dom.window.document).parse();

    if (!parsed?.textContent || !parsed.title) {
      return { ok: false, reason: "readability_failed" };
    }

    const canonicalUrl =
      dom.window.document.querySelector("link[rel='canonical']")?.getAttribute("href") ?? url;
    const text = parsed.textContent.replace(/\s+/g, " ").trim();

    if (text.length < 500) {
      return { ok: false, reason: "article_too_short" };
    }

    return {
      ok: true,
      article: {
        url,
        canonicalUrl: new URL(canonicalUrl, url).toString(),
        title: parsed.title,
        sourceName: dom.window.document.querySelector("meta[property='og:site_name']")?.getAttribute("content") ?? undefined,
        text,
      },
    };
  } catch (error) {
    await logEvent("debug", "Could not fetch article", {
      event: "article_fetch_failed",
      host: getHost(url),
      error: sanitizeError(error),
    });
    return { ok: false, reason: "request_failed" };
  }
}

function stripStyles(html: string): string {
  return html.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "");
}

function dedupeArticlesByCanonicalUrl(articles: Article[]): Article[] {
  const seen = new Set<string>();
  const uniqueArticles: Article[] = [];

  for (const article of articles) {
    const key = normalizeCanonicalKey(article.canonicalUrl);
    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    uniqueArticles.push(article);
  }

  return uniqueArticles;
}

function normalizeCanonicalKey(rawUrl: string): string {
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
    return "invalid_url";
  }
}
