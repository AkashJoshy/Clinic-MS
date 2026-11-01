import type { WalletTransactionResponseDto } from "../../../../domain/types/wallet-transaction.types.ts";

export interface IWalletTransactionsDetailsService {
  execute(walletId: string): Promise<WalletTransactionResponseDto[]>;
}
