import { model } from "mongoose";
import { subscriptionPlanSchema } from "./subscription-plan.schema.ts";
import type { ISubscriptionPlanPersistence } from "./subscription-plan.types.ts";
import { MODEL_NAMES } from "../model-names.ts";

subscriptionPlanSchema.index({ name: 1, billingCycle: 1 });

export const SubscriptionPlanModel = model<ISubscriptionPlanPersistence>(
  MODEL_NAMES.SUBSCRIPTION_PLAN,
  subscriptionPlanSchema,
);
