import type {
  SubscriptionPlanStatusDto,
  SubscriptionPlanStatusResponseDto,
} from "../../../../dto/subscription-plan.dto.ts";

export interface IUpdateSubscriptionPlanStatusUseCase {
  execute(
    data: SubscriptionPlanStatusDto,
  ): Promise<SubscriptionPlanStatusResponseDto>;
}
