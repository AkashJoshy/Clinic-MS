import type { SafeSubscriptionResponseDto } from "../../../../dto/subscription-plan.dto.ts";

export interface IGetAllSubscriptionPlansUseCase {
  execute(): Promise<SafeSubscriptionResponseDto[]>;
}
