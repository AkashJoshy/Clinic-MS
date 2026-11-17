import { Schema } from "mongoose";

const clinicalNotificationsSchema = new Schema(
  {
    newAppointmentBookings: {
      type: Boolean,
      default: true,
    },

    cancellationsAndReschedules: {
      type: Boolean,
      default: true,
    },

    patientInquiriesAndMessages: {
      type: Boolean,
      default: true,
    },

    appointmentReminderLeadTimeHours: {
      type: Number,
      enum: [1, 2, 6, 24],
      default: 2,
    },
  },
  { _id: false },
);

const updateNotificationsSchema = new Schema(
  {
    walletAndPayoutSettlements: {
      type: Boolean,
      default: true,
    },

    platformFeaturesAndClinicalGuides: {
      type: Boolean,
      default: true,
    },
  },
  { _id: false },
);

const notificationChannelsSchema = new Schema(
  {
    email: {
      type: Boolean,
      default: true,
    },

    sms: {
      type: Boolean,
      default: false,
    },

    whatsappBusiness: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false },
);

export const notificationsSchema = new Schema(
  {
    clinical: {
      type: clinicalNotificationsSchema,
      default: () => ({}),
    },

    updates: {
      type: updateNotificationsSchema,
      default: () => ({}),
    },

    channels: {
      type: notificationChannelsSchema,
      default: () => ({}),
    },
  },
  { _id: false },
);
