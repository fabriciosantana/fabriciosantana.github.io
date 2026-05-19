import "dotenv/config";

import { extractNewsletterLinks } from "./extractors/links.js";
import { resolveNewsletterLinks } from "./extractors/redirects.js";
import { logEvent, sanitizeError } from "./observability/logger.js";
import { GmailEmailProvider } from "./providers/gmail.js";

async function main() {
  const provider = new GmailEmailProvider();
  const emails = await provider.listNewsletterEmails();
  const links = emails.flatMap(extractNewsletterLinks);
  const resolvedLinks = await resolveNewsletterLinks(links);

  await logEvent("info", "Redirect inspection finished", {
    event: "redirect_inspection_finished",
    emailCount: emails.length,
    inputLinkCount: links.length,
    resolvedLinkCount: resolvedLinks.length,
  });

  console.log(`Emails found: ${emails.length}`);
  console.log(`Input links found: ${links.length}`);
  console.log(`Resolved links after dedupe and per-newsletter limit: ${resolvedLinks.length}`);

  console.log("");
  console.log("Final hosts:");
  const hosts = new Map<string, number>();
  for (const link of resolvedLinks) {
    hosts.set(link.finalHost, (hosts.get(link.finalHost) ?? 0) + 1);
  }

  Array.from(hosts.entries())
    .sort(([, a], [, b]) => b - a)
    .slice(0, 30)
    .forEach(([host, count]) => console.log(`- ${host}: ${count}`));

  console.log("");
  console.log("Links by email:");
  for (const email of emails) {
    const count = resolvedLinks.filter((link) => link.sourceEmailId === email.id).length;
    console.log(`- ${email.subject}: ${count}`);
  }

  console.log("");
  console.log("Sample resolved links:");
  for (const link of resolvedLinks.slice(0, 50)) {
    console.log(
      JSON.stringify(
        {
          finalUrl: link.finalUrl,
          originalHost: new URL(link.originalUrl).hostname,
          anchorText: link.anchorText,
          sourceEmailSubject: link.sourceEmailSubject,
        },
        null,
        2
      )
    );
  }
}

main().catch(async (error) => {
  await logEvent("error", "Redirect inspection failed", {
    event: "redirect_inspection_failed",
    error: sanitizeError(error),
  });
  process.exitCode = 1;
});
