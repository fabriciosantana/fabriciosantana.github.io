import "dotenv/config";

import { summarizeDigest } from "./ai/summarize.js";
import { clusterArticles } from "./ai/cluster.js";
import { fetchArticles } from "./extractors/articles.js";
import { extractArticlesFromEmailContent } from "./extractors/email-content.js";
import { extractNewsletterLinks } from "./extractors/links.js";
import { resolveNewsletterLinks } from "./extractors/redirects.js";
import { GmailEmailProvider } from "./providers/gmail.js";
import { publishDigestToSite } from "./publishers/site-content.js";
import { logEvent, logStep, sanitizeError } from "./observability/logger.js";

async function main() {
  await logEvent("info", "Newsletter workflow started", { event: "workflow_started" });

  const emailProvider = new GmailEmailProvider();
  const emails = await logStep(
    "gmail.list_newsletters",
    () => emailProvider.listNewsletterEmails(),
    {},
    (result) => ({ emailCount: result.length })
  );

  const links = await logStep(
    "links.extract",
    async () => emails.flatMap(extractNewsletterLinks),
    { emailCount: emails.length },
    (result) => ({ linkCount: result.length })
  );

  const resolvedLinks = await logStep(
    "links.resolve",
    () => resolveNewsletterLinks(links),
    { linkCount: links.length },
    (result) => ({ resolvedLinkCount: result.length })
  );

  const articles = await logStep(
    "articles.fetch",
    () => fetchArticles(resolvedLinks),
    { resolvedLinkCount: resolvedLinks.length },
    (result) => ({ articleCount: result.length })
  );

  const emailContentArticles = await logStep(
    "emails.extract_content_articles",
    () => extractArticlesFromEmailContent(emails),
    { emailCount: emails.length },
    (result) => ({ emailContentArticleCount: result.length })
  );

  const summarizableArticles = [...articles, ...emailContentArticles];

  const clusters = await logStep(
    "articles.cluster",
    async () => clusterArticles(summarizableArticles),
    { articleCount: summarizableArticles.length },
    (result) => ({ clusterCount: result.length })
  );

  const digest = await logStep(
    "digest.summarize",
    () => summarizeDigest(clusters),
    { clusterCount: clusters.length },
    (result) => ({ digestItems: result.items.length })
  );
  const outputPath = await logStep(
    "site.publish_digest",
    () => publishDigestToSite(digest),
    { digestItems: digest.items.length },
    (result) => ({ outputPath: result })
  );

  await logStep(
    "gmail.mark_processed",
    () => emailProvider.markNewsletterEmailsProcessed(emails),
    { emailCount: emails.length },
    () => ({
      processedLabel: process.env.GMAIL_PROCESSED_LABEL ?? "newsletter-workflow",
      markedEmailCount: emails.length,
    })
  );

  await logEvent("info", "Newsletter workflow finished", {
    event: "workflow_finished",
    emailCount: emails.length,
    linkCount: links.length,
    resolvedLinkCount: resolvedLinks.length,
    articleCount: articles.length,
    emailContentArticleCount: emailContentArticles.length,
    summarizableArticleCount: summarizableArticles.length,
    clusterCount: clusters.length,
    digestItems: digest.items.length,
    markedEmailCount: emails.length,
    outputPath,
  });
}

main().catch(async (error) => {
  await logEvent("error", "Newsletter workflow failed", {
    event: "workflow_failed",
    error: sanitizeError(error),
  });
  process.exitCode = 1;
});
