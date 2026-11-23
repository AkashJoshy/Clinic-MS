import { z } from "zod";

export const profileInfoSettingsSchema = z.object({
  section: z.literal("PROFILE_INFO"),
  displayName: z.string().trim().min(2, "Display name is required"),
  acceptNewPatients: z.boolean(),
  publicProfileVisible: z.boolean(),
  emergencyContactPhone: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "Enter a valid 10-digit phone number"),
});

export const securitySettingsSchema = z.object({
  section: z.literal("SECURITY"),
  currentPassword: z.string().optional(),
  newPassword: z.string().optional(),
  confirmNewPassword: z.string().optional(),
  twoFactorAuthentication: z.boolean(),
  inactivitySessionTimeoutMinutes: z
    .number()
    .int("Session timeout must be an integer")
    .positive("Session timeout must be positive"),
  newDeviceLoginAlerts: z.boolean(),
});

export const doctorClinicalNotificationsSchema = z.object({
  appointmentBooked: z.boolean(),
  appointmentCancelled: z.boolean(),
  patientMessages: z.boolean(),

  appointmentReminderHours: z.union([
    z.literal(1),
    z.literal(2),
    z.literal(6),
    z.literal(24),
  ]),
});

export const doctorUpdateNotificationsSchema = z.object({
  payoutUpdates: z.boolean(),
  marketingEmails: z.boolean(),
});

export const doctorNotificationChannelsSchema = z.object({
  emailAlerts: z.boolean(),
  smsAlerts: z.boolean(),
  whatsappAlerts: z.boolean(),
});

export const notificationsSettingsSchema = z.object({
  section: z.literal("NOTIFICATIONS"),

  clinical: doctorClinicalNotificationsSchema,
  updates: doctorUpdateNotificationsSchema,
  channels: doctorNotificationChannelsSchema,
});

export const appearanceSettingsSchema = z.object({
  section: z.literal("APPEARANCE"),
  theme: z.enum(["LIGHT", "DARK"]),
  walletCardDesignId: z
    .number()
    .int("Wallet card design ID must be an integer")
    .positive("Wallet card design ID must be positive"),
  colorPaletteId: z.string().trim().min(1, "Color palette is required"),
  compactScheduleView: z.boolean(),
  highContrastMode: z.boolean(),
});
