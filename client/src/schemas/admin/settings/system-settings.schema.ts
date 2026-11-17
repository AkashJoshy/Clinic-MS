
import { z } from "zod";

const integrationStatusSchema = z.enum([
  "CONNECTED",
  "DISCONNECTED",
  "ERROR",
  "NOT_CONFIGURED",
]);

const emailProviderSchema = z.object({
  enabled: z.boolean(),
  provider: z.enum(["RESEND", "OTHER"]),
  status: integrationStatusSchema,
});

const paymentGatewaySchema = z.object({
  enabled: z.boolean(),
  provider: z.enum(["RAZORPAY", "OTHER"]),
  status: integrationStatusSchema,
});

const cloudStorageSchema = z.object({
  enabled: z.boolean(),
  provider: z.enum(["CLOUDINARY", "OTHER"]),
  status: integrationStatusSchema,
});

const integrationsSchema = z.object({
  emailProvider: emailProviderSchema,
  paymentGateway: paymentGatewaySchema,
  cloudStorage: cloudStorageSchema,
});

const backupAndDataSchema = z.object({
  autoBackup: z.boolean(),
  backupFrequency: z.enum([
    "DAILY",
    "WEEKLY",
    "MONTHLY",
  ]),
});

const systemLogsSchema = z.object({
  auditAndActivityLogsEnabled: z.boolean(),
});

export const systemSettingsSchema = z.object({
  integrations: integrationsSchema,
  backupAndData: backupAndDataSchema,
  systemLogs: systemLogsSchema,
});

