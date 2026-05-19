import type { NewsletterEmail } from "../types/newsletter.js";

export type EmailProvider = {
  listNewsletterEmails(): Promise<NewsletterEmail[]>;
};

export class PlaceholderEmailProvider implements EmailProvider {
  async listNewsletterEmails(): Promise<NewsletterEmail[]> {
    return [];
  }
}
