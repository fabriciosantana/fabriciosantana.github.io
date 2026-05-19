import "dotenv/config";

import { GmailEmailProvider } from "./providers/gmail.js";

async function main() {
  const provider = new GmailEmailProvider();
  const emails = await provider.listNewsletterEmails();

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

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
