import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import type { Digest } from "../types/newsletter.js";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const DIGESTS_DIR = path.resolve(currentDir, "../../../site/src/content/digests");
const DIGEST_INDEX_PATH = path.join(DIGESTS_DIR, "index.json");
const DIGEST_MANIFEST_PATH = path.join(DIGESTS_DIR, "generated.js");

type DigestIndexEntry = {
  date: string;
  file: string;
  sourceCount: number;
  summary: string;
  title: string;
};

export async function publishDigestToSite(digest: Digest): Promise<string> {
  await mkdir(DIGESTS_DIR, { recursive: true });

  const file = `${digest.date}.json`;
  const filePath = path.join(DIGESTS_DIR, file);
  await writeFile(filePath, `${JSON.stringify(digest, null, 2)}\n`, "utf8");
  await updateDigestIndex(digest, file);

  return filePath;
}

async function updateDigestIndex(digest: Digest, file: string): Promise<void> {
  const currentIndex = await readDigestIndex();
  const entry = toIndexEntry(digest, file);
  const nextIndex = [entry, ...currentIndex.filter((item) => item.date !== digest.date)].sort(
    (a, b) => b.date.localeCompare(a.date)
  );

  await writeFile(DIGEST_INDEX_PATH, `${JSON.stringify(nextIndex, null, 2)}\n`, "utf8");
  await writeDigestManifest(nextIndex);
}

async function readDigestIndex(): Promise<DigestIndexEntry[]> {
  try {
    return JSON.parse(await readFile(DIGEST_INDEX_PATH, "utf8")) as DigestIndexEntry[];
  } catch {
    return [];
  }
}

function toIndexEntry(digest: Digest, file: string): DigestIndexEntry {
  const firstItem = digest.items[0];

  return {
    date: digest.date,
    file,
    sourceCount: firstItem?.sources.length ?? 0,
    summary: buildSummaryExcerpt(firstItem?.summary ?? ""),
    title: digest.title,
  };
}

function buildSummaryExcerpt(summary: string): string {
  return summary
    .replace(/#{1,6}\s+/g, "")
    .replace(/\*\*/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 180);
}

async function writeDigestManifest(index: DigestIndexEntry[]): Promise<void> {
  const imports = index
    .map((entry, indexPosition) => `import digest${indexPosition} from "./${entry.file}";`)
    .join("\n");
  const digestsByFileEntries = index
    .map((entry, indexPosition) => `  ${JSON.stringify(entry.file)}: digest${indexPosition},`)
    .join("\n");

  const content = `${imports}

export const digestIndex = ${JSON.stringify(index, null, 2)};

export const digestsByFile = {
${digestsByFileEntries}
};
`;

  await writeFile(DIGEST_MANIFEST_PATH, content, "utf8");
}
