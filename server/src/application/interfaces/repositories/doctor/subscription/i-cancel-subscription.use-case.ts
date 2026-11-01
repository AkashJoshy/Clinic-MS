import type { CancelSubscriptionDto, CancelSubscriptionResponseDto } from "../../../../dto/doctor-subscription.dto.ts";

export interface ICancelSubscriptionUseCase {
  execute(
    data: CancelSubscriptionDto,
  ): Promise<CancelSubscriptionResponseDto>;
}