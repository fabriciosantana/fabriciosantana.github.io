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
  "media.beehiiv.com",
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
  "unsubscribe",
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

  const htmlLinks = $("a[href]")
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

  const textLinks = extractTextLinks(email);

  return dedupeLinks([...htmlLinks, ...textLinks]);
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

function extractTextLinks(email: NewsletterEmail): NewsletterLink[] {
  const text = email.text ?? "";
  const links: NewsletterLink[] = [];
  const urlPattern = /https?:\/\/[^\s)>\]]+/g;

  for (const line of text.split(/\r?\n/)) {
    const matches = line.matchAll(urlPattern);

    for (const match of matches) {
      const rawUrl = trimTrailingPunctuation(match[0]);
      const url = normalizeUrl(rawUrl);
      const anchorText = inferTextLinkAnchor(line, rawUrl);
      const link = {
        url,
        anchorText,
        sourceEmailId: email.id,
        sourceEmailSubject: email.subject,
      };

      if (isRelevantLink(link)) {
        links.push(link);
      }
    }
  }

  return links;
}

function inferTextLinkAnchor(line: string, rawUrl: string): string {
  const textWithoutUrl = line.replace(rawUrl, "").replace(/[()[\]]/g, " ");
  const normalized = textWithoutUrl.replace(/\s+/g, " ").trim();

  if (normalized.length >= 8) {
    return normalized;
  }

  try {
    return new URL(rawUrl).hostname.replace(/^www\./, "");
  } catch {
    return rawUrl;
  }
}

function trimTrailingPunctuation(url: string): string {
  return url.replace(/[.,;:!?]+$/, "");
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
