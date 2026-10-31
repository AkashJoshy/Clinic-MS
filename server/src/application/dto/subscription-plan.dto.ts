import type {
  BaseSubscriptionPlan,
  SafeSubscriptionPlanResponseDto,
} from "../../domain/types/subscription-plan.types.ts";

export type BaseSubscriptionPlanDto = BaseSubscriptionPlan;

export type SafeSubscriptionResponseDto = SafeSubscriptionPlanResponseDto;

export type SubscriptionPlanStatusDto = {
  id: BaseSubscriptionPlan["id"];
  status: BaseSubscriptionPlan["status"];
};

export type SubscriptionPlanStatusResponseDto = SubscriptionPlanStatusDto;

export type EditSubscriptionPlanDto = BaseSubscriptionPlanDto
