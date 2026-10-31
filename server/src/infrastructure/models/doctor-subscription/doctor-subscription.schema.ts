import { Schema } from "mongoose";
import type { IDoctorSubscription } from "./doctor-subscription.types.ts";
import { CANCELLATION_REASON, PAYMENT_METHOD, SUBSCRIPTION_STATUS } from "../../../domain/constants/subscription.constants.ts";
import { BILLING_CYCLE } from "../../../domain/constants/status.constants.ts";

const subscriptionFeatureSchema = new Schema(
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
    },
  },
  {
    _id: false,
  },
);

export const doctorSubscriptionSchema =
  new Schema<IDoctorSubscription>(
    {
      doctorId: {
        type: Schema.Types.ObjectId,
        ref: "Doctor",
        required: true,
        index: true,
      },

      planId: {
        type: Schema.Types.ObjectId,
        ref: "SubscriptionPlan",
        required: true,
        index: true,
      },

      status: {
        type: String,
        enum: SUBSCRIPTION_STATUS,
        default: "PENDING",
        required: true,
      },

      billingCycle: {
        type: String,
        enum: BILLING_CYCLE,
        required: true,
      },

      price: {
        type: Number,
        required: true,
        min: 0,
      },

      currency: {
        type: String,
        default: "INR",
        required: true,
      },

      features: {
        type: [subscriptionFeatureSchema],
        default: [],
      },

      startedAt: {
        type: Date,
        default: null,
      },

      currentPeriodStart: {
        type: Date,
        default: null,
      },

      currentPeriodEnd: {
        type: Date,
        default: null,
      },

      autoRenew: {
        type: Boolean,
        default: false,
      },

      paymentMethod: {
        type: String,
        enum: PAYMENT_METHOD,
        required: true,
      },

      cancelledAt: {
        type: Date,
        default: null,
      },

      cancellationReason: {
        type: String,
        enum: CANCELLATION_REASON,
        default: null,
      },

      cancellationMessage: {
        type: String,
        trim: true,
        maxlength: 1000,
        default: null,
      },
    },
    {
      timestamps: true,
      versionKey: false,
    },
  );

doctorSubscriptionSchema.index({
  doctorId: 1,
  createdAt: -1,
});

doctorSubscriptionSchema.index({
  status: 1,
  autoRenew: 1,
  currentPeriodEnd: 1,
});