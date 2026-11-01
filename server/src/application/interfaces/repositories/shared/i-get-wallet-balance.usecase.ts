import type { WalletBalanceResponseDto } from "../../../dto/wallet.dto.ts";

export interface IGetWalletBalanceUseCase {
  execute(ownerId: string): Promise<WalletBalanceResponseDto>;
}
