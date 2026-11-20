import { Router } from "express";
import { getMetricsOutput } from "../../infrastructure/observability/prometheus-metrics.ts";

const router = Router();

router.get("/", async (req, res) => {
  const { contentType, body } = await getMetricsOutput();
  res.set("Content-Type", contentType);
  res.end(body);
});

export default router;