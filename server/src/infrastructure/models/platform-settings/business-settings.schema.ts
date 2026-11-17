import { Schema } from "mongoose";

const paymentsSettingsSchema = new Schema(
  {
    minimumPayout: {
      type: Number,
      required: true,
      min: 0,
    },
    payoutProcessingTime: {
      type: Number,
      enum: [1, 2, 3, 5, 7],
      required: true,
    },
  },
  { _id: false },
);

const commissionSettingsSchema = new Schema(
  {
    defaultCommission: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    platformFee: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
  },
  { _id: false },
);

const appointmentSettingsSchema = new Schema(
  {
    defaultAppointmentDuration: {
      type: Number,
      enum: [15, 20, 30, 45, 60],
      required: true,
    },
    cancellationWindow: {
      type: Number,
      enum: [0, 2, 6, 12, 24, 48],
      required: true,
    },
    autoConfirmAppointments: {
      type: Boolean,
      required: true,
    },
  },
  { _id: false },
);

const doctorVerificationSettingsSchema = new Schema(
  {
    adminApprovalRequired: {
      type: Boolean,
      required: true,
    },
    kycVerificationRequired: {
      type: Boolean,
      required: true,
    },
  },
  { _id: false },
);

const patientSettingsSchema = new Schema(
  {
    patientReviewsEnabled: {
      type: Boolean,
      required: true,
    },
    patientCancellationEnabled: {
      type: Boolean,
      required: true,
    },
  },
  { _id: false },
);

const subscriptionSettingsSchema = new Schema(
  {
    freeTrialEnabled: {
      type: Boolean,
      required: true,
    },
    autoRenewal: {
      type: Boolean,
      required: true,
    },
    proratePlanChanges: {
      type: Boolean,
      required: true,
    },
    trialLength: {
      type: Number,
      enum: [7, 14, 21, 30],
      required: true,
    },
    gracePeriodAfterFailedPayment: {
      type: Number,
      enum: [0, 3, 7, 14],
      required: true,
    },
  },
  { _id: false },
);

export const businessSettingsSchema = new Schema(
  {
    payments: {
      type: paymentsSettingsSchema,
      required: true,
    },
    commission: {
      type: commissionSettingsSchema,
      required: true,
    },
    appointments: {
      type: appointmentSettingsSchema,
      required: true,
    },
    doctorVerification: {
      type: doctorVerificationSettingsSchema,
      required: true,
    },
    patients: {
      type: patientSettingsSchema,
      required: true,
    },
    subscriptions: {
      type: subscriptionSettingsSchema,
      required: true,
    },
  },
  { _id: false },
);
