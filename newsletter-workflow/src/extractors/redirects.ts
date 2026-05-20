import { logEvent, sanitizeError } from "../observability/logger.js";
import type { NewsletterLink, ResolvedNewsletterLink } from "../types/newsletter.js";

type ResolveLinksOptions = {
  maxPerEmail?: number;
  timeoutMs?: number;
};

type ResolveLinkResult =
  | { ok: true; link: ResolvedNewsletterLink }
  | { ok: false; host: string; reason: string };

const DEFAULT_MAX_PER_EMAIL = 8;
const DEFAULT_TIMEOUT_MS = 8000;

const TRACKING_HOST_PATTERNS = [
  "app.alphasignal.ai",
  "link.mail.beehiiv.com",
  "click.convertkit-mail",
  "open.substack.com",
];

const IGNORED_FINAL_HOSTS = new Set([
  "facebook.com",
  "www.facebook.com",
  "instagram.com",
  "www.instagram.com",
  "linkedin.com",
  "www.linkedin.com",
  "twitter.com",
  "www.twitter.com",
  "x.com",
  "www.x.com",
]);

export async function resolveNewsletterLinks(
  links: NewsletterLink[],
  options: ResolveLinksOptions = {}
): Promise<ResolvedNewsletterLink[]> {
  const timeoutMs = options.timeoutMs ?? Number(process.env.LINK_RESOLVE_TIMEOUT_MS ?? DEFAULT_TIMEOUT_MS);
  const maxPerEmail =
    options.maxPerEmail ?? Number(process.env.NEWSLETTER_MAX_LINKS_PER_EMAIL ?? DEFAULT_MAX_PER_EMAIL);
  const resolvedLinks: ResolvedNewsletterLink[] = [];
  const failureCountsByHost = new Map<string, number>();
  const failureCountsByReason = new Map<string, number>();

  for (const link of links) {
    const result = await resolveNewsletterLink(link, timeoutMs);

    if (result.ok) {
      resolvedLinks.push(result.link);
      continue;
    }

    failureCountsByHost.set(result.host, (failureCountsByHost.get(result.host) ?? 0) + 1);
    failureCountsByReason.set(result.reason, (failureCountsByReason.get(result.reason) ?? 0) + 1);
  }

  const dedupedLinks = dedupeByFinalUrl(resolvedLinks);
  const limitedLinks = limitLinksPerEmail(dedupedLinks, maxPerEmail);
  const resolutionCountsByMethod = countByResolutionMethod(limitedLinks);

  await logEvent("info", "Links resolved", {
    event: "links_resolved",
    inputLinkCount: links.length,
    resolvedLinkCount: resolvedLinks.length,
    dedupedLinkCount: dedupedLinks.length,
    limitedLinkCount: limitedLinks.length,
    maxPerEmail,
    failureCountsByHost: Object.fromEntries(failureCountsByHost),
    failureCountsByReason: Object.fromEntries(failureCountsByReason),
    resolutionCountsByMethod,
  });

  return limitedLinks;
}

function countByResolutionMethod(links: ResolvedNewsletterLink[]): Record<string, number> {
  return links.reduce<Record<string, number>>((counts, link) => {
    counts[link.resolutionMethod] = (counts[link.resolutionMethod] ?? 0) + 1;
    return counts;
  }, {});
}

async function resolveNewsletterLink(
  link: NewsletterLink,
  timeoutMs: number
): Promise<ResolveLinkResult> {
  const originalHost = getHost(link.url);
  const embeddedFinalUrl = extractEmbeddedFinalUrl(link.url);

  if (embeddedFinalUrl && isContentUrl(embeddedFinalUrl, link.anchorText)) {
    const finalUrl = normalizeFinalUrl(embeddedFinalUrl);
    return {
      ok: true,
      link: {
        ...link,
        url: finalUrl,
        originalUrl: link.url,
        finalUrl,
        finalHost: getHost(finalUrl),
        resolutionMethod: "embedded_url",
      },
    };
  }

  if (isContentUrl(link.url, link.anchorText)) {
    const finalUrl = normalizeFinalUrl(link.url);
    return {
      ok: true,
      link: {
        ...link,
        url: finalUrl,
        originalUrl: link.url,
        finalUrl,
        finalHost: getHost(finalUrl),
        resolutionMethod: "direct_url",
      },
    };
  }

  const abortController = new AbortController();
  const timeout = setTimeout(() => abortController.abort(), timeoutMs);

  try {
    const response = await fetch(link.url, {
      headers: {
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "accept-language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
        "user-agent": "FabricioSantanaNewsletterBot/0.1",
      },
      redirect: "follow",
      signal: abortController.signal,
    });
    await response.arrayBuffer();

    const finalUrl = normalizeFinalUrl(response.url || link.url);
    const finalHost = getHost(finalUrl);

    if (!response.ok) {
      return {
        ok: false,
        host: originalHost,
        reason: `http_${response.status}`,
      };
    }

    if (!isContentUrl(finalUrl, link.anchorText)) {
      return {
        ok: false,
        host: finalHost || originalHost,
        reason: "ignored_final_url",
      };
    }

    return {
      ok: true,
      link: {
        ...link,
        url: finalUrl,
        originalUrl: link.url,
        finalUrl,
        finalHost,
        resolutionMethod: "http_redirect",
        statusCode: response.status,
      },
    };
  } catch (error) {
    await logEvent("debug", "Could not resolve link", {
      event: "link_resolve_failed",
      host: originalHost,
      error: sanitizeError(error),
    });
    return {
      ok: false,
      host: originalHost,
      reason: "request_failed",
    };
  } finally {
    clearTimeout(timeout);
  }
}

function dedupeByFinalUrl(links: ResolvedNewsletterLink[]): ResolvedNewsletterLink[] {
  const seen = new Set<string>();
  const uniqueLinks: ResolvedNewsletterLink[] = [];

  for (const link of links) {
    const key = normalizeDedupeKey(link.finalUrl);
    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    uniqueLinks.push(link);
  }

  return uniqueLinks;
}

function limitLinksPerEmail(
  links: ResolvedNewsletterLink[],
  maxPerEmail: number
): ResolvedNewsletterLink[] {
  const countsByEmail = new Map<string, number>();
  const limitedLinks: ResolvedNewsletterLink[] = [];

  for (const link of links) {
    const currentCount = countsByEmail.get(link.sourceEmailId) ?? 0;
    if (currentCount >= maxPerEmail) {
      continue;
    }

    countsByEmail.set(link.sourceEmailId, currentCount + 1);
    limitedLinks.push(link);
  }

  return limitedLinks;
}

function normalizeFinalUrl(rawUrl: string): string {
  const url = new URL(rawUrl);
  url.hash = "";

  [
    "ck_subscriber_id",
    "email",
    "mc_cid",
    "mc_eid",
    "ref",
    "utm_campaign",
    "utm_content",
    "utm_medium",
    "utm_source",
    "utm_term",
  ].forEach((param) => url.searchParams.delete(param));

  return url.toString();
}

function extractEmbeddedFinalUrl(rawUrl: string): string | undefined {
  const url = new URL(rawUrl);
  const host = url.hostname.replace(/^www\./, "");

  if (host === "substack.com" && url.pathname.startsWith("/redirect/2/")) {
    const token = decodeURIComponent(url.pathname.split("/").at(3) ?? "");
    const payload = token.split(".").at(0);
    const decodedPayload = payload ? decodeBase64UrlJson(payload) : undefined;
    const embeddedUrl = decodedPayload?.e;

    return typeof embeddedUrl === "string" ? extractNestedContentUrl(embeddedUrl) ?? embeddedUrl : undefined;
  }

  if (host === "open.substack.com" && url.pathname.startsWith("/pub/")) {
    const [publication, marker, slug] = url.pathname.replace(/^\/pub\//, "").split("/");
    if (publication && marker === "p" && slug) {
      return `https://${publication}.substack.com/p/${slug}`;
    }
  }

  for (const param of ["url", "u", "target", "redirect_url", "redirect", "href"]) {
    const value = url.searchParams.get(param);
    if (value?.startsWith("http://") || value?.startsWith("https://")) {
      return value;
    }
  }

  return undefined;
}

function decodeBase64UrlJson(value: string): Record<string, unknown> | undefined {
  try {
    const paddedValue = value.padEnd(value.length + ((4 - (value.length % 4)) % 4), "=");
    const json = Buffer.from(paddedValue.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8");
    return JSON.parse(json) as Record<string, unknown>;
  } catch {
    return undefined;
  }
}

function extractNestedContentUrl(rawUrl: string): string | undefined {
  try {
    const url = new URL(rawUrl);
    const nextUrl = url.searchParams.get("next");

    if (url.pathname.includes("/subscribe") && nextUrl?.startsWith("http")) {
      return nextUrl;
    }
  } catch {
    return undefined;
  }

  return undefined;
}

function normalizeDedupeKey(rawUrl: string): string {
  const url = new URL(rawUrl);
  url.hash = "";
  url.hostname = url.hostname.replace(/^www\./, "");

  if (url.pathname !== "/") {
    url.pathname = url.pathname.replace(/\/+$/, "");
  }

  return url.toString();
}

function isContentUrl(rawUrl: string, anchorText?: string): boolean {
  const url = new URL(rawUrl);
  const host = url.hostname.replace(/^www\./, "");
  const normalizedAnchorText = anchorText?.toLowerCase().trim() ?? "";

  if (!["http:", "https:"].includes(url.protocol)) {
    return false;
  }

  if (IGNORED_FINAL_HOSTS.has(host)) {
    return false;
  }

  if (["link patrocinado", "indicar newsletter"].includes(normalizedAnchorText)) {
    return false;
  }

  if (
    ["/action/disable_email", "/app-link", "/redirect", "/subscribe", "/newsletter"].some((path) =>
      url.pathname.toLowerCase().includes(path)
    )
  ) {
    return false;
  }

  return !TRACKING_HOST_PATTERNS.some((pattern) => host.includes(pattern));
}

function getHost(rawUrl: string): string {
  try {
    return new URL(rawUrl).hostname.replace(/^www\./, "");
  } catch {
    return "invalid_url";
  }
}
