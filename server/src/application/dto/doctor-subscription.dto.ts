import type { Doctor } from "../../domain/entities/doctor.entity.ts";
import type {
  SafeDoctorSubscription,
  SubscriptionPaymentMethod,
} from "../../domain/types/doctor-subscription.types.ts";
import type { BillingCycle } from "../../domain/types/subscription-plan.types.ts";
import type { SafeWallet } from "../../domain/types/wallet.types.ts";
import type { BaseSubscriptionPlanDto } from "./subscription-plan.dto.ts";

export type SafeDoctorSubscriptionDto = SafeDoctorSubscription;

export interface DoctorSubscriptionDto {
  current: SafeDoctorSubscription | null;
  availablePlans: BaseSubscriptionPlanDto[];
  history: SafeDoctorSubscription[];
}

export interface BuySubscriptionWithWalletDto {
  planId: BaseSubscriptionPlanDto["id"];
  doctorId: Doctor["id"];
  paymentMethod: SubscriptionPaymentMethod;
  payableAmount: number
}

export type BuySubscriptionWithWalletResponseDto = {
  currentPlan: SafeDoctorSubscription;
  planName: BaseSubscriptionPlanDto["name"];
};

export interface CancelSubscriptionDto {
  doctorId: string;
  planId: BaseSubscriptionPlanDto["id"]
  cancellationReason: SafeDoctorSubscription["cancellationReason"];
  cancellationMessage: SafeDoctorSubscription["cancellationMessage"];
}

export interface CancelSubscriptionResponseDto {
  doctorId: string;
  subscriptionId: string;
  status: string;
  autoRenew: boolean;
  cancelledAt: Date;
  cancellationMessage: string;
}


export interface RenewSubscriptionDto {
  doctorId: string;
  planId: string;
}

export interface RenewSubscriptionResponseDto {
  doctorId: string;
  subscriptionId: string;
  status: string;
  autoRenew: boolean;
  currentPeriodEnd: Date | null;
}

export type SubscriptionChangeType = "CURRENT" | "UPGRADE" | "DOWNGRADE";

export interface GetSubscriptionUpgradeOptionsResponseDTO {
  currentSubscription: {
    id: string;
    planId: string;
    planName: string;
    price: number;
    currency: string;
    billingCycle: "MONTHLY" | "QUARTERLY" | "YEARLY" | "LIFETIME";
    currentPeriodStart: Date | null;
    currentPeriodEnd: Date | null;
  } | null;

  options: {
    planId: string;
    planName: string;
    price: number;
    currency: string;
    billingCycle: "MONTHLY" | "QUARTERLY" | "YEARLY" | "LIFETIME";
    changeType: SubscriptionChangeType
    unusedSubscriptionCredit: number;
    payableAmount: number;
    features: {
      id: string;
      name: string;
      isIncluded: boolean;
    }[];
  }[];
}

export interface CalculateSubscriptionChangeParams {
  currentPrice: number;
  targetPrice: number;
  billingCycle: BillingCycle;
  currentPeriodStart: Date | null;
}

export interface SubscriptionChangeCalculationResult {
  changeType: SubscriptionChangeType;
  unusedSubscriptionCredit: number;
  payableAmount: number;
  elapsedDays: number;
}