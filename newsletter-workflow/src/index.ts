import { summarizeDigest } from "./ai/summarize.js";
import { clusterArticles } from "./ai/cluster.js";
import { fetchArticles } from "./extractors/articles.js";
import { extractNewsletterLinks } from "./extractors/links.js";
import { PlaceholderEmailProvider } from "./providers/email-provider.js";
import { publishDigestToSite } from "./publishers/site-content.js";

async function main() {
  const emailProvider = new PlaceholderEmailProvider();
  const emails = await emailProvider.listNewsletterEmails();
  const links = emails.flatMap(extractNewsletterLinks);
  const articles = await fetchArticles(links);
  const clusters = clusterArticles(articles);
  const digest = await summarizeDigest(clusters);
  const outputPath = await publishDigestToSite(digest);

  console.log(`Digest generated at ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
