import * as cheerio from "cheerio";

import type { NewsletterEmail, NewsletterLink } from "../types/newsletter.js";

const IGNORED_URL_PATTERNS = [
  "unsubscribe",
  "preferences",
  "manage-subscription",
  "email.beehiivstatus.com",
  "beehiiv.com/upgrade",
  "beehiiv.com/subscribe",
  "beehiiv.com/advertise",
  "beehiiv.com/privacy",
  "beehiiv.com/tos",
  "hp.beehiiv.com",
  "/fb/",
  "feedback=",
  "not+great",
  "powered-by",
  "facebook.com",
  "instagram.com",
  "linkedin.com",
  "twitter.com",
  "x.com",
];

const IGNORED_ANCHOR_TEXTS = new Set([
  "",
  "read online",
  "view online",
  "subscribe",
  "sponsor",
  "advertise",
  "consulting",
  "site",
  "terms of service",
  "powered by beehiiv",
  "partner with us →",
  "work with us",
  "follow on x",
  "archive",
  "forward →",
  "yes, it was awesome 💯 💯 💯 💯 💯",
  "meh, i've seen better 😐 😐 😐",
  "no, it was really bad 💩",
]);

export function extractNewsletterLinks(email: NewsletterEmail): NewsletterLink[] {
  const html = email.html ?? "";
  const $ = cheerio.load(html);

  const links = $("a[href]")
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
    .filter((link) => isRelevantLink(link));

  return dedupeLinks(links);
}

function normalizeUrl(rawUrl: string): string {
  try {
    const url = new URL(rawUrl);
    if (!["http:", "https:"].includes(url.protocol)) {
      return "";
    }

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

function isRelevantLink(link: NewsletterLink): boolean {
  const anchorText = link.anchorText?.toLowerCase().trim() ?? "";

  if (!link.url || isIgnoredUrl(link.url)) {
    return false;
  }

  if (IGNORED_ANCHOR_TEXTS.has(anchorText)) {
    return false;
  }

  return anchorText.length >= 8;
}

function dedupeLinks(links: NewsletterLink[]): NewsletterLink[] {
  const seen = new Set<string>();
  const uniqueLinks: NewsletterLink[] = [];

  for (const link of links) {
    const key = `${link.url}::${link.anchorText ?? ""}`;
    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    uniqueLinks.push(link);
  }

  return uniqueLinks;
}
