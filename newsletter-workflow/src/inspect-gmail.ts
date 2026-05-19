import "dotenv/config";

import { logEvent, sanitizeError } from "./observability/logger.js";
import { GmailEmailProvider } from "./providers/gmail.js";

async function main() {
  const provider = new GmailEmailProvider();
  const emails = await provider.listNewsletterEmails();

  await logEvent("info", "Gmail inspection finished", {
    event: "gmail_inspection_finished",
    emailCount: emails.length,
  });
  console.log(`Emails found: ${emails.length}`);

  for (const email of emails) {
    console.log(
      JSON.stringify(
        {
          id: email.id,
          from: email.from,
          subject: email.subject,
          receivedAt: email.receivedAt,
          hasHtml: Boolean(email.html),
          textLength: email.text?.length ?? 0,
        },
        null,
        2
      )
    );
  }
}

main().catch(async (error) => {
  await logEvent("error", "Gmail inspection failed", {
    event: "gmail_inspection_failed",
    error: sanitizeError(error),
  });
  process.exitCode = 1;
});
