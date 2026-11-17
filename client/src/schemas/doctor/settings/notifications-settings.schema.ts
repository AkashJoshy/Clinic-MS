import { z } from "zod";

export const notificationsSettingsSchema = z.object({
  section: z.literal("NOTIFICATIONS").default("NOTIFICATIONS"),
  clinical: z.object({
    appointmentBooked: z.boolean().default(true),
    appointmentCancelled: z.boolean().default(true),
    patientMessages: z.boolean().default(true),
    appointmentReminderHours: z
      .union([z.literal(1), z.literal(2), z.literal(6), z.literal(24)])
      .default(2),
  }),
  updates: z.object({
    payoutUpdates: z.boolean().default(true),
    marketingEmails: z.boolean().default(false),
  }),
  channels: z.object({
    emailAlerts: z.boolean().default(true),
    smsAlerts: z.boolean().default(true),
    whatsappAlerts: z.boolean().default(false),
  }),
});

export type NotificationsSettingsFormValues = z.infer<
  typeof notificationsSettingsSchema
>;
