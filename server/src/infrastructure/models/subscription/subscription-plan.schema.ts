import { Schema } from "mongoose";
import type { SubscriptionFeature } from "../../../domain/types/subscription-plan.types.ts";
import type { ISubscriptionPlanPersistence } from "./subscription-plan.types.ts";
import { BILLING_CYCLE, ENTITY_STATUS } from "../../../domain/constants/status.constants.ts";

const subscriptionFeatureSchema = new Schema<SubscriptionFeature>(
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

export const subscriptionPlanSchema = new Schema<ISubscriptionPlanPersistence>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    tagline: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: Number.isSafeInteger,
        message: "Subscription price must be a non-negative safe integer.",
      },
    },
    currency: {
      type: String,
      required: true,
      default: "INR",
      uppercase: true,
    },
    billingCycle: {
      type: String,
      enum: BILLING_CYCLE,
      required: true,
    },
    colorTheme: {
      type: String,
      required: true,
      default: "emerald",
    },
    badgeText: {
      type: String,
      default: null,
    },
    isPopular: {
      type: Boolean,
      required: true,
      default: false,
    },
    status: {
      type: String,
      enum: ENTITY_STATUS,
      required: true,
      default: "INACTIVE",
    },
    features: {
      type: [subscriptionFeatureSchema],
      required: true,
      default: [],
    },
    activeSubscribersCount: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      validate: {
        validator: Number.isSafeInteger,
        message: "Active subscribers count must be a non-negative integer.",
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
