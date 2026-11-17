import { z } from "zod";
import {
  appearanceSettingsSchema,
  notificationsSettingsSchema,
  profileInfoSettingsSchema,
  securitySettingsSchema,
} from "./doctor-settings.schema.ts";

export const updateDoctorSettingsSchema = z.discriminatedUnion("section", [
  z.object({
    section: z.literal("PROFILE"),
    data: profileInfoSettingsSchema.omit({ section: true }),
  }),
  z.object({
    section: z.literal("SECURITY"),
    data: securitySettingsSchema.omit({
      section: true,
      currentPassword: true,
      newPassword: true,
      confirmNewPassword: true,
    }),
  }),
  z.object({
    section: z.literal("NOTIFICATIONS"),
    data: notificationsSettingsSchema.omit({ section: true }),
  }),
  z.object({
    section: z.literal("APPEARANCE"),
    data: appearanceSettingsSchema.omit({ section: true }),
  }),
]);
