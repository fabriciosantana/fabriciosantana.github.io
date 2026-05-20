import * as cheerio from "cheerio";

import { logEvent } from "../observability/logger.js";
import type { Article, NewsletterEmail } from "../types/newsletter.js";

type EmailContentOptions = {
  maxArticles?: number;
  maxItemsPerEmail?: number;
};

type CandidateItem = {
  title: string;
  text: string;
  score: number;
};

const DEFAULT_MAX_ITEMS_PER_EMAIL = 4;
const DEFAULT_MAX_ARTICLES = 60;
const MIN_TEXT_LENGTH = 180;
const MAX_TEXT_LENGTH = 3000;

const IGNORED_TITLE_PATTERNS = [
  /advertis/i,
  /unsubscribe/i,
  /privacy/i,
  /sponsor/i,
  /subscribe/i,
  /upgrade/i,
  /view online/i,
];

export async function extractArticlesFromEmailContent(
  emails: NewsletterEmail[],
  options: EmailContentOptions = {}
): Promise<Article[]> {
  const maxItemsPerEmail =
    options.maxItemsPerEmail ??
    Number(process.env.NEWSLETTER_MAX_EMAIL_CONTENT_ITEMS_PER_EMAIL ?? DEFAULT_MAX_ITEMS_PER_EMAIL);
  const maxArticles =
    options.maxArticles ?? Number(process.env.NEWSLETTER_MAX_EMAIL_CONTENT_ARTICLES ?? DEFAULT_MAX_ARTICLES);
  const articles = emails
    .flatMap((email) => extractArticlesFromEmail(email, maxItemsPerEmail))
    .slice(0, maxArticles);

  await logEvent("info", "Email content articles extracted", {
    event: "email_content_articles_extracted",
    emailCount: emails.length,
    articleCount: articles.length,
    maxArticles,
    maxItemsPerEmail,
  });

  return articles;
}

function extractArticlesFromEmail(email: NewsletterEmail, maxItemsPerEmail: number): Article[] {
  const candidates = extractCandidateItems(email)
    .filter((candidate) => isUsefulCandidate(candidate))
    .sort((a, b) => b.score - a.score)
    .slice(0, maxItemsPerEmail);

  return candidates.map((candidate, index) => ({
    url: `email://${email.id}/${index + 1}`,
    canonicalUrl: `email://${email.id}/${index + 1}`,
    title: candidate.title,
    sourceName: extractSourceName(email.from),
    publishedAt: email.receivedAt,
    text: candidate.text,
  }));
}

function extractCandidateItems(email: NewsletterEmail): CandidateItem[] {
  if (!email.html) {
    return extractTextCandidates(email.text ?? "", email.subject);
  }

  const $ = cheerio.load(email.html);
  $("script, style, noscript, svg, img, footer").remove();

  const headingCandidates = $("h1, h2, h3")
    .toArray()
    .map((element) => {
      const title = normalizeText($(element).text());
      const contentBlocks = collectFollowingText($, element);
      const text = normalizeText([title, ...contentBlocks].join(" "));

      return {
        title,
        text,
        score: scoreCandidate(title, text),
      };
    });

  const paragraphCandidates = $("p, li")
    .toArray()
    .map((element) => {
      const text = normalizeText($(element).text());
      const title = inferTitle(text, email.subject);

      return {
        title,
        text,
        score: scoreCandidate(title, text) - 2,
      };
    });

  return dedupeCandidates([...headingCandidates, ...paragraphCandidates]);
}

function extractTextCandidates(text: string, fallbackTitle: string): CandidateItem[] {
  return normalizeText(text)
    .split(/\n{2,}|(?<=\.)\s+(?=[A-ZÀ-Ú])/)
    .map((chunk) => {
      const normalizedChunk = normalizeText(chunk);
      const title = inferTitle(normalizedChunk, fallbackTitle);

      return {
        title,
        text: normalizedChunk,
        score: scoreCandidate(title, normalizedChunk) - 1,
      };
    });
}

function collectFollowingText(
  $: cheerio.CheerioAPI,
  element: Parameters<cheerio.CheerioAPI>[0]
): string[] {
  const blocks: string[] = [];
  let current = $(element).next();

  while (current.length && blocks.length < 4) {
    const tagName = current.prop("tagName")?.toLowerCase();
    if (tagName && ["h1", "h2", "h3"].includes(tagName)) {
      break;
    }

    const text = normalizeText(current.text());
    if (text) {
      blocks.push(text);
    }

    current = current.next();
  }

  return blocks;
}

function isUsefulCandidate(candidate: CandidateItem): boolean {
  if (candidate.title.length < 8 || candidate.text.length < MIN_TEXT_LENGTH) {
    return false;
  }

  if (candidate.text.length > MAX_TEXT_LENGTH) {
    candidate.text = candidate.text.slice(0, MAX_TEXT_LENGTH);
  }

  if (IGNORED_TITLE_PATTERNS.some((pattern) => pattern.test(candidate.title))) {
    return false;
  }

  return candidate.score > 0;
}

function scoreCandidate(title: string, text: string): number {
  let score = 0;

  if (text.length >= MIN_TEXT_LENGTH) {
    score += 4;
  }

  if (text.length >= 500) {
    score += 2;
  }

  if (/ai|agents?|anthropic|apple|claude|codex|data|developer|google|ia|java|llm|microsoft|openai|security|software/i.test(text)) {
    score += 3;
  }

  if (/read more|continue reading|link patrocinado|unsubscribe|sponsor/i.test(text)) {
    score -= 4;
  }

  if (IGNORED_TITLE_PATTERNS.some((pattern) => pattern.test(title))) {
    score -= 6;
  }

  return score;
}

function dedupeCandidates(candidates: CandidateItem[]): CandidateItem[] {
  const seen = new Set<string>();
  const uniqueCandidates: CandidateItem[] = [];

  for (const candidate of candidates) {
    const key = candidate.text.toLowerCase().slice(0, 160);
    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    uniqueCandidates.push(candidate);
  }

  return uniqueCandidates;
}

function inferTitle(text: string, fallbackTitle: string): string {
  const sentence = text.split(/[.!?]/).find(Boolean)?.trim();
  const title = sentence && sentence.length >= 8 ? sentence : fallbackTitle;

  return title.length > 120 ? `${title.slice(0, 117)}...` : title;
}

function extractSourceName(from: string): string {
  const match = from.match(/^"?([^"<]+)"?\s*</);
  return normalizeText(match?.[1] ?? from);
}

function normalizeText(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}
