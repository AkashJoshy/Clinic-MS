import type { DoctorSubscription } from "../../domain/entities/doctor-subscription.entity.ts";
import type { Doctor } from "../../domain/entities/doctor.entity.ts";
import type { SubscriptionPlan } from "../../domain/entities/subscription-plan.entity.ts";
import type {
  SafeDoctorSubscription,
  SubscriptionPaymentMethod,
} from "../../domain/types/doctor-subscription.types.ts";
import type {
  BaseSubscriptionPlan,
  BillingCycle,
} from "../../domain/types/subscription-plan.types.ts";
import type { SafeWallet } from "../../domain/types/wallet.types.ts";
import type { BaseSubscriptionPlanDto } from "./subscription-plan.dto.ts";
import type { RazorpaySuccessDto, TopupOrderResponseDto } from "./wallet.dto.ts";

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
  payableAmount: number;
}

export type BuySubscriptionWithWalletResponseDto = {
  currentPlan: SafeDoctorSubscription;
  planName: BaseSubscriptionPlanDto["name"];
};

export interface CancelSubscriptionDto {
  doctorId: string;
  planId: BaseSubscriptionPlanDto["id"];
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
    changeType: SubscriptionChangeType;
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

export interface ActiveSubscriptionMapperDto {
  doctorId: string;
  subscriptionPlan: BaseSubscriptionPlan;
  startDate: Date;
  endDate: Date | null;
  paymentMethod: SubscriptionPaymentMethod;
}

export interface CreateSubscriptionHistoryMapperDto {
  doctorId: string;
  subscriptionPlan: SubscriptionPlan;
  previousSubscription: DoctorSubscription | null;
  newSubscription: DoctorSubscription;
  transactionId?: string | null;
}

export interface CreateSubscriptionRazorpayOrderDto {
  doctorId: string;
  planId: string;
}

export type CreateSubscriptionRazorpayOrderResponseDto = TopupOrderResponseDto;

export interface VerifySubscriptionRazorpayPaymentDto {
  doctorId: string;
  planId: string;
  status: "SUCCESS" | "FAILED";
  orderDetails: RazorpaySuccessDto;
}

export interface VerifySubscriptionRazorpayPaymentResponseDto {
  currentPlan: SafeDoctorSubscription;
  planName: string;
}
