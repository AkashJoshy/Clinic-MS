export type BillingCycle = "MONTHLY" | "QUARTERLY" | "YEARLY" | "LIFETIME";

export type PlanStatus = "ACTIVE" | "INACTIVE";

export interface SubscriptionFeature {
  id: string;
  name: string;
  isIncluded: boolean;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  tagline?: string;
  description: string;
  price: number;
  currency: string;
  billingCycle: BillingCycle;
  status: PlanStatus;
  isPopular?: boolean;
  badgeText?: string;
  features: SubscriptionFeature[];
  activeSubscribersCount: number;
  colorTheme?: "emerald" | "blue" | "purple" | "amber";
  createdAt?: string;
  updatedAt?: string;
}

export type EditSubscriptionPlan = Omit<SubscriptionPlan, "id">;

export type BaseSubscriptionData = Omit<
  SubscriptionPlan,
  "createdAt" | "updatedAt"
>;

export interface SubscriptionStats {
  totalPlans: number;
  activePlans: number;
  totalSubscribers: number;
  estimatedMonthlyRevenue: number;
}

export type UpdateSubscriptionStatusData = {
  id: string;
  status: PlanStatus;
};
