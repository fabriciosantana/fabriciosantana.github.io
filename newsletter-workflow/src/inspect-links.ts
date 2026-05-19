import "dotenv/config";

import { extractNewsletterLinks } from "./extractors/links.js";
import { logEvent, sanitizeError } from "./observability/logger.js";
import { GmailEmailProvider } from "./providers/gmail.js";

async function main() {
  const provider = new GmailEmailProvider();
  const emails = await provider.listNewsletterEmails();
  const links = emails.flatMap(extractNewsletterLinks);

  await logEvent("info", "Link inspection finished", {
    event: "link_inspection_finished",
    emailCount: emails.length,
    linkCount: links.length,
  });
  console.log(`Emails found: ${emails.length}`);
  console.log(`Links found: ${links.length}`);
  console.log("");
  console.log("Links by email:");

  for (const email of emails) {
    const emailLinks = links.filter((link) => link.sourceEmailId === email.id);
    console.log(`- ${email.subject}: ${emailLinks.length}`);
  }

  console.log("");
  console.log("Top link hosts:");
  const hosts = new Map<string, number>();
  for (const link of links) {
    const host = new URL(link.url).hostname;
    hosts.set(host, (hosts.get(host) ?? 0) + 1);
  }

  Array.from(hosts.entries())
    .sort(([, a], [, b]) => b - a)
    .slice(0, 20)
    .forEach(([host, count]) => console.log(`- ${host}: ${count}`));

  console.log("");
  console.log("Sample links:");

  for (const link of links.slice(0, 100)) {
    console.log(
      JSON.stringify(
        {
          url: link.url,
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
  await logEvent("error", "Link inspection failed", {
    event: "link_inspection_failed",
    error: sanitizeError(error),
  });
  process.exitCode = 1;
});
