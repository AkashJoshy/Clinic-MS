
import type {
  RenewSubscriptionDto,
  RenewSubscriptionResponseDto,
} from "../../../../dto/doctor-subscription.dto.ts";

export interface IRenewSubscriptionUseCase {
  execute(
    data: RenewSubscriptionDto,
  ): Promise<RenewSubscriptionResponseDto>;
}
