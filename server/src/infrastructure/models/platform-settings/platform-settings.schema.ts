import { Schema } from "mongoose";
import type { IPlatformSettings } from "./platform-settings.types.ts";
import { systemSettingsSchema } from "./system-settings.schema.ts";
import { businessSettingsSchema } from "./business-settings.schema.ts";
import { generalSettingsSchema } from "./general-settings.schema.ts";

export const platformSettingsSchema =
  new Schema<IPlatformSettings>(
    {
      type: {
        type: String,
        enum: ["PLATFORM"],
        default: "PLATFORM",
        required: true,
      },

      general: {
        type: generalSettingsSchema,
        required: true,
      },

      business: {
        type: businessSettingsSchema,
        required: true,
      },

      system: {
        type: systemSettingsSchema,
        required: true,
      },

      settingsVersion: {
        type: Number,
        default: 1,
        min: 1,
        required: true,
      },

      createdBy: {
        type: Schema.Types.ObjectId,
        ref: "Admin",
        default: null,
      },

      updatedBy: {
        type: Schema.Types.ObjectId,
        ref: "Admin",
        default: null,
      },
    },
    {
      timestamps: true,
      versionKey: false,
      collection: "platform_settings",
    },
  );

platformSettingsSchema.index({ type: 1 }, { unique: true });
