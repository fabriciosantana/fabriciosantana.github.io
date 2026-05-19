import * as cheerio from "cheerio";

import type { NewsletterEmail, NewsletterLink } from "../types/newsletter.js";

const IGNORED_URL_PATTERNS = [
  "unsubscribe",
  "preferences",
  "manage-subscription",
  "facebook.com",
  "instagram.com",
  "linkedin.com",
  "twitter.com",
  "x.com",
];

export function extractNewsletterLinks(email: NewsletterEmail): NewsletterLink[] {
  const html = email.html ?? "";
  const $ = cheerio.load(html);

  return $("a[href]")
    .toArray()
    .map((element) => {
      const url = normalizeUrl($(element).attr("href") ?? "");
      const anchorText = $(element).text().replace(/\s+/g, " ").trim();

      return {
        url,
        anchorText,
        sourceEmailId: email.id,
        sourceEmailSubject: email.subject,
      };
    })
    .filter((link) => link.url && !isIgnoredUrl(link.url));
}

function normalizeUrl(rawUrl: string): string {
  try {
    const url = new URL(rawUrl);
    ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "ref"].forEach((param) =>
      url.searchParams.delete(param)
    );
    return url.toString();
  } catch {
    return "";
  }
}

function isIgnoredUrl(url: string): boolean {
  const normalized = url.toLowerCase();
  return IGNORED_URL_PATTERNS.some((pattern) => normalized.includes(pattern));
}
