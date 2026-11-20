import client from "@prometheus-io/client";
import type { RecordHttpRequestParams } from "../../domain/types/shared.types.ts";

const register = new client.Registry();
client.collectDefaultMetrics({ register });

const httpRequestsTotal = new client.Counter({
  name: "http_requests_total",
  help: "Total HTTP requests",
  labelNames: ["method", "route", "status_code"],
  registers: [register],
});

const httpRequestDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "HTTP request duration in seconds",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.01, 0.05, 0.1, 0.3, 0.5, 1, 2, 5],
  registers: [register],
});

export function recordHttpRequest({
  method,
  route,
  statusCode,
  durationSeconds,
}: RecordHttpRequestParams) {
  const labels = { method, route, status_code: String(statusCode) };
  httpRequestsTotal.inc(labels);
  httpRequestDuration.observe(labels, durationSeconds);
}

export async function getMetricsOutput() {
  return {
    contentType: register.contentType,
    body: await register.metrics(),
  };
}
