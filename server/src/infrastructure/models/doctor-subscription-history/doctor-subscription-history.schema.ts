import { Schema, Types } from "mongoose";
import type { IDoctorSubscriptionHistory } from "./doctor-subscription-history.types.ts";
import {
  DOCTOR_SUBSCRIPTION_HISTORY_ACTION,
  DOCTOR_SUBSCRIPTION_STATUS,
} from "../../../domain/constants/doctor-subscription-history.constants.ts";
import previousSubscriptionPlanSchema from "./previous-subscription-plan.schema.ts";
import { subscriptionFeatureSchema } from "../shared/shared.schema.ts";
import { BILLING_CYCLE } from "../../../domain/constants/status.constants.ts";

const doctorSubscriptionHistorySchema: Schema<IDoctorSubscriptionHistory> =
  new Schema<IDoctorSubscriptionHistory>(
    {
      doctorId: {
        type: Types.ObjectId,
        required: true,
        index: true,
        ref: "Doctor",
      },
      subscriptionId: {
        type: Types.ObjectId,
        required: true,
        index: true,
        ref: "DoctorSubscription",
      },
      planId: {
        type: Types.ObjectId,
        required: true,
        ref: "SubscriptionPlan",
      },
      planName: {
        type: String,
        required: true,
        trim: true,
      },
      action: {
        type: String,
        enum: DOCTOR_SUBSCRIPTION_HISTORY_ACTION,
        required: true,
      },
      status: {
        type: String,
        enum: DOCTOR_SUBSCRIPTION_STATUS,
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
        required: true,
        default: "INR",
      },
      features: {
        type: [subscriptionFeatureSchema],
        required: true,
        default: [],
      },
      paymentMethod: {
        type: String,
        default: null,
      },
      transactionId: {
        type: String,
        default: null,
      },
      description: {
        type: String,
        default: null,
        trim: true,
      },
      metadata: {
        type: Schema.Types.Mixed,
        default: null,
      },
      performedAt: {
        type: Date,
        required: true,
        default: Date.now,
      },
    },
    {
      timestamps: {
        createdAt: true,
        updatedAt: false,
      },
      versionKey: false,
    },
  );

doctorSubscriptionHistorySchema.add(previousSubscriptionPlanSchema);

doctorSubscriptionHistorySchema.index({
  doctorId: 1,
  performedAt: -1,
});

doctorSubscriptionHistorySchema.index({
  subscriptionId: 1,
  performedAt: -1,
});

export default doctorSubscriptionHistorySchema;
