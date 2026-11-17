import { THEME_MODE } from "@/constants/themes.constant";
import {
  createName,
  createPositiveInteger,
  email,
  phone,
  selectColor,
} from "@/schemas/base.schema";
import { z } from "zod";

const platformSchema = z.object({
  platformName: createName("Platform name", ),
  supportEmail: email,
  supportPhone: phone,
  defaultTimezone: z.string().trim().min(1, "Timezone is required"),
  defaultCurrency: z.enum(["INR", "USD", "AED", "EUR"], {
    message: "Please select any default currency",
  }),
});

const appearanceSchema = z.object({
  primaryBrandColor: selectColor("Enter a valid hex color"),
  mode: z.enum(THEME_MODE, {
    message: "Please Choose a theme mode",
  }),
});

const notificationsSchema = z.object({
  emailNotifications: z.boolean(),
  appointmentReminders: z.boolean(),
  paymentNotifications: z.boolean(),
});

const securitySchema = z.object({
  twoFactorAuthRequired: z.boolean(),
  adminSessionTimeoutMinutes: z
    .number()
    .int()
    .min(5, "Minimum session timeout is 5 minutes")
    .max(1440, "Maximum session timeout is 24 hours"),
  absoluteSessionLifetimeHours: createPositiveInteger(
    "Absolute session lifetime",
    1,
    720,
  ),

  maintenanceMode: z.boolean(),
});

export const generalSettingsSchema = z.object({
  platform: platformSchema,
  appearance: appearanceSchema,
  notifications: notificationsSchema,
  security: securitySchema,
});

