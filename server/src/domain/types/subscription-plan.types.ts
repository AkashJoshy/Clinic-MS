import type { SubscriptionPlan } from "../entities/subscription-plan.entity.ts";

export type BillingCycle = "MONTHLY" | "QUARTERLY" | "YEARLY" | "LIFETIME";

export type SubscriptionPlanStatus = "ACTIVE" | "INACTIVE";

export interface SubscriptionFeature {
  id: string;
  name: string;
  isIncluded: boolean;
}

export interface SubscriptionPlanProps {
  id: string;
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
  createdAt: Date | null;
  updatedAt: Date | null;
}

export type SafeSubscriptionPlanResponseDto = Omit<
  SubscriptionPlan,
  | "activate"
  | "deactivate"
  | "createActive"
  | "createInactive"
  | "updateDetails"
  | "updateActiveSubscribersCount"
>;

export type BaseSubscriptionPlan = Omit<
  SafeSubscriptionPlanResponseDto,
  "createdAt" | "updatedAt"
>;
