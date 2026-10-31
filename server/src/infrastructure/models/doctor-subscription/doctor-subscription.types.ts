import type { Document, HydratedDocument, Types } from "mongoose";
import type {
  CancellationReason,
  DoctorSubscriptionStatus,
  SubscriptionPaymentMethod,
} from "../../../domain/types/doctor-subscription.types.ts";
import type {
  BillingCycle,
  SubscriptionFeature,
} from "../../../domain/types/subscription-plan.types.ts";

export interface IDoctorSubscription extends Document {
  _id: Types.ObjectId;
  doctorId: Types.ObjectId;
  planId: Types.ObjectId;
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
  createdAt: Date;
  updatedAt: Date;
}

export type DoctorSubscriptionDocument =
  HydratedDocument<IDoctorSubscription>;