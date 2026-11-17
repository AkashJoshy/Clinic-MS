import { Schema } from "mongoose";

const platformDetailsSchema = new Schema(
  {
    platformName: {
      type: String,
      required: true,
      trim: true,
    },
    supportEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    supportPhone: {
      type: String,
      required: true,
      trim: true,
    },
    defaultTimezone: {
      type: String,
      required: true,
      trim: true,
    },
    defaultCurrency: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
  },
  { _id: false },
);

const appearanceSettingsSchema = new Schema(
  {
    primaryBrandColor: {
      type: String,
      required: true,
      match: /^#[0-9A-Fa-f]{6}$/,
    },
    mode: {
      type: String,
      enum: ["DARK", "LIGHT"],
      required: true,
    },
  },
  { _id: false },
);

const notificationSettingsSchema = new Schema(
  {
    emailNotifications: {
      type: Boolean,
      required: true,
    },
    appointmentReminders: {
      type: Boolean,
      required: true,
    },
    paymentNotifications: {
      type: Boolean,
      required: true,
    },
  },
  { _id: false },
);

const securitySettingsSchema = new Schema(
  {
    twoFactorAuthRequired: {
      type: Boolean,
      required: true,
    },
    adminSessionTimeoutMinutes: {
      type: Number,
      required: true,
      min: 1,
    },
    absoluteSessionLifetimeHours: {
      type: Number,
      required: true,
      min: 1,
    },
    maintenanceMode: {
      type: Boolean,
      required: true,
    },
  },
  { _id: false },
);

export const generalSettingsSchema = new Schema(
  {
    platform: {
      type: platformDetailsSchema,
      required: true,
    },
    appearance: {
      type: appearanceSettingsSchema,
      required: true,
    },
    notifications: {
      type: notificationSettingsSchema,
      required: true,
    },
    security: {
      type: securitySettingsSchema,
      required: true,
    },
  },
  { _id: false },
);
