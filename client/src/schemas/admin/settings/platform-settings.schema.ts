
import { z } from "zod";

import { generalSettingsSchema } from "./general-settings.schema";
import { businessSettingsSchema } from "./business-settings.schema";
import { systemSettingsSchema } from "./system-settings.schema";

export const platformSettingsSchema = z.object({
  general: generalSettingsSchema,
  business: businessSettingsSchema,
  system: systemSettingsSchema,
});

export const settingsSectionSchema = z.enum([
  "GENERAL",
  "BUSINESS",
  "SYSTEM",
]);


