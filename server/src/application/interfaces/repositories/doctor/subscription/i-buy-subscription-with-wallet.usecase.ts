import type {
  BuySubscriptionWithWalletDto,
  BuySubscriptionWithWalletResponseDto,
} from "../../../../dto/doctor-subscription.dto.ts";

export interface IBuySubscriptionWithWalletUseCase {
  execute(
    data: BuySubscriptionWithWalletDto,
  ): Promise<BuySubscriptionWithWalletResponseDto>;
}
