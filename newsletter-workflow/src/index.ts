import { summarizeDigest } from "./ai/summarize.js";
import { clusterArticles } from "./ai/cluster.js";
import { fetchArticles } from "./extractors/articles.js";
import { extractNewsletterLinks } from "./extractors/links.js";
import { GmailEmailProvider } from "./providers/gmail.js";
import { publishDigestToSite } from "./publishers/site-content.js";

async function main() {
  const emailProvider = new GmailEmailProvider();
  const emails = await emailProvider.listNewsletterEmails();
  console.log(`Emails found: ${emails.length}`);

  const links = emails.flatMap(extractNewsletterLinks);
  console.log(`Links found: ${links.length}`);

  const articles = await fetchArticles(links);
  console.log(`Articles fetched: ${articles.length}`);

  const clusters = clusterArticles(articles);
  console.log(`News clusters: ${clusters.length}`);

  const digest = await summarizeDigest(clusters);
  const outputPath = await publishDigestToSite(digest);

  console.log(`Digest generated at ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
