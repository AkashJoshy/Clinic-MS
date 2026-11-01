import type { SafeSubscriptionPlanResponseDto } from "../../../../../domain/types/subscription-plan.types.ts";
import type { BaseSubscriptionPlanDto } from "../../../../dto/subscription-plan.dto.ts";

export interface ICreateSubscriptionPlanUseCase {
  execute(
    data: BaseSubscriptionPlanDto,
  ): Promise<SafeSubscriptionPlanResponseDto>;
}
