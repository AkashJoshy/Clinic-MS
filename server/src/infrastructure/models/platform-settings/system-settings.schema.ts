import { Schema } from "mongoose";

const integrationSettingsSchema = new Schema(
  {
    emailServiceEnabled: {
      type: Boolean,
      required: true,
    },
    paymentGatewayEnabled: {
      type: Boolean,
      required: true,
    },
    cloudStorageEnabled: {
      type: Boolean,
      required: true,
    },
  },
  { _id: false },
);

const backupSettingsSchema = new Schema(
  {
    automaticBackupsEnabled: {
      type: Boolean,
      required: true,
    },
    backupFrequency: {
      type: String,
      enum: ["DAILY", "WEEKLY", "MONTHLY"],
      required: true,
    },
  },
  { _id: false },
);

const systemLogSettingsSchema = new Schema(
  {
    auditLogsEnabled: {
      type: Boolean,
      required: true,
    },
  },
  { _id: false },
);

export const systemSettingsSchema = new Schema(
  {
    integrations: {
      type: integrationSettingsSchema,
      required: true,
    },
    backup: {
      type: backupSettingsSchema,
      required: true,
    },
    logs: {
      type: systemLogSettingsSchema,
      required: true,
    },
  },
  { _id: false },
);
