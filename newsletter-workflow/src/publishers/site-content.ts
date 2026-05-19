import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import type { Digest } from "../types/newsletter.js";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const DIGESTS_DIR = path.resolve(currentDir, "../../../site/src/content/digests");

export async function publishDigestToSite(digest: Digest): Promise<string> {
  await mkdir(DIGESTS_DIR, { recursive: true });

  const filePath = path.join(DIGESTS_DIR, `${digest.date}.json`);
  await writeFile(filePath, `${JSON.stringify(digest, null, 2)}\n`, "utf8");

  return filePath;
}
