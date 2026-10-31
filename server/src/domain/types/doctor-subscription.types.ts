import type { DoctorSubscription } from "../entities/doctor-subscription.entity.ts";
import type { BillingCycle, SubscriptionFeature } from "./subscription-plan.types.ts";

export type DoctorSubscriptionStatus =
  | "PENDING"
  | "ACTIVE"
  | "REPLACED"
  | "EXPIRED"
  | "CANCELLED"
  | "PAST_DUE";

export type SubscriptionPaymentMethod = "WALLET" | "BANK_ACCOUNT" | "RAZORPAY"

  export type CancellationReason =
  | "TOO_EXPENSIVE"
  | "TEMPORARILY_CLOSING_CLINIC"
  | "MISSING_FEATURES"
  | "SWITCHING_PLATFORM"
  | "OTHER";

export interface DoctorSubscriptionProps {
  id: string | null;
  doctorId: string;
  planId: string;
  status: DoctorSubscriptionStatus;
  billingCycle: BillingCycle;
  price: number;
  currency: string;
  features: SubscriptionFeature[];
  startedAt: Date | null;
  currentPeriodStart: Date | null;
  currentPeriodEnd: Date | null;
  autoRenew: boolean;
  paymentMethod: SubscriptionPaymentMethod;
  cancelledAt: Date | null;
  cancellationReason: CancellationReason | null;
  cancellationMessage: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export type SafeDoctorSubscription = Omit<
  DoctorSubscription,
  | "activate"
  | "isPending"
  | "isExpired"
  | "isActive"
  | "renew"
  | "cancel"
  | "expire"
  | "markPastDue"
  | "enableAutoRenew"
  | "disableAutoRenew"
  | "updatePaymentMethod"
>;

// export interface SubscriptionFeature {
//   key: string;
//   value: string | number | boolean;
// }
