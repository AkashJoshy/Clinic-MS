import type { Document } from "mongoose";
import type { BillingCycle, SubscriptionFeature, SubscriptionPlanStatus } from "../../../domain/types/subscription-plan.types.ts";

export interface ISubscriptionPlanPersistence extends Document {
  name: string;
  tagline: string;
  description: string;
  price: number;
  currency: string;
  billingCycle: BillingCycle;
  colorTheme: string;
  badgeText: string | null;
  isPopular: boolean;
  status: SubscriptionPlanStatus;
  features: SubscriptionFeature[];
  activeSubscribersCount: number;
  createdAt?: Date;
  updatedAt?: Date;
}