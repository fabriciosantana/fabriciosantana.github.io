import "dotenv/config";

import { sendGrafanaLokiLog } from "./observability/grafana-loki.js";
import { runId, sanitizeError } from "./observability/logger.js";

async function main() {
  const status = {
    hasUrl: Boolean(process.env.GRAFANA_LOKI_URL),
    hasUser: Boolean(process.env.GRAFANA_LOKI_USER),
    hasToken: Boolean(process.env.GRAFANA_LOKI_TOKEN),
    runId,
  };

  console.log(JSON.stringify(status, null, 2));

  try {
    await sendGrafanaLokiLog({
      dt: new Date().toISOString(),
      event: "grafana_connection_test",
      level: "info",
      message: "Grafana Loki connection test",
      runId,
      service: "newsletter-workflow",
    });
    console.log("Grafana Loki connection test succeeded.");
  } catch (error) {
    console.error(JSON.stringify({ error: sanitizeError(error) }, null, 2));
    process.exitCode = 1;
  }
}

void main();
