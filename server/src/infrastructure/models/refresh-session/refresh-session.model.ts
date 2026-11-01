import { model } from "mongoose";
import { refreshSessionSchema } from "./refresh-session.schema.ts";
import type { IRefreshSessionDocument } from "./refresh-session.types.ts";
import { MODEL_NAMES } from "../model-names.ts";

refreshSessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const RefreshSessionModel = model<IRefreshSessionDocument>(
  MODEL_NAMES.REFRESH_SESSION,
  refreshSessionSchema,
);
