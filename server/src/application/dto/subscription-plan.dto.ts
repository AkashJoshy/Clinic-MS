import type {
  BaseSubscriptionPlan,
  SafeSubscriptionPlanResponseDto,
} from "../../domain/types/subscription-plan.types.ts";
import type { PaginatedResponseDto } from "./shared.dto.ts";

export type BaseSubscriptionPlanDto = BaseSubscriptionPlan;

export type SafeSubscriptionResponseDto = SafeSubscriptionPlanResponseDto;

export type SubscriptionPlanStatusDto = {
  id: BaseSubscriptionPlan["id"];
  status: BaseSubscriptionPlan["status"];
};

export type SubscriptionPlanStatusResponseDto = SubscriptionPlanStatusDto;

export type EditSubscriptionPlanDto = BaseSubscriptionPlanDto;

export interface SubscriptionManagementResponseDto {
  all: PaginatedResponseDto<SafeSubscriptionResponseDto>;
  active: PaginatedResponseDto<SafeSubscriptionResponseDto>;
  inactive: PaginatedResponseDto<SafeSubscriptionResponseDto>;
  stats: {
    totalPlans: number;
    activePlans: number;
    totalSubscribers: number;
    estimatedMonthlyRevenue: number;
  };
}

export type GetAllSubscriptionPlansQueryDto = {
  search?: string | undefined;
  limit: number;
  allPage: number;
  activePage: number;
  inactivePage: number;
};
