import { Schema } from "mongoose";
import type { Session, SlotRules } from "../../../domain/types/doctor-clinic.types.ts";
import type { ImageData, VerifyImageData } from "../../../domain/types/shared.types.ts";
import { APPROVAL_STATUS } from "../../../domain/constants/status.constants.ts";
import type { Subscription, SubscriptionDetails } from "../../../domain/types/doctor.types.ts";
import type { SubscriptionFeature } from "../../../domain/types/subscription-plan.types.ts";

export const SlotRulesSchema = new Schema<SlotRules>(
  {
    maxTokensPerDay: {
      type: Number,
      required: true,
      min: 1,
    },
    autoConfirmBookings: {
      type: Boolean,
      default: true,
    },
    allowReschedule: {
      type: Boolean,
      default: true,
    },
  },
  { _id: false },
);


export const VerifyImageDataSchema = new Schema<VerifyImageData>(
  {
    url: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: APPROVAL_STATUS,
      required: true,
      default: "PENDING",
    },
  },
  {
    _id: false,
  },
);

const ISubscriptionDetailsSchema = new Schema<SubscriptionDetails>({
  subscriptionId: {
    type: String,
    default: null,
  },
  startedAt: {
    type: Date,
    required: true,
  },
  expiredAt: {
    type: Date,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
});

export const ISubscriptionSchema = new Schema<Subscription>({
  current: {
    type: ISubscriptionDetailsSchema,
    default: null,
  },
  history: {
    type: [ISubscriptionDetailsSchema],
    default: [],
  },
});

export const SessionSchema = new Schema<Session>(
  {
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      enum: ["OFFLINE", "ONLINE", "BOTH"],
      required: true,
    },
  },
  { _id: false },
);

export const ImageDataSchema = new Schema<ImageData>(
  {
    url: {
      type: String,
      required: false,
    },
    publicId: {
      type: String,
      required: false,
    },
  },
  {
    _id: false,
  },
);

export const subscriptionFeatureSchema = new Schema<SubscriptionFeature>(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    isIncluded: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    _id: false,
  },
);
