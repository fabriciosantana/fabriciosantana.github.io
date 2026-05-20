import { Buffer } from "node:buffer";

import { google } from "googleapis";
import type { OAuth2Client } from "google-auth-library";

import { NEWSLETTER_SENDERS } from "../config/senders.js";
import type { NewsletterEmail } from "../types/newsletter.js";
import type { EmailProvider } from "./email-provider.js";

type GmailProviderOptions = {
  maxResults?: number;
  newerThanDays?: number;
  senders?: string[];
};

type GmailHeader = {
  name?: string | null;
  value?: string | null;
};

const DEFAULT_PROCESSED_LABEL = "newsletter-workflow";
const GMAIL_UNREAD_LABEL_ID = "UNREAD";

export class GmailEmailProvider implements EmailProvider {
  private readonly maxResults: number;
  private readonly newerThanDays: number;
  private readonly senders: string[];

  constructor(options: GmailProviderOptions = {}) {
    this.maxResults = options.maxResults ?? Number(process.env.GMAIL_MAX_RESULTS ?? 20);
    this.newerThanDays = options.newerThanDays ?? Number(process.env.GMAIL_NEWER_THAN_DAYS ?? 2);
    this.senders = options.senders ?? NEWSLETTER_SENDERS;
  }

  isConfigured(): boolean {
    return Boolean(
      process.env.GMAIL_CLIENT_ID &&
        process.env.GMAIL_CLIENT_SECRET &&
        process.env.GMAIL_REFRESH_TOKEN
    );
  }

  async listNewsletterEmails(): Promise<NewsletterEmail[]> {
    if (!this.isConfigured()) {
      console.warn("Gmail provider not configured. Set GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, and GMAIL_REFRESH_TOKEN.");
      return [];
    }

    const gmail = google.gmail({ version: "v1", auth: this.createAuthClient() });
    const query = this.buildQuery();
    const listResponse = await gmail.users.messages.list({
      userId: "me",
      q: query,
      maxResults: this.maxResults,
    });

    const messages = listResponse.data.messages ?? [];
    const emails: NewsletterEmail[] = [];

    for (const message of messages) {
      if (!message.id) {
        continue;
      }

      const fullMessage = await gmail.users.messages.get({
        userId: "me",
        id: message.id,
        format: "full",
      });

      emails.push(this.toNewsletterEmail(message.id, fullMessage.data));
    }

    return emails;
  }

  async markNewsletterEmailsProcessed(emails: NewsletterEmail[]): Promise<void> {
    if (emails.length === 0) {
      return;
    }

    if (!this.isConfigured()) {
      console.warn("Gmail provider not configured. Emails were not marked as processed.");
      return;
    }

    const gmail = google.gmail({ version: "v1", auth: this.createAuthClient() });
    const labelName = process.env.GMAIL_PROCESSED_LABEL ?? DEFAULT_PROCESSED_LABEL;
    const labelId = await this.getOrCreateLabelId(gmail, labelName);
    const ids = emails.map((email) => email.id);

    await gmail.users.messages.batchModify({
      userId: "me",
      requestBody: {
        ids,
        addLabelIds: [labelId],
        removeLabelIds: [GMAIL_UNREAD_LABEL_ID],
      },
    });
  }

  private buildQuery(): string {
    const fromQuery = this.senders.map((sender) => `from:${sender}`).join(" OR ");
    const processedLabel = process.env.GMAIL_PROCESSED_LABEL ?? DEFAULT_PROCESSED_LABEL;
    return `(${fromQuery}) newer_than:${this.newerThanDays}d -label:${processedLabel}`;
  }

  private createAuthClient(): OAuth2Client {
    const auth = new google.auth.OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET
    );
    auth.setCredentials({
      refresh_token: process.env.GMAIL_REFRESH_TOKEN,
    });

    return auth;
  }

  private async getOrCreateLabelId(
    gmail: ReturnType<typeof google.gmail>,
    labelName: string
  ): Promise<string> {
    const labelsResponse = await gmail.users.labels.list({
      userId: "me",
    });
    const existingLabel = labelsResponse.data.labels?.find((label) => label.name === labelName);

    if (existingLabel?.id) {
      return existingLabel.id;
    }

    const createResponse = await gmail.users.labels.create({
      userId: "me",
      requestBody: {
        labelListVisibility: "labelShow",
        messageListVisibility: "show",
        name: labelName,
      },
    });

    if (!createResponse.data.id) {
      throw new Error(`Could not create Gmail label "${labelName}".`);
    }

    return createResponse.data.id;
  }

  private toNewsletterEmail(messageId: string, message: unknown): NewsletterEmail {
    const gmailMessage = message as {
      payload?: {
        headers?: GmailHeader[];
        body?: { data?: string | null };
        parts?: Array<{
          mimeType?: string | null;
          body?: { data?: string | null };
          parts?: unknown[];
        }>;
      };
      internalDate?: string | null;
      snippet?: string | null;
    };

    const headers = gmailMessage.payload?.headers ?? [];
    const subject = getHeader(headers, "Subject") ?? "(sem assunto)";
    const from = getHeader(headers, "From") ?? "(remetente desconhecido)";
    const receivedAt = gmailMessage.internalDate
      ? new Date(Number(gmailMessage.internalDate)).toISOString()
      : new Date().toISOString();
    const body = extractBody(gmailMessage.payload);

    return {
      id: messageId,
      subject,
      from,
      receivedAt,
      html: body.html,
      text: body.text ?? gmailMessage.snippet ?? "",
    };
  }
}

function getHeader(headers: GmailHeader[], name: string): string | undefined {
  return headers.find((header) => header.name?.toLowerCase() === name.toLowerCase())?.value ?? undefined;
}

function extractBody(payload: unknown): { html?: string; text?: string } {
  const parts = flattenParts(payload);
  const htmlPart = parts.find((part) => part.mimeType === "text/html" && part.body?.data);
  const textPart = parts.find((part) => part.mimeType === "text/plain" && part.body?.data);

  return {
    html: htmlPart?.body?.data ? decodeBase64Url(htmlPart.body.data) : undefined,
    text: textPart?.body?.data ? decodeBase64Url(textPart.body.data) : undefined,
  };
}

function flattenParts(payload: unknown): Array<{
  mimeType?: string | null;
  body?: { data?: string | null };
  parts?: unknown[];
}> {
  if (!payload || typeof payload !== "object") {
    return [];
  }

  const part = payload as {
    mimeType?: string | null;
    body?: { data?: string | null };
    parts?: unknown[];
  };

  return [part, ...(part.parts ?? []).flatMap(flattenParts)];
}

function decodeBase64Url(value: string): string {
  return Buffer.from(value.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8");
}
