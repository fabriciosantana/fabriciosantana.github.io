type GrafanaLogEvent = Record<string, unknown>;

export function isGrafanaLokiConfigured(): boolean {
  return Boolean(
    process.env.GRAFANA_LOKI_URL &&
      process.env.GRAFANA_LOKI_USER &&
      process.env.GRAFANA_LOKI_TOKEN
  );
}

export async function sendGrafanaLokiLog(event: GrafanaLogEvent): Promise<void> {
  const url = normalizeLokiPushUrl(process.env.GRAFANA_LOKI_URL);
  const user = process.env.GRAFANA_LOKI_USER?.trim();
  const token = process.env.GRAFANA_LOKI_TOKEN?.trim();

  if (!url || !user || !token) {
    return;
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      authorization: `Basic ${Buffer.from(`${user}:${token}`).toString("base64")}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      streams: [
        {
          stream: {
            service: "newsletter-workflow",
            environment: process.env.NODE_ENV ?? "development",
            level: String(event.level ?? "info"),
          },
          values: [[toNanoseconds(Date.now()), JSON.stringify(event)]],
        },
      ],
    }),
  });

  if (!response.ok) {
    const responseText = await response.text();
    throw new Error(
      [
        `Grafana Loki ingestion failed with status ${response.status}`,
        getStatusHint(response.status),
        responseText ? `Response: ${responseText.slice(0, 300)}` : undefined,
      ]
        .filter(Boolean)
        .join(". ")
    );
  }
}

function toNanoseconds(timestampMs: number): string {
  return `${timestampMs}000000`;
}

function normalizeLokiPushUrl(value: string | undefined): string | undefined {
  const url = value?.trim().replace(/\/+$/, "");

  if (!url) {
    return undefined;
  }

  if (url.endsWith("/loki/api/v1/push")) {
    return url;
  }

  return `${url}/loki/api/v1/push`;
}

function getStatusHint(status: number): string | undefined {
  if (status === 401) {
    return "Check GRAFANA_LOKI_USER and use a Grafana Cloud Access Policy token with logs:write scope for the same stack";
  }

  if (status === 403) {
    return "The token was accepted but does not have permission to write logs";
  }

  if (status === 404 || status === 405) {
    return "Check GRAFANA_LOKI_URL; it should point to the Grafana Cloud Loki service";
  }

  return undefined;
}
