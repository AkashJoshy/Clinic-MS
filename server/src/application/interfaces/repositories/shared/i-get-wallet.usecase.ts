import type { WalletResponseDto } from "../../../dto/wallet.dto.ts";

export interface IGetWalletUseCase {
  execute(ownerId: string): Promise<WalletResponseDto>;
}
