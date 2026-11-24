import type { HydratedDocument, Model, Types } from "mongoose";
import type {
  DoctorSubscriptionHistoryAction,
  DoctorSubscriptionHistoryStatus,
} from "../../../domain/types/doctor-subscription-history.types.ts";
import type {
  BillingCycle,
  SubscriptionFeature,
} from "../../../domain/types/subscription-plan.types.ts";

export interface IPersistenceDoctorSubscriptionHistory {
  doctorId: Types.ObjectId;
  subscriptionId: Types.ObjectId
  planId: Types.ObjectId
  planName: string;
  action: DoctorSubscriptionHistoryAction;
  status: DoctorSubscriptionHistoryStatus;
  billingCycle: BillingCycle;
  price: number;
  currency: string;
  features: SubscriptionFeature[];
  previousPlanId: Types.ObjectId | null;
  previousPlanName: string | null;
  previousPrice: number | null;
  paymentMethod: string | null;
  transactionId: string | null;
  description: string | null;
  metadata: Record<string, unknown> | null;
  performedAt: Date;
  createdAt?: Date;
}

export type IDoctorSubscriptionHistory =
  HydratedDocument<IPersistenceDoctorSubscriptionHistory>;
