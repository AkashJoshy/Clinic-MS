import type { CreateWalletTopupOrderDto, TopupOrderResponseDto } from "../../../dto/wallet.dto.ts";

export interface ICreateWalletTopupOrderUseCase {
  execute(data: CreateWalletTopupOrderDto): Promise<TopupOrderResponseDto>;
}
