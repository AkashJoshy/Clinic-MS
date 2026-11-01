import type {
  EditSubscriptionPlanDto,
  SafeSubscriptionResponseDto,
} from "../../../../dto/subscription-plan.dto.ts";

export interface IEditSubscriptionPlanUseCase {
  execute(data: EditSubscriptionPlanDto): Promise<SafeSubscriptionResponseDto>;
}
