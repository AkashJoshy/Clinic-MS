import mongoose, { Model } from "mongoose";
import { platformSettingsSchema } from "./platform-settings.schema.ts";
import type { IPlatformSettings } from "./platform-settings.types.ts";
import { MODEL_NAMES } from "../model-names.ts";

export const PlatformSettingsModel: Model<IPlatformSettings> =
  mongoose.model<IPlatformSettings>(
    MODEL_NAMES.PLATFORM_SETTINGS,
    platformSettingsSchema,
  );
