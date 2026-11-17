import { Schema } from "mongoose";
import { profileSchema } from "./profile.schema.ts";
import { securitySchema } from "./security.schema.ts";
import { notificationsSchema } from "./notification.schema.ts";
import { appearanceSchema } from "./appearance.schema.ts";
import type { IDoctorSettings } from "./doctor-settings.types.ts";

export const doctorSettingsSchema = new Schema<IDoctorSettings>(
  {
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
      unique: true,
      index: true,
    },
    profile: {
      type: profileSchema,
      default: () => ({}),
    },
    security: {
      type: securitySchema,
      default: () => ({}),
    },
    notifications: {
      type: notificationsSchema,
      default: () => ({}),
    },
    appearance: {
      type: appearanceSchema,
      default: () => ({}),
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
