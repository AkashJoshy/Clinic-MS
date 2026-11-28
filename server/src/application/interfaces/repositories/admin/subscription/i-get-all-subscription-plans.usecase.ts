import type {
  GetAllSubscriptionPlansQueryDto,
  SubscriptionManagementResponseDto,
} from "../../../../dto/subscription-plan.dto.ts";

export interface IGetAllSubscriptionPlansUseCase {
  execute(
    query?: GetAllSubscriptionPlansQueryDto,
  ): Promise<SubscriptionManagementResponseDto>;
}
