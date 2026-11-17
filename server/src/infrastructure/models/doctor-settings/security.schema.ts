import { Schema } from "mongoose";

export const securitySchema = new Schema(
  {
    twoFactorAuthentication: {
      type: Boolean,
      default: true,
    },
    newDeviceLoginAlerts: {
      type: Boolean,
      default: true,
    },
    inactivitySessionTimeoutMinutes: {
      type: Number,
      default: 30,
      min: 1,
    },
  },
  { _id: false },
);
