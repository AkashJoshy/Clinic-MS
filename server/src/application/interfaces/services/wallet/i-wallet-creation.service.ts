import type { CreateWalletDto } from "../../../dto/wallet.dto.ts";

export interface IWalletCreationService {
  execute(data: CreateWalletDto): Promise<void>;
}
