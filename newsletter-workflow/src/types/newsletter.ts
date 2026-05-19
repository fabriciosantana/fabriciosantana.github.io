export type NewsletterEmail = {
  id: string;
  subject: string;
  from: string;
  receivedAt: string;
  html?: string;
  text?: string;
};

export type NewsletterLink = {
  url: string;
  sourceEmailId: string;
  sourceEmailSubject: string;
  anchorText?: string;
};

export type Article = {
  url: string;
  canonicalUrl: string;
  title: string;
  sourceName?: string;
  publishedAt?: string;
  text: string;
};

export type NewsCluster = {
  id: string;
  title: string;
  articles: Article[];
};

export type DigestItem = {
  title: string;
  summary: string;
  sources: Array<{
    title: string;
    url: string;
    sourceName?: string;
  }>;
};

export type Digest = {
  date: string;
  title: string;
  items: DigestItem[];
};
