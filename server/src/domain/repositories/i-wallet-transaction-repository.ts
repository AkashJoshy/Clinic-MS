import type { IBaseRepository } from "./i-base.repository.ts";
import type { WalletTransaction } from "../entities/wallet-transaction.entity.ts";

export interface IWalletTransactionRepository extends IBaseRepository<WalletTransaction> {
  findByWalletId(walletId: string): Promise<WalletTransaction[]>;
  findByReferenceId(referenceId: string): Promise<WalletTransaction | null>;
  findPendingTransactions(): Promise<WalletTransaction[]>
}
