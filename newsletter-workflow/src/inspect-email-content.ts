import "dotenv/config";

import { extractArticlesFromEmailContent } from "./extractors/email-content.js";
import { logEvent, sanitizeError } from "./observability/logger.js";
import { GmailEmailProvider } from "./providers/gmail.js";

async function main() {
  const provider = new GmailEmailProvider();
  const emails = await provider.listNewsletterEmails();
  const articles = await extractArticlesFromEmailContent(emails);

  await logEvent("info", "Email content inspection finished", {
    event: "email_content_inspection_finished",
    emailCount: emails.length,
    articleCount: articles.length,
  });

  console.log(`Emails found: ${emails.length}`);
  console.log(`Email content articles extracted: ${articles.length}`);

  console.log("");
  console.log("Articles by source:");
  const countsBySource = new Map<string, number>();
  for (const article of articles) {
    countsBySource.set(article.sourceName ?? "unknown", (countsBySource.get(article.sourceName ?? "unknown") ?? 0) + 1);
  }

  Array.from(countsBySource.entries())
    .sort(([, a], [, b]) => b - a)
    .forEach(([source, count]) => console.log(`- ${source}: ${count}`));

  console.log("");
  console.log("Sample email content articles:");
  for (const article of articles.slice(0, 30)) {
    console.log(
      JSON.stringify(
        {
          title: article.title,
          sourceName: article.sourceName,
          textLength: article.text.length,
          textPreview: article.text.slice(0, 280),
        },
        null,
        2
      )
    );
  }
}

main().catch(async (error) => {
  await logEvent("error", "Email content inspection failed", {
    event: "email_content_inspection_failed",
    error: sanitizeError(error),
  });
  process.exitCode = 1;
});
