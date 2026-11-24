import type {
  BillingCycle,
  SubscriptionFeature,
} from "./subscription-plan.types.ts";

export type DoctorSubscriptionHistoryAction =
  | "PURCHASED"
  | "UPGRADED"
  | "DOWNGRADED"
  | "RENEWED"
  | "CANCELLED"
  | "EXPIRED"
  | "REPLACED"
  | "AUTO_RENEW_ENABLED"
  | "AUTO_RENEW_DISABLED"
  | "PAYMENT_METHOD_UPDATED";

export type DoctorSubscriptionHistoryStatus = "SUCCESS" | "FAILED";

export interface DoctorSubscriptionHistoryProps {
  id: string | null;
  doctorId: string;
  subscriptionId: string;
  planId: string;
  planName: string;
  action: DoctorSubscriptionHistoryAction;
  status: DoctorSubscriptionHistoryStatus;

  billingCycle: BillingCycle;
  price: number;
  currency: string;
  features: SubscriptionFeature[];

  previousPlanId: string | null;
  previousPlanName: string | null;
  previousPrice: number | null;

  paymentMethod: string | null;
  transactionId: string | null;

  description: string | null;
  metadata: Record<string, unknown> | null;

  performedAt: Date;
  createdAt: Date | null;
}
