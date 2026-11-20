import type { NextFunction, Request, Response } from "express";
import { recordHttpRequest } from "../../infrastructure/observability/prometheus-metrics.ts";

export function metricsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const start = process.hrtime.bigint();

  res.on("finish", () => {
    const route = req.route?.path
      ? `${req.baseUrl || ""}${req.route.path}`
      : req.path;

    if (route === "/metrics") return;

    const durationSeconds = Number(process.hrtime.bigint() - start) / 1e9;
    recordHttpRequest({
      method: req.method,
      route,
      statusCode: res.statusCode,
      durationSeconds,
    })

    console.log(req.method);
    console.log(res.statusCode);
    
  });

  next();
}
