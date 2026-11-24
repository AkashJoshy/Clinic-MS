import type { WalletTransaction } from "../../../../domain/entities/wallet-transaction.entity.ts";
import type { CreateWalletTransactionDto } from "../../../dto/wallet.dto.ts";

export interface ICreateWalletTransactionService {
  execute(data: CreateWalletTransactionDto): Promise<WalletTransaction>;
}
