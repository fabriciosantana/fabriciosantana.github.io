import { randomUUID } from "node:crypto";

import { pino } from "pino";

import { isGrafanaLokiConfigured, sendGrafanaLokiLog } from "./grafana-loki.js";

type LogLevel = "debug" | "info" | "warn" | "error";
type LogMetadata = Record<string, unknown>;

export const runId = process.env.WORKFLOW_RUN_ID ?? randomUUID();

export const logger = pino({
  level: process.env.LOG_LEVEL ?? "info",
  base: {
    service: "newsletter-workflow",
    runId,
    environment: process.env.NODE_ENV ?? "development",
  },
  redact: {
    paths: [
      "*.authorization",
      "*.clientSecret",
      "*.refreshToken",
      "*.secret",
      "*.token",
      "authorization",
      "clientSecret",
      "refreshToken",
      "secret",
      "token",
    ],
    censor: "[redacted]",
  },
});

export function sanitizeError(error: unknown): { name: string; message: string; stack?: string } {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: redactSecrets(error.message),
      stack: error.stack ? redactSecrets(error.stack) : undefined,
    };
  }

  return {
    name: "UnknownError",
    message: redactSecrets(String(error)),
  };
}

export async function logEvent(
  level: LogLevel,
  message: string,
  metadata: LogMetadata = {}
): Promise<void> {
  const event = {
    ...metadata,
    dt: new Date().toISOString(),
    level,
    message,
    runId,
    service: "newsletter-workflow",
  };

  logger[level](metadata, message);

  if (!isGrafanaLokiConfigured()) {
    return;
  }

  try {
    await sendGrafanaLokiLog(event);
  } catch (error) {
    logger.warn({ error: sanitizeError(error) }, "Could not send log to Grafana Loki");
  }
}

export async function logStep<T>(
  step: string,
  action: () => Promise<T>,
  metadata: LogMetadata = {},
  getSuccessMetadata: (result: T) => LogMetadata = () => ({})
): Promise<T> {
  const startedAt = Date.now();
  await logEvent("info", "Step started", { event: "step_started", step, ...metadata });

  try {
    const result = await action();
    await logEvent("info", "Step finished", {
      event: "step_finished",
      step,
      durationMs: Date.now() - startedAt,
      ...metadata,
      ...getSuccessMetadata(result),
    });
    return result;
  } catch (error) {
    await logEvent("error", "Step failed", {
      event: "step_failed",
      step,
      durationMs: Date.now() - startedAt,
      ...metadata,
      error: sanitizeError(error),
    });
    throw error;
  }
}

function redactSecrets(value: string): string {
  const secrets = [
    process.env.GMAIL_CLIENT_SECRET,
    process.env.GMAIL_REFRESH_TOKEN,
    process.env.OPENAI_API_KEY,
    process.env.GRAFANA_LOKI_TOKEN,
  ].filter(Boolean) as string[];

  return secrets.reduce((sanitized, secret) => sanitized.replaceAll(secret, "[redacted]"), value);
}
